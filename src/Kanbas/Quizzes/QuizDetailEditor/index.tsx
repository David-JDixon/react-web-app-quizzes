import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setQuiz, saveQuiz, saveAndPublishQuiz, addQuiz } from '../reducer';
import { findQuizzesForCourse, updateQuiz } from '../client';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { quizzes } from '../../Database';
import * as client from '../client';
import { parse } from 'path';

//const QuizDetailEditor: React.FC = () => {
function QuizDetailEditor() {
  //const { courseId } = useParams();
  const { quizId } = useParams();

  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => 
    state.quizzesReducer.quiz);

  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizType, setQuizType] = useState('Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState('Quiz');
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
   


  // const handleSave = async () => {
  //   const status = await client.updateQuiz(quiz);
  //   dispatch(updateQuiz(quiz));
  // };


  const updateQuiz = () => {
    const newModuleList = quizzesList.map((q) => {
      if (q._id === quiz._id) {
        return quiz;
      } else {
        return q;
      }
    });
    setQuizList(newModuleList);

    navigate(`/quiz-details/${quiz._id}`)
  };



  const handleSaveAndPublish = () => {
    // Code to save and publish the quiz
    // ...

    navigate('/quiz-list');
  };

  const handleCancel = () => {
    navigate('/quiz-list');
  };

  const parseDateOrNull = (dateString: string) => {
    const date = Date.parse(dateString);
    return isNaN(date) ? null : new Date(date);
  };


  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await client.getQuizById(quizId); // Implement this function to fetch quiz by ID
        console.log("hi response")
        console.log(response)
        if (response) {
          setQuiz(response);
          // Update the form's state with the fetched quiz details
          setQuizName(response.name);
          setQuizDescription(response.description)
          setQuizType(response.quizType)
          setTimeLimit(response.timeLimit);
          setShuffleAnswers(response.shuffleAnswers);
          setAllowMultipleAttempts(response.allowMultipleAttempts);
          // ... set other state from response as needed ...
          setDueDate(parseDateOrNull(response.due))
          setAvailableFromDate(parseDateOrNull(response.availableFrom))
          setUntilDate(parseDateOrNull(response.until))


          //setDueDate(new Date(response.due)); // Use the Date constructor if your date is not already a Date object
          //setAvailableFromDate(new Date(response.availableFrom));
          //setUntilDate(new Date(response.until));
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
        // Handle error, e.g., by showing an error message or redirecting
      }
    }
  if (quizId) {
    fetchQuizDetails();
  }
  }
  , [quizId, client]
);



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
        <button className="tab">Details</button>
        <button className="tab">Questions</button>
      </div>

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
            onChange={() => setAllowMultipleAttempts(!allowMultipleAttempts)}
          />
          Allow Multiple Attempts
        </label>
      </div>
      <div className="assignment-section" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        <label>Assign to</label>
        <input type="text" placeholder="Everyone" />

        <label>Due</label>
        <DatePicker
          selected={dueDate}
          onChange={(date: Date) => setDueDate(date)}
          className="date-picker"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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

        <button className="add-button" onClick={() => {/* handle add action */}}>
          + Add
        </button>
      </div>
      <div className="buttons-container">
        <button className="button cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="button save-publish-button" onClick={handleSaveAndPublish}>Save & Publish</button>
        <button className="button save-button" onClick={updateQuiz}>Save</button>
      </div>
    </div>
  );
};

export default QuizDetailEditor;
