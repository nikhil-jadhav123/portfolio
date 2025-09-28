import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Calendar, MapPin, Trophy } from 'lucide-react';

const Education = () => {
  const education = {
    degree: "Bachelor of Engineering",
    field: "Engineering",
    institution: "Jain College of Engineering",
    location: "Belgaum, Karnataka",
    period: "Aug 2019 – July 2022",
    cgpa: "7.85/10.0",
    highlights: [
      "Strong foundation in computer science and engineering principles",
      "Developed problem-solving and analytical thinking skills",
      "Gained exposure to programming and database management",
      "Built teamwork and project management capabilities"
    ]
  };

  const academicAchievements = [
    {
      title: "Consistent Academic Performance",
      description: "Maintained strong CGPA of 7.85 throughout the program"
    },
    {
      title: "Technical Foundation",
      description: "Built solid foundation in programming and data structures"
    },
    {
      title: "Project Experience",
      description: "Completed multiple engineering projects and coursework"
    }
  ];

  return (
    <section id="education" className="py-24 bg-slate-800">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="text-cyan-400">EDUCATION</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Education Card */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-700 hover:border-cyan-400 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 mt-1">
                    <GraduationCap size={32} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-white mb-2">
                      {education.degree}
                    </CardTitle>
                    <h3 className="text-xl text-cyan-400 font-semibold mb-4">
                      {education.institution}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{education.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{education.location}</span>
                      </div>
                    </div>
                    
                    {/* CGPA Highlight */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30 mb-6">
                      <div className="flex items-center gap-3">
                        <Trophy className="text-cyan-400" size={20} />
                        <div>
                          <h4 className="text-cyan-400 font-semibold">Academic Excellence</h4>
                          <p className="text-white text-lg font-bold">CGPA: {education.cgpa}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <h4 className="text-white font-semibold text-lg mb-4">Key Learning Outcomes</h4>
                <ul className="space-y-3">
                  {education.highlights.map((highlight, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Academic Achievements */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              Academic Highlights
            </h3>
            
            {academicAchievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-cyan-400 font-semibold mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {/* Additional Info Card */}
            <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <h4 className="text-white font-semibold mb-2">Transition to Industry</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Successfully transitioned from academic learning to professional data engineering role at Capgemini
                </p>
                <Badge className="mt-3 bg-cyan-500 text-white">
                  Career Growth
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;