import React from "react";
import { FacebookShareButton, TwitterShareButton,LineShareButton } from "react-share";
import { FacebookIcon, TwitterIcon,LinkedinIcon } from "react-share";

export default function ShareComponent({title,url,hashtag,quote}) {
  return (
    <div className="social_icons_shares">
      <FacebookShareButton
        url={url}
        quote={quote}
        hashtag={hashtag}
      ><FacebookIcon size={32} round /> 
      </FacebookShareButton>

      <TwitterShareButton
        title={title}
        url={url}
        hashtags={hashtag}
      ><TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}