import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz/:week" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;

