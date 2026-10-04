import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
