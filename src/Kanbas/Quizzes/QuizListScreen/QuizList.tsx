import { useEffect, useState } from "react";
import "./index.css";
import { BsRocket } from "react-icons/bs";
import { quizzes } from "../../Database";
import { useNavigate, useParams } from "react-router";


function QuizList() {
  const { courseId } = useParams();
  const [quizzesList, setQuizList] = useState<any[]>(quizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(quizzesList[0]);
  const [quiz, setQuiz] = useState({
    name: "TestQuiz",
    _id: "1",
    description: "No Description",
    quizType: "Graded Quiz",
    assignmentGroup: "Quiz",
    shuffleAnswers: true,
    timeLimit: false,
    minutes: 0,
    allowMultipleAttemps: false,
    availability: "2024-04-21",
    due: "2024-04-21",
    published: false,
  });
  const navigate = useNavigate();


  const editQuiz = (quiz: any) => {
    // Implement edit functionality here, e.g., navigate to edit quiz screen
    navigate(`/edit-quiz/${quiz._id}`);
  };


  const addQuiz = (quiz: any) => {
    const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
    const newQuizList = [newQuiz, ...quizzesList];
    setQuizList(newQuizList);
    navigate(`/quiz-details/${newQuiz._id}`);
  };


  const deleteQuiz = (quizId: string) => {
    const newQuizList = quizzesList.filter((quiz) => quiz._id !== quizId);
    setQuizList(newQuizList);
  };


  const publishQuiz = (quizId: string) => {
    const updatedQuizList = quizzesList.map((quiz) => {
      if (quiz._id === quizId) {
        return { ...quiz, published: !quiz.published };
      }
      return quiz;
    });
    setQuizList(updatedQuizList);
  };


  const toggleContextMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quizId: string
  ): void => {
    event.preventDefault();
    // Show context menu
    const contextMenu = document.getElementById("context-menu");
    if (contextMenu) {
      contextMenu.style.display = "block";
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;
      const selectedQuiz = quizzesList.find((quiz) => quiz._id === quizId);
      if (selectedQuiz) {
        setSelectedQuiz(selectedQuiz);
      }
    }
  };


  const hideContextMenu = (): void => {
    // Hide context menu
    const contextMenu = document.getElementById("context-menu");
    if (contextMenu) {
      contextMenu.style.display = "none";
    }
  };


  const copyQuiz = (quizId: string) => {
    // Implement copying functionality here, e.g., open a modal for selecting destination course
  };


  const sortQuizzes = (criteria: string) => {
    let sortedQuizzes = [...quizzesList];
    if (criteria === "name") {
      sortedQuizzes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "due") {
      sortedQuizzes.sort(
        (a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()
      );
    } else if (criteria === "availability") {
      sortedQuizzes.sort(
        (a, b) =>
          new Date(a.availability).getTime() -
          new Date(b.availability).getTime()
      );
    }
    setQuizList(sortedQuizzes);
  };


  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button
          className="button Quiz+-button"
          style={{ backgroundColor: "red" }}
          onClick={addQuiz}
         
        >
          +Quiz
        </button>
      </li>
      <ul className="list-group">
        {/* Render quizzes from quizzesList */}
        {quizzesList.map((quiz, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => setSelectedQuiz(quiz)}
            style={{ backgroundColor: quiz.published ? "#e6ffe6" : "transparent" }}
          >
           
            <div className="quiz-content">
              <div>
                <h3><BsRocket className="rocket-icon" />{quiz.name}</h3>
                <div className="quiz-dates">
                  <p>
                    <strong>Availability</strong> {quiz.avaliability}{" "}
                    <strong>Due</strong> {quiz.due}{" "}
                    <strong>Points</strong> {quiz.points}
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
                  onClick={(event) => toggleContextMenu(event, quiz._id)}
                >
                  ...
                </button>
              </div>
            </div>
            <div id="context-menu" className="context-menu" onClick={hideContextMenu}>
              <ul className="context-menu-item" onClick={() => editQuiz(selectedQuiz)}>
                Edit
              </ul>
              <ul className="context-menu-item" onClick={() => deleteQuiz(selectedQuiz._id)}>
                Delete
              </ul>
              <ul className="context-menu-item" onClick={() => publishQuiz(selectedQuiz._id)}>
                {selectedQuiz.published ? "Unpublish" : "Publish"}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </ul>
  );
}


export default QuizList;
