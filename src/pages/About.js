import React, { useState } from "react";
import EutrophicationDiagram from "./EutrophicationDiagram";



function App() {
  const [selectedId, setSelectedId] = useState("hypoxia");



  return (

    <div>
      <EutrophicationDiagram />
    </div>
  );
}

export default App;