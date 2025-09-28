import React from 'react';
import { Button } from './ui/button';
import { ArrowDown, Github, Linkedin, Mail, BarChart3, TrendingUp, Database, Cloud, Sparkles, Zap, Star } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 via-indigo-900/40 to-slate-900">
      {/* Enhanced Frosty Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Multiple frost layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-cyan-300/5 to-white/8 animate-frost-move"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/4 to-transparent animate-frost-move delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/3 via-transparent to-cyan-300/3 animate-frost-move delay-2000"></div>
        
        {/* Enhanced moving frost elements */}
        <div className="absolute top-1/5 left-1/5 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-frost-move"></div>
        <div className="absolute top-3/4 right-1/5 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/12 to-pink-400/12 rounded-full blur-3xl animate-frost-move delay-3000"></div>
        <div className="absolute top-2/3 left-2/3 w-[300px] h-[300px] bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-frost-move delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/8 to-teal-400/8 rounded-full blur-3xl animate-frost-move delay-4000"></div>
      </div>

      {/* Enhanced Floating Data Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs text-blue-300/40 font-mono animate-data-flow font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`
            }}
          >
            {['DATA', 'SQL', 'ETL', 'AZURE', 'SPARK', 'ML', 'API', '100GB', 'CLOUD', 'AI', 'BI', 'ANALYTICS'][Math.floor(Math.random() * 12)]}
          </div>
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-4 h-4 text-cyan-400" />
            ) : i % 3 === 1 ? (
              <Zap className="w-3 h-3 text-blue-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-purple-400" />
            )}
          </div>
        ))}
      </div>
      
      {/* Enhanced Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side - Enhanced Professional Content */}
        <div className="space-y-10 animate-slideInLeft">
          {/* Enhanced Professional Badge */}
          <div className="glass-effect-premium rounded-3xl p-8 border border-blue-400/30 animate-fadeInScale backdrop-blur-3xl bg-gradient-to-br from-white/10 via-blue-500/5 to-cyan-500/5 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
            
            {/* Premium Badge Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 shadow-lg animate-frost-glow">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-cyan-300 font-bold tracking-wider text-lg uppercase animate-glow">Data Engineer</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 text-sm font-semibold">Premium Portfolio</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-semibold">Online</span>
              </div>
            </div>
            
            {/* Enhanced Name Display */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-4 animate-glow">
                <span className="block text-white animate-slideInUp drop-shadow-2xl">NIKHIL</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slideInUp delay-200 text-premium-gradient">
                  JADHAV
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2 animate-slideInUp delay-300">
                Data Engineer & Azure Cloud Specialist
              </h2>
              
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-slideInUp delay-400"></div>
            </div>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-10 animate-slideInUp delay-500">
              <div className="glass-effect-premium rounded-2xl p-6 text-center border border-blue-400/30 backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 hover:scale-105 transition-all duration-300 animate-frost-glow">
                <div className="text-3xl font-black text-blue-400 mb-2 animate-pulse-premium">2+</div>
                <div className="text-sm text-blue-200 font-semibold">Years Exp</div>
              </div>
              <div className="glass-effect-premium rounded-2xl p-6 text-center border border-cyan-400/30 backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/5 hover:scale-105 transition-all duration-300 animate-frost-glow delay-200">
                <div className="text-3xl font-black text-cyan-400 mb-2 animate-pulse-premium">30%</div>
                <div className="text-sm text-cyan-200 font-semibold">Faster ETL</div>
              </div>
              <div className="glass-effect-premium rounded-2xl p-6 text-center border border-purple-400/30 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 hover:scale-105 transition-all duration-300 animate-frost-glow delay-400">
                <div className="text-3xl font-black text-purple-400 mb-2 animate-pulse-premium">100GB+</div>
                <div className="text-sm text-purple-200 font-semibold">Daily Data</div>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-slideInUp delay-600">
              <Button 
                onClick={scrollToAbout}
                className="group glass-effect-premium border-2 border-blue-400/40 hover:border-blue-400/80 text-white px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden backdrop-blur-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 shadow-2xl hover:shadow-blue-500/40"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <TrendingUp size={24} className="animate-pulse" />
                  View Analytics
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/nikhil-n-jadhav07/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group glass-effect-premium border-2 border-blue-400/40 hover:border-blue-400 text-blue-400 hover:text-white p-5 rounded-2xl transition-all duration-300 hover:scale-125 backdrop-blur-2xl bg-blue-500/10 hover:bg-blue-500/20 shadow-lg hover:shadow-blue-500/30"
                >
                  <Linkedin size={24} className="group-hover:animate-pulse" />
                </a>
                
                <a 
                  href="https://github.com/nikhil-jadhav123" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group glass-effect-premium border-2 border-cyan-400/40 hover:border-cyan-400 text-cyan-400 hover:text-white p-5 rounded-2xl transition-all duration-300 hover:scale-125 backdrop-blur-2xl bg-cyan-500/10 hover:bg-cyan-500/20 shadow-lg hover:shadow-cyan-500/30"
                >
                  <Github size={24} className="group-hover:animate-pulse" />
                </a>
                
                <a 
                  href="mailto:jadhavnikhil088@gmail.com"
                  className="group glass-effect-premium border-2 border-purple-400/40 hover:border-purple-400 text-purple-400 hover:text-white p-5 rounded-2xl transition-all duration-300 hover:scale-125 backdrop-blur-2xl bg-purple-500/10 hover:bg-purple-500/20 shadow-lg hover:shadow-purple-500/30"
                >
                  <Mail size={24} className="group-hover:animate-pulse" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Data Visualization Dashboard */}
        <div className="space-y-8 animate-slideInRight">
          {/* Enhanced Main Chart Container */}
          <div className="glass-effect-premium rounded-3xl p-8 border border-blue-400/30 animate-fadeInScale delay-200 backdrop-blur-3xl bg-gradient-to-br from-white/10 via-blue-500/5 to-cyan-500/5 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold flex items-center gap-3 text-xl">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 animate-frost-glow">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                Performance Analytics
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm text-green-400 font-semibold">Live Data</span>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            {/* Line Graph */}
            <div className="space-y-4">
              <div className="relative h-32 w-full">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-full border-t border-blue-400/20" 
                      style={{ top: `${i * 25}%` }}
                    ></div>
                  ))}
                </div>
                
                {/* Line Graph */}
                <svg className="w-full h-full" viewBox="0 0 400 120">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area under curve */}
                  <path
                    d="M 0 90 L 50 75 L 100 95 L 150 60 L 200 45 L 250 35 L 300 40 L 350 30 L 400 25 L 400 120 L 0 120 Z"
                    fill="url(#areaGradient)"
                    className="animate-slideInUp delay-300"
                  />
                  
                  {/* Main line */}
                  <path
                    d="M 0 90 L 50 75 L 100 95 L 150 60 L 200 45 L 250 35 L 300 40 L 350 30 L 400 25"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="800"
                    strokeDashoffset="800"
                    className="animate-draw-line"
                  />
                  
                  {/* Data points */}
                  {[
                    { x: 0, y: 90 }, { x: 50, y: 75 }, { x: 100, y: 95 }, { x: 150, y: 60 },
                    { x: 200, y: 45 }, { x: 250, y: 35 }, { x: 300, y: 40 }, { x: 350, y: 30 }, { x: 400, y: 25 }
                  ].map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#06b6d4"
                      className="animate-pulse-premium"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </svg>
                
                {/* Month labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => (
                    <span key={i} className="animate-slideInUp" style={{ animationDelay: `${i * 50}ms` }}>
                      {month}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect rounded-lg p-3 border border-green-400/20">
                  <div className="text-lg font-bold text-green-400">↗ 40%</div>
                  <div className="text-xs text-gray-300">Efficiency Gain</div>
                </div>
                <div className="glass-effect rounded-lg p-3 border border-orange-400/20">
                  <div className="text-lg font-bold text-orange-400">↘ 30%</div>
                  <div className="text-xs text-gray-300">Process Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* System Performance Matrix Removed */}
        </div>
      </div>
      
      {/* Professional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-slideInUp delay-700">
        <button 
          onClick={scrollToAbout}
          className="group glass-effect border border-blue-400/30 rounded-full p-4 text-blue-400 hover:text-white hover:border-blue-400 transition-all duration-300"
        >
          <ArrowDown size={24} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;