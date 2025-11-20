import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, FileText, Sparkles, Menu, X, TrendingUp, LineChart, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: "Macro Dashboard",
      description: "Track and analyze key economic indicators with interactive charts and real-time data visualization.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      title: "10-K Analyzer",
      description: "Deep dive into SEC filings with automated financial ratio analysis and comprehensive metrics.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get intelligent analysis combining macro trends and company fundamentals with AI-generated reports.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { label: "Economic Indicators", value: "50+", icon: TrendingUp },
    { label: "Company Filings", value: "1000+", icon: FileText },
    { label: "AI Analysis", value: "Real-time", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <LineChart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Insight Terminal
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-slate-100 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-400 hover:text-slate-100 transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-slate-400 hover:text-slate-100 transition-colors">
                About
              </a>
              <Link to="/macro">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                  Launch App
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-400 hover:text-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-slate-800">
              <a
                href="#features"
                className="block text-slate-400 hover:text-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-slate-400 hover:text-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#about"
                className="block text-slate-400 hover:text-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <Link to="/macro" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                  Launch App
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Hero Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 mb-6">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span>AI-Powered Financial Analysis</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-slate-100">Financial Intelligence,</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>

              <p className="mt-6 text-lg text-slate-400 max-w-2xl sm:mx-auto lg:mx-0">
                Analyze macroeconomic indicators, dive deep into company filings, and generate AI-powered insights—all in one powerful platform.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link to="/macro">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/30"
                  >
                    Get Started
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-100"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                        <Icon className="h-4 w-4 text-blue-400" />
                        <span className="text-2xl font-bold text-slate-100">{stat.value}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div className="relative">
                {/* Mock Terminal Window */}
                <Card className="bg-slate-800 border-slate-700 overflow-hidden shadow-2xl">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-slate-400 ml-2">Insight Terminal</span>
                  </div>

                  {/* Mock Chart */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-slate-400">S&P 500</p>
                        <p className="text-2xl font-bold text-slate-100">4,783.45</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">+2.34%</span>
                      </div>
                    </div>

                    {/* Simple SVG Chart */}
                    <div className="h-48 bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <svg viewBox="0 0 400 150" className="w-full h-full">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1="0"
                            y1={i * 37.5}
                            x2="400"
                            y2={i * 37.5}
                            stroke="#334155"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        ))}
                        {/* Chart area */}
                        <path
                          d="M 0,120 L 50,100 L 100,80 L 150,90 L 200,60 L 250,70 L 300,40 L 350,30 L 400,20 L 400,150 L 0,150 Z"
                          fill="url(#chartGradient)"
                        />
                        {/* Chart line */}
                        <path
                          d="M 0,120 L 50,100 L 100,80 L 150,90 L 200,60 L 250,70 L 300,40 L 350,30 L 400,20"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Mock indicators */}
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        SPX
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        BTC
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-slate-700/50 text-slate-400 border border-slate-600">
                        +2 more
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">
              Everything you need for financial analysis
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed for investors, analysts, and financial professionals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="bg-slate-800 border-slate-700 p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Start analyzing in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Select Your Data",
                description: "Choose from 50+ economic indicators or upload company filings",
                icon: PieChart,
              },
              {
                step: "02",
                title: "Visualize & Analyze",
                description: "Interactive charts with multiple normalization options and time ranges",
                icon: LineChart,
              },
              {
                step: "03",
                title: "Generate Insights",
                description: "AI-powered analysis combining all your selected data points",
                icon: Sparkles,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-400">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Join professionals using Insight Terminal for smarter financial decisions
          </p>
          <Link to="/macro">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/30"
            >
              Launch Insight Terminal
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <LineChart className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Insight Terminal
              </span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 Insight Terminal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
