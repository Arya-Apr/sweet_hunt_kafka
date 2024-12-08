import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { nanoid } from "@reduxjs/toolkit";
import PHDisplayImage from "../PHDisplayImage";
function PHDataTable(props) {
    const [list, setList] = useState(props.data.length ? props.data : []);
    const [search, setSearch] = useState("");
    const [isNotFound, setIsNotFound] = useState(false);
    const renderList = (e) => {
        setSearch(e.target.value);
        const newList = list.filter((item) => JSON.stringify(item).toLowerCase().includes(search));
        if (newList.length === 0) {
            setIsNotFound(true);
        }
        else {
            setIsNotFound(false);
        }
        if (newList.length === 0 ||
            e.target.value == null ||
            e.target.value == undefined ||
            (typeof e.target.value === "string" && e.target.value.trim().length === 0)) {
            setList(props.data);
        }
        else {
            setList(newList);
        }
    };
    useEffect(() => {
        if (props.data == null ||
            props.data == undefined ||
            props.data.length == 0) {
            setList([]);
        }
        else {
            setList(props.data);
        }
    }, [props]);
    return (_jsx("div", { className: "mt-4 overflow-x-auto", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("div", { className: "text-3xl font-bold self-center", children: props.title }), _jsx("input", { type: "text", className: "ph-input-text w-[30%] mt-2", placeholder: "Search through table", onChange: renderList, value: search })] }), props.data.length === 0 && (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsx("span", { className: "ms-2", children: "Table has no record" })] })), isNotFound && (_jsxs("div", { className: "text-secondary flex justify-center my-2", children: [_jsx(ErrorOutlineOutlinedIcon, {}), _jsx("span", { className: "ms-2", children: "No record found" })] })), props.data.length > 0 && !isNotFound && (_jsxs("table", { className: "table table-hover", children: [_jsx("thead", { children: _jsx("tr", { children: (props.cols?.length > 0 &&
                                    props.cols.map((item) => {
                                        return (_jsx("th", { scope: "col", children: item.value }, nanoid()));
                                    })) ||
                                    (list.length > 0 &&
                                        Object.keys(list[0]).map((item) => {
                                            return (_jsx("th", { scope: "col", children: item }, nanoid()));
                                        })) }) }), _jsx("tbody", { children: list.map((item) => {
                                return (_jsxs("tr", { children: [Object.keys(item).map((x) => {
                                            return x != "itemImage" ? (_jsx("td", { children: item[x] }, nanoid())) : (_jsx("td", { children: _jsx(PHDisplayImage, { ba: item[x] }) }, nanoid()));
                                        }), props.onUpdate && (_jsx("td", { children: _jsx("button", { className: "btn btn-primary", onClick: () => {
                                                    props.onUpdate(item);
                                                }, children: _jsx(EditIcon, {}) }) })), props.onDelete && (_jsx("td", { children: _jsx("button", { className: "btn btn-danger", onClick: () => {
                                                    props.onDelete(item?.id);
                                                }, children: _jsx(DeleteIcon, {}) }) }))] }, nanoid()));
                            }) })] }))] }) }));
}
export default PHDataTable;
