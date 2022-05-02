import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/rooms/:slug" element={<SingleRoom />} />
        <Route path="/rooms/" element={<Rooms />} />
        <Route path="/" element={<Home />} />
        <Route element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
