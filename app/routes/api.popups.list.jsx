import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request }) {

  const { session } = await authenticate.admin(request);

  if (!session?.shop) {
    return Response.json([]);
  }

  const shop = await prisma.shop.findUnique({
    where: { shopDomain: session.shop },
  });

  if (!shop) {
    return Response.json([]);
  }

  const popups = await prisma.popup.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });

  const formatted = popups.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.isActive ? "active" : "inactive",
    isActive: p.isActive,
    views: 0,
    clicks: 0,
    config: p.config,
  }));

  return Response.json(formatted);
}