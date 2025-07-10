import React, { useState } from 'react';

interface URLInputProps {
  onAnalyze: (url: string, saveChoice: string, wordcloudSentiment: string) => void;
  loading: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onAnalyze, loading }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [saveChoice] = useState('5');
  const [wordcloudSentiment] = useState('3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(inputUrl, saveChoice, wordcloudSentiment);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-3xl mx-auto flex items-center gap-3">
      <input
        type="text"
        placeholder="Enter YouTube URL or video ID"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        disabled={loading}
        required
        className="
          flex-grow
          p-3
          rounded
          border
          border-gray-700
          bg-transparent
          text-white
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          text-white
          font-semibold
          py-3
          px-6
          rounded
          whitespace-nowrap
          transition
        "
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default URLInput;
