export type PlotStatus = 'available' | 'sold' | 'reserved';

export interface Plot {
  id: string;
  name: string;
  project: string;
  location: string;
  city: string;
  area: number; // sq ft
  dimensions: string;
  pricePerSqft: number;
  totalPrice: number;
  status: PlotStatus;
  featured: boolean;
  rera: string;
  facing: string;
  category: 'residential' | 'commercial' | 'agricultural';
  amenities: string[];
  nearby: { label: string; distance: string }[];
  paymentPlans: { name: string; description: string }[];
  images: string[];
  mapEmbed?: string;
  description: string;
  highlights: string[];
}

export const plots: Plot[] = [
  {
    id: 'kashiPuram-001',
    name: 'Kashi Puram Green City – Plot A15',
    project: 'Kashi Puram Green City',
    location: 'Chopan-Sindhuriya Marg, Varanasi',
    city: 'Varanasi',
    area: 1350,
    dimensions: '27×50',
    pricePerSqft: 599,
    totalPrice: 808650,
    status: 'available',
    featured: true,
    rera: 'UP-RERA-REA-GND-2024-001',
    facing: 'East',
    category: 'residential',
    amenities: ['25 Ft Wide Road', 'Sewage System', 'Water Supply', 'Street Lights', 'Security'],
    nearby: [
      { label: 'Chopan Hospital', distance: '500 m' },
      { label: 'Varanasi-Shaktinagar Hwy', distance: '800 m' },
      { label: 'Obra Marg', distance: '100 m' },
      { label: 'Govt School', distance: '1.2 km' },
    ],
    paymentPlans: [
      { name: 'Easy Installment', description: '50% booking amount, balance in 24 months at ₹599/sqft' },
      { name: 'Full Payment', description: 'One-time payment with 3% additional discount' },
      { name: 'Bank Loan', description: 'Assistance with SBI & HDFC home loans available' },
    ],
    images: [
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Premium residential plot in the heart of Kashi Puram Green City. Situated on Chopan-Sindhuriya Marg, this plot offers peaceful surroundings with all modern civic amenities. Ideal for building your dream home in a clean, green environment close to Varanasi.',
    highlights: ['Clear Title', 'NA Order Obtained', '25 Ft Internal Roads', 'Borewell Water at 60 Ft'],
  },
  {
    id: 'kashiPuram-002',
    name: 'Kashi Puram Green City – Plot B22',
    project: 'Kashi Puram Green City',
    location: 'Chopan-Sindhuriya Marg, Varanasi',
    city: 'Varanasi',
    area: 1350,
    dimensions: '27×50',
    pricePerSqft: 599,
    totalPrice: 808650,
    status: 'reserved',
    featured: false,
    rera: 'UP-RERA-REA-GND-2024-001',
    facing: 'West',
    category: 'residential',
    amenities: ['25 Ft Wide Road', 'Sewage System', 'Water Supply', 'Street Lights'],
    nearby: [
      { label: 'Chopan Hospital', distance: '500 m' },
      { label: 'Varanasi-Shaktinagar Hwy', distance: '800 m' },
    ],
    paymentPlans: [
      { name: 'Easy Installment', description: '50% booking amount, balance in 24 months' },
      { name: 'Full Payment', description: 'One-time with 3% discount' },
    ],
    images: [
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'West-facing residential plot in Kashi Puram Green City with excellent connectivity to Varanasi-Shaktinagar highway.',
    highlights: ['Clear Title', '25 Ft Internal Roads', 'NA Order Obtained'],
  },
  {
    id: 'vinayakPuram-001',
    name: 'Vinayak Puram Colony – Plot 15',
    project: 'Vinayak Puram Society',
    location: 'Robertsganj, Sonbhadra',
    city: 'Sonbhadra',
    area: 1500,
    dimensions: '25×60',
    pricePerSqft: 699,
    totalPrice: 1048500,
    status: 'available',
    featured: true,
    rera: 'UP-RERA-REA-SNB-2024-012',
    facing: 'North',
    category: 'residential',
    amenities: ['20 Ft Wide Road', 'Street Lights', 'Govt Road Access', 'Clear Boundaries'],
    nearby: [
      { label: 'Sant Kanaram School', distance: '2 km' },
      { label: 'Aayush Hospital', distance: '1.5 km' },
      { label: 'FCI Godown', distance: '300 m' },
      { label: 'Main Road', distance: '50 m' },
    ],
    paymentPlans: [
      { name: 'Installment Plan', description: '50% booking, 24 months EMI at ₹699/sqft' },
      { name: 'Full Payment', description: 'Upfront payment with registry assistance' },
    ],
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Affordable residential plot in Vinayak Puram Colony, Sonbhadra. Government road access, wide internal streets, and proximity to essential services make this an ideal investment.',
    highlights: ['Govt Road Touch', 'Wide Internal Roads', 'Clear Title', 'EMI Available'],
  },
  {
    id: 'vinayakPuram-002',
    name: 'Vinayak Puram Colony – Plot 28',
    project: 'Vinayak Puram Society',
    location: 'Robertsganj, Sonbhadra',
    city: 'Sonbhadra',
    area: 1500,
    dimensions: '25×60',
    pricePerSqft: 699,
    totalPrice: 1048500,
    status: 'available',
    featured: false,
    rera: 'UP-RERA-REA-SNB-2024-012',
    facing: 'South',
    category: 'residential',
    amenities: ['20 Ft Wide Road', 'Street Lights', 'Govt Road Access'],
    nearby: [
      { label: 'Sant Kanaram School', distance: '2 km' },
      { label: 'Aayush Hospital', distance: '1.5 km' },
    ],
    paymentPlans: [
      { name: 'Installment Plan', description: '50% booking, 24 months EMI' },
    ],
    images: [
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'South-facing plot in Vinayak Puram Colony with excellent road access and clear title.',
    highlights: ['Govt Road Touch', 'Wide Internal Roads', 'Clear Title'],
  },
  {
    id: 'bichchhi-001',
    name: 'Bichchhi Layout – Plot 05',
    project: 'Bichchhi Residential Layout',
    location: 'Bichchhi, Varanasi-Shaktinagar Highway',
    city: 'Varanasi',
    area: 1800,
    dimensions: '30×60',
    pricePerSqft: 1051,
    totalPrice: 1891800,
    status: 'available',
    featured: true,
    rera: 'UP-RERA-REA-VNS-2024-045',
    facing: 'East',
    category: 'residential',
    amenities: ['20 Ft Wide Road', 'Govt Road Access', 'Corner Plot', 'Prime Location'],
    nearby: [
      { label: 'Varanasi-Shaktinagar Highway', distance: 'Direct Access' },
      { label: 'Bichchhi Market', distance: '200 m' },
      { label: 'Govt Hospital', distance: '1.8 km' },
    ],
    paymentPlans: [
      { name: 'Direct Registration', description: 'Full payment with immediate registry' },
      { name: 'Loan Assistance', description: 'Bank loan tie-up available' },
    ],
    images: [
      'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Prime corner plot on the Varanasi-Shaktinagar Highway at Bichchhi. Excellent location with direct highway access, perfect for long-term investment and residential use.',
    highlights: ['Highway Frontage', 'Corner Plot', 'Govt Road Access', 'High Appreciation'],
  },
  {
    id: 'bichchhi-002',
    name: 'Bichchhi Layout – Plot 08',
    project: 'Bichchhi Residential Layout',
    location: 'Bichchhi, Varanasi-Shaktinagar Highway',
    city: 'Varanasi',
    area: 1500,
    dimensions: '25×60',
    pricePerSqft: 1051,
    totalPrice: 1576500,
    status: 'sold',
    featured: false,
    rera: 'UP-RERA-REA-VNS-2024-045',
    facing: 'West',
    category: 'residential',
    amenities: ['20 Ft Wide Road', 'Govt Road Access'],
    nearby: [
      { label: 'Varanasi-Shaktinagar Highway', distance: 'Direct Access' },
    ],
    paymentPlans: [],
    images: [
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: 'Residential plot on Varanasi-Shaktinagar Highway. Already sold.',
    highlights: ['Highway Frontage', 'Govt Road Access'],
  },
];

export const getPlotById = (id: string) => plots.find(p => p.id === id);
export const getFeaturedPlots = () => plots.filter(p => p.featured);
export const getAvailablePlots = () => plots.filter(p => p.status === 'available');

export const cities = [...new Set(plots.map(p => p.city))];
export const projectNames = [...new Set(plots.map(p => p.project))];
