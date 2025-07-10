// import { useEffect, useState } from 'react';
// import { AlertCircle, Loader2 } from 'lucide-react';
// import Header from './Header';
// import URLInput from './URLInput';
// import Dashboard from './Dashboard';
// import { useNavigate } from 'react-router-dom';

// const AnalyzePage = () => {
//   const [loading, setLoading] = useState(false);
//   const [url, setUrl] = useState('');
//   const [error, setError] = useState('');
//   const [result, setResult] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const demoUrl = sessionStorage.getItem('demoUrl');
//     if (demoUrl) {
//       handleAnalyze(demoUrl);
//       sessionStorage.removeItem('demoUrl');
//     }
//   }, []);

//   const handleAnalyze = async (inputUrl: string) => {
//     setLoading(true);
//     setError('');
//     setResult(null);

//     try {
//       const userEmail = localStorage.getItem('currentUser');
//       if (!userEmail) {
//         navigate('/login');
//         return;
//       }

//       const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
//       if (!urlPattern.test(inputUrl)) {
//         throw new Error('Please enter a valid YouTube URL');
//       }

//       const response = await fetch('http://localhost:5000/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ video_url: inputUrl }),
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error(data.message || 'Failed to analyze video');

//       setUrl(inputUrl);
//       setResult(data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
//       <div className="container mx-auto px-4 py-16">
//         <Header />

//         <URLInput onAnalyze={handleAnalyze} loading={loading} />

//         {error && (
//           <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-lg flex items-center gap-2">
//             <AlertCircle className="w-5 h-5" />
//             <span>{error}</span>
//           </div>
//         )}

//         {loading && (
//           <div className="flex items-center justify-center mt-8 text-white">
//             <Loader2 className="w-8 h-8 animate-spin" />
//             <span className="ml-2">Analyzing comments...</span>
//           </div>
//         )}

//         {result && <Dashboard data={result} />}
//       </div>
//     </div>
//   );
// };

// export default AnalyzePage;

import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import Header from './Header';
import URLInput from './URLInput';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';

const AnalyzePage = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async (inputUrl: string) => {
    setLoading(true);
    setError('');
    setResult(null);
    setVideoTitle('');

    try {
      const userEmail = localStorage.getItem('currentUser');
      if (!userEmail) {
        navigate('/login');
        return;
      }

      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!urlPattern.test(inputUrl)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      try {
        const oEmbedRes = await fetch(`https://www.youtube.com/oembed?url=${inputUrl}format=json`);
        if (!oEmbedRes.ok) throw new Error('Failed to fetch video title');
        const oEmbedData = await oEmbedRes.json();

        setVideoTitle(oEmbedData.title);
      } catch {
        setVideoTitle('Analyzing video...');
      }

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to analyze video');

      setUrl(inputUrl);
      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const demoUrl = sessionStorage.getItem('demoUrl');
    if (demoUrl) {
      handleAnalyze(demoUrl);
      sessionStorage.removeItem('demoUrl');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Header />

        <URLInput onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center mt-8 text-white">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="text-lg font-medium">{videoTitle || 'Analyzing video...'}</span>
            <span className="text-sm text-slate-300 mt-1">Please wait while we analyze the comments.</span>
          </div>
        )}

        {result && videoTitle && (
          <h2 className="text-white text-xl font-semibold text-center mt-8">{videoTitle}</h2>
        )}

        {result && <Dashboard data={result} />}
      </div>
    </div>
  );
};

export default AnalyzePage;
