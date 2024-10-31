import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {router} from "@inertiajs/react";
import ProductData = App.Data.ProductData;

type DiscountsModalProps = {
    discountModalState: { product: ProductData | null, isOpen: boolean }
    setDiscountModalState: React.Dispatch<React.SetStateAction<{ product: ProductData | null, isOpen: boolean }>>
}

const DiscountsModal = ({discountModalState, setDiscountModalState}: DiscountsModalProps) => {
    const [selectedDiscount, setSelectedDiscount] = useState(10)
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
                        <select name="state" id="state" className="w-full" value={selectedDiscount}
                                onChange={(e) => setSelectedDiscount(e.target.value)}>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="40">40%</option>
                            <option value="50">50%</option>
                            <option value="60">60%</option>
                            <option value="70">70%</option>
                            <option value="80">80%</option>
                            <option value="90">90%</option>
                            <option value="99">99%</option>
                        </select>
                    </div>
                    <Button className='w-full' onClick={handleSubmit}>Aplicar</Button>
                </div>
                <div className="py-4"></div>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountsModal;