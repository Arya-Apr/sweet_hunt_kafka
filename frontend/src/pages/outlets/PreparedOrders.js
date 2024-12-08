import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
const PreparedOrders = () => {
    const DisplayHook = useFetch(import.meta.env.VITE_ORDER_SERVICE_URI +
        ApiEndpoints.GET_TODAYS_ORDERS_BY_OUTLET +
        localStorage.getItem("outlet"), "GET");
    const [isNotFound, setIsNotFound] = useState(false);
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const renderList = (e) => {
        setSearch(e.target.value);
        const newList = list.filter((item) => JSON.stringify(item).toLowerCase().includes(search));
        if (newList.length === 0) {
            setIsNotFound(true);
        }
        else {
            setIsNotFound(false);
        }
        if (newList.length === 0 ||
            e.target.value == null ||
            e.target.value == undefined ||
            (typeof e.target.value === "string" && e.target.value.trim().length === 0)) {
            setList(list);
        }
        else {
            setList(newList);
        }
    };
    useEffect(() => {
        getAllTodaysOrders();
    }, []);
    const getAllTodaysOrders = () => {
        DisplayHook.MakeHttpRequest().then((result) => {
            if (result.result.orders.length != 0) {
                setList(result.result.orders);
                console.log(list);
            }
            else {
                setList([]);
            }
        });
    };
    return (_jsxs("div", { className: "mt-4 overflow-x-auto container", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("div", { className: "text-3xl font-bold self-center", children: "Today's Orders" }), _jsx("input", { type: "text", className: "ph-input-text w-[30%] mt-2", placeholder: "Search through table", onChange: renderList, value: search })] }), list.length === 0 && (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsx("span", { className: "ms-2", children: "Table has no record" })] })), isNotFound && (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsx("span", { className: "ms-2", children: "No record found" })] })), list.length != 0 && !isNotFound && (_jsxs("table", { className: "table  table-hover", children: [_jsx("thead", { children: _jsx("tr", { children: list.length > 0 &&
                                Object.keys(list[0]).map((item) => {
                                    return (_jsx("th", { scope: "col", children: item }, nanoid()));
                                }) }) }), _jsx("tbody", { children: list.map((order) => (_jsxs("tr", { className: order.status == "DELIVERED"
                                ? "table-success"
                                : order.status == "CANCELLED"
                                    ? "table-danger"
                                    : order.status == "IN_TRANSIT"
                                        ? ""
                                        : "", children: [_jsx("td", { children: order.id }), _jsx("td", { children: order.name }), _jsx("td", { children: order.totalAmount }), _jsx("td", { className: order.status == "DELIVERED"
                                        ? " text-success  font-bold"
                                        : order.status == "CANCELLED"
                                            ? " text-danger font-bold"
                                            : order.status == "IN_TRANSIT"
                                                ? "font-bold text-info"
                                                : "", children: order.status }), _jsx("td", { children: order.deliveryPerson }), _jsx("td", { className: "flex flex-col ", children: order.items.map((item) => (_jsxs("span", { children: [item.name, " - ", item.quantity, " \u00A0"] }, item.name))) })] }, order.id))) })] }))] }));
};
export default PreparedOrders;
