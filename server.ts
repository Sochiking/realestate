import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store for Real Estate backend logic
interface Property {
  id: string;
  title: string;
  category: 'best-sale' | 'apartment' | 'rent-house' | 'paint-house';
  categoryLabel: string;
  price: number;
  squareFt: number;
  rooms: number;
  beds: number;
  baths: number;
  parking: number;
  city: string;
  address: string;
  image: string;
  featured: boolean;
  tag?: string;
  agentId: string;
  description: string;
  amenities: string[];
  floorPlanType: string;
  yearBuilt: number;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  salesCount: number;
  rating: number;
  experienceYears: number;
  socials: { twitter: string; facebook: string; linkedin: string; instagram: string };
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
}

const agents: Agent[] = [
  {
    id: 'clarke-mica',
    name: 'Clarke mica',
    role: 'EXECUTIVE SELLER',
    title: 'Senior Property Director & Acquisition Lead',
    phone: '+1 (212) 555-0182',
    email: 'clarke.mica@nexthm.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'With over 12 years specializing in high-net-worth real estate transactions across Manhattan and Brooklyn, Clarke brings unparalleled market insight, sharp negotiation acumen, and bespoke advisory to discerning investors.',
    salesCount: 142,
    rating: 4.9,
    experienceYears: 12,
    socials: { twitter: '#', facebook: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 'sobuj-khan',
    name: 'Sobuj Khan',
    role: 'EXECUTIVE SELLER',
    title: 'Vice President of Prime Residential Sales',
    phone: '+1 (212) 555-0199',
    email: 'sobuj.khan@nexthm.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Sobuj specializes in trophy penthouses and architecturally distinguished new developments. Known for his discretion and analytical precision, he has successfully closed more than $380M in prime residential volume.',
    salesCount: 198,
    rating: 5.0,
    experienceYears: 14,
    socials: { twitter: '#', facebook: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 'natasa-clarke',
    name: 'Natasa Clarke',
    role: 'EXECUTIVE SELLER',
    title: 'Head of Architectural Estates & International Listings',
    phone: '+1 (212) 555-0134',
    email: 'natasa.clarke@nexthm.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Natasa bridges transatlantic real estate syndications, curating historic brownstones and ultra-modern waterfront estates. Her clients include institutional developers and private family offices worldwide.',
    salesCount: 165,
    rating: 4.9,
    experienceYears: 10,
    socials: { twitter: '#', facebook: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 'emilia-clarke',
    name: 'Emilia Clarke',
    role: 'EXECUTIVE SELLER',
    title: 'Principal Commercial & Mixed-Use Broker',
    phone: '+1 (212) 555-0177',
    email: 'emilia.clarke@nexthm.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Emilia champions innovative urban residential revitalizations and luxury boutique condos. Her analytical models provide buyers with clear long-term equity projections and rental yield forecasts.',
    salesCount: 124,
    rating: 4.8,
    experienceYears: 9,
    socials: { twitter: '#', facebook: '#', linkedin: '#', instagram: '#' }
  }
];

const properties: Property[] = [
  {
    id: 'prop-1',
    title: 'LuxuryApartment Nice View',
    category: 'best-sale',
    categoryLabel: 'BEST SALE',
    price: 250000,
    squareFt: 9450,
    rooms: 4,
    beds: 3,
    baths: 2,
    parking: 2,
    city: 'New York',
    address: '742 Park Avenue, Upper East Side, NY 10021',
    image: '/src/assets/images/luxury_interior_living_1794079005230.jpg',
    featured: true,
    tag: 'FEATURED',
    agentId: 'clarke-mica',
    description: 'An exceptional high-floor luxury apartment bathed in natural southern light. Features floor-to-ceiling panoramic windows overlooking Central Park, custom imported Italian kitchen finishes, and integrated smart home automation throughout.',
    amenities: ['Central Air Conditioning', '24/7 Doorman Concierge', 'Private Balcony', 'Heated Travertine Flooring', 'In-Unit Washer/Dryer', 'EV Charging Bay', 'Private Wine Cellar'],
    floorPlanType: 'Duplex Penthouse Plan A',
    yearBuilt: 2023
  },
  {
    id: 'prop-2',
    title: 'VistaVibe Residences',
    category: 'apartment',
    categoryLabel: 'APARTMENT',
    price: 326000,
    squareFt: 9450,
    rooms: 5,
    beds: 4,
    baths: 3,
    parking: 3,
    city: 'New York',
    address: '110 Riverside Boulevard, Lincoln Square, NY 10069',
    image: '/src/assets/images/modern_apartment_exterior_1794079005395.jpg',
    featured: true,
    tag: 'BEST VALUE',
    agentId: 'sobuj-khan',
    description: 'A masterpiece of contemporary architectural living. VistaVibe Residences blends eco-conscious thermal timber facade slats with soaring 11-foot ceilings, designer walk-in dressing suites, and a resident-only rooftop pool.',
    amenities: ['Skyline Infinity Pool', 'State-of-the-art Gym', 'Private Elevator', 'Smart Keyless Access', 'Pet Spa & Grooming', 'Sub-Zero Appliances'],
    floorPlanType: 'Grand Corner Residence',
    yearBuilt: 2024
  },
  {
    id: 'prop-3',
    title: 'EliteView Residences',
    category: 'paint-house',
    categoryLabel: 'PAINT HOUSE',
    price: 358000,
    squareFt: 9450,
    rooms: 6,
    beds: 4,
    baths: 3,
    parking: 2,
    city: 'New York',
    address: '432 West End Avenue, Upper West Side, NY 10024',
    image: '/src/assets/images/luxury_quote_bedroom_1794079004333.jpg',
    featured: true,
    tag: 'EXCLUSIVE',
    agentId: 'natasa-clarke',
    description: 'Perched high atop Manhattan, this luxury Penthouse (Paint House) captures cinematic 360-degree skyline vistas. Designed for grand entertaining, the layout boasts a dramatic double-height great room and private landscaped terrace.',
    amenities: ['360 Skyline Terrace', 'Private Jacuzzi Spas', 'Butler Pantry', 'Valet Parking', 'Motorized Blackout Shades', 'Soundproof Acoustic Walls'],
    floorPlanType: 'Crown Penthouse Sky Villa',
    yearBuilt: 2023
  },
  {
    id: 'prop-4',
    title: 'GrandView Estate',
    category: 'rent-house',
    categoryLabel: 'RENT HOUSE',
    price: 298000,
    squareFt: 8200,
    rooms: 5,
    beds: 3,
    baths: 3,
    parking: 2,
    city: 'New York',
    address: '88 Central Park South, New York, NY 10019',
    image: '/src/assets/images/luxury_modern_villa_1794079004096.jpg',
    featured: false,
    tag: 'RENTAL PRIME',
    agentId: 'emilia-clarke',
    description: 'Immaculately restored townhome estate offering the tranquility of private suburban gardens within steps of the subway and city vibrance. Generous room dimensions, dual fireplaces, and chef grade Viking kitchen.',
    amenities: ['Private English Courtyard', 'Gas Fireplaces', 'Wine Vault', 'Home Office Suite', 'Radiant Heat Floors', 'High Speed Fiber Mesh'],
    floorPlanType: 'Estate Garden Layout',
    yearBuilt: 2022
  },
  {
    id: 'prop-5',
    title: 'Pinnacle View Estates',
    category: 'best-sale',
    categoryLabel: 'BEST SALE',
    price: 410000,
    squareFt: 11200,
    rooms: 7,
    beds: 5,
    baths: 4,
    parking: 4,
    city: 'New York',
    address: '15 Central Park West, New York, NY 10023',
    image: '/src/assets/images/hero_hand_holding_house_1794079002895.jpg',
    featured: true,
    tag: 'HOT DEAL',
    agentId: 'sobuj-khan',
    description: 'Iconic architectural residence delivering luxury without compromise. Floor-through layout featuring custom bronze accents, Calacatta gold marble island, and dedicated private staff quarters.',
    amenities: ['Concierge Driver Service', 'Screening Room', 'Private Steam & Sauna', 'Outdoor Kitchen Grill', 'Automated Smart Security'],
    floorPlanType: 'Presidential Triplex',
    yearBuilt: 2024
  },
  {
    id: 'prop-6',
    title: 'Diamond Manor Apartment',
    category: 'apartment',
    categoryLabel: 'APARTMENT',
    price: 275000,
    squareFt: 7800,
    rooms: 4,
    beds: 3,
    baths: 2,
    parking: 2,
    city: 'New York',
    address: '56 Leonard Street, Tribeca, NY 10013',
    image: '/src/assets/images/modern_apartment_exterior_1794079005395.jpg',
    featured: false,
    tag: 'NEW ARRIVAL',
    agentId: 'clarke-mica',
    description: 'Sophisticated Tribeca loft apartment with 12ft architectural concrete ceilings, floor-to-ceiling glass curtain walls, and customized millwork storage solutions. Walk to world-class dining and cultural hubs.',
    amenities: ['Lap Pool', 'Children Playroom', 'Private Storage Room', 'Bicycle Storage', 'Fitness Center with Pilates Studio'],
    floorPlanType: 'Urban Loft Unit B',
    yearBuilt: 2023
  }
];

const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Diamond Manor Apartment',
    date: '2026-03-16',
    day: '16',
    month: 'MAR',
    author: 'JON SMITH',
    category: 'REAL ESTATE',
    excerpt: 'People Work For Us In More Than 70 Countries Over The This Breadth Of Global modern residential architecture.',
    content: `The Diamond Manor Apartment project represents the cutting edge of contemporary urban density solutions. By synthesizing sustainable cross-laminated timber structural frames with high-performance low-emissivity glass envelopes, the building drastically reduces operational carbon footprints while delivering unprecedented acoustic isolation.\n\nOur architectural philosophy balances private sanctuary with communal activation. Each floor is arranged around a central sun-lit lightwell that provides natural cross-ventilation, reducing auxiliary HVAC loads by upwards of 34% compared to standard urban residential developments.`,
    image: '/src/assets/images/modern_apartment_exterior_1794079005395.jpg',
    readTime: '4 min read'
  },
  {
    id: 'blog-2',
    title: 'EliteView Residences',
    date: '2026-03-16',
    day: '16',
    month: 'MAR',
    author: 'JON SMITH',
    category: 'ARCHITECTURE',
    excerpt: 'People Work For Us In More Than 60 Countries Over The This Breadth Of Global penthouse interior craft.',
    content: `Penthouse design has shifted definitively from ostentatious ornamentation toward biophilic serenity and tactile materiality. At EliteView Residences, our collaboration with international master craftsmen showcases hand-finished Venetian plaster, warm American walnut cabinetry, and bookmatched quartzite kitchen counters.\n\nSmart environmental controls respond dynamically to daylight vectors, automatically modulating sheer shades and circadian-tuned lighting arrays to optimize occupant well-being from morning sunrise through evening twilight.`,
    image: '/src/assets/images/luxury_quote_bedroom_1794079004333.jpg',
    readTime: '5 min read'
  },
  {
    id: 'blog-3',
    title: 'Bluewhale Real Estate',
    date: '2026-03-11',
    day: '11',
    month: 'MAR',
    author: 'JON SMITH',
    category: 'INVESTMENT',
    excerpt: 'People Work For Us In More Than 70 Countries Over The This Breadth Of Global high-yield property investment portfolios.',
    content: `Navigating prime metropolitan real estate markets requires robust quantitative underwriting paired with granular neighborhood intelligence. In this market briefing, our research desk evaluates cap rate trajectories across tier-1 urban cores, identifying resilient asset subclasses that outperform inflation benchmarks over 10-year holding horizons.\n\nFrom trophy multi-family assets to boutique residential conversions, understanding micro-market fundamentals ensures capital preservation while capturing long-term capital appreciation.`,
    image: '/src/assets/images/luxury_interior_living_1794079005230.jpg',
    readTime: '6 min read'
  },
  {
    id: 'blog-4',
    title: 'Full Travel Guide for Estate',
    date: '2026-03-10',
    day: '10',
    month: 'MAR',
    author: 'JON SMITH',
    category: 'LIFESTYLE',
    excerpt: 'People Work For Us In More Than 50 Countries Over The This Breadth Of Global luxury architectural destinations.',
    content: `A comprehensive curated itinerary highlighting the most celebrated residential architectural marvels of North America and Europe. From modern glass pavilions nestled into coastal cliff faces to historic brownstones reimagined by visionary Scandinavian interior ateliers, explore the design philosophies redefining luxury hospitality and residential living today.`,
    image: '/src/assets/images/luxury_modern_villa_1794079004096.jpg',
    readTime: '3 min read'
  }
];

// Backend API Endpoints
app.get('/api/properties', (req: Request, res: Response) => {
  const { category, search, city, minPrice, maxPrice, beds } = req.query;
  let filtered = [...properties];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (city) {
    filtered = filtered.filter(p => p.city.toLowerCase() === String(city).toLowerCase());
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  if (beds) {
    filtered = filtered.filter(p => p.beds >= Number(beds));
  }

  res.json({
    success: true,
    total: filtered.length,
    properties: filtered
  });
});

app.get('/api/properties/:id', (req: Request, res: Response) => {
  const prop = properties.find(p => p.id === req.params.id);
  if (!prop) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }

  const agent = agents.find(a => a.id === prop.agentId);
  const similar = properties
    .filter(p => p.id !== prop.id && (p.category === prop.category || p.city === prop.city))
    .slice(0, 3);

  res.json({
    success: true,
    property: prop,
    agent,
    similar
  });
});

app.get('/api/agents', (_req: Request, res: Response) => {
  res.json({
    success: true,
    total: agents.length,
    agents
  });
});

app.get('/api/agents/:id', (req: Request, res: Response) => {
  const agent = agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ success: false, message: 'Agent not found' });
  }
  const agentProperties = properties.filter(p => p.agentId === agent.id);
  res.json({
    success: true,
    agent,
    properties: agentProperties
  });
});

app.get('/api/blogs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    total: blogPosts.length,
    blogs: blogPosts
  });
});

app.get('/api/blogs/:id', (req: Request, res: Response) => {
  const post = blogPosts.find(b => b.id === req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  const related = blogPosts.filter(b => b.id !== post.id).slice(0, 3);
  res.json({
    success: true,
    blog: post,
    related
  });
});

// Floor plans & blueprints data
app.get('/api/floorplans', (_req: Request, res: Response) => {
  res.json({
    success: true,
    plans: {
      'ground-floor': {
        name: 'Ground Floor Blueprint',
        totalArea: '4,250 Sq Ft',
        livingArea: '2,800 Sq Ft',
        garage: '2 Cars (450 Sq Ft)',
        terrace: '320 Sq Ft',
        dimensions: '64ft x 48ft',
        rooms: ['Grand Foyer', 'Open Concept Kitchen', 'Living Great Room', 'Powder Room', 'Guest Suite', 'Double Garage']
      },
      'first-floor': {
        name: 'First Floor Blueprint',
        totalArea: '3,800 Sq Ft',
        livingArea: '3,100 Sq Ft',
        balcony: '2 Balconies (280 Sq Ft)',
        dimensions: '60ft x 46ft',
        rooms: ['Primary Master Suite', 'Master En-suite Bath & Walk-in', 'Bedroom 2 (En-suite)', 'Bedroom 3', 'Family Library', 'Laundry Suite']
      },
      'roof-terrace': {
        name: 'Rooftop Lounge & 3D Top View',
        totalArea: '1,400 Sq Ft',
        features: 'Plunge pool, BBQ kitchen bar, Pergola shade, Solar panel array',
        dimensions: '42ft x 34ft',
        rooms: ['Sky Lounge', 'Outdoor Dining', 'Sun Deck', 'Observatory Nook']
      }
    },
    regions: [
      { id: 'north-america', name: 'NORTH AMERICA', locationCount: 148, activeProjects: 24, coordinates: { lat: 40.7128, lng: -74.006 } },
      { id: 'europe', name: 'EUROPE', locationCount: 92, activeProjects: 18, coordinates: { lat: 48.8566, lng: 2.3522 } },
      { id: 'asia-pacific', name: 'ASIA PACIFIC', locationCount: 65, activeProjects: 12, coordinates: { lat: 35.6762, lng: 139.6503 } }
    ]
  });
});

// Interactive quote, callback, and newsletter handlers
const leads: Array<{ id: string; name: string; phone: string; email?: string; type: string; date: string; notes?: string }> = [];
const subscribers = new Set<string>(['client@example.com']);

app.post('/api/leads', (req: Request, res: Response) => {
  const { name, phone, email, type = 'call_request', notes } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    email,
    type,
    notes,
    date: new Date().toISOString()
  };
  leads.push(newLead);

  res.json({
    success: true,
    message: 'Your request has been received. An executive agent from NEXT HM will contact you within 15 minutes.',
    leadId: newLead.id
  });
});

app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  subscribers.add(email.toLowerCase().trim());
  res.json({
    success: true,
    message: 'Thank you for subscribing to NEXT HM luxury property insights!',
    subscriberCount: subscribers.size
  });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in Name, Email and Message' });
  }

  res.json({
    success: true,
    message: 'Message sent successfully. Our VIP Concierge desk will reply promptly.'
  });
});

// Configure Vite integration for dev or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
