export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Things to Check Before Buying a Plot in UP',
    slug: '5-things-to-check-before-buying-plot-up',
    excerpt: 'From RERA registration to soil testing — here is a practical checklist every first-time plot buyer in Uttar Pradesh should go through before signing any documents.',
    category: 'Buyer Guide',
    readTime: 5,
    date: 'April 12, 2025',
    author: 'Rajesh Verma',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['buyer guide', 'legal', 'UP'],
  },
  {
    id: '2',
    title: 'Why Varanasi Outskirts Are the Next Big Investment Zone',
    slug: 'varanasi-outskirts-investment-zone',
    excerpt: 'Infrastructure growth, highway expansion, and rising demand from NRIs are making Varanasi\'s peripheral areas some of the most attractive land investment destinations.',
    category: 'Location Analysis',
    readTime: 7,
    date: 'March 28, 2025',
    author: 'Priya Singh',
    image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['investment', 'varanasi', 'location'],
  },
  {
    id: '3',
    title: 'Understanding RERA for Plot Buyers: A Simple Guide',
    slug: 'understanding-rera-plot-buyers',
    excerpt: 'RERA protections extend to plot buyers too. Learn what a RERA-registered plot means, what documents to verify, and how to check registration status online.',
    category: 'Legal Guide',
    readTime: 6,
    date: 'February 15, 2025',
    author: 'Amit Tiwari',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['rera', 'legal', 'documentation'],
  },
  {
    id: '4',
    title: 'Plot vs Flat: Which is the Smarter Investment in 2025?',
    slug: 'plot-vs-flat-smarter-investment-2025',
    excerpt: 'Comparing appreciation rates, rental yields, liquidity, and long-term value — a data-driven look at why plots consistently outperform flats for wealth creation.',
    category: 'Investment Insight',
    readTime: 8,
    date: 'January 20, 2025',
    author: 'Rajesh Verma',
    image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['investment', 'comparison', 'wealth'],
  },
  {
    id: '5',
    title: 'Complete Guide to Plot Registration Process in Uttar Pradesh',
    slug: 'plot-registration-process-uttar-pradesh',
    excerpt: 'Step-by-step walkthrough of the plot registration process in UP — documents needed, stamp duty rates, online registration portal, and common mistakes to avoid.',
    category: 'Legal Guide',
    readTime: 10,
    date: 'December 5, 2024',
    author: 'Amit Tiwari',
    image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['registration', 'legal', 'documentation'],
  },
  {
    id: '6',
    title: 'NRI Guide: How to Buy a Plot in India from Abroad',
    slug: 'nri-guide-buy-plot-india',
    excerpt: 'Everything an NRI needs to know about purchasing land in India — FEMA regulations, power of attorney, repatriation of funds, and our dedicated NRI assistance service.',
    category: 'NRI Corner',
    readTime: 9,
    date: 'November 10, 2024',
    author: 'Priya Singh',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['nri', 'investment', 'legal'],
  },
];
