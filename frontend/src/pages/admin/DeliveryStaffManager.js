import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import PHModal from "../../components/custom/Modals/PHModal";
import { openModal, closeModal } from "../../features/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import PHDataTable from "../../components/custom/DataTables/PHDataTable";
import AddIcon from "@mui/icons-material/Add";
import DeliveryPersonForm from "../../components/custom/Forms/DeliveryPersonForm";
import Swal from "sweetalert2";
import { useFetch } from "../../hooks/useFetch";
import { ApiEndpoints, ConstantValues } from "../../types/enums";
const DeliveryStaffManager = () => {
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
    const [deliveryPersons, setdeliveryPersons] = useState([]);
    const [deliveryPersonUpdate, setdeliveryPersonUpdate] = useState({});
    const UpdateHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.UPDATE_STAFF, "POST");
    const DisplayHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.GET_ALL_STAFF, "GET");
    const DataAddHook = useFetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI + ApiEndpoints.ADD_STAFF, "POST");
    const columns = [
        { key: "id", value: "ID" },
        { key: "outletId", value: "ADHAAR No." },
        { key: "outletId", value: "OUTLET" },
        { key: "username", value: "USERNAME" },
        { key: "name", value: "NAME" },
        { key: "phone_no", value: "PHONE" },
        { key: "email", value: "EMAIL" },
    ];
    useEffect(() => {
        console.log("Data fetchs");
        setLatestStaffData();
    }, []);
    const setLatestStaffData = () => {
        DisplayHook.MakeHttpRequest().then((result) => {
            if (result.result) {
                const data = result.result.map((x) => {
                    const y = {
                        id: x.id,
                        aadharNumber: x.adhaarNumber,
                        outletId: x.outletId.id,
                        username: x.username.username,
                        name: x.username.name,
                        phone_no: x.username.phoneNo,
                        email: x.username.email,
                    };
                    return y;
                });
                setdeliveryPersons(data);
            }
        });
    };
    const handleAddDeliveryPerson = (deliveryPerson) => {
        const tmp = deliveryPerson;
        tmp.phone_no = deliveryPerson.phone_no;
        tmp.aadharNumber = deliveryPerson.aadharNumber;
        tmp.role = "deliveryPerson";
        tmp.credits = ConstantValues.INIT_CREDIT;
        console.log(tmp);
        DataAddHook.setPayload(tmp);
        DataAddHook.MakeHttpRequest().then((result) => {
            console.log(result);
            if (result.result.status == 200) {
                Toast.fire({
                    icon: "success",
                    title: "Data Inserted !",
                });
                dispatch(closeModal());
                setisAdd(false);
                setLatestStaffData();
            }
            else {
                Toast.fire({
                    title: "Error in insering Data !",
                    icon: "error",
                });
            }
        });
    };
    const handleEditdeliveryPerson = (deliveryPerson) => {
        setdeliveryPersonUpdate(deliveryPerson);
        setisUpdate(true);
        dispatch(openModal());
    };
    const handleUpdate = (deliveryPerson) => {
        const tmp = deliveryPerson;
        tmp.phone_no = deliveryPerson.phone_no;
        tmp.aadharNumber = deliveryPerson.aadharNumber;
        tmp.role = "deliveryPerson";
        tmp.credits = ConstantValues.INIT_CREDIT;
        console.log(tmp);
        UpdateHook.setPayload(deliveryPerson);
        UpdateHook.MakeHttpRequest(deliveryPerson.id).then((result) => {
            if (result.error || result.result.status == 0) {
                Toast.fire({
                    title: "Error in updating data !",
                    icon: "error",
                });
            }
            else {
                Toast.fire({
                    title: "Data updated !",
                    icon: "success",
                });
                setLatestStaffData();
                dispatch(closeModal());
                setisUpdate(false);
            }
        });
    };
    const handleDeletedeliveryPerson = async (id) => {
        const headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
        };
        const response = await fetch(import.meta.env.VITE_MANAGEMENT_SERVICE_URI +
            ApiEndpoints.DELETE_STAFF +
            id, {
            method: "DELETE",
            headers: headersList,
        });
        const data = await response.json();
        if (data.error != null || data.status == 0) {
            Toast.fire({
                icon: "error",
                title: "Internal Error!!",
            });
        }
        else {
            Toast.fire({
                icon: "success",
                title: "Data Deleted!!",
            });
        }
        setdeliveryPersons(deliveryPersons.filter((deliveryPerson) => deliveryPerson.id !== id));
    };
    return (_jsxs("div", { className: "container px-4 py-10", children: [_jsx("div", { className: "flex justify-between flex-wrap", children: _jsxs("button", { className: "btn-theme flex gap-2", onClick: () => {
                        setisAdd(true);
                        dispatch(openModal());
                    }, children: [_jsx(AddIcon, {}), " Add delivery person"] }) }), isAdd && (_jsx(PHModal, { isOpen: isOpen, onClose: () => {
                    setisAdd(false);
                    dispatch(closeModal());
                }, headingText: "Add deliveryPerson", component: _jsx(DeliveryPersonForm, { update: null, onEvent: handleAddDeliveryPerson, action: "Add deliveryPerson" }) })), _jsx(PHDataTable, { title: "Delivery Persons", cols: columns, data: deliveryPersons, onDelete: handleDeletedeliveryPerson, onUpdate: handleEditdeliveryPerson }), isUpdate && (_jsx(PHModal, { isOpen: isOpen, onClose: () => {
                    setisUpdate(false);
                    dispatch(closeModal());
                }, headingText: "Update deliveryPerson", component: _jsx(DeliveryPersonForm, { onEvent: handleUpdate, update: deliveryPersonUpdate, action: "Update deliveryPerson" }) }))] }));
};
export default DeliveryStaffManager;
