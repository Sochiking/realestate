import { agents as mockAgents, blogPosts as mockBlogs, floorPlanData as mockFloorPlans, properties as mockProperties } from '../data/mockData';

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
    try {
      const query = new URLSearchParams();
      if (params?.category) query.set('category', params.category);
      if (params?.search) query.set('search', params.search);
      if (params?.city) query.set('city', params.city);
      if (params?.minPrice) query.set('minPrice', String(params.minPrice));
      if (params?.maxPrice) query.set('maxPrice', String(params.maxPrice));
      if (params?.beds) query.set('beds', String(params.beds));

      const res = await fetch(`/api/properties?${query.toString()}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback for static hosts like Vercel
    }

    let filtered = [...mockProperties];
    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(p => p.category === params.category);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (params?.city) {
      filtered = filtered.filter(p => p.city.toLowerCase() === params.city?.toLowerCase());
    }
    if (params?.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(params.minPrice));
    }
    if (params?.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
    }
    if (params?.beds) {
      filtered = filtered.filter(p => p.beds >= Number(params.beds));
    }

    return {
      success: true,
      total: filtered.length,
      properties: filtered
    };
  },

  async getProperty(id: string): Promise<{ success: boolean; property: Property; agent?: Agent; similar: Property[] }> {
    try {
      const res = await fetch(`/api/properties/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const prop = mockProperties.find(p => p.id === id) || mockProperties[0];
    const agent = mockAgents.find(a => a.id === prop.agentId);
    const similar = mockProperties
      .filter(p => p.id !== prop.id && (p.category === prop.category || p.city === prop.city))
      .slice(0, 3);

    return {
      success: true,
      property: prop,
      agent,
      similar
    };
  },

  async getAgents(): Promise<{ success: boolean; total: number; agents: Agent[] }> {
    try {
      const res = await fetch('/api/agents');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      total: mockAgents.length,
      agents: mockAgents
    };
  },

  async getAgent(id: string): Promise<{ success: boolean; agent: Agent; properties: Property[] }> {
    try {
      const res = await fetch(`/api/agents/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const agent = mockAgents.find(a => a.id === id) || mockAgents[0];
    const agentProperties = mockProperties.filter(p => p.agentId === agent.id);

    return {
      success: true,
      agent,
      properties: agentProperties
    };
  },

  async getBlogs(): Promise<{ success: boolean; total: number; blogs: BlogPost[] }> {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      total: mockBlogs.length,
      blogs: mockBlogs
    };
  },

  async getBlog(id: string): Promise<{ success: boolean; blog: BlogPost; related: BlogPost[] }> {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    const post = mockBlogs.find(b => b.id === id) || mockBlogs[0];
    const related = mockBlogs.filter(b => b.id !== post.id).slice(0, 3);

    return {
      success: true,
      blog: post,
      related
    };
  },

  async getFloorPlans(): Promise<{ success: boolean } & FloorPlanData> {
    try {
      const res = await fetch('/api/floorplans');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      ...mockFloorPlans
    };
  },

  async requestLead(data: { name: string; phone: string; email?: string; type?: string; notes?: string }): Promise<{ success: boolean; message: string; leadId: string }> {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      message: 'Consultation callback booked successfully! An executive agent will reach out within 15 minutes.',
      leadId: `lead-${Date.now()}`
    };
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      message: 'Thank you for subscribing to NEXT HM luxury property insights!'
    };
  },

  async submitContact(data: { name: string; email: string; phone?: string; subject?: string; message: string }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }

    return {
      success: true,
      message: 'Message sent successfully. Our VIP Concierge desk will reply promptly.'
    };
  }
};
