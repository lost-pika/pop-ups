import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  console.log("Publish clicked");

  // 1️⃣ Authenticate first
  const { session } = await authenticate.admin(request);

  if (!session?.shop) {
    return Response.json({ error: "No shop session" }, { status: 401 });
  }

  console.log("Session shop:", session.shop);

  // 2️⃣ NOW parse body (IMPORTANT ORDER)
  const body = await request.json();

  const shop = await prisma.shop.upsert({
    where: { shopDomain: session.shop },
    update: {},
    create: { shopDomain: session.shop },
  });

  // deactivate previous active popup
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