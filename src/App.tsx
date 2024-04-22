import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import QuizDetailEditor from './Kanbas/Quizzes/QuizDetailEditor';
import QuizDetails from './Kanbas/Quizzes/QuizDetails';
import QList from './Kanbas/Quizzes/QuizListScreen';
import QuizPreview from "./Kanbas/Quizzes/QuizPreview";
import {HashRouter} from "react-router-dom";
import QuestionForm from "./Kanbas/Quizzes/QuizQuestions/QuizQuestionEditor";
//import {Routes, Route, Navigate} from "react-router";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./Kanbas/store";


// import QuizDetailsScreen from './Kanbas/Quizzes/QuizDetails';
// import QuizListScreen from './Kanbas/Quizzes/QuizList';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/questionForm" element={<QuestionForm/>}/>
        <Route path="/quiz-details/:quizId" element={<QuizDetails />} /> 
        <Route path="/quiz-list" element={<QList />} />
        <Route path="/quiz-preview/:quizId" element={<QuizPreview/>} />
        <Route path="/edit-quiz/:quizId" element={<QuizDetailEditor />} />
        <Route path="/" element={<Navigate to="/quiz-list" replace />} />
      </Routes>
    </Router>
    </Provider>
    // <div className="App">
    //         <QuizDetailEditor />
    // </div>
    // <HashRouter>
    //   <div>
    //     <Routes>
    //       <Route path="/"         element={<Navigate to="/Labs"/>}/>
    //       <Route path="/Labs/*"   element={<Labs/>}/>
    //       <Route path="/Kanbas/*" element={<Kanbas/>}/>
    //       <Route path="/hello"    element={<HelloWorld/>}/>
    //     </Routes>
    //   </div>
    // </HashRouter>
);}

export default App;