// Static content for Phase 1. In later phases this can move to Supabase tables
// (services, portfolio_projects, team_members, blog_posts) without changing pages much.

export type Service = {
  slug: string;
  number: string;
  title: string;
  icon: "globe" | "cpu" | "database" | "pen" | "compass" | "file";
  summary: string;
  overview: string;
  offers: string[];
  problems: string[];
  solutions: string[];
  deliverables: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    number: "01",
    title: "Website Development",
    icon: "globe",
    summary: "Fast, responsive websites that present your business clearly and turn visitors into inquiries.",
    overview:
      "We build websites that do a job: explain what you offer, earn trust, and make it easy for people to contact or buy from you. Every site is responsive, quick to load, and built so you can grow it later.",
    offers: ["Business websites", "Corporate websites", "Portfolio websites", "Landing pages", "E-commerce websites", "Responsive website development"],
    problems: [
      "No online presence, so customers can't find or verify the business",
      "An outdated site that looks bad on phones",
      "Inquiries lost in DMs and scattered channels",
    ],
    solutions: [
      "A clear, modern site structured around what your customers need to know",
      "Mobile-first layouts tested across screen sizes",
      "Contact and inquiry forms that route straight to you",
    ],
    deliverables: ["Sitemap and wireframes", "Designed and developed website", "Basic on-page SEO setup", "Deployment and handover guide"],
    benefits: ["Credibility with new customers", "More inquiries from search and social", "A site you can update and extend"],
    faqs: [
      { q: "How long does a website take?", a: "A simple landing page can take one to two weeks. Larger multi-page sites take longer. We confirm a timeline after the discovery call." },
      { q: "Can I update the content myself?", a: "Yes, if you need to. We can set up an editable content area or provide a simple guide, depending on your needs and budget." },
    ],
  },
  {
    slug: "system-development",
    number: "02",
    title: "System Development",
    icon: "cpu",
    summary: "Custom web systems that replace spreadsheets and manual work with organized, reliable workflows.",
    overview:
      "When spreadsheets, paper forms, and group chats stop keeping up, a custom system helps. We design and build web applications around how your team actually works.",
    offers: ["Inventory management systems", "Booking and reservation systems", "Employee management systems", "Business management systems", "Workflow automation", "Customized web applications"],
    problems: ["Repetitive manual data entry", "Records spread across files and people", "No real-time view of stock, bookings, or staff"],
    solutions: ["A centralized system with role-based access", "Automated routine steps and notifications", "Dashboards that show what matters at a glance"],
    deliverables: ["Requirements document", "Database design and ERD", "Working web application", "User manual and admin guide"],
    benefits: ["Less time spent on admin work", "Fewer errors and lost records", "Better decisions from accurate data"],
    faqs: [
      { q: "Do you build off-the-shelf or custom?", a: "Custom. We start from your process, though we will recommend an existing tool if it fits better and costs less." },
      { q: "Can the system grow later?", a: "Yes. We structure systems in modules so new features can be added without rebuilding." },
    ],
  },
  {
    slug: "database-design",
    number: "03",
    title: "Database Design and ERD",
    icon: "database",
    summary: "Well-structured databases and clear ERDs that keep your data consistent and your system scalable.",
    overview:
      "A good system starts with good data structure. We design relational databases, normalize them properly, and document them so developers and stakeholders understand how everything connects.",
    offers: ["Database architecture", "Relational database design", "Database normalization", "SQL development", "Entity Relationship Diagrams", "Data dictionaries", "Database documentation"],
    problems: ["Duplicate and inconsistent records", "Slow queries as data grows", "No documentation of how tables relate"],
    solutions: ["Normalized schemas with proper keys and constraints", "Indexes designed around real queries", "ERDs and data dictionaries anyone can read"],
    deliverables: ["Entity Relationship Diagram", "SQL schema and migration scripts", "Data dictionary", "Database documentation"],
    benefits: ["Reliable, consistent data", "Easier future development", "Clear reference for your team"],
    faqs: [
      { q: "Which databases do you work with?", a: "Mainly PostgreSQL and MySQL. We pick the one that fits your project and hosting." },
      { q: "Can you document an existing database?", a: "Yes. We can review your current database and produce an ERD and data dictionary for it." },
    ],
  },
  {
    slug: "ui-ux-design",
    number: "04",
    title: "UI/UX Design",
    icon: "pen",
    summary: "Interfaces that are easy to use and good to look at, designed and prototyped before a line of code.",
    overview:
      "We design screens people can use without a manual. Wireframes and Figma prototypes let you see and test your product before development starts, which saves time and money.",
    offers: ["User interface design", "User experience design", "Website wireframes", "Application prototypes", "Figma designs", "Design systems", "Usability improvements"],
    problems: ["Users get confused or drop off", "Inconsistent look across pages", "Developers building without a clear design"],
    solutions: ["User flows mapped around real tasks", "Clickable prototypes for early feedback", "A reusable design system for consistency"],
    deliverables: ["User flows and wireframes", "High-fidelity Figma designs", "Interactive prototype", "Basic design system"],
    benefits: ["Fewer revisions during development", "Happier, more confident users", "A consistent brand experience"],
    faqs: [
      { q: "Do I get the Figma files?", a: "Yes. You receive the design files at handover." },
      { q: "Can you improve an existing app's design?", a: "Yes. We can review your current interface and propose usability improvements." },
    ],
  },
  {
    slug: "it-consulting",
    number: "05",
    title: "IT Consulting",
    icon: "compass",
    summary: "Practical advice on what technology you need, what you don't, and how to get there.",
    overview:
      "Not every problem needs new software. We help you understand your requirements, assess options, and choose technology that fits your goals and budget.",
    offers: ["Technology assessment", "Business requirements analysis", "Digital transformation consulting", "System planning", "Technology recommendations", "Software and system feasibility assessment"],
    problems: ["Unsure which tools or systems to invest in", "Projects that started without clear requirements", "Technology that doesn't match how the business works"],
    solutions: ["A structured review of your current setup", "Documented requirements before any build", "Clear, honest recommendations with trade-offs"],
    deliverables: ["Assessment report", "Requirements document", "Technology recommendation and roadmap"],
    benefits: ["Avoid costly wrong purchases", "A clear plan before spending", "Technology aligned with business goals"],
    faqs: [
      { q: "Is consulting only for big companies?", a: "No. Small businesses and individuals often benefit most, since every peso spent on technology matters." },
      { q: "Will you push your own services?", a: "We recommend what fits. If an existing product solves your problem, we will say so." },
    ],
  },
  {
    slug: "technical-documentation",
    number: "06",
    title: "Technical Documentation",
    icon: "file",
    summary: "Clear documentation that helps your team understand, use, and maintain your systems.",
    overview:
      "Good documentation keeps knowledge from disappearing when people move on. We write specifications, manuals, and diagrams that are accurate and easy to follow.",
    offers: ["Software documentation", "System specifications", "User manuals", "Process flow diagrams", "System architecture documentation", "Database documentation", "Technical reports"],
    problems: ["Only one person knows how the system works", "New staff struggle to learn tools", "No written specs for developers"],
    solutions: ["Structured documents written for the right audience", "Diagrams that explain flows and architecture", "Versioned docs that are easy to update"],
    deliverables: ["System specification", "User manual", "Process and architecture diagrams", "Technical report"],
    benefits: ["Faster onboarding", "Easier maintenance", "Less dependence on any one person"],
    faqs: [
      { q: "Can you document a system you didn't build?", a: "Yes. We review the system, interview users, and document how it works." },
      { q: "What format do you deliver in?", a: "Usually PDF and editable formats like Google Docs, Word, or Markdown, depending on your preference." },
    ],
  },
];

export const portfolioCategories = [
  "Website Development",
  "System Development",
  "Database Design",
  "ERD and System Architecture",
  "UI/UX Design",
  "IT Consulting",
  "Technical Documentation",
] as const;

export type Project = {
  slug: string;
  title: string;
  category: (typeof portfolioCategories)[number];
  tags: (typeof portfolioCategories)[number][];
  mock: "site" | "dashboard" | "table" | "erd" | "chart" | "calendar";
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  erd?: { entity: string; fields: string[] }[];
  benefits: string[];
  services: string[]; // service slugs
};

export const projects: Project[] = [
  {
    slug: "restaurant-business-website",
    title: "Restaurant Business Website",
    category: "Website Development",
    tags: ["Website Development", "UI/UX Design"],
    mock: "site",
    summary: "A responsive restaurant site with a digital menu and reservation inquiry form.",
    overview: "A concept website for a small restaurant that wants to show its menu online and take reservation requests without relying on social media messages.",
    problem: "Small restaurants often depend on social media posts and DMs for menus and reservations, which makes information hard to find and requests easy to miss.",
    solution: "A clean, mobile-first website with a browsable menu, location and hours, and a reservation inquiry form that sends requests to the owner.",
    features: ["Homepage", "Menu display", "Reservation inquiry form", "Contact page", "Responsive interface"],
    tech: ["Next.js", "Tailwind CSS", "Resend (email)"],
    benefits: ["Customers find the menu and hours quickly", "Reservation requests arrive in one place", "A professional first impression"],
    services: ["website-development", "ui-ux-design"],
  },
  {
    slug: "inventory-management-system",
    title: "Inventory Management System",
    category: "System Development",
    tags: ["System Development", "Database Design"],
    mock: "table",
    summary: "Track products, stock levels, and low-stock alerts from one admin dashboard.",
    overview: "A concept inventory system for a retail or supply business that tracks products and stock movement in real time.",
    problem: "Inventory kept in spreadsheets drifts out of date, causing stockouts, overstocking, and time wasted on manual counts.",
    solution: "A web-based system that records stock in and out, flags low stock automatically, and generates inventory reports.",
    features: ["Product management", "Inventory tracking", "Stock monitoring", "Low-stock alerts", "Inventory reporting", "Admin dashboard"],
    tech: ["Next.js", "TypeScript", "PostgreSQL (Supabase)"],
    erd: [
      { entity: "products", fields: ["id (PK)", "sku", "name", "category_id (FK)", "reorder_level"] },
      { entity: "categories", fields: ["id (PK)", "name"] },
      { entity: "stock_movements", fields: ["id (PK)", "product_id (FK)", "type (in/out)", "quantity", "created_at"] },
    ],
    benefits: ["Accurate stock counts", "Fewer stockouts", "Faster reporting"],
    services: ["system-development", "database-design"],
  },
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    category: "System Development",
    tags: ["System Development", "UI/UX Design"],
    mock: "dashboard",
    summary: "Employee records, attendance, and leave requests in one secure system.",
    overview: "A concept HR system for small and mid-sized organizations to manage employee information, attendance, and leave.",
    problem: "Attendance sheets and leave forms on paper are slow to process and hard to audit.",
    solution: "A system with employee profiles, daily attendance logging, leave requests with approval flow, and admin controls.",
    features: ["Employee records", "Attendance tracking", "Leave management", "Employee dashboard", "Administrative controls"],
    tech: ["Next.js", "TypeScript", "PostgreSQL (Supabase)", "Supabase Auth"],
    erd: [
      { entity: "employees", fields: ["id (PK)", "name", "department_id (FK)", "position"] },
      { entity: "attendance", fields: ["id (PK)", "employee_id (FK)", "date", "time_in", "time_out"] },
      { entity: "leave_requests", fields: ["id (PK)", "employee_id (FK)", "start_date", "end_date", "status"] },
    ],
    benefits: ["Less paperwork", "Clear attendance records", "Faster leave approvals"],
    services: ["system-development", "ui-ux-design"],
  },
  {
    slug: "database-architecture-erd",
    title: "Database Architecture and ERD",
    category: "ERD and System Architecture",
    tags: ["ERD and System Architecture", "Database Design", "Technical Documentation"],
    mock: "erd",
    summary: "A normalized database design with ERD, SQL tables, and full data dictionary.",
    overview: "A concept database design package for an order management system, showing how we document data structure end to end.",
    problem: "Systems built without a planned database end up with duplicated data, broken relationships, and painful changes later.",
    solution: "A normalized (3NF) schema with clear keys, constraints, and relationships, documented in an ERD and data dictionary.",
    features: ["Entity Relationship Diagram", "Database normalization", "SQL table structures", "Relationships and constraints", "Data dictionary", "Database documentation"],
    tech: ["PostgreSQL", "SQL", "dbdiagram / Figma"],
    erd: [
      { entity: "customers", fields: ["id (PK)", "name", "email (UNIQUE)"] },
      { entity: "orders", fields: ["id (PK)", "customer_id (FK)", "status", "ordered_at"] },
      { entity: "order_items", fields: ["order_id (FK)", "product_id (FK)", "quantity", "unit_price"] },
      { entity: "products", fields: ["id (PK)", "name", "price"] },
    ],
    benefits: ["Consistent, reliable data", "A clear blueprint for developers", "Easier scaling and maintenance"],
    services: ["database-design", "technical-documentation"],
  },
  {
    slug: "business-analytics-dashboard",
    title: "Business Analytics Dashboard",
    category: "UI/UX Design",
    tags: ["UI/UX Design", "System Development"],
    mock: "chart",
    summary: "KPI monitoring with interactive charts and exportable reports.",
    overview: "A concept dashboard that brings sales and operations data into one view for business owners and managers.",
    problem: "Owners spend hours compiling reports from different files and still lack a quick view of performance.",
    solution: "A dashboard with KPI cards, interactive charts, filters by date range, and reports that can be exported.",
    features: ["KPI monitoring", "Interactive charts", "Performance reports", "Data visualization", "Exportable reports"],
    tech: ["Next.js", "Recharts", "PostgreSQL (Supabase)"],
    benefits: ["Quick view of performance", "Less manual reporting", "Decisions based on current data"],
    services: ["ui-ux-design", "system-development"],
  },
  {
    slug: "appointment-booking-system",
    title: "Appointment and Booking System",
    category: "System Development",
    tags: ["System Development", "Website Development"],
    mock: "calendar",
    summary: "Online scheduling with availability management and email confirmations.",
    overview: "A concept booking system for clinics, salons, or service providers who take appointments.",
    problem: "Booking through calls and messages leads to double bookings, no-shows, and time spent going back and forth.",
    solution: "An online booking page that shows available slots, confirms bookings by email, and gives staff an admin view of the schedule.",
    features: ["Appointment scheduling", "Availability management", "Booking confirmation", "Email notifications", "Administrative dashboard"],
    tech: ["Next.js", "PostgreSQL (Supabase)", "Resend (email)"],
    erd: [
      { entity: "services", fields: ["id (PK)", "name", "duration_min"] },
      { entity: "time_slots", fields: ["id (PK)", "starts_at", "is_available"] },
      { entity: "bookings", fields: ["id (PK)", "slot_id (FK)", "service_id (FK)", "client_email", "status"] },
    ],
    benefits: ["No more double bookings", "Clients book any time", "Less admin back-and-forth"],
    services: ["system-development", "website-development"],
  },
];

export const process = [
  { step: "01", title: "Discovery and Consultation", body: "We learn about your business, goals, problems, and technical requirements." },
  { step: "02", title: "Planning and Proposal", body: "We prepare the project scope, technical recommendations, timeline, and quotation." },
  { step: "03", title: "Design and Development", body: "We create wireframes, database architecture, and system design, then build the agreed features." },
  { step: "04", title: "Testing and Quality Assurance", body: "We validate functionality, test performance, and apply agreed revisions." },
  { step: "05", title: "Deployment and Support", body: "We launch your solution, hand over documentation, and provide support as agreed." },
];

export const whyUs = [
  { title: "Business-oriented solutions", body: "We start with the business problem, not the technology." },
  { title: "Customized development", body: "Built around how you work, not a one-size template." },
  { title: "Structured documentation", body: "Every project comes with clear, usable documentation." },
  { title: "Transparent communication", body: "Regular updates and honest timelines throughout." },
  { title: "Scalable technology", body: "Modern stacks that grow with your needs." },
  { title: "Client-focused approach", body: "Your goals guide every decision we make." },
];

export const values = [
  { title: "Integrity", body: "We are honest about what we can do, what it costs, and how long it takes." },
  { title: "Innovation", body: "We look for better ways to solve problems, not just familiar ones." },
  { title: "Collaboration", body: "We work with clients as partners throughout the project." },
  { title: "Excellence", body: "We care about the details, in code and in communication." },
  { title: "Continuous Learning", body: "As students, learning is what we do every day." },
  { title: "Client Commitment", body: "We stay with a project until it does what it should." },
];

export type Founder = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  specializations: string[];
  skills: string[];
  background: string;
  linkedin: string;
};

// [PLACEHOLDER] Replace names, bios, skills, and LinkedIn URLs with the founders' real details.
// Do not add qualifications or experience that are not true.
export const founders: Founder[] = [
  {
    name: "[Founder Name]",
    role: "Co-Founder / Technical Lead",
    initials: "F1",
    bio: "A Benildean student who loves building things with code. Leads the technical side of Handled, from system architecture to the final deployment.",
    specializations: ["Software development", "System architecture", "Database design", "Technical implementation", "System integration"],
    skills: ["[Add skill]", "[Add skill]", "[Add skill]"],
    background: "Student at De La Salle-College of Saint Benilde. [Add program and relevant background]",
    linkedin: "#",
  },
  {
    name: "[Founder Name]",
    role: "Co-Founder / Solutions Lead",
    initials: "F2",
    bio: "A Benildean student who enjoys turning messy problems into clear plans. Leads client communication, requirements, and documentation at Handled.",
    specializations: ["IT consulting", "Business requirements analysis", "Project management", "Client communication", "Technical documentation"],
    skills: ["[Add skill]", "[Add skill]", "[Add skill]"],
    background: "Student at De La Salle-College of Saint Benilde. [Add program and relevant background]",
    linkedin: "#",
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  body: { h?: string; p?: string; list?: string[] }[];
  service: string; // related service slug
};

const author = "Handled Team";
export const postAuthor = author;

export const posts: Post[] = [
  {
    slug: "why-every-business-needs-a-professional-website",
    title: "Why Every Business Needs a Professional Website",
    category: "Websites",
    date: "2026-11-20",
    excerpt: "Social media pages are a start, but a website is the one place online you fully control.",
    service: "website-development",
    body: [
      { p: "Many small businesses start online with a Facebook or Instagram page. That's a good start, but those platforms decide how your content is shown, and they can change the rules at any time." },
      { h: "A website builds trust", p: "When people hear about a business, they search for it. A clear website with your services, location, and contact details tells them you are real and established." },
      { h: "It works while you sleep", p: "A website answers common questions, shows your offerings, and collects inquiries around the clock." },
      { h: "What a good business site includes", list: ["A clear statement of what you do", "Services or products with prices where possible", "Contact details and an inquiry form", "Fast loading on mobile phones"] },
    ],
  },
  {
    slug: "what-is-an-entity-relationship-diagram",
    title: "What Is an Entity Relationship Diagram?",
    category: "Databases",
    date: "2026-11-14",
    excerpt: "An ERD is the blueprint of your data. Here's how to read one.",
    service: "database-design",
    body: [
      { p: "An Entity Relationship Diagram (ERD) is a picture of how data in a system is organized. It shows the things a system stores, called entities, and how they connect." },
      { h: "The three building blocks", list: ["Entities: things like Customer, Order, or Product", "Attributes: details about each entity, like name or price", "Relationships: how entities connect, like a Customer places many Orders"] },
      { h: "Why it matters", p: "Drawing an ERD before building a system catches design problems early, when they are cheap to fix. It also gives developers and stakeholders a shared reference." },
    ],
  },
  {
    slug: "understanding-database-normalization",
    title: "Understanding Database Normalization",
    category: "Databases",
    date: "2026-11-08",
    excerpt: "Normalization keeps your data clean by storing each fact in one place.",
    service: "database-design",
    body: [
      { p: "Normalization is the process of organizing a database so each piece of information is stored once. This avoids duplicates and the inconsistencies they cause." },
      { h: "The common normal forms", list: ["1NF: each field holds a single value", "2NF: every field depends on the whole primary key", "3NF: fields depend only on the key, not on other fields"] },
      { h: "A simple example", p: "If a customer's address is stored on every order, changing it means updating many rows. Store it once in a Customers table and reference it from Orders instead." },
    ],
  },
  {
    slug: "website-vs-web-application",
    title: "Website vs. Web Application: What's the Difference?",
    category: "Websites",
    date: "2026-11-01",
    excerpt: "One informs, the other lets users get work done. Knowing which you need saves money.",
    service: "website-development",
    body: [
      { p: "A website mainly presents information: who you are, what you offer, how to contact you. A web application lets users do things: log in, manage records, book appointments." },
      { h: "Which do you need?", p: "If your goal is visibility and inquiries, a website is usually enough. If you need staff or customers to process data, you need a web application." },
      { p: "Many businesses need both: a public website plus a private system behind it." },
    ],
  },
  {
    slug: "why-businesses-should-automate-manual-processes",
    title: "Why Businesses Should Automate Manual Processes",
    category: "Systems",
    date: "2026-10-25",
    excerpt: "Repetitive tasks cost more than they seem. Automation gives that time back.",
    service: "system-development",
    body: [
      { p: "Copying data between spreadsheets, sending the same reminder emails, compiling weekly reports: these tasks add up to hours every week." },
      { h: "What automation helps with", list: ["Fewer human errors", "Faster turnaround", "Staff time freed for higher-value work"] },
      { h: "Where to start", p: "List the tasks your team repeats most often and that follow the same steps each time. Those are the best candidates." },
    ],
  },
  {
    slug: "how-inventory-management-systems-improve-operations",
    title: "How Inventory Management Systems Improve Operations",
    category: "Systems",
    date: "2026-10-18",
    excerpt: "Knowing exactly what you have, and when to reorder, changes how a business runs.",
    service: "system-development",
    body: [
      { p: "Inventory problems show up as lost sales from stockouts or cash tied up in excess stock. Both come from not knowing accurate stock levels." },
      { h: "What a system gives you", list: ["Real-time stock counts", "Automatic low-stock alerts", "History of every stock movement", "Reports for planning purchases"] },
    ],
  },
  {
    slug: "how-to-choose-the-right-technology",
    title: "How to Choose the Right Technology for Your Business",
    category: "Consulting",
    date: "2026-10-11",
    excerpt: "Start from the problem, not the tool. A simple framework for tech decisions.",
    service: "it-consulting",
    body: [
      { p: "It's easy to pick a tool because it's popular. A better approach is to start with the problem and work backward." },
      { h: "Questions to ask", list: ["What exact problem are we solving?", "Who will use it every day?", "What is the total cost, including maintenance?", "Can it grow with us?"] },
    ],
  },
  {
    slug: "the-importance-of-technical-documentation",
    title: "The Importance of Technical Documentation",
    category: "Documentation",
    date: "2026-10-04",
    excerpt: "If only one person knows how a system works, that's a risk.",
    service: "technical-documentation",
    body: [
      { p: "Documentation turns knowledge in people's heads into something the whole team can use." },
      { h: "What good documentation covers", list: ["What the system does and why", "How to use it", "How it's built and deployed", "How the data is structured"] },
    ],
  },
  {
    slug: "understanding-ui-ux-design",
    title: "Understanding UI/UX Design",
    category: "Design",
    date: "2026-09-27",
    excerpt: "UI is how it looks. UX is how it works for the person using it.",
    service: "ui-ux-design",
    body: [
      { p: "User Interface (UI) design covers the visual parts: layout, colors, typography, buttons. User Experience (UX) design covers the whole journey: can people complete their task easily?" },
      { h: "Why design before building", p: "Testing a prototype costs far less than rewriting finished code. Designing first means fewer surprises later." },
    ],
  },
  {
    slug: "how-digital-transformation-helps-small-businesses",
    title: "How Digital Transformation Helps Small Businesses",
    category: "Consulting",
    date: "2026-09-20",
    excerpt: "Digital transformation doesn't have to be big. It can start with one process.",
    service: "it-consulting",
    body: [
      { p: "Digital transformation simply means using technology to improve how a business operates and serves customers." },
      { h: "Small steps that make a difference", list: ["Online inquiry or booking forms", "A shared system instead of scattered spreadsheets", "Simple dashboards for key numbers"] },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

// Pricing. "from" prices are starting points; edit freely. Final price is fixed after the free preview and a short call.
export type Package = { name: string; price: string; unit?: string; forWho: string; includes: string[]; featured?: boolean };

export const packages: Package[] = [
  {
    name: "Starter Page",
    price: "₱8,000",
    forWho: "A clean one-page site so customers can find you, see what you offer, and reach you.",
    includes: ["One-page website (menu, services, or products)", "Hours, location map, and contact buttons", "Messenger, call, and directions links", "Mobile-friendly and fast", "Launch on a free web address"],
  },
  {
    name: "Business Site",
    price: "₱15,000",
    forWho: "A full site that takes bookings, orders, or reservations for you.",
    includes: ["Everything in Starter Page", "Up to 5 pages", "Booking, ordering, or reservation form", "Requests sent straight to your email", "Basic Google search setup"],
    featured: true,
  },
  {
    name: "Care Plan",
    price: "₱1,000",
    unit: "/month",
    forWho: "Optional. We keep your site running and up to date so you don't have to.",
    includes: ["Hosting and uptime checks", "Menu, price, and photo updates", "Small fixes within 1–2 business days", "Support over Messenger"],
  },
];

export const addOns = [
  { name: "AI Messenger assistant", body: "Answers common questions and takes orders or bookings in your Facebook Page inbox." },
  { name: "Booking or ordering system", body: "Your own calendar or order dashboard instead of a simple form." },
  { name: "Owner dashboard", body: "Sales, bookings, or stock in one view." },
  { name: "Custom system", body: "Inventory, staff, or anything else your business runs on paper or spreadsheets." },
];

export const pricingTerms = [
  "The homepage preview is free. You pay nothing if you don't like it.",
  "50% downpayment to start the full build, 50% on launch.",
  "Two rounds of revisions included.",
  "Your own web address (domain) is optional, registered in your name, and billed at cost (about ₱800–₱1,500 a year).",
  "30 days of free fixes after launch. After that, ₱500 per change, or included in the Care Plan.",
  "Prices are starting points. We confirm a fixed price before any work you pay for.",
];
