"use client"
// import { Button } from "@/components/ui/button";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { useEffect } from "react";
// import { api } from "../../convex/_generated/api";


// export default function Home() {
// const {user} = useUser()
// const createUser = useMutation(api.user.createUser)
// useEffect(()=>{
//   user&&CheckUser()
// },[user])
// const CheckUser=async()=>{
//   const result = await createUser({
//     email:user?.primaryEmailAddress?.emailAddress,
//     imageUrl:user?.imageUrl,
//     userName:user?.fullName
//   })
// }
//   return (
//    <div >
    
//     <Button>heroshima-nagasaki</Button>
//     <UserButton></UserButton>

//    </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import { Brain, FileText, Zap, Shield, ArrowRight, Menu, X, Star, Users, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Transform your notes into actionable insights with advanced AI that understands context and meaning."
    },
    {
      icon: Zap,
      title: "Smart Organization",
      description: "Automatically categorize and tag your notes. Never lose an important thought again."
    },
    {
      icon: FileText,
      title: "Intelligent Search",
      description: "Find exactly what you need with semantic search that understands what you mean, not just what you type."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your notes are encrypted end-to-end. Your thoughts remain private and secure."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "This app revolutionized how I capture and organize my thoughts. The AI insights are incredible.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Research Scientist",
      content: "Finally, a note-taking app that thinks like I do. The smart connections save me hours every week.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Writer",
      content: "The AI suggestions help me connect ideas I never would have thought of. It's like having a writing partner.",
      rating: 5
    }
  ];

  const stats = [
    { number: "1M+", label: "Notes Created" },
    { number: "50k+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold">SailorNotes</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                Make Notes
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
      
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Think Smarter with AI Notes
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              TA smart note-making platform that combines your notes with AI retrieval to give you answers, context, and clarity on demand .</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             {<Link href="/dashboard"> <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
                <span>Start Making Notes</span>
                <ArrowRight className="w-5 h-5" />
              </button></Link>}
              <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-gray-900">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by <span className="text-purple-400">Artificial Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of note-taking with features designed to amplify your thinking and creativity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-800 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

    

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold">SailorNotes</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering minds with AI-driven note-taking and intelligent insights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
                <div>API</div>
              </div>
            </div>

            
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SailorNotes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;