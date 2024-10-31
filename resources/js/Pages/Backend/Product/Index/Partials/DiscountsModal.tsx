import React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import ProductData = App.Data.ProductData;

type DiscountsModalProps = {
    discountModalState:{ product: ProductData | null, isOpen: boolean }
    setDiscountModalState: React.Dispatch<React.SetStateAction<{ product: ProductData | null, isOpen: boolean }>>
}

const DiscountsModal = ({discountModalState,setDiscountModalState}: DiscountsModalProps) => {
    return (
        <Dialog open={discountModalState.isOpen}
                onOpenChange={val => setDiscountModalState({product: null, isOpen: val})}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Producto - {discountModalState.product?.id}</DialogTitle>
                    <DialogDescription>Creado el {discountModalState.product?.created_at}</DialogDescription>
                </DialogHeader>
                <div>
                    <div className='mb-10'>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Descripcion</label>
                        <Input id="name" name="name" type="text" value={discountModalState.product?.name} readOnly/>
                    </div>
                    <div className="mb-10">
                        <label htmlFor="name"
                               className="block text-sm font-medium text-gray-700">Descuento</label>
                        <select name="state" id="state" className="w-full">
                            <option value="en_proceso">10%</option>
                            <option value="completado">20%</option>
                            <option value="completado">30%</option>
                            <option value="completado">40%</option>
                            <option value="completado">50%</option>
                            <option value="completado">60%</option>
                            <option value="completado">70%</option>
                            <option value="completado">80%</option>
                            <option value="completado">90%</option>
                            <option value="completado">99%</option>
                        </select>
                    </div>
                    <Button className='w-full'>Actualizar</Button>
                </div>
                <div className="py-4"></div>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountsModal;