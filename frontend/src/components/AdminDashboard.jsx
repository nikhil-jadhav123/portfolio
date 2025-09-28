import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Eye, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  LogOut,
  Lock,
  Loader2
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      
      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        onLogin(response.data.access_token);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <p className="text-gray-400">Enter admin password to access dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API}/admin/analytics`, axiosConfig);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/admin/contact-messages?limit=10`, axiosConfig);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`${API}/admin/contact-messages/${messageId}/read`, {}, axiosConfig);
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      // Refresh analytics
      fetchAnalytics();
      toast({
        title: "Message marked as read",
        description: "Message status updated successfully."
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      Promise.all([fetchAnalytics(), fetchMessages()])
        .finally(() => setIsLoading(false));
    }
  }, [token]);

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Portfolio management and analytics</p>
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Page Views</p>
                    <p className="text-2xl font-bold text-white">{analytics.page_views}</p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Messages</p>
                    <p className="text-2xl font-bold text-white">{analytics.total_messages}</p>
                  </div>
                  <div className="bg-green-500 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Unread Messages</p>
                    <p className="text-2xl font-bold text-white">{analytics.unread_messages}</p>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Last Contact</p>
                    <p className="text-sm font-semibold text-white">
                      {analytics.last_contact 
                        ? new Date(analytics.last_contact).toLocaleDateString()
                        : 'No contacts'
                      }
                    </p>
                  </div>
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Messages */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 rounded-lg border transition-all ${
                      message.read 
                        ? 'bg-slate-700 border-slate-600' 
                        : 'bg-slate-600 border-cyan-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">{message.name}</h4>
                          {!message.read && (
                            <Badge className="bg-cyan-500 text-white text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{message.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                        {!message.read && (
                          <Button 
                            size="sm"
                            onClick={() => markAsRead(message.id)}
                            className="bg-cyan-500 hover:bg-cyan-400 text-white"
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-cyan-400 font-medium text-sm">Subject: {message.subject}</p>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;