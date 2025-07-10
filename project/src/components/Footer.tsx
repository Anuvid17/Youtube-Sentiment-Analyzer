import { Mail, Twitter, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div 
              className="flex items-center gap-0 mb-4 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <img 
                src={logo} 
                alt="YouTube Sentiment Analyzer Logo" 
                className="w-16 h-16"
              />
              <span className="font-bold text-lg">Sentiment Analyzer</span>
            </div>
            <p className="text-gray-300">
              Understand your audience better through advanced sentiment analysis.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/analyze" className="text-gray-300 hover:text-white">Analyze</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-gray-300 hover:text-white">Documentation</Link></li>
              <li><Link to="/docs#api" className="text-gray-300 hover:text-white">API Reference</Link></li>
              <li><Link to="/docs#examples" className="text-gray-300 hover:text-white">Examples</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link to="/contact" className="text-gray-300 hover:text-white">
                <Mail className="w-5 h-5" />
              </Link>
              <Link to="/twitter" className="text-gray-300 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="/github" className="text-gray-300 hover:text-white">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} YouTube Sentiment Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;