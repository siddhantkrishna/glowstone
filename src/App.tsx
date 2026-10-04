import { HashRouter, Route, Routes } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";

export default function App() {
  return (
    <HashRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
