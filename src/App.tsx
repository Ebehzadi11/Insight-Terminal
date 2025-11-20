import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const MacroDashboard = lazy(() => import("./pages/MacroDashboard"));

function App() {
  return (
    <Suspense fallback={<div className="w-screen h-screen bg-slate-900 flex items-center justify-center"><p className="text-slate-400">Loading...</p></div>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/macro" element={<MacroDashboard />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
