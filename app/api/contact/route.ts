import { handleSubmission, methodNotAllowed } from "@/lib/forms/handler";

export const runtime = "nodejs";

export function GET() {
  return methodNotAllowed();
}

export async function POST(request: Request) {
  return handleSubmission(request, "contact");
}
