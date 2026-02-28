import prisma from "../db.server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function loader({ request }) {

  // CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(request.url);

  const shopDomain = url.searchParams.get("shop");
  const id = url.searchParams.get("id");

  if (!shopDomain || !id) {
    return Response.json(null, { headers: corsHeaders });
  }

  const shop = await prisma.shop.findUnique({
    where: { shopDomain },
  });

  if (!shop) {
    return Response.json(null, { headers: corsHeaders });
  }

  const popup = await prisma.popup.findFirst({
    where: {
      id,
      shopId: shop.id,
    },
  });

  return Response.json(popup, {
    headers: corsHeaders,
  });
}