import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Building, Calendar, MapPin, Award } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Data Engineer",
      company: "Capgemini Technology Services India Limited",
      location: "Bengaluru, India",
      period: "Apr 2024 – Present",
      type: "Full-time",
      achievements: [
        "Reduced data processing time by 30% through optimized ETL job implementations",
        "Improved decision-making speed by 15% via accurate and timely BI report delivery",
        "Enhanced workflow efficiency by 40% using Job Management Framework orchestration",
        "Optimized ETL processes reducing processing time by 35% for reliable data delivery",
        "Handled over 100GB of daily data using PySpark and Azure services",
        "Received Capgemini Shining Star Award for exceptional project performance"
      ],
      technologies: ["Python", "SQL", "Azure Data Factory", "Databricks", "PySpark", "PowerBI"],
      responsibilities: [
        "Building automated data pipelines for ETL of large data volumes",
        "Conducting root cause analysis for data discrepancies during migrations",
        "Mentoring junior analysts and fostering professional development",
        "Collaborating with cross-functional teams and direct client communication",
        "Implementing Medallion architecture (Bronze, Silver, Gold layers) for data quality"
      ]
    },
    {
      title: "Junior Data Engineer",
      company: "Capgemini Technology Services India Limited",
      location: "Bengaluru, India",
      period: "Apr 2023 – Mar 2024",
      type: "Full-time",
      achievements: [
        "Successfully completed data migration projects with 99.5% accuracy",
        "Developed Python scripts that automated 20+ manual data validation processes",
        "Reduced data quality issues by 25% through implementation of validation checks",
        "Collaborated on building ETL pipelines processing over 50GB of daily data",
        "Achieved AWS Cloud Practitioner certification within first 6 months",
        "Recognized as 'Best Newcomer' in quarterly team performance review"
      ],
      technologies: ["Python", "SQL", "MySQL", "PostgreSQL", "Apache Spark", "AWS S3", "Git"],
      responsibilities: [
        "Developing and maintaining ETL scripts for data ingestion and transformation",
        "Performing data quality checks and validation on incoming datasets",
        "Creating documentation for data pipeline processes and workflows",
        "Supporting senior engineers in troubleshooting data pipeline issues",
        "Learning and implementing best practices for data engineering workflows",
        "Participating in code reviews and technical design discussions"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            WORK <span className="text-cyan-400">EXPERIENCE</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:border-cyan-400 transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Building size={18} />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className="bg-cyan-500 text-white w-fit">
                    {exp.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Shining Star Award Highlight */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-yellow-400" size={20} />
                    <h4 className="text-yellow-400 font-semibold text-lg">Capgemini Shining Star Award</h4>
                  </div>
                  <p className="text-gray-300">Recognized for exceptional performance and outstanding contribution to project success</p>
                </div>
                
                {/* Key Achievements */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Core Responsibilities */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3">Core Responsibilities</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <Badge key={i} className="bg-slate-700 text-cyan-400 hover:bg-slate-600 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;