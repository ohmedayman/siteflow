/**
 * Site Flow — Templates & Presets for site creation wizard
 */
const PRESETS = [
  {
    id: 'personal', name: 'Personal Portfolio', icon: '👤', category: 'personal',
    desc: 'Showcase your work, skills, and experience',
    sections: [
      { type: 'hero', data: { heading: 'John Doe', description: 'Creative Developer & Designer. I build digital experiences that matter.', image: '' } },
      { type: 'about', data: { heading: 'About Me', content: 'I am a passionate creator with 5+ years of experience in web development and design. I love turning ideas into reality.' } },
      { type: 'services', data: { heading: 'My Services', items: [{title:'Web Development',desc:'Custom websites built with modern technologies'},{title:'UI/Design',desc:'Beautiful, intuitive interfaces that users love'},{title:'Mobile Apps',desc:'Native and cross-platform mobile applications'}] } },
      { type: 'testimonials', data: { heading: 'What Clients Say', items: [{name:'Sarah Johnson',text:'Amazing work! Delivered on time and exceeded expectations.',role:'CEO, TechCorp'},{name:'Mike Chen',text:'Professional and creative. Highly recommended!',role:'Founder, StartupX'}] } },
      { type: 'pricing', data: { heading: 'Pricing', plans: [{name:'Basic',price:'$499',features:['1 Page','Basic Design','1 Revision']},{name:'Pro',price:'$999',features:['5 Pages','Premium Design','3 Revisions','SEO Setup']}] } },
      { type: 'contact', data: { heading: 'Get In Touch', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#6366f1', font: 'Inter' },
    seo: { title: 'My Portfolio', description: 'Creative Developer & Designer portfolio' }
  },
  {
    id: 'business', name: 'Business', icon: '🏢', category: 'business',
    desc: 'Professional company website with services',
    sections: [
      { type: 'hero', data: { heading: 'Welcome to Our Company', description: 'We provide innovative solutions for your business growth.', image: '' } },
      { type: 'about', data: { heading: 'About Us', content: 'We are a leading company in our industry with over 10 years of experience. Our team of experts is dedicated to delivering exceptional results.' } },
      { type: 'services', data: { heading: 'Our Services', items: [{title:'Consulting',desc:'Expert advice to grow your business'},{title:'Development',desc:'Custom software solutions tailored to your needs'},{title:'Marketing',desc:'Digital marketing strategies that deliver results'},{title:'Support',desc:'24/7 support to keep your business running'}] } },
      { type: 'testimonials', data: { heading: 'Client Testimonials', items: [{name:'Ahmed Hassan',text:'Their team transformed our business. Revenue increased 200%.',role:'CEO, MegaCorp'},{name:'Lisa Wang',text:'Best investment we ever made. Professional and reliable.',role:'Director, GlobalTech'}] } },
      { type: 'team', data: { heading: 'Our Team', items: [{name:'John Smith',role:'CEO & Founder'},{name:'Sarah Brown',role:'CTO'},{name:'Mike Davis',role:'Head of Design'}] } },
      { type: 'contact', data: { heading: 'Contact Us', email: '', phone: '', address: '' } },
      { type: 'footer', data: { copyright: '© 2026 Our Company. All rights reserved.', text: 'Built with Site Flow' } }
    ],
    theme: { color: '#1e40af', font: 'Inter' },
    seo: { title: 'Our Company', description: 'Leading business solutions provider' }
  },
  {
    id: 'restaurant', name: 'Restaurant', icon: '🍽️', category: 'food',
    desc: 'Restaurant menu and reservation site',
    sections: [
      { type: 'hero', data: { heading: 'Delicious Dining Experience', description: 'Fresh ingredients, authentic flavors, unforgettable moments.', image: '' } },
      { type: 'about', data: { heading: 'Our Story', content: 'Founded in 2020, we bring authentic flavors from around the world to your table. Every dish is crafted with love and the finest ingredients.' } },
      { type: 'services', data: { heading: 'Our Menu', items: [{title:'Appetizers',desc:'Fresh salads, soups, and starters'},{title:'Main Course',desc:'Steaks, pasta, seafood, and more'},{title:'Desserts',desc:'Homemade cakes, ice cream, and specialties'},{title:'Drinks',desc:'Craft cocktails, wines, and beverages'}] } },
      { type: 'testimonials', data: { heading: 'Happy Customers', items: [{name:'Emily Rose',text:'Best restaurant in town! The food is absolutely amazing.',role:'Food Blogger'},{name:'James Wilson',text:'Great atmosphere and even better food. A must-visit!',role:'Local Guide'}] } },
      { type: 'contact', data: { heading: 'Visit Us', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#dc2626', font: 'Georgia' },
    seo: { title: 'Our Restaurant', description: 'Best dining experience in town' }
  },
  {
    id: 'gallery', name: 'Photo Gallery', icon: '📸', category: 'creative',
    desc: 'Photography portfolio with image gallery',
    sections: [
      { type: 'hero', data: { heading: 'Photography Portfolio', description: 'Capturing moments that last forever.', image: '' } },
      { type: 'about', data: { heading: 'About', content: 'Professional photographer with a passion for capturing life\'s beautiful moments. Specializing in portraits, weddings, and landscapes.' } },
      { type: 'gallery', data: { heading: 'My Work', images: [] } },
      { type: 'testimonials', data: { heading: 'Reviews', items: [{name:'Anna Smith',text:'Absolutely stunning photos! She captured our wedding perfectly.',role:'Bride'},{name:'Tom Brown',text:'Professional and creative. Love every shot!',role:'Model'}] } },
      { type: 'contact', data: { heading: 'Book a Session', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#0891b2', font: 'Inter' },
    seo: { title: 'Photography Portfolio', description: 'Professional photography services' }
  },
  {
    id: 'event', name: 'Event', icon: '🎉', category: 'personal',
    desc: 'Event or conference landing page',
    sections: [
      { type: 'hero', data: { heading: 'Annual Tech Conference 2026', description: 'Join 5000+ developers, designers, and tech enthusiasts.', image: '' } },
      { type: 'about', data: { heading: 'About the Event', content: 'The biggest tech conference of the year. 3 days of workshops, talks, and networking with industry leaders.' } },
      { type: 'services', data: { heading: 'What to Expect', items: [{title:'Workshops',desc:'Hands-on sessions with expert instructors'},{title:'Talks',desc:'Inspiring keynotes from industry leaders'},{title:'Networking',desc:'Connect with 5000+ professionals'},{title:'After Party',desc:'Celebrate with live music and drinks'}] } },
      { type: 'pricing', data: { heading: 'Tickets', plans: [{name:'Early Bird',price:'$99',features:['All Sessions','Lunch Included','Goodie Bag']},{name:'VIP',price:'$299',features:['All Sessions','Backstage Access','Dinner','Meet & Greet']}] } },
      { type: 'contact', data: { heading: 'Questions?', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#7c3aed', font: 'Inter' },
    seo: { title: 'Tech Conference 2026', description: 'Annual tech conference for developers' }
  },
  {
    id: 'form', name: 'Contact Form', icon: '📝', category: 'other',
    desc: 'Simple contact/lead capture page',
    sections: [
      { type: 'hero', data: { heading: 'Get In Touch', description: 'We\'d love to hear from you. Send us a message!', image: '' } },
      { type: 'services', data: { heading: 'How We Help', items: [{title:'Fast Response',desc:'We respond within 24 hours'},{title:'Free Consultation',desc:'Get a free consultation for your project'},{title:'Custom Solutions',desc:'Tailored solutions for your needs'}] } },
      { type: 'faq', data: { heading: 'FAQ', items: [{q:'How fast do you respond?',a:'We typically respond within 24 hours on business days.'},{q:'Is the consultation free?',a:'Yes! Your first consultation is completely free.'},{q:'What areas do you serve?',a:'We serve clients worldwide remotely.'}] } },
      { type: 'contact', data: { heading: 'Send Us a Message', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#059669', font: 'Inter' },
    seo: { title: 'Contact Us', description: 'Get in touch with our team' }
  },
  {
    id: 'blog', name: 'Blog', icon: '✍️', category: 'personal',
    desc: 'Personal blog or magazine layout',
    sections: [
      { type: 'hero', data: { heading: 'My Blog', description: 'Thoughts, stories, and ideas on technology and design.', image: '' } },
      { type: 'about', data: { heading: 'About the Author', content: 'Writer, developer, and lifelong learner. I share my thoughts on technology, design, and life.' } },
      { type: 'services', data: { heading: 'Topics', items: [{title:'Technology',desc:'Latest trends and tutorials in tech'},{title:'Design',desc:'UI/UX tips and design inspiration'},{title:'Business',desc:'Startup advice and business growth'}] } },
      { type: 'testimonials', data: { heading: 'Reader Reviews', items: [{name:'David Lee',text:'Incredible blog! Always find useful content here.',role:'Subscriber'},{name:'Maria Garcia',text:'Clear, concise, and very informative. Keep it up!',role:'Developer'}] } },
      { type: 'contact', data: { heading: 'Subscribe', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#ea580c', font: 'Georgia' },
    seo: { title: 'My Blog', description: 'Technology and design blog' }
  },
  {
    id: 'blank', name: 'Blank Canvas', icon: '🎨', category: 'other',
    desc: 'Start from scratch with basic sections',
    sections: [
      { type: 'hero', data: { heading: 'My Website', description: 'Welcome to my site. Start editing to make it yours.', image: '' } },
      { type: 'about', data: { heading: 'About', content: 'Edit this section to tell your story.' } },
      { type: 'services', data: { heading: 'Our Services', items: [{title:'Service 1',desc:'Description of service 1'},{title:'Service 2',desc:'Description of service 2'},{title:'Service 3',desc:'Description of service 3'}] } },
      { type: 'testimonials', data: { heading: 'Testimonials', items: [{name:'Client Name',text:'Great service!',role:'CEO, Company'}] } },
      { type: 'contact', data: { heading: 'Contact', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#6366f1', font: 'Inter' },
    seo: { title: 'My Site', description: '' }
  }
]
