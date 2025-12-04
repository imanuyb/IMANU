import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Businesses } from './pages/Businesses';
import { Donate } from './pages/Donate';
import { Activities } from './pages/Activities';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { UserRole, Business } from './types';
import { BUSINESSES } from './constants';

// Simple About Page Component Inline
const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6">אודות העמותה</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          עמותת "לב הקהילה" הוקמה בשנת 2015 במטרה לחזק את החוסן החברתי בשכונות הפריפריה החברתית והגיאוגרפית.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          אנו מאמינים כי קהילה חזקה נמדדת ביכולת שלה לדאוג לחלשים בתוכה. המודל שלנו ייחודי בכך שהוא מחבר בין בעלי עסקים מקומיים לבין הקהילה, ויוצר מעגל של נתינה הדדית.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <img src="https://picsum.photos/100/100?random=50" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt="מנכלית"/>
            <h3 className="font-bold">שרה לוי</h3>
            <p className="text-sm text-gray-500">מנכ"לית ומייסדת</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <img src="https://picsum.photos/100/100?random=51" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt="רכז מתנדבים"/>
            <h3 className="font-bold">דוד כהן</h3>
            <p className="text-sm text-gray-500">רכז מתנדבים ארצי</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <img src="https://picsum.photos/100/100?random=52" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt="מנהלת קשרי עסקים"/>
            <h3 className="font-bold">מיכל אברהם</h3>
            <p className="text-sm text-gray-500">מנהלת קשרי עסקים</p>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-bold text-xl mb-4">לב הקהילה</h3>
        <p className="text-gray-400 text-sm">עמותה רשומה 580123456</p>
        <p className="text-gray-400 text-sm mt-2">כל הזכויות שמורות © 2024</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">קישורים מהירים</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">אודות</a></li>
          <li><a href="#" className="hover:text-white">תרומות</a></li>
          <li><a href="#" className="hover:text-white">תקנון</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">יצירת קשר</h4>
        <p className="text-gray-400 text-sm">contact@lev.org.il</p>
        <p className="text-gray-400 text-sm">03-1234567</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">הצטרפו לניוזלטר</h4>
        <div className="flex">
          <input type="email" placeholder="המייל שלך..." className="bg-gray-800 text-white px-4 py-2 rounded-r-lg outline-none w-full text-sm" />
          <button className="bg-primary px-4 py-2 rounded-l-lg font-bold text-sm">הרשמה</button>
        </div>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [businesses, setBusinesses] = useState<Business[]>(BUSINESSES);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const handleRegisterBusiness = (newBusiness: Business) => {
    setBusinesses(prev => [...prev, newBusiness]);
  };

  const handleToggleApproval = (id: string) => {
    setBusinesses(prev => prev.map(b => 
      b.id === id ? { ...b, isApproved: !b.isApproved } : b
    ));
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route 
              path="/businesses" 
              element={
                <Businesses 
                  userRole={userRole} 
                  businesses={businesses} 
                  onRegister={handleRegisterBusiness} 
                  favoriteIds={favoriteIds}
                  onToggleFavorite={handleToggleFavorite}
                />
              } 
            />
            <Route path="/donate" element={<Donate />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  userRole={userRole} 
                  businesses={businesses} 
                  onToggleApproval={handleToggleApproval}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;