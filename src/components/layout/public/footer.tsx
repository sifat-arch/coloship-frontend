import MarketingFooter from "@/components/marketing-components/home/footer";

// The public (marketing) layout keeps importing this path; the actual footer
// design lives in the marketing components folder.
const Footer = () => {
  return <MarketingFooter />;
};

export default Footer;
