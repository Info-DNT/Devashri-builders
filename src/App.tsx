import { Router, Routes } from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import PlotsPage from './pages/PlotsPage';
import PlotDetailPage from './pages/PlotDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/plots', element: <PlotsPage /> },
  { path: '/plots/:id', element: <PlotDetailPage /> },
  { path: '/projects', element: <ProjectsPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/blog', element: <BlogPage /> },
];

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes routes={routes} />
      </main>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}
