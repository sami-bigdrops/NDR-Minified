import Image from "next/image";
import Navbar from "@/ndr/navbar";  
import Review from "@/ndr/review";
import Step from "@/ndr/step";
import Hero from "@/ndr/hero";
import Help from "@/ndr/help";
import Footer from "@/ndr/footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Help /> 
      <Review />
      <Step />
      <Footer />
      
     
     
    </div>
  );
}
