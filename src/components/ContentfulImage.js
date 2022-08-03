import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ContentfulImage = ({ image }) => {
  let fullURL = image?.image?.url || null;
  let queryParams = [];

  const fileSize = image?.image?.file?.details?.size;
  let quality = null;

  // Set image quality if use source quality is not specified
  if (!image?.useSourceQuality) {
    // if a custom quality is set, use that
    if (image?.customQuality) {
      quality = image.customQuality;

      // otherwise, automatically reduce the quality if the image file size is greater than 300kb
    } else if (fileSize > 300000) {
      quality = Math.round((300000 / fileSize) * 10);
    }
  }

  if (quality) {
    queryParams.push(`q=${quality}`);
  }

  // Set image override format if specified
  if (image?.formatOverride) {
    let overrideParams = image.formatOverride.split("-");

    // Set the base override format (ex: jpg)
    queryParams.push(`fm=${overrideParams[0]}`);

    // Specify the image format subvariant if the selected format type has an alternate flavor (ex: jpg-progressive)
    if (overrideParams?.[1]) {
      queryParams.push(`fl=${overrideParams[1]}`);
    }
  }

  // If any image query params were created, append them to the image URL
  if (queryParams.length > 0) {
    fullURL = `${fullURL}?${queryParams.join("&")}`;
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
