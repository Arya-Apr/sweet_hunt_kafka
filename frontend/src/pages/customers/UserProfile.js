import { jsx as _jsx } from "react/jsx-runtime";
import { setProgress } from "../../features/slices/loadingSlice";
import { useDispatch } from "react-redux";
function UserProfile() {
    const dispatch = useDispatch();
    setTimeout(() => {
        dispatch(setProgress(50));
    }, 3000);
    return _jsx("div", { children: "UserProfile" });
}
export default UserProfile;
