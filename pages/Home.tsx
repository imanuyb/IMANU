import React from 'react';
import { ArrowLeft, Users, Heart, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?random=100')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            מחזקים את הקהילה,<br/>בונים עתיד משותף
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mb-10">
            עמותת "לב הקהילה" פועלת למען צמצום פערים חברתיים, תמיכה במשפחות נזקקות וקידום עסקים מקומיים. הצטרפו אלינו לעשייה.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/donate" className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg flex items-center justify-center gap-2">
              <Heart className="fill-current" size={20} />
              תרום עכשיו
            </Link>
            <Link to="/businesses" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition shadow-lg flex items-center justify-center gap-2">
              <Gift size={20} />
              הטבות לחברים
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">משפחות שקיבלו סיוע</p>
            </div>
            <div className="p-6 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">120+</h3>
              <p className="text-gray-600">עסקים שותפים בקהילה</p>
            </div>
            <div className="p-6 bg-emerald-50 rounded-2xl">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">₪2.5M</h3>
              <p className="text-gray-600">גויסו למען הקהילה</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Mission Snippet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="https://picsum.photos/800/600?random=20" 
                alt="Volunteers" 
                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">למה אנחנו כאן?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                החזון שלנו הוא ליצור חברה סולידרית שבה כל אחד ערב לשני. אנו מחברים בין עסקים מקומיים לתושבים, 
                מעודדים צריכה מקומית ומשתמשים בכוח הקהילה כדי לעזור לחלשים.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>שקיפות מלאה בכל פעילות</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>100% מהתרומות מגיעות ליעדן</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>פעילות התנדבותית ענפה</span>
                </li>
              </ul>
              <Link to="/about" className="text-primary font-bold hover:text-blue-700 inline-flex items-center gap-2">
                קרא עוד עלינו
                <ArrowLeft size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};