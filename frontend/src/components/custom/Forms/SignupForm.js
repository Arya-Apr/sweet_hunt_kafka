import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { emailValidation, nameValidation, passwordValidation, phoneValidation, usernameValidation, } from "../../../utils/ValidationRules";
import { useFetch } from "../../../hooks/useFetch";
import { ApiEndpoints, ConstantValues, Roles } from "../../../types/enums";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../features/slices/modalSlice";
import Swal from "sweetalert2";
import { setProgress } from "../../../features/slices/loadingSlice";
export default function SignupForm() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { MakeHttpRequest, setPayload } = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.USER_REGISTER, "POST");
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        dispatch(setProgress(80));
        setPayload({
            ...data,
            credits: ConstantValues.INIT_CREDIT,
            role: Roles.CUSTOMER
        });
        try {
            const result = await MakeHttpRequest();
            dispatch(setProgress(100));
            if (result.error === null) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been successfully registered",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                dispatch(setProgress(0));
                Swal.fire({
                    title: "Oops! unable to register you",
                    text: "You may already created an account",
                    icon: "error"
                });
            }
        }
        catch (ex) {
            dispatch(setProgress(0));
            Swal.fire({
                title: "Oops! unable to register you",
                text: "Service is not available, try after few minutes",
                icon: "error"
            });
        }
        dispatch(closeModal());
    };
    const nameRegister = register("name", nameValidation);
    const usernameRegister = register("username", usernameValidation);
    const emailRegister = register("email", emailValidation);
    const passwordRegister = register("password", passwordValidation);
    const phoneNoRegister = register("phone_no", phoneValidation);
    return (_jsx(_Fragment, { children: _jsx("div", { children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "input-field", children: [_jsx("label", { htmlFor: "name", className: "ph-label", children: "Enter your name" }), _jsx("input", { id: "name", type: "text", className: `peer ${errors?.name ? "ph-input-invalid" : "ph-input-text"}`, ...nameRegister }), errors?.name && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.name.message })] }))] }), _jsxs("div", { className: "input-field mt-4", children: [_jsx("label", { htmlFor: "name", className: "ph-label", children: "Create username" }), _jsx("input", { id: "username", type: "text", className: `peer ${errors?.username ? "ph-input-invalid" : "ph-input-text"}`, ...usernameRegister }), errors?.username && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.username.message })] }))] }), _jsxs("div", { className: "input-field mt-4", children: [_jsx("label", { htmlFor: "password", className: "ph-label", children: "Create password" }), _jsx("input", { id: "password", type: "password", className: `peer ${errors?.password ? "ph-input-invalid" : "ph-input-text"}`, ...passwordRegister }), errors?.password && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.password.message })] }))] }), _jsxs("div", { className: "input-field mt-4", children: [_jsx("label", { htmlFor: "email", className: "ph-label", children: "Enter email" }), _jsx("input", { id: "email", type: "email", className: `peer ${errors?.email ? "ph-input-invalid" : "ph-input-text"}`, ...emailRegister }), errors?.email && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.email.message })] }))] }), _jsxs("div", { className: "input-field mt-4", children: [_jsx("label", { htmlFor: "phone", className: "ph-label", children: "Enter phone number" }), _jsx("input", { id: "phone", type: "number", className: `peer ${errors?.phone_no ? "ph-input-invalid" : "ph-input-text"}`, ...phoneNoRegister }), errors?.phone_no && (_jsxs("div", { className: "error-message", children: [_jsx(ErrorOutlineOutlinedIcon, { fontSize: "small", style: { margin: "3px 2px 0px 2px" } }), _jsx("p", { className: "mb-0", children: errors?.phone_no.message })] }))] }), _jsx("div", { className: "form-button flex justify-end", children: _jsx("input", { type: "submit", value: "Sign up", className: "btn-theme" }) })] }) }) }) }));
}
