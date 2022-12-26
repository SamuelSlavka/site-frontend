import { NavItemActions } from "../enums/nav-item-actions.enum";

export interface NavItemProps {
    item: NavItemInterface;
    editMode: boolean;
    action: (type: NavItemActions, id?: string) => any;
    callbackAction?: (id: string) => any;
}


export interface NavItemInterface {
    name?: string;
    route?: string;
    link?: string;
    bg?: string;
    icon: string;
    id: string;
}
