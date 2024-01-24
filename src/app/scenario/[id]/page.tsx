import React from "react";

interface ScenarioPageProps {
  params: {
    id: string;
  };
}

const ScenarioPage = async ({ params }: ScenarioPageProps) => {
  await new Promise((r) => setTimeout(r, 1500));
  return (
    <div>
      <div>ScenarioPage</div>
      <div>{params.id}</div>
    </div>
  );
};

export default ScenarioPage;
