import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {MoreHorizontal} from "lucide-react";
import {Input} from "@/shadcn-ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Label} from "@/shadcn-ui/label";
import {router, useForm} from "@inertiajs/react";
import ProductData = App.Data.ProductData;
import ProductBatchData = App.Data.ProductBatchData;

type PageProps = {
    product: ProductData,
    batches:ProductBatchData[]
};


const Page = ({product,batches}: PageProps) => {
    const [createDialog, setCreateDialog] = useState(false)
    const {data, setData, errors, clearErrors, reset, post} = useForm({
        provider: '',
        quantity: 0,
        price_unit: 0,
        voucher: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'file') {
            setData(e.target.id, e.target.files ? e.target.files[0] : null);
        } else {
            setData(e.target.id, e.target.value);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        post(route('mantenimiento.stock.store', product), {
            onSuccess: () => {
                reset();
                clearErrors();
                setCreateDialog(false);
            }
        });
    };

    return (
        <BackendLayout pageName={`Gestion de lotes de producto: ${product.name} (${product.id})`}>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por codigo de lote' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Dialog open={createDialog} onOpenChange={v => setCreateDialog(v)}>
                        <DialogTrigger asChild>
                            <Button variant="outline">Nuevo Lote</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Nuevo lote</DialogTitle>
                            </DialogHeader>
                            <form className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="product">Produto</Label>
                                        <Input
                                            id="product"
                                            defaultValue={product.name}
                                            readOnly
                                            className="bg-muted"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="provider">Proveedor</Label>
                                        <Input
                                            id="provider"
                                            value={data.provider}
                                            onChange={handleChange}
                                        />
                                        {errors.provider && <p className="text-red-500 text-xs">{errors.provider}</p>}

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="quantity">Cantidad</Label>
                                        <Input
                                            id="quantity"
                                            value={data.quantity}
                                            onChange={handleChange}
                                        />
                                        {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="price_unit">Precio Unidad</Label>
                                        <Input
                                            id="price_unit"
                                            value={data.price_unit}
                                            onChange={handleChange}
                                        />
                                        {errors.price_unit &&
                                            <p className="text-red-500 text-xs">{errors.price_unit}</p>}
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="voucher">Comprobante</Label>
                                    <Input id="voucher" type='file' onChange={handleChange}/>
                                    {errors.voucher && <p className="text-red-500 text-xs">{errors.voucher}</p>}
                                </div>
                            </form>
                            <DialogFooter>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit" onClick={handleSubmit}>Guardar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='flex justify-end'>

                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Proveedor</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead>Precio Unidad</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {batches.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.provider}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>S/. {product.unit_price}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center'>
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => window.open(product.voucher?.original_url, '_blank')}>Ver comprobante</DropdownMenuItem>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;