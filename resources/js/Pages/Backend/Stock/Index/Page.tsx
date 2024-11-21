import React from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {File, Pen} from "lucide-react";
import {Input} from "@/shadcn-ui/input";

type PageProps = {};
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

const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName='Stock de productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de producto' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Button className="mt-4">Agregar entrada</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Proveedor</TableHead>
                                <TableHead>Producto</TableHead>
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
                                    <TableCell>{product.product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>S/. {product.price_unit}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center gap-2'>
                                            <Button><File/></Button>
                                            <Button><Pen/></Button>
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