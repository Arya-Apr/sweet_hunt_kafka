import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setProgress } from "../../features/slices/loadingSlice";
import { nanoid } from "@reduxjs/toolkit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
function OrderCard({ order, loadData }) {
    const dispatch = useDispatch();
    const UpdateHook = useFetch(import.meta.env.VITE_PREPARATION_SERVICE_URI + ApiEndpoints.DISPATCH_ORDER, "POST");
    const VerifyHook = useFetch(import.meta.env.VITE_DELIVERY_SERVICE_URI + ApiEndpoints.SEND_OTP_TO_CUST, "GET");
    const DeliveryHook = useFetch(import.meta.env.VITE_DELIVERY_SERVICE_URI +
        ApiEndpoints.UPDATE_STATUS_TO_DELIVERED, "GET");
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
    const [OTP, setOTP] = useState(null);
    useEffect(() => { }, []);
    const formatPrice = (price) => `${price} Rs`;
    const verifyOrder = (id, orderid) => {
        dispatch(setProgress(70));
        document.getElementById("verifybtn").setAttribute("disabled", "disabled");
        VerifyHook.MakeHttpRequest(id).then(async (result) => {
            document.getElementById("verifybtn").removeAttribute("disabled");
            if (result.result.status == 200) {
                dispatch(setProgress(100));
                Toast.fire({
                    title: "OTP Sent to Customer !",
                    icon: "success",
                });
                const tempotp = result.result.message;
                console.log(tempotp);
                const { value: OTPinput } = await Swal.fire({
                    title: "Confirm Customer OTP ! ",
                    input: "number",
                    inputLabel: "",
                    inputPlaceholder: "Enter 6 digit OTP !",
                });
                if (OTPinput.toString() == tempotp) {
                    DeliveryHook.MakeHttpRequest(orderid).then((result) => {
                        if (result.result.status == 200) {
                            Swal.fire("OTP Verified!", "Order is delivered !", "success");
                            loadData();
                        }
                        else {
                            Toast.fire({
                                title: "Server Error, Try agin !",
                                icon: "error",
                            });
                        }
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Verification Failed..",
                        text: "You have entered Wrong OTP !",
                    });
                }
            }
            else {
                Toast.fire({
                    title: "Server Error !",
                    icon: "error",
                });
            }
        });
    };
    const updateToCompleted = (id) => {
        dispatch(setProgress(70));
        const payload = {
            outletid: localStorage.getItem("outlet"),
            orderid: id,
        };
        UpdateHook.setPayload(payload);
        UpdateHook.MakeHttpRequest().then((result) => {
            if (result.result.status != 0) {
                Toast.fire({
                    title: "Delivery Person Assigned !",
                    icon: "success",
                });
                loadData();
                dispatch(setProgress(100));
            }
            else {
                Toast.fire({
                    title: "Error in Assigning Delivery Person !",
                    icon: "error",
                });
            }
        });
    };
    return (_jsxs("div", { className: "rounded-lg shadow-md border-[1px] border-orange-200 p-4", children: [_jsxs("h3", { className: "font-bold text-xl text-center text-ph-primary mb-2", children: [order.name, "'s Order"] }), _jsxs("div", { className: "h-fit", children: [_jsxs("div", { className: "flex justify-between font-bold", children: [_jsx("div", { children: "ITEM" }), _jsx("div", { children: "QTY" })] }), _jsx("hr", { className: "my-2" }), order.items.map((item) => (_jsxs("div", { className: "flex justify-center mb-2", children: [_jsx("span", { className: "flex-grow font-semibold", children: item.name }), _jsx("span", { className: "w-1/4 text-right font-semibold mr-2", children: item.quantity })] }, nanoid())))] }), order.phoneNo && (_jsxs(_Fragment, { children: [_jsx("hr", { className: "my-2" }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx(LocalPhoneIcon, {}), _jsx("div", { className: "font-semibold", children: order.phoneNo })] })] })), order.address && (_jsxs("div", { className: "flex gap-2 overflow-auto", children: [_jsx(HomeIcon, {}), _jsx("div", { className: "font-semibold", children: order.address })] })), _jsx("hr", { className: "my-2" }), _jsxs("div", { className: "flex justify-between mt-3", children: [_jsx("p", { className: "font-bold self-center text-left text-lg text-green-700 my-0", children: formatPrice(order.payable_amount) }), order.order_status != "IN_TRANSIT" && (_jsx("button", { type: "button", className: " btn-theme self-center", onClick: () => {
                            updateToCompleted(order.id);
                        }, children: "complete" })), order.order_status == "IN_TRANSIT" && (_jsx("button", { type: "button", id: "verifybtn", className: "btn-theme self-center", onClick: () => {
                            verifyOrder(order.userid, order.id);
                        }, children: "Verify" }))] })] }));
}
export default OrderCard;
