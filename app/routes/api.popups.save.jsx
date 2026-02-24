import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  const { session } = await authenticate.admin(request);

  if (!session?.shop) {
    return Response.json({ error: "No shop session" }, { status: 401 });
  }

  const shopDomain = session.shop;

  const body = await request.json();

  const shop = await prisma.shop.upsert({
    where: { shopDomain },
    update: {},
    create: { shopDomain },
  });

  await prisma.popup.updateMany({
    where: { shopId: shop.id, isActive: true },
    data: { isActive: false },
  });

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