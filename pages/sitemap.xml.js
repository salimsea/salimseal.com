import axios from "axios";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ req, res }) => {
  const protocol = req.headers["x-forwarded-proto"] || (req.connection?.encrypted ? "https" : "http");
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const staticPaths = [
    "",
    "/portfolio",
    "/tools",
    "/blog",
  ].map((path) => `${baseUrl}${path}`);

  const dynamicPaths = [];
  try {
    const resBlog = await axios.post(
      `${baseUrl}/api/blog`,
      {
        start: "1",
        max: "1000",
      }
    );
    const blog = resBlog.data?.data;
    if (blog && blog.retContents) {
      blog.retContents.forEach((item) => {
        if (item.slug) {
          dynamicPaths.push(`${baseUrl}/blog/${item.slug}`);
        }
      });
    }
  } catch (err) {
    console.error("Error fetching dynamic paths for sitemap:", err);
  }

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
