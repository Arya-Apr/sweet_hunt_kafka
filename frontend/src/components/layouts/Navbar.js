import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoginForm from "../custom/Forms/LoginForm";
import PHModal from "../custom/Modals/PHModal";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
function Navbar() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((store) => store.modal);
    return (_jsxs("nav", { className: "navbar py-0", children: [_jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "flex justify-between w-full lg:w-1/2 mx-auto", style: {
                        height: "150px",
                    }, children: [_jsx("div", { className: "self-center", children: _jsx("img", { src: "./src/assets/SweetLogo2.svg", style: { height: "150px" }, alt: "no svg found" }) }), _jsx("div", { className: "self-center", style: {
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "end",
                            }, children: _jsx(Button, { variant: "outlined", style: {
                                    backgroundColor: "#e1701a",
                                    color: "white",
                                    borderColor: "#e1701a",
                                    borderRadius: "1rem",
                                    padding: "8px 20px",
                                    textTransform: "none",
                                    cursor: "pointer",
                                    margin: "0px 4px",
                                }, onClick: () => {
                                    dispatch(openModal());
                                }, startIcon: _jsx(LoginIcon, {}), children: "Login" }) })] }) }), _jsx(PHModal, { isOpen: isOpen, style: { width: "380px" }, headingText: "Login", onClose: () => {
                    dispatch(closeModal());
                }, component: _jsx(LoginForm, {}) })] }));
}
export default Navbar;
