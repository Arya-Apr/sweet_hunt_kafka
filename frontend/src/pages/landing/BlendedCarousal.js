import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
const images = [
    `bg-[url('./src/assets/Sweet1.jpg')]`,
    `bg-[url('./src/assets/Sweet2.jpg')]`,
    `bg-[url('./src/assets/Sweet3.jpg')]`,
];
function BlendedCarousal() {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef();
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => {
                return prev === images.length - 1 ? 0 : prev + 1;
            });
        }, 8000);
        return () => {
            resetTimeout();
        };
    }, [index]);
    return (_jsxs("div", { className: "absolute top-0 carousel -z-10", children: [images.map((item, i) => {
                return (_jsx("div", { className: `carousal-slide ${item}`, style: { opacity: index === i ? "1" : "0" } }, i));
            }), _jsx("div", { className: "absoulte top-0 bg-[rgba(0,0,0,.6)] w-full min-h-[350px] md:min-h-[400px] lg:min-h-[500px] mix-blend-darken" })] }));
}
export default BlendedCarousal;
