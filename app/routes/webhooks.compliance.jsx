// runtime declaration MUST be first
export const runtime = "nodejs";

import { authenticate } from "../shopify.server"; // NOT unauthenticated

export const action = async ({ request }) => {
  try {
    const { shop, topic } = await authenticate.webhook(request);
    console.log(`[COMPLIANCE] ${topic} for ${shop}`);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Webhook auth/HMAC failed (compliance)", err);
    return new Response("Unauthorized", { status: 401 });
  }
};