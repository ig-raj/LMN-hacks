import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import Card from "../components/ui/card.jsx";
import { CardContent } from "../components/ui/CardContent.jsx";

const SkillTest = () => {
  const [skill, setSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [passed, setPassed] = useState(false);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGenerateTest = () => {
    if (!skill) return;

    // Hardcoded questions based on skill (10 questions for each skill)
    const skillQuestions = {
      JavaScript: [
        { question: "What is the output of `console.log(typeof null)`?", options: ["object", "null", "undefined", "number"], correct: "object" },
        { question: "Which method is used to add an element to an array?", options: [".push()", ".add()", ".append()", ".insert()"], correct: ".push()" },
        { question: "What is the purpose of `isNaN()` function?", options: ["Check if value is a number", "Check if value is NaN", "Check if value is undefined", "Check if value is null"], correct: "Check if value is NaN" },
        { question: "What is `const` in JavaScript?", options: ["A variable type", "A constant value", "A loop", "An error"], correct: "A constant value" },
        { question: "What does `===` check in JavaScript?", options: ["Equality only", "Strict equality", "Data type only", "Greater value"], correct: "Strict equality" },
        { question: "What is the default value of an uninitialized variable?", options: ["undefined", "null", "NaN", "0"], correct: "undefined" },
        { question: "Which of the following is a JavaScript framework?", options: ["React", "Django", "Laravel", "Spring"], correct: "React" },
        { question: "What is a promise in JavaScript?", options: ["A callback function", "An object representing future value", "A loop", "A variable"], correct: "An object representing future value" },
        { question: "Which operator is used for exponentiation?", options: ["**", "^^", "!!", "//"], correct: "**" },
        { question: "What does `Array.isArray()` do?", options: ["Checks if a value is an array", "Converts a value to array", "Filters an array", "Maps an array"], correct: "Checks if a value is an array" },
      ],
      Python: [
        { question: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "lambda"], correct: "def" },
        { question: "What is the output of `len([1, 2, 3])`?", options: ["3", "2", "4", "Error"], correct: "3" },
        { question: "Which of the following is immutable in Python?", options: ["List", "Dictionary", "Set", "Tuple"], correct: "Tuple" },
        { question: "Which keyword is used to start a loop in Python?", options: ["loop", "for", "while", "iterate"], correct: "for" },
        { question: "What is the output of `5 // 2`?", options: ["2", "2.5", "3", "Error"], correct: "2" },
        { question: "Which library is used for data manipulation in Python?", options: ["numpy", "pandas", "matplotlib", "scipy"], correct: "pandas" },
        { question: "Which function is used to print in Python?", options: ["echo", "print", "printf", "display"], correct: "print" },
        { question: "What does `range(5)` return?", options: ["[0,1,2,3,4,5]", "[0,1,2,3,4]", "[1,2,3,4,5]", "Error"], correct: "[0,1,2,3,4]" },
        { question: "What is the purpose of `import` in Python?", options: ["To call a function", "To import libraries", "To print output", "To create variables"], correct: "To import libraries" },
        { question: "What is the output of `type(5.0)`?", options: ["float", "int", "double", "Error"], correct: "float" },
      ],
    };

    setQuestions(skillQuestions[skill] || []);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setFeedback("");
    setPassed(false);
  };

  const handleAnswerChange = (index, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: answer,
    }));
  };

  const handleSubmitTest = () => {
    if (!questions.length) return;

    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    // Determine pass or fail and provide feedback
    const isPassed = calculatedScore > 6;
    setPassed(isPassed);

    const feedbackMessage = isPassed
      ? "Congratulations! You passed. You're ready to take the next step."
      : "Unfortunately, you did not pass. Keep practicing and try again.";
    setFeedback(feedbackMessage);

    // Redirect to Automail page if passed
    if (isPassed) {
      navigate("/automail");
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
      alert("Resume uploaded successfully!");
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Skill-Based Test</h1>

      {/* Input Skill */}
      <div className="mb-4">
        <Input
          placeholder="Enter the skill to test (e.g., JavaScript, Python)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>
      <Button onClick={handleGenerateTest}>Generate Test</Button>

      {/* Test Questions */}
      {questions.length > 0 && !submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Test for {skill}:</h2>
          {questions.map((question, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <p className="mb-2">
                  <strong>Q{index + 1}: </strong>
                  {question.question}
                </p>
                {question.options.map((option, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      id={`question-${index}-option-${i}`}
                      onChange={() => handleAnswerChange(index, option)}
                      checked={answers[index] === option}
                    />
                    <label htmlFor={`question-${index}-option-${i}`} className="ml-2">
                      {option}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleSubmitTest}>Submit Test</Button>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Results:</h2>
          <Card>
            <CardContent>
              <p>
                <strong>Score: </strong> {score}/{questions.length}
              </p>
              <p>
                <strong>Feedback: </strong> {feedback}
              </p>
              {passed && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Upload Your Resume</h3>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    className="mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SkillTest;
