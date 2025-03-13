import React, { useState } from 'react';
import { Upload, FileText, Send, Info, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Handwriting = () => {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);

  const dyslexiaSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!",
    "The five boxing wizards jump quickly.",
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('handwriting', file);

      // Change the API endpoint to your localhost
      const response = await fetch('http://localhost:5001/upload-handwriting', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Handwriting Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Upload a sample of your handwriting for analysis. Discover insights about your personality traits and cognitive patterns.</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Instructions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 bg-white rounded-2xl shadow-xl p-6 h-fit"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExpandedInfo(!expandedInfo)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
              >
                <Info className="w-4 h-4 mr-1" />
                Why these sentences?
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${expandedInfo ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
            
            <AnimatePresence>
              {expandedInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-4"
                >
                  <div className="bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
                    These sentences are pangrams - they contain every letter of the alphabet. 
                    This allows our analysis to examine how you form each letter, providing
                    a comprehensive evaluation of your handwriting style.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-gray-600 mb-4 text-sm">
              Please write one of the following sentences on a piece of paper, then upload a clear photo:
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl border border-blue-100"
            >
              <ul className="space-y-3">
                {dyslexiaSentences.map((sentence, index) => (
                  <motion.li 
                    key={index} 
                    whileHover={{ x: 3 }}
                    className="text-gray-700 text-sm flex items-start"
                  >
                    <span className="inline-block w-5 h-5 flex-shrink-0 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium flex items-center justify-center mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    {sentence}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Upload Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-7 bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Sample</h2>
            
            <div className="mb-6">
              <motion.label 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors duration-200 bg-gradient-to-br from-indigo-50 to-blue-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileText className="w-12 h-12 text-indigo-600 mb-3" />
                      <p className="text-indigo-700 font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-indigo-400 mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 5MB)</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileChange}
                />
              </motion.label>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitting || !file}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                  !file 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                    : submitted
                      ? 'bg-green-600 text-white shadow-green-200'
                      : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-200'
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : submitted ? (
                  "Analysis Submitted Successfully!"
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit for Analysis
                  </>
                )}
              </motion.button>
              
              <p className="text-xs text-center text-gray-500">
                By submitting, you agree to our <span className="text-indigo-600 cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>Our handwriting analysis uses advanced AI to evaluate personality traits and cognitive patterns.</p>
          <p className="mt-1">Results are for educational purposes only.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Handwriting;