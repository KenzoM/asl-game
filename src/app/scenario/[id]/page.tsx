import React from "react";

interface ScenarioPageProps {
  params: {
    id: string;
  };
}

const ScenarioPage = ({ params }: ScenarioPageProps) => {
  return (
    <div>
      <div>ScenarioPage</div>
      <div>{params.id}</div>
    </div>
  );
};

export default ScenarioPage;
