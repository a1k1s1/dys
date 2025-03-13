import { useState } from 'react';
import { FaChartLine, FaComments, FaLightbulb, FaBookReader, FaHandHoldingHeart, FaChild, FaRocket } from 'react-icons/fa';
import { Line, Radar } from 'react-chartjs-2';

// Enhanced dyslexia-friendly color scheme
const dyslexiaColors = {
  primary: '#0066CC',
  success: '#58CC02',
  warning: '#FFC800',
  danger: '#FF4B4B',
  neutral: '#F0F0F0',
  text: '#2D3748',
  background: '#FFFFFF',
  accent: '#FFA500'
};

// Add sampleStudent definition first
const sampleStudent = {
  name: 'Emily Johnson',
  age: 8,
  grade: '3rd Grade',
  progress: 65,
  readingLevel: 'Early Reader',
  strengths: ['Phonics', 'Creativity'],
  challenges: ['Spelling', 'Word Recognition'],
  questionsAttempted: 128,
  currentStreak: 5,
  highestStreak: 12,
  lastSession: '2 hours ago'
};

// Enhanced student profile with dyslexia assessment
const enhancedStudent = {
  ...sampleStudent,
  dyslexiaProfile: {
    phonologicalProcessing: 75,
    orthographicProcessing: 60,
    rapidAutomatizedNaming: 55,
    visualProcessing: 80,
    auditoryProcessing: 70,
    learningStyle: 'visual-kinesthetic'
  },
  confidenceScore: 65,
  goals: [
    { title: 'Sight Words', target: 50, current: 32, completed: false },
    { title: 'Syllable Division', target: 10, current: 7, completed: false }
  ],
  improvementAreas: [
    { skill: 'Phonemic Awareness', improvement: 25 },
    { skill: 'Decoding', improvement: 40 },
    { skill: 'Fluency', improvement: 35 },
    { skill: 'Comprehension', improvement: 30 },
    { skill: 'Spelling', improvement: 45 }
  ]
};

export default function ParentDashboard() {
  const [settings, setSettings] = useState({
    font: 'sans',
    contrast: 'normal',
    spacing: 1.2
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const renderDyslexiaSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="mr-2">Font:</span>
        <select 
          value={settings.font}
          onChange={(e) => setSettings({...settings, font: e.target.value})}
          className="border p-2 rounded-lg"
        >
          <option value="sans">Arial</option>
          <option value="serif">Georgia</option>
        </select>
      </div>
      {/* Add contrast and spacing controls */}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 ${settings.font === 'sans' ? 'font-sans' : 'font-serif'}`}>
      {/* Dyslexia-friendly settings overlay */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="bg-primary text-white p-2 rounded-lg"
        >
          Accessibility Settings
        </button>
        {showSettings && renderDyslexiaSettings()}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Child Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <div className="flex items-center mb-4">
            <FaChild className="text-4xl text-primary mr-4" />
            <div>
              <h2 className="text-xl font-bold">{enhancedStudent.name}</h2>
              <p className="text-sm text-gray-600">{`${enhancedStudent.age} • ${enhancedStudent.grade}`}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Reading Level:</span>
              <span className="font-bold">{enhancedStudent.readingLevel}</span>
            </div>
            {/* Add more profile metrics */}
          </div>
        </div>

        {/* Dyslexia Profile Visualization */}
        <div className="col-span-3 bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaRocket className="mr-2 text-success" />
            Learning Profile
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(enhancedStudent.dyslexiaProfile).map(([skill, value]) => (
              <div key={skill} className="bg-neutral p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{skill.replace(/([A-Z])/g, ' $1')}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${
                      value > 70 ? 'bg-success' : value < 50 ? 'bg-danger' : 'bg-warning'
                    }`} 
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="font-bold">{`${value}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress and Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Skill Progress Radar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-primary" />
            Skill Development
          </h3>
          <Radar
            data={{
              labels: ['Phonemic Awareness', 'Decoding', 'Fluency', 'Comprehension', 'Spelling'],
              datasets: [{
                label: 'Current Proficiency',
                data: enhancedStudent.improvementAreas.map(a => 100 - a.improvement),
                backgroundColor: 'rgba(0, 102, 204, 0.2)',
                borderColor: dyslexiaColors.primary,
                pointBackgroundColor: dyslexiaColors.primary
              }]
            }}
            options={{
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            }}
          />
        </div>

        {/* Confidence Tracker */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaHandHoldingHeart className="mr-2 text-success" />
            Confidence Growth
          </h3>
          <Line
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [{
                label: 'Confidence Score',
                data: [60, 62, 65, 68, 70],
                borderColor: dyslexiaColors.success,
                tension: 0.4
              }]
            }}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => `Confidence: ${ctx.raw}%`
                  }
                }
              }
            }}
          />
        </div>

        {/* Goal Tracking */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaLightbulb className="mr-2 text-warning" />
            Learning Goals
          </h3>
          <div className="space-y-4">
            {enhancedStudent.goals.map((goal, index) => (
              <div key={index} className="bg-neutral p-4 rounded-lg">
                <h4 className="font-bold mb-1">{goal.title}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      goal.current >= goal.target ? 'bg-success' : 'bg-primary'
                    }`} 
                    style={{ width: `${(goal.current/goal.target)*100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{goal.current}/{goal.target}</span>
                  <span>{Math.round((goal.current/goal.target)*100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Celebration Center */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100 relative">
          {showCelebration && (
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-yellow-600">🎉 Great Job! 🎉</h3>
                <p className="text-xl mt-2">You've mastered syllable division!</p>
              </div>
            </div>
          )}
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaRocket className="mr-2 text-accent" />
            Celebration Center
          </h3>
          <div className="space-y-4">
            <div className="bg-neutral p-4 rounded-lg">
              <h4 className="font-bold">Recent Achievements</h4>
              <ul className="list-disc pl-4 space-y-2 mt-2">
                <li className="text-success">Completed 5 daily sessions</li>
                <li className="text-warning">Mastered 10 new sight words</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowCelebration(true)}
              className="w-full bg-accent text-white p-3 rounded-lg font-bold"
            >
              Celebrate Achievement
            </button>
          </div>
        </div>

        {/* Parent Notes Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaBookReader className="mr-2 text-primary" />
            Parent Notes
          </h3>
          <div className="space-y-4">
            <textarea 
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
              placeholder="Add your observations..."
            />
          </div>
        </div>

        {/* Specialist Chat */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <FaComments className="mr-2 text-accent" />
            Specialist Support
          </h3>
          <div className="space-y-4">
            <div className="bg-neutral p-4 rounded-lg">
              <p className="text-sm">Next appointment: Wednesday 3pm</p>
            </div>
            <button className="w-full bg-accent text-white p-3 rounded-lg">
              Schedule Video Call
            </button>
            <button className="w-full border border-accent text-accent p-3 rounded-lg">
              Send Message
            </button>
          </div>
        </div>
      </div> {/* Closing the grid container */}
    </div>
  );
}
