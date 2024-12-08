import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ApiEndpoints } from "../../types/enums";
import { useFetch } from "../../hooks/useFetch";
import Swal from "sweetalert2";
const CompletedOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(); // Track selected order
    const [orders, setOrders] = useState([]);
    const dpid = localStorage.getItem("user");
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
    const DisplayHook = useFetch(import.meta.env.VITE_ORDER_SERVICE_URI +
        ApiEndpoints.GET_ORDERS_FOR_DELIVERY +
        dpid +
        "/" +
        "DELIVERED", "GET");
    useEffect(() => {
        getAllDeliveredOrders();
    }, []);
    const getAllDeliveredOrders = () => {
        DisplayHook.MakeHttpRequest().then((result) => {
            if (result.error) {
                Toast.fire({
                    title: "Server Error !",
                    icon: "error",
                });
            }
            else {
                setOrders(result.result.orders);
            }
        });
    };
    const handleOrderClick = (order) => {
        Swal.fire({
            html: `
        <h3>Order Details for ${order.name}</h3><br/>
        <div className="my-2">
          ${order.items.map((item) => `<div key=${item.name}>
              ${item.quantity} x ${item.name}
            </div>`)}
        </div>
      </div>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Close",
            confirmButtonAriaLabel: "Thumbs up, great!",
        });
        // Set selected order on click
    };
    return (_jsx("div", { className: "container px-4 py-10", children: _jsxs("div", { className: "flex flex-col ", children: [_jsx("h2", { className: "text-3xl font-bold self-center mb-4", children: "Delivered Orders" }), _jsx("div", { className: "", children: orders.map((order) => (_jsxs("li", { className: "rounded-md shadow-md p-4 flex  justify-between items-center cursor-pointer hover:bg-gray-100", onClick: () => handleOrderClick(order), children: [_jsxs("div", { className: "mr-4 flex flex-col flex-wrap", children: [_jsxs("span", { className: "text-xl mr-4 font-bold", children: [order.name, " "] }), _jsxs("span", { className: "text-base font-semibold text-gray-500", children: [order.phoneNo, " ", _jsx("br", {}), order.address] })] }), _jsxs("div", { className: " flex flex-col flex-wrap w-1/3 text-right", children: [_jsxs("span", { className: "text-xl font-semibold", children: ["\u20B9", order.payable_amount] }), _jsxs("span", { className: "text-base text-gray-500 ml-2", children: [order.items.length, " items"] })] })] }, order.id))) })] }) }));
};
export default CompletedOrders;
