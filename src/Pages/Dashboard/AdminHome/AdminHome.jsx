import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })
    return (
        <div className="w-full">
            <Helmet><title>Bistro Boss | Payment Gateway</title></Helmet>
            <SectionTitle
                subHeading={"~ Welcome Back ~ "}
                heading={user.displayName}
            ></SectionTitle>


            <div className="stats shadow w-full">

                <div className="stat place-items-center">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.revenue}</div>
                    {/* <div className="stat-desc">From January 1st to February 1st</div> */}
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Total Customers</div>
                    <div className="stat-value text-secondary">{stats.users}</div>
                    {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats.products}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

            </div>
        </div>
    );
};

export default AdminHome;