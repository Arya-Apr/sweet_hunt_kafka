import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import OrdersCard from "../../components/custom/OrdersCard";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";
const PlacedOrders = () => {
    const outletId = localStorage.getItem("outlet");
    const [placedOrders, setplacedOrders] = useState([]);
    const DisplayHook = useFetch(import.meta.env.VITE_PREPARATION_SERVICE_URI +
        ApiEndpoints.GET_ORDERS_BY_OUTLET +
        outletId, "GET");
    const getAllOrders = () => {
        DisplayHook.MakeHttpRequest("/PREPARING").then((result) => {
            if (result.result) {
                console.log(result.result);
                setplacedOrders(result.result.orders);
            }
        });
    };
    useEffect(() => {
        getAllOrders();
    }, []);
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("div", { className: "text-3xl font-bold self-center mb-4", children: "Placed Orders " }), _jsx("div", { className: "row", children: placedOrders.length > 0 ? (placedOrders.map((o) => {
                    return (_jsx("div", { className: "col-md-4", children: _jsx(OrdersCard, { loadData: getAllOrders, order: o }, nanoid()) }, nanoid()));
                })) : (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlined, {}), _jsx("span", { className: "ms-2", children: "No order to complete" })] })) })] }));
};
export default PlacedOrders;
