import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  console.log("Publish clicked");

  const { session } = await authenticate.admin(request);

  if (!session?.shop) {
    return Response.json({ error: "No shop session" }, { status: 401 });
  }

  const body = await request.json();

  const shop = await prisma.shop.upsert({
    where: { shopDomain: session.shop },
    update: {},
    create: { shopDomain: session.shop },
  });

  // 🚀 JUST CREATE ACTIVE POPUP
  const popup = await prisma.popup.create({
    data: {
      shopId: shop.id,
      name: body.internalName,
      isActive: true,
      config: body,
    },
  });

  return Response.json({ success: true, popup });
}