export type ProjectStatus = 'ongoing' | 'upcoming' | 'completed';

export interface Project {
  id: string;
  name: string;
  location: string;
  city: string;
  status: ProjectStatus;
  totalPlots: number;
  availablePlots: number;
  priceRange: string;
  plotSizes: string;
  area: string;
  launchDate: string;
  highlights: string[];
  image: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'kashi-puram',
    name: 'Kashi Puram Green City',
    location: 'Chopan-Sindhuriya Marg, Varanasi',
    city: 'Varanasi',
    status: 'ongoing',
    totalPlots: 120,
    availablePlots: 48,
    priceRange: '₹599/sqft',
    plotSizes: '27×50, 27×55 sq ft',
    area: '10 acres',
    launchDate: 'March 2024',
    highlights: ['25 Ft Roads', 'Sewage System', 'Water at 60 Ft', 'RERA Approved'],
    image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A thoughtfully planned residential township on Chopan-Sindhuriya Marg offering affordable premium plots with all amenities. Close to Varanasi-Shaktinagar highway and Chopan Hospital.',
  },
  {
    id: 'vinayak-puram',
    name: 'Vinayak Puram Society',
    location: 'Robertsganj, Sonbhadra',
    city: 'Sonbhadra',
    status: 'ongoing',
    totalPlots: 80,
    availablePlots: 32,
    priceRange: '₹699/sqft',
    plotSizes: '25×60, 25×55 sq ft',
    area: '7 acres',
    launchDate: 'January 2024',
    highlights: ['Govt Road Touch', '20 Ft Internal Roads', 'Clear Title', 'EMI Available'],
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Government road-facing layout in the heart of Robertsganj. All plots have direct road access, clear titles, and flexible EMI options. Perfect for families and investors alike.',
  },
  {
    id: 'bichchhi-layout',
    name: 'Bichchhi Residential Layout',
    location: 'Bichchhi, Varanasi-Shaktinagar Highway',
    city: 'Varanasi',
    status: 'ongoing',
    totalPlots: 45,
    availablePlots: 12,
    priceRange: '₹1,051/sqft',
    plotSizes: '25×60, 30×60 sq ft',
    area: '5 acres',
    launchDate: 'September 2023',
    highlights: ['Highway Frontage', 'Corner Plots Available', 'High Appreciation', 'RERA Registered'],
    image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium plots directly on the Varanasi-Shaktinagar Highway at Bichchhi. Ideal for both residential and commercial investment with guaranteed high appreciation.',
  },
  {
    id: 'green-valley',
    name: 'Green Valley Enclave',
    location: 'Mirzapur Road, Varanasi',
    city: 'Varanasi',
    status: 'upcoming',
    totalPlots: 200,
    availablePlots: 200,
    priceRange: '₹750/sqft (Pre-launch)',
    plotSizes: '30×50, 40×60 sq ft',
    area: '18 acres',
    launchDate: 'August 2025',
    highlights: ['Pre-launch Pricing', 'Gated Community', 'Club House', 'RERA Registration Underway'],
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Our flagship upcoming project — a fully gated residential enclave on Mirzapur Road with club house, landscaped parks, and premium internal infrastructure. Pre-launch bookings open.',
  },
  {
    id: 'surya-nagar',
    name: 'Surya Nagar Colony',
    location: 'Chunar Road, Mirzapur',
    city: 'Mirzapur',
    status: 'completed',
    totalPlots: 60,
    availablePlots: 0,
    priceRange: '₹420–480/sqft',
    plotSizes: '25×50 sq ft',
    area: '4 acres',
    launchDate: 'October 2022',
    highlights: ['Fully Sold Out', 'All Registries Done', 'Community Built'],
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Successfully completed residential layout at Chunar Road, Mirzapur. All 60 plots sold, registered, and handed over. A testament to our commitment to on-time delivery.',
  },
];
