import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

// Add axios base URL configuration
axios.defaults.baseURL = 'https://dys-back-olx7.onrender.com';

const questions = [
    // Letter Identification (2 questions)
    {
        type: "multiple_choice",
        question: "Which one is 'B'?",
        options: ["B", "D", "P", "Q"],
        answer: "B"
    },
    {
        type: "letter_grid",
        question: "Find the letter 'X' in this grid of letters",
        content: [
            ["A", "B", "C"],
            ["D", "X", "F"],
            ["G", "H", "I"]
        ],
        answer: { row: 1, col: 1 }
    },

    // Word Identification (3 questions)
    {
        type: "word_pronunciation",
        question: "Can you say this word?",
        content: "Tree",
        answer: "Tree"
    },
    {
        type: "word_recognition",
        question: "What does this word say?",
        content: "Clock",
        answer: "Clock"
    },
    {
        type: "word_pronunciation",
        question: "Say this word aloud",
        content: "Black",
        answer: "Black"
    },

    // Sentence Reading (2 questions)
    {
        type: "sentence_reading",
        question: "Read this sentence",
        content: "The cat sat on the mat.",
        answer: "The cat sat on the mat."
    },
    {
        type: "sentence_reading",
        question: "What does this sentence say?",
        content: "I see a big red ball.",
        answer: "I see a big red ball."
    },

    // Complex Sentences (3 questions)
    {
        type: "sentence_reading",
        question: "Read this sentence",
        content: "When the bell rang, the students left the classroom.",
        answer: "When the bell rang, the students left the classroom."
    },
    {
        type: "sentence_reading",
        question: "What does this sentence say?",
        content: "Because it was cold, she wore a jacket.",
        answer: "Because it was cold, she wore a jacket."
    },
    {
        type: "sentence_reading",
        question: "Read this sentence aloud",
        content: "If you finish your homework, you can play outside.",
        answer: "If you finish your homework, you can play outside."
    }
];

const ReadingAssessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [userResponses, setUserResponses] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);

    useEffect(() => {
        // Update progress bar
        setProgress((currentQuestion / questions.length) * 100);
    }, [currentQuestion]);

    const handleRecord = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm; codecs=opus' // Specify WebM/Opus format
            });
            setMediaRecorder(recorder);
            
            const chunks = [];
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            
            recorder.onstop = async () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                
                // Convert to WAV format using Web Audio API
                const audioContext = new AudioContext();
                const arrayBuffer = await audioBlob.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                
                const wavBlob = await audioBufferToWav(audioBuffer);
                const audioFile = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });
                
                const formData = new FormData();
                formData.append('file', audioFile);
                
                // Add JSON data
                const jsonData = {
                    userId: "67d2fb591700e5fec9b042ec", // Updated default user ID
                    testType: questions[currentQuestion].type === 'word_pronunciation' ? 'word' : 'sentence',
                    expectedText: questions[currentQuestion].content,
                    difficulty: "medium"
                };
                formData.append('data', JSON.stringify(jsonData));
                
                // Log the form data before sending
                console.log('Sending audio file with data:', {
                    userId: jsonData.userId,
                    testType: jsonData.testType,
                    expectedText: jsonData.expectedText,
                    difficulty: jsonData.difficulty
                });
                
                try {
                    const response = await axios.post('/assessment/audio', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    const result = response.data;
                    console.log('Audio processing result:', result);
                    setIsCorrect(result.analysis.levenshtein_accuracy >= 0.8);
                    setShowFeedback(true);
                    
                    const newResponses = [...userResponses];
                    newResponses[currentQuestion] = { 
                        questionId: currentQuestion,
                        response: "audio_response",
                        isCorrect: result.analysis.levenshtein_accuracy >= 0.8,
                        audioUrl: result.audioUrl
                    };
                    setUserResponses(newResponses);
                    
                } catch (error) {
                    console.error('Error submitting response:', error);
                    console.error('Error details:', error.response?.data || error.message);
                }
                
                stream.getTracks().forEach(track => track.stop());
            };
            
            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    // Helper function to convert AudioBuffer to WAV
    function audioBufferToWav(buffer) {
        const numOfChan = buffer.numberOfChannels;
        const length = buffer.length * numOfChan * 2 + 44;
        const bufferArray = new ArrayBuffer(length);
        const view = new DataView(bufferArray);
        
        // Write WAV header
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, buffer.sampleRate, true);
        view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
        view.setUint16(32, numOfChan * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, buffer.length * numOfChan * 2, true);
        
        // Write PCM data
        let offset = 44;
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            const channel = buffer.getChannelData(i);
            for (let j = 0; j < channel.length; j++) {
                const sample = Math.max(-1, Math.min(1, channel[j]));
                view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return new Blob([view], { type: 'audio/wav' });
    }

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    const handleStopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        const isOptionCorrect = option === questions[currentQuestion].answer;
        setIsCorrect(isOptionCorrect);
        setShowFeedback(true);
        
        // Add to user responses
        const newResponses = [...userResponses];
        newResponses[currentQuestion] = { 
            questionId: currentQuestion,
            response: option,
            isCorrect: isOptionCorrect 
        };
        setUserResponses(newResponses);
    };

    const handleCellSelect = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
        const correctAnswer = questions[currentQuestion].answer;
        const isCellCorrect = correctAnswer.row === rowIndex && correctAnswer.col === colIndex;
        setIsCorrect(isCellCorrect);
        setShowFeedback(true);
        
        // Add to user responses
        const newResponses = [...userResponses];
        newResponses[currentQuestion] = { 
            questionId: currentQuestion,
            response: { row: rowIndex, col: colIndex },
            isCorrect: isCellCorrect 
        };
        setUserResponses(newResponses);
    };

    const handleTestCompletion = async () => {
        try {
            // Send all responses to backend
            const response = await fetch('/api/submit-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    responses: userResponses,
                    assessmentType: 'reading'
                })
            });
            
            const result = await response.json();
            if (result.success) {
                alert("Reading assessment completed and results saved!");
            } else {
                alert("Assessment completed but there was an error saving results.");
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);
            alert("Error submitting assessment results.");
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setSelectedCell(null);
            setShowFeedback(false);
        } else {
            // Handle test completion
            handleTestCompletion();
        }
    };

    // Get current question data
    const question = questions[currentQuestion];

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            {/* Header with progress bar */}
            <div className="w-full bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-green-600">Reading Assessment</h1>
                        <div className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">{question.question}</h2>
                    
                    {/* Multiple Choice Question */}
                    {question.type === 'multiple_choice' && (
                        <div className="grid grid-cols-2 gap-4">
                            {question.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`p-6 text-center text-2xl font-bold rounded-lg transition-all 
                                        ${selectedOption === option 
                                            ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700') 
                                            : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'}
                                        border-2`}
                                    disabled={showFeedback}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    {/* Letter Grid */}
                    {question.type === 'letter_grid' && (
                        <div className="flex justify-center mb-8">
                            <div className="grid grid-cols-3 gap-3">
                                {question.content.map((row, rowIndex) => (
                                    row.map((cell, colIndex) => (
                                        <button
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellSelect(rowIndex, colIndex)}
                                            className={`w-16 h-16 text-center text-2xl font-bold rounded-lg flex items-center justify-center transition-all
                                                ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex
                                                    ? (isCorrect ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700')
                                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'}
                                                border-2`}
                                            disabled={showFeedback}
                                        >
                                            {cell}
                                        </button>
                                    ))
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Word Pronunciation */}
                    {(question.type === 'word_pronunciation' || question.type === 'word_recognition') && (
                        <div className="text-center mb-8">
                            <div className="text-4xl font-bold mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200 text-blue-800">
                                {question.content}
                            </div>
                            <div className="recording-controls">
                                <button 
                                    onClick={isRecording ? handleStopRecording : handleRecord}
                                    className={`flex items-center justify-center mx-auto px-6 py-4 rounded-full text-white font-bold
                                        ${isRecording 
                                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                            : 'bg-blue-500 hover:bg-blue-600'}`}
                                >
                                    <FaMicrophone className="mr-2" />
                                    {isRecording ? 'Stop Recording' : 'Record Answer'}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Sentence Reading */}
                    {question.type === 'sentence_reading' && (
                        <div className="text-center mb-8">
                            <div className="text-2xl font-medium mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200 text-blue-800 leading-relaxed">
                                {question.content}
                            </div>
                            <div className="recording-controls">
                                <button 
                                    onClick={isRecording ? handleStopRecording : handleRecord}
                                    className={`flex items-center justify-center mx-auto px-6 py-4 rounded-full text-white font-bold
                                        ${isRecording 
                                            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                            : 'bg-blue-500 hover:bg-blue-600'}`}
                                >
                                    <FaMicrophone className="mr-2" />
                                    {isRecording ? 'Stop Recording' : 'Record Answer'}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Feedback area */}
                    {showFeedback && (
                        <div className={`mt-6 p-4 rounded-lg flex items-center justify-between
                            ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <div className="flex items-center">
                                {isCorrect ? (
                                    <FaCheck className="mr-2 text-green-600" />
                                ) : (
                                    <FaTimes className="mr-2 text-red-600" />
                                )}
                                <span className="font-medium">
                                    {isCorrect ? 'Great job!' : 'Try again next time!'}
                                </span>
                            </div>
                            <button 
                                onClick={handleNextQuestion}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
                                <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadingAssessment;