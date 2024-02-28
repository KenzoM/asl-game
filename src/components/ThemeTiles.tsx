import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ASLThemeProps } from "@/hooks/useAslThemes";

interface ThemeTilesProps {
  themeDetails: ASLThemeProps;
}
//TODO: this should be reusable and not only depend on theme..
const ThemeTiles: React.FC<ThemeTilesProps> = ({ themeDetails }) => {
  const { title, isLocked, image, id } = themeDetails;
  return (
    <div key={title} className={isLocked ? "theme-tile-locked" : "theme-tile"}>
      <div className="theme-image">
        <div className={`rounded flex h-full ${image ? "" : "gradient-bg"}`}>
          {isLocked ? (
            <div className="tile-scenario">
              <h2>{title}</h2>
            </div>
          ) : (
            <Link className="tile-scenario" href={`/scenario/${id}`}>
              <h2>{title}</h2>
            </Link>
          )}
        </div>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="rounded"
            sizes="(max-width:768px) 100vw, 700px"
          />
        )}
      </div>
    </div>
  );
};

export default ThemeTiles;
