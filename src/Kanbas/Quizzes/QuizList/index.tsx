import React, { useState } from 'react';

function QuizList(){
    return (
        <div className="quiz-details">
          <div className="tabs">
            <button className="tab">Details</button>
            <button className="tab">Questions</button>
          </div>
        </div>
    )
}

export default QuizList;

// DELETING DONE HERE
// const handleAddQuiz = () => {
//   createQuiz(courseId, quiz).then((quiz) => {
//     dispatch(addQuiz(quiz));
//   });
// };