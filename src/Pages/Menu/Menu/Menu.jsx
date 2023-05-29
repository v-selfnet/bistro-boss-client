import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import offeredImg from '../../../assets/menu/banner3.jpg'
import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const offer = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            {/* offered */}
            <Cover
                img={offeredImg}
                title="Our Menu"
                detail="Would you like to try a dish?"
            ></Cover>
            <div className='max-w-5xl mx-auto'>
                <SectionTitle
                    heading={"Today's Offer"}
                    subHeading={"Do not miss"}
                ></SectionTitle>
                <MenuCategory items={offer}></MenuCategory>
                <div className="flex flex-col items-center my-10">
                    <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </div>

            {/* desert */}
            <Cover
                img={desertImg}
                title="Dessert"
                detail="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem odio deserunt soluta voluptatibus cupiditate vitae asperiores rerum dolorem corporis iusto!"
            ></Cover>
            <div className='max-w-5xl mx-auto my-10'>
                <MenuCategory items={dessert}></MenuCategory>
                <div className="flex flex-col items-center mt-10">
                    <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </div>

            {/* pizza */}
            <Cover
                img={pizzaImg}
                title="Pizza"
                detail="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem odio deserunt soluta voluptatibus cupiditate vitae asperiores rerum dolorem corporis iusto!"
            ></Cover>
            <div className='max-w-5xl mx-auto my-10'>
                <MenuCategory items={pizza}></MenuCategory>
                <div className="flex flex-col items-center mt-10">
                    <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </div>

            {/* salad */}
            <Cover
                img={saladImg}
                title="Salad"
                detail="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem odio deserunt soluta voluptatibus cupiditate vitae asperiores rerum dolorem corporis iusto!"
            ></Cover>
            <div className='max-w-5xl mx-auto my-10'>
                <MenuCategory items={salad}></MenuCategory>
                <div className="flex flex-col items-center mt-10">
                    <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </div>

            {/* soup */}
            <Cover
                img={soupImg}
                title="Soup"
                detail="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem odio deserunt soluta voluptatibus cupiditate vitae asperiores rerum dolorem corporis iusto!"
            ></Cover>
            <div className='max-w-5xl mx-auto my-10'>
                <MenuCategory items={soup}></MenuCategory>
                <div className="flex flex-col items-center mt-10">
                    <button className="btn btn-outline border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;