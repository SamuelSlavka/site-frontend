export interface NavItemProps {
    item: NavItemInterface;
    editMode: boolean;
    action: () => any;
    editItem: (id: string) => any;
    deleteItem: (id: string) => any;
}


export interface NavItemInterface {
    name?: string;
    route?: string;
    link?: string;
    bg?: string;
    icon: string;
    id: string;
}
