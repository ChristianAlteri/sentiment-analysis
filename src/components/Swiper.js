
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import ChartComponent from "./ChartComponent"


const SwiperComponent = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance) {
      const newSwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
      setSwiperInstance(newSwiper);
    }
  }, [swiperInstance]);

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
      <div className="swiper-container">
      <div className="swiper-wrapper">
        <ChartComponent />
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
      </div>

      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev" onClick={handlePrev}>
        Previous
      </div>
      <div className="swiper-button-next" onClick={handleNext}>
        Next
      </div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
};

export default SwiperComponent;
