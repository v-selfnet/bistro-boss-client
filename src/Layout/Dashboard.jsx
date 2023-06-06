import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaWallet, FaCalendarAlt, FaShoppingBag, FaEnvelope } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import useCart from "../Hooks/useCart";



const Dashboard = () => {
    const [cart] = useCart();

    return (
        <div className="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center ">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                {/* Page content here */}
                <Outlet></Outlet>



            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>


                <ul className="menu p-4 w-80 text-base-content bg-orange-300">
                    {/* Sidebar content here */}
                    <div className="text-center mb-10">
                        <h1 className="text-xl">BISTRO BOSS</h1>
                        <p className="">R e s t a u r a n t</p>
                    </div>
                    <li><Link to='userhome'><FaHome />User Home</Link></li>
                    <li><Link to='calender'><FaCalendarAlt />Reservation</Link></li>
                    <li><Link to='payment'><FaWallet />Payment History</Link></li>
                    <li>
                        <Link to='mycart'><FaShoppingCart />My Cart
                            <div className="badge badge-secondary">
                                +{cart?.length || 0}
                            </div>
                        </Link>
                    </li>

                    <div className="divider"></div>

                    <li><Link to='/'><FaHome />Home</Link></li>
                    <li><Link to='/menu'><FiMenu />Foods Menu</Link></li>
                    <li><Link to='/order/salad'><FaShoppingBag />Shop</Link></li>
                    <li><Link to='#'><FaEnvelope />Contact</Link></li>

                </ul>
            </div>
        </div>
    );
};

export default Dashboard;