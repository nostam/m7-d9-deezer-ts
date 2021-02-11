import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Result } from "./types/interfaces";

function App() {
  const [data, setData] = useState<Result[]>([]);
  function handleResult(data: Result[]) {
    return setData(data);
  }
  return (
    <Router>
      <NavBar setData={handleResult} />
      <Route path="/" render={(props) => <Home {...props} data={data} />} />
    </Router>
  );
}

export default App;
