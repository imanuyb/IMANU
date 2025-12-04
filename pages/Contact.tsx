import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">צור קשר</h1>
          <p className="text-gray-600">אנחנו כאן לכל שאלה, הצעה או רעיון.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">פרטי התקשרות</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">כתובת</h3>
                  <p className="text-gray-600">רחוב הקהילה 1, תל אביב</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">טלפון</h3>
                  <p className="text-gray-600">03-1234567</p>
                  <p className="text-gray-500 text-sm">א-ה 09:00-17:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">דוא"ל</h3>
                  <p className="text-gray-600">contact@lev-hakehila.org.il</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t pt-8">
              <h3 className="font-bold text-gray-900 mb-4">עקבו אחרינו</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 hover:text-blue-600 transition"><Facebook size={20}/></a>
                <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-pink-100 hover:text-pink-600 transition"><Instagram size={20}/></a>
                <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 hover:text-blue-400 transition"><Twitter size={20}/></a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">שלח הודעה</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="ישראל ישראלי" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="your@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">נושא הפנייה</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none">
                  <option>התנדבות</option>
                  <option>עסקים ושת"פ</option>
                  <option>תרומות</option>
                  <option>אחר</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">הודעה</label>
                <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="תוכן ההודעה..."></textarea>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                שלח הודעה
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};