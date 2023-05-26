import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <div className='max-w-5xl mx-auto'>
                <Category></Category>
                <PopularMenu></PopularMenu>
            </div>
        </>
    );
};

export default Home;