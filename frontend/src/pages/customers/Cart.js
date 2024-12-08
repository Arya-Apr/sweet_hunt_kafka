import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import CartItems from "../../components/custom/Cart/CartItems";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints, ConstantValues } from "../../types/enums";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../features/slices/cartSlice";
import { closeModal, openModal } from "../../features/slices/modalSlice";
import PHModal from "../../components/custom/Modals/PHModal";
import OrderItem from "../../components/custom/Cart/OrderItem";
import { nanoid } from "@reduxjs/toolkit";
function Cart() {
    const { items, total, totalQuantity } = useSelector((store) => store.cart);
    const { isOpen } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [userCredit, setUserCredit] = useState(ConstantValues.INIT_CREDIT);
    const userFetch = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI +
        ApiEndpoints.GET_USER +
        `/${localStorage.getItem("user")}`, "GET", localStorage.getItem("token"));
    useEffect(() => {
        userFetch
            .MakeHttpRequest()
            .then((result) => {
            if (result.result) {
                setUser(result.result);
                setUserCredit(result.result.credits);
            }
        })
            .catch((ex) => console.error(ex));
    }, []);
    useEffect(() => {
        dispatch(calculateTotals());
    }, [items]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "container mt-4", children: [_jsx("div", { className: "flex justify-end", children: _jsxs("div", { className: "bg-orange-100 inline-block rounded-lg px-4 py-2", children: [_jsx("span", { className: "lg", children: "Available credits:" }), _jsx("span", { className: "text-xl font-bold ml-1 text-green-700", children: user && Number(userCredit).toFixed(2) })] }) }), _jsx("div", { className: "row", children: items.length > 0 &&
                            items.map((i) => {
                                return (_jsx("div", { className: "col-md-12", children: _jsx(CartItems, { item: i }) }, nanoid()));
                            }) }), items.length > 0 ? (_jsxs("div", { className: "flex justify-around", children: [_jsxs("div", { className: "bg-green-100 self-center px-4 py-2 rounded-lg", children: [_jsx("span", { className: "text-lg", children: "Total: " }), _jsxs("span", { className: "text-xl font-bold text-green-800", children: [total.toFixed(2), _jsx(CurrencyRupeeIcon, { style: { fontSize: "16px" } })] })] }), _jsxs("button", { className: "btn-theme-filled-shadowed flex h-fit self-center", onClick: () => {
                                    dispatch(openModal());
                                }, children: [_jsx(CheckIcon, { className: "self-center me-1" }), " ", _jsx("span", { className: "self-center", children: "Checkout" })] })] })) : (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsx("span", { className: "ms-2", children: "Your cart is empty" })] }))] }), _jsx(PHModal, { headingText: "Placing an order", isOpen: isOpen, onClose: () => {
                    dispatch(closeModal());
                }, style: { width: 400 }, component: _jsx(OrderItem, { order: { items, total, totalQuantity }, user: user, setUserCredit: setUserCredit }) })] }));
}
export default Cart;
