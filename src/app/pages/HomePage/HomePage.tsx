import { useState } from "react";
import NavItem from "./components/NavItem/NavItem";
import NavItemModal from "./components/NavItemModal/NavItemModal";
import Time from "./components/Time/Time";
import { navItems } from "./constants/navItems";
import { NavItemActions } from "./enums/nav-item-actions.enum";

import styles from "./HomePage.module.scss";
import { NavItemInterface } from "./models/navItem";

function HomePage() {
    const [items, setItems] = useState<NavItemInterface[]>(navItems);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<
        Partial<NavItemInterface> | undefined
    >({});

    const triggerUpsert = (newItem: NavItemInterface) => {
        if (newItem.id) {
            const oldItems = items;
            const oldItem = items.findIndex((item) => item.id === newItem.id);
            oldItems[oldItem] = newItem;
            setItems(oldItems);
        } else {
            setItems((items) => [
                ...items,
                { ...newItem, id: (items.length + Math.floor(Math.random() * 10000)).toString() },
            ]);
        }
        setSelectedItem({});
        console.log(newItem);
    };

    const handleAction = (type: NavItemActions, id?: string) => {
        setSelectedItem({});
        switch (type) {
            case NavItemActions.ADD:
                document.getElementById("nav-item-modal")?.click();
                break;
            case NavItemActions.EDIT:
                const selectedItem = items.find((item) => item.id === id);
                setSelectedItem(selectedItem);
                document.getElementById("nav-item-modal")?.click();
                break;
            case NavItemActions.DELETE:
                setItems(items.filter((item) => item.id !== id));
                break;
        }
    };

    return (
        <div className="h-full">
            <div className="LinkTopContainer">
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setEditMode(!editMode);
                    }}
                >
                    <span className="LinkTop pr-2">
                        {editMode ? "stop editing" : "edit navs"}
                    </span>
                </div>
                <a href="https://gitlab.com/SamuelSlavka/site">
                    <span className="LinkTop">{"git repo"}</span>
                </a>
            </div>
            <div className="flex flex-col sm:flex-row HideScrollbars relative min-w-full min-h-fit h-full object-cover sm:overflow-visible overflow-auto">
                <div data-testid="HomePage">
                    <div className="text-white h-fit HideScrollbars">
                        <h1
                            className={`${styles.HeaderText} pt-12 lg:pt-16 xl:pt-20`}
                        >
                            {"Hello there"}
                        </h1>
                    </div>
                    <div className="hidden sm:block">
                        <Time />
                    </div>
                </div>
                <div
                    className={`max-h-fit sm:max-h-screen overflow-visible sm:overflow-auto w-full h-fit flex flex-wrap justify-center pt-2 sm:pt-12 lg:pt-16 xl:pt-18 pb-4 pr-4`}
                >
                    {items.map((navItem, index) => (
                        <NavItem
                            editMode={editMode}
                            key={index}
                            action={handleAction}
                            item={navItem}
                        />
                    ))}
                    {editMode ? (
                        <NavItem
                            editMode={false}
                            key="-1"
                            item={{ icon: "plus", id: "-1" }}
                            action={handleAction}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <input
                type="checkbox"
                id="nav-item-modal"
                className="modal-toggle"
            />
            <NavItemModal
                selectedItem={selectedItem}
                triggerUpsert={triggerUpsert}
            />
        </div>
    );
}

export default HomePage;
