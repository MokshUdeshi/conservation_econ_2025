import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedWeek) navigate(`/quiz/${selectedWeek}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Conservation Economics 2025</h1>
      <select
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(e.target.value)}
        style={styles.select}
      >
        <option value="">Select Week</option>
        {[...Array(12).keys()].map((i) => (
          <option key={i} value={`week-${i + 1}`}>Week {i + 1}</option>
        ))}
        <option value="first-6">First 6 Weeks</option>
        <option value="last-6">Last 6 Weeks</option>
        <option value="all-12">All 12 Weeks</option>
      </select>
      <button onClick={handleSubmit} style={styles.button}>Start Quiz</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "1.75rem",
    marginBottom: "1.5rem"
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem"
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Landing;