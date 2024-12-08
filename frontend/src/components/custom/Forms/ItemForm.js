import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { nameValidation, CategoryValidation, DescriptionValidation, taxslabValidation, priceValidation, imgValidation, is_vegValidation, } from "../../../utils/ValidationRules";
import { useFetch } from "../../../hooks/useFetch";
import { ApiEndpoints } from "../../../types/enums";
import { convertImageToBlob } from "../../../utils/utils";
const ItemForm = ({ onEvent, update, action, }) => {
    const [categories, setcategories] = useState([]);
    const [taxSlabs, settaxSlabs] = useState([]);
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();
    const CategoryHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_CATEGORY, "GET");
    const TaxSlabHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_TAX_SLAB, "GET");
    useEffect(() => {
        CategoryHook.MakeHttpRequest().then((result) => {
            if (result.result) {
                setcategories(result.result);
            }
            else {
                console.log(result.error);
            }
        });
        TaxSlabHook.MakeHttpRequest().then((result) => {
            if (result.result) {
                settaxSlabs(result.result);
            }
            else {
                console.log(result.error);
            }
        });
        if (update != null) {
            setValue("price", update.price);
            setValue("name", update.name);
            setValue("categoryId", update.category_id);
            setValue("description", update.description);
            setValue("itemImage", update.img);
            setValue("isVeg", update.is_veg);
            setValue("taxSlabId", update.tax_slab_id);
        }
    }, []);
    const onSubmit = async (data) => {
        const blob = await convertImageToBlob(data.itemImage[0]);
        data.itemImage = blob;
        data.price = "" + data.price;
        data.isVeg == 1 ? (data.isVeg = true) : (data.isVeg = false);
        console.log(data, "After ");
        if (update != null) {
            data.id = update.id;
        }
        onEvent(data);
        reset({
            price: "",
            name: "",
            categoryId: null,
            description: "",
            itemImage: null,
            isVeg: null,
            taxSlabId: null,
        });
    };
    const nameRegister = register("name", nameValidation);
    const priceRegister = register("price", priceValidation);
    const categoryRegister = register("categoryId", CategoryValidation);
    const descriptionRegister = register("description", DescriptionValidation);
    const imgRegister = register("itemImage", imgValidation);
    const isVegRegister = register("isVeg", is_vegValidation);
    const taxslabRegister = register("taxSlabId", taxslabValidation);
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { type: "text", id: "name", ...nameRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.name && errors?.name.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "category", children: "Category" }), _jsx("select", { id: "category", ...categoryRegister, className: "ph-select", children: categories.map((cat) => {
                            return _jsx("option", { value: cat.id, children: cat.name });
                        }) }), _jsx("p", { style: { color: "red" }, children: errors?.categoryId && errors?.categoryId.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "description", children: "Description" }), _jsx("textarea", { id: "description", ...descriptionRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.description && errors?.description.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "taxslab", children: "Tax Slab" }), _jsx("select", { id: "taxslab", ...taxslabRegister, className: "ph-select", children: taxSlabs.map((tax) => {
                            return _jsx("option", { value: tax.id, children: tax.percentage }, tax.id);
                        }) }), _jsx("p", { style: { color: "red" }, children: errors?.taxSlabId && errors?.taxSlabId.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "price", children: "Price" }), _jsx("input", { type: "number", id: "price", ...priceRegister, className: "ph-input-text" }), _jsx("p", { style: { color: "red" }, children: errors?.price && errors?.price.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { htmlFor: "img", className: "form-label", children: "Item Image" }), _jsx("input", { type: "file", className: "form-control", id: "img", accept: "image/*", ...imgRegister }), _jsx("p", { style: { color: "red" }, children: errors?.itemImage && errors?.itemImage.message })] }), _jsxs("div", { className: "flex flex-col mb-2", children: [_jsx("label", { children: "Is veg" }), _jsxs("div", { className: "flex justify-start flex-wrap", children: [_jsxs("div", { className: "form-check flex items-center mx-2", children: [_jsx("input", { id: "radio-1", ...isVegRegister, type: "radio", value: 1, name: "isVeg", className: " form-check-input" }), _jsx("label", { htmlFor: "radio-1", className: "form-check-label ms-2 text-sm font-medium text-gray-400 dark:text-gray-500", children: "Yes" })] }), _jsxs("div", { className: "form-check flex items-center mx-2", children: [_jsx("input", { id: "radio-2", ...isVegRegister, type: "radio", value: 0, name: "isVeg", className: "h-4 form-check-input" }), _jsx("label", { htmlFor: "radio-2", className: " form-check-label ms-2 text-sm font-medium text-gray-400 dark:text-gray-500", children: "No" })] })] }), _jsx("p", { style: { color: "red" }, children: errors?.isVeg && errors?.isVeg.message })] }), _jsx("button", { type: "submit", className: "btn-theme", children: action })] }));
};
export default ItemForm;
