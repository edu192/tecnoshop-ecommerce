import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Button} from "@/shadcn-ui/button";
import CategoryData = App.Data.CategoryData;
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {Checkbox} from "@/shadcn-ui/checkbox";

function ProductCard({name, image, link, price}: { name: string, image: string, link: string, price: number }) {
    return (
        <div className='bg-gray-100 shadow'>
            <img src={image} alt=""
                 className='aspect-square  border-2 border-gray-500'/>
            <div className='text-center p-2'>
                <h3 className='text-sm font-semibold'>{name}</h3>
                <p className='text-sm'>S/{price}</p>
                <div>
                    ⭐⭐⭐⭐⭐
                </div>
            </div>
            <div className="flex justify-center my-2">
                <Button variant='outline'>
                    Ver producto
                </Button>
            </div>
        </div>
    )
}

function Product({products, category}: { products: any[], category: CategoryData }) {
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
                                            <span><ChevronDown /></span>
                                        </div>
                                    </DisclosureButton>
                                    <DisclosurePanel>
                                        <div className='space-y-2 py-2 px-6 border-b-2'>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="brand1"/>
                                                <label
                                                    htmlFor="brand1"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Apple
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="brand2"/>
                                                <label
                                                    htmlFor="brand2"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Samsung
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="brand3"/>
                                                <label
                                                    htmlFor="brand3"
                                                    className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                            <span><ChevronDown /></span>
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
                                <ProductCard name={product.name} image={product.image as string}
                                             link={route('home')} price={product.price}/>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </FrontendLayout>
    );
}

export default Product;