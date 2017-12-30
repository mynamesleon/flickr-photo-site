import React from "react";

export default (title, description, url, image) => {
  const headTags = [];

  if (title) {
    headTags.push(
      ...[
        <title key="title">{title}</title>,
        <meta
          key="metatitle"
          itemprop="name"
          name="twitter:title"
          property="og:title"
          content={title}
        />
      ]
    );
  }

  if (description) {
    headTags.push(
      ...[
        <meta key="description" name="description" content={description} />,
        <meta key="ogdesc" name="og:description" content={description} />,
        <meta key="twitdesc" name="twitter:description" content={description} />
      ]
    );
  }

  if (url) {
    headTags.push(
      <meta
        key="url"
        itemprop="url"
        name="twitter:url"
        property="og:url"
        content={url}
      />
    );
  }

  if (!image) {
    headTags.push(
      <meta key="twittercard" name="twitter:card" content="summary" />
    );
  } else {
    headTags.push(
      <meta
        key="twittercard "
        name="twitter:card"
        content="summary_large_image"
      />,
      <meta
        key="image"
        itemprop="image"
        name="twitter:image"
        property="og:image"
        content={image}
      />
    );
  }

  return headTags;
};
