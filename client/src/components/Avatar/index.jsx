import React from "react";
import "./Avatar.sass";

const DEFAULT_AVATAR = "https://goo.gl/F65XTo";

function Avatar({ src, alt, imgProps }) {
  return (
    <div className="Avatar">
      <img
        className="Avatar-image"
        src={src || DEFAULT_AVATAR}
        alt={alt}
        {...imgProps}
      />
    </div>
  );
}

export default Avatar;
