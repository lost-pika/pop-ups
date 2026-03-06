export const runtime = "nodejs"; // MUST be first line

import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { shop, topic } = await authenticate.webhook(request);
    console.log(`[GDPR] ${topic} for ${shop}`);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Webhook HMAC failed", err);
    return new Response("Unauthorized", { status: 401 });
  }
};