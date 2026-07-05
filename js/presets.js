/**
 * Site Flow — Templates & Presets for site creation wizard
 */
const PRESETS = [
  {
    id: 'personal', name: 'Personal Portfolio', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>', category: 'personal',
    desc: 'Showcase your work, skills, and experience',
    sections: [
      { type: 'hero', data: { heading: 'John Doe', description: 'Creative Developer & Designer. I build digital experiences that matter.', image: '' } },
      { type: 'about', data: { heading: 'About Me', content: 'I am a passionate creator with 5+ years of experience in web development and design. I love turning ideas into reality.' } },
      { type: 'services', data: { heading: 'My Services', items: [{title:'Web Development',desc:'Custom websites built with modern technologies'},{title:'UI/Design',desc:'Beautiful, intuitive interfaces that users love'},{title:'Mobile Apps',desc:'Native and cross-platform mobile applications'}] } },
      { type: 'portfolio', data: { heading: 'My Work', items: [{title:'Project One',desc:'A full-stack web app built with React',image:''},{title:'Project Two',desc:'Mobile app design for a startup',image:''},{title:'Project Three',desc:'E-commerce platform with payments',image:''}] } },
      { type: 'testimonials', data: { heading: 'What Clients Say', items: [{name:'Sarah Johnson',text:'Amazing work! Delivered on time and exceeded expectations.',role:'CEO, TechCorp'},{name:'Mike Chen',text:'Professional and creative. Highly recommended!',role:'Founder, StartupX'}] } },
      { type: 'blog', data: { heading: 'Latest Posts', items: [{title:'Getting Started with React',excerpt:'Learn the basics of React in 10 minutes.',date:'Jan 15, 2026'},{title:'CSS Grid vs Flexbox',excerpt:'When to use each layout method.',date:'Feb 2, 2026'}] } },
      { type: 'counters', data: { heading: 'By the Numbers', items: [{number:'50+',label:'Projects'},{number:'30+',label:'Clients'},{number:'5+',label:'Years'},{number:'99%',label:'Satisfaction'}] } },
      { type: 'contact', data: { heading: 'Get In Touch', email: '', phone: '', address: '' } },
      { type: 'footer', data: { copyright: '© 2026 John Doe. All rights reserved.', text: 'Built with Site Flow' } }
    ],
    theme: { color: '#6366f1', font: 'Inter' },
    seo: { title: 'My Portfolio', description: 'Creative Developer & Designer portfolio' }
  },
  {
    id: 'business', name: 'Business', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>', category: 'business',
    desc: 'Professional company website with services',
    sections: [
      { type: 'hero', data: { heading: 'Welcome to Our Company', description: 'We provide innovative solutions for your business growth.', image: '' } },
      { type: 'about', data: { heading: 'About Us', content: 'We are a leading company in our industry with over 10 years of experience. Our team of experts is dedicated to delivering exceptional results.' } },
      { type: 'services', data: { heading: 'Our Services', items: [{title:'Consulting',desc:'Expert advice to grow your business'},{title:'Development',desc:'Custom software solutions tailored to your needs'},{title:'Marketing',desc:'Digital marketing strategies that deliver results'},{title:'Support',desc:'24/7 support to keep your business running'}] } },
      { type: 'counters', data: { heading: 'Our Impact', items: [{number:'500+',label:'Clients'},{number:'1000+',label:'Projects'},{number:'50+',label:'Team'},{number:'10+',label:'Years'}] } },
      { type: 'testimonials', data: { heading: 'Client Testimonials', items: [{name:'Ahmed Hassan',text:'Their team transformed our business. Revenue increased 200%.',role:'CEO, MegaCorp'},{name:'Lisa Wang',text:'Best investment we ever made. Professional and reliable.',role:'Director, GlobalTech'}] } },
      { type: 'team', data: { heading: 'Our Team', items: [{name:'John Smith',role:'CEO & Founder'},{name:'Sarah Brown',role:'CTO'},{name:'Mike Davis',role:'Head of Design'}] } },
      { type: 'timeline', data: { heading: 'Our Journey', items: [{title:'Founded',desc:'Company was established',year:'2016'},{title:'First Office',desc:'Opened HQ in NYC',year:'2018'},{title:'1000 Clients',desc:'Reached milestone',year:'2020'},{title:'Global Expansion',desc:'Offices in 5 countries',year:'2024'}] } },
      { type: 'contact', data: { heading: 'Contact Us', email: '', phone: '', address: '' } },
      { type: 'footer', data: { copyright: '© 2026 Our Company. All rights reserved.', text: 'Built with Site Flow' } }
    ],
    theme: { color: '#1e40af', font: 'Inter' },
    seo: { title: 'Our Company', description: 'Leading business solutions provider' }
  },
  {
    id: 'restaurant', name: 'Restaurant', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>', category: 'food',
    desc: 'Restaurant menu and reservation site',
    sections: [
      { type: 'hero', data: { heading: 'Delicious Dining Experience', description: 'Fresh ingredients, authentic flavors, unforgettable moments.', image: '' } },
      { type: 'about', data: { heading: 'Our Story', content: 'Founded in 2020, we bring authentic flavors from around the world to your table. Every dish is crafted with love and the finest ingredients.' } },
      { type: 'menu', data: { heading: 'Our Menu', items: [{title:'Bruschetta',desc:'Toasted bread with tomatoes',price:'$12',category:'Appetizers'},{title:'Caesar Salad',desc:'Fresh romaine with parmesan',price:'$14',category:'Appetizers'},{title:'Grilled Salmon',desc:'Atlantic salmon with herbs',price:'$28',category:'Main Course'},{title:'Ribeye Steak',desc:'12oz prime cut',price:'$36',category:'Main Course'},{title:'Tiramisu',desc:'Classic Italian dessert',price:'$10',category:'Desserts'}] } },
      { type: 'testimonials', data: { heading: 'Happy Customers', items: [{name:'Emily Rose',text:'Best restaurant in town! The food is absolutely amazing.',role:'Food Blogger'},{name:'James Wilson',text:'Great atmosphere and even better food. A must-visit!',role:'Local Guide'}] } },
      { type: 'location', data: { heading: 'Find Us', address: '123 Main Street, New York, NY 10001', phone: '+1 (555) 123-4567', hours: 'Mon-Sun: 11AM - 10PM' } },
      { type: 'contact', data: { heading: 'Make a Reservation', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#dc2626', font: 'Georgia' },
    seo: { title: 'Our Restaurant', description: 'Best dining experience in town' }
  },
  {
    id: 'gallery', name: 'Photo Gallery', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>', category: 'creative',
    desc: 'Photography portfolio with image gallery',
    sections: [
      { type: 'hero', data: { heading: 'Photography Portfolio', description: 'Capturing moments that last forever.', image: '' } },
      { type: 'about', data: { heading: 'About', content: 'Professional photographer with a passion for capturing life\'s beautiful moments. Specializing in portraits, weddings, and landscapes.' } },
      { type: 'gallery', data: { heading: 'My Work', images: [] } },
      { type: 'portfolio', data: { heading: 'Featured Projects', items: [{title:'Wedding Photography',desc:'Captured 50+ weddings',image:''},{title:'Portrait Sessions',desc:'Professional headshots',image:''}] } },
      { type: 'testimonials', data: { heading: 'Reviews', items: [{name:'Anna Smith',text:'Absolutely stunning photos! She captured our wedding perfectly.',role:'Bride'},{name:'Tom Brown',text:'Professional and creative. Love every shot!',role:'Model'}] } },
      { type: 'contact', data: { heading: 'Book a Session', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#0891b2', font: 'Inter' },
    seo: { title: 'Photography Portfolio', description: 'Professional photography services' }
  },
  {
    id: 'event', name: 'Event', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>', category: 'personal',
    desc: 'Event or conference landing page',
    sections: [
      { type: 'hero', data: { heading: 'Annual Tech Conference 2026', description: 'Join 5000+ developers, designers, and tech enthusiasts.', image: '' } },
      { type: 'about', data: { heading: 'About the Event', content: 'The biggest tech conference of the year. 3 days of workshops, talks, and networking with industry leaders.' } },
      { type: 'timeline', data: { heading: 'Schedule', items: [{title:'Registration',desc:'Check-in and welcome kit',year:'9:00 AM'},{title:'Keynote',desc:'Main stage opening talk',year:'10:00 AM'},{title:'Workshops',desc:'Breakout sessions',year:'11:30 AM'},{title:'Networking Lunch',desc:'Connect with attendees',year:'1:00 PM'},{title:'Panel Discussion',desc:'Industry experts Q&A',year:'3:00 PM'},{title:'Closing',desc:'Awards & networking',year:'5:00 PM'}] } },
      { type: 'counters', data: { heading: 'Event Stats', items: [{number:'5000+',label:'Attendees'},{number:'50+',label:'Speakers'},{number:'30+',label:'Workshops'},{number:'20+',label:'Sponsors'}] } },
      { type: 'services', data: { heading: 'What to Expect', items: [{title:'Workshops',desc:'Hands-on sessions with expert instructors'},{title:'Talks',desc:'Inspiring keynotes from industry leaders'},{title:'Networking',desc:'Connect with 5000+ professionals'},{title:'After Party',desc:'Celebrate with live music and drinks'}] } },
      { type: 'pricing', data: { heading: 'Tickets', plans: [{name:'Early Bird',price:'$99',features:['All Sessions','Lunch Included','Goodie Bag']},{name:'VIP',price:'$299',features:['All Sessions','Backstage Access','Dinner','Meet & Greet']}] } },
      { type: 'contact', data: { heading: 'Questions?', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#7c3aed', font: 'Inter' },
    seo: { title: 'Tech Conference 2026', description: 'Annual tech conference for developers' }
  },
  {
    id: 'form', name: 'Contact Form', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>', category: 'other',
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
    id: 'blog', name: 'Blog & News', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M15.5 3.5 21 9l-9 9H3v-9Z"/></svg>', category: 'personal',
    desc: 'Personal blog or magazine layout',
    sections: [
      { type: 'hero', data: { heading: 'My Blog', description: 'Thoughts, stories, and ideas on technology and design.', image: '' } },
      { type: 'about', data: { heading: 'About the Author', content: 'Writer, developer, and lifelong learner. I share my thoughts on technology, design, and life.' } },
      { type: 'blog', data: { heading: 'Recent Articles', items: [{title:'Building Modern Web Apps',excerpt:'A guide to modern web development tools and practices in 2026.',date:'Mar 10, 2026'},{title:'UX Design Principles',excerpt:'Essential UX principles every designer should know.',date:'Feb 28, 2026'},{title:'The Future of AI',excerpt:'How artificial intelligence is shaping the tech industry.',date:'Feb 15, 2026'},{title:'CSS Tips & Tricks',excerpt:'Advanced CSS techniques for better layouts.',date:'Jan 30, 2026'}] } },
      { type: 'services', data: { heading: 'Topics', items: [{title:'Technology',desc:'Latest trends and tutorials in tech'},{title:'Design',desc:'UI/UX tips and design inspiration'},{title:'Business',desc:'Startup advice and business growth'}] } },
      { type: 'testimonials', data: { heading: 'Reader Reviews', items: [{name:'David Lee',text:'Incredible blog! Always find useful content here.',role:'Subscriber'},{name:'Maria Garcia',text:'Clear, concise, and very informative. Keep it up!',role:'Developer'}] } },
      { type: 'contact', data: { heading: 'Subscribe', email: '', phone: '', address: '' } },
      { type: 'footer', data: { copyright: '© 2026 My Blog. All rights reserved.', text: 'Powered by Site Flow' } }
    ],
    theme: { color: '#ea580c', font: 'Georgia' },
    seo: { title: 'My Blog', description: 'Technology and design blog' }
  },
  {
    id: 'store', name: 'Online Store', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>', category: 'business',
    desc: 'E-commerce product showcase',
    sections: [
      { type: 'hero', data: { heading: 'Our Store', description: 'Discover amazing products at great prices.', image: '' } },
      { type: 'services', data: { heading: 'Why Shop With Us', items: [{title:'Free Shipping',desc:'On orders over $50'},{title:'Easy Returns',desc:'30-day return policy'},{title:'24/7 Support',desc:'Always here to help'},{title:'Secure Checkout',desc:'SSL encrypted payments'}] } },
      { type: 'portfolio', data: { heading: 'Featured Products', items: [{title:'Product One',desc:'Premium quality item',image:''},{title:'Product Two',desc:'Best-selling product',image:''},{title:'Product Three',desc:'New arrival',image:''}] } },
      { type: 'pricing', data: { heading: 'Best Sellers', plans: [{name:'Basic Pack',price:'$29',features:['1 Product','Basic Support','30-day Guarantee']},{name:'Premium Pack',price:'$79',features:['3 Products','Priority Support','Free Shipping','Bonus Gift']}] } },
      { type: 'testimonials', data: { heading: 'Customer Reviews', items: [{name:'Sarah K.',text:'Amazing quality! Fast shipping too!',role:'Verified Buyer'},{name:'James R.',text:'My go-to store for everything.',role:'VIP Customer'}] } },
      { type: 'faq', data: { heading: 'FAQ', items: [{q:'How long does shipping take?',a:'3-5 business days domestically.'},{q:'What is your return policy?',a:'30-day no-questions-asked returns.'}] } },
      { type: 'contact', data: { heading: 'Contact Us', email: '', phone: '', address: '' } }
    ],
    theme: { color: '#e11d48', font: 'Inter' },
    seo: { title: 'Our Store', description: 'Premium online store' }
  },
  {
    id: 'blank', name: 'Blank Canvas', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="40" height="40"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>', category: 'other',
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
