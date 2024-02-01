import {
  doc,
  collection,
  getDocs,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import CanvasThree from "@/components/CanvasThree";
import Model from "@/components/Model";

interface ScenarioPageProps {
  params: {
    id: string;
  };
}

interface subCollectionProps {
  id: string;
  data: DocumentData;
}

const ScenarioPage = async ({ params }: ScenarioPageProps) => {
  // await new Promise((r) => setTimeout(r, 1500)); // testing purposes
  const getModelData = async () => {
    try {
      const sourceDoc = await getDoc(doc(db, params.id, `${params.id}-id`));
      if (!sourceDoc.exists()) {
        console.error("no sourceDoc is found ");
        throw Error;
      }
      return sourceDoc.data();
    } catch (error) {
      console.error(`Error in getModelData: ${error}`);
    }
  };

  const getMultipleChoices = async () => {
    try {
      const docRef = doc(db, params.id, `${params.id}-id`);
      const subColQuerySnapshot = await getDocs(
        collection(docRef, "questions")
      );
      const subCollections = [] as subCollectionProps[];
      subColQuerySnapshot.forEach((doc) => {
        subCollections.push({ id: doc.id, data: doc.data() });
      });
      return subCollections;
    } catch (error) {
      console.error(`Error in getMultipleChoices: ${error}`);
    }
  };

  const responses = await Promise.all([getMultipleChoices(), getModelData()]);

  const [multipleChoicesData, modeldata] = responses;

  if (!modeldata) return null;

  return (
    <div className="flex flex-col" style={{ maxWidth: "450px" }}>
      <h1>{modeldata.title}</h1>
      <div>ScenarioPage</div>
      <CanvasThree>
        <Model url={modeldata.animation} />
      </CanvasThree>
    </div>
  );
};

export default ScenarioPage;
