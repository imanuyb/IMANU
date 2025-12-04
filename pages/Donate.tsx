import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DONATION_STATS } from '../constants';
import { ShieldCheck, CreditCard, Gift, RotateCw } from 'lucide-react';

export const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [isMonthly, setIsMonthly] = useState(false);

  const predefinedAmounts = [50, 100, 200, 500];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Donation Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-secondary">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">תרומה לקהילה</h1>
            <p className="text-gray-600 mb-8">כל תרומה עוזרת לנו להגיע לעוד משפחה ולחזק את החוסן החברתי.</p>

            <div className="flex gap-4 mb-8 bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setIsMonthly(false)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${!isMonthly ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                תרומה חד פעמית
              </button>
              <button 
                onClick={() => setIsMonthly(true)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${isMonthly ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                תרומה חודשית
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {predefinedAmounts.map((val) => (
                <button 
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-3 border rounded-xl font-bold text-lg transition ${amount === val ? 'border-secondary bg-orange-50 text-secondary' : 'border-gray-200 hover:border-secondary text-gray-700'}`}
                >
                  ₪{val}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">סכום אחר</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="הכנס סכום לתרומה"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-lg"
                />
                <span className="absolute right-4 top-3.5 text-gray-500 font-bold">₪</span>
              </div>
            </div>

            <button className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2">
               {isMonthly ? <RotateCw size={24} /> : <CreditCard size={24} />}
               {isMonthly ? 'הקמת הוראת קבע' : 'המשך לתשלום מאובטח'}
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <ShieldCheck size={16} className="text-green-500" />
              <span>תשלום מאובטח בתקן PCI-DSS</span>
            </div>
          </div>

          {/* Right Column: Transparency & Impact */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">שקיפות זה אנחנו</h2>
               <p className="text-gray-600 mb-6">
                 אנו מתחייבים לשקיפות מלאה. הנה התפלגות השימוש בכספי התרומות לשנת 2024:
               </p>
               
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={DONATION_STATS}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {DONATION_STATS.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip />
                     <Legend verticalAlign="bottom" height={36} iconType="circle" />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-md flex items-center gap-6">
               <div className="bg-white/20 p-4 rounded-full">
                  <Gift size={32} />
               </div>
               <div>
                 <h3 className="text-xl font-bold mb-2">מוכר לצרכי מס</h3>
                 <p className="text-blue-100 text-sm">
                   כל תרומה מעל 190 ₪ מוכרת לצרכי מס לפי סעיף 46 לפקודה. קבלה תשלח אוטומטית למייל.
                 </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};