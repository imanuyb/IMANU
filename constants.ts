import { Business, Project, DonationStat } from './types';

export const BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'קפה השכונה',
    category: 'מזון ומשקאות',
    discount: '15%',
    description: 'קפה איכותי ומאפים טריים כל בוקר. הטבה לקפה ומאפה.',
    phone: '050-1234567',
    address: 'רחוב הרצל 15, תל אביב',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    isApproved: true,
  },
  {
    id: '2',
    name: 'ספורט פלוס',
    category: 'פנאי וספורט',
    discount: '10%',
    description: 'חנות ציוד ספורט מקצועית. הנחה על כל מחלקת הריצה.',
    phone: '03-9876543',
    address: 'קניון הזהב, ראשון לציון',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    isApproved: true,
  },
  {
    id: '3',
    name: 'דפוס מהיר',
    category: 'שירותים',
    discount: '20%',
    description: 'שירותי דפוס דיגיטלי, כרטיסי ביקור ופליירים.',
    phone: '052-5555555',
    address: 'אזור תעשייה חולון',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    isApproved: true,
  },
  {
    id: '4',
    name: 'צעצועי הלב',
    category: 'ילדים',
    discount: '12%',
    description: 'חנות צעצועים חינוכיים ומשחקי חשיבה.',
    phone: '09-1231234',
    address: 'רחוב אחוזה 100, רעננה',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    isApproved: false, // Pending approval
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'חלוקת סלי מזון לחג',
    description: 'פרויקט הדגל שלנו לקראת החגים, דואגים שאף משפחה לא תישאר רעבה.',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    raised: 45000,
    goal: 60000,
  },
  {
    id: 'p2',
    title: 'שיפוץ מועדונית הנוער',
    description: 'יצירת מרחב בטוח ומזמין לנוער בסיכון בשכונות הדרום.',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    raised: 12000,
    goal: 30000,
  },
];

export const DONATION_STATS: DonationStat[] = [
  { name: 'סלי מזון', value: 400, color: '#2563EB' },
  { name: 'פעילות נוער', value: 300, color: '#F97316' },
  { name: 'תפעול', value: 100, color: '#10B981' },
  { name: 'מלגות', value: 200, color: '#8B5CF6' },
];

export const CATEGORIES = ['הכל', 'מזון ומשקאות', 'פנאי וספורט', 'שירותים', 'ילדים', 'בריאות'];