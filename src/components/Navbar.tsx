'use client'; // Needed for useState and event handlers

import Link from 'next/link';
import Image from 'next/image'; // For logo
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about/vision', label: 'Vision' },
    { href: '/about/mission', label: 'Mission' },
    { href: '/team', label: 'Team' },
    { href: '/startups', label: 'Startups' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
          {/* Placeholder for IEDC Logo - to be added to /public/logos */}
          {/* <Image src="/logos/iedc-logo-white.png" alt="IEDC IEM Logo" width={150} height={40} /> */}
          <span className="text-xl font-bold">IEDC IEM</span>
        </Link>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            // X icon
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } w-full md:flex md:items-center md:w-auto md:space-x-1 mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                className="block md:inline-block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white transition-colors md:text-sm"
                aria-current={typeof window !== 'undefined' && window.location.pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
