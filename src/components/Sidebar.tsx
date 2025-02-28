import { useNavigate } from "react-router-dom";
import { AllIcon } from "../icons/Allicon";
import { Logo } from "../icons/logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { SidebarItem } from "./Sidebaritem";



export function Sidebar({setItemsType} : any) {
    const navigate = useNavigate();
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 border-2 pl-6">
        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
            <Logo />
            </div>
          Brainly
        </div>
    <div className="pt-4 ">
     <SidebarItem itemsType = "twitter"  setItemsType = {setItemsType}  text = "Twitter" icon = {<TwitterIcon />} />
     <SidebarItem  itemsType = "youtube" setItemsType = {setItemsType}   text = "Youtube" icon = {<YoutubeIcon />} />
     <SidebarItem   itemsType = "all"  setItemsType = {setItemsType} text = "All Items" icon = {<AllIcon />} />

    </div>
    <div className="fixed bottom-2">
        <Button variant="primary" text = "Log Out" onClick={() => {
            localStorage.removeItem("token")
            navigate("/signin")
        }} />
    </div>
    </div>
}