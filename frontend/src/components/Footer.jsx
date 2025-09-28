import React from 'react';
import { Linkedin, Github, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/nikhil-n-jadhav07/",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: <Github size={20} />,
      href: "https://github.com/nikhil-jadhav123",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:jadhavnikhil088@gmail.com",
      label: "Email",
      color: "hover:text-cyan-400"
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">
                NIKHIL <span className="text-cyan-400">JADHAV</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Data Engineer specializing in Azure cloud technologies, ETL processes, and big data solutions. Turning complex data challenges into streamlined, efficient solutions.
              </p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-slate-800 p-3 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a 
                  href="mailto:jadhavnikhil088@gmail.com"
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  jadhavnikhil088@gmail.com
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <a 
                  href="tel:+917899502927"
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  +91 7899502927
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white">Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Nikhil Jadhav. Made with <Heart className="inline w-4 h-4 text-red-500" /> and lots of coffee.
            </p>
            
            <button
              onClick={scrollToTop}
              className="bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-cyan-400 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;