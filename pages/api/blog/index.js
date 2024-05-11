import axios from "axios";
import { FUNCTextToSlug } from "helpers/common";
const parseString = require("xml2js").parseString;
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    var retContents = [],
      retCategory = [],
      ret = {};

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      var start = 1,
        max = 100;
      start = fields["start"] || 1;
      max = fields["max"] || 100;

      axios
        .get(
          `https://salim-tekno.blogspot.com/feeds/posts/default?start-index=${start}&max-results=${max}`
        )
        .then((response) => {
          var data = response.data;
          try {
            parseString(data, function (err, result) {
              var contents = result.feed["entry"],
                category = result.feed["category"];

              for (const item of contents) {
                var postUrl = "";
                for (const itemx of item["link"]) {
                  if (itemx["$"]["rel"] == "alternate") {
                    postUrl = itemx["$"]["href"];
                    break;
                  }
                }

                var thumbnail = `${item["media:thumbnail"][0]["$"][
                  "url"
                ].replace("s72-c", "s1600")}`;

                var entryShort = item["content"][0]._.replace(/<[^>]*>?/gm, "")
                  .substring(0, 200)
                  .replace(/\&nbsp;/g, "");
                var entryEnd = entryShort.lastIndexOf(" ");
                var postContent = entryShort.substring(0, entryEnd) + "...";

                entryShort = item["content"][0]._.replace(/<[^>]*>?/gm, "")
                  .substring(0, 100)
                  .replace(/\&nbsp;/g, "");
                entryEnd = entryShort.lastIndexOf(" ");
                var postContentSmall =
                  entryShort.substring(0, entryEnd) + "...";

                entryShort = item["title"][0]._.replace(
                  /<[^>]*>?/gm,
                  ""
                ).substring(0, 50);
                entryEnd = entryShort.lastIndexOf(" ");
                var titleSmall = entryShort.substring(0, entryEnd) + "...";

                var created = new Date(item["published"]);
                var updated = new Date(item["updated"]);
                var idBlog = `${created.getDate()}${created.getMonth()}${created.getFullYear()}${created.getHours()}${created.getMinutes()}`;

                retContents.push({
                  id: idBlog,
                  slug: `${FUNCTextToSlug(item["title"][0]._)}`,
                  created: `${created.toLocaleString("en-US")}`,
                  updated: `${updated.toLocaleString("en-US")}`,
                  title: `${item["title"][0]._}`,
                  thumbnail,
                  titleSmall,
                  postUrl,
                  postContent,
                  postContentSmall,
                });
              }

              for (const item of category) {
                retCategory.push(`${item["$"]["term"]}`);
              }

              var retData = {
                retContents,
                retCategory,
              };
              ret = {
                error: false,
                message: null,
                data: retData,
              };
              resolve(ret);
            });
          } catch (err) {
            ret = {
              error: true,
              message: "data not found",
              data: [],
            };
            resolve(ret);
          }
        })
        .catch((err) => {
          ret = {
            error: true,
            message: "request failed",
            data: [],
          };
          resolve(ret);
        });
    });
  });
  return promise.then((ret) => {
    res.status(200).json(ret);
  });
}
