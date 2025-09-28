import React from 'react';
import { Card, CardContent } from './ui/card';
import { Award, TrendingUp, Users, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Reduced data processing time by 30%"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Workflow Efficiency",
      description: "Improved workflow efficiency by 40%"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Cross-functional team leadership"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Recognition",
      description: "Capgemini Shining Star Award"
    }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-br from-slate-900 via-purple-900/30 via-indigo-900/20 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background decorations with frosty effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/5 right-1/5 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-frost-move"></div>
        <div className="absolute bottom-1/5 left-1/5 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/12 to-blue-400/12 rounded-full blur-3xl animate-frost-move delay-2000"></div>
        <div className="absolute top-2/3 right-2/3 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-frost-move delay-4000"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/50 to-purple-400/50 rounded-full animate-float-enhanced"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20 animate-slideInUp">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 animate-glow">
            ABOUT <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-premium-gradient">ME</span>
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto mb-10 rounded-full shadow-lg shadow-purple-400/50"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
              Data Engineer with a Passion for Innovation
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              With over 2 years of experience at Capgemini Technology Services, I specialize in building robust data pipelines and cloud-based solutions that drive business growth. My expertise spans across Azure cloud technologies, ETL processes, and big data analytics.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm passionate about transforming complex data challenges into streamlined, efficient solutions. My work with Global Fast Moving Consumer Goods companies has given me invaluable experience in client collaboration and understanding diverse business needs.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Currently based in Bengaluru, I'm always eager to take on new challenges that push the boundaries of what's possible with data engineering and cloud technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="glass-effect-premium hover:scale-110 transition-all duration-500 animate-fadeInScale border-2 border-white/20 hover:border-cyan-400/60 backdrop-blur-3xl bg-gradient-to-br from-white/10 via-cyan-500/5 to-purple-500/5 shadow-2xl hover:shadow-cyan-500/30 animate-breathing-glow" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8 text-center">
                  <div className="glass-effect-premium mb-6 flex justify-center w-16 h-16 rounded-2xl items-center mx-auto bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-2xl border border-cyan-400/30 animate-frost-glow">
                    {React.cloneElement(highlight.icon, { className: "w-8 h-8 text-cyan-400" })}
                  </div>
                  <h4 className="text-white font-bold mb-3 text-lg bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;