// import Link from "next/link";
// import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
// import { ModeToggle } from "./ModeToggle";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export default function Navbar() {
//   return (
//     <nav className="border-b">
//       <div className="container mx-auto flex items-center justify-between p-2">
//         <Link href="/dashboard" className="font-bold text-lg">
//           CogniCart
//         </Link>
//         <div className="flex items-center gap-4">
//           <Menubar>
//             <MenubarMenu>
//               <Link href="/dashboard" passHref>
//                 <MenubarTrigger>Dashboard</MenubarTrigger>
//               </Link>
//             </MenubarMenu>
//             <MenubarMenu>
//               <Link href="/products" passHref>
//                 <MenubarTrigger>Products</MenubarTrigger>
//               </Link>
//             </MenubarMenu>
//           </Menubar>
//           <ModeToggle />
//           <Avatar>
//             <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//       </div>
//     </nav>
//   );
// }