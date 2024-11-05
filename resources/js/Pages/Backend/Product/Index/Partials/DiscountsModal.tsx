import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {router, usePage} from "@inertiajs/react";
import ProductData = App.Data.ProductData;
import {Input} from "@/shadcn-ui/input";

type DiscountsModalProps = {
    discountModalState: { product: ProductData | null, isOpen: boolean }
    setDiscountModalState: React.Dispatch<React.SetStateAction<{ product: ProductData | null, isOpen: boolean }>>
}

const DiscountsModal = ({discountModalState, setDiscountModalState}: DiscountsModalProps) => {
    const [selectedDiscount, setSelectedDiscount] = useState(0)
    const {errors}=usePage().props
    const handleSubmit = () => {
        router.post(route('mantenimiento.products.discounts.store', {product: discountModalState.product}), {
            discount: selectedDiscount,
        },{
            onSuccess: () => {
                setDiscountModalState(prev => ({...prev, isOpen: false}))
            }
        })
    }
    useEffect(() => {
            setSelectedDiscount(discountModalState.product?.discount?.value || 10)

    }, [discountModalState.isOpen]);
    return (
        <Dialog open={discountModalState.isOpen}
                onOpenChange={val => setDiscountModalState(prev => ({...prev, isOpen: val}))}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Producto - {discountModalState.product?.id}</DialogTitle>
                </DialogHeader>
                <div>
                    {discountModalState.product?.discount?(
                        <div>
                            <div className="mb-10">
                                <span>
                                    Tiene un descuento del {discountModalState.product.discount.value}%
                                </span>
                            </div>
                        </div>
                    ):(
                        <div>
                            <div className="mb-10">
                                <span>No tiene descuento</span>
                            </div>
                        </div>
                    )}
                    <div className="mb-10">
                        <label htmlFor="name"
                               className="block text-sm font-medium text-gray-700">Descuento</label>

                        <Input type='number' value={selectedDiscount} onChange={(e) => setSelectedDiscount(parseInt(e.target.value))}/>
                        {errors.discount && <p className='text-red-500 text-xs'>{errors.discount}</p>}
                    </div>
                    <Button className='w-full' onClick={handleSubmit}>Aplicar</Button>
                </div>
                <div className="py-4"></div>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountsModal;