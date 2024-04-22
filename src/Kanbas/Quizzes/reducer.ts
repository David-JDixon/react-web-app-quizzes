import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as { _id: string; name: string; description: string;  quizType: string; assignmentGroup: string; shuffleAnswers: Boolean; timeLimit: Boolean; minutes: Number; allowMultipleAttemps: Boolean; due: Date; published: Boolean, points: Number}[],
    quiz: { name: "TestQuiz",
              description: "No Description",
              quizType: "Graded Quiz",
              assignmentGroup: "Quiz",
              shuffleAnswers: true,
              timeLimit: false,
              minutes: 0,
              allowMultipleAttemps: false,
              due: "2024-04-21",
              published: false,
              points: 0
            },
  };
const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.quiz = action.payload
        },
        saveQuiz: (state, action) => {
            state.quiz = action.payload
        },
        saveAndPublishQuiz: (state, action) => {
            state.quiz.published = true
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
              if (quiz._id === action.payload._id) {
                return action.payload;
              } else {
                return quiz;
              }
            });
          },
        addQuiz: (state, action) => {
            state.quizzes = [
              { ...action.payload, _id: new Date().getTime().toString() },
                ...state.quizzes,
            ];
        },

    },
});
  export const { setQuiz, saveQuiz, saveAndPublishQuiz, addQuiz} = quizSlice.actions;
  export default quizSlice.reducer;

