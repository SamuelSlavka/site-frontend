import React, { FC } from "react";
import styles from "./NavItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { NavItemProps } from "../../models/navItem";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { NavItemActions } from "../../enums/nav-item-actions.enum";

const NavItem: FC<NavItemProps> = (props) => {
    library.add(fas, far);
    const navigate = useNavigate();
    const redirect = (props: NavItemProps) => {
        if (!props.editMode) {
            if (props.item.route) {
                window.location.href = props.item.route;
            } else if (props.item.link) {
                navigate(props.item.link);
            } else if (props.action) {
                props.action(NavItemActions.ADD);
            }
        }
    };

    return (
        <div className="relative m-2 md:m-4 lg:m-6 self-center rounded overflow-hidden shadow-lg hover:ring-2 ring-light transition-all ease-in-out duration-300">
            <button
                style={{ backgroundColor: props.item.bg }}
                onClick={() => redirect(props)}
                className={`${styles.card} ${
                    props.editMode ? "cursor-default" : "cursor-pointer"
                } text-2xl p-2 md:p-4rounded relative`}
                data-testid="NavItem"
            >
                <div className="p-2 md:p-4 lg:px-6 lg:py-4">
                    <FontAwesomeIcon
                        icon={["fas", props.item.icon as IconName]}
                    />
                    {props.item.name ? (
                        <span className="px-4"> {props.item.name} </span>
                    ) : (
                        <></>
                    )}
                </div>
            </button>
            {props.editMode ? (
                <>
                    <div className="inline absolute top-0 right-0 z-10 cursor-pointer">
                        <FontAwesomeIcon
                            onClick={() =>
                                props.action(NavItemActions.EDIT, props.item.id)
                            }
                            className="text-base mr-2 hover:text-light transition-all ease-in-out duration-200"
                            icon={["fas", "pen-to-square"]}
                        />
                    </div>
                    <div className="inline absolute top-0 right-8  z-10 cursor-pointer">
                        <FontAwesomeIcon
                            onClick={() =>
                                props.action(
                                    NavItemActions.DELETE,
                                    props.item.id
                                )
                            }
                            className="text-base ml-2 hover:text-light transition-all ease-in-out duration-200"
                            icon={["fas", "minus"]}
                        />
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default NavItem;
