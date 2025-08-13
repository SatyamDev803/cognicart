import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="container mx-auto flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">CogniCart</span>
                </div>
                <div className="flex items-center gap-4">
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>Dashboard</MenubarTrigger>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Analytics</MenubarTrigger>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Settings</MenubarTrigger>
                        </MenubarMenu>
                    </Menubar>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}