import { useState, useEffect, useRef } from 'react';
import { FaChild, FaPencilAlt, FaBookOpen, FaStar, FaUpload, FaChevronRight, FaSignInAlt, FaTimes, FaUser, FaLock, FaUserPlus } from 'react-icons/fa';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import AdaptiveLearning from './AdaptiveLearning';
import ParentDashboard from './ParentDashboard';
import AssessmentOverview from './AssessmentOverview';
import TeacherQuestionnaire from './TeacherQuestionnaire'

const screeningSteps = [
  {
    title: "Teacher Questionnaire",
    icon: <FaBookOpen className="w-10 h-10" />,
    description: "Answer simple questions about the child's learning patterns",
    bgColor: "from-blue-500 to-blue-400"
  },
  {
    title: "Handwriting Analysis",
    icon: <FaPencilAlt className="w-10 h-10" />,
    description: "Upload a sample of the child's handwriting for analysis",
    bgColor: "from-purple-500 to-purple-400"
  },
  {
    title: "Adaptive Learning Test",
    icon: <FaChild className="w-10 h-10" />,
    description: "Interactive exercises to assess reading and writing skills",
    bgColor: "from-green-500 to-green-400"
  }
];

const questionnaire = [
  {
    question: "How often does the child confuse similar-looking letters?",
    options: ['Never', 'Sometimes', 'Frequently', 'Always']
  },
  {
    question: "Does the child have difficulty rhyming words?",
    options: ['Never', 'Occasionally', 'Often', 'Always']
  },
  {
    question: "How is the child's spelling ability?",
    options: ['Age Appropriate', 'Slightly Below', 'Significantly Below', 'Struggles Greatly']
  }
];

function DyslexiaScreeningApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showScreening, setShowScreening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState('student');

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    
    setIsLoggedIn(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dys-back-olx7.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: signupRole
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        
        setIsLoggedIn(true);
        setShowSignupModal(false);
        // Reset form
        setSignupEmail('');
        setSignupPassword('');
        setSignupName('');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('https://dys-back-olx7.onrender.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        
        setIsLoggedIn(true);
        setShowLoginModal(false);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    if (currentQuestion < questionnaire.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setProgress(((currentQuestion + 1) / questionnaire.length) * 100);
      }, 500);
    } else {
      setCurrentStep(1);
      setCurrentQuestion(0);
      setProgress(0);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setTimeout(() => {
        setCurrentStep(2);
        setProgress(0);
      }, 1000);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-800">
              {questionnaire[currentQuestion].question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questionnaire[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`p-4 rounded-xl text-left flex items-center space-x-3 transition-all transform hover:scale-102 hover:shadow-md
                    ${answers[currentQuestion] === index 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-2 border-blue-600' 
                      : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                >
                  <span className={`w-6 h-6 rounded-full ${answers[currentQuestion] === index ? 'bg-white' : 'bg-white border-2 border-gray-300'} 
                    flex items-center justify-center`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </span>
                  <span className="text-lg">{option}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="text-center">
            <div className="mb-8">
              <FaUpload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                Upload Handwriting Sample
              </h3>
              <p className="text-gray-600 mb-6">
                Please upload a clear photo or scan of the child's recent handwriting
              </p>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8
                  hover:border-blue-500 transition-colors bg-blue-50">
                  {file ? (
                    <div className="text-green-600 flex items-center justify-center space-x-2">
                      <span className="text-2xl">✓</span>
                      <span>{file.name} uploaded successfully!</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-blue-500 font-medium">
                        Click to choose file or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        (JPEG, PNG, or PDF formats accepted)
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-800">
              Which word is spelled correctly?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Bicycle', 'Bysicle', 'Bisickle', 'Bycicle'].map((word, index) => (
                <button
                  key={index}
                  className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-300
                    text-xl hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-md"
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="mt-8 bg-yellow-100 p-4 rounded-lg flex items-start space-x-3">
              <span className="text-yellow-600">💡</span>
              <p className="text-sm text-yellow-800">
                Take your time! This test adapts to the child's responses to better 
                understand their learning patterns.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Move the modals outside the main component to prevent re-renders
  const SignupModal = ({ 
    onClose, 
    onSubmit, 
    name, 
    setName, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    role, 
    setRole 
  }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate inputs before submitting
      if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
      onSubmit(e);
    };
  
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="signup-modal-content bg-white rounded-2xl p-6 max-w-[90%] sm:max-w-md w-full shadow-2xl border border-gray-100 animate-fade-in mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Create Account</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl
                font-medium transition-all hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const LoginModal = ({ onClose, onSubmit }) => {
    const formRef = useRef(null);
    const [showSignup, setShowSignup] = useState(false);
    const [localSignupEmail, setLocalSignupEmail] = useState('');
    const [localSignupPassword, setLocalSignupPassword] = useState('');
    const [localSignupName, setLocalSignupName] = useState('');
    const [localSignupRole, setLocalSignupRole] = useState('student');

    const handleFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const email = formData.get('email');
      const password = formData.get('password');
      
      onSubmit({ email, password });
    };
    
    if (showSignup) {
      return (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSubmit={handleSignup}
          email={localSignupEmail}
          setEmail={setLocalSignupEmail}
          password={localSignupPassword}
          setPassword={setLocalSignupPassword}
          name={localSignupName}
          setName={setLocalSignupName}
          role={localSignupRole}
          setRole={setLocalSignupRole}
        />
      );
    }

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-[90%] sm:max-w-md w-full shadow-2xl border border-gray-100 animate-fade-in mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-800">Welcome Back</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="email-input" className="block text-gray-700 mb-2 font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password-input" className="block text-gray-700 mb-2 font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => alert('Forgot password feature coming soon!')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl
                font-medium transition-all hover:shadow-lg"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setShowSignup(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add useEffect to check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <FaChild className="w-8 h-8" />
            <span className="text-xl font-bold">Bright Minds</span>
          </button>
          <a 
            href="/ada" 
            className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Adaptive Learning
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-md cursor-pointer">
                MS
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors shadow-md"
              >
                <FaSignInAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md"
            >
              <FaSignInAlt />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showScreening ? (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="animate-bounce mb-8 relative">
                <div className="w-48 h-48 mx-auto rounded-full shadow-2xl border-4 border-white overflow-hidden bg-gradient-to-b from-blue-200 to-blue-300">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="70" r="40" fill="#F9B17A" />
                    <circle cx="80" cy="60" r="10" fill="white" />
                    <circle cx="120" cy="60" r="10" fill="white" />
                    <circle cx="80" cy="60" r="5" fill="black" />
                    <circle cx="120" cy="60" r="5" fill="black" />
                    <ellipse cx="100" cy="90" rx="10" ry="5" fill="#F68E5F" />
                    <path d="M70,120 Q100,150 130,120" stroke="#F68E5F" strokeWidth="4" fill="none" />
                    <path d="M60,40 L80,20 L60,30 Z" fill="#F9B17A" />
                    <path d="M140,40 L120,20 L140,30 Z" fill="#F9B17A" />
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Early Dyslexia Screening
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fun, child-friendly assessment for early detection of reading difficulties
              </p>
              
              <button
                onClick={() => {
                  setShowScreening(true);
                  navigate('/overview');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl
                  text-lg font-semibold transition-all hover:scale-105 shadow-xl
                  flex items-center justify-center mx-auto space-x-3"
              >
                <span>Start Screening</span>
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {screeningSteps.map((step, index) => (
                <div key={index} className={`bg-gradient-to-b ${step.bgColor} p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all transform hover:scale-105 text-white`}>
                  <div className="text-white mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/90">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Why Early Screening Matters
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-4 bg-blue-50 p-4 rounded-xl shadow-sm">
                  <div className="text-green-500 text-2xl">✓</div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-800">Early Intervention</h3>
                    <p className="text-gray-600">
                      Identify challenges early to provide timely support and accommodations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-purple-50 p-4 rounded-xl shadow-sm">
                  <div className="text-green-500 text-2xl">✓</div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-800">Child-Friendly</h3>
                    <p className="text-gray-600">
                      Game-like assessments that children enjoy taking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !showResults ? (
          <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : setShowScreening(false)}
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <FaChevronRight className="w-5 h-5 transform rotate-180 mr-2" />
                  Back
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Step {currentStep + 1} of 3</span>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep * 33) + (progress / 3))}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
              {renderStepContent()}
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg flex items-start space-x-3 shadow-md">
              <span className="text-yellow-600 text-xl">💡</span>
              <div>
                <p className="font-medium text-yellow-800 mb-2">Tips for Accurate Results:</p>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                  <li>Ensure good lighting during handwriting upload</li>
                  <li>Choose a quiet environment for the test</li>
                  <li>Allow the child to take breaks if needed</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="mb-8">
              <div className="text-green-500 text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Screening Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for completing the assessment. Here are the results:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-xl text-white shadow-md">
                  <div className="text-white text-2xl mb-2">📝</div>
                  <h3 className="font-bold mb-1">Questionnaire Score</h3>
                  <p className="text-3xl font-bold">8/12</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-xl text-white shadow-md">
                  <div className="text-white text-2xl mb-2">✍️</div>
                  <h3 className="font-bold mb-1">Writing Analysis</h3>
                  <p className="text-3xl font-bold">Moderate Signs</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-xl text-left shadow-md">
                <h3 className="font-bold mb-4 text-purple-800">Recommendations:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Consult with a educational psychologist</li>
                  <li>Implement multisensory learning techniques</li>
                  <li>Use dyslexia-friendly fonts in learning materials</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowScreening(false);
                  setShowResults(false);
                  setCurrentStep(0);
                }}
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl
                  font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center mx-auto space-x-2"
              >
                <span>Start New Assessment</span>
                <FaChild className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {!showScreening && (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>© 2024 ReadEasy. Empowering early literacy assessment.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Research Basis</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Educator Resources</a>
            </div>
          </div>
        </footer>
      )}

{showSignupModal && (
  <SignupModal
    onClose={() => setShowSignupModal(false)}
    onSubmit={handleSignup}
    name={signupName}
    setName={setSignupName}
    email={signupEmail}
    setEmail={setSignupEmail}
    password={signupPassword}
    setPassword={setSignupPassword}
    role={signupRole}
    setRole={setSignupRole}
  />
)}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLogin}
          email={loginEmail}
          setEmail={setLoginEmail}
          password={loginPassword}
          setPassword={setLoginPassword}
        />
      )}
    </div>
  );
}

function App() {
  return (

      <Routes>
        <Route path="*" element={<DyslexiaScreeningApp />} />
        <Route path="/ada" element={<AdaptiveLearning />} />
        <Route path="/parent" element={<TeacherQuestionnaire />} />
        <Route path="/overview" element={<AssessmentOverview />} />
      </Routes>

  );
}

// Add these CSS classes to your global stylesheet
const globalStyles = `
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-bounce {
  animation: bounce 3s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(-2deg); }
}

.animate-float {
  animation: float 6s infinite ease-in-out;
}

.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\\:scale-102:hover {
  transform: scale(1.02);
}

.hover\\:scale-105:hover {
  transform: scale(1.05);
}
`;

export default App;