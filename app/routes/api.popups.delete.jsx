import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {

  const { session } = await authenticate.admin(request);

  if (!session?.shop) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const shop = await prisma.shop.findUnique({
    where: { shopDomain: session.shop }
  });

  if (!shop) {
    return Response.json({ error: "Shop not found" }, { status: 404 });
  }

  await prisma.popup.deleteMany({
    where: {
      id,
      shopId: shop.id
    }
  });

  return Response.json({ success: true });
}