import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ParentDashboard from './ParentDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DyslexiaAssesment from './DyslexiaAssesment';
import TeacherQuestionnaire from './TeacherQuestionnaire';
import AdaptLearning from './AdaptLearning';
import AssessmentOverview from './AssessmentOverview';
import Handwriting from './Handwriting';
import FirstTest from './FirstTest';

import MediaCapture from './MediaCapture';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/assessment" element={<DyslexiaAssesment />} />
        <Route path="/adapt" element={<AdaptLearning />} />
        <Route path='/overview' element={<AssessmentOverview />} />
        <Route path='/parent' element={<TeacherQuestionnaire />} />
        <Route path='/handwriting' element={<Handwriting />} />
        <Route path='/parentdashboard' element={<ParentDashboard />} />
        <Route path='/firsttest' element={<FirstTest />} />
        <Route path='/test' element={<MediaCapture />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
