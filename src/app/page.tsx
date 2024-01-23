"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/app/firebaseConfig";
import { getDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";

interface ASLTheme {
  id: string;
  description: string;
  image: string;
  level: number;
  title: string;
}

const Home = () => {
  const [aslThemes, setAslThemes] = useState<ASLTheme[]>([]);

  const getASLTheme = async () => {
    const themesCollection = collection(db, "themes");
    const themeDoc = await getDocs(themesCollection);

    const asls: ASLTheme[] = [];
    themeDoc.forEach(async (sourceDoc) => {
      const theme: ASLTheme = sourceDoc.data() as ASLTheme;
      asls.push(theme);
    });

    setAslThemes(asls);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getASLTheme();
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col ">
      <h1 className="text-center">Hello world!</h1>
      <div className="container">
        {aslThemes.length > 0 &&
          aslThemes.map((theme) => {
            return (
              <div key={theme.title} className="item">
                <header>
                  <h2>{theme.title}</h2>
                </header>
                <div className="theme-image">
                  <Image
                    src={theme.image}
                    alt={theme.title}
                    fill
                    sizes="(max-width:768px) 100vw, 700px"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Home;
