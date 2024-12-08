import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cardsData = [
    {
        image: "./src/assets/no_min_order.png",
        primaryMotive: "No minimum order",
        secondaryMotive: "Order in for yourself or for your group with no ristrictions on order value",
    },
    {
        image: "./src/assets/status_track.png",
        primaryMotive: "Seamless order status",
        secondaryMotive: "Trace your order seamlessly live with updating status.",
    },
    {
        image: "./src/assets/min_delivery.png",
        primaryMotive: "Faster delivery",
        secondaryMotive: "We promise to deliver your sweets within 30 minutes, so you can enjoy them fresh and delicious!",
    },
];
function FeatureCards() {
    return (_jsx("div", { className: "bg-[#fdfcfd]", children: _jsx("div", { className: "container mt-4", children: _jsx("div", { className: "row", children: cardsData.map((item, index) => {
                    return (_jsx("div", { className: "col-md-4", children: _jsxs("div", { className: "feature-card group", children: [_jsxs("div", { className: "relative motive-image w-fit my-2 mx-auto", children: [_jsx("div", { className: "back-pop" }), _jsx("img", { src: `${item.image}`, alt: "No image", className: "h-[120px]" })] }), _jsxs("div", { className: "motive-slogan", children: [_jsx("div", { className: "motive-slogan-primary font-bold text-xl", children: item.primaryMotive }), _jsx("div", { className: "motive-slogan-secondary mt-2", children: item.secondaryMotive })] })] }) }, index));
                }) }) }) }));
}
export default FeatureCards;
