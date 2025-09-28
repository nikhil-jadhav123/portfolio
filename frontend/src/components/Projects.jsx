import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, TrendingUp, Database, Cloud } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Data and Analytics Managed Services",
      description: "Comprehensive data pipeline solution handling over 100GB of daily data processing with automated orchestration and monitoring capabilities.",
      icon: <Database className="w-8 h-8" />,
      achievements: [
        "Improved workflow efficiency by 40% using Job Management Framework",
        "Reduced processing time by 35% through ETL optimization",
        "Handles 100GB+ daily data processing seamlessly",
        "Implemented robust data ingestion pipelines on Azure"
      ],
      technologies: ["Azure Services", "SQL", "Python", "PySpark", "Spark SQL", "ADLS", "JMF"],
      metrics: {
        performance: "40% efficiency gain",
        scale: "100GB+ daily",
        optimization: "35% faster processing"
      }
    },
    {
      title: "Database Migration Solutions",
      description: "Large-scale database migration project implementing Medallion architecture for data quality and consistency across Bronze, Silver, and Gold layers.",
      icon: <Cloud className="w-8 h-8" />,
      achievements: [
        "Seamless data integration from SQL Server to Azure storage",
        "Implemented Medallion architecture for data quality assurance",
        "Leveraged Delta Lake for ACID transactions and efficient retrieval",
        "Complex data transformations using Databricks"
      ],
      technologies: ["Azure Data Factory", "Azure Databricks", "SQL", "PySpark", "Delta Lake", "Medallion Architecture"],
      metrics: {
        architecture: "3-layer Medallion",
        reliability: "ACID compliance",
        integration: "Multi-source data"
      }
    },
    {
      title: "Performance Optimization Initiative",
      description: "Comprehensive performance enhancement project focusing on query optimization, pipeline efficiency, and automated deployment processes.",
      icon: <TrendingUp className="w-8 h-8" />,
      achievements: [
        "Reduced data transfer time by 50% through pipeline optimization",
        "Enhanced query performance with 30% faster execution",
        "Optimized Databricks notebooks for 40% runtime reduction",
        "Automated deployment processes for 15+ team members"
      ],
      technologies: ["Azure Data Factory", "Databricks", "SQL Optimization", "Python", "Automation"],
      metrics: {
        transfer: "50% faster transfers",
        queries: "30% query improvement",
        runtime: "40% runtime reduction"
      }
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-800">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            KEY <span className="text-cyan-400">PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Delivering measurable impact through innovative data engineering solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <Card key={index} className="bg-slate-900 border-slate-700 hover:border-cyan-400 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={i} className="bg-slate-800 rounded-lg p-3 border border-slate-600">
                          <div className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">
                            {key}
                          </div>
                          <div className="text-white font-bold">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key Achievements */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3">Key Achievements</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1 font-bold">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-white font-semibold text-lg mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
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

export default Projects;