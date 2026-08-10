import { hero } from "@/lib/content";
import { renderSocialImage, socialImageSize } from "@/lib/social-image";

// A route handler under the hood; output: "export" requires this explicit
// rather than inferred.
export const dynamic = "force-static";

export const alt = `${hero.name} - ${hero.title}`;
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage();
}
