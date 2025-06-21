import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Placeholder for social links - to be populated from seeded data or env
  const socialLinks = [
    // { name: 'Facebook', href: '#', icon: FacebookIcon },
    // { name: 'Twitter', href: '#', icon: TwitterIcon },
    // { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
    // { name: 'Instagram', href: '#', icon: InstagramIcon },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">IEDC IEM Salt Lake</h3>
            <p className="text-sm">
              Fostering innovation and entrepreneurship since 2014.
            </p>
            {/* Placeholder for a small logo or emblem if desired */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/vision" className="hover:text-orange-500 transition-colors">Vision</Link></li>
              <li><Link href="/about/mission" className="hover:text-orange-500 transition-colors">Mission</Link></li>
              <li><Link href="/team" className="hover:text-orange-500 transition-colors">Our Team</Link></li>
              <li><Link href="/startups" className="hover:text-orange-500 transition-colors">Startups</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
            {/* Social Media Icons Placeholder */}
            {socialLinks.length > 0 ? (
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                    aria-label={social.name}
                  >
                    {/* <social.icon className="h-6 w-6" /> */}
                    <span>{social.name} (Icon)</span> {/* Placeholder for actual icon */}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm">Social media links coming soon.</p>
            )}
            <div className="mt-4">
              <p className="text-sm">Email: <a href="mailto:iedc@iem.edu.in" className="hover:text-orange-500 transition-colors">iedc@iem.edu.in</a></p>
              {/* Replace with actual contact email */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} IEDC IEM Salt Lake. All rights reserved.</p>
          <p className="mt-1">
            Designed and Developed with <span className="text-orange-500">&hearts;</span> by IEM Students {/* Or your name/org */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
