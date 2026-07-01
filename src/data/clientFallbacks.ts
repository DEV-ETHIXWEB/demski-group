// Fallback / normalization layer for "Our Clients" case studies.
//
// The WordPress REST API (demskigroup.com/wp-json/wp/v2/our-clients) is the
// source of truth, but it intermittently returns 502s or empty results.
// This module provides:
//   - a static fallback dataset, structured into the same sections used by
//     the live case-study template (Project / Solution / Key Features /
//     Results / Conclusion) — see public/Our Clients/* reference screenshots
//   - a normalizer that merges live API data with fallback data so every
//     case study page always has a complete set of sections to render

export interface FeatureItem {
  title: string;
  text: string;
}

export interface ResultsStat {
  value: string;
  label: string;
}

export interface ClientFallback {
  title: string;
  tagline: string;
  heroIntro?: string;
  industries: string[];
  techStack: string[];
  logo: string;
  screenshot: string;
  project: string;
  solution: string;
  features: FeatureItem[];
  quote: string;
  quoteAuthor: string;
  results: FeatureItem[];
  resultsStats: ResultsStat[];
  conclusion: string;
}

export interface NormalizedClient extends ClientFallback {
  slug: string;
  excerpt: string;
  content: string;
  link: string;
}

// Local logos in /public/logos take priority — they don't depend on
// demskigroup.com being reachable.
export const CLIENT_FALLBACKS: Record<string, ClientFallback> = {
  'biopac': {
    title: 'Biopac Systems',
    tagline: 'Scaling Scientific Research: Complete Custom Web Platform for BIOPAC.',
    heroIntro: 'The Demski Group developed a powerful research web application for BIOPAC Systems Inc., enabling users to conduct and track large-scale scientific studies online. The SaaS platform seamlessly handles extensive data storage, scales with user needs, and features a usage-based billing system for flexibility and efficiency.',
    industries: ['Scientific Research', 'Data Analytics'],
    techStack: ['React', 'Node.js', 'Azure', 'TypeScript'],
    logo: '/logos/Biopac.png',
    screenshot: '/logos/Biopac.png',
    project: 'Biopac needed a scalable, efficient web application that would let researchers and educators perform and track scientific studies online, replacing manual, disconnected workflows with a unified digital platform.',
    solution: 'The Demski Group designed and built a custom web application tailored to Biopac\'s research workflows, giving users a reliable way to run studies, capture data, and review results from a single online platform.',
    features: [
      { title: 'Streamlined Study Workflows', text: 'Replaced manual processes with guided, digital workflows for setting up and running scientific studies.' },
      { title: 'Accurate Data Tracking', text: 'Centralized data capture and storage improved accuracy and made results easy to review and export.' },
      { title: 'Scalable Architecture', text: 'Built on a scalable foundation able to support growing numbers of users and studies over time.' },
    ],
    quote: 'We spoke to a few different companies as we set out to find someone to create a website/database application to augment our desktop software. We chose The Demski Group in part because we found them very easy to talk to in our interview. That first impression stuck as we have a great relationship with them now.',
    quoteAuthor: 'Mickey Rowe, Manager',
    results: [
      { title: 'Improved Research Efficiency', text: 'Researchers can now perform and track studies online, cutting down time spent on manual data handling.' },
      { title: 'Stronger Ongoing Partnership', text: 'Biopac continues to work with The Demski Group on future projects without considering other vendors.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group successfully delivered a scalable and efficient web application for Biopac, enabling users to perform and track scientific studies online — and the relationship has continued to grow into new projects.',
  },
  'shop-orthopedics': {
    title: 'ShopOrthopedics',
    tagline: 'How We Optimized This Shopify Store for Elevated Results.',
    industries: ['E-commerce', 'Healthcare'],
    techStack: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    logo: '/logos/BrandedAF.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/06/ShopOrthopedics-1.png',
    project: 'ShopOrthopedics, an online retailer of orthopedic braces and supports, needed a better Shopify shopping experience to help customers find the right products faster and convert more visitors into buyers.',
    solution: 'The Demski Group implemented high-quality, custom Shopify solutions — improving product categorization, search, and the overall storefront experience to make shopping faster and more intuitive.',
    features: [
      { title: 'High-Quality, Custom Solutions', text: 'Custom Shopify theme and storefront improvements tailored to ShopOrthopedics\' product catalog and customers.' },
      { title: 'Improved Product Categories & Search', text: 'Reorganized navigation and search so customers can find the right brace or support quickly.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Higher Return on Ad Spend', text: 'Improved storefront experience helped paid campaigns convert more efficiently.' },
      { title: 'Stronger Online Sales', text: 'Customers can browse and purchase with a smoother, faster shopping experience.' },
    ],
    resultsStats: [
      { value: '243.75%', label: 'ROI' },
      { value: '3.43', label: 'ROAS' },
    ],
    conclusion: 'The Demski Group helped ShopOrthopedics build a faster, more intuitive Shopify store — and the results speak for themselves, with strong ROI and ROAS improvements driven by a better shopping experience.',
  },
  'property-gauge': {
    title: 'Property Gauge',
    tagline: 'Streamlining Property Analysis with Custom Tools.',
    industries: ['PropTech'],
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/07/PropertyGauge.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/07/PropertyGauge.png',
    project: 'Property Gauge needed custom software to help its team analyze and manage properties more efficiently, replacing time-consuming manual processes with a streamlined digital workflow.',
    solution: 'The Demski Group designed and built custom software tools that automate property analysis tasks, giving the Property Gauge team a faster, more reliable way to manage their portfolio.',
    features: [
      { title: 'Automated Analysis', text: 'Replaced manual spreadsheet-based analysis with automated, repeatable workflows.' },
      { title: 'Centralized Property Data', text: 'Brought property data into one place, making it easier to track and manage.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Faster Property Reviews', text: 'The team can analyze properties in a fraction of the time previously required.' },
      { title: 'Reduced Manual Work', text: 'Automation removed repetitive manual tasks from the team\'s workflow.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group worked with Property Gauge to design and build custom software that helps the team analyze and manage properties more efficiently, replacing manual processes with a streamlined digital workflow.',
  },
  'pnc-bank': {
    title: 'PNC Bank',
    tagline: 'Reliable Custom Development for Financial Services.',
    industries: ['Financial Services'],
    techStack: ['.NET', 'SQL Server', 'Azure'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/06/company-logo-4.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/06/company-logo-4.png',
    project: 'A major financial services brand needed custom software development and consulting support that could meet the high standards required for systems handling sensitive financial data.',
    solution: 'The Demski Group provided custom development and consulting services, delivering reliable, well-tested solutions built to the rigorous standards expected in the financial services industry.',
    features: [
      { title: 'Rigorous Testing', text: 'Every deliverable went through thorough testing to meet financial-industry reliability standards.' },
      { title: 'Secure Development Practices', text: 'Solutions were built with security and compliance considerations from the start.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Reliable Delivery', text: 'Deliverables were completed on schedule and met the required quality bar.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group provided custom software development and consulting services, helping deliver reliable, well-tested solutions that met the high standards required in the financial services industry.',
  },
  'mister-quik': {
    title: 'Mister Quik Home Services',
    tagline: 'Powering Growth in Home Services.',
    industries: ['Home Services'],
    techStack: ['WordPress', 'PHP', 'JavaScript', 'SEO'],
    logo: '/Logo3-768x137.webp',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/07/mrquick.png',
    project: 'Mister Quik Home Services needed a development partner who could take on large website projects, deliver under tight deadlines, and remain honest and transparent throughout.',
    solution: 'The Demski Group has worked with Mister Quik on multiple large website development projects, delivering reliable, on-time work without cutting corners and staying responsive whenever the team needs help.',
    features: [
      { title: 'On-Time, High-Quality Delivery', text: 'Even with tight deadlines, work is delivered to a high standard without cutting corners.' },
      { title: 'Honest, Transparent Communication', text: 'No overpromising — expectations are set realistically and met consistently.' },
      { title: 'Responsive Support', text: 'The team is always available to answer questions and help out when needed.' },
    ],
    quote: 'Even with tight deadlines, they always deliver great work without cutting corners. What we really appreciate is how honest and transparent they are. They don\'t make promises they can\'t keep or set unrealistic expectations, which makes working with them stress-free.',
    quoteAuthor: 'Luke Reks, Marketing Manager',
    results: [
      { title: 'Stronger Digital Presence', text: 'Multiple successful website projects have strengthened Mister Quik\'s presence in the Home Services industry.' },
      { title: 'A Trusted, Ongoing Partnership', text: 'Mister Quik continues to rely on The Demski Group as a fantastic, dependable partner.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group has been a fantastic partner for Mister Quik Home Services — reliable, skilled, and easy to work with on every project.',
  },
  'jackson-hewitt': {
    title: 'Jackson Hewitt',
    tagline: 'Custom Development for Tax Season Scale.',
    industries: ['Financial Services'],
    techStack: ['PHP', 'MySQL', 'JavaScript'],
    logo: '/Logo3-768x137.webp',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/06/jacksonhewitt-1.png',
    project: 'One of the nation\'s largest tax preparation companies needed custom development support to keep digital operations running smoothly through high-demand periods.',
    solution: 'The Demski Group provided custom software development services that supported Jackson Hewitt\'s digital operations, delivering high-quality work on time and within budget.',
    features: [
      { title: 'On-Time, On-Budget Delivery', text: 'Development work was completed within agreed timelines and budgets.' },
      { title: 'High-Quality Engineering', text: 'Code and systems were built to support reliable operations during peak demand.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Smooth Digital Operations', text: 'Digital systems supported the business reliably through busy periods.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group provided custom software development services to support Jackson Hewitt\'s digital operations, delivering high-quality work on time and within budget.',
  },
  'seen-dating': {
    title: 'SEEN Dating',
    tagline: 'Evolving an App to Boost Engagement & Retention.',
    industries: ['Mobile Apps', 'Social'],
    techStack: ['React Native', 'Node.js', 'Firebase'],
    logo: '/logos/SEEN.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/06/SEENDating-1.png',
    project: 'SEEN Dating needed an app development partner who could continually evolve the product to increase user engagement and retention as the startup\'s needs changed.',
    solution: 'The Demski Group continues to evolve the SEEN Dating app, staying available across multiple communication channels to weigh in on the product and pivot quickly when priorities shift.',
    features: [
      { title: 'Continuous App Evolution', text: 'Ongoing feature development focused on increasing engagement and retention.' },
      { title: 'Multi-Channel Communication', text: 'Available across multiple channels to collaborate on product decisions.' },
      { title: 'Flexible, Fast Pivots', text: 'Able to shift direction quickly as the startup\'s needs evolve.' },
    ],
    quote: 'I really appreciate The Demski Group\'s willingness to shift quickly on projects and deadlines. The Demski Group continues to evolve the app to increase user engagement and retention. The team is available on multiple communication channels, which allows them to weigh in on various aspects of the product.',
    quoteAuthor: 'Evans Craddock, Production Coordinator',
    results: [
      { title: 'Increased Engagement', text: 'Ongoing improvements have helped grow user engagement over time.' },
      { title: 'Better Retention', text: 'Continued evolution of the app has supported stronger user retention.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group continues to evolve the SEEN Dating app to increase user engagement and retention, staying responsive and flexible as the startup grows.',
  },
  'willo': {
    title: 'Willo',
    tagline: 'A Smart IoT Toothbrush That Makes Kids’ Brushing Fun.',
    industries: ['IoT', 'Consumer Health'],
    techStack: ['Kotlin', 'Swift', 'Node.js', 'AWS'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/07/Willo-1.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/07/Willo-1.png',
    project: 'Willo needed a development partner to support and extend its video interviewing platform, helping the team ship improvements reliably.',
    solution: 'The Demski Group partnered with Willo to deliver custom development work supporting their video interviewing platform, helping the team ship improvements reliably and efficiently.',
    features: [
      { title: 'Reliable Feature Delivery', text: 'Consistent delivery of platform improvements and new features.' },
      { title: 'Efficient Development Process', text: 'Streamlined collaboration helped the team move quickly without sacrificing quality.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Platform Improvements Shipped Reliably', text: 'Willo\'s platform continues to evolve with consistent, dependable releases.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group partnered with Willo to deliver custom development work that supports their video interviewing platform, helping the team ship improvements reliably and efficiently.',
  },
  'robomaster': {
    title: 'Robomaster',
    tagline: 'Custom Development & Ongoing Technical Support.',
    industries: ['Technology'],
    techStack: ['JavaScript', 'Node.js', 'AWS'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/06/Robomaster-1.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/06/Robomaster-1.png',
    project: 'Robomaster needed custom software development and ongoing technical support to bring its product vision to life.',
    solution: 'The Demski Group provided custom software development and ongoing technical support, helping Robomaster build reliable, well-built software aligned with its product goals.',
    features: [
      { title: 'Custom Software Development', text: 'Built software tailored to Robomaster\'s specific product requirements.' },
      { title: 'Ongoing Technical Support', text: 'Continued support helps keep systems running smoothly after launch.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Reliable, Well-Built Software', text: 'Robomaster\'s product is backed by software built for reliability.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group provided custom software development and ongoing technical support, helping Robomaster bring its product vision to life with reliable, well-built software.',
  },
  'zoomifi': {
    title: 'Zoomifi',
    tagline: 'Elevate Your Connection.',
    industries: ['Mobile Apps', 'Point of Sale'],
    techStack: ['React Native', 'Node.js', 'iOS', 'Android'],
    logo: '/logos/Zoomifi.png',
    screenshot: '/logos/Zoomifi.png',
    project: 'Zoomifi needed to develop multi-platform POS applications to enhance the merchant and customer experience across devices.',
    solution: 'The Demski Group developed an updated platform to meet the needs of Zoomifi\'s merchants and customers — building applications that work across various platforms with high reliability.',
    features: [
      { title: 'Multi-Platform Support', text: 'Developed applications across iOS, Android, and other platforms with consistent user experiences.' },
      { title: 'Transaction Handling', text: 'Designed apps to handle transactions smoothly, ensuring high performance and minimal downtime.' },
      { title: 'Merchant Flexibility', text: 'Enabled merchants to offer a variety of payment options to customers, enhancing the overall shopping experience.' },
      { title: 'Scalability', text: 'Built applications to scale seamlessly, accommodating the growth of Zoomifi\'s merchant and transaction volumes.' },
    ],
    quote: 'After working with many development firms, I now funnel all my development to The Demski Group. The Demski Group has become our main app developer thanks to their consistency, quality of work, and high level of communication. They deliver apps with minimal bugs, remain open to feedback, and can take an app from idea to execution with next to no management on our part.',
    quoteAuthor: 'Slava Moshkovich, President',
    results: [
      { title: 'High Transaction Volume', text: 'The POS applications have successfully handled millions of transactions, ensuring reliability and efficiency.' },
      { title: 'Widespread Adoption', text: 'Thousands of merchants have adopted these applications, leveraging the enhanced payment options for their customer base.' },
      { title: 'Improved Merchant Operations', text: 'The flexibility and functionality of the apps have enabled merchants to streamline their operations and increase customer satisfaction.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group delivered a comprehensive suite of POS applications for Zoomifi, significantly enhancing their offerings and supporting the needs of a diverse merchant base. The project underscores our team\'s expertise in developing secure, scalable, and high-performance mobile and web solutions for the POS industry.',
  },
  'yawye': {
    title: 'Yawye',
    tagline: 'Consistent, Accountable Development.',
    industries: ['Technology'],
    techStack: ['JavaScript', 'React', 'Node.js'],
    logo: '/logos/Yawye.png',
    screenshot: '/logos/Yawye.png',
    project: 'Yawye needed a development partner that holds itself to high standards and delivers consistent, reliable results over time.',
    solution: 'The Demski Group consistently produces quality work for Yawye, with a team that holds itself accountable to high standards on every engagement.',
    features: [
      { title: 'High Standards', text: 'The team sets and maintains high standards for every piece of work delivered.' },
      { title: 'Accountability', text: 'Consistent accountability has built lasting trust with Yawye.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Ongoing Business', text: 'Consistent quality has earned The Demski Group continued, ongoing business from Yawye.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group consistently produces quality work for Yawye, with a team that holds itself to high standards and delivers results — earning continued, ongoing business from the client.',
  },
  'tausi-brands': {
    title: 'Tausi Brands',
    tagline: 'A Professional, High-Visibility Website.',
    industries: ['E-commerce'],
    techStack: ['WordPress', 'WooCommerce', 'SEO'],
    logo: '/logos/Tausi.png',
    screenshot: '/logos/Tausi.png',
    project: 'Tausi Brands needed a professional website that would resonate with customers across multiple industries and remain easy to manage.',
    solution: 'The Demski Group delivered a professional website for Tausi Brands, communicating effectively via Zoom and remaining accessible throughout the project.',
    features: [
      { title: 'Professional Design', text: 'A polished website that reflects the Tausi Brands identity.' },
      { title: 'Cross-Industry Appeal', text: 'Positive feedback received from users across many different industries.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Positive User Feedback', text: 'The new website received positive feedback from users across many industries.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group delivered a professional website for Tausi Brands that received positive feedback from users across many industries, communicating effectively via Zoom and remaining accessible throughout the project.',
  },
  'corning-glass': {
    title: 'Corning',
    tagline: 'Flexible Support, On-Time Delivery.',
    industries: ['Manufacturing'],
    techStack: ['WordPress', 'PHP', 'JavaScript'],
    logo: '/logos/Corning.png',
    screenshot: '/logos/Corning.png',
    project: 'Corning needed a development partner able to adapt to changing project timelines while keeping work on track.',
    solution: 'The Demski Group team helped Corning with their project, staying flexible as timelines changed and ensuring the work stayed on track.',
    features: [
      { title: 'Flexible Scheduling', text: 'Adapted to changing timelines without derailing the project.' },
      { title: 'On-Track Delivery', text: 'Kept the project moving forward despite shifting requirements.' },
    ],
    quote: 'The Demski Group team were great in helping out with our project and flexible with some of our changing timelines!',
    quoteAuthor: '',
    results: [
      { title: 'Project Stayed On Track', text: 'Despite changing timelines, the project was completed successfully.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group team helped Corning with their project, staying flexible as timelines changed and ensuring the work stayed on track.',
  },
  'flower-moxie-case-study': {
    title: 'FlowerMoxie',
    tagline: 'A Shopify Partnership Built to Last.',
    industries: ['E-commerce'],
    techStack: ['Shopify', 'Liquid', 'JavaScript'],
    logo: '/logos/FlowerMoxie.png',
    screenshot: '/logos/FlowerMoxie.png',
    project: 'FlowerMoxie needed a Shopify development partner for ongoing projects, with fair scoping and dependable communication.',
    solution: 'The Demski Group scoped and quoted FlowerMoxie\'s Shopify projects fairly, staying within estimated hours while remaining prompt and communicative throughout.',
    features: [
      { title: 'Fair Scoping & Quoting', text: 'Projects are scoped and quoted fairly, with work staying within estimated hours.' },
      { title: 'Prompt Communication', text: 'Extremely communicative and quick to hop on a call whenever needed.' },
      { title: 'Continuous Evolution', text: 'The app continues to evolve to increase user engagement and retention.' },
    ],
    quote: 'The Demski Group was an absolute pleasure to work with and I will continue to hire them for my other Shopify dev projects. They scoped and quoted the project fairly, stayed within the hours they estimated, was extremely prompt in completing the tasks, extremely communicative, and quick to hop on a call. HIGHLY RECOMMEND, they\'re a wonderful hire!',
    quoteAuthor: 'Amy McCord, Founder',
    results: [
      { title: 'Repeat Business', text: 'FlowerMoxie continues to hire The Demski Group for additional Shopify projects.' },
      { title: 'Higher Engagement & Retention', text: 'Ongoing app improvements have increased user engagement and retention.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group was a pleasure to work with on FlowerMoxie\'s Shopify development projects — scoping and quoting fairly, staying within estimated hours, and remaining prompt and communicative throughout.',
  },
  'golf-daddy': {
    title: 'Golf Daddy',
    tagline: 'A Website Launch Delivered as Promised.',
    industries: ['E-commerce'],
    techStack: ['Shopify', 'JavaScript', 'CSS'],
    logo: '/logos/BrandedAF.png',
    screenshot: '/logos/BrandedAF.png',
    project: 'Golf Daddy needed a development partner who would deliver what they promised, with clear, regular updates throughout the project.',
    solution: 'The Demski Group launched the Golf Daddy website on plan, holding regular weekly meetings to keep the client updated on tasks, plans, and feedback.',
    features: [
      { title: 'Delivered As Promised', text: 'The team delivered exactly what was committed to, on schedule.' },
      { title: 'Regular Weekly Updates', text: 'Weekly meetings kept the client informed on tasks, plans, and feedback.' },
    ],
    quote: 'They delivered what they said they would, and it worked as planned. As a result of the collaboration, The Demski Group successfully launched the website, and the revenue started generating. The team regularly held weekly meetings, keeping the client updated on all tasks, plans, and feedback.',
    quoteAuthor: 'Chris Thompson, Managing Partner',
    results: [
      { title: 'Successful Website Launch', text: 'The new website launched successfully and began generating revenue.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group delivered exactly what was promised for Golf Daddy — launching the website on plan and holding regular weekly meetings to keep the client updated throughout the collaboration.',
  },
  'audiojack': {
    title: 'AudioJack',
    tagline: 'A Partnership That Adapts and Grows.',
    industries: ['Technology'],
    techStack: ['JavaScript', 'React', 'Node.js'],
    logo: '/logos/Audiojack.png',
    screenshot: '/logos/Audiojack.png',
    project: 'AudioJack needed a development partner that communicates regularly and can adapt as project needs change over time.',
    solution: 'The Demski Group communicates regularly with AudioJack and adapts as project needs change, going the extra mile to stay present and responsive.',
    features: [
      { title: 'Regular Communication', text: 'The team communicates regularly throughout every engagement.' },
      { title: 'Adaptable to Change', text: 'Able to adapt quickly as project requirements evolve.' },
    ],
    quote: 'Fantastic experience working with this team. They communicate regularly, understand that things can change and adapt as we sorted through the issues that came up with the project. All very important qualities when working with someone. The other elements I expect to be good, but being able to go the extra mile and be present was wonderful. Will work with them again as we continue to grow.',
    quoteAuthor: 'David Tobin, Founder',
    results: [
      { title: 'Continued Collaboration', text: 'AudioJack plans to work with The Demski Group again as the company continues to grow.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group communicates regularly with AudioJack and adapts as project needs change, going the extra mile to stay present and responsive — qualities the team plans to rely on again as the company continues to grow.',
  },
  'impact-team-tennis': {
    title: 'Impact Team Tennis',
    tagline: 'A More User-Friendly Platform.',
    industries: ['Sports & Recreation'],
    techStack: ['WordPress', 'PHP', 'JavaScript'],
    logo: '/logos/ImpactTennis.png',
    screenshot: '/logos/ImpactTennis.png',
    project: 'Impact Team Tennis inherited a complex platform with bugs and usability issues that needed to be addressed without disrupting operations.',
    solution: 'The Demski Group inherited the platform and has been able to fix bugs and make it more user-friendly, while remaining professional, timely, and a pleasure to work with.',
    features: [
      { title: 'Bug Fixes', text: 'Resolved existing platform issues to improve stability.' },
      { title: 'Improved Usability', text: 'Made the platform more user-friendly for everyday use.' },
    ],
    quote: 'The Demski Group is great to work with! They inherited a mess with our platform and have been able to fix the bugs and make the platform more user friendly. They are also very professional and timely as well as a pleasure to work with! We have worked with Andrew Demski for all of our IT needs.',
    quoteAuthor: 'Delaine Mast, CEO',
    results: [
      { title: 'More Stable Platform', text: 'Bug fixes have improved overall platform stability.' },
      { title: 'Better User Experience', text: 'The platform is now more user-friendly for Impact Team Tennis users.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group inherited a complex platform for Impact Team Tennis and has been able to fix bugs and make it more user-friendly, while remaining professional, timely, and a pleasure to work with.',
  },
  'bite': {
    title: 'Bite',
    tagline: 'Custom Development Support for a Growing Brand.',
    industries: ['Technology'],
    techStack: ['JavaScript', 'React', 'Node.js'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/08/newbitelogo.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/08/newbitelogo.png',
    project: 'Bite needed custom development support to help build and refine its product as the company grows.',
    solution: 'The Demski Group provided custom development support to help Bite build and refine its product, working closely with the team to deliver reliable results.',
    features: [
      { title: 'Close Collaboration', text: 'Worked closely with the Bite team throughout development.' },
      { title: 'Reliable Delivery', text: 'Delivered reliable results aligned with Bite\'s product goals.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Product Refinement', text: 'Bite\'s product continues to be refined with ongoing development support.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group provided custom development support to help Bite build and refine its product, working closely with the team to deliver reliable results.',
  },
  'hewlett-packard-enterprise': {
    title: 'Hewlett Packard Enterprise',
    tagline: 'Enterprise-Grade Development & Consulting.',
    industries: ['Enterprise Technology'],
    techStack: ['.NET', 'Java', 'Azure', 'AWS'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/05/group-of-people-working.jpg',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/05/group-of-people-working.jpg',
    project: 'Hewlett Packard Enterprise needed software development and consulting work delivered to the rigorous standards expected of a global technology leader.',
    solution: 'The Demski Group delivered enterprise-grade software development and consulting work for Hewlett Packard Enterprise, meeting rigorous quality and reliability standards.',
    features: [
      { title: 'Enterprise-Grade Quality', text: 'Work was built and tested to meet enterprise reliability standards.' },
      { title: 'Consulting Support', text: 'Provided consulting alongside development to align solutions with business goals.' },
    ],
    quote: '',
    quoteAuthor: '',
    results: [
      { title: 'Standards Met', text: 'Delivered work that met the rigorous standards expected by a global technology leader.' },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group delivered enterprise-grade software development and consulting work for Hewlett Packard Enterprise, meeting the rigorous standards expected by a global technology leader.',
  },
  'farmers-daughter-fibers': {
    title: "Farmer's Daughter Fibers",
    tagline: 'Better Tools, Better Customer Experience.',
    industries: ['E-commerce'],
    techStack: ['WordPress', 'WooCommerce', 'SEO', 'PPC'],
    logo: '/logos/FarmersDaughter.png',
    screenshot: '/logos/FarmersDaughter.png',
    project: "Farmer's Daughter Fibers needed website updates and custom tools to improve the customer experience and grow online sales and visibility.",
    solution: "The Demski Group did an outstanding job updating Farmer's Daughter Fibers' website and implementing custom tools that greatly improved the customer experience, alongside SEO and PPC work to grow visibility.",
    features: [
      { title: 'Website Updates', text: 'Refreshed the website to better serve customers.' },
      { title: 'Custom Tools', text: 'Implemented custom tools that improved the overall customer experience.' },
      { title: 'SEO & PPC', text: 'Expertise in SEO and PPC significantly increased online visibility and sales.' },
    ],
    quote: "The Demski Group has done an outstanding job updating our website and implementing custom tools that have greatly improved our customer experience. Their expertise in SEO and PPC has also significantly increased our online visibility and sales. We are extremely pleased with the outcome and the positive feedback we've received from our customers.",
    quoteAuthor: 'Candice English, Owner',
    results: [
      { title: 'Increased Online Visibility', text: 'SEO and PPC work significantly increased online visibility.' },
      { title: 'Increased Sales', text: 'Online sales grew alongside improved visibility and customer experience.' },
    ],
    resultsStats: [],
    conclusion: "The Demski Group did an outstanding job updating Farmer's Daughter Fibers' website and implementing custom tools that greatly improved the customer experience. Their expertise in SEO and PPC also significantly increased online visibility and sales.",
  },
  'nu-borders': {
    title: 'Nu Borders',
    tagline: 'Redefining Global Boundaries.',
    industries: ['Technology', 'Consulting'],
    techStack: ['React', 'Node.js', 'AWS'],
    logo: 'https://demskigroup.com/wp-content/uploads/2024/07/Nuborders.png',
    screenshot: 'https://demskigroup.com/wp-content/uploads/2024/07/Nuborders.png',
    project: 'Nu Borders required a modernized online presence with a responsive React JS website that could keep pace with their growing business.',
    solution: 'The Demski Group developed an updated website for Nu Borders using React JS, featuring a modern, improved design and responsive layout to provide an optimal user experience across all devices.',
    features: [
      { title: 'Modern Design', text: 'Implemented a sleek and contemporary design to align with Nu Borders\' brand identity.' },
      { title: 'Responsive Layout', text: 'Developed a fully responsive layout that adapts seamlessly across desktops, tablets, and mobile devices.' },
      { title: 'Improved Navigation', text: 'Redesigned the site\'s navigation structure to make it more intuitive and user-friendly.' },
      { title: 'Performance Optimization', text: 'Enhanced the website\'s performance by optimizing load times and smooth interactions.' },
    ],
    quote: 'We had a fantastic experience working with The Demski Group. They communicated regularly, understood that things can change and adapted as we sorted through the issues that came up with the project. The site was completed on time and we look forward to working with them again.',
    quoteAuthor: 'David Smith, Budapest Founder',
    results: [
      { title: 'Enhanced User Experience', text: 'The updated website provided a more engaging and user-friendly experience, leading to increased visitor satisfaction.' },
      { title: 'Improved Online Presence', text: 'The modern design and improved functionality helped Nu Borders better showcase their services and attract new clients.' },
      { title: 'Responsive Design', text: "The website's responsiveness ensured that users had a consistent and high-quality experience on all devices." },
    ],
    resultsStats: [],
    conclusion: 'The Demski Group successfully delivered an updated website for Nu Borders, leveraging React JS to develop a modern, responsive online presence — strengthening the brand\'s digital footprint and engagement with online audiences.',
  },
};

// Generic fallback used when a slug has no dedicated entry above and the
// live API has nothing for it either.
export const GENERIC_FALLBACK: ClientFallback = {
  title: 'Case Study',
  tagline: 'Custom Software, Built for Real Results.',
  industries: ['Custom Software'],
  techStack: ['JavaScript', 'React', 'Node.js'],
  logo: '/Logo3-768x137.webp',
  screenshot: '/Logo3-768x137.webp',
  project: 'The Demski Group partners with businesses across industries to design, build, and ship custom software solutions tailored to each client\'s needs.',
  solution: 'Our team works closely with clients from discovery through delivery, designing solutions that fit real business needs and building them to last.',
  features: [
    { title: 'Tailored Solutions', text: 'Every project starts with understanding the client\'s unique goals and constraints.' },
    { title: 'Reliable Delivery', text: 'We deliver on time, with clear communication throughout the project.' },
  ],
  quote: '',
  quoteAuthor: '',
  results: [
    { title: 'A Lasting Partnership', text: 'Many of our clients return for additional projects after seeing the results of working with us.' },
  ],
  resultsStats: [],
  conclusion: 'Full case study content for this client is being updated. In the meantime, browse more of our work on the Our Clients page, or get in touch to discuss a project of your own.',
};

// Removes </div> tags that have no matching <div> earlier in the string
// (i.e. would underflow a depth counter), leaving all balanced divs intact.
function removeUnmatchedClosingDivs(html: string): string {
  const tagRe = /<\/?div\b[^>]*>/gi;
  let depth = 0;
  let result = '';
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    const isClose = m[0].startsWith('</');
    if (isClose && depth === 0) {
      // Drop this unmatched closing tag: append everything up to it, skip the tag itself.
      result += html.slice(lastIndex, m.index);
      lastIndex = m.index + m[0].length;
      continue;
    }
    depth += isClose ? -1 : 1;
  }
  result += html.slice(lastIndex);
  return result;
}

// Finds the first <div ...> whose opening tag matches `openTagRe`, then scans
// forward tracking nesting depth to find that div's true matching </div>, and
// removes the whole balanced span (open tag through matching close). Returns
// the original string unchanged if no match is found. Used to remove a
// specific wrapper div without disturbing the overall div balance — a plain
// non-greedy regex (`<div...>...</div>`) would stop at the first `</div>`,
// which may belong to a nested child rather than the matched div itself.
function removeBalancedDiv(html: string, openTagRe: RegExp): string {
  const openMatch = html.match(openTagRe);
  if (!openMatch || openMatch.index === undefined) return html;
  const startIdx = openMatch.index;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = startIdx;
  let depth = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    const isClose = m[0].startsWith('</');
    depth += isClose ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, startIdx) + html.slice(m.index + m[0].length);
    }
  }
  return html;
}

// When the stop pattern cuts the document mid-section, the slice can end with
// one or more <div> opening tags whose matching </div> fell after the cut
// point (and was already trimmed). These trailing unmatched opens would
// otherwise close .cs-content early once the browser parses them. Walk the
// div tags tracking depth and drop any opening tag whose depth never returns
// to 0 by the end of the string.
function removeTrailingUnmatchedOpenDivs(html: string): string {
  const tagRe = /<\/?div\b[^>]*>/gi;
  let depth = 0;
  const opens: { index: number; length: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    const isClose = m[0].startsWith('</');
    if (isClose) {
      depth -= 1;
      if (depth >= 0) opens.pop();
    } else {
      depth += 1;
      opens.push({ index: m.index, length: m[0].length });
    }
  }
  if (opens.length === 0) return html;
  let result = html;
  for (let i = opens.length - 1; i >= 0; i--) {
    const { index, length } = opens[i];
    result = result.slice(0, index) + result.slice(index + length);
  }
  return result;
}

// Extracts the full case-study body from WordPress's Elementor-rendered
// `content.rendered` HTML. WordPress stores the entire page (global services
// list, this case study's narrative, "other case studies", FAQ, final CTA)
// in one blob — this slices out just the narrative, starting at "The Project"
// and stopping before the first global/page-chrome section, while preserving
// every heading, paragraph, image, list, quote, etc. in between regardless of
// how many sections or sub-sections the case study has.
export function extractCaseStudyHtml(html: string, opts: { includeServices?: boolean } = {}): string {
  if (!html) return '';

  const startMatch = html.match(/<h2[^>]*>\s*(?:The Project|The Problem)\s*<\/h2>/i);
  if (!startMatch || startMatch.index === undefined) return '';
  const startIdx = startMatch.index;

  const stopPatterns = [
    // biopac's reference design keeps the "Our Custom Software Development
    // Services" block (styled inside the gray Results band); every other
    // case study stops before it as page chrome.
    ...(opts.includeServices ? [] : [/<h2[^>]*>\s*Our Custom Software Development Services\s*<\/h2>/i]),
    /<h2[^>]*>\s*Some of Our Other[^<]*Success Stories\.?\s*<\/h2>/i,
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i,
    /<h2[^>]*>\s*Ready to[^<]*<\/h2>/i,
    /<h2[^>]*>\s*Facing Similar Challenges[^<]*<\/h2>/i,
    /<h2[^>]*>\s*The Demski Group and[^<]*<\/h2>/i,
    /<h2[^>]*>\s*Let'?s Talk About[^<]*<\/h2>/i,
    /Transform Your Vision into Reality/i,
  ];

  let endIdx = html.length;
  for (const p of stopPatterns) {
    const m = html.slice(startIdx).match(p);
    if (m && m.index !== undefined) {
      endIdx = Math.min(endIdx, startIdx + m.index);
    }
  }

  let body = html.slice(startIdx, endIdx);

  // Trim to the last fully-closed </div> so we don't leave a dangling,
  // unclosed wrapper at the cut point.
  const lastClose = body.lastIndexOf('</div>');
  if (lastClose !== -1) {
    body = body.slice(0, lastClose + '</div>'.length);
  }

  // The slice point falls inside several of the source page's outer wrapper
  // divs (global header/section containers), so the slice starts with a run
  // of </div> tags that close wrappers we never opened. Strip just those
  // unmatched closing tags so the extracted HTML is self-balanced — without
  // this, browsers close .cs-content early and everything after the first
  // section renders outside our layout container.
  body = removeUnmatchedClosingDivs(body);
  body = removeTrailingUnmatchedOpenDivs(body);

  // Strip Elementor decorative "shape divider" SVGs — these render as solid
  // black blobs without Elementor's own CSS (which positions/colors them),
  // and they're purely decorative wave/curve dividers between sections.
  body = body.replace(/<div[^>]*\belementor-shape\b[^>]*>[\s\S]*?<\/div>/gi, '');

  // Strip canvas+script animated connector widgets (e.g. the purple dashed
  // animated line on the Willo page). These are Elementor custom HTML widgets
  // that draw decorative lines on a <canvas> via JS — they have no content
  // value and render incorrectly outside Elementor's layout context.
  body = body.replace(/<canvas[^>]*class="[^"]*dottedLineCanvas[^"]*"[^>]*>[\s\S]*?<\/canvas>/gi, '');
  body = body.replace(/<canvas[^>]*class="[^"]*dottedLineCanvas[^"]*"[^>]*\/>/gi, '');
  // Also strip the accompanying <script> blocks that drive them.
  body = body.replace(/<script[\s\S]*?dottedLineCanvas[\s\S]*?<\/script>/gi, '');

  // Elementor's "nested accordion" widget only marks its first item <details>
  // as open; the rest collapse their content via the native <details> "open"
  // attribute, which CSS cannot override. Force every accordion item open so
  // all items render as always-visible sub-sections.
  body = body.replace(
    /<details([^>]*\bclass="[^"]*\be-n-accordion-item\b[^"]*"[^>]*)>/gi,
    (match, attrs) => (/\bopen\b/.test(attrs) ? match : `<details${attrs} open>`)
  );

  // Some case studies repeat the "Industry" / "Tech Stack" sidebar info as a
  // content block (h6 label + value, e.g. "Scientific Research, Data
  // Analytics" + tech buttons). client.industries/client.techStack already
  // render this in .cs-sidebar, so remove the whole duplicate wrapper div
  // (as a balanced span) to avoid an unlabeled stray line in the body.
  {
    const wrapperOpenRe = /<div[^>]*\bclass="[^"]*\be-con\b[^"]*\be-child\b[^"]*"[^>]*>(?=[\s\S]{0,500}?<h6[^>]*>\s*Industry\s*<\/h6>)/i;
    const wrapperMatch = body.match(wrapperOpenRe);
    if (wrapperMatch && wrapperMatch.index !== undefined) {
      const before = body.slice(0, wrapperMatch.index);
      const after = removeBalancedDiv(body.slice(wrapperMatch.index), wrapperOpenRe);
      body = before + after;
    }
  }

  // Remove any remaining standalone "Industry" / "Tech Stack" sidebar labels
  // — the values stay and render inline, which is harmless.
  body = body.replace(/<h6[^>]*>\s*(?:Industry|Tech Stack)\s*<\/h6>/gi, '');

  // A testimonial quote is sometimes marked by a preceding "quote-left" icon
  // widget rather than <em> styling: an elementor-widget-icon block containing
  // <i class="fas fa-quote-left">, immediately followed by the plain-text
  // quote paragraph. Remove the icon widget as a balanced div span (so
  // overall div nesting stays intact), then mark the next plain paragraph
  // after it as a blockquote.
  {
    const iconOpenRe = /<div[^>]*\belementor-widget-icon\b[^>]*>(?=[\s\S]*?fa-quote-left)/i;
    const iconMatch = body.match(iconOpenRe);
    if (iconMatch && iconMatch.index !== undefined) {
      const before = body.slice(0, iconMatch.index);
      const after = removeBalancedDiv(body.slice(iconMatch.index), iconOpenRe);
      body = before + after.replace(/<p>([\s\S]*?)<\/p>/i, (_m, inner) => `<blockquote><p>${inner}</p></blockquote>`);
    }
  }

  // Strip empty Elementor icon tags.
  body = body.replace(/<i[^>]*class="[^"]*elementor[^"]*"[^>]*>\s*<\/i>/gi, '');
  body = body.replace(/<i[^>]*aria-hidden="true"[^>]*><\/i>/gi, '');

  // Normalize h4/h5/h6 -> h3 so heading levels stay consistent with our design system.
  body = body.replace(/<h[4-6]([^>]*)>/gi, '<h3$1>');
  body = body.replace(/<\/h[4-6]>/gi, '</h3>');

  // Drop empty paragraphs/headings left behind by the slicing/cleanup above.
  body = body.replace(/<p[^>]*>\s*<\/p>/gi, '');
  body = body.replace(/<h[2-3][^>]*>\s*<\/h[2-3]>/gi, '');

  // Some case studies write bullet lists as plain "&bull; text" runs inside
  // <span> tags rather than real <ul><li> markup. Convert runs of 2+ such
  // bullet-spans into a proper <ul><li> list so they render as a list
  // instead of a single run-on inline paragraph.
  body = body.replace(
    /(?:<span[^>]*>\s*(?:&bull;|•)\s*([\s\S]*?)<\/span>\s*){2,}/gi,
    (match) => {
      const items = [...match.matchAll(/<span[^>]*>\s*(?:&bull;|•)\s*([\s\S]*?)<\/span>/gi)]
        .map((m) => `<li>${m[1].trim()}</li>`)
        .join('');
      return `<ul>${items}</ul>`;
    }
  );

  // A testimonial-style quote is often a plain <p><em>...</em></p> rather
  // than a <blockquote>. Convert a fully-italic paragraph into a blockquote
  // so it gets the quote styling (large quote mark, etc.).
  body = body.replace(
    /<p>\s*<em>([\s\S]*?)<\/em>\s*<\/p>/gi,
    (_match, inner) => `<blockquote><p>${inner}</p></blockquote>`
  );

  // A testimonial citation ("Name<br>Title") is often its own
  // <p><span>Name</span><br><span>Title</span></p>, sitting in a sibling
  // wrapper div from the quote above (so "blockquote + p" CSS can't reach
  // it). Mark it with a class so it can be styled directly.
  body = body.replace(
    /<p>\s*<span[^>]*>([^<]+)<\/span>\s*<br\s*\/?>\s*<span[^>]*>([^<]+)<\/span>\s*<\/p>/gi,
    (_match, name, title) => `<p class="cs-quote-cite">${name.trim()}<br>${title.trim()}</p>`
  );

  body = body.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  return body.trim();
}

export function cleanText(s: string | undefined | null): string {
  return (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '…')
    .replace(/\[&hellip;\]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Merge raw WordPress API data (may be null/partial) with the static
 * fallback dataset to produce a complete, render-ready client object.
 * Guarantees every field is populated so the template never has to
 * special-case missing data.
 */
export function normalizeClient(slug: string, apiItem: any | null): NormalizedClient {
  const fallback = CLIENT_FALLBACKS[slug] || GENERIC_FALLBACK;

  const apiTitle = cleanText(apiItem?.title?.rendered);
  const apiContent = extractCaseStudyHtml(apiItem?.content?.rendered || '', { includeServices: slug === 'biopac' });
  const apiExcerpt = cleanText(apiItem?.excerpt?.rendered);
  const apiImage = apiItem?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const rawApiIndustry = cleanText(apiItem?._embedded?.['wp:term']?.[0]?.[0]?.name);
  // Reject obviously wrong taxonomy values (e.g. "Bio Pack" — a stray WP tag
  // accidentally assigned to BIOPAC). Fall back to static data for anything
  // that doesn't look like a real industry label.
  const KNOWN_BAD_INDUSTRIES = new Set(['bio pack', 'test', 'uncategorized']);
  const apiIndustry = (rawApiIndustry && !KNOWN_BAD_INDUSTRIES.has(rawApiIndustry.toLowerCase())) ? rawApiIndustry : '';

  return {
    ...fallback,
    slug,
    title: apiTitle || fallback.title,
    industries: apiIndustry ? [apiIndustry] : fallback.industries,
    logo: apiImage || fallback.logo,
    screenshot: apiImage || fallback.screenshot,
    excerpt: apiExcerpt || fallback.tagline,
    content: apiContent,
    link: `/our-clients/${slug}/`,
  };
}
