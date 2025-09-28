import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: "Microsoft Certified: Azure Data Engineer Associate",
      code: "DP-203",
      issuer: "Microsoft",
      description: "Comprehensive certification covering Azure data services, data processing, and analytics solutions.",
      skills: ["Azure Data Factory", "Azure Synapse Analytics", "Azure Databricks", "Data Lake Storage"],
      color: "from-blue-500 to-blue-600",
      verified: true
    },
    {
      title: "Databricks Certified Data Engineer Associate",
      code: "DCEA",
      issuer: "Databricks",
      description: "Professional certification validating expertise in building data pipelines and analytics solutions on Databricks platform.",
      skills: ["Apache Spark", "Delta Lake", "Data Pipeline Architecture", "ETL Development"],
      color: "from-orange-500 to-red-500",
      verified: true
    },
    {
      title: "Microsoft Azure Fundamentals",
      code: "AZ-900",
      issuer: "Microsoft",
      description: "Foundation-level certification demonstrating understanding of Azure cloud services and concepts.",
      skills: ["Cloud Computing", "Azure Services", "Security", "Compliance"],
      color: "from-cyan-500 to-blue-500",
      verified: true
    }
  ];

  const achievements = [
    {
      title: "Capgemini Shining Star Award",
      description: "Recognized for exceptional performance and outstanding contribution to project success",
      year: "2024",
      type: "Performance Excellence"
    },
    {
      title: "Client Excellence Recognition",
      description: "Acknowledged for building strong client relationships and exceeding project expectations",
      year: "2023",
      type: "Client Success"
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">CERTIFICATIONS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Professional certifications validating expertise in data engineering and cloud technologies
          </p>
        </div>
        
        {/* Certifications */}
        <div className="grid lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="card-premium group animate-fadeInScale" style={{animationDelay: `${index * 0.2}s`}}>
              <CardHeader className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <Award className="w-10 h-10 text-white animate-pulse-premium" />
                </div>
                <CardTitle className="text-white text-xl mb-3 group-hover:text-premium-gradient">
                  {cert.title}
                </CardTitle>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                    {cert.code}
                  </Badge>
                  {cert.verified && (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle size={18} className="animate-pulse" />
                      <span className="text-sm font-semibold">Verified</span>
                    </div>
                  )}
                </div>
                <p className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold text-lg">{cert.issuer}</p>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-300 mb-6 leading-relaxed text-base">
                  {cert.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Key Skills Covered</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {cert.skills.map((skill, i) => (
                      <Badge key={i} className="bg-gradient-to-r from-slate-700 to-slate-600 text-gray-200 text-xs px-3 py-1 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 cursor-default">
                        {skill}
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

export default Certifications;