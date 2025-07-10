import React from 'react';
import { Share2, UserCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Analysis {
  videoId: string;
  title: string;
  thumbnail: string;
  timestamp: string;
  data: {
    positive: number;
    negative: number;
    neutral: number;
    totalComments: number;
    averageScore: number;
  };
}

interface UserProfileProps {
  email: string;
  username: string;
  onClose?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ email, username }) => {
  const navigate = useNavigate();
  
  const analysisHistory = JSON.parse(localStorage.getItem(`${email}_history`) || '[]') as Analysis[];

  const handleShare = async (analysis: Analysis) => {
    try {
      const shareData = {
        title: 'YouTube Sentiment Analysis',
        text: `Check out the sentiment analysis for "${analysis.title}"`,
        url: `${window.location.origin}/share/${analysis.videoId}`
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showSharePopup('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const showSharePopup = (message: string) => {
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.transform = 'translateX(150%)';
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate(-1)}
                className="text-white hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <div className="w-20"></div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-6 mb-8">
                <UserCircle className="w-24 h-24 text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{username}</h2>
                  <p className="text-gray-300">{email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-6">Analysis History</h3>
              
              {analysisHistory.length === 0 ? (
                <p className="text-gray-300 text-center py-8">No analysis history yet</p>
              ) : (
                <div className="grid gap-6">
                  {analysisHistory.map((analysis, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex gap-6">
                        <img 
                          src={analysis.thumbnail} 
                          alt={analysis.title}
                          className="w-48 h-27 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="text-lg font-semibold text-white mb-2">{analysis.title}</h4>
                            <button
                              onClick={() => handleShare(analysis)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-gray-400 mb-4">{new Date(analysis.timestamp).toLocaleDateString()}</p>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-400 mb-1">Positive</p>
                              <p className="text-green-400 font-semibold">{analysis.data.positive}%</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Negative</p>
                              <p className="text-red-400 font-semibold">{analysis.data.negative}%</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Neutral</p>
                              <p className="text-gray-400 font-semibold">{analysis.data.neutral}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;