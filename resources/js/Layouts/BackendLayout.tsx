import {ReactNode, useState} from 'react'
import {Button} from "@/shadcn-ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/shadcn-ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/shadcn-ui/sheet"
import {
    BarChart,
    FileText, Image,
    LayoutGrid,
    LogOut,
    Menu,
    MessageCircle,
    NotebookText,
    PackageOpen, Percent,
    ShoppingBasket,
    Speech,
    User,
    Users
} from 'lucide-react'
import {Link, router, usePage} from '@inertiajs/react'

export default function BackendLayout({children, pageName = 'Page'}: { children: ReactNode, pageName?: string }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const {props: {user}} = usePage()

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const SidebarContent = () => <nav>
        <Link href="/" className="text-2xl font-bold mb-8 block">Tecnoshop Backend</Link>
        <ul className="space-y-2 border-none">
            <li>
                <Link href={route('mantenimiento.dashboard')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <BarChart size={20}/>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link href={route('mantenimiento.orders.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <ShoppingBasket size={20}/>
                    <span>Ordenes</span>
                </Link>
            </li>
            <li>
                <Link href={route('mantenimiento.products.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <FileText size={20}/>
                    <span>Productos</span>
                </Link>
            </li>

            <li>
                <Link href={route('mantenimiento.users.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <Users size={20}/>
                    <span>Usuarios</span>

                </Link>
            </li>
            {/*<li>*/}
            {/*    <Link href={route('mantenimiento.stock.index')}*/}
            {/*          className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">*/}
            {/*        <PackageOpen size={20}/>*/}
            {/*        <span>Stock</span>*/}

            {/*    </Link>*/}
            {/*</li>*/}
            <li>
                <Link href={route('mantenimiento.category.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <NotebookText size={20}/>
                    <span>Categorias</span>

                </Link>
            </li>
            <li>
                <Link href={route('mantenimiento.review.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <MessageCircle size={20}/>
                    <span>Reseñas</span>

                </Link>
            </li>
            <li>
                <Link href={route('mantenimiento.advertising.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <Speech size={20}/>
                    <span>Publicidad</span>

                </Link>
            </li>
            <li>
                <Link href={route('mantenimiento.banner.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <Image size={20} />
                    <span>Banners</span>

                </Link>
            </li><li>
                <Link href={route('mantenimiento.discount.index')}
                      className="flex items-center space-x-2 p-2 hover:bg-[#2A3D47] rounded">
                    <Percent size={20} />
                    <span>Descuentos</span>

                </Link>
            </li>
        </ul>
    </nav>

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for larger screens */}
            <aside className="bg-[#1A2D37] text-white w-64 min-h-screen p-4 hidden md:block">
                <SidebarContent/>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu size={24}/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 bg-[#1A2D37] text-white p-4">
                                <SidebarContent/>
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center space-x-4 ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="" alt="User Avatar"/>
                                            <AvatarFallback>{user?.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => router.visit(route('backend.dashboard'))}>
                                        <LayoutGrid className="mr-2 h-4 w-4"/>
                                        <span>Dashboard</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.visit(route('profile.edit'))}>
                                        <User className="mr-2 h-4 w-4"/>
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                                        <LogOut className="mr-2 h-4 w-4"/>
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h1 className="text-3xl font-semibold mb-6">{pageName}</h1>

                    {children}
                </main>
            </div>
        </div>
    )
}