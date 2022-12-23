import { useEffect, useState } from "react";
import NavItem from "./components/NavItem/NavItem";
import NavItemModal from "./components/NavItemModal/NavItemModal";
import Time from "./components/Time/Time";
import { navItems } from "./constants/navItems";

import styles from "./HomePage.module.scss";
import { NavItemInterface } from "./models/navItem";

function HomePage() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
    Partial<NavItemInterface> | undefined
  >();

  useEffect(() => {}, [editMode]);

  const addNav = () => {
    var elm = document.getElementById("nav-item-modal");
    if (elm) {
      elm.click();
    }
  };

  const triggerUpsert = () => {};
  const handleChange = () => {};
  const editItem = (id: string) => {};
  const deleteItem = (id: string) => {};

  return (
    <div className="h-full">
      <div className="LinkTopContainer">
        {openModal}
        <div className="cursor-pointer" onClick={() => setEditMode(!editMode)}>
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
            <h1 className={`${styles.HeaderText} pt-12 lg:pt-16 xl:pt-20`}>
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
          {navItems.map((navItem, index) => (
            <NavItem
              editMode={editMode}
              key={index}
              action={()=>{}} editItem={()=>{}} deleteItem={()=>{}}
              item={navItem}
            />
          ))}
          {editMode ? (
            <NavItem editMode={false} item={{icon:"plus", id:'-1'}} action={addNav} editItem={()=>{}} deleteItem={()=>{}}/>
          ) : (
            <></>
          )}
        </div>
      </div>

      <input type="checkbox" id="nav-item-modal" className="modal-toggle" />
      <NavItemModal
        selectedItem={selectedItem}
        handleChange={handleChange}
        triggerUpsert={triggerUpsert}
      />
    </div>
  );
}

export default HomePage;
