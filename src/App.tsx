import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  const [data, setData]: [any, any] = useState();
  const handleResult = (data: any) => setData(data);
  return (
    <Router>
      <NavBar setData={handleResult} />
      <Route path="/" render={(props) => <Home {...props} data={data} />} />
    </Router>
  );
}

export default App;
