import React, {useEffect} from 'react';
import {useForm} from "@inertiajs/react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {Textarea} from "@/shadcn-ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/shadcn-ui/select";
import ProductData = App.Data.ProductData;

type UpdateModalProps = {
    updateModalState: { product: ProductData | null, isOpen: boolean }
    setUpdateModalState: React.Dispatch<React.SetStateAction<{ product: ProductData | null, isOpen: boolean }>>
}

const UpdateModal = ({updateModalState, setUpdateModalState}: UpdateModalProps) => {
    const {data, setData, post, processing, errors, reset,clearErrors} = useForm({
        name: '',
        brand: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
        category: ''
    });

    useEffect(() => {
        if (updateModalState.product) {
            setData({
                name: updateModalState.product.name,
                brand: updateModalState.product.brand,
                description: updateModalState.product.description,
                price: updateModalState.product.price,
                stock: updateModalState.product.stock,
                image: '',
                category: updateModalState.product.category_id as string | null
            });
        } else {
            reset();
        }
    }, [updateModalState.isOpen]);

    const handleSubmit = () => {
        if (updateModalState.product) {
            post(route('mantenimiento.products.update', updateModalState.product.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setUpdateModalState(prev => ({product: null, isOpen: false}))
                    clearErrors()
                }
            });
        }
    };

    return (
        <Dialog open={updateModalState.isOpen}
                onOpenChange={(val) => setUpdateModalState(prev => ({...prev, isOpen: val}))}>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Editar un producto y guardar los cambios en la base de datos
                    </DialogDescription>
                </DialogHeader>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className=" items-center">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div className="items-center">
                        <Label htmlFor="brand" className="text-right">
                            Marca
                        </Label>
                        <Input
                            id="brand"
                            className="col-span-3"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                        />
                        {errors.brand && <p className="text-red-500">{errors.brand}</p>}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="description" className="text-right">
                            Descripcion
                        </Label>
                        <Textarea id='description' value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}/>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className=" items-center">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            id="price"
                            className="col-span-3"
                            value={data.price}
                            onChange={(e) => setData('price', parseFloat(e.target.value))}
                        />
                        {errors.price && <p className="text-red-500">{errors.price}</p>}
                    </div>
                    <div className="items-center">
                        <Label htmlFor="stock" className="text-right">
                            Stock
                        </Label>
                        <Input
                            id="stock"
                            className="col-span-3"
                            value={data.stock}
                            onChange={(e) => setData('stock', parseInt(e.target.value))}
                        />
                        {errors.stock && <p className="text-red-500">{errors.stock}</p>}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Select value={String(data.category).trim()} onValueChange={(e) => setData('category', e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category"/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    <SelectItem value="1">Smartphones</SelectItem>
                                    <SelectItem value="2">Laptops</SelectItem>
                                    <SelectItem value="3">Televisores</SelectItem>
                                    <SelectItem value="4">Camaras</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500">{errors.category}</p>}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="image" className="text-right">
                            Imagen
                        </Label>
                        <Input
                            type="file"
                            id="image"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateModal;