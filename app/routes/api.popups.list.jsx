import prisma from "../db.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop");

  if (!shopDomain) return Response.json([]);

  const shop = await prisma.shop.findUnique({
    where: { shopDomain },
  });

  if (!shop) return Response.json([]);

  const popups = await prisma.popup.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });

  const formatted = popups.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.isActive ? "active" : "inactive",
    views: 0,
    clicks: 0,
    config: p.config,
  }));

  return Response.json(formatted);
}