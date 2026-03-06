import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  try {
    const { session } = await authenticate.admin(request);

    if (!session?.shop) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const shop = await prisma.shop.upsert({
      where: { shopDomain: session.shop },
      update: {},
      create: { shopDomain: session.shop },
    });

    let popup;

    // If popup exists → update
    if (body.id) {
      const existing = await prisma.popup.findUnique({
        where: { id: body.id },
      });

      if (existing) {
        popup = await prisma.popup.update({
          where: { id: body.id },
          data: {
            name: body.internalName,
            config: body,
            isActive: true,
          },
        });
      } else {
        popup = await prisma.popup.create({
          data: {
            shopId: shop.id,
            name: body.internalName,
            config: body,
            isActive: true,
          },
        });
      }
    } else {
      popup = await prisma.popup.create({
        data: {
          shopId: shop.id,
          name: body.internalName,
          config: body,
          isActive: true,
        },
      });
    }

    return Response.json({ success: true, popup });
  } catch (err) {
    console.error("SAVE POPUP ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}