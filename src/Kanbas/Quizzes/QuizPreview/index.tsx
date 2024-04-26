import React, { useState } from "react";
import { quizzes } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { KanbasState } from "../../store";

interface Quiz {
  name: string;
  _id: string;
  description: string;
  quizType: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  allowMultipleAttempts: boolean;
  due?: string;
  availableFrom?: string;
  until?: string;
  published: boolean;
  quizPoints: number;
  questions: Question[];
}

interface Question {
  questionTitle: string;
  questionText: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  isCorrect: boolean;
}


function QuizPreview() {
    const { quizId } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState("Quiz");
    const [shuffleAnswers, setShuffleAnswers] = useState(true);
    const [minutes, setMinutes] = useState("0");
    const [timeLimit, setTimeLimit] = useState(false);
    const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [availableFromDate, setAvailableFromDate] = useState<Date | null>(null);
    const [untilDate, setUntilDate] = useState<Date | null>(null);
    const [published, setPublished] = useState(false);
    const [quizPoints, setQuizPoints] = useState("0");
  
    const [quizzesList, setQuizList] = useState<any[]>(quizzes);
    const [selectedQuiz, setSelectedQuiz] = useState(quizzesList[0]);
    const [questions, setQuestions] = useState<Question[]>([]); // Initialize the questions array with the correct type
  
    const [activeTab, setActiveTab] = useState("details");
  
    const handleDetailsTab = () => setActiveTab("details");
    const handleQuestionsTab = () => setActiveTab("questions");

  return (
    <div>
      <div style={{ backgroundColor: "orange", padding: "10px", display: "flex", alignItems: "center" }}>
        <h2>{quiz.name}</h2>
        {published && <span style={{ marginLeft: "10px", fontSize: "20px" }}>!</span>}
        {published && <span style={{ marginLeft: "5px" }}>This is a preview of a published quiz</span>}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Instructions:</h3>
        <p>{quiz.description}</p>
      </div>
      <div>
    
        

        {questions.map((question, index) => (
            <div key={index} style={{ border: "1px solid black", padding: "10px", marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>{question.questionTitle}</h4> 
                    <span>{`Points: ${quiz.quizPoints}`}</span>
                </div>
                <p>{question.questionText}</p>
                <ul>
                    {question.answers.map((answer, ansIndex) => (
                        <li key={ansIndex}>{answer.text}</li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button style={{ backgroundColor: "grey", padding: "10px", border: "none", cursor: "pointer" }}>
          Next
        </button>
      </div>
      <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "lightgrey", padding: "10px" }}>
        <button style={{ backgroundColor: "red", padding: "10px", border: "none", cursor: "pointer" }}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizPreview;