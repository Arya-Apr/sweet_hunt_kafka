import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "container", children: _jsx("div", { className: "row", children: _jsx("div", { className: "col-md-12", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("h2", { className: "inline-block mt-16 text-[140px] font-semibold self-center", children: "404" }), _jsx("div", { className: "inline-block self-center text-lg", children: "Page not found" }), _jsx("div", { className: "self-center my-5 btn-main", onClick: () => {
                                navigate(-1);
                            }, children: "Go back" })] }) }) }) }));
}
export default NotFound;
