import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
import { pincodeValidation } from "../../../utils/ValidationRules";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ApiEndpoints, ConstantValues, NavigateToRoute, } from "../../../types/enums";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../features/slices/modalSlice";
import { clearCart } from "../../../features/slices/cartSlice";
import { setProgress } from "../../../features/slices/loadingSlice";
import { useNavigate } from "react-router-dom";
function OrderItem(props) {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addAddressRequest = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.ADD_USER_ADDRESS, "POST");
    const updateAddressRequest = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI +
        ApiEndpoints.UPDATE_USER_ADDRESS, "POST");
    const placeCustomerOrder = useFetch(import.meta.env.VITE_ORDER_SERVICE_URI + ApiEndpoints.ADD_ORDER, "POST");
    const addressRegister = {
        ...register("address", {
            required: "Address is required",
            minLength: { value: 10, message: "Describe address properly" },
        }),
    };
    const pincodeRegister = { ...register("pincode", pincodeValidation) };
    // Showcasing older address values if exists
    useEffect(() => {
        if (props.user.address.length > 0) {
            setValue("address", props.user.address[0]?.address);
            setValue("pincode", props.user.address[0]?.pincode);
        }
    }, []);
    // Method which placing order along with managing customer address
    const placeOrder = (data) => {
        dispatch(setProgress(70));
        // preparing payloads
        const addressPayload = {
            address: data.address,
            pincode: data.pincode,
        };
        const orderItem = props.order.items.map((item) => {
            return { itemId: item.id, quantity: item.quantity };
        });
        const orderPayload = {
            items: orderItem,
            amount: (props.order.total + Number(ConstantValues.DELIVERY_CHARGE)).toFixed(2),
            outletId: localStorage.getItem("outlet"),
            userId: localStorage.getItem("user"),
            paymentMethod: data.paymentType,
        };
        // Checking for address conditions
        if (props.user.address.length === 0) {
            addAddressRequest.setPayload({
                ...addressPayload,
                user_id: props.user.userid,
            });
            addAddressRequest
                .MakeHttpRequest()
                .then((result) => { })
                .catch((ex) => {
                console.log(ex);
                return;
            });
        }
        else {
            updateAddressRequest.setPayload({
                ...addressPayload,
                addressid: props.user.address[0].id,
            });
            updateAddressRequest
                .MakeHttpRequest()
                .then((result) => {
                console.log(result);
            })
                .catch((ex) => {
                console.log(ex);
                return;
            });
        }
        // Placing order api request
        placeCustomerOrder.setPayload(orderPayload);
        placeCustomerOrder
            .MakeHttpRequest()
            .then((result) => {
            console.log("result is" + result.result.toString() + " error: " + result.error);
            if (result.result) {
                props.setUserCredit(Number(result.result?.message).toFixed(2));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your order has been placed",
                    showCloseButton: false,
                    timer: 1500,
                });
                dispatch(setProgress(100));
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Unable to place an order",
                    showCloseButton: true,
                    timer: 3000,
                });
                return;
            }
        })
            .catch((ex) => {
            console.log(ex);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Unable to place an order",
                showCloseButton: true,
                timer: 3000,
            });
        });
        dispatch(closeModal());
        dispatch(clearCart());
        localStorage.setItem("cart", JSON.stringify([]));
        navigate(`/${NavigateToRoute.ORDERED_FOODS}`);
    };
    return (_jsxs("div", { children: [_jsxs("small", { className: "mt-2 bg-blue-100 px-2 py-2 block rounded-lg mb-3", children: [_jsx(InfoOutlinedIcon, { fontSize: "small", className: "mb-[2px]" }), " Your money will be deducted from your credits."] }), _jsxs("form", { onSubmit: handleSubmit(placeOrder), children: [_jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "address", className: "ph-label", children: "Enter your address" }), _jsx("textarea", { id: "address", rows: 3, placeholder: "Enter address to which your food will be delivered", className: `peer ${errors?.address ? "ph-input-invalid" : "ph-input-text"}`, ...addressRegister }), errors?.address && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.address.message })] }))] }), _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "pincode", className: "ph-label", children: "Enter pincode" }), _jsx("input", { id: "pincode", type: "number", className: `peer ${errors?.pincode ? "ph-input-invalid" : "ph-input-text"}`, ...pincodeRegister }), errors?.pincode && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.pincode.message })] }))] }), _jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "paymentType", className: "ph-label", children: "Select payment type" }), _jsxs("select", { id: "paymentType", className: `peer ${errors?.paymentType ? "ph-input-invalid" : "ph-input-text"}`, ...register("paymentType", {
                                    required: "Select payment method",
                                    minLength: { value: 1, message: "Select payment method" },
                                }), children: [_jsx("option", { value: "", children: "--Payment method--" }), _jsx("option", { value: "CASH", children: "Cash" }), _jsx("option", { value: "CREDIT", children: "Credit" })] }), errors?.paymentType && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.paymentType.message })] }))] }), _jsxs("div", { className: "flex justify-between mt-4", children: [_jsxs("div", { className: "self-center", children: [_jsx("small", { className: "mr-1", children: "Delivery charge:" }), _jsxs("span", { className: "font-semibold text-lg", children: [ConstantValues.DELIVERY_CHARGE, " Rs."] }), _jsx("br", {}), _jsx("small", { className: "mr-1", children: "Payable amount:" }), _jsxs("span", { className: "font-semibold text-lg", children: [(props.order.total + Number(ConstantValues.DELIVERY_CHARGE)).toFixed(2), " ", "Rs."] })] }), _jsx("div", { className: "flex justify-end self-center", children: _jsx("button", { type: "submit", className: "btn-theme h-fit", children: "Place order" }) })] })] })] }));
}
export default OrderItem;
