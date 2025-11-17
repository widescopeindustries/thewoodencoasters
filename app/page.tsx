import Link from 'next/link';
import { Wrench, Brain, BookOpen, CheckCircle, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-gray-900 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 tracking-wide uppercase mb-4">
                <Wrench className="w-4 h-4" />
                AI-Powered Automotive Diagnostics
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Your Personal Auto Mechanic,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"> Powered by AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Democratizing automotive knowledge with AI assistance backed by 50,000+ repair manuals from Operation CHARM.
              Get expert diagnosis help for your vehicle issues in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnosis"
                className="group bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-amber-900/50 flex items-center justify-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Start Diagnosis
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="#how-it-works"
                className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-amber-600/10 rounded-full">
                  <Brain className="text-amber-400 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI guides you through systematic diagnosis, asking the right questions to pinpoint issues
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-amber-600/10 rounded-full">
                  <BookOpen className="text-amber-400 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">50,000+ Repair Manuals</h3>
              <p className="text-gray-400 leading-relaxed">
                Backed by Operation CHARM database covering vehicles from 1982-2013 across 40+ brands
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-amber-600/10 rounded-full">
                  <Zap className="text-amber-400 w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Guidance</h3>
              <p className="text-gray-400 leading-relaxed">
                Get real-time help with step-by-step diagnosis and repair recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900/50 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Four simple steps to diagnose your vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <Wrench className="w-12 h-12 text-amber-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Select Vehicle</h3>
                <p className="text-gray-400">
                  Choose your vehicle year, make, and model from our comprehensive database
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <BookOpen className="w-12 h-12 text-amber-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Describe Symptoms</h3>
                <p className="text-gray-400">
                  Tell us what issues you are experiencing in plain language
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <Brain className="w-12 h-12 text-amber-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold text-white mb-3">AI Diagnosis</h3>
                <p className="text-gray-400">
                  Interactive chat session with AI asking clarifying questions to narrow down the issue
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <CheckCircle className="w-12 h-12 text-amber-400 mb-4 mt-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Get Solutions</h3>
                <p className="text-gray-400">
                  Receive repair recommendations, parts needed, and links to relevant manuals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Use AI Auto Mechanic?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Save Money</h3>
                    <p className="text-gray-400">
                      Diagnose issues yourself before paying for expensive shop diagnostics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Learn As You Go</h3>
                    <p className="text-gray-400">
                      Understand how your vehicle works and become more automotive-savvy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Expert Knowledge</h3>
                    <p className="text-gray-400">
                      Access professional-grade repair information previously only available to mechanics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Safety First</h3>
                    <p className="text-gray-400">
                      AI warns you about safety risks and recommends professional help when needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-lg p-8 border border-amber-600/30">
                <h3 className="text-2xl font-bold text-white mb-4">Powered by Operation CHARM</h3>
                <p className="text-gray-300 mb-4">
                  Our AI leverages the massive Operation CHARM database - a collection of over 50,000 high-quality OEM repair manuals covering nearly every vehicle from 1982 to 2013.
                </p>
                <p className="text-gray-400 text-sm">
                  Includes brands: Audi, BMW, Chevrolet, Dodge, Ford, Honda, Toyota, Volkswagen, and 30+ more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Diagnose Your Vehicle?
          </h2>
          <p className="text-xl text-amber-50 mb-10 leading-relaxed">
            Join thousands of DIY mechanics and car enthusiasts democratizing automotive knowledge
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 bg-white text-amber-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
          >
            <Brain className="w-6 h-6" />
            Start Your Free Diagnosis
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
