import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as {
    _id: string;
    name: string;
    description: string;
    quizType: string;
    assignmentGroup: string;
    shuffleAnswers: Boolean;
    timeLimit: Boolean;
    minutes: Number;
    allowMultipleAttemps: Boolean;
    due: Date;
    published: Boolean;
    points: Number;
  }[],
  quiz: {
    name: "TestQuiz",
    description: "No Description",
    quizType: "Graded Quiz",
    assignmentGroup: "Quiz",
    shuffleAnswers: true,
    timeLimit: false,
    minutes: 0,
    allowMultipleAttemps: false,
    due: "2024-04-21",
    published: false,
    points: 0,
    questions: [],
  },
};
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    saveQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
    },
    saveAndPublishQuiz: (state, action) => {
      state.quiz = { ...state.quiz, published: true };
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload ? { ...quiz, published: true } : quiz
      );
    },
    saveAndUnpublishQuiz: (state, action) => {
      state.quiz = { ...state.quiz, published: false };
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload ? { ...quiz, published: false } : quiz
      );
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
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
  },
});
export const { setQuiz, saveQuiz, saveAndPublishQuiz, addQuiz, deleteQuiz, updateQuiz, saveAndUnpublishQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
