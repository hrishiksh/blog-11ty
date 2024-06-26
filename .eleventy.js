const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownit = require("markdown-it");
const codeBlockName = require("markdown-it-named-code-blocks");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });
  eleventyConfig.addPassthroughCopy({
    "src/assets/inline-images": "inline-images",
  });
  eleventyConfig.addPassthroughCopy({ "src/extra/robots.txt": "robots.txt" });

  eleventyConfig.addFilter("formattedDate", (dateobject) => {
    let parsedDate = new Date(dateobject).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return parsedDate;
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.setLibrary("md", markdownit().use(codeBlockName));

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
