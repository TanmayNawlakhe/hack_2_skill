import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle, Globe, Languages, Scale, Shield,Lock, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface SignupPageProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1629] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-3xl sm:text-6xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                DocuLex AI
              </h4>
            </div>
            <Badge className="bg-gray-800/60 text-blue-100 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-blue-300" />
              AI-Powered Legal Intelligence
            </Badge>
          </motion.div>

        {/* Signup Card */}
        <div className="bg-[#1a1f3a]/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white text-xl mb-6 text-center">Create Your Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-[#0f1629] border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-[#0f1629] border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0f1629] border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0f1629] border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded border-gray-700" required />
              <label className="text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white h-11"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-400 hover:text-blue-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
                <motion.div 
            className="flex items-center justify-center gap-4 mt-12 text-gray-400 text-sm flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-gray-800/40 px-3 py-1.5 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/40 px-3 py-1.5 rounded-full">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>10,000+ professionals</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/40 px-3 py-1.5 rounded-full">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/40 px-3 py-1.5 rounded-full">
              <Languages className="w-4 h-4 text-amber-400" />
              <span>Multi-Lingual Support</span>
            </div>
          </motion.div>
      </div>
    </div>
  );
}
