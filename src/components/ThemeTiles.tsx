import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ThemeTilesProps {
  title: string;
  image: string;
  id: string;
}

const ThemeTiles = ({ title, image, id }: ThemeTilesProps) => {
  return (
    <div key={title} className="item">
      <div className="theme-image">
        <header>
          <Link className="tile-scenario" href={`/scenario/${id}`}>
            <h2>{title}</h2>
          </Link>
        </header>
        <Image
          src={image}
          alt={title}
          fill
          className="rounded"
          sizes="(max-width:768px) 100vw, 700px"
        />
      </div>
    </div>
  );
};

export default ThemeTiles;