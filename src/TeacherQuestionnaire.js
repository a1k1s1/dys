import React, { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Send, BookOpen } from 'lucide-react';

const TeacherQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const teacherQuestions = [
    {
      id: 1,
      question: "How often does your child struggle with recognizing or recalling letters and numbers?",
      type: "frequency",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 2,
      question: "Does your child have difficulty associating sounds with letters or blending sounds into words?",
      type: "yesNo",
      options: ["Yes", "No"]
    },
    {
      id: 3,
      question: "How frequently does your child mix up letters (e.g., 'b' and 'd', 'p' and 'q') while reading or writing?",
      type: "frequency",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 4,
      question: "Does your child have trouble following multi-step instructions?",
      type: "yesNo",
      options: ["Yes", "No"]
    },
    {
      id: 5,
      question: "How often does your child find it hard to retain and recall new vocabulary words?",
      type: "frequency",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 6,
      question: "Does your child struggle with writing letters in the correct order in words?",
      type: "yesNo",
      options: ["Yes", "No"]
    },
    {
      id: 7,
      question: "How often does your child show frustration or avoid reading and writing activities?",
      type: "frequency",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 8,
      question: "Does your child have difficulty remembering sequences, such as days of the week or numbers in order?",
      type: "yesNo",
      options: ["Yes", "No"]
    },
    {
      id: 9,
      question: "How frequently does your child struggle with rhyming words or recognizing patterns in language?",
      type: "frequency",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      id: 10,
      question: "Does your child show signs of poor hand-eye coordination, such as difficulty in copying shapes or writing neatly?",
      type: "yesNo",
      options: ["Yes", "No"]
    }
  ];

  const handleResponse = (response) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion + 1]: response
    }));
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestion < teacherQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setResponses({});
    setCompleted(false);
    setSubmitted(false);
  };

  const submitToBackend = async () => {
    setSubmitting(true);
    try {
      // Transform responses to match backend format
      const formattedResponses = Object.entries(responses).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      const response = await fetch('http://localhost:4001/assessment/initial-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'your-user-id-here', // You need to pass the actual user ID
          ...formattedResponses
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setCompleted(true);
      } else {
        alert('Failed to submit responses. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting responses:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const getOptionClass = (option, questionId) => {
    const baseClass = "flex items-center justify-between w-full px-6 py-4 mb-3 text-left rounded-xl transition-all duration-200 border transform hover:scale-[1.02]";
    
    if (responses[questionId] === option) {
      return `${baseClass} border-indigo-500 bg-indigo-50 text-indigo-900 shadow-md`;
    }
    return `${baseClass} border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-sm`;
  };
  
  const getFrequencyColor = (option) => {
    const colors = {
      "Never": "bg-green-500",
      "Rarely": "bg-emerald-500",
      "Sometimes": "bg-yellow-500",
      "Often": "bg-orange-500",
      "Always": "bg-red-500"
    };
    return colors[option] || "bg-gray-500";
  };

  const getYesNoColor = (option) => {
    return option === "Yes" ? "bg-red-500" : "bg-green-500";
  };

  const currentQuestionData = teacherQuestions[currentQuestion];

  if (submitted) {
    return null;
  }

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center mb-8">
          <BookOpen className="w-10 h-10 text-indigo-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Questionnaire Summary
          </h1>
        </div>
        
        <div className="mb-8 space-y-6">
          {teacherQuestions.map((q) => {
            const response = responses[q.id];
            let colorClass = "";
            
            if (q.type === "frequency") {
              colorClass = getFrequencyColor(response);
            } else if (q.type === "yesNo") {
              colorClass = getYesNoColor(response);
            }
            
            return (
              <div key={q.id} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 pr-4">{q.question}</h3>
                  <div className={`flex-shrink-0 px-3 py-1 rounded-full text-white text-sm font-medium ${colorClass}`}>
                    {response || "No response"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={resetQuestionnaire}
            className="flex-1 py-4 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors duration-200"
          >
            Start Over
          </button>
          
          <button 
            onClick={submitToBackend}
            disabled={submitting}
            className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Responses
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-2xl">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Child Learning Assessment
            </h1>
            <p className="text-gray-600 text-xs md:text-sm">
              Help us understand your child's learning patterns to provide better support
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-medium flex items-center gap-2 shadow-lg shadow-indigo-200/50 hover:shadow-indigo-200/75 transition-shadow duration-200 text-xs md:text-sm">
            <span>Progress</span>
            <span className="font-bold">
              {currentQuestion + 1} / {teacherQuestions.length}
            </span>
          </div>
        </div>
        
        <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / teacherQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8 rounded-2xl mb-6 md:mb-8 border border-indigo-100">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800">{currentQuestionData.question}</h2>
        
        <div className="space-y-2 md:space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(option, currentQuestionData.id)}
              onClick={() => handleResponse(option)}
            >
              <span className="text-sm md:text-base font-medium">{option}</span>
              {responses[currentQuestionData.id] === option && (
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 animate-bounce" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between gap-2">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center justify-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base ${
            currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          className="flex items-center justify-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-indigo-200/50 hover:shadow-indigo-200/75 text-sm md:text-base"
        >
          {currentQuestion === teacherQuestions.length - 1
            ? 'Complete'
            : (
              <>
                Next
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </>
            )
          }
        </button>
      </div>
    </div>
  );
};

export default TeacherQuestionnaire;