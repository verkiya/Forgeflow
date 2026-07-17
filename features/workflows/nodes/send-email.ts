import { resend } from "@/lib/resend"

export async function sendEmail({
  to,
  subject,
  body,
  idempotencyKey,
}: {
  to: string
  subject: string
  body: string
  idempotencyKey: string
}) {
  const { data, error } = await resend.emails.send(
    {
      from: "onboarding@resend.dev",
      to,
      subject,
      text: body,
    },
    { idempotencyKey }
  )

  // The Resend SDK returns API errors instead of throwing. A missing payload is
  // also an unsuccessful send and must fail the workflow rather than look done.
  if (error || !data) {
    throw new Error(error?.message ?? "Resend returned no email id")
  }

  return {
    id: data.id,
  }
}
