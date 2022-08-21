import * as fs from "fs";
import axios from "axios";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_DIR = process.env.NODE_ENV === "production" ? "./" : "pages";
  const staticPaths = fs
    .readdirSync(BASE_DIR)
    .filter((staticPage) => {
      return ![
        "api",
        "_app.js",
        "_document.js",
        "404.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${process.env.BASE_URL}/${staticPagePath.replace(".js", "")}`;
    });

  const dynamicPaths = [];
  // const resBlog = await axios.post(`${process.env.BASE_URL}/api/blog`, {
  //   start: "1",
  //   max: "1000",
  // });
  // const blog = await resBlog.data.data;
  // blog.retContents?.map((item) => {
  //   dynamicPaths.push(`${process.env.BASE_URL}/blog/${item.slug}`);
  // });

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
