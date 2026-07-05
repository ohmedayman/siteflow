/* Site Flow — 500+ Template Definitions */
/* Generated template data for all categories */

const TEMPLATE_DATA = (() => {
  const C = {
    business: { icon: 'briefcase', color: '#1e40af', font: 'Inter' },
    food: { icon: 'utensils', color: '#dc2626', font: 'Playfair Display' },
    health: { icon: 'heart', color: '#059669', font: 'Inter' },
    fitness: { icon: 'zap', color: '#ea580c', font: 'Montserrat' },
    beauty: { icon: 'sparkles', color: '#db2777', font: 'Cormorant Garamond' },
    realestate: { icon: 'building', color: '#0f766e', font: 'Inter' },
    tech: { icon: 'code', color: '#6366f1', font: 'JetBrains Mono' },
    education: { icon: 'book', color: '#2563eb', font: 'Merriweather' },
    travel: { icon: 'globe', color: '#0891b2', font: 'Poppins' },
    creative: { icon: 'image', color: '#9333ea', font: 'Cormorant Garamond' },
    legal: { icon: 'scale', color: '#1e293b', font: 'Libre Baskerville' },
    automotive: { icon: 'car', color: '#374151', font: 'Inter' },
    home: { icon: 'home', color: '#059669', font: 'Inter' },
    events: { icon: 'calendar', color: '#e11d48', font: 'Playfair Display' },
    agriculture: { icon: 'leaf', color: '#16a34a', font: 'Merriweather' },
    retail: { icon: 'bag', color: '#7c3aed', font: 'Inter' },
    media: { icon: 'mic', color: '#dc2626', font: 'Inter' },
    nonprofit: { icon: 'heart', color: '#059669', font: 'Poppins' },
    science: { icon: 'flask', color: '#2563eb', font: 'Inter' },
    manufacturing: { icon: 'factory', color: '#475569', font: 'Inter' },
    logistics: { icon: 'truck', color: '#0369a1', font: 'Inter' },
    sports: { icon: 'trophy', color: '#15803d', font: 'Montserrat' },
    arts: { icon: 'palette', color: '#9333ea', font: 'Cormorant Garamond' },
    coaching: { icon: 'target', color: '#ea580c', font: 'Inter' },
    luxury: { icon: 'crown', color: '#1e293b', font: 'Cormorant Garamond' },
    eco: { icon: 'leaf', color: '#16a34a', font: 'Merriweather' },
    kids: { icon: 'smile', color: '#f59e0b', font: 'Nunito' },
    pet: { icon: 'paw', color: '#7c3aed', font: 'Inter' },
    music: { icon: 'music', color: '#7c3aed', font: 'Poppins' },
    photography: { icon: 'camera', color: '#1e293b', font: 'Inter' }
  };

  const SEC = {
    hero: (h, p, img) => [{ type: 'hero', data: { heading: h, description: p, image: img || '' } }],
    about: (h, p) => [{ type: 'about', data: { heading: h, content: p } }],
    features: (h, items) => [{ type: 'features', data: { heading: h, items } }],
    services: (h, items) => [{ type: 'services', data: { heading: h, items } }],
    pricing: (h, plans) => [{ type: 'pricing', data: { heading: h, plans } }],
    testimonials: (h, items) => [{ type: 'testimonials', data: { heading: h, items } }],
    faq: (h, items) => [{ type: 'faq', data: { heading: h, items } }],
    gallery: (h, imgs) => [{ type: 'gallery', data: { heading: h, images: imgs || [] } }],
    contact: (h) => [{ type: 'contact', data: { heading: h } }],
    team: (h, items) => [{ type: 'team', data: { heading: h, items } }],
    counters: (h, items) => [{ type: 'counters', data: { heading: h, items } }],
    stats: (h, items) => [{ type: 'stats', data: { heading: h, items } }],
    cta: (h, sub) => [{ type: 'cta', data: { heading: h, subheading: sub || '', buttonText: 'Get Started', buttonUrl: '#' } }],
    blog: (h, items) => [{ type: 'blog', data: { heading: h, items } }],
    portfolio: (h, items) => [{ type: 'portfolio', data: { heading: h, items } }],
    timeline: (h, items) => [{ type: 'timeline', data: { heading: h, items } }],
    menu: (h, items) => [{ type: 'menu', data: { heading: h, items } }],
    location: (h, addr, phone, hrs) => [{ type: 'location', data: { heading: h, address: addr || '', phone: phone || '', hours: hrs || '' } }],
    footer: (copy) => [{ type: 'footer', data: { copyright: copy || '© 2026 All rights reserved.', text: 'Powered by Site Flow' } }]
  };

  function S(sections) { return sections.flat(); }

  const templates = [];

  function add(cat, sub, name, desc, sections) {
    const c = C[cat] || C.business;
    const iconSvg = ICONS[c.icon] || ICONS.globe;
    templates.push({
      id: cat + '-' + sub,
      name: name,
      desc: desc,
      icon: iconSvg,
      category: cat,
      theme: { color: c.color, font: c.font, icon: c.icon },
      sections: sections
    });
  }

  /* ======================== BUSINESS & CORPORATE ======================== */
  add('business','agency','Digital Agency','Full-service digital marketing agency',S([
    SEC.hero('We Build Digital Experiences','Strategy, design, and technology for brands that want to lead.'),
    SEC.services('Our Services',[{title:'Web Design',desc:'Custom websites that convert visitors into customers.'},{title:'SEO',desc:'Rank higher on Google with data-driven optimization.'},{title:'Social Media',desc:'Engage your audience across all platforms.'},{title:'PPC Advertising',desc:'Targeted ads that deliver measurable ROI.'}]),
    SEC.testimonials('What Clients Say',[{text:'They transformed our online presence completely.',name:'Sarah Johnson',role:'CEO, TechStart'},{text:'Best marketing investment we ever made.',name:'Mike Chen',role:'Founder, GrowthCo'},{text:'Professional, creative, and results-driven.',name:'Emma Davis',role:'CMO, BrandX'}]),
    SEC.counters('Our Results',[{number:'200+',label:'Projects Done'},{number:'98%',label:'Client Satisfaction'},{number:'50+',label:'Team Members'},{number:'15+',label:'Years Experience'}]),
    SEC.cta('Ready to Grow Your Brand?','Let us help you stand out in the digital landscape.'),
    SEC.footer()
  ]));

  add('business','consulting','Management Consulting','Strategic business consulting firm',S([
    SEC.hero('Strategic Solutions for Complex Challenges','We help organizations navigate change and achieve sustainable growth.'),
    SEC.services('Our Expertise',[{title:'Strategy',desc:'Develop winning strategies for market leadership.'},{title:'Operations',desc:'Optimize processes and reduce costs.'},{title:'Digital',desc:'Transform your business with technology.'},{title:'People',desc:'Build high-performing teams and culture.'}]),
    SEC.testimonials('Client Success Stories',[{text:'Their strategy helped us double revenue in 18 months.',name:'David Kim',role:'CEO, InnovateCo'},{text:'Invaluable insights that changed our trajectory.',name:'Lisa Wang',role:'Director, GlobalTech'}]),
    SEC.cta('Let\'s Transform Your Business','Schedule a free consultation today.'),
    SEC.footer()
  ]));

  add('business','startup','Startup Landing','Modern startup landing page',S([
    SEC.hero('The Future of [Industry]','We\'re building the tools that help teams ship faster.'),
    SEC.features('Why Choose Us',[{title:'Lightning Fast',desc:'Built for speed from day one.'},{title:'Scale Infinitely',desc:'From 1 to 1 million users.'},{title:'Developer First',desc:'APIs and tools developers love.'}]),
    SEC.counters('Traction',[{number:'10K+',label:'Active Users'},{number:'$2M',label:'ARR'},{number:'99.9%',label:'Uptime'},{number:'4.9★',label:'Rating'}]),
    SEC.cta('Start Free Today','No credit card required. Cancel anytime.'),
    SEC.footer()
  ]));

  add('business','corporate','Corporate Site','Professional corporate website',S([
    SEC.hero('Building Tomorrow\'s Solutions','Global leader in innovation and technology.'),
    SEC.about('About Us','We are a Fortune 500 company dedicated to advancing technology for the benefit of humanity. With operations in 50+ countries, our team of 10,000+ employees works tirelessly to solve the world\'s most pressing challenges.'),
    SEC.features('Our Divisions',[{title:'Technology',desc:'Cutting-edge software and hardware solutions.'},{title:'Research',desc:'Pioneering research in AI and quantum computing.'},{title:'Sustainability',desc:'Committed to carbon-neutral operations by 2030.'}]),
    SEC.testimonials('Industry Recognition',[{text:'A true leader in corporate innovation.',name:'Forbes Magazine'},{text:'Setting the standard for excellence.',name:'Harvard Business Review'}]),
    SEC.footer()
  ]));

  add('business','saas','SaaS Platform','Software as a Service product page',S([
    SEC.hero('One Platform. Infinite Possibilities.','The all-in-one software your team needs to collaborate and ship faster.'),
    SEC.features('Core Features',[{title:'Real-time Collaboration',desc:'Work together seamlessly in real-time.'},{title:'Analytics Dashboard',desc:'Track everything with beautiful visualizations.'},{title:'API Access',desc:'Integrate with your existing tools effortlessly.'},{title:'Automations',desc:'Automate repetitive workflows in minutes.'}]),
    SEC.pricing('Simple Pricing',[{name:'Starter',price:'$9/mo',features:['5 users','10GB storage','Email support']},{name:'Pro',price:'$29/mo',features:['25 users','100GB storage','Priority support','API access']},{name:'Enterprise',price:'Custom',features:['Unlimited users','Unlimited storage','Dedicated support','Custom integrations']}]),
    SEC.testimonials('Trusted by Teams Worldwide',[{text:'Reduced our workflow time by 60%.',name:'Alex Rivera',role:'CTO, FastShip'},{text:'The best tool investment we\'ve made.',name:'Jordan Lee',role:'PM, ScaleUp'}]),
    SEC.cta('Start Your Free Trial','14-day free trial. No credit card required.'),
    SEC.footer()
  ]));

  add('business','marketing','Marketing Agency','Creative marketing and advertising agency',S([
    SEC.hero('Make Your Brand Unforgettable','We create campaigns that drive results and build lasting brand equity.'),
    SEC.services('What We Do',[{title:'Brand Strategy',desc:'Define your brand story and positioning.'},{title:'Content Marketing',desc:'Create content that engages and converts.'},{title:'Paid Media',desc:'Maximize ROI across all ad channels.'},{title:'Analytics',desc:'Data-driven decisions for better outcomes.'}]),
    SEC.portfolio('Our Work',[{title:'Brand Refresh — TechCo',desc:'Complete rebrand for a SaaS startup'},{title:'Campaign — FoodBrand',desc:'Social media campaign reaching 2M users'},{title:'Launch — AppX',desc:'Product launch generating 50K signups'}]),
    SEC.cta('Let\'s Create Something Great','Contact us for a free strategy session.'),
    SEC.footer()
  ]));

  add('business','coworking','Coworking Space','Modern coworking and flexible office space',S([
    SEC.hero('Work. Collaborate. Thrive.','Flexible workspace for modern professionals.'),
    SEC.features('Space Features',[{title:'Hot Desks',desc:'Drop in and work from anywhere.'},{title:'Private Offices',desc:'Dedicated spaces for focused work.'},{title:'Meeting Rooms',desc:'Professional meeting rooms on demand.'},{title:'Community',desc:'Network with 500+ members.'}]),
    SEC.pricing('Membership Plans',[{name:'Flex',price:'$199/mo',features:['Hot desk access','WiFi & coffee','Community events']},{name:'Dedicated',price:'$399/mo',features:['Personal desk','Lockable storage','10 meeting hrs']},{name:'Private',price:'$799/mo',features:['Private office','24/7 access','Custom branding']}]),
    SEC.location('Visit Us','123 Business Ave, New York, NY 10001','+1 (555) 123-4567','Mon-Fri 8AM-8PM'),
    SEC.footer()
  ]));

  add('business','recruitment','Recruitment Agency','Professional staffing and recruitment',S([
    SEC.hero('Find Your Perfect Hire','We connect top talent with leading companies.'),
    SEC.services('Recruitment Solutions',[{title:'Executive Search',desc:'C-suite and senior leadership placement.'},{title:'Technical Recruiting',desc:'Engineers, developers, and IT professionals.'},{title:'Permanent Placement',desc:'Full-time hires across all industries.'},{title:'Contract Staffing',desc:'Flexible workforce solutions.'}]),
    SEC.counters('Track Record',[{number:'5000+',label:'Placements Made'},{number:'95%',label:'Retention Rate'},{number:'30 Days',label:'Average Time-to-Hire'},{number:'200+',label:'Client Companies'}]),
    SEC.cta('Hire Top Talent Today','Submit your job requirements and we\'ll get started.'),
    SEC.footer()
  ]));

  /* ======================== FOOD & DRINK ======================== */
  add('food','restaurant','Restaurant','Elegant restaurant website',S([
    SEC.hero('Fine Dining Experience','Exquisite cuisine crafted with passion and the finest ingredients.'),
    SEC.menu('Our Menu',[{title:'Bruschetta',desc:'Toasted bread with fresh tomatoes and basil',price:'$12',category:'Starters'},{title:'Caesar Salad',desc:'Romaine lettuce, parmesan, croutons',price:'$14',category:'Starters'},{title:'Grilled Salmon',desc:'Atlantic salmon with lemon butter sauce',price:'$28',category:'Mains'},{title:'Filet Mignon',desc:'8oz prime beef with truffle mash',price:'$42',category:'Mains'},{title:'Tiramisu',desc:'Classic Italian coffee-flavored dessert',price:'$12',category:'Desserts'},{title:'Crème Brûlée',desc:'Vanilla custard with caramelized sugar',price:'$10',category:'Desserts'}]),
    SEC.about('Our Story','Founded in 2010, our kitchen has been serving exquisite cuisine that blends traditional techniques with modern innovation. Every dish tells a story of passion, quality, and dedication to the culinary arts.'),
    SEC.testimonials('Guest Reviews',[{text:'An unforgettable dining experience. The salmon was perfect.',name:'Jennifer M.'},{text:'Best restaurant in the city. Every visit is special.',name:'Robert K.'},{text:'The atmosphere and food are both 10/10.',name:'Amanda S.'}]),
    SEC.location('Find Us','456 Gourmet Lane, New York, NY 10002','+1 (555) 987-6543','Tue-Sun 5PM-11PM'),
    SEC.footer('© 2026 All rights reserved.')
  ]));

  add('food','cafe','Coffee Cozy Cafe','Warm and inviting coffee shop',S([
    SEC.hero('Freshly Brewed Happiness','Specialty coffee, fresh pastries, and a cozy atmosphere.'),
    SEC.menu('Our Offerings',[{title:'Espresso',desc:'Rich, bold single-origin espresso',price:'$4',category:'Coffee'},{title:'Cappuccino',desc:'Classic Italian with steamed milk foam',price:'$5',category:'Coffee'},{title:'Matcha Latte',desc:'Ceremonial grade matcha with oat milk',price:'$6',category:'Specialty'},{title:'Croissant',desc:'Buttery, flaky, freshly baked',price:'$4',category:'Pastries'},{title:'Avocado Toast',desc:'Sourdough with smashed avocado and eggs',price:'$12',category:'Food'},{title:'Blueberry Muffin',desc:'Bursting with fresh blueberries',price:'$5',category:'Pastries'}]),
    SEC.about('Our Story','We source our beans directly from farmers in Ethiopia, Colombia, and Guatemala. Every cup is freshly ground and carefully brewed to bring out the unique flavors of each origin.'),
    SEC.gallery('Our Space',[ ]),
    SEC.location('Come Visit Us','789 Brew Street, Brooklyn, NY 11201','+1 (555) 456-7890','Daily 7AM-9PM'),
    SEC.footer()
  ]));

  add('food','bakery','Artisan Bakery','Fresh baked goods daily',S([
    SEC.hero('Baked with Love Since 1985','Artisan breads, pastries, and cakes made fresh every morning.'),
    SEC.menu('Fresh From the Oven',[{title:'Sourdough Loaf',desc:'24-hour fermented, crusty and tangy',price:'$7',category:'Breads'},{title:'Chocolate Croissant',desc:'Flaky layers with Belgian chocolate',price:'$5',category:'Pastries'},{title:'Birthday Cake',desc:'Three-layer vanilla with buttercream',price:'$45',category:'Cakes'},{title:'Cinnamon Roll',desc:'Warm, gooey, topped with cream cheese',price:'$4',category:'Pastries'}]),
    SEC.about('Our Tradition','Three generations of bakers. We wake up at 3AM every day to ensure your breakfast is fresh and warm. No shortcuts, no preservatives — just honest baking.'),
    SEC.testimonials('Customer Love',[{text:'The best sourdough I\'ve ever had.',name:'Maria G.'},{text:'Our wedding cake was absolutely stunning.',name:'Tom & Lisa'}]),
    SEC.location('Visit Our Bakery','321 Flour Lane, Boston, MA 02101','+1 (555) 321-0987','Mon-Sat 6AM-6PM'),
    SEC.footer()
  ]));

  add('food','bar','Craft Cocktail Bar','Speakeasy-style cocktail bar',S([
    SEC.hero('Crafted Spirits. Curated Moments.','Where every cocktail tells a story.'),
    SEC.menu('Signature Cocktails',[{title:'Old Fashioned',desc:'Bourbon, bitters, orange peel',price:'$16',category:'Classics'},{title:'Espresso Martini',desc:'Vodka, Kahlúa, fresh espresso',price:'$17',category:'Signature'},{title:'Smoky Margarita',desc:'Mezcal, lime, agave, smoked salt',price:'$18',category:'Signature'},{title:'Gin & Tonic',desc:'Botanical gin, elderflower, cucumber',price:'$14',category:'Classics'}]),
    SEC.about('The Experience','Step behind the velvet curtain and discover a world of handcrafted cocktails, rare spirits, and intimate ambiance. Live jazz every Friday and Saturday.'),
    SEC.location('Find the Hidden Door','88 Speakeasy Ave, Chicago, IL 60601','+1 (555) 888-9999','Wed-Sat 8PM-2AM'),
    SEC.footer()
  ]));

  add('food','pizzeria','Neapolitan Pizzeria','Authentic Italian pizza',S([
    SEC.hero('Authentic Neapolitan Pizza','Wood-fired. Hand-tossed. Made with love.'),
    SEC.menu('Pizza Menu',[{title:'Margherita',desc:'San Marzano, mozzarella, basil',price:'$16',category:'Classic'},{title:'Diavola',desc:'Spicy salami, chili oil, mozzarella',price:'$18',category:'Classic'},{title:'Quattro Formaggi',desc:'Four cheese blend, truffle honey',price:'$19',category:'Specialty'},{title:'Prosciutto e Rucola',desc:'Parma ham, arugula, parmesan',price:'$20',category:'Specialty'}]),
    SEC.about('Our Oven','Our 900°F wood-fired oven was hand-built in Naples and shipped to America. It cooks each pizza in exactly 90 seconds — the way it\'s been done for 200 years.'),
    SEC.testimonials('Pizza Lovers',[{text:'The closest thing to Naples outside of Italy.',name:'Marco R.'},{text:'Our family\'s Friday night tradition.',name:'The Johnsons'}]),
    SEC.location('Come Eat','555 Pizza Row, Philadelphia, PA 19103','+1 (555) 555-1212','Daily 11AM-11PM'),
    SEC.footer()
  ]));

  add('food','sushi','Sushi Restaurant','Premium Japanese cuisine',S([
    SEC.hero('Omakase Experience','The art of sushi, perfected over generations.'),
    SEC.menu('Sushi Menu',[{title:'Salmon Nigiri',desc:'Fresh Atlantic salmon over seasoned rice',price:'$8',category:'Nigiri'},{title:'Dragon Roll',desc:'Eel, avocado, cucumber, unagi sauce',price:'$18',category:'Rolls'},{title:'Sashimi Platter',desc:'Chef\'s selection of 12 pieces',price:'$35',category:'Sashimi'},{title:'Chirashi Bowl',desc:'Assorted sashimi over sushi rice',price:'$28',category:'Bowls'}]),
    SEC.about('Our Chef','Chef Yamamoto trained for 15 years in Tokyo\'s finest sushi restaurants. His philosophy: respect the fish, honor the rice, and let simplicity speak.'),
    SEC.cta('Reserve Your Seat','Omakase counter seats are limited. Book now.'),
    SEC.footer()
  ]));

  add('food','vegan','Vegan Kitchen','Plant-based restaurant and cafe',S([
    SEC.hero('Plants Never Tasted This Good','100% plant-based. 100% delicious.'),
    SEC.menu('Plant-Based Menu',[{title:'Buddha Bowl',desc:'Quinoa, roasted veggies, tahini',price:'$15',category:'Bowls'},{title:'Jackfruit Tacos',desc:'Pulled jackfruit, avocado crema',price:'$14',category:'Mains'},{title:'Açaí Bowl',desc:'Açaí, granola, fresh berries',price:'$12',category:'Breakfast'},{title:'Vegan Burger',desc:'Black bean patty, vegan cheese, fries',price:'$16',category:'Mains'}]),
    SEC.about('Our Mission','We believe food can be delicious AND kind to the planet. All our ingredients are organic, locally sourced, and 100% plant-based.'),
    SEC.testimonials('Vegan Community',[{text:'Finally, vegan food that actually tastes amazing!',name:'Priya S.'},{text:'My non-vegan friends loved it too.',name:'Chris M.'}]),
    SEC.footer()
  ]));

  add('food','juice','Juice Bar','Fresh juices and smoothies',S([
    SEC.hero('Fresh Pressed. Pure Energy.','Cold-pressed juices and smoothies made to order.'),
    SEC.menu('Juice Menu',[{title:'Green Detox',desc:'Kale, apple, ginger, lemon',price:'$9',category:'Juices'},{title:'Berry Blast',desc:'Blueberry, strawberry, banana, almond milk',price:'$10',category:'Smoothies'},{title:'Tropical Sunrise',desc:'Mango, pineapple, coconut water',price:'$9',category:'Juices'},{title:'Protein Power',desc:'Peanut butter, banana, oat milk, whey',price:'$11',category:'Smoothies'}]),
    SEC.features('Why Us',[{title:'100% Cold-Pressed',desc:'No heat, no oxidation, maximum nutrients.'},{title:'No Added Sugar',desc:'Just pure fruit and vegetables.'},{title:'Organic Sources',desc:'Locally sourced from organic farms.'}]),
    SEC.location('Find Us','123 Health St, Miami, FL 33101','+1 (555) 222-3333','Daily 7AM-8PM'),
    SEC.footer()
  ]));

  add('food','coffee','Specialty Coffee','Third-wave coffee roasters',S([
    SEC.hero('From Origin to Cup','Single-origin specialty coffee, roasted in small batches.'),
    SEC.menu('Coffee Menu',[{title:'Pour Over',desc:'Hand-brewed, single-origin, clean and bright',price:'$6',category:'Brew Methods'},{title:'Cold Brew',desc:'24-hour steeped, smooth and bold',price:'$5',category:'Brew Methods'},{title:'Flat White',desc:'Double ristretto with velvety microfoam',price:'$5.50',category:'Espresso'},{title:'Ethiopian Yirgacheffe',desc:'Floral, citrus, berry notes, light roast',price:'$18/bag',category:'Beans'}]),
    SEC.about('Our Process','We work directly with farmers in 12 countries. Every batch is roasted in our Brooklyn micro-roastery to bring out its unique terroir.'),
    SEC.cta('Subscribe & Save','Get fresh beans delivered monthly. 15% off first order.'),
    SEC.footer()
  ]));

  add('food','catering','Catering Service','Professional event catering',S([
    SEC.hero('Every Event Deserves Great Food','Full-service catering for weddings, corporate events, and parties.'),
    SEC.services('Catering Services',[{title:'Weddings',desc:'Elegant plated or buffet service.'},{title:'Corporate',desc:'Lunch meetings, galas, and conferences.'},{title:'Private Parties',desc:'Birthdays, anniversaries, celebrations.'},{title:'Custom Menus',desc:'Tailored to your theme and dietary needs.'}]),
    SEC.pricing('Catering Packages',[{name:'Essentials',price:'$50/person',features:['3-course meal','Non-alcoholic beverages','Basic tableware']},{name:'Premium',price:'$85/person',features:['5-course meal','Full bar service','Premium tableware']},{name:'Luxury',price:'$150/person',features:['7-course tasting menu','Top-shelf bar','Custom decor']}]),
    SEC.testimonials('Happy Clients',[{text:'Our wedding guests couldn\'t stop raving about the food.',name:'Emily & James'},{text:'They made our corporate event truly special.',name:'Fortune 500 Company'}]),
    SEC.footer()
  ]));

  add('food','bbq','BBQ Smokehouse','Southern-style barbecue restaurant',S([
    SEC.hero('Low & Slow Since 1972','Authentic smoked barbecue. No shortcuts.'),
    SEC.menu('Smokehouse Menu',[{title:'Pulled Pork Sandwich',desc:'12-hour smoked pork, tangy slaw',price:'$14',category:'Sandwiches'},{title:'Beef Brisket',desc:'16-hour oak-smoked, sliced thick',price:'$22',category:'Plates'},{title:'Smoked Ribs',desc:'Fall-off-the-bone St. Louis style',price:'$26',category:'Plates'},{title:'Mac & Cheese',desc:'Three-cheese blend, breadcrumb crust',price:'$8',category:'Sides'}]),
    SEC.about('Our Pit','Our custom-built smoker uses post oak and hickory. We start smoking at 4AM every day. That\'s the secret — patience and good wood.'),
    SEC.footer()
  ]));

  add('food','seafood','Seafood House','Fresh seafood restaurant',S([
    SEC.hero('From the Ocean to Your Plate','The freshest seafood, prepared with care.'),
    SEC.menu('Seafood Menu',[{title:'Lobster Bisque',desc:'Rich, creamy, topped with lobster claw',price:'$14',category:'Starters'},{title:'Grilled Swordfish',desc:'Lemon caper butter, roasted vegetables',price:'$32',category:'Mains'},{title:'Seafood Platter',desc:'Oysters, shrimp, crab, lobster tail',price:'$65',category:'Sharing'},{title:'Fish & Chips',desc:'Beer-battered cod, hand-cut fries',price:'$18',category:'Classics'}]),
    SEC.about('Fresh Daily','Our fish comes in fresh every morning from the local harbor. If it\'s not fresh, it\'s not on the menu. Simple as that.'),
    SEC.footer()
  ]));

  add('food','winery','Wine Estate','Vineyard and winery',S([
    SEC.hero('Taste the Terroir','Estate wines crafted with patience and passion.'),
    SEC.menu('Wine Collection',[{title:'Chardonnay 2024',desc:'Buttery, oaky, with apple and citrus notes',price:'$35',category:'White'},{title:'Pinot Noir 2023',desc:'Light, elegant, cherry and earth',price:'$42',category:'Red'},{title:'Cabernet Sauvignon 2022',desc:'Bold, tannic, blackcurrant and cedar',price:'$55',category:'Red'},{title:'Rosé 2024',desc:'Crisp, refreshing, strawberry and floral',price:'$28',category:'Rosé'}]),
    SEC.about('Our Vineyard','Nestled in the rolling hills of Napa Valley, our 50-acre estate has been producing world-class wines since 1985.'),
    SEC.cta('Book a Tasting','Experience our wines in our beautiful tasting room.'),
    SEC.footer()
  ]));

  add('food','foodtruck','Food Truck','Street food on wheels',S([
    SEC.hero('Street Food Elevated','Gourmet flavors on the go. Find us on the move!'),
    SEC.menu('Street Food Menu',[{title:'Loaded Fries',desc:'Truffle fries, cheese, bacon, aioli',price:'$10',category:'Sides'},{title:'Korean BBQ Taco',desc:'Bulgogi, kimchi, gochujang mayo',price:'$12',category:'Tacos'},{title:'Pulled Pork Slider',desc:'Smoky pork, pickles, brioche bun',price:'$8',category:'Sliders'},{title:'Churros',desc:'Cinnamon sugar, chocolate dipping sauce',price:'$6',category:'Desserts'}]),
    SEC.features('Find Us',[{title:'Track Our Location',desc:'Check our social media for daily locations.'},{title:'Catering Available',desc:'Book us for your next event.'},{title:'Online Ordering',desc:'Pre-order and skip the line.'}]),
    SEC.location('Today\'s Location','Downtown Food Truck Park, Every Friday 11AM-3PM','',''),
    SEC.footer()
  ]));

  /* ======================== HEALTH & MEDICAL ======================== */
  add('health','clinic','Medical Clinic','Modern healthcare clinic',S([
    SEC.hero('Your Health, Our Priority','Comprehensive healthcare for the whole family.'),
    SEC.services('Medical Services',[{title:'Primary Care',desc:'Annual checkups, chronic disease management.'},{title:'Urgent Care',desc:'Walk-in appointments for immediate needs.'},{title:'Women\'s Health',desc:'Specialized care for women at every stage.'},{title:'Pediatrics',desc:'Caring for your little ones from birth.'}]),
    SEC.about('Our Practice','Board-certified physicians providing compassionate, evidence-based medicine. Accepting most insurance plans. Same-day appointments available.'),
    SEC.testimonials('Patient Reviews',[{text:'Dr. Smith is the most thorough doctor I\'ve ever seen.',name:'Patricia W.'},{text:'The staff is friendly and the wait times are short.',name:'James T.'}]),
    SEC.location('Our Locations','100 Health Center Dr, Suite 200, Denver, CO 80202','+1 (303) 555-0100','Mon-Fri 8AM-6PM, Sat 9AM-1PM'),
    SEC.footer()
  ]));

  add('health','dental','Dental Practice','Family dental clinic',S([
    SEC.hero('Your Smile Is Our Passion','Gentle dental care for the whole family.'),
    SEC.services('Dental Services',[{title:'Cleanings',desc:'Professional hygiene and preventive care.'},{title:'Cosmetic',desc:'Whitening, veneers, smile makeovers.'},{title:'Orthodontics',desc:'Invisalign and traditional braces.'},{title:'Implants',desc:'Permanent tooth replacement solutions.'}]),
    SEC.about('Meet Dr. Anderson','With 20 years of experience and a gentle touch, Dr. Anderson and our team are committed to making every visit comfortable.'),
    SEC.testimonials('Smile Stories',[{text:'I actually look forward to the dentist now!',name:'Michelle R.'},{text:'My kids love coming here. That says it all.',name:'David L.'}]),
    SEC.cta('Book Your Appointment','New patients welcome. Same-day emergencies accepted.'),
    SEC.footer()
  ]));

  add('health','pharmacy','Pharmacy','Modern pharmacy and wellness',S([
    SEC.hero('Health & Wellness, Delivered','Your trusted neighborhood pharmacy.'),
    SEC.services('Services',[{title:'Prescriptions',desc:'Fast, accurate prescription filling.'},{title:'Vaccinations',desc:'Flu shots, COVID boosters, and more.'},{title:'Health Screenings',desc:'Blood pressure, glucose, cholesterol.'},{title:'Delivery',desc:'Free delivery within 5 miles.'}]),
    SEC.features('Why Choose Us',[{title:'Same-Day Refills',desc:'Most prescriptions ready in 15 minutes.'},{title:'Insurance Accepted',desc:'We work with all major insurance plans.'},{title:'Pharmacist Consultations',desc:'One-on-one medication reviews.'}]),
    SEC.location('Visit Us','200 Wellness Blvd, Portland, OR 97201','+1 (503) 555-0200','Mon-Sat 8AM-9PM, Sun 10AM-6PM'),
    SEC.footer()
  ]));

  add('health','wellness','Wellness Center','Holistic health and wellness',S([
    SEC.hero('Balance. Harmony. Wellness.','Holistic approaches to health and well-being.'),
    SEC.services('Wellness Programs',[{title:'Acupuncture',desc:'Ancient techniques for modern ailments.'},{title:'Massage Therapy',desc:'Deep tissue, Swedish, and sports massage.'},{title:'Nutrition Counseling',desc:'Personalized dietary guidance.'},{title:'Meditation',desc:'Guided sessions for stress relief.'}]),
    SEC.pricing('Wellness Plans',[{name:'Single Session',price:'$80',features:['One treatment','60 minutes']},{name:'Monthly',price:'$249/mo',features:['4 sessions','Priority booking','10% off products']},{name:'Annual',price:'$2,400/yr',features:['Unlimited sessions','Free consultations','20% off products']}]),
    SEC.testimonials('Transformations',[{text:'The acupuncture sessions changed my life.',name:'Nina P.'},{text:'I feel 10 years younger after 3 months here.',name:'George H.'}]),
    SEC.footer()
  ]));

  add('health','vet','Veterinary Clinic','Compassionate pet healthcare',S([
    SEC.hero('Caring for Your Furry Family','Comprehensive veterinary care with love.'),
    SEC.services('Pet Services',[{title:'Wellness Exams',desc:'Annual checkups and preventive care.'},{title:'Surgery',desc:'Safe, modern surgical procedures.'},{title:'Dental Care',desc:'Professional dental cleanings and repairs.'},{title:'Emergency',desc:'24/7 emergency care for urgent needs.'}]),
    SEC.about('Our Team','Our veterinarians and staff are passionate about animal health. We treat every pet as if it were our own.'),
    SEC.testimonials('Pet Parents Say',[{text:'They saved our dog\'s life. Forever grateful.',name:'The Miller Family'},{text:'The best vet clinic we\'ve ever been to.',name:'Cat Owner Sarah'}]),
    SEC.location('Visit Us','300 Animal Care Way, Austin, TX 78701','+1 (512) 555-0300','Mon-Sat 8AM-7PM, Emergency 24/7'),
    SEC.footer()
  ]));

  add('health','therapy','Physical Therapy','Rehabilitation and physical therapy',S([
    SEC.hero('Move Better. Live Better.','Expert physical therapy for pain recovery and prevention.'),
    SEC.services('Therapy Services',[{title:'Sports Rehab',desc:'Return to peak performance after injury.'},{title:'Post-Surgery',desc:'Guided recovery after surgical procedures.'},{title:'Chronic Pain',desc:'Evidence-based approaches to pain management.'},{title:'Manual Therapy',desc:'Hands-on techniques for joint and muscle issues.'}]),
    SEC.about('Our Approach','We don\'t just treat symptoms — we find the root cause. Every patient gets a personalized treatment plan.'),
    SEC.cta('Start Your Recovery','Book your evaluation today. Most insurance accepted.'),
    SEC.footer()
  ]));

  add('health','mental','Mental Health Practice','Counseling and therapy services',S([
    SEC.hero('Your Mental Health Matters','Safe, supportive space for healing and growth.'),
    SEC.services('Services',[{title:'Individual Therapy',desc:'One-on-one sessions for anxiety, depression, and more.'},{title:'Couples Counseling',desc:'Strengthen your relationship.'},{title:'Group Therapy',desc:'Shared healing in a supportive group setting.'},{title:'Online Sessions',desc:'Therapy from the comfort of your home.'}]),
    SEC.about('Our Therapists','Licensed professionals with specialized training. We use CBT, EMDR, ACT, and other evidence-based approaches.'),
    SEC.testimonials('Healing Journeys',[{text:'Therapy here changed my perspective on life.',name:'Anonymous'},{text:'Finally found someone who truly listens.',name:'Client'}]),
    SEC.cta('Book a Free Consultation','Take the first step toward better mental health.'),
    SEC.footer()
  ]));

  add('health','nutrition','Nutritionist','Diet and nutrition consulting',S([
    SEC.hero('Eat Right. Feel Great.','Personalized nutrition plans for your unique goals.'),
    SEC.services('Nutrition Services',[{title:'Weight Management',desc:'Sustainable approaches to healthy weight.'},{title:'Sports Nutrition',desc:'Fuel your athletic performance.'},{title:'Medical Nutrition',desc:'Diet plans for diabetes, heart health, and more.'},{title:'Meal Planning',desc:'Custom weekly meal plans and recipes.'}]),
    SEC.features('Our Approach',[{title:'Science-Based',desc:'Evidence-based nutrition advice, not fads.'},{title:'Personalized',desc:'Plans tailored to your body and lifestyle.'},{title:'Sustainable',desc:'No crash diets. Lasting lifestyle changes.'}]),
    SEC.cta('Start Your Nutrition Journey','Book your initial assessment today.'),
    SEC.footer()
  ]));

  /* ======================== FITNESS & SPORTS ======================== */
  add('fitness','gym','Modern Gym','Full-service fitness center',S([
    SEC.hero('Transform Your Body','State-of-the-art equipment. Expert trainers. Real results.'),
    SEC.features('Facilities',[{title:'200+ Machines',desc:'Latest cardio and strength equipment.'},{title:'Group Classes',desc:'50+ classes per week included.'},{title:'Personal Training',desc:'1-on-1 coaching for your goals.'},{title:'Recovery Zone',desc:'Sauna, steam room, and cold plunge.'}]),
    SEC.pricing('Membership',[{name:'Basic',price:'$29/mo',access:'Gym floor access',features:['Locker room','Free WiFi']},{name:'Plus',price:'$49/mo',access:'Full access',features:['All classes','Sauna & steam','Guest passes']},{name:'Elite',price:'$79/mo',access:'VIP access',features:['Personal trainer','Spa services','Priority booking']}]),
    SEC.testimonials('Member Stories',[{text:'Lost 30lbs in 6 months. Best decision ever.',name:'Mike T.'},{text:'The trainers here are world-class.',name:'Jessica L.'},{text:'I actually enjoy working out now.',name:'Chris P.'}]),
    SEC.location('Find Us','500 Fitness Ave, Los Angeles, CA 90001','+1 (213) 555-0500','Open 24/7'),
    SEC.footer()
  ]));

  add('fitness','yoga','Yoga Studio','Peaceful yoga and mindfulness studio',S([
    SEC.hero('Find Your Center','Yoga for every body. Every level. Every breath.'),
    SEC.services('Yoga Styles',[{title:'Vinyasa',desc:'Flowing sequences linked with breath.'},{title:'Hatha',desc:'Classic postures held with intention.'},{title:'Yin',desc:'Deep, passive stretching for flexibility.'},{title:'Restorative',desc:'Gentle healing through supported poses.'}]),
    SEC.pricing('Class Passes',[{name:'Drop-In',price:'$25',features:['Single class','Mat included']},{name:'10-Class',price:'$180',features:['Valid 3 months','Shareable']},{name:'Unlimited',price:'$129/mo',features:['All classes','Workshops included']}]),
    SEC.testimonials('Community',[{text:'This studio changed my relationship with myself.',name:'Amanda K.'},{text:'The instructors are so nurturing and skilled.',name:'David R.'}]),
    SEC.footer()
  ]));

  add('fitness','crossfit','CrossFit Box','High-intensity functional training',S([
    SEC.hero('Forged in Fitness','CrossFit training for all levels. No ego, just results.'),
    SEC.features('What We Offer',[{title:'WODs',desc:'Daily workouts that challenge you.'},{title:'On-Ramp',desc:'Beginner program to learn the basics.'},{title:'Competition',desc:'Train for the CrossFit Games.'},{title:'Community',desc:'The most supportive gym family.'}]),
    SEC.pricing('Membership',[{name:'3x/Week',price:'$149/mo',features:['3 classes per week','Open gym hours']},{name:'Unlimited',price:'$199/mo',features:['Unlimited classes','Priority class booking']},{name:'Drop-In',price:'$30',features:['Single class','Any location']}]),
    SEC.testimonials('Athletes',[{text:'Fittest I\'ve ever been at 45.',name:'Mark S.'},{text:'The community here is unmatched.',name:'Rachel W.'}]),
    SEC.footer()
  ]));

  add('fitness','martialarts','Martial Arts Academy','Training in various martial arts',S([
    SEC.hero('Discipline. Strength. Honor.','Master the art of self-defense and personal growth.'),
    SEC.services('Programs',[{title:'Brazilian Jiu-Jitsu',desc:'Ground fighting and submissions.'},{title:'Muay Thai',desc:'The art of eight limbs.'},{title:'Karate',desc:'Traditional striking and kata.'},{title:'Kids Programs',desc:'Building character through martial arts.'}]),
    SEC.pricing('Training Plans',[{name:'Beginner',price:'$99/mo',features:['2 classes/week','Uniform included']},{name:'All-Access',price:'$179/mo',features:['Unlimited classes','All disciplines']},{name:'Family',price:'$299/mo',features:['Up to 4 members','All programs']}]),
    SEC.testimonials('Students',[{text:'My confidence has skyrocketed since starting BJJ.',name:'Alex M.'},{text:'My kids have learned so much discipline.',name:'Parent, Lisa K.'}]),
    SEC.footer()
  ]));

  add('fitness','dance','Dance Studio','Professional dance instruction',S([
    SEC.hero('Express Yourself Through Dance','Classes for all ages and skill levels.'),
    SEC.services('Dance Styles',[{title:'Ballet',desc:'Classical technique and artistry.'},{title:'Hip Hop',desc:'Street dance and choreography.'},{title:'Latin',desc:'Salsa, bachata, and merengue.'},{title:'Contemporary',desc:'Expressive, fluid movement.'}]),
    SEC.features('Studio Features',[{title:'Spring Floor',desc:'Professional Marley floor with sprung base.'},{title:'Mirrors',desc:'Full-wall mirrors for form correction.'},{title:'Sound System',desc:'Studio-quality audio throughout.'},{title:'Recitals',desc:'Two showcases per year.'}]),
    SEC.cta('First Class Free','Come try any class on us. No experience needed.'),
    SEC.footer()
  ]));

  add('fitness','swimming','Swimming Academy','Learn to swim at any age',S([
    SEC.hero('Make a Splash','Professional swim instruction for all ages and abilities.'),
    SEC.services('Swim Programs',[{title:'Baby Swim',desc:'Parent-child classes from 6 months.'},{title:'Kids Lessons',desc:'Ages 3-12, beginner to advanced.'},{title:'Adult Lessons',desc:'It\'s never too late to learn.'},{title:'Lap Swimming',desc:'Dedicated lanes for fitness swimmers.'}]),
    SEC.features('Our Facility',[{title:'Heated Pool',desc:'86°F year-round temperature.'},{title:'Indoor Facility',desc:'Rain or shine, we\'re open.'},{title:'Small Classes',desc:'Max 6 students per instructor.'},{title:'Certified Staff',desc:'All instructors WSI certified.'}]),
    SEC.footer()
  ]));

  add('fitness','tennis','Tennis Club','Tennis courts and instruction',S([
    SEC.hero('Love-15. Love-30. Love-40. Game.','World-class tennis facilities and coaching.'),
    SEC.services('Tennis Programs',[{title:'Lessons',desc:'Private and group instruction.'},{title:'Court Rental',desc:'Indoor and outdoor courts.'},{title:'Leagues',desc:'Adult and junior competitive leagues.'},{title:'Camps',desc:'Summer and holiday tennis camps.'}]),
    SEC.pricing('Membership',[{name:'Court Access',price:'$50/hr',features:['Book up to 7 days ahead','Lights included']},{name:'Monthly',price:'$199/mo',features:['Unlimited court access','2 lessons/month']},{name:'Annual',price:'$1,800/yr',features:['All benefits','Tournament entry','Guest passes']}]),
    SEC.footer()
  ]));

  add('fitness','cycling','Cycling Studio','Indoor cycling and spin classes',S([
    SEC.hero('Ride. Sweat. Repeat.','High-energy indoor cycling classes.'),
    SEC.services('Classes',[{title:'Power Ride',desc:'Intervals, hills, and sprints.'},{title:'Endurance',desc:'45-minute steady-state ride.'},{title:'Rhythm',desc:'Ride to the beat of the music.'},{title:'Recovery',desc:'Cool-down and stretching.'}]),
    SEC.pricing('Ride Passes',[{name:'First Ride',price:'$0',features:['Free trial class','Shoe rental included']},{name:'10 Rides',price:'$200',features:['Valid 2 months','Bring a friend free']},{name:'Unlimited',price:'$159/mo',features:['All classes','Priority booking','Merch discounts']}]),
    SEC.cta('Your First Ride is Free','No commitment. Just show up and ride.'),
    SEC.footer()
  ]));

  add('fitness','running','Running Club','Community running group',S([
    SEC.hero('Run With Us','Community runs, training plans, and race prep.'),
    SEC.services('Running Programs',[{title:'5K Training',desc:'Couch to 5K in 8 weeks.'},{title:'Marathon Prep',desc:'16-week marathon training plan.'},{title:'Trail Running',desc:'Explore local trails with a group.'},{title:'Speed Work',desc:'Track sessions for faster times.'}]),
    SEC.features('Club Benefits',[{title:'Weekly Runs',desc:'Tuesday evening and Saturday morning runs.'},{title:'Coaching',desc:'Certified run coaches on every run.'},{title:'Gear Discounts',desc:'20% off at partner running stores.'},{title:'Race Entries',desc:'Discounted entry to local races.'}]),
    SEC.footer()
  ]));

  /* ======================== BEAUTY & FASHION ======================== */
  add('beauty','salon','Hair Salon','Modern hair salon and styling',S([
    SEC.hero('Look Good. Feel Good.','Expert cuts, color, and styling.'),
    SEC.services('Salon Services',[{title:'Haircut & Style',desc:'Precision cuts tailored to you.'},{title:'Color',desc:'Highlights, balayage, and full color.'},{title:'Treatments',desc:'Keratin, deep conditioning, and repair.'},{title:'Bridal',desc:'Special occasion styling.'}]),
    SEC.pricing('Price Menu',[{name:'Women\'s Cut',price:'$65',features:['Consultation','Wash & style']},{name:'Color',price:'$120+',features:['Single process, highlights, or balayage']},{name:'Blowout',price:'$45',features:['Wash, dry, and style']}]),
    SEC.testimonials('Client Love',[{text:'Best salon in the city. I won\'t go anywhere else!',name:'Jessica M.'},{text:'They really listen to what you want.',name:'Amanda R.'}]),
    SEC.location('Visit Us','123 Style Street, San Francisco, CA 94102','+1 (415) 555-0123','Tue-Sat 9AM-7PM'),
    SEC.footer()
  ]));

  add('beauty','barbershop','Barbershop','Classic and modern barbering',S([
    SEC.hero('Where Gentlemen Get Groomed','Classic cuts. Modern style. Old-school service.'),
    SEC.services('Barber Services',[{title:'Classic Haircut',desc:'Traditional cut with hot towel finish.'},{title:'Beard Trim',desc:'Precision shaping and conditioning.'},{title:'Hot Shave',desc:'Straight razor shave with warm lather.'},{title:'Kids Haircut',desc:'Fun, friendly cuts for little guys.'}]),
    SEC.pricing('Service Menu',[{name:'Haircut',price:'$35',features:['Cut, wash, style']},{name:'Beard',price:'$20',features:['Trim, shape, oil']},{name:'Combo',price:'$50',features:['Haircut + beard + hot towel']}]),
    SEC.testimonials('Regulars',[{text:'Been coming here for 5 years. Wouldn\'t trust anyone else.',name:'Mike D.'},{text:'The hot shave is an experience.',name:'Steve R.'}]),
    SEC.footer()
  ]));

  add('beauty','spa','Day Spa','Luxury spa and relaxation',S([
    SEC.hero('Escape. Relax. Renew.','A sanctuary of calm in the city.'),
    SEC.services('Spa Services',[{title:'Signature Massage',desc:'90 minutes of pure relaxation.'},{title:'Facial Treatment',desc:'Customized facial for your skin type.'},{title:'Body Wrap',desc:'Detoxifying and hydrating body treatment.'},{title:'Manicure & Pedicure',desc:'Complete nail care and pampering.'}]),
    SEC.pricing('Spa Packages',[{name:'Escape',price:'$150',features:['60-min massage','Classic facial']},{name:'Indulgence',price:'$250',features:['90-min massage','Deluxe facial','Mani/Pedi']},{name:'Ultimate',price:'$400',features:['Full day spa','All treatments','Lunch included']}]),
    SEC.testimonials('Blissful Reviews',[{text:'The most peaceful experience I\'ve ever had.',name:'Jennifer L.'},{text:'I left feeling like a new person.',name:'Mark S.'}]),
    SEC.footer()
  ]));

  add('beauty','nails','Nail Salon','Nail art and manicure studio',S([
    SEC.hero('Nail Art. Perfected.','Creative nail designs and flawless manicures.'),
    SEC.services('Nail Services',[{title:'Gel Manicure',desc:'Long-lasting, chip-free gel color.'},{title:'Acrylic Nails',desc:'Extensions and overlays.'},{title:'Nail Art',desc:'Custom designs, crystals, and foils.'},{title:'Spa Pedicure',desc:'Pedicure with massage and exfoliation.'}]),
    SEC.features('Why Us',[{title:'Hygiene First',desc:'Hospital-grade sterilization.'},{title:'Premium Products',desc:'Only OPI, CND, and Gelish.'},{title:'Creative Artists',desc:'Our nail techs are true artists.'},{title:'Relaxing Vibe',desc:'Complimentary drinks and music.'}]),
    SEC.footer()
  ]));

  add('beauty','fashion','Fashion Boutique','Curated fashion store',S([
    SEC.hero('Style. Curated.','Handpicked fashion for the modern woman.'),
    SEC.features('New Arrivals',[{title:'Summer Collection',desc:'Light, breezy pieces for the season.'},{title:'Designer Collaboration',desc:'Exclusive pieces from emerging designers.'},{title:'Sustainable Line',desc:'Eco-friendly fashion without compromise.'},{title:'Accessories',desc:'Complete your look with our curated accessories.'}]),
    SEC.about('Our Philosophy','We believe fashion should be personal, sustainable, and accessible. Every piece in our store is carefully selected for quality and style.'),
    SEC.testimonials('Fashionistas',[{text:'I get compliments every time I wear something from here.',name:'Olivia P.'},{text:'The styling advice is worth its weight in gold.',name:'Sophia M.'}]),
    SEC.footer()
  ]));

  add('beauty','jewelry','Jewelry Store','Fine jewelry and custom pieces',S([
    SEC.hero('Timeless Elegance','Exquisite jewelry for life\'s precious moments.'),
    SEC.features('Collections',[{title:'Engagement Rings',desc:'Handcrafted settings with GIA-certified diamonds.'},{title:'Wedding Bands',desc:'Matching bands for every style.'},{title:'Fine Jewelry',desc:'Necklaces, earrings, and bracelets.'},{title:'Custom Design',desc:'Bring your vision to life.'}]),
    SEC.about('Our Craft','Third-generation jewelers. Every piece is handcrafted in our workshop using ethically sourced stones and recycled metals.'),
    SEC.testimonials('Happy Customers',[{text:'My engagement ring is absolutely perfect.',name:'Rachel & Tom'},{text:'The custom necklace they made is my favorite piece.',name:'Diana K.'}]),
    SEC.footer()
  ]));

  add('beauty','skincare','Skincare Clinic','Professional skincare treatments',S([
    SEC.hero('Glow From Within','Advanced skincare treatments for radiant results.'),
    SEC.services('Treatments',[{title:'HydraFacial',desc:'Deep cleanse, extract, and hydrate.'},{title:'Chemical Peels',desc:'Resurface and renew your skin.'},{title:'Microneedling',desc:'Stimulate collagen production.'},{title:'LED Therapy',desc:'Anti-aging and acne treatment.'}]),
    SEC.features('Our Technology',[{title:'FDA-Approved',desc:'All devices are FDA-cleared.'},{title:'Custom Protocols',desc:'Treatment plans for your skin goals.'},{title:'Visible Results',desc:'See improvement after one session.'}]),
    SEC.cta('Book Your Consultation','Free skin analysis with every visit.'),
    SEC.footer()
  ]));

  add('beauty','makeup','Makeup Studio','Professional makeup artistry',S([
    SEC.hero('Be Your Own Muse','Professional makeup for every occasion.'),
    SEC.services('Makeup Services',[{title:'Bridal Makeup',desc:'Flawless, long-lasting bridal looks.'},{title:'Special Events',desc:'Red carpet, prom, and gala makeup.'},{title:'Editorial',desc:'Fashion and magazine editorial looks.'},{title:'Lessons',desc:'Learn professional techniques.'}]),
    SEC.pricing('Services',[{name:'Bridal',price:'$250',features:['Trial run','Day-of makeup','Touch-up kit']},{name:'Event',price:'$120',features:['Full face makeup','False lashes included']},{name:'Lesson',price:'$150',features:['2-hour session','Product recommendations']}]),
    SEC.footer()
  ]));

  /* ======================== REAL ESTATE ======================== */
  add('realestate','agent','Real Estate Agent','Professional real estate agent',S([
    SEC.hero('Find Your Dream Home','Expert guidance through every step of the buying process.'),
    SEC.features('Why Work With Me',[{title:'Local Expert',desc:'15 years in the local market.'},{title:'Negotiation Pro',desc:'Average save of $25K for buyers.'},{title:'Full Service',desc:'From search to closing, I handle everything.'},{title:'Tech-Savvy',desc:'Virtual tours, drone photos, and more.'}]),
    SEC.portfolio('Featured Listings',[{title:'Modern Villa',desc:'4 bed, 3 bath — $850,000'},{title:'Downtown Loft',desc:'2 bed, 2 bath — $425,000'},{title:'Suburban Home',desc:'5 bed, 4 bath — $1,200,000'}]),
    SEC.testimonials('Happy Homeowners',[{text:'She found us our dream home in just 2 weeks!',name:'The Johnsons'},{text:'Best agent we\'ve ever worked with.',name:'Michael R.'}]),
    SEC.footer()
  ]));

  add('realestate','property','Property Management','Property management services',S([
    SEC.hero('We Manage Your Investment','Professional property management for stress-free ownership.'),
    SEC.services('Management Services',[{title:'Tenant Screening',desc:'Thorough background and credit checks.'},{title:'Rent Collection',desc:'Automated collection and late fee handling.'},{title:'Maintenance',desc:'24/7 maintenance coordination.'},{title:'Financial Reporting',desc:'Monthly income and expense reports.'}]),
    SEC.counters('Our Portfolio',[{number:'500+',label:'Properties Managed'},{number:'98%',label:'Occupancy Rate'},{number:'24hr',label:'Avg Response Time'},{number:'15+',label:'Years Experience'}]),
    SEC.cta('Get a Free Rental Analysis','Find out what your property is worth.'),
    SEC.footer()
  ]));

  add('realestate','luxury','Luxury Real Estate','High-end luxury property sales',S([
    SEC.hero('Extraordinary Properties for Discerning Buyers','The finest homes in the most prestigious locations.'),
    SEC.portfolio('Exclusive Listings',[{title:'Oceanfront Estate',desc:'7 bed, 10 bath — $12,500,000'},{title:'Penthouse Suite',desc:'3 bed, 4 bath — $5,800,000'},{title:'Mountain Retreat',desc:'6 bed, 8 bath — $8,200,000'}]),
    SEC.features('Our Advantage',[{title:'Private Network',desc:'Off-market listings and private showings.'},{title:'Global Reach',desc:'Connections with ultra-high-net-worth buyers.'},{title:'Concierge Service',desc:'White-glove treatment from start to finish.'}]),
    SEC.testimonials('Elite Clients',[{text:'They found us a property that wasn\'t even listed.',name:'Anonymous Client'},{text:'The level of service is unmatched.',name:'Private Buyer'}]),
    SEC.footer()
  ]));

  add('realestate','vacation','Vacation Rentals','Short-term vacation property rentals',S([
    SEC.hero('Your Home Away From Hand','Curated vacation rentals in the world\'s best destinations.'),
    SEC.portfolio('Featured Properties',[{title:'Beachfront Villa',desc:'Ocean views, private pool — $350/night'},{title:'Mountain Cabin',desc:'Ski-in/ski-out, hot tub — $250/night'},{title:'City Loft',desc:'Downtown location, modern — $180/night'}]),
    SEC.features('Why Book With Us',[{title:'Verified Properties',desc:'Every listing is inspected and approved.'},{title:'24/7 Support',desc:'We\'re here for you throughout your stay.'},{title:'Best Price Guarantee',desc:'Found it cheaper? We\'ll match it.'}]),
    SEC.testimonials('Guest Reviews',[{text:'The beach house was even better than the photos!',name:'Traveler Sarah'},{text:'Best vacation rental experience ever.',name:'The Martinez Family'}]),
    SEC.footer()
  ]));

  add('realestate','architecture','Architecture Firm','Architecture and design studio',S([
    SEC.hero('Designing the Future','Award-winning architecture for commercial and residential projects.'),
    SEC.portfolio('Selected Works',[{title:'Skyline Tower',desc:'50-story mixed-use skyscraper'},{title:'Riverside Residence',desc:'Modern lakeside home'},{title:'Cultural Center',desc:'Community arts and events space'}]),
    SEC.services('Services',[{title:'Residential',desc:'Custom homes and renovations.'},{title:'Commercial',desc:'Offspaces, retail, and hospitality.'},{title:'Interior Design',desc:'Complete interior planning.'},{title:'Urban Planning',desc:'Master planning and development.'}]),
    SEC.testimonials('Client Partnerships',[{text:'They turned our vision into a masterpiece.',name:'Developer Client'},{text:'The attention to detail is extraordinary.',name:'Homeowner'}]),
    SEC.footer()
  ]));

  /* ======================== TECHNOLOGY ======================== */
  add('tech','software','Software Company','Enterprise software solutions',S([
    SEC.hero('Software That Scales','Enterprise solutions built for the modern business.'),
    SEC.features('Product Suite',[{title:'CRM',desc:'Customer relationship management.'},{title:'ERP',desc:'Enterprise resource planning.'},{title:'BI Dashboard',desc:'Business intelligence and analytics.'},{title:'API Platform',desc:'Integrate everything seamlessly.'}]),
    SEC.pricing('Plans',[{name:'Startup',price:'$49/mo',features:['Up to 10 users','Basic features','Email support']},{name:'Business',price:'$149/mo',features:['Up to 50 users','All features','Priority support']},{name:'Enterprise',price:'Custom',features:['Unlimited users','Custom integrations','Dedicated CSM']}]),
    SEC.testimonials('Enterprise Clients',[{text:'Reduced our operational costs by 40%.',name:'Fortune 500 CTO'},{text:'The best enterprise software we\'ve deployed.',name:'VP Engineering'}]),
    SEC.footer()
  ]));

  add('tech','ai','AI Startup','Artificial intelligence company',S([
    SEC.hero('Intelligence, Amplified','Building the next generation of AI-powered tools.'),
    SEC.features('AI Solutions',[{title:'Natural Language',desc:'Understand and generate human language.'},{title:'Computer Vision',desc:'See and interpret the visual world.'},{title:'Predictive Analytics',desc:'Forecast trends with machine learning.'},{title:'Automation',desc:'Intelligent process automation.'}]),
    SEC.about('Our Mission','We\'re making artificial intelligence accessible to every business. No PhD required.'),
    SEC.counters('Impact',[{number:'10M+',label:'API Calls/Day'},{number:'99.99%',label:'Accuracy Rate'},{number:'500+',label:'Enterprise Clients'},{number:'$50M',label:'Funding Raised'}]),
    SEC.cta('Try Our API','Free tier includes 10K calls/month.'),
    SEC.footer()
  ]));

  add('tech','cybersecurity','Cybersecurity Firm','Information security consulting',S([
    SEC.hero('Protecting Your Digital Assets','Comprehensive cybersecurity solutions for the modern threat landscape.'),
    SEC.services('Security Services',[{title:'Penetration Testing',desc:'Find vulnerabilities before attackers do.'},{title:'SOC as a Service',desc:'24/7 security monitoring and response.'},{title:'Compliance',desc:'GDPR, HIPAA, PCI DSS, SOC 2.'},{title:'Training',desc:'Security awareness for your team.'}]),
    SEC.counters('Track Record',[{number:'0',label:'Breaches (Clients)'},{number:'1000+',label:'Assessments Done'},{number:'24/7',label:'Monitoring'},{number:'15min',label:'Avg Response'}]),
    SEC.cta('Free Security Assessment','Discover your security posture today.'),
    SEC.footer()
  ]));

  add('tech','cloud','Cloud Provider','Cloud infrastructure services',S([
    SEC.hero('Your Cloud, Your Way','Scalable, reliable, and secure cloud infrastructure.'),
    SEC.features('Cloud Services',[{title:'Compute',desc:'Virtual machines and containers.'},{title:'Storage',desc:'Object, block, and file storage.'},{title:'Networking',desc:'Virtual networks and load balancers.'},{title:'Serverless',desc:'Run code without managing servers.'}]),
    SEC.pricing('Pay As You Go',[{name:'Free Tier',price:'$0',features:['750 hrs/mo compute','5GB storage','25GB bandwidth']},{name:'Growth',price:'$49/mo',features:['Unlimited compute','100GB storage','1TB bandwidth']},{name:'Scale',price:'$299/mo',features:['Auto-scaling','1TB storage','Unlimited bandwidth']}]),
    SEC.cta('Start Free','No credit card required. $200 free credits.'),
    SEC.footer()
  ]));

  add('tech','web3','Web3 Platform','Decentralized application platform',S([
    SEC.hero('Decentralized. Permissionless. Trustless.','Build the future of the internet on our blockchain.'),
    SEC.features('Platform Features',[{title:'Smart Contracts',desc:'Deploy and manage smart contracts.'},{title:'Token Launch',desc:'Launch your own tokens and NFTs.'},{title:'DeFi Protocols',desc:'Build decentralized financial services.'},{title:'DAO Tools',desc:'Governance and community management.'}]),
    SEC.stats('Network Stats',[{number:'1M+',label:'Transactions/Day'},{number:'500+',label:'dApps Built'},{number:'$2B',label:'TVL'},{number:'99.99%',label:'Uptime'}]),
    SEC.cta('Start Building','Documentation and SDKs available now.'),
    SEC.footer()
  ]));

  add('tech','mobile','Mobile Dev Agency','Mobile app development',S([
    SEC.hero('Apps That Users Love','Native and cross-platform mobile development.'),
    SEC.services('Development Services',[{title:'iOS Development',desc:'Swift and SwiftUI native apps.'},{title:'Android Development',desc:'Kotlin and Jetpack Compose.'},{title:'Cross-Platform',desc:'React Native and Flutter.'},{title:'UI/UX Design',desc:'Beautiful, intuitive interfaces.'}]),
    SEC.portfolio('Our Apps',[{title:'FitnessTrack',desc:'1M+ downloads, 4.8★ rating'},{title:'FoodieApp',desc:'Restaurant discovery and ordering'},{title:'FinSmart',desc:'Personal finance management'}]),
    SEC.cta('Let\'s Build Your App','Free project estimate in 48 hours.'),
    SEC.footer()
  ]));

  add('tech','gaming','Game Studio','Indie game development',S([
    SEC.hero('Play. Create. Inspire.','Award-winning indie game studio.'),
    SEC.portfolio('Our Games',[{title:'Pixel Quest',desc:'Retro platformer — 500K+ sales'},{title:'Space Odyssey',desc:'Sci-fi exploration — Game of the Year'},{title:'Puzzle Master',desc:'Brain teasers — 10M+ downloads'}]),
    SEC.features('Studio Values',[{title:'Player First',desc:'Every decision starts with the player.'},{title:'Innovation',desc:'Pushing boundaries of interactive media.'},{title:'Quality',desc:'Polish every detail to perfection.'}]),
    SEC.cta('Join Our Team','We\'re always looking for talented creators.'),
    SEC.footer()
  ]));

  add('tech','datascience','Data Science Company','Analytics and data consulting',S([
    SEC.hero('Turn Data Into Decisions','Advanced analytics for smarter business outcomes.'),
    SEC.services('Data Solutions',[{title:'Data Engineering',desc:'Build robust data pipelines.'},{title:'Machine Learning',desc:'Predictive models and algorithms.'},{title:'BI & Visualization',desc:'Beautiful dashboards and reports.'},{title:'Consulting',desc:'Data strategy and governance.'}]),
    SEC.testimonials('Data-Driven Results',[{text:'Increased our revenue by 35% through predictive analytics.',name:'Retail CEO'},{text:'Their ML model reduced churn by 28%.',name:'SaaS Company'}]),
    SEC.cta('Start Your Data Journey','Free data maturity assessment.'),
    SEC.footer()
  ]));

  /* ======================== EDUCATION ======================== */
  add('education','school','Private School','K-12 private education',S([
    SEC.hero('Nurturing Minds. Shaping Futures.','Academic excellence in a caring environment.'),
    SEC.features('Why Choose Us',[{title:'Small Classes',desc:'12:1 student-teacher ratio.'},{title:'STEM Focus',desc:'Advanced science and technology program.'},{title:'Arts Program',desc:'Music, theater, and visual arts.'},{title:'Athletics',desc:'20+ varsity and club sports.'}]),
    SEC.about('Our Mission','To provide a rigorous, well-rounded education that prepares students for success in college and life.'),
    SEC.testimonials('Parent Testimonials',[{text:'Our daughter has thrived here academically and socially.',name:'Parent, Grade 5'},{text:'The teachers genuinely care about each student.',name:'Parent, Grade 8'}]),
    SEC.footer()
  ]));

  add('education','university','University','Higher education institution',S([
    SEC.hero('Discover. Research. Innovate.','A world-class university for the 21st century.'),
    SEC.features('Academic Programs',[{title:'Undergraduate',desc:'100+ majors and minors.'},{title:'Graduate',desc:'Master\'s and doctoral programs.'},{title:'Online Learning',desc:'Flexible degree programs online.'},{title:'Research',desc:'$200M+ annual research funding.'}]),
    SEC.counters('University Stats',[{number:'25,000',label:'Students'},{number:'2,000',label:'Faculty'},{number:'150+',label:'Programs'},{number:'95%',label:'Employment Rate'}]),
    SEC.cta('Apply Now','Early decision deadline: November 1.'),
    SEC.footer()
  ]));

  add('education','online','Online Course Platform','E-learning and courses',S([
    SEC.hero('Learn Anything, Anywhere','10,000+ courses from world-class instructors.'),
    SEC.features('Platform Features',[{title:'Video Courses',desc:'HD video with lifetime access.'},{title:'Hands-On Projects',desc:'Learn by doing with real projects.'},{title:'Certificates',desc:'Earn recognized certificates.'},{title:'Community',desc:'Join 1M+ learners worldwide.'}]),
    SEC.pricing('Course Access',[{name:'Free',price:'$0',features:['Limited courses','Basic quizzes']},{name:'Pro',price:'$29/mo',features:['All courses','Projects','Certificates']},{name:'Team',price:'$99/mo',features:['All Pro features','Team analytics','Admin controls']}]),
    SEC.testimonials('Student Success',[{text:'Got my dream job after completing the Python course.',name:'Alex K.'},{text:'The best online learning platform out there.',name:'Maria S.'}]),
    SEC.footer()
  ]));

  add('education','coding','Coding Bootcamp','Intensive coding bootcamp',S([
    SEC.hero('Change Your Career in 12 Weeks','Intensive, immersive coding bootcamp.'),
    SEC.services('Programs',[{title:'Full-Stack Web',desc:'HTML, CSS, JS, React, Node.js, databases.'},{title:'Data Science',desc:'Python, ML, AI, and analytics.'},{title:'UX/UI Design',desc:'Design thinking, Figma, prototyping.'},{title:'Cybersecurity',desc:'Ethical hacking and security ops.'}]),
    SEC.pricing('Tuition',[{name:'Upfront',price:'$9,900',features:['Full program','Job guarantee']},{name:'Monthly',price:'$450/mo',features:['24-month plan','Income share agreement']},{name:'Scholarship',price:'Varies',features:['Need-based aid','Merit scholarships']}]),
    SEC.counters('Outcomes',[{number:'92%',label:'Job Placement'},{number:'$75K',label:'Avg Starting Salary'},{number:'500+',label:'Hiring Partners'},{number:'4.9★',label:'Student Rating'}]),
    SEC.footer()
  ]));

  add('education','tutoring','Tutoring Center','Academic tutoring services',S([
    SEC.hero('Unlock Your Potential','Personalized tutoring for every student.'),
    SEC.services('Tutoring Programs',[{title:'Math',desc:'Algebra through calculus and beyond.'},{title:'Science',desc:'Physics, chemistry, and biology.'},{title:'Test Prep',desc:'SAT, ACT, GRE, GMAT preparation.'},{title:'College Apps',desc:'Essay writing and application strategy.'}]),
    SEC.features('Our Tutors',[{title:'Expert-Qualified',desc:'All tutors hold advanced degrees.'},{title:'Personalized Plans',desc:'Custom learning paths for each student.'},{title:'Flexible Schedule',desc:'In-person and online sessions available.'},{title:'Proven Results',desc:'Average 150-point SAT improvement.'}]),
    SEC.cta('Free Consultation','Assess your student\'s needs at no cost.'),
    SEC.footer()
  ]));

  add('education','language','Language School','Foreign language instruction',S([
    SEC.hero('Speak the World','Learn any language with expert native speakers.'),
    SEC.services('Languages',[{title:'English',desc:'Business English, IELTS, TOEFL prep.'},{title:'Spanish',desc:'Conversational to advanced grammar.'},{title:'Mandarin',desc:'Characters, tones, and culture.'},{title:'French',desc:'From basics to literary French.'}]),
    SEC.pricing('Course Options',[{name:'Group',price:'$200/mo',features:['4 classes/week','Max 8 students']},{name:'Private',price:'$60/hr',features:['1-on-1 instruction','Custom schedule']},{name:'Intensive',price:'$800/mo',features:['Daily classes','Cultural immersion']}]),
    SEC.testimonials('Language Learners',[{text:'Passed my TOEFL with a perfect score after 3 months!',name:'Student from Japan'},{text:'The native speakers make all the difference.',name:'Student from Brazil'}]),
    SEC.footer()
  ]));

  add('education','preschool','Preschool & Daycare','Early childhood education',S([
    SEC.hero('Where Little Learners Grow','Nurturing early education for ages 2-5.'),
    SEC.services('Programs',[{title:'Toddlers',desc:'Ages 2-3, play-based learning.'},{title:'Pre-K',desc:'Ages 3-4, school readiness.'},{title:'Kindergarten Prep',desc:'Ages 4-5, academic foundation.'},{title:'After School',desc:'Enrichment activities until 6PM.'}]),
    SEC.features('Our Approach',[{title:'Play-Based',desc:'Learning through guided play.'},{title:'Low Ratios',desc:'1:4 teacher-to-child ratio.'},{title:'STEM for Kids',desc:'Age-appropriate science and math.'},{title:'Outdoor Learning',desc:'Nature-based curriculum.'}]),
    SEC.testimonials('Happy Parents',[{text:'My son loves going to school every day.',name:'Parent, Age 3'},{text:'The teachers are incredibly nurturing.',name:'Parent, Age 4'}]),
    SEC.footer()
  ]));

  add('education','music','Music School','Music lessons and instruction',S([
    SEC.hero('Feel the Music','Private and group music lessons for all ages.'),
    SEC.services('Music Programs',[{title:'Piano',desc:'Classical, jazz, and contemporary.'},{title:'Guitar',desc:'Acoustic, electric, and bass.'},{title:'Violin',desc:' Suzuki method and traditional.'},{title:'Voice',desc:'Singing lessons and vocal training.'}]),
    SEC.pricing('Lesson Plans',[{name:'Single Lesson',price:'$60',features:['30-minute session','All instruments']},{name:'Monthly',price:'$220/mo',features:['4 lessons/month','Recital included']},{name:'Package',price:'$500',features:['10 lessons','Flexible scheduling']}]),
    SEC.testimonials('Music Students',[{text:'My daughter performed her first recital and was amazing!',name:'Piano Parent'},{text:'The teachers make learning fun and motivating.',name:'Guitar Student'}]),
    SEC.footer()
  ]));

  /* ======================== TRAVEL & HOSPITALITY ======================== */
  add('travel','hotel','Boutique Hotel','Luxury boutique hotel',S([
    SEC.hero('Where Every Stay Is Special','Boutique luxury in the heart of the city.'),
    SEC.features('Hotel Amenities',[{title:'Luxury Suites',desc:'Beautifully designed rooms with city views.'},{title:'Fine Dining',desc:'Michelin-starred restaurant on-site.'},{title:'Spa & Wellness',desc:'Full-service spa and fitness center.'},{title:'Concierge',desc:'24/7 personal concierge service.'}]),
    SEC.pricing('Room Rates',[{name:'Deluxe Room',price:'$299/night',features:['King bed','City view','Breakfast included']},{name:'Suite',price:'$499/night',features:['Separate living area','Club lounge access']},{name:'Penthouse',price:'$999/night',features:['Rooftop terrace','Private butler']}]),
    SEC.testimonials('Guest Experiences',[{text:'The most beautiful hotel I\'ve ever stayed in.',name:'Traveler from London'},{text:'The staff made our anniversary unforgettable.',name:'Celebrating Couple'}]),
    SEC.footer()
  ]));

  add('travel','resort','Beach Resort','Tropical beach resort',S([
    SEC.hero('Paradise Found','White sand beaches and crystal-clear waters.'),
    SEC.features('Resort Features',[{title:'Beachfront',desc:'Direct access to pristine beaches.'},{title:'Water Sports',desc:'Snorkeling, surfing, and diving.'},{title:'All-Inclusive',desc:'Dining, drinks, and activities included.'},{title:'Spa',desc:'Oceanfront spa treatments.'}]),
    SEC.pricing('Packages',[{name:'Standard',price:'$350/night',features:['Beach room','All meals','Pool access']},{name:'Premium',price:'$550/night',features:['Ocean view','Water sports','Spa credit']},{name:'Honeymoon',price:'$750/night',features:['Villa accommodation','Private dinner','Couples spa']}]),
    SEC.cta('Book Your Escape','Packages available for 2026 season.'),
    SEC.footer()
  ]));

  add('travel','bnb','Vacation Rental','Airbnb-style vacation rental',S([
    SEC.hero('Live Like a Local','Unique vacation rentals in amazing locations.'),
    SEC.portfolio('Featured Stays',[{title:'Beachfront Cottage',desc:'Cozy cottage steps from the ocean'},{title:'Mountain Cabin',desc:'Rustic luxury in the mountains'},{title:'City Apartment',desc:'Modern loft in the heart of downtown'}]),
    SEC.features('Guest Benefits',[{title:'Instant Book',desc:'No waiting for approval.'},{title:'Superhost',desc:'Top-rated host with 5-star reviews.'},{title:'Flexible Cancellation',desc:'Free cancellation up to 48 hours.'},{title:'Local Guide',desc:'Personalized recommendations.'}]),
    SEC.testimonials('Guest Reviews',[{text:'Better than any hotel. Felt like home.',name:'Airbnb Guest'},{text:'The host gave us amazing local tips!',name:'Traveler'}]),
    SEC.footer()
  ]));

  add('travel','agency','Travel Agency','Full-service travel planning',S([
    SEC.hero('Your Journey Starts Here','Expert travel planning for unforgettable experiences.'),
    SEC.services('Travel Services',[{title:'Vacation Packages',desc:'All-inclusive getaways worldwide.'},{title:'Business Travel',desc:'Corporate travel management.'},{title:'Honeymoon Planning',desc:'Romantic trips for newlyweds.'},{title:'Adventure Tours',desc:'Safari, trekking, and expedition travel.'}]),
    SEC.testimonials('Traveler Stories',[{text:'They planned our dream honeymoon in Bali. Perfect!',name:'Newlyweds'},{text:'Best travel agent we\'ve ever used.',name:'Frequent Traveler'}]),
    SEC.cta('Plan Your Next Trip','Free consultation for all destinations.'),
    SEC.footer()
  ]));

  add('travel','tour','Tour Operator','Guided tours and experiences',S([
    SEC.hero('Experience the World','Curated tours led by passionate local guides.'),
    SEC.services('Tour Types',[{title:'City Tours',desc:'Walking, biking, and food tours.'},{title:'Day Trips',desc:'Escape the city for adventure.'},{title:'Multi-Day',desc:'Immersive cultural experiences.'},{title:'Private Tours',desc:'Customized just for you.'}]),
    SEC.portfolio('Popular Tours',[{title:'Rome in a Day',desc:'8-hour guided tour of the Eternal City'},{title:'Tuscany Wine Tour',desc:'Full-day vineyard experience'},{title:'Tokyo Night Walk',desc:'Street food and hidden gems'}]),
    SEC.testimonials('Happy Travelers',[{text:'Our guide made Rome come alive!',name:'Tourist from USA'},{text:'The food tour was the highlight of our trip.',name:'Couple from UK'}]),
    SEC.footer()
  ]));

  add('travel','hostel','Modern Hostel','Social and affordable hostel',S([
    SEC.hero('Meet. Share. Explore.','The social hostel for modern travelers.'),
    SEC.features('Hostel Life',[{title:'Social Events',desc:'Pub crawls, dinners, and walking tours.'},{title:'Modern Rooms',desc:'Pods with privacy curtains and USB charging.'},{title:'Co-Working',desc:'Fast WiFi and work-friendly spaces.'},{title:'Kitchen',desc:'Fully equipped communal kitchen.'}]),
    SEC.pricing('Nightly Rates',[{name:'Dorm Bed',price:'$25/night',features:['8-bed shared room','Locker included']},{name:'Private Room',price:'$75/night',features:['En-suite bathroom','City view']},{name:'Suite',price:'$120/night',features:['Kitchenette','Living area']}]),
    SEC.cta('Book Your Bed','Prices for solo travelers, couples, and groups.'),
    SEC.footer()
  ]));

  /* ======================== CREATIVE & DESIGN ======================== */
  add('creative','portfolio','Designer Portfolio','Creative professional portfolio',S([
    SEC.hero('Designing the Future','Award-winning designer specializing in brand and digital experiences.'),
    SEC.portfolio('Selected Work',[{title:'Brand Identity — TechCo',desc:'Complete rebrand for a SaaS company'},{title:'App Design — FinFlow',desc:'Mobile banking app with 4.9★ rating'},{title:'Website — ArtSpace',desc:'E-commerce for an art gallery'}]),
    SEC.about('About Me','I\'m a multidisciplinary designer with 10 years of experience creating memorable brand experiences. Previously at Google and Airbnb.'),
    SEC.testimonials('Client Feedback',[{text:'Incredible designer who truly understands the user.',name:'Product Manager'},{text:'They transformed our entire brand identity.',name:'Startup CEO'}]),
    SEC.cta('Let\'s Work Together','Available for freelance and contract projects.'),
    SEC.footer()
  ]));

  add('creative','photography','Photography Studio','Professional photography services',S([
    SEC.hero('Capturing Moments That Last','Professional photography for every occasion.'),
    SEC.services('Photography Services',[{title:'Portraits',desc:'Professional headshots and personal branding.'},{title:'Events',desc:'Weddings, corporate, and celebrations.'},{title:'Product',desc:'E-commerce and commercial product photography.'},{title:'Editorial',desc:'Fashion, lifestyle, and magazine shoots.'}]),
    SEC.portfolio('Recent Work',[ {title:'Wedding Collection',desc:'Romantic garden wedding'},{title:'Corporate Headshots',desc:'Executive portrait series'},{title:'Product Launch',desc:'Tech product photography'} ]),
    SEC.pricing('Packages',[{name:'Portrait',price:'$250',features:['30-min session','10 edited photos','Online gallery']},{name:'Event',price:'$500',features:['4 hours coverage','200+ edited photos']},{name:'Commercial',price:'$1,000+',features:['Full day','Unlimited shots','Retouching']}]),
    SEC.cta('Book Your Session','Limited availability this month.'),
    SEC.footer()
  ]));

  add('creative','webdesign','Web Design Agency','Custom web design and development',S([
    SEC.hero('Websites That Convert','Beautiful, fast, and conversion-focused web design.'),
    SEC.services('Design Services',[{title:'UI/UX Design',desc:'User-centered design process.'},{title:'Web Development',desc:'Custom and WordPress development.'},{title:'E-Commerce',desc:'Shopify, WooCommerce, and custom.'},{title:'Brand Identity',desc:'Logos, style guides, and brand systems.'}]),
    SEC.portfolio('Recent Projects',[{title:'TechStartup.com',desc:'SaaS landing page with 12% conversion rate'},{title:'FashionBrand.co',desc:'E-commerce with $100K monthly revenue'},{title:'Restaurant.io',desc:'Online ordering system'}]),
    SEC.cta('Get a Free Quote','Tell us about your project.'),
    SEC.footer()
  ]));

  add('creative','graphic','Graphic Design Studio','Brand and graphic design',S([
    SEC.hero('Visual Stories, Told Well','Graphic design that communicates and captivates.'),
    SEC.services('Design Services',[{title:'Logo Design',desc:'Memorable brand marks.'},{title:'Print Design',desc:'Brochures, posters, and packaging.'},{title:'Digital Design',desc:'Social media, ads, and web graphics.'},{title:'Brand Guidelines',desc:'Comprehensive brand systems.'}]),
    SEC.portfolio('Brands We\'ve Built',[{title:'FreshBite',desc:'Organic food brand identity'},{title:'TechNova',desc:'SaaS company rebrand'},{title:'Artisan Coffee',desc:'Coffee shop brand system'}]),
    SEC.cta('Start Your Brand','Every great brand starts with a conversation.'),
    SEC.footer()
  ]));

  add('creative','video','Video Production','Professional video production',S([
    SEC.hero('Stories Worth Telling','Professional video production for brands and businesses.'),
    SEC.services('Video Services',[{title:'Commercial',desc:'TV and online advertising videos.'},{title:'Corporate',desc:'Training, explainer, and culture videos.'},{title:'Social Media',desc:'Short-form content for all platforms.'},{title:'Documentary',desc:'Long-form storytelling.'}]),
    SEC.portfolio('Recent Work',[{title:'Brand Campaign',desc:'National TV commercial'},{title:'Product Explainer',desc:'2M+ views on YouTube'},{title:'Behind the Scenes',desc:'Social media series'}]),
    SEC.pricing('Production Packages',[{name:'Social',price:'$1,500',features:['60-sec video','Script writing','2 revisions']},{name:'Commercial',price:'$5,000',features:['30-sec TV spot','Storyboard','Professional edit']},{name:'Documentary',price:'Custom',features:['Full production','Interviews','Post-production']}]),
    SEC.footer()
  ]));

  add('creative','interior','Interior Design','Residential and commercial interior design',S([
    SEC.hero('Spaces That Inspire','Beautiful interior design for homes and businesses.'),
    SEC.services('Design Services',[{title:'Residential',desc:'Full home design and renovation.'},{title:'Commercial',desc:'Office, retail, and hospitality spaces.'},{title:'Consultation',desc:'One-time design advice sessions.'},{title:'Virtual Design',desc:'Online design packages.'}]),
    SEC.portfolio('Featured Projects',[{title:'Modern Loft',desc:'Downtown apartment redesign'},{title:'Restaurant Interior',desc:'Farm-to-table dining space'},{title:'Corporate Office',desc:'Tech company HQ redesign'}]),
    SEC.cta('Transform Your Space','Book a free design consultation.'),
    SEC.footer()
  ]));

  /* ======================== LEGAL & FINANCE ======================== */
  add('legal','lawfirm','Law Firm','Professional legal services',S([
    SEC.hero('Justice. Integrity. Results.','Experienced attorneys fighting for your rights.'),
    SEC.services('Practice Areas',[{title:'Personal Injury',desc:'Car accidents, medical malpractice.'},{title:'Criminal Defense',desc:'DUI, drug charges, assault.'},{title:'Family Law',desc:'Divorce, custody, and adoption.'},{title:'Business Law',desc:'Contracts, formation, and litigation.'}]),
    SEC.about('Our Firm','Over 25 years of courtroom experience. We\'ve recovered $200M+ for our clients. Free consultations for all new cases.'),
    SEC.testimonials('Client Results',[{text:'They won my case and got me $500K.',name:'Personal Injury Client'},{text:'The best criminal defense attorney in the city.',name:'Criminal Defense Client'}]),
    SEC.cta('Free Case Evaluation','No fees unless we win.'),
    SEC.footer()
  ]));

  add('legal','accounting','Accounting Firm','CPA and accounting services',S([
    SEC.hero('Numbers That Make Sense','Expert accounting and tax services for individuals and businesses.'),
    SEC.services('Accounting Services',[{title:'Tax Preparation',desc:'Individual and business tax returns.'},{title:'Bookkeeping',desc:'Monthly financial record keeping.'},{title:'Audit Support',desc:'IRS audit representation.'},{title:'Business Advisory',desc:'Financial planning and strategy.'}]),
    SEC.pricing('Service Plans',[{name:'Individual',price:'$150',features:['Tax return preparation','E-filing','Audit support']},{name:'Small Business',price:'$400/mo',features:['Monthly bookkeeping','Payroll','Quarterly reports']},{name:'Enterprise',price:'Custom',features:['Full accounting department','CFO services','Strategic planning']}]),
    SEC.testimonials('Client Trust',[{text:'Saved me $12K on my taxes this year.',name:'Small Business Owner'},{text:'The most thorough accountants I\'ve worked with.',name:'Corporate Client'}]),
    SEC.footer()
  ]));

  add('legal','insurance','Insurance Agency','Insurance brokerage and advisory',S([
    SEC.hero('Protection for What Matters','Comprehensive insurance solutions for every need.'),
    SEC.services('Insurance Products',[{title:'Auto',desc:'Car insurance from top carriers.'},{title:'Home',desc:'Protect your biggest investment.'},{title:'Life',desc:'Financial security for your family.'},{title:'Business',desc:'Commercial and liability coverage.'}]),
    SEC.features('Why Choose Us',[{title:'Multiple Carriers',desc:'We compare 20+ insurance companies.'},{title:'Expert Advice',desc:'Licensed agents who understand your needs.'},{title:'Claims Support',desc:'We fight for you when you need us most.'}]),
    SEC.cta('Get a Free Quote','Compare rates in under 5 minutes.'),
    SEC.footer()
  ]));

  add('legal','financial','Financial Advisor','Wealth management and financial planning',S([
    SEC.hero('Build. Protect. Grow.','Personalized financial planning for every stage of life.'),
    SEC.services('Financial Services',[{title:'Retirement Planning',desc:'401(k), IRA, and pension optimization.'},{title:'Investment Management',desc:'Portfolio construction and rebalancing.'},{title:'Estate Planning',desc:'Wills, trusts, and legacy planning.'},{title:'Tax Strategy',desc:'Tax-efficient investment strategies.'}]),
    SEC.testimonials('Client Relationships',[{text:'They helped us retire 5 years early.',name:'Retired Couple'},{text:'Our portfolio has grown 40% in 3 years.',name:'Business Owner'}]),
    SEC.cta('Schedule a Free Consultation','No obligation. No sales pressure.'),
    SEC.footer()
  ]));

  /* ======================== AUTOMOTIVE ======================== */
  add('automotive','dealer','Car Dealership','New and used car sales',S([
    SEC.hero('Find Your Perfect Drive','New and pre-owned vehicles at the best prices.'),
    SEC.features('Why Buy From Us',[{title:'Best Prices',desc:'Guaranteed lowest prices in the region.'},{title:'Certified Pre-Owned',desc:'150-point inspection on every used car.'},{title:'Financing',desc:'On-site financing with competitive rates.'},{title:'Trade-In',desc:'Top dollar for your current vehicle.'}]),
    SEC.portfolio('Featured Vehicles',[{title:'2026 Sedan XL',desc:'New — $28,500'},{title:'2025 SUV Pro',desc:'Certified — $35,900'},{title:'2024 Electric',desc:'Pre-owned — $42,000'}]),
    SEC.testimonials('Happy Drivers',[{text:'Best car buying experience ever. No pressure, great price.',name:'John D.'},{text:'The financing team got me a great rate.',name:'Sarah M.'}]),
    SEC.footer()
  ]));

  add('automotive','mechanic','Auto Repair','Professional auto repair shop',S([
    SEC.hero('Honest Repairs. Fair Prices.','Your trusted neighborhood mechanic since 1995.'),
    SEC.services('Repair Services',[{title:'Engine Repair',desc:'Complete engine diagnostics and repair.'},{title:'Brake Service',desc:'Pads, rotors, and fluid replacement.'},{title:'Oil Change',desc:'Quick, affordable oil changes.'},{title:'Diagnostics',desc:'Computer diagnostics for all makes.'}]),
    SEC.features('Our Promise',[{title:'Certified Mechanics',desc:'ASE-certified technicians.'},{title:'Warranty',desc:'12-month/12K mile warranty on all work.'},{title:'Transparent Pricing',desc:'No hidden fees, ever.'},{title:'Quick Service',desc:'Most repairs done same day.'}]),
    SEC.testimonials('Trusted Customers',[{text:'Finally found a mechanic I can trust.',name:'Linda K.'},{text:'They saved me $2,000 vs. the dealership.',name:'Mike R.'}]),
    SEC.location('Visit Us','789 Auto Lane, Denver, CO 80203','+1 (303) 555-0789','Mon-Fri 7:30AM-6PM, Sat 8AM-2PM'),
    SEC.footer()
  ]));

  add('automotive','carwash','Car Wash','Premium car wash and detailing',S([
    SEC.hero('The Ultimate Clean','Premium car wash and detailing services.'),
    SEC.services('Wash Packages',[{title:'Basic Wash',desc:'Exterior wash, dry, and tire shine.',price:'$15'},{title:'Premium Wash',desc:'Full interior and exterior detail.',price:'$35'},{title:'Detailing',desc:'Complete paint correction and ceramic coating.',price:'$150'},{title:'Monthly Plan',desc:'Unlimited washes every month.',price:'$49/mo'}]),
    SEC.features('Eco-Friendly',[{title:'Water Recycling',desc:'90% water recycling system.'},{title:'Biodegradable',desc:'All products are eco-safe.'},{title:'Touchless',desc:'Advanced touchless wash technology.'}]),
    SEC.location('Drive Through','456 Clean St, Austin, TX 78702','+1 (512) 555-0456','Daily 7AM-8PM'),
    SEC.footer()
  ]));

  /* ======================== HOME SERVICES ======================== */
  add('home','plumber','Plumbing Service','Professional plumbing repair',S([
    SEC.hero('Fixed Right. Guaranteed.','Emergency plumbing services available 24/7.'),
    SEC.services('Plumbing Services',[{title:'Emergency Repairs',desc:'Burst pipes, floods, and blockages.'},{title:'Drain Cleaning',desc:'Professional drain and sewer cleaning.'},{title:'Water Heater',desc:'Installation and repair of all types.'},{title:'Renovations',desc:'Bathroom and kitchen plumbing.'}]),
    SEC.features('Why Call Us',[{title:'24/7 Emergency',desc:'We\'re always available when you need us.'},{title:'Upfront Pricing',desc:'You approve the price before we start.'},{title:'Licensed & Insured',desc:'Full plumbing license and insurance.'},{title:'Satisfaction Guaranteed',desc:'100% satisfaction or your money back.'}]),
    SEC.testimonials('Plumbing Pros',[{text:'They arrived in 30 minutes and fixed the leak immediately.',name:'Homeowner'},{text:'Fair prices and honest work. What more could you want?',name:'Property Manager'}]),
    SEC.location('Call Us Anytime','500 Pipe Street, Phoenix, AZ 85001','+1 (602) 555-0500','24/7 Emergency Service'),
    SEC.footer()
  ]));

  add('home','electrician','Electrical Service','Licensed electrician services',S([
    SEC.hero('Powering Your Home Safely','Licensed, insured electrical services.'),
    SEC.services('Electrical Services',[{title:'Wiring',desc:'New construction and rewiring.'},{title:'Panel Upgrade',desc:'200A panel upgrades.'},{title:'Lighting',desc:'Interior and exterior lighting design.'},{title:'EV Charger',desc:'Electric vehicle charger installation.'}]),
    SEC.features('Safety First',[{title:'Licensed',desc:'Master electrician license.'},{title:'Insured',desc:'Full liability insurance.'},{title:'Code Compliant',desc:'All work meets NEC code.'},{title:'Warranty',desc:'5-year warranty on all installations.'}]),
    SEC.cta('Free Estimate','Call for a free electrical assessment.'),
    SEC.footer()
  ]));

  add('home','hvac','HVAC Service','Heating, ventilation, and air conditioning',S([
    SEC.hero('Comfort You Can Count On','Expert HVAC installation, repair, and maintenance.'),
    SEC.services('HVAC Services',[{title:'AC Repair',desc:'Fast air conditioning repair.'},{title:'Heating',desc:'Furnace and heat pump services.'},{title:'Installation',desc:'New HVAC system installation.'},{title:'Maintenance',desc:'Annual tune-up plans.'}]),
    SEC.pricing('Maintenance Plans',[{name:'Basic',price:'$149/yr',features:['Annual inspection','Priority scheduling']},{name:'Premium',price:'$299/yr',features:['Bi-annual inspections','15% off repairs']},{name:'Elite',price:'$499/yr',features:['All Premium benefits','Free filters','No overtime charges']}]),
    SEC.testimonials('Cool Customers',[{text:'They had our AC running in under an hour.',name:'Summer Homeowner'},{text:'Our energy bill dropped 30% after the upgrade.',name:'Winter Homeowner'}]),
    SEC.footer()
  ]));

  add('home','cleaning','Cleaning Service','Professional home and office cleaning',S([
    SEC.hero('Spotless Spaces, Happy Places','Professional cleaning for homes and offices.'),
    SEC.services('Cleaning Services',[{title:'Deep Clean',desc:'Thorough top-to-bottom cleaning.'},{title:'Regular Cleaning',desc:'Weekly or bi-weekly service.'},{title:'Move-In/Out',desc:'Get your deposit back.'},{title:'Office Cleaning',desc:'Keep your workspace pristine.'}]),
    SEC.pricing('Cleaning Plans',[{name:'One-Time',price:'$150',features:['Deep clean','All rooms','Eco-friendly products']},{name:'Weekly',price:'$100/visit',features:['Regular maintenance','Same team each time']},{name:'Monthly',price:'$120/visit',features:['Thorough clean','Priority scheduling']}]),
    SEC.testimonials('Clean Homeowners',[{text:'My house has never been this clean!',name:'Busy Professional'},{text:'The team is reliable and thorough.',name:'Working Mom'}]),
    SEC.footer()
  ]));

  add('home','landscaping','Landscaping','Professional lawn and garden care',S([
    SEC.hero('Beautiful Yards, Built to Last','Professional landscaping and lawn maintenance.'),
    SEC.services('Landscaping Services',[{title:'Lawn Care',desc:'Mowing, fertilization, and weed control.'},{title:'Design',desc:'Custom landscape design and installation.'},{title:'Hardscaping',desc:'Patios, walkways, and retaining walls.'},{title:'Seasonal',desc:'Spring cleanup and fall preparation.'}]),
    SEC.pricing('Lawn Plans',[{name:'Basic',price:'$40/visit',features:['Mowing','Edging','Blow-off']},{name:'Full Service',price:'$80/visit',features:['Mowing','Fertilization','Weed control','Aeration']},{name:'Premium',price:'$150/visit',features:['All Full Service','Irrigation','Pest control']}]),
    SEC.testimonials('Green Thumbs',[{text:'Our yard is the envy of the neighborhood.',name:'Homeowner'},{text:'They transformed our backyard into a paradise.',name:'Family'}]),
    SEC.footer()
  ]));

  add('home','pest','Pest Control','Professional pest management',S([
    SEC.hero('Pest-Free Living','Safe and effective pest control solutions.'),
    SEC.services('Pest Services',[{title:'Termite',desc:'Termite inspection and treatment.'},{title:'Rodent',desc:'Mouse, rat, and wildlife removal.'},{title:'Insects',desc:'Ants, roaches, bed bugs, and spiders.'},{title:'Prevention',desc:'Quarterly prevention plans.'}]),
    SEC.features('Our Approach',[{title:'Eco-Friendly',desc:'Safe for families and pets.'},{title:'Guaranteed',desc:'Pests don\'t come back or we re-treat free.'},{title:'Licensed',desc:'State-certified technicians.'},{title:'Discreet',desc:'Unmarked vehicles for your privacy.'}]),
    SEC.cta('Free Inspection','Schedule your free pest inspection today.'),
    SEC.footer()
  ]));

  add('home','roofing','Roofing Contractor','Roof installation and repair',S([
    SEC.hero('Above & Beyond','Expert roofing services for residential and commercial.'),
    SEC.services('Roofing Services',[{title:'Roof Repair',desc:'Leak detection and emergency repairs.'},{title:'Replacement',desc:'Complete roof replacement.'},{title:'Inspection',desc:'Thorough roof inspections.'},{title:'Gutters',desc:'Gutter installation and cleaning.'}]),
    SEC.features('Quality Materials',[{title:'GAF Certified',desc:'Factory-certified installer.'},{title:'25-Year Warranty',desc:'Workmanship warranty on every job.'},{title:'Insurance Claims',desc:'We work with all insurance companies.'},{title:'Financing',desc:'Flexible payment options available.'}]),
    SEC.testimonials('Roofing Reviews',[{text:'New roof in one day. Incredible.',name:'Homeowner'},{text:'They handled our insurance claim perfectly.',name:'Storm Damage Client'}]),
    SEC.footer()
  ]));

  add('home','moving','Moving Company','Professional moving services',S([
    SEC.hero('Moving Made Easy','Professional, stress-free moving services.'),
    SEC.services('Moving Services',[{title:'Local Moving',desc:'Same-city moves with care.'},{title:'Long Distance',desc:'Cross-country relocations.'},{title:'Packing',desc:'Full packing and unpacking service.'},{title:'Storage',desc:'Secure, climate-controlled storage.'}]),
    SEC.pricing('Moving Packages',[{name:'Studio',price:'$300',features:['1-2 movers','Local move','Basic insurance']},{name:'Apartment',price:'$600',features:['2-3 movers','Packing included','Full insurance']},{name:'House',price:'$1,200+',features:['4+ movers','Full service','Storage option']}]),
    SEC.testimonials('Smooth Moves',[{text:'Moved our entire house in 4 hours. Amazing!',name:'Family of 4'},{text:'Not a single item damaged. Professional team.',name:'Corporate Relocation'}]),
    SEC.footer()
  ]));

  /* ======================== EVENTS & ENTERTAINMENT ======================== */
  add('events','wedding','Wedding Planner','Luxury wedding planning',S([
    SEC.hero('Your Dream Wedding, Perfected','Bespoke wedding planning for unforgettable celebrations.'),
    SEC.services('Wedding Services',[{full:'Full Planning',desc:'From engagement to honeymoon.'},{title:'Partial Planning',desc:'Help with specific aspects.'},{title:'Day-Of Coordination',desc:'We handle everything on the day.'},{title:'Destination Weddings',desc:'Beautiful locations worldwide.'}]),
    SEC.portfolio('Recent Weddings',[{title:'Garden Romance',desc:'200-guest outdoor celebration'},{title:'Beachfront Bliss',desc:'Intimate beach ceremony'},{title:'Grand Ballroom',desc:'Luxury hotel reception'}]),
    SEC.testimonials('Happy Couples',[{text:'Our wedding was absolutely perfect thanks to them!',name:'Emily & James'},{text:'They took care of every detail so we could enjoy.',name:'Priya & Raj'}]),
    SEC.cta('Start Planning Your Wedding','Book your free consultation today.'),
    SEC.footer()
  ]));

  add('events','venue','Event Venue','Event space rental',S([
    SEC.hero('The Perfect Space for Every Occasion','Versatile event venue in the heart of the city.'),
    SEC.features('Venue Spaces',[{title:'Grand Ballroom',desc:'Seats 500, perfect for galas.'},{title:'Garden Terrace',desc:'Outdoor space for 200 guests.'},{title:'Meeting Rooms',desc:'Boardrooms for 10-50 people.'},{title:'Rooftop',desc:'City views for cocktail events.'}]),
    SEC.pricing('Rental Rates',[{name:'Half Day',price:'$2,000',features:['4-hour rental','Basic AV setup','Tables & chairs']},{name:'Full Day',price:'$3,500',features:['8-hour rental','Full AV','Catering kitchen']},{name:'Weekend',price:'$6,000',features:['2-day rental','Premium AV','Dedicated coordinator']}]),
    SEC.testimonials('Event Planners Say',[{text:'The venue was stunning and the staff was incredible.',name:'Corporate Event'},{text:'Our guests couldn\'t stop raving about the space.',name:'Wedding Reception'}]),
    SEC.footer()
  ]));

  add('events','dj','DJ & Entertainment','Professional DJ and event entertainment',S([
    SEC.hero('Setting the Mood','Professional DJ services for weddings, parties, and events.'),
    SEC.services('Entertainment Services',[{title:'Wedding DJ',desc:'Ceremony, cocktail hour, and reception.'},{title:'Corporate Events',desc:'Galas, holiday parties, and launches.'},{title:'Club Nights',desc:'High-energy dance events.'},{title:'MC Services',desc:'Professional emcee for your event.'}]),
    SEC.features('What We Offer',[{title:'Professional Equipment',desc:'Top-of-the-line sound and lighting.'},{title:'Custom Playlists',desc:'Tailored to your taste.'},{title:'Lighting Design',desc:'Dance floor and ambient lighting.'},{title:'Backup Plan',desc:'Redundant equipment for peace of mind.'}]),
    SEC.testimonials('Party People',[{text:'Best wedding DJ ever! Everyone was on the dance floor!',name:'Bride & Groom'},{text:'They made our corporate event unforgettable.',name:'Event Coordinator'}]),
    SEC.footer()
  ]));

  add('events','florist','Floral Designer','Wedding and event florist',S([
    SEC.hero('Blooming Beautiful','Custom floral design for weddings and events.'),
    SEC.services('Floral Services',[{title:'Weddings',desc:'Bridal bouquets, centerpieces, arches.'},{title:'Events',desc:'Corporate and social event florals.'},{title:'Subscription',desc:'Weekly fresh flowers for your home.'},{title:'Sympathy',desc:'Funeral and memorial arrangements.'}]),
    SEC.portfolio('Floral Designs',[{title:'Garden Wedding',desc:'Romantic, lush garden-style arrangement'},{title:'Modern Corporate',desc:'Sleek, minimalist centerpieces'},{title:'Rustic Charm',desc:'Wildflower and sunflower designs'}]),
    SEC.cta('Request a Consultation','Tell us about your event and vision.'),
    SEC.footer()
  ]));

  add('events','catering_events','Event Catering','Catering for parties and events',S([
    SEC.hero('Catering That Wows','Exceptional food and service for your special events.'),
    SEC.services('Event Catering',[{title:'Wedding Receptions',desc:'Plated or buffet service.'},{title:'Corporate Events',desc:'Lunch meetings and galas.'},{title:'Private Parties',desc:'Birthdays, anniversaries, celebrations.'},{title:'Cocktail Hours',desc:'Passed hors d\'oeuvres and stations.'}]),
    SEC.pricing('Catering Menus',[{name:'Buffet',price:'$65/person',features:['3 entrées','2 sides','Salad & bread']},{name:'Plated',price:'$85/person',features:['3-course meal','Table service','Wine pairing']},{name:'Stations',price:'$75/person',features:['4 food stations','Variety of cuisines']}]),
    SEC.footer()
  ]));

  /* ======================== AGRICULTURE ======================== */
  add('agriculture','farm','Organic Farm','Local organic farm',S([
    SEC.hero('From Our Farm to Your Table','Certified organic produce grown with love.'),
    SEC.features('Farm Fresh',[{title:'Seasonal Produce',desc:'Fresh vegetables and fruits year-round.'},{title:'CSA Program',desc:'Weekly produce boxes for subscribers.'},{title:'Farm Market',desc:'On-site market every Saturday.'},{title:'Farm Tours',desc:'Educational tours for schools and families.'}]),
    SEC.about('Our Farm','Family-owned since 1952. We practice regenerative agriculture on 50 acres, growing 30+ varieties of organic produce.'),
    SEC.testimonials('CSA Members',[{text:'The freshest vegetables I\'ve ever tasted.',name:'CSA Member'},{text:'My kids love picking strawberries at the farm.',name:'Local Family'}]),
    SEC.location('Visit the Farm','123 Country Road, Hudson Valley, NY 12534','+1 (845) 555-0123','Market: Sat 8AM-2PM'),
    SEC.footer()
  ]));

  add('agriculture','nursery','Plant Nursery','Garden center and nursery',S([
    SEC.hero('Grow Your Garden','Plants, trees, and expert gardening advice.'),
    SEC.features('Garden Center',[{title:'Annuals & Perennials',desc:'Colorful flowers for every season.'},{title:'Trees & Shrubs',desc:'Landscape-grade plants.'},{title:'Vegetable Starts',desc:'Ready-to-plant seedlings.'},{title:'Garden Supplies',desc:'Soil, fertilizer, and tools.'}]),
    SEC.about('Expert Advice','Our certified horticulturists are here to help you choose the right plants for your garden and climate.'),
    SEC.testimonials('Happy Gardeners',[{text:'My garden has never looked better thanks to their advice.',name:'Master Gardener'},{text:'Best selection of native plants in the area.',name:'Landscaper'}]),
    SEC.footer()
  ]));

  add('agriculture','beekeeping','Beekeeping Apiary','Honey and bee products',S([
    SEC.hero('Nature\'s Sweetest Gift','Raw, local honey and bee products.'),
    SEC.features('Our Products',[{title:'Raw Honey',desc:'Unfiltered, unpasteurized, pure.'},{title:'Beeswax Candles',desc:'Hand-dipped, natural candles.'},{title:'Propolis',desc:'Natural immune support.'},{title:'Pollination',desc:'Bee rental for orchards and farms.'}]),
    SEC.about('Our Bees','We maintain 200 hives across 5 apiaries. Our bees forage on wildflower meadows, producing honey with unique floral notes.'),
    SEC.testimonials('Honey Lovers',[{text:'This honey tastes like nothing I\'ve bought in stores.',name:'Food Blogger'},{text:'The beeswax candles smell incredible.',name:'Home Decor Enthusiast'}]),
    SEC.footer()
  ]));

  /* ======================== RETAIL ======================== */
  add('retail','electronics','Electronics Store','Consumer electronics and gadgets',S([
    SEC.hero('Tech That Excites','Latest gadgets and electronics at the best prices.'),
    SEC.features('Product Categories',[{title:'Smartphones',desc:'Latest models from all brands.'},{title:'Laptops',desc:'From ultrabooks to gaming rigs.'},{title:'Audio',desc:'Headphones, speakers, and earbuds.'},{title:'Smart Home',desc:'Everything for your connected home.'}]),
    SEC.features('Why Shop With Us',[{title:'Price Match',desc:'We match any authorized retailer.'},{title:'Free Shipping',desc:'On orders over $50.'},{title:'Easy Returns',desc:'30-day no-questions-asked returns.'},{title:'Expert Support',desc:'Tech experts to help you choose.'}]),
    SEC.cta('Shop Now','New arrivals every week.'),
    SEC.footer()
  ]));

  add('retail','fashion_store','Fashion Store','Online and offline fashion retail',S([
    SEC.hero('Wear Your Story','Curated fashion for every style and occasion.'),
    SEC.features('Collections',[{title:'New Arrivals',desc:'Fresh styles every week.'},{title:'Basics',desc:'Essential wardrobe pieces.'},{title:'Accessories',desc:'Complete your look.'},{title:'Sale',desc:'Up to 50% off selected items.'}]),
    SEC.testimonials('Fashion Forward',[{text:'I get so many compliments on my outfits from here.',name:'Loyal Customer'},{text:'The quality is amazing for the price.',name:'Fashion Blogger'}]),
    SEC.cta('Shop New Collection','Free shipping on your first order.'),
    SEC.footer()
  ]));

  add('retail','sports_store','Sports Equipment','Athletic gear and equipment',S([
    SEC.hero('Gear Up for Greatness','Premium sports equipment for every athlete.'),
    SEC.services('Sports Categories',[{title:'Running',desc:'Shoes, apparel, and accessories.'},{title:'Gym',desc:'Weights, machines, and accessories.'},{title:'Outdoor',desc:'Camping, hiking, and climbing gear.'},{title:'Team Sports',desc:'Soccer, basketball, and more.'}]),
    SEC.features('Athlete Approved',[{title:'Expert Staff',desc:'Former athletes who know the gear.'},{title:'Try Before You Buy',desc:'In-store demo equipment.'},{title:'Price Guarantee',desc:'Lowest price guaranteed.'},{title:'Rewards Program',desc:'Earn points on every purchase.'}]),
    SEC.footer()
  ]));

  add('retail','home_store','Home Decor','Furniture and home accessories',S([
    SEC.hero('Make House a Home','Curated home decor for every style.'),
    SEC.features('Shop By Room',[{title:'Living Room',desc:'Sofas, tables, and accents.'},{title:'Bedroom',desc:'Beds, linens, and lighting.'},{title:'Kitchen',desc:'Cookware, utensils, and gadgets.'},{title:'Outdoor',desc:'Patio furniture and garden decor.'}]),
    SEC.about('Design Philosophy','We believe your home should tell your story. Every piece in our collection is selected for quality, style, and value.'),
    SEC.testimonials('Happy Homes',[{text:'Transformed my living room completely.',name:'Interior Design Lover'},{text:'The quality is exceptional for the price.',name:'New Homeowner'}]),
    SEC.footer()
  ]));

  add('retail','baby','Baby Store','Maternity and baby products',S([
    SEC.hero('Everything for Baby','Quality products for expecting and new parents.'),
    SEC.services('Shop By Category',[{title:'Nursery',desc:'Cribs, dressers, and nursery decor.'},{title:'Strollers',desc:'Travel systems and lightweight strollers.'},{title:'Feeding',desc:'Bottles, high chairs, and accessories.'},{title:'Clothing',desc:'Newborn to toddler, organic options.'}]),
    SEC.features('Parent Approved',[{title:'Safety First',desc:'All products meet safety standards.'},{title:'Registry',desc:'Create your baby registry with us.'},{title:'Expert Advice',desc:'Certified child passenger safety tech.'},{title:'Rewards',desc:'Earn points toward future purchases.'}]),
    SEC.testimonials('New Parents',[{text:'The registry service was so helpful!',name:'Expecting Mom'},{text:'Best selection of organic baby clothes.',name:'Eco-Conscious Parent'}]),
    SEC.footer()
  ]));

  add('retail','pet_store','Pet Store','Pet supplies and accessories',S([
    SEC.hero('Because They Deserve the Best','Premium pet supplies for dogs, cats, and more.'),
    SEC.services('Pet Supplies',[{title:'Food',desc:'Premium and natural pet food.'},{title:'Toys',desc:'Interactive and durable toys.'},{title:'Health',desc:'Supplements and wellness products.'},{title:'Accessories',desc:'Collars, leashes, and beds.'}]),
    SEC.features('Pet Parents Love Us',[{title:'Knowledgeable Staff',desc:'Pet owners who understand your needs.'},{title:'Grooming',desc:'Professional grooming services.'},{title:'Training',desc:'Puppy classes and behavior help.'},{title:'Adoption Events',desc:'Monthly pet adoption drives.'}]),
    SEC.testimonials('Pet Parents',[{text:'My dog loves the food from here!',name:'Dog Owner'},{text:'The grooming service is top-notch.',name:'Cat Owner'}]),
    SEC.footer()
  ]));

  /* ======================== MEDIA & ENTERTAINMENT ======================== */
  add('media','podcast','Podcast Network','Podcast production and hosting',S([
    SEC.hero('Stories Worth Hearing','Original podcasts on every topic imaginable.'),
    SEC.features('Popular Shows',[{title:'Tech Talk Daily',desc:'Daily tech news and analysis.'},{title:'True Crime Stories',desc:'Investigative journalism series.'},{title:'Business Mornings',desc:'Start your day with business insights.'},{title:'Comedy Hour',desc:'Stand-up and improvisation.'}]),
    SEC.pricing('Host Your Podcast',[{name:'Starter',price:'$19/mo',features:['Unlimited episodes','Basic analytics','1 podcast']},{name:'Pro',price:'$49/mo',features:['Advanced analytics','Multiple hosts','Monetization']},{name:'Network',price:'$149/mo',features:['Multiple shows','Team access','Custom branding']}]),
    SEC.cta('Start Your Podcast Today','Free hosting for your first month.'),
    SEC.footer()
  ]));

  add('media','blog','Media Blog','Online news and lifestyle blog',S([
    SEC.hero('Stories That Matter','In-depth reporting and thoughtful commentary.'),
    SEC.features('Categories',[{title:'Technology',desc:'Latest in tech, AI, and innovation.'},{title:'Culture',desc:'Art, music, film, and society.'},{title:'Business',desc:'Startups, finance, and economy.'},{title:'Lifestyle',desc:'Health, travel, and wellness.'}]),
    SEC.blog('Latest Articles',[{title:'The Future of AI in 2026',date:'July 2026',excerpt:'How artificial intelligence is reshaping every industry.'},{title:'Remote Work Revolution',date:'June 2026',excerpt:'Why hybrid work is here to stay.'},{title:'Sustainable Living Guide',date:'June 2026',excerpt:'Practical tips for reducing your carbon footprint.'}]),
    SEC.cta('Subscribe to Our Newsletter','Get the best stories delivered weekly.'),
    SEC.footer()
  ]));

  add('media','youtube','YouTube Channel','Video content creator',S([
    SEC.hero('Watch. Learn. Be Inspired.','Educational and entertaining video content.'),
    SEC.features('Channel Content',[{title:'Tutorials',desc:'Step-by-step how-to guides.'},{title:'Reviews',desc:'Honest product and tech reviews.'},{title:'Vlogs',desc:'Day-in-the-life and travel content.'},{title:'Live Streams',desc:'Weekly Q&A and community events.'}]),
    SEC.counters('Channel Stats',[{number:'500K',label:'Subscribers'},{number:'50M',label:'Total Views'},{number:'200+',label:'Videos'},{number:'4.9★',label:'Rating'}]),
    SEC.cta('Subscribe Now','New videos every Tuesday and Friday.'),
    SEC.footer()
  ]));

  add('media','radio','Radio Station','Local radio and streaming',S([
    SEC.hero('Your Favorite Music, Always','24/7 music, talk, and community radio.'),
    SEC.features('On Air',[{title:'Morning Show',desc:'Wake up with energy and laughter.'},{title:'Midday Music',desc:'Non-stop hits from the 80s to now.'},{title:'Evening Talk',desc:'Local news and call-in discussions.'},{title:'Weekend Mix',desc:'DJ sets and special programming.'}]),
    SEC.features('Listen Anywhere',[{title:'FM Radio',desc:'Tune in at 98.5 FM.'},{title:'Online Stream',desc:'Listen from anywhere in the world.'},{title:'Mobile App',desc:'Download our free app.'},{title:'Podcast',desc:'Catch up on missed shows.'}]),
    SEC.cta('Advertise With Us','Reach 100K+ local listeners daily.'),
    SEC.footer()
  ]));

  /* ======================== NONPROFIT ======================== */
  add('nonprofit','charity','Charity Organization','Nonprofit charitable organization',S([
    SEC.hero('Making a Difference Together','Join us in creating lasting change in communities worldwide.'),
    SEC.features('Our Impact',[{title:'Education',desc:'Built 50 schools in underserved areas.'},{title:'Healthcare',desc:'Provided 100K+ medical treatments.'},{title:'Clean Water',desc:'Installed 1,000+ water wells.'},{title:'Food Security',desc:'Feed 50K families annually.'}]),
    SEC.counters('Our Reach',[{number:'50K',label:'Lives Changed'},{number:'25',label:'Countries'},{number:'100%',label:'Transparency'},{number:'$0',label:'Admin Costs'}]),
    SEC.cta('Donate Today','Every dollar makes a difference.'),
    SEC.footer()
  ]));

  add('nonprofit','church','Church','Community church',S([
    SEC.hero('Come As You Are','A welcoming community of faith and love.'),
    SEC.services('Ministries',[{title:'Sunday Service',desc:'Worship and teaching every Sunday.'},{title:'Youth Group',desc:'Fun and faith for teens.'},{title:'Small Groups',desc:'Connect in smaller community.'},{title:'Outreach',desc:'Serving our local community.'}]),
    SEC.features('Visit Us',[{title:'Family Friendly',desc:'Programs for all ages.'},{title:'Modern Worship',desc:'Music and technology-enhanced services.'},{title:'Community',desc:'Fellowship and support.'},{title:'Missions',desc:'Local and global mission work.'}]),
    SEC.location('Join Us Sundays','100 Grace Lane, Anytown, USA','+1 (555) 100-2000','Sunday 9AM & 11AM'),
    SEC.footer()
  ]));

  add('nonprofit','community','Community Center','Local community center',S([
    SEC.hero('Your Community Hub','Programs and services for all ages.'),
    SEC.services('Programs',[{title:'Fitness',desc:'Gym, classes, and recreational sports.'},{title:'Arts',desc:'Art classes, music, and theater.'},{title:'Education',desc:'Tutoring, workshops, and lectures.'},{title:'Seniors',desc:'Programs for older adults.'}]),
    SEC.features('Community Benefits',[{title:'Affordable',desc:'Sliding scale fees for all programs.'},{title:'Inclusive',desc:'Open to everyone in the community.'},{title:'Quality',desc:'Professional instructors and facilities.'},{title:'Connected',desc:'Meet your neighbors and make friends.'}]),
    SEC.location('Visit Us','200 Community Drive, Anytown, USA','+1 (555) 200-3000','Mon-Sat 6AM-10PM'),
    SEC.footer()
  ]));

  /* ======================== LUXURY ======================== */
  add('luxury','concierge','Luxury Concierge','VIP concierge and lifestyle management',S([
    SEC.hero('Your Wish Is Our Command','Exclusive concierge services for discerning clients.'),
    SEC.services('Concierge Services',[{title:'Travel',desc:'Private jets, yachts, and exclusive resorts.'},{title:'Dining',desc:'Reservations at impossible-to-book restaurants.'},{title:'Events',desc:'VIP access to sold-out events.'},{title:'Shopping',desc:'Personal shopping and luxury procurement.'}]),
    SEC.features('The Difference',[{title:'24/7 Availability',desc:'Always just a call or message away.'},{title:'Global Network',desc:'Connections in 100+ countries.'},{title:'Absolute Discretion',desc:'Complete confidentiality guaranteed.'},{title:'No Request Too Grand',desc:'If it\'s possible, we\'ll make it happen.'}]),
    SEC.testimonials('Elite Clients',[{text:'They arranged a private dinner in a museum. Unbelievable.',name:'HNW Client'},{text:'The best concierge service in the world.',name:'CEO'}]),
    SEC.footer()
  ]));

  add('luxury','yacht','Yacht Charter','Luxury yacht rental',S([
    SEC.hero('Sail in Style','Luxury yacht charters for unforgettable experiences.'),
    SEC.features('Our Fleet',[{title:'Motor Yachts',desc:'Speed and luxury combined.'},{title:'Sailing Yachts',desc:'Classic elegance on the water.'},{title:'Catamarans',desc:'Spacious and stable for groups.'},{title:'Superyachts',desc:'The ultimate luxury experience.'}]),
    SEC.pricing('Charter Options',[{name:'Day Charter',price:'$5,000+',features:['8-hour cruise','Crew included','Catering available']},{name:'Week Charter',price:'$35,000+',features:['7-day voyage','Full crew','Itinerary planning']},{name:'Season',price:'Custom',features:['Mediterranean or Caribbean','Full provisioning','Concierge service']}]),
    SEC.cta('Book Your Voyage','Dates filling fast for 2026 season.'),
    SEC.footer()
  ]));

  add('luxury','private_jet','Private Jet','Charter private jet flights',S([
    SEC.hero('Fly Without Limits','Private jet charter for business and leisure.'),
    SEC.features('Fleet & Service',[{title:'Light Jets',desc:'For short trips, 4-6 passengers.'},{title:'Mid-Size',desc:'For medium range, 7-9 passengers.'},{title:'Heavy Jets',desc:'For long haul, 12-16 passengers.'},{title:'VIP Airliners',desc:'Boeing and Airbus VIP configurations.'}]),
    SEC.features('Why Charter With Us',[{title:'Instant Quotes',desc:'Get pricing in under 5 minutes.'},{title:'No Empty Legs',desc:'Pay only for your flight.'},{title:'Global Access',desc:'10,000+ airports worldwide.'},{title:'Safety First',desc:'ARG/US and Wyvern certified.'}]),
    SEC.cta('Request a Quote','Fly anywhere, anytime.'),
    SEC.footer()
  ]));

  /* ======================== KIDS ======================== */
  add('kids','daycare','Daycare Center','Licensed daycare and childcare',S([
    SEC.hero('Where Kids Learn & Play','Safe, nurturing childcare for ages 6 weeks to 5 years.'),
    SEC.services('Age Groups',[{title:'Infants',desc:'6 weeks - 12 months, 1:3 ratio.'},{title:'Toddlers',desc:'1-2 years, play-based learning.'},{title:'Preschool',desc:'3-4 years, school readiness.'},{title:'Pre-K',desc:'4-5 years, kindergarten prep.'}]),
    SEC.features('Why Parents Trust Us',[{title:'Licensed & Accredited',desc:'State-licensed, NAEYC accredited.'},{title:'Low Ratios',desc:'Better than state requirements.'},{title:'Nutritious Meals',desc:'Breakfast, lunch, and snacks included.'},{title:'Security',desc:'Keycard access and cameras.'}]),
    SEC.testimonials('Happy Parents',[{text:'My daughter runs to the door every morning excited to go.',name:'Parent'},{text:'The communication and updates are amazing.',name:'Parent'}]),
    SEC.location('Tour Our Center','300 Kids Lane, Seattle, WA 98101','+1 (206) 555-0300','Mon-Fri 6:30AM-6:30PM'),
    SEC.footer()
  ]));

  add('kids','parties','Kids Party Venue','Children\'s birthday party venue',S([
    SEC.hero('The Best Birthday Ever!','Memorable parties for kids of all ages.'),
    SEC.services('Party Packages',[{title:'Basic Party',desc:'2-hour party for up to 15 kids.',price:'$250'},{title:'Super Party',desc:'3-hour party with activities.',price:'$400'},{title:'Ultimate',desc:'4-hour party with everything included.',price:'$600'}]),
    SEC.features('Party Includes',[{title:'Dedicated Host',desc:'Our team handles everything.'},{title:'Activities',desc:'Games, crafts, and entertainment.'},{title:'Food & Cake',desc:'Pizza, drinks, and cake service.'},{title:'Decorations',desc:'Themed decorations setup.'}]),
    SEC.testimonials('Party Reviews',[{text:'My son said it was the best day of his life!',name:'Birthday Boy\'s Mom'},{text:'The staff made planning so easy.',name:'Party Parent'}]),
    SEC.footer()
  ]));

  add('kids','preschool','Montessori Preschool','Montessori early childhood education',S([
    SEC.hero('Follow the Child','Montessori education for curious minds.'),
    SEC.services('Programs',[{title:'Casa (3-6)',desc:'Mixed-age classroom, self-directed learning.'},{title:'Toddler (18mo-3)',desc:'Sensory exploration and independence.'},{title:'After School',desc:'Enrichment activities.'},{title:'Summer Camp',desc:'Themed summer programs.'}]),
    SEC.features('Montessori Method',[{title:'Child-Led',desc:'Children choose their own activities.'},{title:'Mixed Ages',desc:'3-6 year olds learn from each other.'},{title:'Hands-On',desc:'Real materials, real skills.'},{title:'Peace Education',desc:'Conflict resolution and empathy.'}]),
    SEC.testimonials('Montessori Families',[{text:'My daughter is so independent and confident now.',name:'Parent'},{text:'The prepared environment is magical.',name:'Parent'}]),
    SEC.footer()
  ]));

  /* ======================== PET ======================== */
  add('pet','grooming','Pet Grooming','Professional pet grooming salon',S([
    SEC.hero('Pampered Pets','Professional grooming for dogs and cats.'),
    SEC.services('Grooming Services',[{title:'Full Groom',desc:'Bath, haircut, nails, ears, and more.'},{title:'Bath Only',desc:'Shampoo, dry, and brush.'},{title:'Nail Trim',desc:'Quick and stress-free nail care.'},{title:'Teeth Brushing',desc:'Dental hygiene for fresh breath.'}]),
    SEC.pricing('Grooming Prices',[{name:'Small Dog',price:'$45',features:['Full groom','All breeds']},{name:'Medium Dog',price:'$55',features:['Full groom','All breeds']},{name:'Large Dog',price:'$70',features:['Full groom','All breeds']}]),
    SEC.testimonials('Pet Parents',[{text:'My poodle looks like a show dog every time!',name:'Poodle Owner'},{text:'They handle my anxious cat with such care.',name:'Cat Owner'}]),
    SEC.footer()
  ]));

  add('pet','training','Dog Training','Professional dog training',S([
    SEC.hero('A Well-Trained Dog Is a Happy Dog','Obedience, behavior, and socialization training.'),
    SEC.services('Training Programs',[{title:'Puppy Class',desc:'Socialization and basic commands.'},{title:'Obedience',desc:'Sit, stay, come, and heel.'},{title:'Behavior',desc:'Aggression, anxiety, and reactivity.'},{title:'Tricks',desc:'Fun tricks and advanced skills.'}]),
    SEC.pricing('Training Options',[{name:'Group Class',price:'$200/6wk',features:['6 weekly classes','Small groups','Take-home materials']},{name:'Private',price:'$100/session',features:['1-on-1 training','Your home or ours']},{name:'Board & Train',price:'$1,500/2wk',features:['2-week intensive','Daily training','Follow-up session']}]),
    SEC.testimonials('Transformed Dogs',[{text:'Our dog went from pulling on leash to perfect heel!',name:'Happy Owner'},{text:'The puppy class was exactly what we needed.',name:'New Puppy Parent'}]),
    SEC.footer()
  ]));

  /* ======================== MUSIC ======================== */
  add('music','studio','Recording Studio','Professional recording studio',S([
    SEC.hero('Sound. Record. Create.','State-of-the-art recording studio for artists.'),
    SEC.services('Studio Services',[{title:'Recording',desc:'Multi-track recording in acoustically treated rooms.'},{title:'Mixing',desc:'Professional mixing and mastering.'},{title:'Production',desc:'Full music production services.'},{title:'Podcast',desc:'Podcast recording and editing.'}]),
    SEC.features('Studio Equipment',[{title:'Neve Console',desc:'Classic analog warmth.'},{title:'Isolation Booths',desc:'Vocal and instrument booths.'},{title:'Monitoring',desc:'Genelec and ATC monitors.'},{title:'Plugins',desc:'Complete UAD and Waves collections.'}]),
    SEC.pricing('Studio Rates',[{name:'Hourly',price:'$75/hr',features:['Engineer included','Basic mixing']},{name:'Half Day',price:'$250',features:['4-hour session','Tracking & basic mix']},{name:'Full Day',price:'$500',features:['8-hour session','Full production']}]),
    SEC.cta('Book Studio Time','Available 7 days a week.'),
    SEC.footer()
  ]));

  add('music','school_music','Music Academy','Comprehensive music education',S([
    SEC.hero('Unlock Your Musical Potential','Lessons, ensembles, and performance opportunities.'),
    SEC.services('Music Programs',[{title:'Private Lessons',desc:'Piano, guitar, voice, and more.'},{title:'Ensembles',desc:'Orchestra, band, and chamber groups.'},{title:'Theory',desc:'Music theory and ear training.'},{title:'Performance',desc:'Recitals, concerts, and competitions.'}]),
    SEC.pricing('Lesson Plans',[{name:'Weekly',price:'$200/mo',features:['4 lessons/month','Recital participation']},{name:'Bi-Weekly',price:'$120/mo',features:['2 lessons/month','Progress reports']},{name:'Trial',price:'$30',features:['Single lesson','No commitment']}]),
    SEC.testimonials('Music Students',[{text:'My teacher is incredibly patient and talented.',name:'Adult Student'},{text:'My son performed his first recital and was amazing!',name:'Parent'}]),
    SEC.footer()
  ]));

  /* ======================== PHOTOGRAPHY ======================== */
  add('photography','wedding_photo','Wedding Photography','Professional wedding photographer',S([
    SEC.hero('Your Love Story, Beautifully Captured','Documentary-style wedding photography.'),
    SEC.services('Photography Packages',[{title:'Essential',desc:'6 hours of coverage, digital gallery.',price:'$2,000'},{title:'Premium',desc:'8 hours, engagement session, album.',price:'$3,500'},{title:'Luxury',desc:'Full day, second shooter, fine art album.',price:'$5,000'}]),
    SEC.portfolio('Wedding Gallery',[{title:'Garden Wedding',desc:'Romantic outdoor ceremony'},{title:'City Rooftop',desc:'Urban skyline backdrop'},{title:'Beach Ceremony',desc:'Sunset beach wedding'}]),
    SEC.testimonials('Happy Couples',[{text:'The photos exceeded our wildest expectations!',name:'Bride & Groom'},{text:'So easy to work with and the results are stunning.',name:'Wedding Planner'}]),
    SEC.cta('Check Availability','Limited 2026 dates remaining.'),
    SEC.footer()
  ]));

  add('photography','product','Product Photography','E-commerce product photography',S([
    SEC.hero('Products That Sell Themselves','Professional product photography for e-commerce.'),
    SEC.services('Photography Services',[{title:'White Background',desc:'Clean, isolated product shots.'},{title:'Lifestyle',desc:'Products in real-world settings.'},{title:'360° Views',desc:'Interactive spin photography.'},{title:'Video',desc:'Product demonstration videos.'}]),
    SEC.pricing('Product Photography',[{name:'Per Image',price:'$25',features:['White background','2 angles','Retouched']},{name:'10 Products',price:'$200',features:['10 products','3 angles each','Lifestyle shots']},{name:'E-Commerce',price:'$500+',features:['Full catalog','Consistent lighting','Fast turnaround']}]),
    SEC.testimonials('E-Commerce Sellers',[{text:'Our conversion rate went up 40% with new photos.',name:'Online Store Owner'},{text:'Fast turnaround and amazing quality.',name:'Amazon Seller'}]),
    SEC.footer()
  ]));

  /* ======================== ARABIC TEMPLATES ======================== */

  // Restaurant / مطعم
  const arRestaurant = C.food;
  templates.push({
    id: 'ar-restaurant',
    name: 'مطعم / مطبخ عربي',
    desc: 'قائمة أطباق، حجز طاولات، صور الأطباق',
    icon: ICONS.utensils,
    category: 'food',
    arabic: true,
    theme: { color: arRestaurant.color, font: 'Cairo', icon: 'utensils' },
    sections: [
      { type: 'hero', data: { heading: 'مطعم الأصالة', description: 'أكل بيتي أصيل — طعم بيتكم عندنا. احجز طاولتك دلوقتي.', image: '' } },
      { type: 'about', data: { heading: 'عن المطعم', content: 'مطعم الأصالة اتأسس سنة 2015. بنقدم أكل مصري أصيل من وصفات جداتنا. كل طبخة عندنا ليها قصة وطعم مميز. المكونات طازجة من السوق كل يوم.' } },
      { type: 'services', data: { heading: 'قائمة الطعام', items: [
        { title: 'مشاوي مشكلة', desc: 'لحم كفتة، كباب، شيش طاووق — served with rice and salad', price: '250 ج.م', category: 'المشويات' },
        { title: 'أم علي', desc: 'وصفة مصرية أصيلة بالقشطة والمكسرات', price: '60 ج.م', category: 'الحلويات' },
        { title: 'محشي ورق عنب', desc: 'ورق عنب محشي أرز بالبقدونس والنعناع', price: '80 ج.م', category: 'المقليات' },
        { title: 'ساندويتش كفتة', desc: 'كفتة مشوية على العيش البلدي مع الطحينة', price: '70 ج.م', category: 'الساندويتشات' }
      ] } },
      { type: 'testimonials', data: { heading: 'عملاؤنا بيقولوا إيه', items: [
        { name: 'أحمد محمد', text: 'أحسن مطعم أكلت فيه في القاهرة. الكفتة مميزة جداً.', role: 'عميل دائم' },
        { name: 'سارة علي', text: 'الخدمة سريعة والأسعار معقولة. أنصح بالمحشي.', role: 'زبونة' },
        { name: 'خالد حسن', text: 'حجزت عشية عيد ميلادي وكانت تجربة ممتازة. الأكل تحفة.', role: 'زبون' }
      ] } },
      { type: 'contact', data: { heading: 'تواصل معانا', email: 'info@alasala.com', phone: '01012345678', address: 'شارع التحرير، وسط البلد، القاهرة' } },
      { type: 'location', data: { heading: 'المكان', address: 'شارع التحرير 45، وسط البلد، القاهرة', phone: '01012345678', hours: 'يومياً من 12 ظهراً لـ 12 بالليل' } },
      { type: 'footer', data: { copyright: '© 2026 مطعم الأصالة. جميع الحقوق محفوظة.', text: 'صُنع بـ Site Flow' } }
    ]
  });

  // Cafe / كافيه
  const arCafe = C.food;
  templates.push({
    id: 'ar-cafe',
    name: 'كافيه / مقهى',
    desc: 'قهوات، حلوى، أجواء مريحة',
    icon: ICONS.coffee || ICONS.utensils,
    category: 'food',
    arabic: true,
    theme: { color: '#8B4513', font: 'Cairo', icon: 'utensils' },
    sections: [
      { type: 'hero', data: { heading: 'كافيه آرت', description: 'قهوة مختصة، حلوى طازجة، أجواء هادية. المكان المثالي للشغل أو القعدة مع الصحاب.', image: '' } },
      { type: 'about', data: { heading: 'عن الكافيه', content: 'كافيه آرت افتتحنا 2022. بنجيب أحسن أنواع القهوة من كل أنحاء العالم. كل كوباية ليها طعم خاص. عندنا تحلية وحلويات محضرة يومياً.' } },
      { type: 'services', data: { heading: 'القائمة', items: [
        { title: 'إسبريسو', desc: 'قهوة قوية concentrated', price: '35 ج.م' },
        { title: 'لاتيه', desc: 'قهوة بالحليب المбит', price: '50 ج.م' },
        { title: 'موكا شوكولاتة', desc: 'قهوة + شوكولاتة + حليب', price: '55 ج.م' },
        { title: 'كيك العسل', desc: 'كيك طازج بالعسل والمكسرات', price: '45 ج.م' }
      ] } },
      { type: 'pricing', data: { heading: 'الأسعار', plans: [
        { name: 'كوباية صغيرة', price: '35 ج.م', features: ['إسبريسو', 'أمريكانو'] },
        { name: 'كوباية كبيرة', price: '50 ج.م', features: ['لاتيه', 'موكا', 'كابتشينو'] },
        { name: 'باقة صحاب', price: '120 ج.م', features: ['4 كوبايات', 'كيك', 'قعدة ساعة'] }
      ] } },
      { type: 'testimonials', data: { heading: 'الناس بتقول إيه', items: [
        { name: 'نورا', text: 'أحلى كافيه في المنطقة. القهوة تحفة والجو هادي.', role: 'طالبة' },
        { name: 'مروان', text: 'بشتغل هنا كل يوم. الواي فاي سريع والقهوة ممتازة.', role: 'فريلانسر' },
        { name: 'ياسمين', text: 'الحلويات طازجة كل يوم. أنصح بكيك العسل.', role: 'زبونة' }
      ] } },
      { type: 'contact', data: { heading: 'تواصل معانا', email: 'hello@artcafe.com', phone: '01112345678', address: 'شارع المعادي، القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 كافيه آرت. جميع الحقوق محفوظة.', text: 'صُنع بـ Site Flow' } }
    ]
  });

  // Clinic / عيادة
  const arHealth = C.health;
  templates.push({
    id: 'ar-clinic',
    name: 'عيادة / مركز صحي',
    desc: 'دكاترة، مواعيد، خدمات طبية',
    icon: ICONS.heart,
    category: 'health',
    arabic: true,
    theme: { color: '#059669', font: 'Cairo', icon: 'heart' },
    sections: [
      { type: 'hero', data: { heading: 'المركز الطبي المتقدم', description: 'صحتك أمانة عندنا. أفضل دكاترة وأحدث معدات. احجز موعدك دلوقتي.', image: '' } },
      { type: 'about', data: { heading: 'عن المركز', content: 'المركز الطبي المتقدم افتتحنا 2018. عندنا فريق من أفضل الدكاترة في مصر. بنستخدم أحدث التقنيات الطبية. رضا المريض عندنا أهم حاجة.' } },
      { type: 'services', data: { heading: 'خدماتنا', items: [
        { title: 'طب عام', desc: 'فحوصات شاملة وتشخيص دقيق', price: '300 ج.م' },
        { title: 'طب أسنان', desc: 'تقويم، تركيبات، علاج عصب', price: 'يبدأ من 500 ج.م' },
        { title: 'طب عيون', desc: 'فحص نظرة، نظارات طبية', price: '200 ج.م' },
        { title: 'تحاليل طبية', desc: 'تحاليل مخبرية نتائج في نفس اليوم', price: 'يبدأ من 100 ج.م' }
      ] } },
      { type: 'team', data: { heading: 'فريقنا الطبي', items: [
        { name: 'د. أحمد سمير', role: 'استشاري طب عام' },
        { name: 'د. Fatma Hassan', role: 'استشارية أسنان' },
        { name: 'د. محمد علي', role: 'استشاري عيون' }
      ] } },
      { type: 'contact', data: { heading: 'احجز موعدك', email: 'info@medicalcenter.com', phone: '01234567890', address: 'شارع رمسيس، القاهرة' } },
      { type: 'location', data: { heading: 'المكان', address: 'شارع رمسيس 10، القاهرة', phone: '01234567890', hours: 'السبت-الخميس: 9 صباحاً - 9 بالليل' } },
      { type: 'footer', data: { copyright: '© 2026 المركز الطبي المتقدم. جميع الحقوق محفوظة.', text: 'صُنع بـ Site Flow' } }
    ]
  });

  // Clothing Store / محل ملابس
  const arRetail = C.retail;
  templates.push({
    id: 'ar-clothing',
    name: 'محل ملابس / أزياء',
    desc: 'ملابس رجالي وحريمي، عروض وخصومات',
    icon: ICONS.bag,
    category: 'retail',
    arabic: true,
    theme: { color: '#7c3aed', font: 'Cairo', icon: 'bag' },
    sections: [
      { type: 'hero', data: { heading: 'ستايل ستور', description: 'أحدث صيحات الموضة بأسعار مناسبة. توصيل لحد البيت.', image: '' } },
      { type: 'about', data: { heading: 'عنّا', content: 'ستايل ستور من 2020. بنوفر أحدث صيحات الموضة للرجالي والحريمي. كل موسم بنجيب كولكشن جديد. الجودة عندنا أولوية.' } },
      { type: 'services', data: { heading: 'الأقسام', items: [
        { title: 'ملابس رجالي', desc: 'قمصان، بنطلونات، جواكيت — كل المقاسات', price: '' },
        { title: 'ملابس حريمي', desc: 'فساتين، بلوزات، بنطلونات — أحدث الموديلات', price: '' },
        { title: 'أحذية', desc: 'حذاء رجالي وحريمي — كاجوال ورسمي', price: '' },
        { title: 'إكسسوارات', desc: 'ساعات، محافظ، نظارات — لوك كومplet', price: '' }
      ] } },
      { type: 'counters', data: { heading: 'إنجازاتنا', items: [
        { number: '10K+', label: 'عميل سعيد' },
        { number: '500+', label: 'منتج' },
        { number: '50+', label: 'ماركة عالمية' },
        { number: '4.9', label: 'تقييم العملاء' }
      ] } },
      { type: 'testimonials', data: { heading: 'العملاء بيقولوا إيه', items: [
        { name: 'مريم', text: 'أحلى محل ملابس في المنطقة. الجودة ممتازة والأسعار معقولة.', role: 'زبونة' },
        { name: 'عمر', text: 'كل شوية بيجيبوا موديلات جديدة. دايماً في اللي يعجبني.', role: 'عميل دائم' },
        { name: 'هدى', text: 'التوصيل سريع والتغليف ممتاز. أنصح بالتسوق من عندهم.', role: 'زبونة أونلاين' }
      ] } },
      { type: 'contact', data: { heading: 'تواصل معانا', email: 'info@stylestore.com', phone: '01098765432', address: 'سيتي ستارز، القاهرة' } },
      { type: 'footer', data: { copyright: '© 2026 ستايل ستور. جميع الحقوق محفوظة.', text: 'صُنع بـ Site Flow' } }
    ]
  });

  // Portfolio / بورتفوليو شخصي
  const arCreative = C.creative;
  templates.push({
    id: 'ar-portfolio',
    name: 'بورتفوليو شخصي',
    desc: 'صفحة شخصية للمصممين والمصورين',
    icon: ICONS.image,
    category: 'creative',
    arabic: true,
    theme: { color: '#9333ea', font: 'Cairo', icon: 'image' },
    sections: [
      { type: 'hero', data: { heading: 'أنا محمد — مصمم جرافيك', description: 'بحوّل أفكارك لتصميمات مبهرة. خبرة 5 سنين في التصميم.' } },
      { type: 'about', data: { heading: 'عنّي', content: 'أنا محمد، مصمم جرافيك من القاهرة. بحب أصمم هويات بصرية، سوشيال ميديا، وواجهات ويب. بشتغل مع شركات كبرى وبرضه رواد أعمال صغار.' } },
      { type: 'portfolio', data: { heading: 'أعمالي', items: [
        { title: 'هوية بصرية — شركة تقنية', desc: 'تصميم لوجو وهوية كاملة لشركة ناشئة', image: '' },
        { title: 'حملة سوشيال ميديا', desc: 'تصميمات لإنستجرام وفيس بوك لعلامة تجارية', image: '' },
        { title: 'تصميم ويب', desc: 'تصميم واجهة مستخدم لموقع إلكتروني', image: '' }
      ] } },
      { type: 'counters', data: { heading: 'بالأرقام', items: [
        { number: '120+', label: 'مشروع منجز' },
        { number: '80+', label: 'عميل سعيد' },
        { number: '5', label: 'سنوات خبرة' },
        { number: '15+', label: 'جائزة تصميم' }
      ] } },
      { type: 'testimonials', data: { heading: 'عملائي بيقولوا إيه', items: [
        { name: 'أحمد', text: 'محمد صمملي الهوية البصرية وكانت تحفة. أنصح بيه جداً.', role: 'صاحب شركة' },
        { name: 'سارة', text: 'التسليم كان في الوقت المحدد والجودة عالية جداً.', role: 'عميلة' },
        { name: 'خالد', text: 'أحسن مصمم اتعاملت معاه. فاهم اللي عايزه وبيزود عليه.', role: 'روائد أعمال' }
      ] } },
      { type: 'pricing', data: { heading: 'الأسعار', plans: [
        { name: 'لوجو بس', price: '2,000 ج.م', features: ['3 تصميمات', 'تعديلات غير محدودة', 'ملف PSD'] },
        { name: 'هوية كاملة', price: '5,000 ج.م', features: ['لوجو + بروفايل شركة', 'كرت شخصي', 'بروشور'] },
        { name: 'تصميم ويب', price: '8,000 ج.م', features: ['5 صفحات', 'متجاوب', 'ملفات التصميم'] }
      ] } },
      { type: 'contact', data: { heading: 'تواصل معايا', email: 'mohamed@design.com', phone: '01155556666', address: 'القاهرة، مصر' } },
      { type: 'cta', data: { heading: 'عندك مشروع؟', subheading: 'ابعتلي ونتكلم', buttonText: 'تواصل معايا' } },
      { type: 'footer', data: { copyright: '© 2026 محمد — مصمم جرافيك. جميع الحقوق محفوظة.', text: 'صُنع بـ Site Flow' } }
    ]
  });

  return templates;
})();

/* Merge with original presets */
const ALL_PRESETS = [...PRESETS, ...TEMPLATE_DATA.map(t => ({
  ...t,
  icon: t.icon
}))];
