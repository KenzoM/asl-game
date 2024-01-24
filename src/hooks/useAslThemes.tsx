import { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface ASLTheme {
  id: string;
  description: string;
  image: string;
  level: number;
  title: string;
}
const useASLThemes = () => {
  const [aslThemes, setAslThemes] = useState<ASLTheme[]>([]);

  const getASLTheme = async () => {
    const themesCollection = collection(db, "themes");
    const themeDoc = await getDocs(themesCollection);
    const asls: ASLTheme[] = await Promise.all(
      themeDoc.docs.map(async (sourceDoc) => {
        const theme: ASLTheme = sourceDoc.data() as ASLTheme;
        return theme;
      })
    );
    setAslThemes(asls);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getASLTheme();
    };

    fetchData();
  }, []);

  if (aslThemes.length < 1) {
    return null;
  }

  return aslThemes;
};

export default useASLThemes;
