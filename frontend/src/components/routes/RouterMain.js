import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IndexPage from "../../pages/IndexPage";
import NotFound from "../../pages/NotFound";
import FoodsHome from "../../pages/foods/FoodsHome";
import ProtectedRoute from "./ProtectedRoute";
import { NavigateToRoute } from "../../types/enums";
import Cart from "../../pages/customers/Cart";
import UserProfile from "../../pages/customers/UserProfile";
import DeliveryStaffManager from "../../pages/admin/DeliveryStaffManager";
import ItemManager from "../../pages/admin/ItemManager";
import OutletManager from "../../pages/admin/OutletManager";
import PlacedOrders from "../../pages/outlets/PlacedOrders";
import PreparedOrders from "../../pages/outlets/PreparedOrders";
import OrderedFoods from "../../pages/foods/OrderedFoods";
import PHNavigation from "../custom/PHNavigation";
import DeliveryHome from "../../pages/delivery/DeliveryHome";
import CompletedOrders from "../../pages/delivery/CompletedOrders";
function RouterMain() {
    return (_jsx(_Fragment, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: NavigateToRoute.HOME, element: _jsx(IndexPage, {}) }), _jsx(Route, { path: NavigateToRoute.NAVIGATION, element: _jsx(PHNavigation, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: NavigateToRoute.FOOD, element: _jsx(FoodsHome, {}) }), _jsx(Route, { path: NavigateToRoute.ORDERED_FOODS, element: _jsx(OrderedFoods, {}) }), _jsx(Route, { path: NavigateToRoute.CART, element: _jsx(Cart, {}) }), _jsx(Route, { path: NavigateToRoute.USER_PROFILE, element: _jsx(UserProfile, {}) })] }), _jsxs(Route, { path: "admin", element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: NavigateToRoute.ADD_DELIVERY_STAFF, element: _jsx(DeliveryStaffManager, {}) }), _jsx(Route, { path: NavigateToRoute.ADD_ITEM, element: _jsx(ItemManager, {}) }), _jsx(Route, { path: NavigateToRoute.ADD_OUTLET, element: _jsx(OutletManager, {}) })] }), _jsxs(Route, { path: "staff", element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: NavigateToRoute.DELIVERY_ORDERS, element: _jsx(DeliveryHome, {}) }), _jsx(Route, { path: NavigateToRoute.DELIVERY_COMPLETED, element: _jsx(CompletedOrders, {}) })] }), _jsxs(Route, { path: "outlet", element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: NavigateToRoute.ADD_DELIVERY_STAFF, element: _jsx(DeliveryStaffManager, {}) }), _jsx(Route, { path: NavigateToRoute.ORDER_P, element: _jsx(PlacedOrders, {}) }), _jsx(Route, { path: NavigateToRoute.ORDER_PRE, element: _jsx(PreparedOrders, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
}
export default RouterMain;
