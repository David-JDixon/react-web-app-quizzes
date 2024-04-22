import React from "react";
import { quizzes } from "../../Database";

const defaultQuiz: Quiz = {
    _id: "1",
    name: "Default Quiz",
    description: "This is a default quiz",
    questions: [
        {
            _id: "1",
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            correctAnswer: "Paris",
        },
        {
            _id: "2",
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Jupiter", "Venus", "Saturn"],
            correctAnswer: "Jupiter",
        },
    ],
};

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
}

interface Props {
    quizzes: Quiz[];
    quizId: string;
}

function QuizPreview() {
    const selectedQuiz = defaultQuiz;
    return (
        <div>
            <h2>{selectedQuiz.name}</h2>
            {selectedQuiz.questions.map((question) => (
                <div key={question._id}>
                    <p>{question.question}</p>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default QuizPreview;