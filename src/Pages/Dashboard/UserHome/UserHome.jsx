import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div className="w-full">
             <Helmet><title>Bistro Boss | Dashboard</title></Helmet>
            <SectionTitle
                subHeading={"~ Welcome Back ~ "}
                heading={user.displayName}
            ></SectionTitle>
        </div>
    );
};

export default UserHome;