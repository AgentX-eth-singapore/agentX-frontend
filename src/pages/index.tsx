import About from "@/components/Home/About";
import About2 from "@/components/Home/About2";
import FAQ from "@/components/Home/FAQ";
import Hero from "@/components/Home/Hero";
import Highlights from "@/components/Home/Highlights";
import Partners from "@/components/Home/Partners";
import RoadMap from "@/components/Home/RoadMap";
import StayInTouch from "@/components/Home/StayInTouch";
import Team from "@/components/Home/Team";
import Timer from "@/components/Home/Timer";
import Layout from "@/layouts/Layout";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Highlights />
      <About />
      <About2 />
      <RoadMap />
      <Timer />
      <Team />
      <FAQ />
      <Partners />
      <StayInTouch />
    </Layout>
  );
};

export default Index;
