import React, { useState, useEffect } from 'react';
import { questionData } from './AdaptQuestion';

const AdaptLearning = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('letterIdentification');
    const [currentDifficulty, setCurrentDifficulty] = useState('easy');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    // Load initial question
    useEffect(() => {
        loadQuestion();
    }, []);

    const loadQuestion = () => {
        const questions = questionData[currentCategory][currentDifficulty];
        setCurrentQuestion(questions[questionIndex]);
    };

    const handleAnswer = (userAnswer) => {
        const correctAnswer = currentQuestion.answer;
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('Correct!');
            // Move to next difficulty if score is high
            if (score >= 3 && currentDifficulty !== 'hard') {
                setCurrentDifficulty(prev => {
                    const difficulties = ['easy', 'medium', 'hard'];
                    const nextIndex = difficulties.indexOf(prev) + 1;
                    return difficulties[nextIndex];
                });
            }
        } else {
            setFeedback('Incorrect. Try again!');
            // Move to easier difficulty if score is low
            if (score <= 1 && currentDifficulty !== 'easy') {
                setCurrentDifficulty(prev => {
                    const difficulties = ['easy', 'medium', 'hard'];
                    const prevIndex = difficulties.indexOf(prev) - 1;
                    return difficulties[prevIndex];
                });
            }
        }

        // Move to next question
        setQuestionIndex(prev => (prev + 1) % questionData[currentCategory][currentDifficulty].length);
        loadQuestion();
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        switch (currentQuestion.type) {
            case 'single_letter':
                return (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl max-w-md mx-auto border border-white/20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>
                        <p className="text-gray-600 mb-6 text-lg">{currentQuestion.content}</p>
                        <input 
                            type="text" 
                            className="w-full px-6 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleAnswer(e.target.value)} 
                            placeholder="Type your answer here..."
                        />
                        <button
                            className="mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
                            onClick={(e) => handleAnswer(e.target.previousElementSibling.value)}
                        >
                            Submit
                        </button>
                    </div>
                );
            case 'multiple_choice':
            case 'matching':
            case 'similar_letters':
            case 'odd_one_out':
            case 'flipped_letter':
            case 'alphabet_order':
            case 'scrambled_set':
            case 'letter_sorting':
            case 'font_variations':
            case 'letter_count':
            case 'missing_letter':
            case 'rotated_letter':
                return (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl max-w-md mx-auto border border-white/20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>
                        {currentQuestion.options && (
                            <div className="grid grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, i) => (
                                    <button 
                                        key={i} 
                                        className="px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg font-medium"
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'word_identification':
            case 'sequence':
            case 'group_identification':
            case 'tracing':
            case 'audio_identification':
            case 'sound_identification':
            case 'word_start':
                return (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-xl max-w-md mx-auto border border-white/20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>
                        <p className="text-gray-600 mb-6 text-lg">{currentQuestion.content}</p>
                        <input 
                            type="text" 
                            className="w-full px-6 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleAnswer(e.target.value)} 
                            placeholder="Type your answer here..."
                        />
                        <button
                            className="mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
                            onClick={(e) => handleAnswer(e.target.previousElementSibling.value)}
                        >
                            Submit
                        </button>
                    </div>
                );
            default:
                return <p>Question type not supported</p>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
                            {score}
                        </div>
                        <div>
                            <p className="text-gray-600">Score</p>
                            <p className="text-2xl font-bold text-gray-800">{score}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                            {currentDifficulty[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="text-gray-600">Difficulty</p>
                            <p className="text-2xl font-bold text-gray-800 capitalize">{currentDifficulty}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    {renderQuestion()}
                </div>
                <div className={`text-center text-lg font-semibold p-4 rounded-xl ${
                    feedback.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {feedback}
                </div>
            </div>
        </div>
    );
};

export default AdaptLearning;