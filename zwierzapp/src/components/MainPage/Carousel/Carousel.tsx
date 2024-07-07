import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import oneDog from "../../../assets/DogsPhotos/1-dog.jpg";
import tenDog from "../../../assets/DogsPhotos/10-dog.jpg";
import elevenDog from "../../../assets/DogsPhotos/11-dog.jpg";
import twelveDog from "../../../assets/DogsPhotos/12-dog.jpg";
import thirteenDog from "../../../assets/DogsPhotos/13-dog.jpg";
import twoDog from "../../../assets/DogsPhotos/2-dog.jpg";
import threeDog from "../../../assets/DogsPhotos/3-dog.jpg";
import fourDog from "../../../assets/DogsPhotos/4-dog.jpg";
import fiveDog from "../../../assets/DogsPhotos/5-dog.jpg";
import sixDog from "../../../assets/DogsPhotos/6-dog.jpg";
import sevenDog from "../../../assets/DogsPhotos/7-dog.jpg";
import eightDog from "../../../assets/DogsPhotos/8-dog.jpg";
import nineDog from "../../../assets/DogsPhotos/9-dog.jpg";
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
    { id: 9, photo: nineDog },
    { id: 10, photo: tenDog },
    { id: 11, photo: elevenDog },
    { id: 12, photo: twelveDog },
    { id: 13, photo: thirteenDog },
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
        {dogs.map((element) => (
          <SwiperSlide key={element.id}>
            <div className={styles.carouselItem}>
              <img
                alt={`Pet nr ${element.id}`}
                className={styles.carouselImage}
                src={element.photo}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Carousel;
