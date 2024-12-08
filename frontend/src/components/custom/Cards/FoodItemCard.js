import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { convertByteArrayToImage } from "../../../utils/utils";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/slices/cartSlice";
function FoodItemCard({ data }) {
    const [imageUri, setImageUri] = useState("");
    useEffect(() => {
        convertByteArrayToImage(data.itemImage)
            .then((result) => {
            setImageUri(result);
        })
            .catch((ex) => console.log(ex));
    }, [data]);
    const dispatch = useDispatch();
    const addToCart = () => {
        const cart = localStorage.getItem("cart");
        if (cart && cart.length > 0) {
            const cartData = JSON.parse(localStorage.getItem("cart"));
            const isItemExistInCart = cartData.find((item) => item.id === data.id);
            if (!isItemExistInCart) {
                const newData = [
                    ...cartData,
                    {
                        id: data.id,
                        name: data.name,
                        category: data.categoryId.name,
                        taxSlab: data.taxSlabId.percentage,
                        price: data.price,
                        quantity: 1,
                    },
                ];
                localStorage.setItem("cart", JSON.stringify(newData));
                dispatch(addItem(JSON.parse(localStorage.getItem("cart"))));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Added ${data.name} to cart.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "#ffedd5",
                    iconColor: "#2b2f2d",
                });
                Toast.fire({
                    icon: "info",
                    title: "You already had this item in cart",
                });
            }
        }
        else {
            const newData = [
                {
                    id: data.id,
                    name: data.name,
                    category: data.categoryId.name,
                    taxSlab: data.taxSlabId.percentage,
                    price: data.price,
                    quantity: 1,
                },
            ];
            localStorage.setItem("cart", JSON.stringify(newData));
            dispatch(addItem(JSON.parse(localStorage.getItem("cart"))));
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Added ${data.name} to cart.`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "card my-2", style: {
                border: 0,
                height: "450px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }, children: [_jsx("img", { src: imageUri, style: { height: "200px" } }), _jsxs("div", { className: "card-body", style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }, children: [_jsxs("h5", { className: "card-title flex justify-between", children: [data.name, _jsx("span", { className: "font-semibold text-sm px-2 py-1 h-fit bg-ph-yellow-soft rounded-xl", children: data.categoryId.name })] }), _jsxs("div", { className: "card-text", children: [_jsx("div", { className: "Description", style: { height: "80px" }, children: data.description }), _jsx("div", { className: "mt-2", children: _jsx("div", { className: "font-semibold text-green-700", children: _jsxs("div", { className: "inline-block bg-green-100 py-1 px-2 rounded-lg", children: [_jsx("span", { className: "text-xl", children: data.price }), _jsx(CurrencyRupeeIcon, { className: "mb-1", style: { fontSize: "14px" } })] }) }) })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { className: "btn-theme-filled-shadowed", onClick: addToCart, children: "Add to cart" }) })] })] }) }));
}
export default FoodItemCard;
