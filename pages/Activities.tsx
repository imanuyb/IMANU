import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Activities: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">הפעילות שלנו</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מגוון פרויקטים חברתיים שנועדו לחזק את הקהילה ולעזור לחלשים ביותר.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PROJECTS.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100">
              <div className="h-64 overflow-hidden">
                 <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-1 text-lg leading-relaxed">{project.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-primary">גויסו: ₪{project.raised.toLocaleString()}</span>
                    <span className="text-gray-500">יעד: ₪{project.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <Link 
                  to="/donate" 
                  className="w-full block text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                >
                  תרום לפרויקט זה
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action for Volunteering */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
           <div className="md:w-2/3">
             <h2 className="text-3xl font-bold mb-4">רוצה לקחת חלק פעיל?</h2>
             <p className="text-orange-100 text-lg">
               אנחנו תמיד מחפשים מתנדבים חדשים שיעזרו לנו באריזת סלי מזון, חונכות לנוער ושינוע ציוד.
               בואו להיות חלק מהשינוי.
             </p>
           </div>
           <Link to="/contact" className="bg-white text-secondary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition whitespace-nowrap flex items-center gap-2">
             הצטרף כמתנדב
             <ArrowLeft size={20} />
           </Link>
        </div>
      </div>
    </div>
  );
};