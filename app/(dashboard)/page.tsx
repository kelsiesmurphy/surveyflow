import { Metadata } from "next";
import LandingPage from "@/components/marketing/landing-page";
import Footer from "@/components/marketing/footer";
import { brand } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Home | ${brand.name}`,
  description: brand.description,
};

export default function LandingPageWrapper() {
  return (
    <>
      <LandingPage />
      <Footer />
    </>
  );
}
