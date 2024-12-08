import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { decrease, increase, removeItem, } from "../../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
function CartItems({ item, }) {
    const dispatch = useDispatch();
    return (_jsx("div", { className: "item-list my-2 shadow-md rounded-md py-3 px-4", children: _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap", children: [_jsx("div", { className: "item-heading text-2xl font-semibold mb-2", children: item.name }), _jsx("div", { className: "inline-block font-semibold text-sm px-2 py-1 bg-ph-yellow-soft h-fit rounded-xl mb-2 ml-3 self-center", children: item.category })] }), _jsx("div", { className: "block mt-2", children: _jsxs("div", { className: "item-heading self-center me-4", children: [_jsxs("div", { children: [_jsx("span", { children: "Price: " }), _jsxs("span", { className: "text-green-700 font-semibold text-lg", children: [item.price, _jsx(CurrencyRupeeIcon, { style: { fontSize: "16px" } })] }), " "] }), _jsxs("div", { children: [_jsx("span", { children: "Tax slab: " }), _jsxs("span", { className: "text-green-700 font-semibold text-lg", children: [item.taxSlab, "%"] }), " "] }), _jsxs("div", { children: [_jsx("span", { children: "Payable amount: " }), _jsxs("span", { className: "text-green-700 font-semibold text-lg", children: [item.price + item.price * (item.taxSlab / 100), _jsx(CurrencyRupeeIcon, { style: { fontSize: "16px" } })] }), " "] })] }) })] }), _jsxs("div", { className: "flex-col self-center", children: [_jsxs("div", { children: [_jsx("button", { className: "btn-theme-filled-shadowed px-2", onClick: () => {
                                        dispatch(increase({ id: item.id }));
                                    }, children: _jsx(AddIcon, {}) }), _jsx("div", { className: "self-center inline-block mx-2", children: item.quantity }), _jsx("button", { className: "btn-theme-filled-shadowed px-2", onClick: () => {
                                        if (item.quantity === 1) {
                                            dispatch(removeItem(item.id));
                                            return;
                                        }
                                        dispatch(decrease({ id: item.id }));
                                    }, children: _jsx(RemoveIcon, {}) })] }), _jsx("div", { className: "h-8" }), _jsxs("button", { className: "self-center btn-danger-filled-shadowed mt-2 mx-auto flex rounded-full justify-center", onClick: () => {
                                dispatch(removeItem(item.id));
                            }, children: [_jsx(HighlightOffIcon, { className: "mr-1" }), " ", _jsx("span", { children: "Remove" })] })] })] }) }));
}
export default CartItems;
