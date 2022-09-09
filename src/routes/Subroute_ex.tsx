import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Center from "../components/Center";
import Dashboard, { items } from "../pages/sidenav_example";

export default function TenantDashboardRoutes() {

    return (
        <Routes>
            <Route path="*" element={<Dashboard />}>
                <Route index element={<Center>DASHBOARD</Center>} />
                {
                    items.map(e => <Route path={e.url} element={e.component} />)
                }
            </Route>
        </Routes>

    )
}