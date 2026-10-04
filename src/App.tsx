import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
