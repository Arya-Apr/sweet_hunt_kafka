import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import LoggedInNav from "../layouts/LoggedInNav";
import { Navigate, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../features/slices/loadingSlice";
import { TokenValidation } from "../../utils/utils";
import { NavigateToRoute } from "../../types/enums";
function ProtectedRoute() {
    const { progress } = useSelector((store) => store.topLoading);
    const dispatch = useDispatch();
    const tokenValid = TokenValidation();
    return (_jsxs(_Fragment, { children: [_jsx(LoadingBar, { color: "#E1701A", progress: progress, height: 4, shadow: true, onLoaderFinished: () => {
                    dispatch(setProgress(100));
                } }), tokenValid.isExpired ? (_jsx(Navigate, { to: NavigateToRoute.HOME })) : (_jsxs(_Fragment, { children: [_jsx(LoggedInNav, {}), _jsx(Outlet, {})] }))] }));
}
export default ProtectedRoute;
