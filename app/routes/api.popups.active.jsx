export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  // TEMP DATA (replace with DB later)
  const popup = {
    config: {
      heading: "Welcome Offer 🎉",
      subheading: "GET10OFF",
      buttonText: "Claim Now",
      bgColor: "#ffffff",
      textColor: "#000000",
      btnColor: "#008060",
      borderRadius: 16,
      fontFamily: "sans",
    },
  };

  return new Response(JSON.stringify(popup), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}