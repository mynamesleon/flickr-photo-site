# Flickr Photography Site - WORK IN PROGRESS

A Flickr-API and PHP powered, Reactjs photography site, that can be connected to any individual Flickr account.

## Demo

[photography.mynamesleon.com](http://photography.mynamesleon.com/)

## How to Use

1. In src/flickrdata.js, include your API key and User ID
2. In the command line, run "npm install" to download all dependencies (assuming you have [Node](https://nodejs.org/en/ "Node JS") installed)
3. Use "npm run build" to generate the production code, which will be placed in a "dist" folder

The API responses will be cached, if possible, in a "cache" folder at the site root. It would be advisable to create this folder yourself, either directly on your server, or inside the "dist" directory before uploading it, and to ensure that the cache folder can be written to.

## Regarding Flickr's Terms of Service

**This is not a replacement for Flickr**. It allows for browsing of a deliberately limited portion of a user's public Flickr data - namely their albums, and the photos in them, as returned by the Flickr API's default options. It does **not** provide any means of uploading, creating, downloading, or editing images, or of viewing any further data, such as a user's collections, galleries, groups, favourites, etc.

Only one (obstructed, typically cropped) full-size image is displayed at any time. Smaller image variants are used for navigation, and only a maximum of 6 of these is visible on the page at any given time.

Images are never stored on the server, only the API response is cached (on the server, and in session and local storage if available). No mechanism is ever provided to explicitly allow users to download the images. Additionally, all images are deliberately obstructed so that a user cannot simply right-click to save or view the images unobstructed.
