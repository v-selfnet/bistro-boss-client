import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaWallet, FaCalendarAlt, FaShoppingBag, FaEnvelope, FaUtensils, FaSlidersH, FaBook, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import useCart from "../Hooks/useCart";
import { Helmet } from "react-helmet-async";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import './Dashboard.css'

const Dashboard = () => {
    const { logOut } = useAuth();
    const [cart] = useCart();
    const [isAdmin] = useAdmin()

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (

        <div className="drawer drawer-mobile ">
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute top-0 left-0">Open drawer</label>

                {/* Page content here */}
                <Outlet></Outlet>



            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>


                <ul className={`menu p-4 w-80 text-base-content ${isAdmin ? 'admin': 'user'}`}>
                    {/* Sidebar content here */}
                    <div className="text-center mb-10">
                        <h1 className="text-xl">BISTRO BOSS</h1>
                        <p className="">R e s t a u r a n t</p>
                    </div>



                    {
                        isAdmin ? <>
                            <li><Link to='adminhome'><FaHome />Admin Home</Link></li>
                            <li><Link to='additem'><FaUtensils />Add Items</Link></li>
                            <li><Link to='manageitems'><FaSlidersH />Manage Items</Link></li>
                            <li><Link to='#'><FaBook />Manage Bookings</Link></li>
                            <li><Link to='allusers'><FaUsers />All Users</Link></li>

                        </> : <>
                            <li><Link to='userhome'><FaHome />User Home</Link></li>
                            <li><Link to='calender'><FaCalendarAlt />Reservation</Link></li>
                            <li><Link to='paymenthistory'><FaWallet />Payment History</Link></li>
                            <li>
                                <Link to='mycart'><FaShoppingCart />My Cart
                                    <div className="badge badge-secondary">
                                        +{cart?.length || 0}
                                    </div>
                                </Link>
                            </li>

                        </>
                    }



                    <div className="divider"></div>

                    <li><Link to='/'><FaHome />Home</Link></li>
                    <li><Link to='/menu'><FiMenu />Foods Menu</Link></li>
                    <li><Link to='/order/salad'><FaShoppingBag />Shop</Link></li>
                    <li><Link to='#'><FaEnvelope />Contact</Link></li>




                    <div className="divider"></div>
                    <li><Link onClick={handleLogout} to='/'><FaSignOutAlt />Exit</Link></li>


                </ul>
            </div>
        </div>
    );
};

export default Dashboard;