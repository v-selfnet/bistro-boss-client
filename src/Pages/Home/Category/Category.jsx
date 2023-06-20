import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"from 11:00 to 22:00"}
                heading={"Order Online"}
            ></SectionTitle>


            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className="rounded-2xl" src={slide1} alt="" />
                    <h3 className= "text-center uppercase -mt-16">Salad</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl" src={slide2} alt="" />
                    <h3 className= "text-center uppercase -mt-16">Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl" src={slide3} alt="" />
                    <h3 className= "text-center uppercase -mt-16">Soup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl" src={slide4} alt="" />
                    <h3 className= "text-center uppercase -mt-16">Desert</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="rounded-2xl" src={slide5} alt="" />
                    <h3 className= "text-center uppercase -mt-16">Salad</h3>
                </SwiperSlide>
                
            </Swiper>

        </section>
    );
};

export default Category;