import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  return (
    <Router>
      <DarkModeToggle />
      <Analytics/>
      <SpeedInsights/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz/:week" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;



