import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setQuiz,
  saveQuiz,
  saveAndPublishQuiz,
  addQuiz,
  updateQuiz,
} from "../reducer";
import { findQuizzesForCourse } from "../client";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { quizzes } from "../../Database";
import * as client from "../client";
import { parse } from "path";

//const QuizDetailEditor: React.FC = () => {
function QuizDetailEditor() {
  //const { courseId } = useParams();
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
  const [questions, setQuestions] = useState([]);

  const [activeTab, setActiveTab] = useState("details");

  const handleDetailsTab = () => setActiveTab("details");
  const handleQuestionsTab = () => setActiveTab("questions");

  // const handleSave = async () => {
  //   const status = await client.updateQuiz(quiz);
  //   dispatch(updateQuiz(quiz));
  // };

  const handleSave = () => {
    const newQuiz = {
      name: quizName,
      _id: quiz._id,
      description: quizDescription,
      quizType: quizType,
      shuffleAnswers: shuffleAnswers,
      timeLimit: timeLimit,
      allowMultipleAttempts: allowMultipleAttempts,
      due: dueDate?.toISOString(),
      availableFrom: availableFromDate?.toISOString(),
      until: untilDate?.toISOString(),
      published: false,
      quizPoints: quizPoints,
      questions: quiz.questions || [],
    };
    if (!newQuiz.name) newQuiz.name = "New Quiz";
    if (!newQuiz.timeLimit) newQuiz.timeLimit = false;
    if (!newQuiz.allowMultipleAttempts) newQuiz.allowMultipleAttempts = false;
    if (!newQuiz.due) newQuiz.due = new Date().toISOString();
    if (!newQuiz.availableFrom)
      newQuiz.availableFrom = new Date().toISOString();
    if (!newQuiz.until) newQuiz.until = new Date().toISOString();
    if (!newQuiz.quizPoints) newQuiz.quizPoints = "0";
    if (!quiz._id) {
      dispatch(addQuiz(newQuiz));
    } else {
      dispatch(updateQuiz(newQuiz));
    }
    navigate("/quiz-list");
  };

  const handleSaveAndPublish = () => {
    const newQuiz = {
      name: quizName,
      _id: quiz._id,
      description: quizDescription,
      quizType: quizType,
      shuffleAnswers: shuffleAnswers,
      timeLimit: timeLimit,
      allowMultipleAttempts: allowMultipleAttempts,
      due: dueDate?.toISOString(),
      availableFrom: availableFromDate?.toISOString(),
      until: untilDate?.toISOString(),
      published: true,
      quizPoints: quizPoints,
      questions: quiz.questions || [
        {
          questionTitle: "Question 1",
          questionText: "France is in Europ",
          answers: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
        },
      ],
    };
    if (!newQuiz.name) newQuiz.name = "New Quiz";
    if (!newQuiz.timeLimit) newQuiz.timeLimit = false;
    if (!newQuiz.allowMultipleAttempts) newQuiz.allowMultipleAttempts = false;
    if (!newQuiz.due) newQuiz.due = new Date().toISOString();
    if (!newQuiz.availableFrom)
      newQuiz.availableFrom = new Date().toISOString();
    if (!newQuiz.until) newQuiz.until = new Date().toISOString();
    if (!newQuiz.quizPoints) newQuiz.quizPoints = "0";
    if (!quiz._id) {
      dispatch(addQuiz(newQuiz));
    } else {
      dispatch(updateQuiz(newQuiz));
    }
    navigate("/quiz-list");
  };

  const handleCancel = () => {
    navigate("/quiz-list");
  };

  const parseDateOrNull = (dateString: string) => {
    const date = Date.parse(dateString);
    return isNaN(date) ? null : new Date(date);
  };

  const handleQuestions = (quiz: any) => {
    console.log(quiz._id);
    navigate(`/questionForm/${quiz._id}`);
  };

useEffect(() => {
  if (quizId && quizzesList.length > 0) {
    const selectedQuiz = quizzesList.find((quiz) => quiz._id === quizId);
    if (selectedQuiz) {
      setQuestions(selectedQuiz.questions || []); // Update questions state here
      dispatch(setQuiz(selectedQuiz));
    }
  }
}, [quizId, quizzesList, dispatch]);

  // for quizList?
  // useEffect(() => {
  //   findQuizzesForCourse(courseId)
  //     .then((quizzes) =>
  //       dispatch(setQuiz(quizzes))
  //   );
  // }, [courseId]);

  return (
    <div className="quiz-details">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "details" ? "active" : ""}`}
          onClick={handleDetailsTab}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === "questions" ? "active" : ""}`}
          onClick={handleQuestionsTab}
        >
          Questions
        </button>
      </div>
      {activeTab === "details" && (
        <>
          <input
            type="text"
            className="quiz-title-input"
            placeholder="Unnamed Quiz"
            value={quizName || ""}
            onChange={(e) => setQuizName(e.target.value)}
          />
          <div className="quiz-instructions">
            Quiz Instructions: Edit View Insert Format Tools Table
          </div>
          <textarea className="quiz-description-input" />
          <label htmlFor="quiz-type-select">Quiz Type</label>
          <select
            id="quiz-type-select"
            className="quiz-type-select"
            value={quizType} // Controlled component
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
          <label htmlFor="assignment-group-select">Assignment Group</label>
          <select
            id="assignment-group-select"
            className="assignment-group-select"
            defaultValue="Quizzes"
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Assignments">Assignments</option>
            <option value="Exams">Exams</option>
            <option value="Projects">Projects</option>
          </select>
          <div className="options-section">
            <label>
              <input
                type="checkbox"
                checked={shuffleAnswers}
                onChange={() => setShuffleAnswers(!shuffleAnswers)}
              />
              Shuffle Answers
            </label>
            <label>
              <input
                type="checkbox"
                checked={timeLimit}
                onChange={() => setTimeLimit(!timeLimit)}
              />
              Time Limit
            </label>
            {timeLimit && (
              <input
                type="text"
                className="time-limit-input"
                placeholder="Minutes"
                value={minutes || ""}
                onChange={(e) => setMinutes(e.target.value)}
              />
            )}
            <label>
              <input
                type="checkbox"
                checked={allowMultipleAttempts}
                onChange={() =>
                  setAllowMultipleAttempts(!allowMultipleAttempts)
                }
              />
              Allow Multiple Attempts
            </label>
          </div>
          <div
            className="assignment-section"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <label>Assign to</label>
            <input type="text" placeholder="Everyone" />

            <label>Due</label>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date) => setDueDate(date)}
              className="date-picker"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div>
                <label>Available from</label>
                <DatePicker
                  selected={availableFromDate}
                  onChange={(date: Date) => setAvailableFromDate(date)}
                  className="date-picker"
                />
              </div>
              <div>
                <label>Until</label>
                <DatePicker
                  selected={untilDate}
                  onChange={(date: Date) => setUntilDate(date)}
                  className="date-picker"
                />
              </div>
            </div>

            <button className="add-button" onClick={() => {}}>
              + Add
            </button>
          </div>
        </>
      )}
      {activeTab === "questions" && (
        <>
          <button className="add-button" onClick={() => handleQuestions(quiz)}>
            + Add Questions
          </button>
        </>
      )}
      <div className="buttons-container">
        <button className="button cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="button save-publish-button"
          onClick={handleSaveAndPublish}
        >
          Save & Publish
        </button>
        <button className="button save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default QuizDetailEditor;
