import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart";
import logo from '/logo.png'
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user)
    const [cart] = useCart();
    // console.log(cart)
    const [isAdmin] = useAdmin();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        <li><Link to='/order/salad'>Order</Link></li>
        <li><Link to='/secret'>Secret</Link></li>
        <li>
            <Link to={isAdmin ? '/dashboard/adminhome'
                : '/dashboard/userhome'}>Dashboard
            </Link>
        </li>
        {
            user ?
                <>
                    <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
                </> :
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </>
        }
        <li>
            <Link to='/dashboard/mycart'>
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary">+ {cart?.length || 0}</div>
            </Link>
        </li>
    </>
    return (
        <div className="navbar fixed z-10 opacity-80 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Bistro Boss</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end gap-5">
                {user?.displayName ? user.displayName : user?.email}
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL ? user.photoURL : logo} />
                    </div>
                </label>
            </div>

        </div>
    );
};
export default Navbar;