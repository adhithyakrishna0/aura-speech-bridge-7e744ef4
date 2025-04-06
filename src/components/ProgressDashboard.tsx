
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Clock, MessageSquare, Brain } from 'lucide-react';

const data = [
  { day: 'Mon', words: 120, accuracy: 70 },
  { day: 'Tue', words: 180, accuracy: 75 },
  { day: 'Wed', words: 150, accuracy: 78 },
  { day: 'Thu', words: 220, accuracy: 82 },
  { day: 'Fri', words: 250, accuracy: 85 },
  { day: 'Sat', words: 190, accuracy: 88 },
  { day: 'Sun', words: 280, accuracy: 90 },
];

const ProgressDashboard = () => {
  return (
    <div className="bg-card shadow-sm border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Communication Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Daily Words</p>
              <h3 className="text-2xl font-bold">285</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <ArrowUpRight size={16} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xs text-green-600 font-medium">↑ 14%</span>
            <span className="text-xs text-muted-foreground ml-2">vs last week</span>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Speech Accuracy</p>
              <h3 className="text-2xl font-bold">92%</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageSquare size={16} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xs text-green-600 font-medium">↑ 5%</span>
            <span className="text-xs text-muted-foreground ml-2">vs last week</span>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">EEG Detection</p>
              <h3 className="text-2xl font-bold">78%</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Brain size={16} className="text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xs text-green-600 font-medium">↑ 8%</span>
            <span className="text-xs text-muted-foreground ml-2">vs last week</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="words" stroke="#3498db" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#9b59b6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon: MessageSquare, text: "Completed 15 assisted conversations today", time: "2 hours ago" },
            { icon: Brain, text: "EEG calibration improved by 5%", time: "Yesterday" },
            { icon: Clock, text: "Average response time reduced to 0.8s", time: "2 days ago" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start">
                <div className="bg-muted p-2 rounded-full mr-3">
                  <Icon size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
