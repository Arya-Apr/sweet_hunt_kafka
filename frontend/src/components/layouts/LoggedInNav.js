import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiEndpoints, NavigateToRoute } from "../../types/enums";
// import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useFetch } from "../../hooks/useFetch";
import { clearCart } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { TokenValidation } from "../../utils/utils";
import CakeIcon from "@mui/icons-material/Cake";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GradingIcon from "@mui/icons-material/Grading";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
// import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
function LoggedInNav() {
    const navList = useRef(null);
    const HamBurger = useRef(null);
    const [currentUser, setCurrentUser] = useState();
    const [currentDeliveryPerson, setCurrentDeliveryPerson] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role } = TokenValidation();
    const { MakeHttpRequest } = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI +
        ApiEndpoints.GET_USER +
        `/${localStorage.getItem("user")}`, "GET", localStorage.getItem("token"));
    const getDeliveryPerson = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
        ApiEndpoints.GET_DELIVERY_PERSON_BY_ID +
        `/${localStorage.getItem("user")}`, "GET", localStorage.getItem("token"));
    useEffect(() => {
        if (role == "deliveryPerson") {
            getDeliveryPerson
                .MakeHttpRequest()
                .then((result) => {
                if (result.result) {
                    setCurrentDeliveryPerson(result.result);
                }
                else {
                    console.log("No delivery person found");
                }
            })
                .catch((ex) => console.log(ex));
        }
        else {
            MakeHttpRequest()
                .then((result) => {
                if (result.result) {
                    setCurrentUser(result.result);
                }
            })
                .catch((ex) => console.log(ex));
        }
    }, []);
    const checkSize = () => {
        if (window.innerWidth >= 768) {
            navList.current?.classList.add("nav-list");
            navList.current?.classList.remove("nav-mobile-list");
        }
        else {
            navList.current?.classList.add("nav-mobile-list");
            navList.current?.classList.remove("nav-list");
        }
    };
    const toggleHam = () => {
        HamBurger.current?.classList.toggle("ham-active");
        if (navList.current?.classList.contains("nav-mobile-list")) {
            navList.current?.classList.toggle("left-full");
        }
    };
    const logOut = () => {
        dispatch(clearCart());
        localStorage.clear();
        navigate(NavigateToRoute.HOME);
    };
    useEffect(() => {
        window.addEventListener("resize", checkSize);
        return () => {
            window.removeEventListener("resize", checkSize);
        };
    }, []);
    return (_jsx("nav", { className: "navbar py-0 z-10", style: { position: "sticky", top: 0 }, children: _jsxs("div", { className: "container d-flex justify-content-start", children: [_jsx("div", { className: "self-center", children: _jsx("img", { src: "/src/assets/SweetLogo2.svg", alt: "no svg found", className: "w-[60%] md:w-2/3" }) }), _jsxs("ul", { className: window.innerWidth >= 768
                        ? "nav-list ms-auto left-full"
                        : "nav-mobile-list left-full", ref: navList, children: [role === "admin" && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ADD_DELIVERY_STAFF, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(PeopleOutlineIcon, { style: { marginBottom: "2px" } }), " Staff"] })] }), _jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ADD_ITEM, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(CategoryOutlinedIcon, { style: { marginBottom: "2px" } }), " Items"] })] }), _jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ADD_OUTLET, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(StoreOutlinedIcon, { style: { marginBottom: "2px" } }), " Outlets"] })] })] })), role == "deliveryPerson" && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.DELIVERY_ORDERS, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(GradingIcon, { style: { marginBottom: "2px" } }), " Orders"] })] }), _jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.DELIVERY_COMPLETED, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(AssignmentTurnedInOutlinedIcon, { style: { marginBottom: "2px" } }), " ", "Delivered"] })] })] })), role == "restaurant" && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ADD_DELIVERY_STAFF, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(PeopleOutlineIcon, { style: { marginBottom: "2px" } }), " Add staff"] })] }), _jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ORDER_P, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(InventoryOutlinedIcon, { style: { marginBottom: "2px" } }), " ", "Placed"] })] }), _jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ORDER_PRE, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(CheckCircleOutlineOutlinedIcon, { style: { marginBottom: "2px" } }), " ", "Prepared"] })] })] })), role == "customer" && (_jsxs(_Fragment, { children: [_jsxs("li", { className: "nav-list-items", children: [" ", _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.FOOD, onClick: toggleHam, style: ({ isActive }) => {
                                                return isActive
                                                    ? {
                                                        backgroundColor: "#E1701A",
                                                        color: "white",
                                                        TextDecoration: "none",
                                                    }
                                                    : {
                                                        TextDecoration: "none",
                                                    };
                                            }, children: [_jsx(CakeIcon, { style: { marginBottom: "2px" } }), " Menu"] })] }), _jsx("li", { className: "nav-list-items", children: _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.CART, onClick: toggleHam, style: ({ isActive }) => {
                                            return isActive
                                                ? {
                                                    backgroundColor: "#E1701A",
                                                    color: "white",
                                                    TextDecoration: "none",
                                                }
                                                : {
                                                    TextDecoration: "none",
                                                };
                                        }, children: [_jsx(ShoppingCartOutlinedIcon, {}), " Cart"] }) }), _jsx("li", { className: "nav-list-items", children: _jsxs(NavLink, { className: `link-a font-semibold`, to: NavigateToRoute.ORDERED_FOODS, onClick: toggleHam, style: ({ isActive }) => {
                                            return isActive
                                                ? {
                                                    backgroundColor: "#E1701A",
                                                    color: "white",
                                                    TextDecoration: "none",
                                                }
                                                : {
                                                    TextDecoration: "none",
                                                };
                                        }, children: [_jsx(ReceiptLongIcon, {}), " Orders"] }) })] })), _jsx("li", { className: "nav-list-items self-center", children: _jsxs("div", { className: "text-lg font-semibold bg-slate-300 px-4 py-2 rounded-full mx-2", children: [_jsx(AccountCircleOutlinedIcon, { style: { marginBottom: "2px" } }), " ", role === "deliveryPerson"
                                        ? currentDeliveryPerson?.username?.name
                                        : currentUser?.name] }) }), _jsx("li", { className: "md:hidden", children: _jsx("button", { className: "btn-theme my-3", onClick: logOut, children: "Logout" }) })] }), _jsx("div", { className: "hidden md:flex", children: _jsxs("button", { className: "btn-theme-outlined", onClick: logOut, children: [_jsx(LogoutOutlinedIcon, {}), " Logout"] }) }), _jsxs("div", { ref: HamBurger, className: "hamburger ms-auto", onClick: toggleHam, children: [_jsx("hr", { className: "slice" }), _jsx("hr", { className: "slice" }), _jsx("hr", { className: "slice" })] })] }) }));
}
export default LoggedInNav;
