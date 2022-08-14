import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import List from "./components/List";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="employeeDetail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
