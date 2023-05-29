import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import img from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../Hooks/useMenu";
import FoodCard from "./FoodCard";

const Order = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>
            <Cover
                img={img}
                title="Food Order"
                detail="Would you like to try a dish?"
            ></Cover>
            <div className="flex justify-center my-10">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Drink</Tab>
                    </TabList>
                    <TabPanel >
                        <div className="grid grid-cols-3 gap-6">
                            {
                                salad.map(item => <FoodCard
                                    key={item._id}
                                    item={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-3 gap-6">
                            {
                                pizza.map(item => <FoodCard
                                    key={item._id}
                                    item={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-3 gap-6">
                            {
                                dessert.map(item => <FoodCard
                                    key={item._id}
                                    item={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-3 gap-6">
                            {
                                soup.map(item => <FoodCard
                                    key={item._id}
                                    item={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="grid grid-cols-3 gap-6">
                            {
                                drinks.map(item => <FoodCard
                                    key={item._id}
                                    item={item}
                                ></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default Order;