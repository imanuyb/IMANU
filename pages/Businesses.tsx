import React, { useState } from 'react';
import { Search, MapPin, Tag, Lock, Send, CheckCircle, Heart } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { UserRole, Business } from '../types';

interface BusinessesProps {
  userRole: UserRole;
  businesses: Business[];
  onRegister: (business: Business) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const Businesses: React.FC<BusinessesProps> = ({ 
  userRole, 
  businesses, 
  onRegister,
  favoriteIds,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'register' | 'favorites'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  
  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[1],
    address: '',
    contactName: '',
    phone: '',
    discount: '',
    description: ''
  });

  const filteredBusinesses = businesses.filter(b => {
    // Basic Filters
    const matchesSearch = b.name.includes(searchTerm) || b.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'הכל' || b.category === selectedCategory;
    const isApproved = b.isApproved;
    
    // Tab Filter
    const matchesTab = activeTab === 'favorites' ? favoriteIds.includes(b.id) : true;

    return matchesSearch && matchesCategory && isApproved && matchesTab;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBusiness: Business = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      discount: formData.discount,
      description: formData.description,
      phone: formData.phone,
      address: formData.address,
      imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`,
      isApproved: false // Starts as pending
    };

    onRegister(newBusiness);
    setFormSubmitted(true);
    
    setTimeout(() => {
        setFormSubmitted(false);
        setActiveTab('catalog');
        setFormData({
            name: '',
            category: CATEGORIES[1],
            address: '',
            contactName: '',
            phone: '',
            discount: '',
            description: ''
        });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">עסקים וקהילה</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            מצאו הטבות בלעדיות בעסקים מקומיים התומכים בעמותה. חברי העמותה נהנים יותר!
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'catalog' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              קטלוג הטבות
            </button>
            {userRole !== UserRole.GUEST && (
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-2 rounded-full font-medium transition flex items-center gap-2 ${activeTab === 'favorites' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Heart size={16} className={activeTab === 'favorites' ? 'fill-current' : ''} />
                המועדפים שלי
              </button>
            )}
            <button 
              onClick={() => setActiveTab('register')}
              className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'register' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              רישום עסק חדש
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {activeTab === 'catalog' || activeTab === 'favorites' ? (
          <>
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/3">
                <input 
                  type="text" 
                  placeholder="חפש עסק או הטבה..." 
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>
              
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition ${selectedCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map(business => {
                const isFavorite = favoriteIds.includes(business.id);
                return (
                  <div key={business.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                        <Tag size={12} />
                        {business.category}
                      </div>

                      {/* Favorite Button */}
                      {userRole !== UserRole.GUEST && (
                        <button 
                          onClick={() => onToggleFavorite(business.id)}
                          className={`absolute top-3 left-3 p-2 rounded-full shadow-sm transition-all duration-300 ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-400'}`}
                          title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
                        >
                          <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                        </button>
                      )}
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{business.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{business.description}</p>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="text-primary" />
                          {business.address}
                        </div>
                        
                        {/* Member Only Area */}
                        <div className={`rounded-lg p-3 ${userRole !== UserRole.GUEST ? 'bg-orange-50 border border-orange-100' : 'bg-gray-100 relative overflow-hidden'}`}>
                          {userRole !== UserRole.GUEST ? (
                            <div className="text-center">
                              <span className="block text-xs text-orange-600 font-semibold mb-1">הטבה לחברים:</span>
                              <span className="text-xl font-bold text-gray-900">{business.discount}</span>
                              <div className="text-xs text-gray-500 mt-1">בהצגת כרטיס חבר</div>
                            </div>
                          ) : (
                            <div className="text-center py-2 filter blur-[2px] select-none opacity-50">
                              <span className="block text-xs font-semibold mb-1">הטבה לחברים:</span>
                              <span className="text-xl font-bold">20% הנחה</span>
                            </div>
                          )}
                          
                          {userRole === UserRole.GUEST && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-[1px]">
                              <div className="text-center">
                                <Lock className="mx-auto h-5 w-5 text-gray-500 mb-1" />
                                <span className="text-xs font-medium text-gray-600">לחברים בלבד</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <Heart className={`mx-auto h-12 w-12 mb-4 ${activeTab === 'favorites' ? 'text-red-200' : 'text-gray-300'}`} />
                <h3 className="text-xl font-medium text-gray-900">
                  {activeTab === 'favorites' ? 'עדיין אין לך עסקים מועדפים' : 'לא נמצאו עסקים העונים לחיפוש'}
                </h3>
                {activeTab === 'favorites' && (
                  <p className="text-gray-500 mt-2">
                    חזור לקטלוג ולחץ על הלב כדי לשמור עסקים שאהבת.
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          /* Registration Form */
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
            {formSubmitted ? (
               <div className="text-center py-10">
                 <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">הבקשה התקבלה בהצלחה!</h3>
                 <p className="text-gray-600">צוות העמותה יבדוק את הפרטים ויצור איתך קשר בהקדם.</p>
               </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">הצטרף למעגל העסקים החברתיים</h2>
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">שם העסק</label>
                      <input 
                        required name="name" type="text" 
                        value={formData.name} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                      <select 
                        name="category"
                        value={formData.category} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {CATEGORIES.filter(c => c !== 'הכל').map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">כתובת העסק</label>
                    <input 
                        required name="address" type="text"
                        value={formData.address} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">איש קשר</label>
                      <input 
                        required name="contactName" type="text"
                        value={formData.contactName} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                       />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                      <input 
                        required name="phone" type="tel"
                        value={formData.phone} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">הטבה מוצעת (לדוגמה: 15% הנחה)</label>
                    <input 
                        required name="discount" type="text"
                        value={formData.discount} onChange={handleInputChange}
                        placeholder="15%"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תיאור העסק וההטבה</label>
                    <textarea 
                        required name="description" rows={3}
                        value={formData.description} onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Send size={18} />
                    שלח בקשה להצטרפות
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};