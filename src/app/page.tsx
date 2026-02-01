import KeyboardScroll from "@/components/KeyboardScroll";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <KeyboardScroll />
      <ProductDetails />
      <Footer />
    </main>
  );
}
