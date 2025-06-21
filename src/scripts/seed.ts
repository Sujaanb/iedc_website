import { Pool } from 'pg';
import dotenv from 'dotenv';
import { Coordinator, Startup, GalleryImage } from '../types/models'; // Assuming models.ts is in src/types

dotenv.config({ path: '.env.local' }); // Load from .env.local if it exists, or .env

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const IEDC_INCEPTION_DATE = '2014'; // As per requirements

// --- Static Content: Vision & Mission ---
// These could be stored in a dedicated 'site_content' table or similar.
// For simplicity, we'll log them here but they'd typically be inserted if a table existed.
const visionStatement = `
  To be a premier hub of innovation and entrepreneurship, fostering a vibrant ecosystem
  that empowers students and faculty to transform groundbreaking ideas into sustainable
  enterprises, driving economic growth and societal impact. We envision a future where
  our institution is recognized globally for its contributions to technology, innovation,
  and entrepreneurial leadership.
`;

const missionStatementPoints = [
  "To cultivate a culture of innovation and entrepreneurial thinking among students and faculty through workshops, seminars, and mentorship programs.",
  "To provide state-of-the-art infrastructure and resources, including incubation facilities, seed funding access, and networking opportunities.",
  "To facilitate the translation of research and projects into viable commercial products and services.",
  "To foster collaborations between academia, industry, government, and investors to create a supportive ecosystem for startups.",
  "To promote ethical and socially responsible entrepreneurship that contributes to sustainable development.",
];

// --- Data for Tables ---
const coordinatorsData: Omit<Coordinator, 'id'>[] = [
  {
    name: 'Prof. Dr. Subhabrata Banerjee',
    title: 'Chief Coordinator',
    department: 'Electronics & Communication Engineering',
    email: 'subhabrata.banerjee@iem.edu.in',
    photoUrl: '/images/coordinators/subhabrata_banerjee.jpg', // Ensure these paths match actual public assets
  },
  {
    name: 'Prof. Dr. Indranil Maity',
    title: 'Coordinator & Mentor',
    department: 'Computer Science & Engineering',
    email: 'indranil.maity@iem.edu.in',
    photoUrl: '/images/coordinators/indranil_maity.jpg', // Ensure these paths match actual public assets
  },
  // Add more coordinators if available
];

const startupsData: Omit<Startup, 'id'>[] = [
  {
    name: 'Innovatech Solutions',
    objective: 'Developing cutting-edge AI software for enterprise automation and efficiency.',
    tradeLicense: 'TLISC2023001',
    logoUrl: '/images/startups/innovatech_logo.png',
  },
  {
    name: 'GreenSpark Energy',
    objective: 'Providing affordable and sustainable solar energy solutions for rural communities.',
    tradeLicense: 'TLGSE2023002',
    logoUrl: '/images/startups/greenspark_logo.png',
  },
  {
    name: 'EduSwift Learning',
    objective: 'An interactive e-learning platform focused on skill development for college students.',
    tradeLicense: 'TLESL2023003',
    // logoUrl: '/images/startups/eduswift_logo.png', // Optional
  },
  {
    name: 'HealthBot Diagnostics',
    objective: 'AI-powered chatbot for preliminary medical diagnosis and information.',
    tradeLicense: 'TLHBD2023004',
    logoUrl: '/images/startups/healthbot_logo.png',
  },
  {
    name: 'AgriGrow Tech',
    objective: 'Precision agriculture tools and analytics for optimizing crop yields.',
    tradeLicense: 'TLAGT2023005',
  },
  {
    name: 'FinSecure Wallet',
    objective: 'A secure mobile wallet application with advanced fraud detection features.',
    tradeLicense: 'TLFSW2023006',
    logoUrl: '/images/startups/finsecure_logo.png',
  },
  {
    name: 'WasteWise Recyclers',
    objective: 'Innovative waste management and recycling solutions for urban areas.',
    tradeLicense: 'TLWWR2023007',
  },
  {
    name: 'ConnectSphere IoT',
    objective: 'IoT devices and platform for smart home and smart city applications.',
    tradeLicense: 'TLCSI2023008',
    logoUrl: '/images/startups/connectsphere_logo.png',
  },
];

const galleryImagesData: Omit<GalleryImage, 'id'>[] = [
  {
    url: '/images/gallery/iedc_inauguration.jpg', // Ensure these paths match actual public assets
    altText: 'IEDC IEM Inauguration Ceremony',
    caption: 'Inauguration of IEDC IEM by distinguished guests.',
  },
  {
    url: '/images/gallery/iem_hackathon_winners.jpg',
    altText: 'IEM Hackathon Winners with Mentors',
    caption: 'Winners of the annual IEM Hackathon felicitated by faculty.',
  },
  {
    url: '/images/gallery/startup_pitch_event.jpg',
    altText: 'Startup Pitching Session at IEDC',
    caption: 'Entrepreneurs pitching their ideas to a panel of investors.',
  },
  // Add more images if available
];

// Contact Address and Social Links (typically stored in a 'settings' or 'site_info' table)
const siteContactInfo = {
  addressL1: 'Institute of Engineering & Management (IEM)',
  addressL2: 'Salt Lake Electronics Complex, GN-34/2, Sector V',
  cityStatePin: 'Kolkata, West Bengal 700091, India',
  email: 'iedc@iem.edu.in', // Official IEDC email
  phone: '+91 33 2357 2059', // Example phone
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.078001017597!2d88.43068631537513!3d22.57690993863107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275ba0130651d%3A0x8a80766689c6c835!2sInstitute%20of%20Engineering%20%26%20Management%20(IEM)!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin',
  socialLinks: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/school/institute-of-engineering-management/', icon: 'linkedin' },
    { name: 'Facebook', url: 'https://www.facebook.com/iemcalcutta/', icon: 'facebook' },
    // Add more social links (X, Instagram etc.)
  ],
};


async function createTables() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Coordinators Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS coordinators (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        department VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        photo_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "coordinators" created or already exists.');

    // Startups Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS startups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        objective TEXT,
        trade_license VARCHAR(255) UNIQUE,
        logo_url VARCHAR(255),
        founded_date DATE, -- Optional
        website_url VARCHAR(255), -- Optional
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "startups" created or already exists.');

    // Gallery Images Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        alt_text VARCHAR(255),
        caption TEXT,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "gallery_images" created or already exists.');

    // Contact Submissions Table (for the form)
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "contact_submissions" created or already exists.');

    // Site Configuration Table (for vision, mission, contact details etc.)
    // This is a more robust way to store site-wide static content
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_configuration (
        id SERIAL PRIMARY KEY,
        config_key VARCHAR(255) NOT NULL UNIQUE,
        config_value JSONB, -- Using JSONB to store varied structures like text, lists, objects
        description TEXT,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "site_configuration" created or already exists.');

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating tables:', err);
    throw err;
  } finally {
    client.release();
  }
}

async function seedData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Seed Coordinators
    for (const coord of coordinatorsData) {
      await client.query(
        `INSERT INTO coordinators (name, title, department, email, photo_url)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING;`, // Avoid duplicates if script is run multiple times
        [coord.name, coord.title, coord.department, coord.email, coord.photoUrl]
      );
    }
    console.log(`Seeded ${coordinatorsData.length} coordinators (or skipped if existing).`);

    // Seed Startups
    for (const startup of startupsData) {
      await client.query(
        `INSERT INTO startups (name, objective, trade_license, logo_url)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (name) DO NOTHING;`, // Assuming name is unique for startups
        [startup.name, startup.objective, startup.tradeLicense, startup.logoUrl]
      );
    }
    console.log(`Seeded ${startupsData.length} startups (or skipped if existing).`);

    // Seed Gallery Images
    // For gallery, we might want to allow duplicates if re-seeding, or clear table first
    // For simplicity, ON CONFLICT is not used here, assuming fresh seed or manual cleanup
    await client.query('DELETE FROM gallery_images;'); // Clear existing images for a clean seed
    for (const image of galleryImagesData) {
      await client.query(
        `INSERT INTO gallery_images (url, alt_text, caption)
         VALUES ($1, $2, $3);`,
        [image.url, image.altText, image.caption]
      );
    }
    console.log(`Seeded ${galleryImagesData.length} gallery images after clearing table.`);

    // Seed Site Configuration Data
    const configurations = [
      { key: 'iedc_inception_date', value: { date: IEDC_INCEPTION_DATE }, description: 'The year IEDC was established.' },
      { key: 'vision_statement', value: { text: visionStatement.trim() }, description: 'The official vision statement of IEDC IEM.' },
      { key: 'mission_statement', value: { points: missionStatementPoints }, description: 'The official mission statement points of IEDC IEM.' },
      { key: 'contact_information', value: siteContactInfo, description: 'Official contact address, email, phone, and social media links.' },
    ];

    for (const config of configurations) {
      await client.query(
        `INSERT INTO site_configuration (config_key, config_value, description)
         VALUES ($1, $2, $3)
         ON CONFLICT (config_key) DO UPDATE SET
           config_value = EXCLUDED.config_value,
           description = EXCLUDED.description,
           last_updated = CURRENT_TIMESTAMP;`,
        [config.key, JSON.stringify(config.value), config.description]
      );
    }
    console.log(`Seeded/Updated ${configurations.length} site configuration entries.`);


    await client.query('COMMIT');
    console.log('Data seeding completed successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error seeding data:', err);
    throw err;
  } finally {
    client.release();
  }
}

async function main() {
  try {
    console.log('Starting database seeding process...');
    await createTables();
    await seedData();
    console.log('Database seeding process finished.');
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('Database pool closed.');
  }
}

main();
