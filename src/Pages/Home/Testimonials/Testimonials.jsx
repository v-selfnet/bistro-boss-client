import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Heart, Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])
    return (
        <section>
            <SectionTitle
                subHeading={"What our client say"}
                heading={"Testimolials"}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col items-center px-10  mx-10 text-center space-y-6">
                            <p>Ratings: {review.rating}</p>
                            <Rating rewind={true} style={{ maxWidth: 180 }} value={review.rating} readOnly/>
                            <p>{review.details}</p>
                            <p className="text-3xl pb-10 text-orange-500 font-semibold divider">{review.name}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;