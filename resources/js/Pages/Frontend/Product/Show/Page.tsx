import React from 'react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Button} from "@/shadcn-ui/button";
import {useCartStore} from "@/store/store";

function Page({product}: { product: App.Data.ProductData }) {
    const addProductToCart = useCartStore(state => state.addProduct);
    const removeProductFromCart = useCartStore(state => state.removeProduct);
    const clearProduct = useCartStore(state => state.clearProduct);
    const cartItems = useCartStore(state => state.items);
    const isInCart = cartItems.some(item => item.id === product.id);
    const quantity = cartItems.find(item => item.id === product.id)?.quantity || 0;
    return (
        <FrontendLayout>
            <div className="mt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=''>
                        <div className='w-full flex'>
                            <div className='w-1/3'>
                                <div>
                                    <img src={product.image as string} alt="" className='w-full border aspect-square'/>
                                </div>
                                <div className='w-full grid grid-cols-4 gap-2 mt-2'>
                                    <img src={product.image as string} alt="" className='w-full border aspect-square'/>
                                    <img src={product.image as string} alt="" className='w-full border aspect-square'/>
                                    <img src={product.image as string} alt="" className='w-full border aspect-square'/>
                                    <img src={product.image as string} alt="" className='w-full border aspect-square'/>
                                </div>
                            </div>
                            <div className='w-2/3'>
                                <div className='w-2/3 mx-auto'>
                                    <header>
                                        <p className='font-bold text-sm mb-2'>{product.brand}</p>
                                        <h3 className='text-2xl mb-2'>{product.name}</h3>
                                        <div className='mb-2'>
                                            ⭐⭐⭐⭐⭐ (5)
                                        </div>
                                    </header>
                                    <div className='spacey-1'>
                                        <p className='text-2xl font-bold text-red-500'>S/. {product.price}</p>
                                        <p className='text-sm text-gray-500 line-through'>S/. 5499.99</p>
                                    </div>
                                    <div className='bg-gray-100 shadow-sm p-4 mt-4'>
                                        <p className='font-bold text-sm'>Especificaciones</p>
                                        <ul className='text-sm list-disc pl-4'>
                                            <li>
                                                <span className='font-bold'>Marca:</span> Apple
                                            </li>
                                            <li>
                                                <span className='font-bold'>Color:</span> Plateado
                                            </li>
                                            <li>
                                                <span className='font-bold'>Resolucion:</span> 4K
                                            </li>
                                            <li>
                                                <span className='font-bold'>Pantalla:</span> 400px
                                            </li>
                                            <li>
                                                <span className='font-bold'>Peso:</span> 500gm
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='mt-10'>
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
                                                <Button variant='destructive' className='w-full' onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearProduct(product.id);
                                                }}>
                                                    Eliminar del carrito
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button className='w-full' onClick={(e) => {
                                                e.stopPropagation();
                                                addProductToCart(product);
                                            }}>
                                                Agregar al carrito
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-16'>
                            <h4 className='text-2xl text-gray-700 pb-4 border-b-2  border-gray-500'>Reseñas de este
                                producto</h4>
                            <div className='w-full'>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FrontendLayout>
    );
}

export default Page;