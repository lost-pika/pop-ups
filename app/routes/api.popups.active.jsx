import prisma from "../db.server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function loader({ request }) {
  // --- CORS preflight ---
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return Response.json(null, { headers: corsHeaders });
  }

 const dbShop = await prisma.shop.findUnique({
  where: {
    shopDomain: shop,
  },
});

  if (!dbShop) {
    return Response.json(null, { headers: corsHeaders });
  }

  const popup = await prisma.popup.findFirst({
    where: {
      shopId: dbShop.id,
      isActive: true,
    },
  });

  // 🔥 THIS WAS YOUR MAIN BUG
  return Response.json(popup, {
    headers: corsHeaders,
  });
}