const description =
  "Quality clothing, right to your doorstep.";
const title = "JBX Clothing";
const url = "https://jbxclothing.ca";

const seo = {
  title,
  titleTemplate: "%s | Store",
  description,
  openGraph: {
    description,
    title,
    type: "website",
    url,
  },
  twitter: {
    handle: "@jbxclothing",
    site: "@jbxclothing",
  },
};

export { seo as defaultSEO, url as defaultUrl };
