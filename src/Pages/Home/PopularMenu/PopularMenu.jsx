import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    // data load from cuntom hook Hooks/useMenu.jsx
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
   
    return (
        <section>
            <SectionTitle
                heading={"from our menu"}
                subHeading={"Popular Items"}
            ></SectionTitle>
            <div className="grid lg:grid-cols-2 gap-6">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="flex flex-col items-center mt-10">
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>

        </section>
    );
};

export default PopularMenu;