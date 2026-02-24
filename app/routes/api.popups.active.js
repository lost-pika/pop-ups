import prisma from "../db.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) return Response.json(null);

  const dbShop = await prisma.shop.findUnique({
    where: { domain: shop },
  });

  if (!dbShop) return Response.json(null);

  const popup = await prisma.popup.findFirst({
    where: {
      shopId: dbShop.id,
      isActive: true,
    },
  });

  return Response.json(popup);
}