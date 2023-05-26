import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Features from "../Features/Features";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials"

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <div className='max-w-5xl mx-auto'>
                <Category></Category>
                <PopularMenu></PopularMenu>
                <Features></Features>
                <Testimonials></Testimonials>
            </div>
        </>
    );
};

export default Home;