import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import CanvasThree from "@/components/CanvasThree";
import Model from "@/components/Model";

interface ScenarioPageProps {
  params: {
    id: string;
  };
}

const ScenarioPage = async ({ params }: ScenarioPageProps) => {
  await new Promise((r) => setTimeout(r, 1500));

  const getCollection = async () => {
    const sourceDoc = await getDoc(doc(db, params.id, `${params.id}-id`));
    if (!sourceDoc.exists()) {
      console.error("nothing ");
      return;
    }

    return sourceDoc.data();
  };

  const getSubCollection = async () => {
    const docRef = doc(db, params.id, `${params.id}-id`);
    const subColQuerySnapshot = await getDocs(collection(docRef, "questions"));
    subColQuerySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  // getSubCollection();
  const data = await getCollection();

  if (!data) return null;

  return (
    <div>
      <h1>{data.title}</h1>
      <div>ScenarioPage</div>
      <CanvasThree>
        <Model url={data.animation} />
      </CanvasThree>
    </div>
  );
};

export default ScenarioPage;
