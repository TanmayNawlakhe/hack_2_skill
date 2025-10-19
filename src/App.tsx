import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { MainApp } from './components/MainApp';

type View = 'login' | 'signup' | 'app';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('app');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentView('app');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onSwitchToSignup={() => setCurrentView('signup')} 
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupPage 
        onSignup={handleSignup} 
        onSwitchToLogin={() => setCurrentView('login')} 
      />
    );
  }

  return <MainApp onLogout={handleLogout} />;
}
