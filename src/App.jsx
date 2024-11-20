import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home/Home";
import Detail from "./components/detail/Detail";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
