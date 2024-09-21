import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router-dom";

import AnimatedCursor from "react-animated-cursor";
import { ParallaxProvider } from "react-scroll-parallax";
import ScrollToTop from "./hooks/useScrollToTop";
import { useEffect } from "react";
import AboutPage from "@/pages/about";
import AppPage from "@/pages/app";
import IndexPage from "@/pages/index";
// import DocsPage from "@/pages/docs";
// import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <AnimatedCursor
        innerSize={10}
        outerSize={42}
        color="168, 85, 247"
        innerScale={1.2}
        outerScale={1.5}
        outerStyle={{
          border: "2px solid gray",
          backgroundColor: "transparent",
        }}
      />

      <ParallaxProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<AppPage />} path="/app" />
          {/* <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />*/}
        </Routes>
      </ParallaxProvider>
    </>
  );
}

export default App;
