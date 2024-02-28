import { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export interface ASLThemeProps {
  id: string;
  description: string;
  image: string;
  level: number;
  title: string;
  isLocked: boolean;
}
const useASLThemes = () => {
  const [aslThemes, setAslThemes] = useState<ASLThemeProps[]>([]);

  const getASLTheme = async () => {
    const themesCollection = collection(db, "themes");
    const themeDoc = await getDocs(themesCollection);
    const asls: ASLThemeProps[] = await Promise.all(
      themeDoc.docs.map(async (sourceDoc) => {
        const theme: ASLThemeProps = sourceDoc.data() as ASLThemeProps;
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
