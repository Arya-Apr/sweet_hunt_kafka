import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/prefer-as-const */
import { Backdrop, Fade, Modal, Typography } from "@mui/material";
function PHModal(props) {
    return (_jsx(_Fragment, { children: _jsx(Modal, { open: props.isOpen, onClose: props.onClose, closeAfterTransition: true, slots: { backdrop: Backdrop }, slotProps: {
                backdrop: {
                    timeout: 500,
                },
            }, children: _jsx(Fade, { in: props.isOpen, children: _jsxs("div", { className: `p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-lg bg-white ${!props.style?.width && "container"}`, style: props.style, children: [_jsx(Typography, { variant: "h5", component: "h2", style: { marginBottom: "1rem" }, children: props.headingText }), props.contentText && (_jsx(Typography, { sx: { mt: 2 }, children: props.contentText })), props.component && props.component] }) }) }) }));
}
export default PHModal;
