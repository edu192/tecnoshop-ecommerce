import React from 'react';
import {Link, router, usePage} from "@inertiajs/react";
import {Button} from "@/shadcn-ui/button";
import {Input} from "@/shadcn-ui/input";
import {Bell, ChevronDown, Menu, Search, ShoppingCart, Trash2, UserIcon} from "lucide-react";
import {useCartStore} from "@/store/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {Sheet, SheetContent, SheetTrigger} from "@/shadcn-ui/sheet";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/shadcn-ui/accordion";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    lastname: string | null;
    type: string;
    created_at: string;
    updated_at: string;
}

function FrontendNavbar() {
    const user: User | null = usePage().props.auth.user ?? null;
    const {
        items: cartItems,
        searchInput,
        setSearchInput,
        selectedBrand,
        removeProduct,
        clearProduct,
        total,
        quantity
    } = useCartStore();

    const submitSearch = (e) => {
        e.preventDefault();
        router.post(route('product.search', {
            search: searchInput,
            brand: selectedBrand,
        }));
    };

    const categories = [
        {
            id: 1, name: "Smartphones",
        },
        {
            id: 2, name: "Laptops",
        },
        {
            id: 3, name: "Televisores",
        },
        {
            id: 4, name: "Cámaras",
        },
    ];

    return (
        <header className="bg-white shadow">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        Tecnoshop
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                Categorías <ChevronDown className="ml-1 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {categories.map((category) => (
                                <DropdownMenuItem key={category.id}
                                                  onClick={() => router.visit(route('category.index', category.id))}>{category.name}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
                    <form className="w-full max-w-lg" onSubmit={submitSearch}>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input type="search" placeholder="Buscar productos..." className="pl-8" value={searchInput}
                                   onChange={(e) => setSearchInput(e.target.value)}/>
                        </div>
                    </form>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className='relative'>
                                <ShoppingCart className="h-5 w-5"/>
                                <span className="sr-only">Carrito</span>
                                {quantity > 0 &&
                                    <span
                                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center p-3 justify-center text-xs'>
                        {quantity}
                    </span>
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Tu Carrito</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {cartItems.length > 0 ? (
                                <>
                                    {cartItems.map((item) => (
                                        <DropdownMenuItem key={item.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <Button variant="ghost" size="icon" onClick={() => removeProduct(item)}>
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <div className="flex justify-between w-full">
                                            <span className="font-bold">Total:</span>
                                            <span>S/. {total.toFixed(2)}</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button className="w-full" onClick={()=>router.visit(route('checkout'))}>Pagar</Button>
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem>Tu carrito está vacío</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Bell className="h-5 w-5"/>
                                        <span className="sr-only">Notificaciones</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>Nuevo producto disponible</DropdownMenuItem>
                                    <DropdownMenuItem>Tu pedido ha sido enviado</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <UserIcon className="h-5 w-5"/>
                                        <span className="sr-only">Perfil de usuario</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem
                                        onClick={() => router.visit(route('dashboard'))}>Dashboard</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => router.visit(route('profile.edit'))}>Perfil</DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>router.visit(route('profile.orders'))}>Pedidos</DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={() => router.post(route('logout'))}>Cerrar sesión</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={() => router.visit(route('login'))}>Iniciar sesión</Button>
                            <Button onClick={() => router.visit(route('register'))}>Registrarse</Button>
                        </>
                    )}
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="flex flex-col space-y-4">
                            <form className="mb-4" onSubmit={submitSearch}>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input type="search" placeholder="Buscar productos..." className="pl-8"
                                           value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                                </div>
                            </form>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="categories">
                                    <AccordionTrigger>Categorías</AccordionTrigger>
                                    <AccordionContent>
                                        {categories.map((category) => (
                                            <Link key={category.id} href={`/category/${category.id}`}
                                                  className="block py-2">
                                                {category.name}
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="cart">
                                    <AccordionTrigger>Carrito</AccordionTrigger>
                                    <AccordionContent>
                                        {cartItems.length === 0 ? (
                                            <p>Tu carrito está vacío</p>
                                        ) : (
                                            <>
                                                {cartItems.map((item) => (
                                                    <div key={item.id}
                                                         className="flex justify-between items-center py-2">
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                                                        </div>
                                                        <Button variant="ghost" size="icon"
                                                                onClick={() => clearProduct(item.id)}>
                                                            <Trash2 className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                ))}
                                                <div className="mt-4">
                                                    <div className="flex justify-between">
                                                        <span className="font-bold">Total:</span>
                                                        <span>S/. {total.toFixed(2)}</span>
                                                    </div>
                                                    <Button className="w-full mt-2">Pagar</Button>
                                                </div>
                                            </>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                                {user && (
                                    <>
                                        <AccordionItem value="notifications">
                                            <AccordionTrigger>Notificaciones</AccordionTrigger>
                                            <AccordionContent>
                                                <p>Nuevo producto disponible</p>
                                                <p>Tu pedido ha sido enviado</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="profile">
                                            <AccordionTrigger>Perfil</AccordionTrigger>
                                            <AccordionContent>
                                                <Link href="/profile" className="block py-2">
                                                    Ver Perfil
                                                </Link>
                                                <Link href="/orders" className="block py-2">
                                                    Pedidos
                                                </Link>
                                                <Link href="/settings" className="block py-2">
                                                    Configuración
                                                </Link>
                                                <Button variant="ghost" className="w-full mt-2">
                                                    Cerrar sesión
                                                </Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </>
                                )}
                            </Accordion>
                            {!user && (
                                <>
                                    <Button variant="ghost">Iniciar sesión</Button>
                                    <Button>Registrarse</Button>
                                </>
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}

export default FrontendNavbar;