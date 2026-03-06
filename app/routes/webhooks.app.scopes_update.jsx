import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  try {
    const { payload, session, topic, shop } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: { scope: payload.current.toString() },
      });
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Webhook auth/HMAC failed (app scopes_update)", err);
    return new Response("Unauthorized", { status: 401 });
  }
};