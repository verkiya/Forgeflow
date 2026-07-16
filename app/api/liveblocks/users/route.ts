import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  // Require an authed user + org
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const { userIds } = await request.json()

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 })
    }

    const client = await clerkClient()
    const usersResult = await client.users.getUserList({ userId: userIds })

    // Support both Clerk v4 (returns array directly) and v5+ (returns { data: array })
    const usersList = Array.isArray(usersResult)
      ? usersResult
      : usersResult.data

    // Return their display info (name, avatar) in the same order, null for unknown ones
    const usersData = userIds.map((id) => {
      const user = usersList.find((u) => u.id === id)
      if (user) {
        return {
          name: String(
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.firstName || "Anonymous"
          ),
          avatar: String(user.imageUrl || ""),
        }
      }
      return null
    })

    return new Response(JSON.stringify(usersData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching liveblocks users from Clerk:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
