import {
  ArrowRight,
  ExternalLink,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Talk to a person
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed sm:text-lg">
            One hotline for everything: tracking, deliveries, merchant accounts,
            complaints.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left Column: 3 Contact Method Cards */}
          <div className="flex flex-col gap-6">
            {/* 1. Hotline */}
            <div className="flex items-start gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Headphones className="size-5" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground">Hotline</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Tracking, deliveries, merchant accounts, complaints
                </p>
                <a
                  href="tel:09678045045"
                  className="mt-3 text-lg font-bold tracking-wide text-primary transition-colors hover:underline sm:text-xl"
                >
                  09678-045045
                </a>
              </div>
            </div>

            {/* 2. Email */}
            <div className="flex items-start gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground">Email</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  A reply within one working day
                </p>
                <a
                  href="mailto:support@coloship.com"
                  className="mt-3 text-base font-bold text-primary transition-colors hover:underline sm:text-lg"
                >
                  support@coloship.com
                </a>
              </div>
            </div>

            {/* 3. Head office */}
            <div className="flex items-start gap-4 rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </span>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground">
                  Head office
                </p>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  <p>House 44, Road 2/A, Dhanmondi</p>
                  <p>Dhaka 1209</p>
                </div>
                <a
                  href="https://maps.google.com/?q=House+44,+Road+2/A,+Dhanmondi,+Dhaka+1209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  Open in Maps
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp & Merchant Support Ticket */}
          <div className="flex flex-col gap-6">
            {/* 1. Chat on WhatsApp */}
            <div className="flex flex-col rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MessageCircle className="size-5" />
              </span>

              <h3 className="mt-5 text-xl font-bold text-foreground">
                Chat with us on WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For a parcel you are expecting or sending, WhatsApp is often the
                quickest way to reach the support team.
              </p>

              <div className="mt-6">
                <a
                  href="https://wa.me/8809678045045"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary"
                >
                  <MessageCircle className="size-4 text-emerald-500" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* 2. Already a merchant? */}
            <div className="flex flex-col rounded-3xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-sm sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LifeBuoy className="size-5" />
              </span>

              <h3 className="mt-5 text-xl font-bold text-foreground">
                Already a merchant?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Open a support ticket from your dashboard so the team can see
                your account and parcels.
              </p>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  Sign in to open a ticket
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
