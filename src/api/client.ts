export interface Property {
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

export interface Agent {
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

export interface BlogPost {
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

export interface FloorPlanData {
  plans: Record<string, {
    name: string;
    totalArea: string;
    livingArea?: string;
    garage?: string;
    terrace?: string;
    balcony?: string;
    features?: string;
    dimensions: string;
    rooms: string[];
  }>;
  regions: Array<{
    id: string;
    name: string;
    locationCount: number;
    activeProjects: number;
    coordinates: { lat: number; lng: number };
  }>;
}

export const api = {
  async getProperties(params?: { category?: string; search?: string; city?: string; minPrice?: number; maxPrice?: number; beds?: number }): Promise<{ success: boolean; total: number; properties: Property[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.city) query.set('city', params.city);
    if (params?.minPrice) query.set('minPrice', String(params.minPrice));
    if (params?.maxPrice) query.set('maxPrice', String(params.maxPrice));
    if (params?.beds) query.set('beds', String(params.beds));

    const res = await fetch(`/api/properties?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  async getProperty(id: string): Promise<{ success: boolean; property: Property; agent?: Agent; similar: Property[] }> {
    const res = await fetch(`/api/properties/${id}`);
    if (!res.ok) throw new Error('Failed to fetch property details');
    return res.json();
  },

  async getAgents(): Promise<{ success: boolean; total: number; agents: Agent[] }> {
    const res = await fetch('/api/agents');
    if (!res.ok) throw new Error('Failed to fetch agents');
    return res.json();
  },

  async getAgent(id: string): Promise<{ success: boolean; agent: Agent; properties: Property[] }> {
    const res = await fetch(`/api/agents/${id}`);
    if (!res.ok) throw new Error('Failed to fetch agent details');
    return res.json();
  },

  async getBlogs(): Promise<{ success: boolean; total: number; blogs: BlogPost[] }> {
    const res = await fetch('/api/blogs');
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },

  async getBlog(id: string): Promise<{ success: boolean; blog: BlogPost; related: BlogPost[] }> {
    const res = await fetch(`/api/blogs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog post');
    return res.json();
  },

  async getFloorPlans(): Promise<{ success: boolean } & FloorPlanData> {
    const res = await fetch('/api/floorplans');
    if (!res.ok) throw new Error('Failed to fetch floor plans');
    return res.json();
  },

  async requestLead(data: { name: string; phone: string; email?: string; type?: string; notes?: string }): Promise<{ success: boolean; message: string; leadId: string }> {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  async submitContact(data: { name: string; email: string; phone?: string; subject?: string; message: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
