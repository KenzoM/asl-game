"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";
import { getDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import ThemeTiles from "@/components/ThemeTiles";
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
      <h1 className="text-center text-4xl pt-12">ASL Game</h1>
      <div className="container">
        {aslThemes.length > 0 &&
          aslThemes.map((theme) => {
            return (
              <ThemeTiles
                key={theme.id}
                id={theme.id}
                title={theme.title}
                image={theme.image}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Home;
