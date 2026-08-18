import Hero from "../../components/home/Hero";
import Categories from "../../components/home/Categories";
import CategoryProductShowcase from "../../components/home/CategoryProductShowcase";
import PopularProducts from "../../components/home/PopularProducts";
import TrendingProducts from "../../components/home/TrendingProducts";
import LabelsPackagingProducts from "../../components/home/LabelsPackagingProducts";
import FeaturedBanner from "../../components/home/FeaturedBanner";
import ExploreMoreProducts from "../../components/home/ExploreMoreProducts";
import NewArrivalsProducts from "../../components/home/NewArrivalsProducts";
import NewsletterSection from "../../components/home/NewsletterSection";
import About from "../About/About";

// Sirf CTA chahiye to ye import rakho
import ContactCTA from "../../components/contact/ContactCTA";

const Home = () => {
  return (
    <>
      <Hero />

      <About />

      <Categories />
      <CategoryProductShowcase />

      {/* <PopularProducts /> */}

      {/* <TrendingProducts />

      <LabelsPackagingProducts /> */}

      {/* <FeaturedBanner /> */}

      {/* <ExploreMoreProducts />

      <NewArrivalsProducts /> */}

      <NewsletterSection />

      <ContactCTA />
    </>
  );
};

export default Home;