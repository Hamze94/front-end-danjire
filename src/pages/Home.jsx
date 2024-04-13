import Banner from "../components/Banner";
import FeatureProducts from "../components/FeatureProducts";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";



export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Banner />
            <FeatureProducts />
            <Footer />
        </div>
    )
}
