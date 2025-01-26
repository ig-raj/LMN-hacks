import React, { useState } from "react";
import Card from "../components/ui/card.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { CardContent } from "../components/ui/CardContent.jsx";

const LearningPath = () => {
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [learningPath, setLearningPath] = useState(null);

  const handleGeneratePath = () => {
    if (!skill) return;

    setLoading(true);
    setLearningPath(null);

    // Hardcoded learning path and recommended courses
    const hardcodedLearningPath = {
      path: [
        { skill: "Understand the basics of JavaScript", time: "1 week" },
        { skill: "Learn React fundamentals", time: "2 weeks" },
        { skill: "Build a React project", time: "2 weeks" },
        { skill: "Dive into React advanced concepts", time: "3 weeks" },
        { skill: "Explore state management (e.g., Redux)", time: "1 week" },
      ],
      courses: [
        {
          title: "JavaScript for Beginners",
          teacher: "John Doe",
          subject: "JavaScript",
          url: "https://example.com/javascript-course",
        },
        {
          title: "React - The Complete Guide",
          teacher: "Jane Smith",
          subject: "React",
          url: "https://example.com/react-course",
        },
        {
          title: "Advanced React Patterns",
          teacher: "Emily Johnson",
          subject: "React Advanced",
          url: "https://example.com/advanced-react-course",
        },
      ],
    };

    // Simulate API response delay
    setTimeout(() => {
      setLearningPath(hardcodedLearningPath);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Your Learning Path</h1>
      <div className="mb-4">
        <Input
          placeholder="What do you want to learn? (e.g., React, Python)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>
      <Button onClick={handleGeneratePath} disabled={loading}>
        {loading ? "Generating..." : "Generate Learning Path"}
      </Button>

      {learningPath && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Learning Path:</h2>
          <Card className="mb-4">
            <CardContent>
              {learningPath.path.map((step, index) => (
                <div key={index} className="mb-2">
                  <strong>Step {index + 1}: </strong>
                  {step.skill} - <em>{step.time}</em>
                </div>
              ))}
            </CardContent>
          </Card>
          <h2 className="text-xl font-bold mb-2">Recommended Courses:</h2>
          {learningPath.courses.map((course, index) => (
            <Card key={index} className="mb-2">
              <CardContent>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p>Teacher: {course.teacher}</p>
                <p>Subject: {course.subject}</p>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Course
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPath;
