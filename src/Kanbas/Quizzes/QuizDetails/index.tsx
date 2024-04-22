// QuizDetails.tsx

import React, { useState } from "react";
import { Route, useNavigate } from "react-router";
import QuizDetailEditor from "../QuizDetailEditor";
import "./index.css"; // Import CSS file

function QuizDetails() {
  const [quizDetails, setQuizDetails] = useState({
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: "20 Minutes",
    multipleAttempts: "No",
    showCorrectAnswers: "No",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    for: "Everyone"
  });
  const navigate = useNavigate();

  const handlePublishToggle = () => {
    setQuizDetails({ ...quizDetails, published: !quizDetails.published });
  };

  const handlePreviewClick = (quiz : any) => {
    // Navigate to Quiz Preview screen
    const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
    navigate(`/quiz-preview/${newQuiz._id}`);
  };

  const handleEditClick = (quiz: any) => {
    // Navigate to Quiz Editor screen
    const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
    navigate(`/edit-quiz/${newQuiz._id}`);
  };

  const calculateTotalPoints = () => {
    // Logic to calculate total points from questions
  };

  return (
    <div className="container">
      <h2>Quiz Details</h2>
      <div className="buttons-container">
        <button
          className={`publish-button ${quizDetails.published ? "published" : ""}`}
          onClick={handlePublishToggle}
        >
          {quizDetails.published ? "Unpublish" : "Publish"}
        </button>
        <button className="button preview-button" onClick={handlePreviewClick}>
          Preview
        </button>
        <button className="button edit-button" onClick={handleEditClick}>
          Edit
        </button>
      </div>
      <div className="grey-bar"></div> {/* Grey bar */}
      <div>
        <p><strong>Quiz Type </strong> {quizDetails.quizType}</p>
        <p><strong>Points </strong> {quizDetails.points}</p>
        <p><strong>Assignment Group </strong> {quizDetails.assignmentGroup}</p>
        <p><strong>Shuffle Answers </strong> {quizDetails.shuffleAnswers}</p>
        <p><strong>Time Limit </strong> {quizDetails.timeLimit}</p>
        <p><strong>Multiple Attempts </strong> {quizDetails.multipleAttempts}</p>
        <p><strong>Show Correct Answers </strong> {quizDetails.showCorrectAnswers}</p>
        <p><strong>Access Code </strong> {quizDetails.accessCode}</p>
        <p><strong>One Question At A Time </strong> {quizDetails.oneQuestionAtATime}</p>
        <p><strong>Webcam Required </strong> {quizDetails.webcamRequired}</p>
        <p><strong>Lock Questions After Answering </strong> {quizDetails.lockQuestionsAfterAnswering}</p>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available From</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quizDetails.dueDate}</td>
              <td>{quizDetails.for}</td>
              <td>{quizDetails.availableDate}</td>
              <td>{quizDetails.untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
  );
}

export default QuizDetails;