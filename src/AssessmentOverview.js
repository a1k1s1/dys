import { FaCheckCircle, FaSpinner, FaQuestionCircle, FaPencilAlt, FaChild } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AssessmentOverview() {
  // Mock data - replace with actual state/props
  const status = {
    parentQuestionnaire: true,
    handwritingUpload: false,
    assessmentTest: false
  };

  const getStatusIcon = (completed) => null;

  const completedCount = Object.values(status).filter(Boolean).length;
  const progressPercentage = (completedCount / 3) * 100;

  const cardVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Assessment Progress
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Complete all steps to receive your personalized learning plan
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {completedCount}/3
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Parent Questionnaire Card */}
          <Link to="/parent" className="block">
            <motion.div 
              className="bg-white rounded-2xl shadow-md p-5 overflow-hidden border-l-4 border-indigo-500"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-indigo-100 flex-shrink-0">
                    <FaQuestionCircle className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Parent Questionnaire</h2>
                    <p className="text-gray-500 text-sm">About learning patterns</p>
                  </div>
                </div>
                {getStatusIcon(status.parentQuestionnaire)}
              </div>
            </motion.div>
          </Link>

          {/* Handwriting Upload Card */}
          <Link to="/handwriting" className="block">
            <motion.div 
              className="bg-white rounded-2xl shadow-md p-5 overflow-hidden border-l-4 border-violet-500"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-violet-100 flex-shrink-0">
                    <FaPencilAlt className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Handwriting Upload</h2>
                    <p className="text-gray-500 text-sm">Submit handwriting samples</p>
                  </div>
                </div>
                {getStatusIcon(status.handwritingUpload)}
              </div>
            </motion.div>
          </Link>

          {/* Assessment Test Card */}
          <Link to="/firsttest" className="block">
            <motion.div 
              className="bg-white rounded-2xl shadow-md p-5 overflow-hidden border-l-4 border-purple-500"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-purple-100 flex-shrink-0">
                    <FaChild className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Assessment Test</h2>
                    <p className="text-gray-500 text-sm">Interactive exercises</p>
                  </div>
                </div>
                {getStatusIcon(status.assessmentTest)}
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Assessment
          </motion.button>
        </div>

        {/* Tips Section */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <p className="text-gray-600 text-sm">Complete each section at your own pace</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <p className="text-gray-600 text-sm">Results are saved automatically</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-indigo-500 mt-1">•</span>
              <p className="text-gray-600 text-sm">Allow 15-20 minutes for each assessment section</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AssessmentOverview;