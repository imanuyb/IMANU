import React, { useState } from 'react';
import { UserRole, Business } from '../types';
import { Check, X, Sparkles, Loader2, Copy } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import { Navigate } from 'react-router-dom';

interface AdminProps {
  userRole: UserRole;
  businesses: Business[];
  onToggleApproval: (id: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ userRole, businesses, onToggleApproval }) => {
  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMode, setAiMode] = useState<'thank_you' | 'project_update'>('thank_you');

  if (userRole !== UserRole.ADMIN) {
    return <Navigate to="/" />;
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setAiResult('');
    try {
      const result = await generateContent(aiPrompt, aiMode);
      setAiResult(result);
    } catch (e) {
      setAiResult("שגיאה ביצירת תוכן");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">מערכת ניהול - Back Office</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Business Approval Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">ניהול עסקים</h2>
              <p className="text-gray-500 text-sm">אישור והסרה של עסקים מהקטלוג</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">שם העסק</th>
                    <th className="p-4">קטגוריה</th>
                    <th className="p-4">סטטוס</th>
                    <th className="p-4">פעולות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {businesses.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium">{b.name}</td>
                      <td className="p-4 text-gray-600">{b.category}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {b.isApproved ? 'מאושר' : 'ממתין'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => onToggleApproval(b.id)}
                          className={`p-2 rounded-full transition ${b.isApproved ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                        >
                          {b.isApproved ? <X size={18} /> : <Check size={18} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Content Assistant */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={20} className="text-yellow-300" />
                <h2 className="text-xl font-bold">עוזר כתיבה חכם (AI)</h2>
              </div>
              <p className="text-blue-100 text-sm">היעזר בבינה מלאכותית לכתיבת תכנים</p>
            </div>
            
            <div className="p-6 flex-1 flex flex-col overflow-y-auto">
              <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setAiMode('thank_you')}
                  className={`flex-1 py-1.5 text-sm rounded-md transition ${aiMode === 'thank_you' ? 'bg-white shadow text-primary font-medium' : 'text-gray-500'}`}
                >
                  מכתב תודה
                </button>
                <button 
                  onClick={() => setAiMode('project_update')}
                  className={`flex-1 py-1.5 text-sm rounded-md transition ${aiMode === 'project_update' ? 'bg-white shadow text-primary font-medium' : 'text-gray-500'}`}
                >
                  פוסט עדכון
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {aiMode === 'thank_you' ? 'פרטי התורם / נושא:' : 'פרטי הפרויקט / עדכון:'}
                </label>
                <textarea 
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-32"
                  placeholder={aiMode === 'thank_you' ? "לדוגמה: תודה למשפחת כהן על תרומה של 500 שח..." : "לדוגמה: סיימנו את השיפוץ במועדונית, הילדים התרגשו..."}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                ></textarea>
              </div>

              <button 
                onClick={handleAiGenerate}
                disabled={!aiPrompt || isGenerating}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mb-6"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isGenerating ? 'מייצר תוכן...' : 'צור תוכן'}
              </button>

              {aiResult && (
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 relative flex-1">
                  <button 
                    onClick={() => navigator.clipboard.writeText(aiResult)}
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-600 p-1 bg-white rounded shadow-sm"
                    title="העתק"
                  >
                    <Copy size={14} />
                  </button>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed h-full overflow-y-auto">
                    {aiResult}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};