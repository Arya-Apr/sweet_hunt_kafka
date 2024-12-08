import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { addressValidation, emailValidation, latitudeValidation, longitudeValidation, nameValidation, passwordValidation, phoneValidation, pincodeValidation, usernameValidation, } from "../../../utils/ValidationRules";
const OutletForm = ({ onAdd, update, action, isUpdating }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();
    useEffect(() => {
        if (update != null) {
            setValue("address", update.address);
            setValue("username", update.username);
            setValue("name", update.name);
            setValue("email", update.email);
            setValue("latitude", update.latitude);
            setValue("longitude", update.longitude);
            setValue("phoneNo", update.phoneNo);
            setValue("pincode", update.pincode);
            setValue("password", update.password);
        }
    }, []);
    const onSubmit = (data) => {
        if (update != null) {
            data.id = update.id;
        }
        onAdd(data);
        reset({
            address: "",
            username: "",
            name: "",
            email: "",
            latitude: null,
            longitude: null,
            pincode: null,
            phoneno: null,
        });
    };
    let usernameRegister = register("username", usernameValidation);
    const nameRegister = register("name", nameValidation);
    const addressRegister = register("address", addressValidation);
    const phoneRegister = register("phoneNo", phoneValidation);
    const pincodeRegister = register("pincode", pincodeValidation);
    const longitudeRegister = register("longitude", longitudeValidation);
    const latitudeRegister = register("latitude", latitudeValidation);
    let emailRegister = register("email", emailValidation);
    let passRegister = register("password", passwordValidation);
    if (update) {
        passRegister = register("password", { required: false });
        emailRegister = register("email", { required: false });
        usernameRegister = register("username", { required: false });
    }
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { type: "text", id: "name", ...nameRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.name && errors?.name.message })] }), !isUpdating && _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { type: "text", id: "username", ...usernameRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.username && errors?.username.message })] }), !isUpdating && _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "text", id: "email", ...emailRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.email && errors?.email.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "password", hidden: update != null, children: "Password" }), _jsx("input", { type: "text", id: "password", ...passRegister, className: "ph-input-text", hidden: update != null }), _jsx("p", { style: { color: "red" }, hidden: update != null, children: errors?.password && errors?.password.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "address", children: "Address" }), _jsx("textarea", { id: "address", ...addressRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.address && errors?.address.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "phoneno", children: "Phone Number" }), _jsx("input", { type: "number", id: "phoneno", ...phoneRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.phoneNo && errors?.phoneNo.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "latitude", children: "Latitude" }), _jsx("input", { type: "text", id: "latitude", ...latitudeRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.latitude && errors?.latitude.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "longitude", children: "Longitude" }), _jsx("input", { type: "text", id: "longitude", ...longitudeRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.longitude && errors?.longitude.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "pincode", children: "Pincode" }), _jsx("input", { type: "number", id: "pincode", ...pincodeRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.pincode && errors?.pincode.message })] }), _jsx("button", { type: "submit", className: "btn-theme", children: action })] }));
};
export default OutletForm;
