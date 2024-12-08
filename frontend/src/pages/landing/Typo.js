import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
const pronouns = ["Delicious", "Tasty", "Sugary", "Buttery", "Creamy"];
function Typo() {
    // const {
    //   register,
    //   handleSubmit,
    //   formState: { errors },
    // } = useForm();
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef();
    // const submitForm = (data: any) => {
    //   console.log(data);
    // };
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => {
                return prev === pronouns.length - 1 ? 0 : prev + 1;
            });
        }, 4500);
        return () => {
            resetTimeout();
        };
    }, [index]);
    return (_jsx("div", { className: "absolute top-24 md:top-[90px] lg:top-[150px] lg:translate-x-[10%] xl:translate-x-[15%] 2xl:translate-x-[25%] home-section container mx-auto p-3 min-h-[500px] lg:min-h-[650px] overflow-hidden select-none", children: _jsx("div", { className: "w-[80%] mx-auto px-0 md:px-6", children: _jsx("div", { className: "landing-head text-4xl md:text-6xl lg:text-7xl text-white w-[300px] md:w-[500px] lg:w-[700px] mb-6", children: _jsxs("b", { children: ["Feeling ", _jsx("span", { className: "text-ph-primary-soft", children: " a craving for something sweet!" }), " Let's", _jsx("span", { className: "text-ph-primary-soft", children: "\u00A0order " }), _jsxs("span", { children: ["something ", _jsx("br", {})] }), _jsx("span", { className: "relative", children: pronouns.map((item, i) => {
                                return (_jsx("span", { className: "text-ph-primary-soft transition-all duration-500 ease-in absolute w-fit", style: { opacity: index === i ? "1" : "0" }, children: item }, i));
                            }) }), _jsx("span", { className: "mb-6", style: { opacity: 0 }, children: "Delicious" })] }) }) }) }));
}
export default Typo;
