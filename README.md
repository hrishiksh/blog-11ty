## 🎯 Target

- [x] added golang blog
- [x] Faveicon
- [x] seo headera
- [x] robots.txt
- [x] sitemap
- [x] RSS feed
- [x] responsive design
- [x] google site varification tag
- [x] Setting up tips section
- [x] 404 page
- [x] front page
- [x] bulk redirect to www and pages.dev domain
- [x] convert date shortcode to filter
- [ ] jsonld
- [ ] dark mode
- [ ] chnage prose-code bg

hi

## Saved ! maybe need in the future

To add heading links

```js
eleventyConfig.setLibrary(
    "md",
    markdownit().use(anchor, {
      permalink: anchor.permalink.linkAfterHeader({
        style: "visually-hidden",
        assistiveText: (title) => `Permalink to “${title}”`,
        visuallyHiddenClass: "sr-only",
        placement: "before",
        // class: "pr-4 text-2xl font-medium no-underline",
        symbol: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 9c0-.55-.45-1-1-1h-3V5c0-.55-.45-1-1-1s-1 .45-1 1v3h-4V5c0-.55-.45-1-1-1s-1 .45-1 1v3H5c-.55 0-1 .45-1 1s.45 1 1 1h3v4H5c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h4v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3v-4h3c.55 0 1-.45 1-1zm-6 5h-4v-4h4v4z"/></svg>`,
        wrapper: [
          '<div class="flex flex-row-reverse items-baseline justify-end">',
          "</div>",
        ],
      }),
    })
  );
```