import { liveblocks } from "@/features/workflows/lib/liveblocks"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function POST() {
  const { userId, orgId } = await auth()

  // Workflow rooms are organization-scoped. Reject personal sessions rather
  // than issuing a broad token which could be reused against another room.
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Permissions are resolved from the user's Clerk organization. This matches
  // the groupsAccesses entry created for each workflow room.
  const { status, body } = await liveblocks.identifyUser(
    {
      userId,
      groupIds: [orgId],
      organizationId: orgId,
    },
    {
      userInfo: {
        name:
          user.fullName ??
          user.username ??
          user.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: user.imageUrl,
      },
    }
  )

  return new Response(body, { status })
}
