import AboutUs from "./AboutUs/AboutUs";
import Footer from "./Footer/Footer";
import WelcomePage from "./WelcomePage/WelcomePage";
// import Carousel from "./Carousel/Carousel";

function MainPage() {
  return (
    <>
      <WelcomePage />
      {/* <Carousel /> */}
      <AboutUs />
      <Footer />
    </>
  );
}

export default MainPage;