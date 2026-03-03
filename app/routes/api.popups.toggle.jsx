// import prisma from "../db.server";
// import { authenticate } from "../shopify.server";

// export async function action({ request }) {
//   const { session } = await authenticate.admin(request);
//   const { id } = await request.json();

//   const popup = await prisma.popup.findUnique({
//     where: { id },
//   });

//   const updated = await prisma.popup.update({
//     where: { id },
//     data: {
//       isActive: !popup.isActive,
//     },
//   });

//   return Response.json(updated);
// }