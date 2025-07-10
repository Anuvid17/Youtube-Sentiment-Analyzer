import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sun, Moon, AlertCircle, Loader2, BarChart2, MessageCircle, TrendingUp, ThumbsUp, ThumbsDown, Smile, ChevronDown } from 'lucide-react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import Documentation from './components/Documentation';
import logo from '../assets/logo.png';

const WelcomePage = () => {
  const [demoUrl, setDemoUrl] = useState('');
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <BarChart2 className="w-12 h-12 text-blue-400" />,
      title: "Advanced Analytics",
      description: "Get detailed sentiment analysis with powerful visualization tools and metrics."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-emerald-400" />,
      title: "Comment Insights",
      description: "Understand your audience better through comprehensive comment analysis."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-amber-400" />,
      title: "Trend Detection",
      description: "Identify patterns and trends in viewer sentiment over time."
    }
  ];

  const handleDemoAnalyze = () => {
    if (demoUrl.trim()) {
      sessionStorage.setItem('demoUrl', demoUrl); // temporarily store the URL
      navigate('/analyze'); // redirect to analyze page
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23232F3E' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }}></div>
        </div>
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-bounce">
              <img 
                src={logo} 
                alt="YouTube Sentiment Analyzer Logo" 
                className="w-32 h-32 mx-auto"
              />
            </div>
            {/* <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200">
              YouTube Sentiment Analyzer
            </h1> */}
            <h1 className="text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200">
              YouTube Sentiment Analyzer
            </h1>
            <p className="text-2xl mb-12 text-gray-300">
              Analyze YouTube comments to uncover viewer sentiment and engagement trends.
            </p>
            <button
              onClick={() => scrollToSection('learn-more')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Get Started
            </button>
          </div>
          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </div>

      {/* What is Sentiment Analysis Section */}
      <div id="learn-more" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">What is Sentiment Analysis?</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10">
              <ThumbsUp className="w-16 h-16 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Positive Sentiment</h3>
              <p className="text-gray-300">
                Comments expressing approval, excitement, happiness, or satisfaction with your content.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10">
              <ThumbsDown className="w-16 h-16 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Negative Sentiment</h3>
              <p className="text-gray-300">
                Comments showing disapproval, criticism, disappointment, or dissatisfaction.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10">
              <Smile className="w-16 h-16 text-amber-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Neutral Sentiment</h3>
              <p className="text-gray-300">
                Objective comments, questions, or statements without emotional context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">See It In Action</h2>
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
          <div className="mb-8">
            <label className="block text-white text-lg mb-4">Try our demo with any YouTube video URL:</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleDemoAnalyze}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const AboutPage = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-white text-center">About Us</h1>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              We are a student-led team driven by a shared curiosity for understanding online conversations through data.
              Our project focuses on analyzing YouTube comments using a custom-built sentiment analysis system powered by
              Natural Language Processing and machine learning. By extracting and classifying viewer sentiments, we aim to
              help creators, marketers, and researchers better interpret public opinion and engagement trends.
            </p>

            {/* Collapsible Section: Mission */}
            <div className="bg-white/5 rounded-lg border border-white/10">
              <button
                onClick={() => toggleSection("mission")}
                className="w-full text-left px-6 py-4 text-2xl font-bold text-white hover:bg-white/10 transition"
              >
                Our Mission
              </button>
              {openSection === "mission" && (
                <div className="px-6 pb-4 text-lg text-gray-300">
                  To build smart, accessible tools that turn unstructured social media data into actionable insights
                  using clean data engineering and effective machine learning models.
                </div>
              )}
            </div>

            {/* Collapsible Section: Vision */}
            <div className="bg-white/5 rounded-lg border border-white/10">
              <button
                onClick={() => toggleSection("vision")}
                className="w-full text-left px-6 py-4 text-2xl font-bold text-white hover:bg-white/10 transition"
              >
                Our Vision
              </button>
              {openSection === "vision" && (
                <div className="px-6 pb-4 text-lg text-gray-300">
                  To evolve into a robust, adaptable platform that can analyze sentiment across multiple content platforms,
                  offering deeper, context-aware understanding of digital interactions.
                </div>
              )}
            </div>

            {/* Collapsible Section: What Sets Us Apart */}
            <div className="bg-white/5 rounded-lg border border-white/10">
              <button
                onClick={() => toggleSection("unique")}
                className="w-full text-left px-6 py-4 text-2xl font-bold text-white hover:bg-white/10 transition"
              >
                What Sets Us Apart
              </button>
              {openSection === "unique" && (
                <ul className="px-6 pb-4 text-lg space-y-2 list-disc list-inside text-gray-300">
                  <li>Focused analysis of real YouTube data using the official API</li>
                  <li>Intelligent handling of sarcasm and informal language</li>
                  <li>Visual sentiment summaries through graphs and word clouds</li>
                  <li>A user-friendly approach backed by solid technical foundations</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const AnalyzePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const mockData = {
    positive: 60,
    negative: 25,
    neutral: 15,
    totalComments: 100,
    averageScore: 0.65
  };

  const handleAnalyze = async (inputUrl: string) => {
    setLoading(true);
    setError('');

    try {
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!urlPattern.test(inputUrl)) {
        throw new Error('Please enter a valid YouTube URL');
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      setUrl(inputUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-20 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {darkMode ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-white" />}
        </button>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
          <Header />
          
          <URLInput 
            onAnalyze={handleAnalyze}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 text-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center mt-8 text-white">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Analyzing comments...</span>
            </div>
          ) : url && (
            <Dashboard data={mockData} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfileWrapper />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

const UserProfileWrapper = () => {
  const userEmail = localStorage.getItem('currentUser');
  const userData = userEmail ? JSON.parse(localStorage.getItem(userEmail) || '{}') : null;
  
  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900">
      <UserProfile 
        email={userData.email}
        username={userData.username}
      />
      <Footer />
    </div>
  );
};

export default App;