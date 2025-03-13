import React, { useState } from 'react';

const DyslexiaAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);

  const dyslexiaTest = [
    {
      section: "Phonological Awareness & Pronunciation",
      weightage: 30,
      description: "Tests the ability to hear, recognize, and manipulate sounds in words. Dyslexic children struggle with phonemic segmentation, blending, and rhyming.",
      scientificBasis: "Phonological deficits are one of the strongest predictors of dyslexia.",
      questions: [
        {
          id: 1,
          type: "rhyme",
          question: "Which word rhymes with 'cat'?",
          options: ["Hat", "Sun", "Dog"],
          correctAnswer: "Hat"
        },
        {
          id: 2,
          type: "segmentation",
          question: "What are the sounds in 'fish'?",
          correctAnswer: ["f", "i", "sh"]
        },
        {
          id: 3,
          type: "blending",
          question: "What word do these sounds make? /c/-/a/-/t/",
          correctAnswer: "Cat"
        },
        {
          id: 4,
          type: "auditory-discrimination",
          question: "Do 'bat' and 'pat' sound the same or different?",
          options: ["Same", "Different"],
          correctAnswer: "Different"
        },
        {
          id: 5,
          type: "syllable-counting",
          question: "Clap the number of syllables in 'elephant'.",
          options: ["1", "2", "3"],
          correctAnswer: "3"
        }
      ]
    },
    {
      section: "Rapid Naming & Processing Speed",
      weightage: 20,
      description: "Measures how quickly a child can name familiar objects, colors, or letters. Slow naming speed is a known dyslexia marker.",
      scientificBasis: "Research links Rapid Automatized Naming (RAN) speed with dyslexia.",
      questions: [
        {
          id: 6,
          type: "color-naming",
          question: "Name these colors as fast as possible:",
          items: ["🟥", "🟦", "🟩", "🟨"],
          correctAnswer: ["Red", "Blue", "Green", "Yellow"]
        },
        {
          id: 7,
          type: "object-naming",
          question: "Name these objects quickly:",
          items: ["Tree", "Ball", "Sun", "Book"]
        },
        {
          id: 8,
          type: "letter-naming",
          question: "Read these letters as fast as possible:",
          items: ["m", "d", "b", "q", "p"]
        },
        {
          id: 9,
          type: "number-naming",
          question: "Read these numbers:",
          items: ["3", "6", "9", "2", "5"]
        }
      ]
    },
    {
      section: "Letter & Word Recognition",
      weightage: 20,
      description: "Tests the ability to recognize letters and differentiate similar-looking ones (common in dyslexia).",
      scientificBasis: "Studies show dyslexic kids confuse mirror-image letters (b/d, p/q, n/u).",
      questions: [
        {
          id: 10,
          type: "letter-confusion",
          question: "Point to the correct letter:",
          instruction: "Point to the letter 'b'",
          options: ["b", "d", "p", "q"],
          correctAnswer: "b"
        },
        {
          id: 11,
          type: "word-matching",
          question: "Which word matches this?",
          targetWord: "DOG",
          options: ["DOG", "DGO"],
          correctAnswer: "DOG"
        },
        {
          id: 12,
          type: "error-spotting",
          question: "What's wrong in this word?",
          word: "Trane",
          correctWord: "Train",
          correctAnswer: "The 'a' and 'i' are switched"
        },
        {
          id: 13,
          type: "sight-word",
          question: "Which is a real word?",
          options: ["House", "Housr"],
          correctAnswer: "House"
        }
      ]
    },
    {
      section: "Working Memory & Sequencing",
      weightage: 15,
      description: "Tests short-term memory & ability to recall sequences—critical for reading.",
      scientificBasis: "Dyslexia affects verbal working memory and number recall.",
      questions: [
        {
          id: 14,
          type: "digit-span",
          question: "Repeat these numbers backward: '3, 9, 4'",
          correctAnswer: ["4", "9", "3"]
        },
        {
          id: 15,
          type: "pattern",
          question: "What comes next?",
          pattern: "A, B, A, B, ?",
          correctAnswer: "A"
        },
        {
          id: 16,
          type: "story-recall",
          question: "Read this sentence: 'The dog ran fast.' What did the dog do?",
          correctAnswer: "Ran fast"
        }
      ]
    },
    {
      section: "Writing & Motor Skills",
      weightage: 15,
      description: "Tests handwriting, copying skills, and fine motor coordination.",
      scientificBasis: "Many dyslexic children also have dysgraphia (writing difficulty).",
      questions: [
        {
          id: 17,
          type: "shape-copy",
          question: "Can you draw this?",
          shape: "triangle"
        },
        {
          id: 18,
          type: "name-writing",
          question: "Write your name"
        },
        {
          id: 19,
          type: "sentence-dictation",
          question: "Write 'The sun is big.'",
          correctAnswer: "The sun is big."
        },
        {
          id: 20,
          type: "handwriting-analysis",
          question: "Write 'Big dog runs fast'",
          correctAnswer: "Big dog runs fast"
        }
      ]
    }
  ];

  const handleNext = () => {
    const currentSectionData = dyslexiaTest[currentSection];
    
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < dyslexiaTest.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Test is complete
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      const prevSectionQuestions = dyslexiaTest[currentSection - 1].questions;
      setCurrentQuestion(prevSectionQuestions.length - 1);
    }
  };

  const calculateResults = () => {
    // In a real application, this would calculate scores based on responses
    // For now, we'll just set a dummy result
    const sectionResults = {};
    
    dyslexiaTest.forEach(section => {
      // This is a placeholder - in a real app, you'd calculate actual section scores
      const sectionScore = Math.floor(Math.random() * 100);
      sectionResults[section.section] = {
        score: sectionScore,
        weightedScore: (sectionScore * section.weightage) / 100
      };
    });
    
    setResults(sectionResults);
    setTestCompleted(true);
  };

  const resetTest = () => {
    setCurrentSection(0);
    setCurrentQuestion(0);
    setScore(0);
    setResults({});
    setTestCompleted(false);
  };

  if (testCompleted) {
    // Display results
    const totalScore = Object.values(results).reduce(
      (acc, section) => acc + section.weightedScore, 0
    );
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Dyslexia Assessment Results</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Score: {totalScore.toFixed(1)}%</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${totalScore}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(results).map(([sectionName, sectionData]) => (
            <div key={sectionName} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{sectionName}</h3>
              <div className="flex justify-between items-center mt-2">
                <span>Score: {sectionData.score}%</span>
                <span className="text-sm text-gray-600">
                  Weighted: {sectionData.weightedScore.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${sectionData.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Interpretation:</h3>
          <p className="mb-4">
            {totalScore < 50 ? 
              "This score suggests a high probability of dyslexia. We recommend a comprehensive evaluation by a specialist." :
              totalScore < 75 ? 
                "This score indicates some potential challenges. Further assessment may be beneficial." :
                "This score suggests typical reading development, though individual strengths and challenges may vary."
            }
          </p>
          <p className="text-sm text-gray-600 italic">
            Note: This assessment is a screening tool and not a diagnostic evaluation. 
            Please consult with an educational psychologist or learning specialist for a formal diagnosis.
          </p>
        </div>
        
        <button 
          onClick={resetTest}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Start New Assessment
        </button>
      </div>
    );
  }

  const currentSectionData = dyslexiaTest[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];

  const renderQuestionContent = () => {
    switch (currentQuestionData.type) {
      case "rhyme":
      case "letter-confusion":
      case "word-matching":
      case "sight-word":
      case "auditory-discrimination":
      case "syllable-counting":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            {currentQuestionData.targetWord && (
              <p className="text-xl font-semibold my-2">{currentQuestionData.targetWord}</p>
            )}
            <div className="space-y-2">
              {currentQuestionData.options.map((option, index) => (
                <button 
                  key={index}
                  className="block w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                  onClick={handleNext}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case "segmentation":
      case "blending":
      case "digit-span":
      case "story-recall":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <textarea 
              className="w-full border rounded p-2 h-20"
              placeholder="Enter your answer here..."
            ></textarea>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleNext}
            >
              Submit Answer
            </button>
          </div>
        );
      
      case "color-naming":
      case "object-naming":
      case "letter-naming":
      case "number-naming":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <div className="flex flex-wrap gap-4 justify-center my-4">
              {currentQuestionData.items.map((item, index) => (
                <div key={index} className="text-2xl p-2 border rounded">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleNext}
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case "pattern":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <p className="text-xl font-medium my-2">{currentQuestionData.pattern}</p>
            <div className="flex gap-4 my-4 justify-center">
              <button 
                className="px-6 py-2 border rounded text-lg hover:bg-gray-100"
                onClick={handleNext}
              >
                A
              </button>
              <button 
                className="px-6 py-2 border rounded text-lg hover:bg-gray-100"
                onClick={handleNext}
              >
                B
              </button>
            </div>
          </div>
        );
      
      case "error-spotting":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <p className="text-xl font-semibold my-4">{currentQuestionData.word}</p>
            <textarea 
              className="w-full border rounded p-2 h-20"
              placeholder="What's wrong with this word?"
            ></textarea>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleNext}
            >
              Submit Answer
            </button>
          </div>
        );
      
      case "shape-copy":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <div className="flex justify-center my-4">
              <div className="border w-32 h-32 flex items-center justify-center">
                {currentQuestionData.shape === "triangle" ? (
                  <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[80px] border-transparent border-b-black"></div>
                ) : (
                  <div className="w-16 h-16 border-2 border-black"></div>
                )}
              </div>
            </div>
            <div className="my-4">
              <p className="mb-2">Draw here:</p>
              <div className="border w-full h-40 bg-gray-50"></div>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        );
      
      case "name-writing":
      case "sentence-dictation":
      case "handwriting-analysis":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestionData.question}</p>
            <div className="my-4">
              <div className="border w-full h-40 bg-gray-50 border-b-gray-300 border-dashed"></div>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        );
      
      default:
        return (
          <div>
            <p>{currentQuestionData.question}</p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={handleNext}
            >
              Next Question
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dyslexia Assessment</h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
            Question {currentSectionData.questions[currentQuestion].id}/20
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${(currentSectionData.questions[currentQuestion].id / 20) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{currentSectionData.section}</h2>
        <p className="text-sm text-gray-600">{currentSectionData.description}</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        {renderQuestionContent()}
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentSection === 0 && currentQuestion === 0}
          className={`px-4 py-2 rounded ${
            currentSection === 0 && currentQuestion === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={resetTest}
            className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
          >
            Reset
          </button>
          <button 
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {currentSection === dyslexiaTest.length - 1 && 
             currentQuestion === currentSectionData.questions.length - 1
              ? 'Complete Assessment'
              : 'Next'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaAssessment;