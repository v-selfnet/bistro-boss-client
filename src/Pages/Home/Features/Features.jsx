import moment from "moment";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featureImage from '../../../assets/home/featured.jpg'
import './Features.css';

const Features = () => {
    let currentDate = moment().format('DD MMM YYYY');

    // parallax: bg-fixed

    return (
        <section className="feature-image bg-fixed py-2 my-10">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"Features Item"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center p-20">
                <div className="flex justify-center">
                    <img className="w-3/4 rounded-lg" src={featureImage} alt="" />
                </div>
                <div className="space-y-3 text-white">
                    <p>{currentDate}</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Features;