import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import oneDog from "../../../assets/1-dog.jpg";
import twoDog from "../../../assets/2-dog.jpg";
import threeDog from "../../../assets/3-dog.jpg";
import fourDog from "../../../assets/4-dog.jpg";
import fiveDog from "../../../assets/5-dog.jpg";
import sixDog from "../../../assets/6-dog.jpg";
import sevenDog from "../../../assets/7-dog.jpg";
import eightDog from "../../../assets/8-dog.jpg";
import styles from "./carousel.module.scss";

const Carousel = () => {
  const dogs = [
    { id: 1, photo: oneDog },
    { id: 2, photo: twoDog },
    { id: 3, photo: threeDog },
    { id: 4, photo: fourDog },
    { id: 5, photo: fiveDog },
    { id: 6, photo: sixDog },
    { id: 7, photo: sevenDog },
    { id: 8, photo: eightDog },
  ];

  if (!dogs.length) {
    return <div>loading</div>;
  }
  return (
    <main className={styles.carouselWrapper}>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        modules={[Autoplay]}
        autoplay={{ delay: 0, pauseOnMouseEnter: true }}
        loop={true}
        rewind={true}
        speed={5000}
        breakpoints={{
          1000: {
            slidesPerView: 3,
          },
          1550: {
            slidesPerView: 4,
          },
          1900: {
            slidesPerView: 6,
          },
        }}
      >
        {dogs.map((element, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselItem}>
              <img className={styles.carouselImage} src={element.photo}></img>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Carousel;
