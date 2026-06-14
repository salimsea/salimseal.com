import axios from "axios";
import { parseString } from "xml2js";
import { FUNCTextToSlug } from "helpers/common";

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
    const response = await axios.get(
      "https://salim-tekno.blogspot.com/feeds/posts/default?start-index=1&max-results=1000"
    );

    const posts = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result?.feed?.entry || []);
        }
      });
    });

    for (const item of posts) {
      if (item.title && item.title[0]?._) {
        const slug = FUNCTextToSlug(item.title[0]._);
        dynamicPaths.push(`${baseUrl}/blog/${slug}`);
      }
    }
  } catch (err) {
    console.error("Error fetching dynamic paths directly for sitemap:", err);
  }

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map((url) => {
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
    })
    .join("\n")}
</urlset>`.trim();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
