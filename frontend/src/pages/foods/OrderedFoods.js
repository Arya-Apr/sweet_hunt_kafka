import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import OrderedFoodCard from "../../components/custom/Cards/OrderedFoodCard";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import { nanoid } from "@reduxjs/toolkit";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
function OrderedFoods() {
    const orderHistoryFetch = useFetch(import.meta.env.VITE_ORDER_SERVICE_URI +
        ApiEndpoints.GET_ORDER_HISTORY +
        `/${localStorage.getItem("user")}/`);
    const [orderStatus, setOrderStatus] = useState("PREPARING");
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        console.log(orderStatus);
        orderHistoryFetch
            .MakeHttpRequest(orderStatus)
            .then((result) => {
            if (result.result) {
                setOrders(result.result);
            }
        })
            .catch((ex) => console.log(ex));
    }, [orderStatus]);
    return (_jsx("div", { children: _jsxs("div", { className: "container mt-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "btn-theme-filled-shadowed", onClick: () => {
                                setOrderStatus("PREPARING");
                            }, children: "Preparing" }), _jsx("button", { className: "btn-success-filled-shadowed", onClick: () => {
                                setOrderStatus("IN_TRANSIT");
                            }, children: "In transit" }), _jsx("button", { className: "btn-danger-filled-shadowed", onClick: () => {
                                setOrderStatus("CANCELLED");
                            }, children: "Cancelled" }), _jsx("button", { className: "btn-info-filled-shadowed", onClick: () => {
                                setOrderStatus("DELIVERED");
                            }, children: "Delivered" })] }), _jsx("div", { className: "row", children: orders.length > 0 ? (orders.map((item) => {
                        return (_jsx("div", { className: "col-md-4", children: _jsx(OrderedFoodCard, { ...item }) }, nanoid()));
                    })) : (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsxs("span", { className: "ms-2", children: ["You have no record for ", orderStatus, " orders"] })] })) })] }) }));
}
export default OrderedFoods;
