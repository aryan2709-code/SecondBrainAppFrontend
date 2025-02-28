import { ReactElement } from "react";

export function SidebarItem({itemsType , setItemsType ,text , icon} : {
    text : string;
    icon : ReactElement;
    itemsType : any;
    setItemsType : any;
}) {
    return <div onClick={() => {setItemsType(itemsType)}} className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded w-40 pl-4 transition-all duration-500">
        <div className="pr-2">{icon}</div>
        <div>{text}</div>
    </div>
}