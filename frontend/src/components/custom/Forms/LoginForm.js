import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { emailValidation, passwordValidation, } from "../../../utils/ValidationRules";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../features/slices/modalSlice";
import { useEffect, useState } from "react";
import PHModal from "../Modals/PHModal";
import SignupForm from "../Forms/SignupForm";
import { useFetch } from "../../../hooks/useFetch";
import { ApiEndpoints, NavigateToRoute } from "../../../types/enums";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setProgress } from "../../../features/slices/loadingSlice";
function LoginForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch();
    const { setPayload, MakeHttpRequest } = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.USER_LOGIN, "POST");
    const getOutlets = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_OUTLETS, "GET");
    const [outletList, setOutletList] = useState([]);
    const emailRegister = register("email", emailValidation);
    const passwordRegister = register("password", passwordValidation);
    const [renderModal, setRenderModal] = useState(false);
    const { isOpen } = useSelector((store) => store.modal);
    const navigate = useNavigate();
    const outletSelectionRegister = {
        ...register("outlet", {
            required: "Outlet is requried",
            minLength: {
                value: 1,
                message: "Please select your nearest outlet",
            },
        }),
    };
    useEffect(() => {
        getOutlets
            .MakeHttpRequest()
            .then((result) => {
            if (result.result) {
                setOutletList(result.result);
            }
        })
            .catch((ex) => console.log(ex));
    }, []);
    const onSubmit = async (data) => {
        dispatch(setProgress(80));
        setPayload(data);
        MakeHttpRequest()
            .then((result) => {
            dispatch(setProgress(100));
            if (result.error === null) {
                localStorage.setItem("token", result.result.token);
                localStorage.setItem("user", result.result.userid);
                localStorage.setItem("outlet", data.outlet);
                navigate(`${NavigateToRoute.NAVIGATION}`);
            }
            else {
                dispatch(setProgress(0));
                Swal.fire({
                    title: "Oops! unable to login you",
                    text: "You doesn't have an account with these credentials",
                    icon: "error",
                });
            }
        })
            .catch((ex) => {
            dispatch(setProgress(0));
            Swal.fire({
                title: "Oops! unable to login you",
                text: "Internal server issue. Try after few minutes",
                icon: "error",
            });
        });
        dispatch(closeModal());
    };
    return (_jsxs("div", { children: [_jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "userEmail", className: "ph-label", children: "Enter email" }), _jsx("input", { id: "userEmail", type: "text", placeholder: "example@provider.com", className: `peer ${errors?.email ? "ph-input-invalid" : "ph-input-text"}`, ...emailRegister }), errors?.email && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.email.message })] }))] }), _jsxs("div", { className: "input-field mt-4", children: [_jsx("label", { htmlFor: "password", className: "ph-label", children: "Enter password" }), _jsx("input", { id: "password", type: "password", className: `peer ${errors?.password ? "ph-input-invalid" : "ph-input-text"}`, ...passwordRegister }), errors?.password && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.password.message })] }))] }), _jsxs("div", { className: "input-field mt-3", children: [_jsxs("select", { className: `peer ${errors?.outlet ? "ph-input-invalid" : "ph-input-text"}`, id: "selectOutlet", ...outletSelectionRegister, children: [_jsx("option", { value: "", children: "Select your nearest outlet" }), outletList.map((item) => {
                                            return (_jsx("option", { value: item.id, children: item.address }, item.id));
                                        })] }), errors?.outlet && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.outlet.message })] }))] }), _jsxs("div", { className: "form-button flex justify-end", children: [_jsx("input", { type: "button", value: "Sign up", className: "btn-theme-shadowed me-2", onClick: () => {
                                        setRenderModal(!renderModal);
                                    } }), _jsx("input", { type: "submit", value: "Login", className: "btn-theme" })] })] }) }), renderModal && (_jsx(PHModal, { headingText: "Create an account", isOpen: isOpen, onClose: () => {
                    setRenderModal(false);
                    dispatch(closeModal());
                }, component: _jsx(SignupForm, {}), style: { width: "380px" } }))] }));
}
export default LoginForm;
