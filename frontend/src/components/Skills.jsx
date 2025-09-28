import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "SQL", "PySpark", "Spark SQL", "C"],
      color: "bg-blue-500"
    },
    {
      category: "Cloud & Azure Services",
      skills: ["Microsoft Azure", "Azure Data Factory", "Azure Databricks", "ADLS", "Azure Blob Storage"],
      color: "bg-cyan-500"
    },
    {
      category: "Data Engineering",
      skills: ["ETL Processes", "Data Pipeline", "Data Migration", "Data Warehousing", "Big Data"],
      color: "bg-emerald-500"
    },
    {
      category: "Databases & Tools",
      skills: ["MySQL", "Oracle", "Delta Lake", "PowerBI", "Databricks"],
      color: "bg-purple-500"
    },
    {
      category: "DevOps & Others",
      skills: ["CI/CD", "GIT", "ServiceNow", "Job Management Framework", "Data Quality"],
      color: "bg-orange-500"
    }
  ];

  const proficiencyLevels = [
    { skill: "Python & SQL", level: 90 },
    { skill: "Azure Cloud Services", level: 85 },
    { skill: "Data Pipeline Development", level: 88 },
    { skill: "ETL Processes", level: 92 },
    { skill: "PySpark & Big Data", level: 80 },
    { skill: "PowerBI & Visualization", level: 75 }
  ];

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-slate-800 via-purple-900/30 to-slate-800 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-premium"></div>
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-premium delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16 animate-slideInUp">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            TECHNICAL <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-glow">SKILLS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slideInUp delay-200">
            Comprehensive expertise in modern data engineering technologies and cloud platforms
          </p>
        </div>
        
        {/* Skills Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass-effect-premium group animate-fadeInScale hover:scale-105 border-2 border-white/20 hover:border-purple-400/60 backdrop-blur-3xl bg-gradient-to-br from-white/10 via-purple-500/5 to-cyan-500/5 shadow-2xl hover:shadow-purple-500/30 animate-frost-glow" style={{animationDelay: `${index * 0.15}s`}}>
              <CardHeader>
                <CardTitle className="text-white text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent group-hover:animate-glow">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      className="glass-effect-premium bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 text-white hover:from-purple-400/50 hover:to-cyan-400/50 hover:scale-110 transition-all duration-300 cursor-default shadow-lg backdrop-blur-2xl border border-white/20 px-3 py-2 text-sm font-semibold"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Proficiency Levels */}
        <div className="card-premium p-10 animate-slideInUp delay-500">
          <h3 className="text-3xl font-bold text-white mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Core Competencies
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {proficiencyLevels.map((item, index) => (
              <div key={index} className="space-y-3 animate-slideInUp" style={{animationDelay: `${0.7 + index * 0.1}s`}}>
                <div className="flex justify-between text-white">
                  <span className="font-semibold text-lg">{item.skill}</span>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg">{item.level}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-4 rounded-full transition-all duration-2000 ease-out shadow-lg"
                    style={{ 
                      width: `${item.level}%`,
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;