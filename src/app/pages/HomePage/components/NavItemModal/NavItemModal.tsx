import React, { FC } from "react";
import { NavItemInterface } from "../../models/navItem";

interface NavItemModalProps {
  selectedItem: Partial<NavItemInterface> | undefined;
  handleChange: (params: any) => any;
  triggerUpsert: (params: any) => any;
}

const NavItemModal: FC<NavItemModalProps> = (props) => {
  return (
    <label
      data-testid="NavItemModal"
      htmlFor="nav-item-modal"
      className="modal cursor-pointer"
    >
      <label className="modal-box relative">
        <h3 className="text-md font-bold"> {props.selectedItem?.name}</h3>

        <label className="label">
          <span className="label-text text-white">name</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs inputField"
          type="text"
          name="name"
          value={props.selectedItem?.name || ""}
          onChange={props.handleChange}
          placeholder="name"
          required
        />
        <label className="label">
          <span className="label-text text-white">link</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs inputField"
          type="text"
          name="link"
          value={props.selectedItem?.link || ""}
          onChange={props.handleChange}
          placeholder="https://placeholder.net"
          required
        />
        <label
          htmlFor="edit-modal"
          className="btn btn-primary float-right"
          onClick={() => props.triggerUpsert(props.selectedItem)}
        >
          Save
        </label>
      </label>
    </label>
  );
};

export default NavItemModal;
