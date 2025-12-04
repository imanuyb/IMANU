import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, User, LogIn } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userRole, setUserRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary';

  const navLinks = [
    { path: '/', label: 'בית' },
    { path: '/about', label: 'אודות' },
    { path: '/activities', label: 'פעילות' },
    { path: '/businesses', label: 'עסקים והטבות' },
    { path: '/donate', label: 'תרומות' },
    { path: '/contact', label: 'צור קשר' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-primary p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">לב הקהילה</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-reverse space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`${isActive(link.path)} transition-colors px-2`}>
                {link.label}
              </Link>
            ))}
            
            {/* Role Switcher for Demo */}
            <div className="relative group mr-4">
              <button className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                <User size={16} />
                <span>{userRole === UserRole.ADMIN ? 'מנהל' : userRole === UserRole.MEMBER ? 'חבר' : 'אורח'}</span>
              </button>
              <div className="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg hidden group-hover:block border border-gray-100">
                <button onClick={() => setUserRole(UserRole.GUEST)} className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50">אורח</button>
                <button onClick={() => setUserRole(UserRole.MEMBER)} className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50">חבר עמותה</button>
                <button onClick={() => setUserRole(UserRole.ADMIN)} className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50">מנהל</button>
              </div>
            </div>

            {userRole === UserRole.ADMIN && (
               <Link to="/admin" className="text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition">
                 ניהול
               </Link>
            )}

            <Link to="/donate" className="bg-secondary hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold transition shadow-lg transform hover:scale-105">
              תרום עכשיו
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <Link to="/donate" className="bg-secondary text-white text-sm px-3 py-1 rounded-full font-bold">
               תרום
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
             <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 ${userRole !== UserRole.ADMIN ? 'hidden' : ''}`}
              >
                ממשק ניהול
              </Link>
          </div>
          <div className="border-t border-gray-200 pt-4 pb-4 px-4">
             <p className="text-sm text-gray-500 mb-2">מצב צפייה (דמו):</p>
             <div className="flex gap-2">
                <button onClick={() => setUserRole(UserRole.GUEST)} className={`px-3 py-1 text-sm rounded-full ${userRole === UserRole.GUEST ? 'bg-primary text-white' : 'bg-gray-200'}`}>אורח</button>
                <button onClick={() => setUserRole(UserRole.MEMBER)} className={`px-3 py-1 text-sm rounded-full ${userRole === UserRole.MEMBER ? 'bg-primary text-white' : 'bg-gray-200'}`}>חבר</button>
                <button onClick={() => setUserRole(UserRole.ADMIN)} className={`px-3 py-1 text-sm rounded-full ${userRole === UserRole.ADMIN ? 'bg-primary text-white' : 'bg-gray-200'}`}>מנהל</button>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};