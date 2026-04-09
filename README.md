# IEDC IEM Website

**Innovation and Entrepreneurship Development Cell - Indian Institute of Engineering and Management (IEM), Salt Lake, Kolkata**

A modern, responsive website showcasing IEDC initiatives, startups, team members, and events. Built with Next.js and Tailwind CSS for a seamless user experience.

## 🚀 Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🏠 **Interactive Homepage** - Engaging landing page with navigation
- 🎯 **Mission & Vision Pages** - Dedicated sections highlighting organizational goals
- 🤝 **Team Showcase** - Display team members with photos and roles
- 🚀 **Startup Showcase** - Gallery of incubated startups with logos
- 📸 **Event Gallery** - Photo gallery of past events and initiatives
- 📧 **Contact Form** - Functional contact form with email integration
- ⚡ **Dynamic APIs** - Backend APIs for gallery, startups, team, and configuration
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15+ (React 19)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL 12+
- **Server**: Node.js 18+
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **PostgreSQL** 12 or higher ([Download](https://www.postgresql.org/download/))
- A code editor (VS Code recommended)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sujaanb/iedc_website.git
cd iedc_website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and configure it with your local setup:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/iedc_website

# Email Configuration (for contact form)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```bash
createdb iedc_website
```

### 5. Seed Database with Initial Data

```bash
npm run seed
```

This will populate your database with sample data for team members, startups, gallery items, and contact submissions.

### 6. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload when you make changes to the code.

## 📁 Project Structure

```
iedc_website/
├── public/                          # Static assets
│   ├── logos/                       # IEDC & IEM logos
│   ├── images/
│   │   ├── coordinators/           # Coordinator photos
│   │   ├── gallery/                # Event photos
│   │   └── startups/               # Startup logos
├── src/
│   ├── app/                         # Next.js app directory
│   │   ├── about/
│   │   │   ├── vision/page.tsx
│   │   │   └── mission/page.tsx
│   │   ├── api/                     # API routes
│   │   │   ├── contact/route.ts
│   │   │   ├── gallery/route.ts
│   │   │   ├── startups/route.ts
│   │   │   ├── team/route.ts
│   │   │   └── site-config/route.ts
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── startups/page.tsx
│   │   ├── team/page.tsx
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Homepage
│   ├── components/                  # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ImageCarousel.tsx
│   │   └── StartupCard.tsx
│   ├── lib/
│   │   └── db.ts                    # Database utilities
│   ├── scripts/
│   │   └── seed.ts                  # Database seed script
│   └── types/
│       └── models.ts                # TypeScript type definitions
├── .env.example                     # Example environment variables
├── package.json
├── next.config.mjs
└── README.md                        # This file
```

## 🌐 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about/vision` | IEDC Vision page |
| `/about/mission` | IEDC Mission page |
| `/team` | Team members showcase |
| `/startups` | Incubated startups gallery |
| `/gallery` | Event photos gallery |
| `/contact` | Contact form page |

## 📡 API Endpoints

### Get Team Members
```bash
GET /api/team
```

### Get Startups
```bash
GET /api/startups
```

### Get Gallery Images
```bash
GET /api/gallery
```

### Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your.email@example.com",
  "message": "Your message here"
}
```

### Get Site Configuration
```bash
GET /api/site-config/[configKey]
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling. All styles are applied via utility classes in the JSX components.

### Key CSS Files:
- Global styles are imported in `src/app/layout.tsx`
- Tailwind configuration is auto-generated by Next.js

### Customization:
To customize colors and styles, modify the Tailwind configuration in `tailwind.config.ts` (if present) or use inline Tailwind classes.

## 📝 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Seed database with sample data
npm run seed

# Lint code (if configured)
npm run lint
```

## 🔐 Environment Variables Reference

See `.env.example` for complete list. Common variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Your website URL | ✅ |
| `SMTP_HOST` | Email server host | ✅ |
| `SMTP_USER` | Email sender address | ✅ |
| `SMTP_PASSWORD` | Email password | ✅ |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/iedc_website.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit Your Changes**
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe what your PR does
   - Reference any related issues
   - Wait for review

## 🐛 Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel login
vercel
```

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting platform:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

Ensure you set the same environment variables on your hosting platform.

## 📞 Support & Contact

For questions or support regarding the IEDC website:

- 📧 **Email**: [Add contact email]
- 🔗 **Website**: [Add website URL]
- 📍 **Location**: IEM Salt Lake, Kolkata

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- IEDC IEM Team and Contributors

## 🎯 Roadmap

- [ ] Add testimonials section
- [ ] Implement event registration system
- [ ] Add mentor directory
- [ ] Create blog/resources section
- [ ] Add mentorship program details
- [ ] Integrate social media feeds
- [ ] Add analytics dashboard

---

**Last Updated**: December 2024  
**Maintainer**: [Sujaan Bhattacharyya](https://github.com/Sujaanb)
