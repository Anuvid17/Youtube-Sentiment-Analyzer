import { Code, BookOpen, Terminal, Zap } from 'lucide-react';
import Footer from './Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-white mb-8">Documentation</h1>
            
            <div className="space-y-12">
              {/* Getting Started */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
                </div>
                <div className="prose prose-invert">
                  <p className="text-gray-300">
                    YouTube Sentiment Analyzer helps you understand your audience's reactions through advanced sentiment analysis of video comments.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Quick Start</h3>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                      <li>Create an account or sign in</li>
                      <li>Copy a YouTube video URL</li>
                      <li>Paste the URL in the analyzer</li>
                      <li>View detailed sentiment analysis results</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">API Reference</h2>
                </div>
                <div className="prose prose-invert">
                  <p className="text-gray-300">
                    Our API allows you to integrate sentiment analysis capabilities into your own applications.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Endpoints</h3>
                    <div className="space-y-4">
                      <div>
                        <code className="text-sm bg-black/50 px-2 py-1 rounded text-blue-300">
                          POST /api/analyze
                        </code>
                        <p className="mt-2 text-gray-300">
                          Analyze sentiment for a YouTube video's comments
                        </p>
                      </div>
                      <div>
                        <code className="text-sm bg-black/50 px-2 py-1 rounded text-blue-300">
                          GET /api/history
                        </code>
                        <p className="mt-2 text-gray-300">
                          Retrieve analysis history for authenticated users
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Examples */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Examples</h2>
                </div>
                <div className="prose prose-invert">
                  <p className="text-gray-300">
                    Here are some examples of how to use our API in different programming languages.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">JavaScript</h3>
                    <pre className="text-sm bg-black/50 p-4 rounded overflow-x-auto">
                      <code className="text-blue-300">
{`const response = await fetch('https://api.sentimentanalyzer.com/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    videoUrl: 'https://youtube.com/watch?v=...'
  })
});

const data = await response.json();`}
                      </code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Best Practices */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Best Practices</h2>
                </div>
                <div className="prose prose-invert">
                  <p className="text-gray-300">
                    Follow these guidelines to get the most out of our sentiment analysis service.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 mt-4">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Always use HTTPS for API requests</li>
                      <li>Cache analysis results when possible</li>
                      <li>Implement proper error handling</li>
                      <li>Rate limit your requests to avoid throttling</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;