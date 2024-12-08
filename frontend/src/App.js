import { jsx as _jsx } from "react/jsx-runtime";
import RouterMain from "./components/routes/RouterMain";
import { store } from "./features/store";
import "./styles/style.css";
import { Provider } from "react-redux";
function App() {
    return (_jsx(Provider, { store: store, children: _jsx(RouterMain, {}) }));
}
export default App;
