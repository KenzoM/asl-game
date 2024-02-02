import Image from "next/image";
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

interface OptionProps {
  imageUrl: string;
  text: string;
}

interface QuestionProps {
  id: string;
  data: {
    questionText: string;
    options: OptionProps[];
    correctAnswer: string;
  };
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

  const getQuestions = async () => {
    try {
      const docRef = doc(db, params.id, `${params.id}-id`);
      const subColQuerySnapshot = await getDocs(
        collection(docRef, "questions")
      );
      const subCollections = [] as QuestionProps[];
      subColQuerySnapshot.forEach((doc) => {
        subCollections.push({
          id: doc.id,
          data: doc.data() as QuestionProps["data"],
        });
      });
      return subCollections;
    } catch (error) {
      console.error(`Error in getQuestions: ${error}`);
    }
  };

  const responses = await Promise.all([getQuestions(), getModelData()]);

  const [questionsData, modeldata] = responses;

  if (!modeldata || !questionsData) return null;

  const renderMultipleChoices = () => {
    const firstQuestion = questionsData[0];

    const { questionText, options } = firstQuestion.data;

    const optionRender = options.map((option) => {
      return (
        <div key={option.text}>
          <Image
            src={option.imageUrl}
            alt={option.text}
            width={200}
            height={200}
            className="h-full w-full"
          />
        </div>
      );
    });

    return optionRender;
  };

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1>{modeldata.title}</h1>
        <div>ScenarioPage</div>
      </div>
      <CanvasThree>
        <Model url={modeldata.animation} />
      </CanvasThree>
      <div className="grid grid-cols-2 gap-4 p-2">
        {renderMultipleChoices()}
      </div>
    </div>
  );
};

export default ScenarioPage;
