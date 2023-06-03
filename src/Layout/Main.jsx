// import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    // const location = useLocation();
    // console.log(location);
    // const hideHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register') ;

    return (
        <div>
            {/* {hideHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {hideHeaderFooter || <Footer></Footer>} */}

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;