export const runtime = "nodejs";

import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { shop, topic } = await authenticate.webhook(request);
    console.log(`[GDPR] ${topic} for ${shop}`);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Webhook verification failed", error);
    return new Response("Unauthorized", { status: 401 });
  }
};
