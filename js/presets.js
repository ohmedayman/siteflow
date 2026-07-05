/**
 * Site Flow — Templates & Presets for site creation wizard
 */
const PRESETS = [
  {
    id: 'personal', name: 'Personal Portfolio', icon: '👤',
    desc: 'Showcase your work, skills, and experience',
    sections: [
      { type: 'hero', data: { heading: 'John Doe', description: 'Creative Developer & Designer. I build digital experiences that matter.', image: '' } },
      { type: 'about', data: { heading: 'About Me', content: 'I am a passionate creator with 5+ years of experience in web development and design. I love turning ideas into reality.' } },
      { type: 'services', data: { heading: 'What I Do', items: [{title:'Web Development',desc:'Building modern, responsive websites with clean code.'},{title:'UI/UX Design',desc:'Creating beautiful, user-friendly interfaces.'},{title:'Mobile Apps',desc:'Cross-platform mobile applications.'}] } },
      { type: 'testimonials', data: { heading: 'What People Say', items: [{name:'Ahmed',text:'Amazing work! Highly recommended.',role:'CEO, TechCorp'},{name:'Sara',text:'Professional and delivered on time.',role:'Marketing Director'}] } },
      { type: 'gallery', data: { heading: 'My Work', images: [] } },
      { type: 'contact', data: { heading: 'Get In Touch', email: 'hello@example.com', phone: '', address: '' } }
    ],
    theme: { color: '#6366f1', font: 'Inter' },
    seo: { title: 'Portfolio', description: 'Creative portfolio showcasing work and skills' }
  },
  {
    id: 'business', name: 'Business Site', icon: '🏢',
    desc: 'Professional presence for your company',
    sections: [
      { type: 'hero', data: { heading: 'Your Company', description: 'We deliver exceptional solutions for modern businesses. Innovation meets excellence.', image: '' } },
      { type: 'about', data: { heading: 'About Us', content: 'We are a team of dedicated professionals committed to delivering the best results for our clients.' } },
      { type: 'services', data: { heading: 'Our Services', items: [{title:'Consulting',desc:'Strategic business consulting for growth.'},{title:'Development',desc:'Custom software development solutions.'},{title:'Marketing',desc:'Digital marketing and brand strategy.'}] } },
      { type: 'pricing', data: { heading: 'Our Plans', plans: [{name:'Basic',price:'$29',features:['1 User','10 Projects','Email Support']},{name:'Pro',price:'$79',features:['5 Users','50 Projects','Priority Support','Analytics']},{name:'Enterprise',price:'$199',features:['Unlimited Users','Unlimited Projects','24/7 Support','Custom Integrations']}] } },
      { type: 'testimonials', data: { heading: 'Client Reviews', items: [{name:'Omar',text:'Best service we have ever used!',role:'CTO, StartupX'},{name:'Nour',text:'Transformed our business completely.',role:'Founder, GrowCo'}] } },
      { type: 'faq', data: { heading: 'FAQ', items: [{q:'How do I get started?',a:'Simply sign up and choose a plan that suits your needs.'},{q:'Do you offer refunds?',a:'Yes, we offer a 30-day money-back guarantee.'},{q:'Can I change my plan later?',a:'Yes, you can upgrade or downgrade at any time.'}] } },
      { type: 'contact', data: { heading: 'Contact Us', email: 'info@company.com', phone: '+1 234 567 890', address: '123 Business St, City' } }
    ],
    theme: { color: '#059669', font: 'Inter' },
    seo: { title: 'Business Site', description: 'Professional business website' }
  },
  {
    id: 'restaurant', name: 'Restaurant / Menu', icon: '🍽️',
    desc: 'Digital menu, gallery, and reservations',
    sections: [
      { type: 'hero', data: { heading: 'Delicious Food', description: 'Experience authentic flavors crafted with passion. Fresh ingredients, amazing taste.', image: '' } },
      { type: 'about', data: { heading: 'Our Story', content: 'Founded in 2010, we have been serving the community with love and dedication. Every dish tells a story.' } },
      { type: 'gallery', data: { heading: 'Our Menu', images: [] } },
      { type: 'contact', data: { heading: 'Make a Reservation', email: 'reserve@restaurant.com', phone: '+1 234 567 890', address: '456 Food Ave, City' } }
    ],
    theme: { color: '#d97706', font: 'Merriweather' },
    seo: { title: 'Restaurant', description: 'Restaurant menu and reservations' }
  },
  {
    id: 'photography', name: 'Photo Gallery', icon: '📸',
    desc: 'Beautiful image showcase portfolio',
    sections: [
      { type: 'hero', data: { heading: 'Capturing Moments', description: 'Professional photography that tells your story. Every picture has a thousand words.', image: '' } },
      { type: 'about', data: { heading: 'My Approach', content: 'I believe in capturing authentic moments. My work spans weddings, portraits, and commercial photography.' } },
      { type: 'gallery', data: { heading: 'Portfolio', images: [] } },
      { type: 'contact', data: { heading: 'Book a Session', email: 'photo@example.com', phone: '+1 234 567 890', address: '' } }
    ],
    theme: { color: '#0f172a', font: 'Georgia' },
    seo: { title: 'Photography Portfolio', description: 'Professional photography services and portfolio' }
  },
  {
    id: 'event', name: 'Event / Wedding', icon: '🎉',
    desc: 'Event details, gallery, and RSVP',
    sections: [
      { type: 'hero', data: { heading: 'Save The Date', description: 'Join us for a celebration of love and joy. Your presence is the greatest gift.', image: '' } },
      { type: 'about', data: { heading: 'The Event', content: 'We are excited to celebrate this special day with our family and friends. Details and schedule below.' } },
      { type: 'gallery', data: { heading: 'Gallery', images: [] } },
      { type: 'contact', data: { heading: 'RSVP', email: 'rsvp@example.com', phone: '', address: '789 Celebration Rd, City' } }
    ],
    theme: { color: '#ec4899', font: 'Georgia' },
    seo: { title: 'Event', description: 'Event details and RSVP' }
  },
  {
    id: 'form', name: 'Form / Survey', icon: '📋',
    desc: 'Contact form, feedback, data collection',
    sections: [
      { type: 'hero', data: { heading: 'Share Your Feedback', description: 'We value your opinion. Fill out the form below and help us improve.', image: '' } },
      { type: 'about', data: { heading: 'Why Your Feedback Matters', content: 'Your input helps us serve you better. Every response is carefully reviewed by our team.' } },
      { type: 'contact', data: { heading: 'Contact Form', email: 'feedback@example.com', phone: '', address: '' } }
    ],
    theme: { color: '#3b82f6', font: 'Inter' },
    seo: { title: 'Feedback Form', description: 'Share your feedback with us' }
  },
  {
    id: 'blog', name: 'Blog / Articles', icon: '📝',
    desc: 'Share your thoughts and stories',
    sections: [
      { type: 'hero', data: { heading: 'My Blog', description: 'Thoughts, ideas, and stories. Join me on this journey of discovery.', image: '' } },
      { type: 'about', data: { heading: 'About This Blog', content: 'A space where I share my thoughts on technology, design, and life. New articles every week.' } },
      { type: 'gallery', data: { heading: 'Featured Posts', images: [] } },
      { type: 'contact', data: { heading: 'Subscribe', email: 'blog@example.com', phone: '', address: '' } }
    ],
    theme: { color: '#8b5cf6', font: 'Inter' },
    seo: { title: 'Blog', description: 'Personal blog about technology and life' }
  },
  {
    id: 'blank', name: 'Blank Canvas', icon: '🎨',
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
