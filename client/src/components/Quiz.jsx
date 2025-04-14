import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import questionsData from "../data/questions";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = () => {
  const { week } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    let selectedQuestions = [];
    if (week === "first-6") {
      for (let i = 1; i <= 6; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else if (week === "last-6") {
      for (let i = 7; i <= 12; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else if (week === "all-12") {
      for (let i = 1; i <= 12; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else {
      selectedQuestions = questionsData[week] || [];
    }
    setQuestions(shuffleArray(selectedQuestions));
  }, [week]);

  const handleAnswer = (qIndex, selectedOption) => {
    if (answers[qIndex]) return; // prevent changing answer
    setAnswers({
      ...answers,
      [qIndex]: selectedOption,
    });
  };

  const score = Object.entries(answers).filter(
    ([index, ans]) => questions[index]?.answer === ans
  ).length;

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Quiz: {week.replace(/-/g, " ").toUpperCase()}</h2>

      {questions.map((q, index) => (
        <div key={index} style={styles.questionCard}>
          <p style={styles.question}>{index + 1}. {q.question}</p>
          {q.options.map((opt, i) => {
            const selected = answers[index];
            let style = styles.option;
            if (selected) {
              if (opt === q.answer) style = { ...style, ...styles.correct };
              else if (opt === selected) style = { ...style, ...styles.incorrect };
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(index, opt)}
                style={style}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ))}

      {allAnswered && (
        <div style={styles.resultBox}>
          <h3>Your Score: {score} / {questions.length}</h3>
          <button onClick={() => navigate("/")} style={styles.backButton}>Go to Landing Page</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "1.5rem"
  },
  questionCard: {
    marginBottom: "1.5rem",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  question: {
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  option: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    margin: "0.25rem 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#e0e0e0",
    cursor: "pointer",
    fontSize: "1rem",
    textAlign: "left"
  },
  correct: {
    backgroundColor: "#c8e6c9",
    color: "#2e7d32"
  },
  incorrect: {
    backgroundColor: "#ffcdd2",
    color: "#c62828"
  },
  resultBox: {
    textAlign: "center",
    marginTop: "2rem"
  },
  backButton: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer"
  }
};

export default Quiz;
