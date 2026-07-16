import { liveblocks } from "@/features/workflows/lib/liveblocks"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Liveblocks } from "@liveblocks/node"

export async function POST(request: Request) {
  // Use Clerk SDK for authentication utils
  const { userId, orgId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Set up ID token permissions
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: userId,
      // Use clerk's orgId in groupIds[] for organization-scoped access
      groupIds: orgId ? [orgId] : [],
      organizationId: orgId,
    },
    {
      userInfo: {
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.firstName || "Anonymous",
        avatar: user.imageUrl,
      },
    }
  )

  return new Response(body, { status })
}
