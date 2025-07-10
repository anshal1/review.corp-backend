import { CookieOptions } from 'express'

export const COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  secure: true,
  sameSite: 'none',
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const TYPES = ['Individual', 'Organization']

export const serviceCategories = [
  {
    category: 'Design & Creative',
    services: [
      'Graphic Design',
      'UI/UX Design',
      'Web Design',
      'Logo & Branding',
      'Product Design',
      'Motion Graphics / Animation',
      'Illustration',
      'Packaging Design',
      'Presentation Design',
      'Print Design',
    ],
  },
  {
    category: 'Development & Tech',
    services: [
      'Web Development',
      'Mobile App Development',
      'Custom Software Development',
      'E-commerce Development',
      'CMS Development',
      'API Development',
      'SaaS Development',
      'AI/ML Development',
      'Website Maintenance & Support',
      'DevOps & Cloud Services',
    ],
  },
  {
    category: 'Digital Marketing',
    services: [
      'Social Media Marketing',
      'Performance Marketing',
      'SEO',
      'Content Marketing',
      'Email Marketing',
      'Influencer Marketing',
      'Video Marketing',
      'Online Reputation Management',
      'Marketing Strategy Consulting',
      'Affiliate Marketing',
    ],
  },
  {
    category: 'Media & Content',
    services: [
      'Photography',
      'Videography',
      'Video Editing',
      'Copywriting',
      'Scriptwriting',
      'Podcast Editing',
      'Voiceover Services',
      'Blog/Article Writing',
      'Social Media Content Creation',
      'eBook/Whitepaper Design',
    ],
  },
  {
    category: 'Other Creative & Tech Services',
    services: [
      'UI Audit / UX Research',
      'CRO (Conversion Rate Optimization)',
      'Branding Strategy',
      'Localization / Translation',
      'Tech Support & Virtual Assistance',
      'No-code / Low-code Development',
    ],
  },
]

export const FREE_REVIEWS = 5
export const LIMIT = 10
