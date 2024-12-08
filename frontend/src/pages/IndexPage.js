import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../components/layouts/Navbar";
import BlendedCarousal from "./landing/BlendedCarousal";
import Typo from "./landing/Typo";
import FeatureCards from "./landing/FeatureCards";
import PHNavigation from "../components/custom/PHNavigation";
// import LoggedInNav from "../components/layouts/LoggedInNav";
function IndexPage() {
    return (_jsxs(_Fragment, { children: [_jsx(PHNavigation, {}), _jsx(Navbar, {}), _jsx(BlendedCarousal, {}), _jsx(Typo, {}), _jsx(FeatureCards, {})] }));
}
export default IndexPage;
