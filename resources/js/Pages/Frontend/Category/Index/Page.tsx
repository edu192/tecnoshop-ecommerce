import React, {useState} from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Button} from "@/shadcn-ui/button";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {Checkbox} from "@/shadcn-ui/checkbox";
import {useCartStore} from "@/store/store";
import CategoryData = App.Data.CategoryData;
import ProductData = App.Data.ProductData;
import {router} from "@inertiajs/react";

function ProductCard({product}: { product: ProductData }) {
    const addProductToCart = useCartStore(state => state.addProduct);
    const removeProductFromCart = useCartStore(state => state.removeProduct);
    const items = useCartStore(state => state.items);
    const isInCart = items.some(item => item.id === product.id);
    const quantity = items.find(item => item.id === product.id)?.quantity;
    const clearProduct = useCartStore(state => state.clearProduct);
    return (
        <div className='bg-gray-100 shadow hover:cursor-pointer group' onClick={() => router.visit(route('product.show',product.id))}>
            <div className='aspect-square border-2 border-gray-500 overflow-hidden'>
                <img src={product.image as string} alt=""
                     className=' group-hover:scale-110 ease-in transition duration-75'/>
            </div>
            <div className='text-center p-2'>
                <h3 className='text-sm font-semibold'>{product.name}</h3>
                <p className='text-sm'>S/{product.price}</p>
                <div>
                    ⭐⭐⭐⭐⭐
                </div>
            </div>
            <div className="flex justify-center my-2">
                {isInCart ? (
                    <div className="flex space-x-2 items-center">
                        <Button variant='outline' onClick={(e) => {
                            e.stopPropagation();
                            removeProductFromCart(product);
                        }}>
                            -
                        </Button>
                        <span>{quantity}</span>
                        <Button variant='outline' onClick={(e) => {
                            e.stopPropagation();
                            addProductToCart(product);
                        }}>
                            +
                        </Button>
                    </div>
                ) : (
                    <Button variant='outline' onClick={(e) => {
                        e.stopPropagation();
                        addProductToCart(product);
                    }}>
                        Agregar al carrito
                    </Button>
                )}
            </div>
            {isInCart && (
                <Button variant='destructive' className='w-full' onClick={(e) => {
                    e.stopPropagation();
                    clearProduct(product.id);
                }}>
                    Eliminar del carrito
                </Button>
            )}
        </div>
    )
}

function Product({products, category}: { products: ProductData[], category: CategoryData }) {
    const selectedBrand = useCartStore(state => state.selectedBrand);
    const setSelectedBrand = useCartStore(state => state.setSelectedBrand);

    const handleCheckboxChange = (brand: string) => {
        if (selectedBrand === brand) {
            setSelectedBrand(null);
        } else {
            setSelectedBrand(brand);
        }
    };
    return (
        <FrontendLayout>
            <div className="mt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='flex gap-10'>
                        <div className='w-1/4 border rounded-md'>
                            <h3 className='text-lg font-semibold text-center py-4'>{category.name}</h3>
                            <img src={category.image as string} alt=""/>
                            <div>
                                <Disclosure>
                                    <DisclosureButton className='w-full border-b-2 data-[open]:border-b-0'>
                                        <div className='flex justify-between py-2 px-6'>
                                            <span className=''>Marca</span>
                                            <span><ChevronDown/></span>
                                        </div>
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <div className='space-y-2 py-2 px-6 border-b-2'>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="apple"
                                                    checked={selectedBrand === 'apple'}
                                                    onCheckedChange={() => handleCheckboxChange('apple')}
                                                />
                                                <label
                                                    htmlFor="apple"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Apple
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="samsung"
                                                    checked={selectedBrand === 'samsung'}
                                                    onCheckedChange={() => handleCheckboxChange('samsung')}
                                                />
                                                <label
                                                    htmlFor="samsung"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Samsung
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="xiaomi"
                                                    checked={selectedBrand === 'xiaomi'}
                                                    onCheckedChange={() => handleCheckboxChange('xiaomi')}
                                                />
                                                <label
                                                    htmlFor="xiaomi"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Xiaomi
                                                </label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure>
                                    <DisclosureButton className='w-full border-b-2 data-[open]:border-b-0'>
                                        <div className='flex justify-between py-2 px-6'>
                                            <span className=''>Precio</span>
                                            <span><ChevronDown/></span>
                                        </div>
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <div className='space-y-2 py-2 px-6 border-b-2'>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="price1"/>
                                                <label
                                                    htmlFor="price1"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    S/ 1000 - S/ 2000
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="price2"/>
                                                <label
                                                    htmlFor="price2"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    S/ 2000 - S/ 4000
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="price3"/>
                                                <label
                                                    htmlFor="price3"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    S/ Mas de 4000
                                                </label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </div>
                        </div>
                        <div className='w-3/4 grid grid-cols-4 gap-4'>
                            {products.map((product, index) => (
                                <ProductCard product={product}/>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </FrontendLayout>
    );
}

export default Product;