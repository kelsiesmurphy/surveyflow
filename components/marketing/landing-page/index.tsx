"use client";

import React from "react";
import Features from "./features";
import FrequentlyAskedQuestions from "./frequently-asked-questions";
import Hero from "./hero";
import KeyFeatures from "./key-features";
import Pricing from "./pricing";
import SocialProof from "./social-proof";
import { landingPageContent as content } from "@/lib/constants/landing-page";
import Footer from "../footer";

export default function LandingPage() {
  return (
    <>
      <Hero content={content.hero} />
      <SocialProof content={content.socialProof} />
      <KeyFeatures content={content.keyFeatures} />
      <Features content={content.features} />
      <Pricing content={content.pricing} />
      <FrequentlyAskedQuestions content={content.frequentlyAskedQuestions} />
      <Footer />
    </>
  );
}
