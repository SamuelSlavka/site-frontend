import React, { FC, useEffect, useState } from "react";
import { BackgroundColors } from "../../enums/background-colors.enum";
import { Icons } from "../../enums/icons.enum";
import { NavItemInterface } from "../../models/navItem";


interface NavItemModalProps {
    selectedItem: Partial<NavItemInterface> | undefined;
    triggerUpsert: (params: any) => any;
}

const NavItemModal: FC<NavItemModalProps> = (props) => {

    const [selectedItem, setSelectedItem] = useState<Partial<NavItemInterface> | undefined>();
    const handleChange =  (e: any) => setSelectedItem(prevItem =>  ({...prevItem, [e.target.name]: e.target.value}));

    useEffect(() => {
        setSelectedItem(props.selectedItem);
    }, [props.selectedItem]);

    return (
        <label
            data-testid="NavItemModal"
            htmlFor="nav-item-modal"
            className="modal cursor-pointer"
        >
            <label className="modal-box relative grid">
                <div className="row">
                    <h3 className="text-md font-bold ">
                        {selectedItem?.id ? "Edit item" : "Create item"}
                    </h3>
                </div>

                <div className="row">
                    <label className="label">
                        <span className="label-text text-white">name</span>
                    </label>
                    <input
                        className="input input-bordered w-full inputField"
                        type="text"
                        name="name"
                        value={selectedItem?.name || ''}
                        onChange={handleChange}
                        placeholder="name"
                        required
                    />
                </div>

                <div className="row">
                    <label className="label">
                        <span className="label-text text-white">link</span>
                    </label>
                    <input
                        className="input input-bordered w-full inputField"
                        type="text"
                        name="link"
                        value={selectedItem?.link || ''}
                        onChange={handleChange}
                        placeholder="https://placeholder.net"
                        required
                    />
                </div>

                <div className="row">
                    <label className="label">
                        <span className="label-text text-white">
                            background color
                        </span>
                    </label>
                    <select name="bg" value={selectedItem?.bg} onChange={handleChange} className="select select-bordered w-full">
                        <option key={'0'} value=''>No background color</option>
                        {Object.values(BackgroundColors).map((color) => (
                            <option key={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <label className="label">
                        <span className="label-text text-white">icon</span>
                    </label>
                    <select name="icon" value={selectedItem?.icon} onChange={handleChange} className="select select-bordered w-full">
                        <option key={'0'} value=''>No icon</option>
                        {Object.values(Icons).map((icon) => (
                            <option key={icon}>{icon}</option>
                        ))}
                    </select>
                </div>

                <div className="row mt-3">
                    <label
                        htmlFor="edit-modal"
                        className="btn btn-primary float-right"
                        onClick={() => props.triggerUpsert(selectedItem)}
                    >
                        Save
                    </label>
                </div>
            </label>
        </label>
    );
};

export default NavItemModal;
