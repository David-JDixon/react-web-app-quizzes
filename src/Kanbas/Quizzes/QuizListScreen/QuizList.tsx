import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { BsRocket } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import {
  addQuiz,
  deleteQuiz,
  saveAndPublishQuiz,
  setQuiz,
  updateQuiz,
  saveQuiz,
  saveAndUnpublishQuiz,
} from "../reducer";
import { quizzes } from "../../Database";
import { KanbasState } from "../../store";

function QuizList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzesList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const selectedQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );

  useEffect(() => {
    dispatch(setQuiz(quizzes));
  }, [dispatch]);

  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const toggleContextMenu = (quizId: string) => {
    console.log(quizId);
    setShowContextMenu(quizId);
    setSelectedQuizId(quizId);
  };

  const editQuiz = (quiz: any) => {
    navigate(`/quiz-details/${quiz._id}`);
  };

  const addQuizHandler = (quiz: any) => {
    navigate(`/edit-quiz/${quiz._id}`);
  };


  const deleteQuizHandler = (quizId: string) => {
    dispatch(deleteQuiz(quizId));
  };

  const publishQuizHandler = (quizId: string) => {
    dispatch(saveAndPublishQuiz(quizId));
  };

  const unpublishQuizHandler = (quizId: string) => {
    console.log("Unpublishing quiz with ID:", quizId);
    dispatch(saveAndUnpublishQuiz(quizId));
  };
  

  const hideContextMenu = (): void => {
    setShowContextMenu(null);
    setSelectedQuizId(null);
  };

  const copyQuiz = (quizId: string) => {
    // Implement copying functionality here
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button
          className="button Quiz+-button"
          style={{ backgroundColor: "red" }}
          onClick={addQuizHandler}
        >
          +Quiz
        </button>
      </li>
      <ul className="list-group">
        {quizzesList.map((quiz, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => dispatch(setQuiz(quiz))}
            style={{
              backgroundColor: quiz.published ? "#e6ffe6" : "transparent",
            }}
          >
            <div className="quiz-content">
              <div>
                <h3>
                  <BsRocket className="rocket-icon" />
                  {quiz.name}
                </h3>
                <div className="quiz-dates">
                  <p>
                    <strong>Availability</strong> {quiz.availableFrom}{" "}
                    <strong>Due</strong> {quiz.due} <strong>Points</strong>{" "}
                    {quiz.points} {quiz.points}
                  </p>
                </div>
              </div>
              {quiz.published ? (
                <span style={{ color: "green", marginLeft: "500px" }}>✔️</span>
              ) : (
                <span style={{ color: "red", marginLeft: "px" }}>❌</span>
              )}
              <div className="button-container">
                <button
                  className="button context-menu-button"
                  onClick={() => {  
                    toggleContextMenu(quiz._id);
                    dispatch(setQuiz(quiz));
                  }}
                >
                  ...
                </button>
              </div>
            </div>
            {showContextMenu === quiz._id && (
              <div
                id="context-menu"
                className={`context-menu ${
                  showContextMenu === quiz._id ? "show" : ""
                }`}
                onClick={hideContextMenu}
              >
                <ul
                  className="context-menu-item"
                  onClick={() => editQuiz(quiz)}
                >
                  Edit
                </ul>
                <ul
                  className="context-menu-item"
                  onClick={() => deleteQuizHandler(quiz._id)}
                >
                  Delete
                </ul>
                <ul
                  className="context-menu-item"
                  onClick={() => {
                    if (quiz.published) {
                      unpublishQuizHandler(quiz._id);
                    } else {
                      publishQuizHandler(quiz._id);
                    }
                  }}
                >
                  {quiz.published ? "Unpublish" : "Publish"}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </ul>
  );
}

export default QuizList;
