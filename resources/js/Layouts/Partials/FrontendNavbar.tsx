import React, {useState} from 'react';
import {Link, router, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import {User} from "@/types";
import {Button} from "@/shadcn-ui/button";
import {Input} from "@/shadcn-ui/input";
import {Search, ShoppingCart, X} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/shadcn-ui/popover";
import {useCartStore} from "@/store/store";

function FrontendNavbar() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const user: User | null = usePage().props.auth.user ?? null;
    const cartItems = useCartStore(state => state.items);
    const searchInput=useCartStore.getState().searchInput;
    const setSearchInput=useCartStore.getState().setSearchInput;

    const AuthDropdown = <div className="hidden sm:ms-6 sm:flex sm:items-center">
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user?.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link
                        href={route('profile.edit')}
                    >
                        Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    </div>
    const AuthButtons = <div className="hidden sm:ms-6 sm:flex sm:items-center">
        <div className="relative ms-3 space-x-2 flex items-center">
            <Button onClick={() => router.visit(route('login'))}>
                Iniciar sesión
            </Button>
            <Button onClick={() => router.visit(route('register'))}>
                Registrarse
            </Button>
            <Popover>
                <PopoverTrigger className='bg-black p-2 rounded-md relative'>

                    <ShoppingCart className='text-white'/>
                    {useCartStore.getState().quantity > 0 &&
                        <span
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center p-3 justify-center text-xs'>
                        {useCartStore.getState().quantity}
                    </span>
                    }

                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col space-y-2 p-2'>
                        {
                            cartItems.length > 0 && cartItems.map(item => (
                                <div key={item.id} className='flex justify-between items-center'>
                                    <img src={item.image as string} alt="" className='w-16 h-16'/>
                                    <div className='flex flex-col'>
                                        <span>{item.name}</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <button className='p-1 bg-gray-100 hover:bg-gray-300 rounded-md'
                                                onClick={() => useCartStore.getState().removeProduct(item)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button className='p-1 bg-gray-100 hover:bg-gray-300 rounded-md'
                                                onClick={() => useCartStore.getState().addProduct(item)}>
                                            +
                                        </button>
                                        <button className='p-1 bg-gray-100 hover:bg-gray-300 rounded-md'
                                                onClick={() => useCartStore.getState().clearProduct(item.id)}>
                                            <X className='text-gray-400 hover:text-gray-800'/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            cartItems.length === 0 && <span>No hay productos en el carrito</span>
                        }
                        <div className='flex justify-between'>
                            <span>Total</span>
                            <span>S/. {useCartStore().total.toFixed(2)}</span>
                        </div>
                        <Button variant='outline' onClick={() => router.visit(route('cart.index'))}>
                            Checkout
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    </div>
    const submitSearch = () => {
        router.post(route('product.search', {
            search: searchInput,
            brand: useCartStore.getState().selectedBrand,
        }));
    }
    return (
        <nav className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href={route('home')}>
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                            </Link>
                        </div>

                        <div
                            className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex sm:justify-center items-center w-3/4">
                            <div className='relative w-full'>
                                <Input placeholder="Buscar productos" className='w-full'
                                       value={searchInput}
                                       onChange={(e)=>setSearchInput(e.target.value)}
                                       onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            submitSearch();
                                        }
                                }} />
                                <Search size={16}
                                        className='absolute bottom-1/2 right-4 translate-y-1/2 text-gray-500 '/>
                            </div>
                        </div>
                    </div>

                    {user ? AuthDropdown : AuthButtons}

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800">
                            {user?.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user?.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default FrontendNavbar;