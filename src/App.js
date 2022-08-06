import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";

import InputComp from "./components/InputComp";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (val) => {
    setSearch(val);
  };

  return (
    <section className="App">
      <div className="header">
        <InputComp
          placeholder="Search"
          value={search}
          handleSearch={handleSearch}
        />
      </div>
    </section>
  );
}

export default App;
