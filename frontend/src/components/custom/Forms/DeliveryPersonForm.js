import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { adharValidation, nameValidation, usernameValidation, emailValidation, passwordValidation, phoneValidation, outletValidation } from "../../../utils/ValidationRules";
import { ApiEndpoints } from "../../../types/enums";
import { useFetch } from "../../../hooks/useFetch";
const DeliveryPersonForm = ({ onEvent, update, action, }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();
    const [outlets, setoutlets] = useState([]);
    const OutletsHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_OUTLETS, "GET");
    useEffect(() => {
        OutletsHook.MakeHttpRequest().then((result) => {
            if (result.result) {
                setoutlets(result.result);
            }
        });
        if (update != null) {
            setValue("aadharNumber", update.aadharNumber);
            setValue("username", update.username);
            setValue("name", update.name);
            setValue("email", update.email);
            setValue("outletId", update.outletId);
            setValue("phone_no", update.phone_no);
            setValue("password", update.password);
        }
    }, []);
    const onSubmit = (data) => {
        if (update != null) {
            data.id = update.id;
        }
        console.log(data);
        onEvent(data);
        reset({
            username: "",
            name: "",
            email: "",
            aadharNumber: null,
            outletId: null,
            phone_no: null,
        });
    };
    const usernameRegister = register("username", usernameValidation);
    const nameRegister = register("name", nameValidation);
    const outletRegister = register("outletId", outletValidation);
    const adharRegister = register("aadharNumber", adharValidation);
    const phoneRegister = register("phone_no", phoneValidation);
    let passRegister = register("password", passwordValidation);
    if (update) {
        passRegister = register("password", { required: false });
    }
    const emailRegister = register("email", emailValidation);
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { type: "text", id: "name", ...nameRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.name && errors?.name.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { type: "text", id: "username", ...usernameRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.username && errors?.username.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "phoneno", children: "Phone Number" }), _jsx("input", { type: "number", id: "phoneno", ...phoneRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.phone_no && errors?.phone_no.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "adharno", children: "Aadhar Number" }), _jsx("input", { type: "number", id: "adharno", ...adharRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.aadharNumber && errors?.aadharNumber.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "text", id: "email", ...emailRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.email && errors?.email.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "password", hidden: update != null, children: "Password" }), _jsx("input", { type: "text", id: "password", ...passRegister, className: "ph-input-text", hidden: update != null }), _jsx("p", { style: { color: "red" }, hidden: update != null, children: errors?.password && errors?.password.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "outlet", children: "Outlet" }), _jsx("select", { id: "outlet", ...outletRegister, className: "ph-select", children: outlets.map((ot) => {
                            return _jsx("option", { value: ot.id, children: ot.name }, ot.id);
                        }) }), _jsx("p", { style: { color: "red" }, children: errors?.outletId && errors?.outletId.message })] }), _jsx("button", { type: "submit", className: "btn-theme", children: action })] }));
};
export default DeliveryPersonForm;
