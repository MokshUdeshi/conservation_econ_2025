import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import DarkModeToggle from "./components/DarkModeToggle";
import { SpeedInsights } from "@vercel/speed-insights/next"

const App = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Router>
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz/:week" element={<Quiz />} />
        </Routes>
      </Router>
      <SpeedInsights/>
    </div>
  );
};

export default App;


