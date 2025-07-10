import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
    totalComments: number;
    averageScore: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const barData = [
    { name: 'Positive', value: data.positive },
    { name: 'Negative', value: data.negative },
    { name: 'Neutral', value: data.neutral },
  ];

  const pieData = [
    { name: 'Positive', value: data.positive },
    { name: 'Negative', value: data.negative },
    { name: 'Neutral', value: data.neutral },
  ];

  const COLORS = ['#1DB954', '#FF4B4B', '#808080'];

  return (
    <div className="mt-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-white">Total Comments</h3>
          <p className="text-3xl font-bold text-white">{data.totalComments}</p>
        </div>
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-white">Average Sentiment</h3>
          <p className="text-3xl font-bold text-white">{(data.averageScore * 100).toFixed(1)}%</p>
        </div>
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-white">Positive Comments</h3>
          <p className="text-3xl font-bold text-green-400">{data.positive}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-white">Sentiment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#1DB954" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-white">Sentiment Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;