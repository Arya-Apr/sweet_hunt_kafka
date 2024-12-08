import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import FoodItemCard from "../../components/custom/Cards/FoodItemCard";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints } from "../../types/enums";
function FoodsHome() {
    const [foodItems, setFoodItems] = useState([]);
    const { MakeHttpRequest } = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_ITEMS);
    useEffect(() => {
        MakeHttpRequest()
            .then((result) => {
            if (result.result.length > 0) {
                setFoodItems(result.result);
            }
        })
            .catch((ex) => console.log(ex));
    }, []);
    return (_jsx("div", { className: "container mt-2", children: _jsx("div", { className: "row", children: foodItems.map((item) => {
                return (_jsx("div", { className: "col-md-4 col-lg-3", children: _jsx(FoodItemCard, { data: item }) }, item.id));
            }) }) }));
}
export default FoodsHome;
