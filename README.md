# OOYI Orbit

The complete static OOYI website, including the expanded homepage and Signal Field animation.
Source revision 49caee31c38f7f802f8acbda2f5e9825afe0a65f.

## Preview on your computer

Extract this ZIP. Open Terminal inside the OOYI-Orbit folder and run:

    python3 -m http.server 8080 --directory dist

Open http://localhost:8080 in your browser.

Use the local server so links and assets resolve from the website root.

## Edit

- build.mjs generates all 14 HTML pages.
- content.mjs contains project and journal content.
- landing.mjs contains expanded homepage sections.
- dist/style.css contains the styles.
- dist/app.js contains interactions and animation.
- dist/mark.svg contains the icon.

After changing the .mjs files, regenerate the HTML using Node.js 18 or later:

    node build.mjs

The CSS and browser JavaScript live directly in dist and are preserved by the build script.
No npm installation or environment variables are needed.

## Deploy

Upload the contents of dist to a static website host. The website assumes it is served at the domain root.

The project uses plain HTML, CSS, JavaScript, and Node.js page generation. Content editing uses the source files. The collaboration form downloads a brief in the browser. The Fieldnotes checklist is a browser demo.
