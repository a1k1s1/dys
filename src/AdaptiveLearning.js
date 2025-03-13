import { useState } from 'react';
import { FaBookOpen, FaChevronRight, FaStar } from 'react-icons/fa';

const initialQuestions = [
  {
    id: 1,
    question: "Which word rhymes with 'cat'?",
    options: ['Dog', 'Hat', 'Run', 'Jump'],
    correct: 1,
    nextCorrect: 2,
    nextWrong: 3
  },
  {
    id: 2,
    question: "Which word starts with the same sound as 'sun'?",
    options: ['Moon', 'Sand', 'Star', 'Tree'],
    correct: 1,
    nextCorrect: 4,
    nextWrong: 3
  },
  {
    id: 3,
    question: "Let's try an easier one. Which letter comes after 'A'?",
    options: ['B', 'C', 'D', 'E'],
    correct: 0,
    nextCorrect: 2,
    nextWrong: 5
  },
  {
    id: 4,
    question: "Which word has the same ending sound as 'jump'?",
    options: ['Bump', 'Run', 'Walk', 'See'],
    correct: 0,
    nextCorrect: 6,
    nextWrong: 3
  },
  {
    id: 5,
    question: "Let's try letters. Which letter makes the 'sss' sound?",
    options: ['A', 'B', 'C', 'S'],
    correct: 3,
    nextCorrect: 2,
    nextWrong: 5
  },
  {
    id: 6,
    question: "Which word is spelled correctly?",
    options: ['Bicycle', 'Bysicle', 'Bisickle', 'Bycicle'],
    correct: 0,
    nextCorrect: null,
    nextWrong: 3
  }
];

function AdaptiveLearning() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswer = (selectedIndex) => {
    const question = initialQuestions[currentQuestion];
    
    if (selectedIndex === question.correct) {
      setStreak(prev => prev + 1);
      if (question.nextCorrect !== null) {
        setCurrentQuestion(question.nextCorrect);
      } else {
        setShowResults(true);
      }
    } else {
      setStreak(0);
      if (question.nextWrong !== null) {
        setCurrentQuestion(question.nextWrong);
      } else {
        setShowResults(true);
      }
    }
    
    setProgress(prev => Math.min(prev + 10, 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-blue-600">
            <FaBookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">Adaptive Learning</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
            <FaStar className="text-orange-500" />
            <span className="font-medium">{streak}-Streak</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 border border-gray-100">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-800">
                  {initialQuestions[currentQuestion].question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-300
                        text-xl font-dyslexia hover:bg-blue-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-3">
              <span className="text-yellow-600 text-xl">💡</span>
              <div>
                <p className="font-medium text-yellow-800 mb-2">Tips for Learning:</p>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                  <li>Take your time to think about each question</li>
                  <li>Try to sound out the words</li>
                  <li>Don't worry if you make mistakes - that's how we learn!</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-8">
              <div className="text-green-500 text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                Great Job!
              </h2>
              <p className="text-gray-600 mb-6">
                You completed the learning session. Here's your progress:
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-blue-500 text-2xl mb-2">🌟</div>
                <h3 className="font-bold mb-1">Highest Streak</h3>
                <p className="text-2xl font-bold">{streak}</p>
              </div>

              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setStreak(0);
                  setShowResults(false);
                  setProgress(0);
                }}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl
                  font-semibold transition-colors flex items-center justify-center mx-auto space-x-2"
              >
                <span>Start New Session</span>
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdaptiveLearning;