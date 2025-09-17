import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Stats = () => {
  const stats = [
    {
      number: '10,000+',
      label: 'Active Alumni',
      icon: '🎓',
      value: 10000
    },
    {
      number: '500+',
      label: 'Successful Mentorships',
      icon: '🤝',
      value: 500
    },
    {
      number: '2,000+',
      label: 'Students Connected',
      icon: '👨‍🎓',
      value: 2000
    },
    {
      number: '₹50L+',
      label: 'Donations Raised',
      icon: '💝',
      value: 5000000
    }
  ];

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    }
  };

  const barData = {
    labels: ['Alumni', 'Mentorships', 'Students', 'Donations (₹L)'],
    datasets: [
      {
        label: 'Platform Impact',
        data: [10000, 500, 2000, 50],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',   // indigo
          'rgba(147, 51, 234, 0.8)',    // purple
          'rgba(59, 130, 246, 0.8)',    // blue
          'rgba(236, 72, 153, 0.8)',    // pink
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(147, 51, 234)',
          'rgb(59, 130, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Active Alumni', 'Students', 'Mentorships', 'Events'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(147, 51, 234)',
          'rgb(59, 130, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Connections',
        data: [65, 59, 80, 81, 56, 95],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join thousands of alumni and students who are building meaningful connections and creating lasting impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Charts Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-4">
              Platform Analytics
            </h3>
            <p className="text-gray-300">Interactive visualizations of our community growth and engagement</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bar Chart */}
            <motion.div
              className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Impact Overview</h4>
              <div className="h-64">
                <Bar data={barData} options={chartOptions} />
              </div>
            </motion.div>

            {/* Doughnut Chart */}
            <motion.div
              className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Community Distribution</h4>
              <div className="h-64">
                <Doughnut data={doughnutData} options={{ 
                  ...chartOptions, 
                  scales: undefined,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#e2e8f0',
                        font: {
                          size: 10
                        },
                        padding: 20
                      }
                    }
                  }
                }} />
              </div>
            </motion.div>

            {/* Line Chart */}
            <motion.div
              className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Growth Trend</h4>
              <div className="h-64">
                <Line data={lineData} options={chartOptions} />
              </div>
            </motion.div>
          </div>

          {/* Additional Stats Grid */}
          <motion.div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { label: 'Success Rate', value: '94%', color: 'from-green-400 to-emerald-600' },
              { label: 'Monthly Growth', value: '+23%', color: 'from-blue-400 to-indigo-600' },
              { label: 'User Satisfaction', value: '4.8★', color: 'from-yellow-400 to-orange-600' },
              { label: 'Active Regions', value: '12+', color: 'from-purple-400 to-pink-600' }
            ].map((metric, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join Our Growing Community?
            </h3>
            <p className="text-gray-300 mb-6">
              Connect with alumni, find mentors, and build your professional network today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl font-semibold text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/login'}
              >
                Get Started
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-white/20 hover:border-white/40 rounded-xl font-semibold text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register'}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;