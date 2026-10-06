import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/logo";

const linkColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Login", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Book a Parcel", href: "/customer/book-parcel" },
      { label: "Track Parcel", href: "/customer/track" },
      { label: "My Shipments", href: "/customer/shipments" },
      { label: "Become a Courier", href: "/courier-apply" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Coverage", href: "/#coverage" },
      { label: "Contact Support", href: "mailto:support@coloship.com" },
      { label: "Reset Password", href: "/login/forgot-password" },
    ],
  },
];

// Placeholder contact details — replace with the company's real information.
const contactInfo = [
  {
    icon: Mail,
    label: "support@coloship.com",
    href: "mailto:support@coloship.com",
  },
  { icon: Phone, label: "+880 1711-000000", href: "tel:+8801711000000" },
  { icon: MapPin, label: "Dhaka, Bangladesh", href: null },
];

// Placeholder social links — replace href "#" with the official profile URLs.
const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Coloship home" className="w-fit">
              <Logo />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
              Coloship is a modern courier and parcel delivery platform
              connecting every district of Bangladesh with fast pickup, live
              tracking and secure cash on delivery.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex size-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <span className="sr-only">{social.label}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {linkColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-bold tracking-tight">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {contactInfo.map((contact) => (
              <li key={contact.label}>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <contact.icon className="size-3.5 text-primary" />
                    {contact.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <contact.icon className="size-3.5 text-primary" />
                    {contact.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Coloship. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
