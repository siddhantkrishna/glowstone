import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navigation from "@/components/Navigation";
import Customers from "@/components/Customers";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import ClientLogin from "@/pages/ClientLogin";
import ClientDashboard from "@/pages/ClientDashboard";

function AppShell() {
  const location = useLocation();

  const portalRoute =
    location.pathname === "/invoice" ||
    location.pathname.startsWith(
      "/client/",
    );

  return (
    <>
      {!portalRoute && (
        <Navigation />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/invoice"
          element={<ClientLogin />}
        />

        <Route
          path="/client/:projectId"
          element={<ClientDashboard />}
        />
      </Routes>

      {!portalRoute && (
        <>
          <Customers />
          <Footer />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
