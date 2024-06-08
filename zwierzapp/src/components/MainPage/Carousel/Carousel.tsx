import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useFirebaseData from "../../../hooks/useFirebaseData";
import styles from "./carousel.module.scss";

const Carousel = () => {
  const items = useFirebaseData("GlobalUsers");

  if (!items.length) {
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
        {items.map((element, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselItem}>
              <img className={styles.carouselImage} src={element.path} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Carousel;
