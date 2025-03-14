import React, { useState } from 'react';
import axios from 'axios';

const MediaCapture = () => {
  const [imageFile, setImageFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [userId, setUserId] = useState(''); // Add userId state

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert('Please enter a user ID');
        return;
      }

      // Send image to handwriting endpoint
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        imageFormData.append('userId', userId);
        
        const imageResponse = await axios.post('http://localhost:4001/assessment/handwriting', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log('Image upload response:', imageResponse.data);
      }

      // Send audio to audio endpoint
      if (audioBlob) {
        const audioFormData = new FormData();
        audioFormData.append('audio', new File([audioBlob], 'recording.wav', { type: 'audio/wav' }));
        audioFormData.append('userId', userId);
        
        console.log('Sending audio to backend...', {
          size: audioBlob.size,
          type: audioBlob.type,
          userId: userId
        });
        
        const audioResponse = await axios.post('http://localhost:4001/assessment/audio', audioFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        
        console.log('Audio received by backend:', {
          status: audioResponse.status,
          data: audioResponse.data
        });
        console.log('Audio upload response:', audioResponse.data);
      }

      alert('Media submitted successfully!');
    } catch (error) {
      console.error('Error submitting media:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(`Error submitting media: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={handleUserIdChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter MongoDB User ID"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Image Upload</h2>
      <div className="mb-8">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Audio Recording</h2>
      <div className="mb-8">
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200
                     ${isRecording ? 
                       'bg-red-500 hover:bg-red-600 text-white' : 
                       'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioBlob && <p className="mt-2 text-green-600">Recording saved!</p>}
      </div>
      
      <button 
        onClick={handleSubmit} 
        disabled={!userId || (!imageFile && !audioBlob)}
        className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg
                  hover:bg-blue-700 transition-colors duration-200
                  disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Submit Media
      </button>
    </div>
  );
};

export default MediaCapture;