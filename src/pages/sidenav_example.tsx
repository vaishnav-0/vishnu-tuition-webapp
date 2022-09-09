import React from "react";
import SidebarNavigation from "../components/SidebarNavigation";
import {
    Outlet, useLocation
} from "react-router-dom";

export const items = [
    { label: "Requests", url: "request", component: <></> },
    { label: "Bookings", url: "bookings", component: <></> },
]

export default function Dashboard() {
    const location = useLocation();
    const [activePath, setActivePath] = React.useState<number | undefined>();
    React.useEffect(() => {
        const paths = location.pathname.split("/");
        items.forEach((e, i) => {
            if (e.url === paths[paths.length - 1])
                setActivePath(i);
        })
    }, [location]);
    return (
        <SidebarNavigation items={items} active={activePath}>
            <Outlet />
        </SidebarNavigation>
    )
}