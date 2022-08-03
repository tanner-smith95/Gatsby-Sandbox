import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ContentfulImage = ({ image }) => {
  let fullURL = image?.image?.url || null;

  const fileSize = image?.image?.file?.details?.size;
  let autoQuality = null;

  if (fileSize > 300000) {
    autoQuality = Math.round((300000 / fileSize) * 10);
  }

  if (autoQuality) {
    fullURL = `${fullURL}?q=${autoQuality}`;
  } else if (fullURL && image?.formatOverride) {
    let overrideParams = image.formatOverride.split("-");
    fullURL = `${fullURL}?fm=${overrideParams[0]}${
      overrideParams?.[1] ? `&fl=${overrideParams[1]}` : ""
    }`;
  }

  return (
    <LazyLoadImage
      style={{ width: "100%" }}
      src={fullURL}
      alt={image?.altText}
      effect="blur"
    />
  );
};

export default ContentfulImage;
