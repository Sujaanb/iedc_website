export interface Coordinator {
  id: string; // Or number, depending on DB strategy
  name: string;
  title: string;
  department: string;
  email: string;
  photoUrl?: string; // Added for team page
}

export interface Startup {
  id: string; // Or number
  name: string;
  objective: string;
  tradeLicense: string;
  logoUrl?: string; // Optional: if startups have logos
}

export interface GalleryImage {
  id: string; // Or number
  url: string;
  altText: string;
  caption: string;
}

export interface ContactSubmission {
  id: string; // Or number
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
}
