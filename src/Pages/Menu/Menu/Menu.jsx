import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImage from '../../../assets/menu/banner3.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const Menu = () => {
    const [menu] = useMenu();
    const offer = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                img={menuImage}
                title="Our Menu"
                detail="Would you like to try a dish?"
            ></Cover>
            <div className='max-w-5xl mx-auto'>
                <SectionTitle
                    heading={"Today's Offer"}
                    subHeading={"Do not miss"}
                ></SectionTitle>
                <div className="grid lg:grid-cols-2 gap-6">
                    {
                        offer.map(item => <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>)
                    }

                </div>

            </div>
        </div>
    );
};

export default Menu;