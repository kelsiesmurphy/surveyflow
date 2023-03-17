import About from "./About";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import Hero from "./Hero";
import Pricing from "./Pricing";

const IndexContainer = ({session}:any) => {
  return (
    <>
      <Hero session={session}/>
      <About />
      <Pricing />
      <CallToAction />
      <Footer />
    </>
  );
};

export default IndexContainer;
