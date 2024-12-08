import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TokenValidation } from "../../utils/utils";
import { Navigate } from "react-router";
import { NavigateToRoute } from "../../types/enums";
function PHNavigation() {
    const tokenValidation = TokenValidation();
    // const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [!tokenValidation.isExpired && tokenValidation.role === "customer" && (_jsx(Navigate, { to: `/${NavigateToRoute.FOOD}` })), !tokenValidation.isExpired &&
                tokenValidation.role === "deliveryPerson" && (_jsx(Navigate, { to: `/staff/${NavigateToRoute.DELIVERY_ORDERS}` })), !tokenValidation.isExpired && tokenValidation.role === "admin" && (_jsx(Navigate, { to: "/admin/" + NavigateToRoute.ADD_DELIVERY_STAFF })), !tokenValidation.isExpired && tokenValidation.role === "restaurant" && (_jsx(Navigate, { to: "/outlet/" + NavigateToRoute.ADD_DELIVERY_STAFF }))] }));
}
export default PHNavigation;
