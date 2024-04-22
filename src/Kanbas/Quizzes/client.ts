// import axios from "axios";
// const QUIZ_API = "http://localhost:4000/api/quizzes";
// export const findQuizByName = async (quizName: any) => {
//   const response = await axios
//     .get(`${QUIZ_API}/${quizName}`);
//   return response.data;
// };
// export const createQuiz = async (quizName: any, quiz: any) => {
//     const response = await axios.post(
//       `${QUIZ_API}/${quizName}`,
//       quiz
//     );
//     return response.data;
//   };

import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const QUIZZES_API = "http://localhost:4000/api/quizzes";

export const deleteQuiz = async (quizId: any) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const getQuizById = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/quizInfo`)
    return response.data;
}

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes`,
      quiz
    );
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios.
      put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
  };
  
  