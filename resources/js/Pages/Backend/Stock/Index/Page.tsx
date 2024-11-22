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
import ProductData = App.Data.ProductData;
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Label} from "@/shadcn-ui/label";
import {Checkbox} from "@/shadcn-ui/checkbox";

type PageProps = {
    product: ProductData
};
type ProductType = {
    id: number;
    provider: string;
    product: {
        id: number;
        name: string;
    };
    quantity: number;
    price_unit: number;
}
const product_stock: ProductType[] = [
    {
        id: 1,
        provider: "TechCorp",
        product: {
            id: 101,
            name: "Laptop Pro 15"
        },
        quantity: 50,
        price_unit: 1200.99
    },
    {
        id: 2,
        provider: "GadgetWorld",
        product: {
            id: 102,
            name: "Smartphone X"
        },
        quantity: 200,
        price_unit: 899.99
    },
    {
        id: 3,
        provider: "DeviceHub",
        product: {
            id: 103,
            name: "4K Monitor"
        },
        quantity: 75,
        price_unit: 450.00
    },
    {
        id: 4,
        provider: "TechCorp",
        product: {
            id: 104,
            name: "Wireless Mouse"
        },
        quantity: 300,
        price_unit: 25.99
    },
    {
        id: 5,
        provider: "GadgetWorld",
        product: {
            id: 105,
            name: "Bluetooth Headphones"
        },
        quantity: 150,
        price_unit: 79.99
    },
    {
        id: 6,
        provider: "DeviceHub",
        product: {
            id: 106,
            name: "Gaming Keyboard"
        },
        quantity: 100,
        price_unit: 99.99
    },
    {
        id: 7,
        provider: "TechCorp",
        product: {
            id: 107,
            name: "External SSD 1TB"
        },
        quantity: 80,
        price_unit: 150.00
    },
    {
        id: 8,
        provider: "GadgetWorld",
        product: {
            id: 108,
            name: "Smartwatch Series 5"
        },
        quantity: 120,
        price_unit: 299.99
    },
    {
        id: 9,
        provider: "DeviceHub",
        product: {
            id: 109,
            name: "VR Headset"
        },
        quantity: 60,
        price_unit: 399.99
    },
    {
        id: 10,
        provider: "TechCorp",
        product: {
            id: 110,
            name: "Portable Charger"
        },
        quantity: 250,
        price_unit: 49.99
    }
];

const Page = ({product}: PageProps) => {
    const [editDialog, setEditDialog] = useState(false)
    return (
        <BackendLayout pageName={`Gestion de lotes de producto: ${product.name} (${product.id})`}>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por codigo de lote' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Dialog>
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
                                        <Label htmlFor="product">Produto</Label>
                                        <Input
                                            id="product"
                                            defaultValue="Proveedor"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="provider">Cantidad</Label>
                                        <Input id="provider"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="date">Data do vale</Label>
                                        <Input id="date" type="date"/>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="voucher">Comprobante</Label>
                                    <Input id="voucher" type='file'/>
                                </div>
                            </form>
                            <DialogFooter>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit">Guardar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='flex justify-end'>
                    <Dialog modal={true} open={editDialog} onOpenChange={(v)=>setEditDialog(v)}>
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
                                        <Label htmlFor="product">Produto</Label>
                                        <Input
                                            id="product"
                                            defaultValue="Proveedor"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label htmlFor="provider">Cantidad</Label>
                                        <Input id="provider"/>
                                    </div>
                                    <div>
                                        <Label htmlFor="date">Data do vale</Label>
                                        <Input id="date" type="date"/>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="voucher">Comprobante</Label>
                                    <Input id="voucher" type='file'/>
                                </div>
                            </form>
                            <DialogFooter>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit">Guardar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                            {product_stock.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.provider}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>S/. {product.price_unit}</TableCell>
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
                                                    <DropdownMenuItem
                                                    >Ver comprobante</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={()=>setEditDialog(true)}
                                                    >Editar lote</DropdownMenuItem>
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