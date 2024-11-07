import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import BannerCompo from "./bannerCompo";
import hrImg from "./../../../../assets/image/hrm.webp";
import emImg from "./../../../../assets/image/em.webp";

const Banner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "" + "</span>";
    },
  };
  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerCompo
            img={hrImg}
            bannerTitle={"hiring hr manager"}
            subTitle={"We are"}
            to={"join-hr"}
            btn={"Join as HR Manager"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerCompo
            img={emImg}
            bannerTitle={"Join your team"}
            subTitle={"Welcome"}
            to={"join-employee"}
            btn={"Join as a employee"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
