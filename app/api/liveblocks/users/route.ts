import { auth, clerkClient } from "@clerk/nextjs/server"

// `Liveblocks` is a global interface declared in liveblocks.config.ts.
type UserInfo = Liveblocks["UserMeta"]["info"]

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  let userIds: unknown
  try {
    ;({ userIds } = await request.json())
  } catch {
    return new Response("Invalid JSON body", { status: 400 })
  }

  if (!Array.isArray(userIds) || userIds.some((id) => typeof id !== "string")) {
    return new Response("Expected { userIds: string[] }", { status: 400 })
  }

  if (userIds.length === 0) {
    return Response.json([])
  }

  // Only resolve users from the caller's organization. Without this filter a
  // member could harvest profile data for arbitrary Clerk user ids.
  const client = await clerkClient()
  const { data: users } = await client.users.getUserList({
    userId: userIds,
    organizationId: [orgId],
    limit: userIds.length,
  })
  const usersById = new Map(users.map((user) => [user.id, user]))

  // Preserve Liveblocks' requested order and represent unavailable users as
  // null, which is the shape expected by resolveUsers.
  const resolved: (UserInfo | null)[] = userIds.map((id) => {
    const user = usersById.get(id)
    if (!user) return null

    return {
      name:
        user.fullName ??
        user.username ??
        user.primaryEmailAddress?.emailAddress ??
        "Anonymous",
      avatar: user.imageUrl,
    }
  })

  return Response.json(resolved)
}
