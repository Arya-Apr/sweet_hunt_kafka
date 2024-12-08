import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import OutletForm from "../../components/custom/Forms/OutletForm";
import PHModal from "../../components/custom/Modals/PHModal";
import PHDataTable from "../../components/custom/DataTables/PHDataTable";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints, ConstantValues, Roles } from "../../types/enums";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
const OutletManager = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
    const dispatch = useDispatch();
    const [isAdd, setisAdd] = useState(false);
    const [isUpdate, setisUpdate] = useState(false);
    const { isOpen } = useSelector((store) => {
        return store.modal;
    });
    const [outlets, setOutlets] = useState([]);
    const [outletupdate, setOutletupdate] = useState({});
    const columns = [
        { key: "address", value: "ADDRESS" },
        { key: "id", value: "ID" },
        { key: "latitude", value: "LATITUDE" },
        { key: "longitude", value: "LONGITUDE" },
        { key: "name", value: "NAME" },
        { key: "phoneNo", value: "PHONE" },
        { key: "pincode", value: "PINCODE" },
    ];
    const UpdateHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.UPDATE_OUTLET, "POST");
    const DisplayHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_OUTLETS, "GET");
    const DataAddHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.ADD_OUTLET, "POST");
    const RegisterHook = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.USER_REGISTER, "POST");
    const DeleteHook = useFetch(import.meta.env.VITE_CUSTOMER_SERVICE_URI + ApiEndpoints.DELETE_OUTLET, "DELETE");
    useEffect(() => {
        console.log("Data fetchs");
        setLatestOutletData();
    }, []);
    const setLatestOutletData = () => {
        DisplayHook.MakeHttpRequest().then((result) => {
            if (result.result) {
                const data = result.result.map((ot) => {
                    console.log(ot);
                    ot.pincode = ot.pincode.pincode;
                    return ot;
                });
                setOutlets(data);
            }
        });
    };
    const handleAddOutlet = async (outlet) => {
        console.log(outlet);
        outlet.pincode = parseInt(outlet.pincode.toString());
        DataAddHook.setPayload(outlet);
        DataAddHook.MakeHttpRequest().then((result) => {
            console.log(result);
            if (result.error || result.result.status == 0) {
                Toast.fire({
                    title: "Error in inserting data !",
                    icon: "error",
                });
            }
            else {
                Toast.fire({
                    icon: "success",
                    title: "Data Inserted !",
                });
                setisAdd(false);
                setLatestOutletData();
                dispatch(closeModal());
            }
        });
        RegisterHook.setPayload({
            name: outlet.name,
            username: outlet.username,
            email: outlet.email,
            password: outlet.password,
            phone_no: outlet.phoneNo.toString(),
            credits: ConstantValues.INIT_CREDIT,
            role: Roles.RESTAURANT,
        });
        try {
            const result = await RegisterHook.MakeHttpRequest();
            if (result.error === null) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been successfully registered",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            else {
                Swal.fire({
                    title: "Oops! unable to register you",
                    text: "You may already created an account",
                    icon: "error",
                });
            }
        }
        catch (ex) {
            Swal.fire({
                title: "Oops! unable to register you",
                text: "Service is not available, try after few minutes",
                icon: "error",
            });
        }
    };
    const handleEditOutlet = (outlet) => {
        setOutletupdate(outlet);
        setisUpdate(true);
        dispatch(openModal());
    };
    const handleUpdate = (outlet) => {
        outlet.pincode = parseInt(outlet.pincode.toString());
        outlet.latitude = outlet.latitude.toString();
        outlet.longitude = outlet.longitude.toString();
        outlet.phoneNo = outlet.phoneNo.toString();
        UpdateHook.setPayload(outlet);
        UpdateHook.MakeHttpRequest(outlet.id).then((result) => {
            if (result.error || result.result.status == 0) {
                Toast.fire({
                    title: "Error in updating data !",
                    icon: "error",
                });
            }
            else {
                setLatestOutletData();
                dispatch(closeModal());
                setisUpdate(false);
                Toast.fire({
                    icon: "success",
                    title: "Data updated !",
                });
            }
        });
    };
    const handleDeleteOutlet = (id) => {
        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };
        fetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
            ApiEndpoints.DELETE_OUTLET +
            id, {
            method: "DELETE",
            headers: headersList,
        }).then((result) => {
            result.json().then((res) => {
                if (res.status == 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Data Deleted!!",
                    });
                    setLatestOutletData();
                }
                else {
                    Toast.fire({
                        icon: "error",
                        title: "Internal Error!!",
                    });
                }
            });
        });
        // let data = await response.json();
        // console.log(data)
        // if (data.status == 200) {
        //   Toast.fire({
        //     icon: "success",
        //     title: "Data Deleted!!",
        //   });
        //  setLatestOutletData();
        // } else {
        //   Toast.fire({
        //     icon: "error",
        //     title: "Internal Error!!",
        //   });
        // }
    };
    return (_jsxs("div", { className: "container px-4 py-10", children: [_jsx("div", { className: "flex justify-between flex-wrap", children: _jsxs("button", { className: "btn-theme flex gap-2", onClick: () => {
                        setisAdd(true);
                        dispatch(openModal());
                    }, children: [_jsx(AddIcon, {}), "Add New Outlet"] }) }), isAdd && (_jsx(PHModal, { isOpen: isOpen, onClose: () => {
                    setisAdd(false);
                    dispatch(closeModal());
                }, headingText: "Add Outlet", style: { width: 400, height: 700, overflow: "auto" }, component: _jsx(OutletForm, { isUpdating: false, update: null, onAdd: handleAddOutlet, action: "Add Outlet" }) })), _jsx(PHDataTable, { title: "Outlets", data: outlets, cols: columns, onDelete: handleDeleteOutlet, onUpdate: handleEditOutlet }), isUpdate && (_jsx(PHModal, { isOpen: isOpen, onClose: () => {
                    setisUpdate(false);
                    dispatch(closeModal());
                }, headingText: "Update Outlet", component: _jsx(OutletForm, { onAdd: handleUpdate, isUpdating: true, update: outletupdate, action: "Update Outlet" }) }))] }));
};
export default OutletManager;
