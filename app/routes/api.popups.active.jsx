import prisma from "../db.server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function loader({ request }) {

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop");

  if (!shopDomain) {
    return new Response(JSON.stringify([]), {
      headers: corsHeaders,
    });
  }

  const shop = await prisma.shop.findUnique({
    where: { shopDomain },
  });

  if (!shop) {
    return new Response(JSON.stringify([]), {
      headers: corsHeaders,
    });
  }

  const popups = await prisma.popup.findMany({
    where: {
      shopId: shop.id,
      isActive: true,
    },
    select: {
      id: true,
      config: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify(popups), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}