import React from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Eye, File, Pen, Trash2} from "lucide-react";

type PageProps = {};
type Advertising={
    id:number;
    message:string;
    files_quantity:number;
    product:{
        id:number;
        name:string;
    };
    users_quantity:number;
}
const advertising: Advertising[] = [
    {
        id: 1,
        message: "¡Grandes descuentos en los últimos portátiles!",
        files_quantity: 1,
        product: {
            id: 101,
            name: "Laptop Pro 15"
        },
        users_quantity: 150
    },
    {
        id: 2,
        message: "¡Compra uno y llévate otro gratis en todos los smartphones!",
        files_quantity: 1,
        product: {
            id: 102,
            name: "Smartphone X"
        },
        users_quantity: 200
    },
    {
        id: 3,
        message: "¡Mejora tu configuración con un monitor 4K!",
        files_quantity: 1,
        product: {
            id: 103,
            name: "Monitor 4K"
        },
        users_quantity: 75
    },
    {
        id: 4,
        message: "¡Ratón inalámbrico a un precio inmejorable!",
        files_quantity: 1,
        product: {
            id: 104,
            name: "Ratón Inalámbrico"
        },
        users_quantity: 300
    },
    {
        id: 5,
        message: "¡Experimenta el mejor sonido con nuestros auriculares Bluetooth!",
        files_quantity: 1,
        product: {
            id: 105,
            name: "Auriculares Bluetooth"
        },
        users_quantity: 150
    },
    {
        id: 6,
        message: "¡Consigue el teclado gaming definitivo ahora!",
        files_quantity: 1,
        product: {
            id: 106,
            name: "Teclado Gaming"
        },
        users_quantity: 100
    },
    {
        id: 7,
        message: "¡SSD externo de 1TB a un precio especial!",
        files_quantity: 1,
        product: {
            id: 107,
            name: "SSD Externo 1TB"
        },
        users_quantity: 80
    },
    {
        id: 8,
        message: "¡Mantente conectado con el Smartwatch Series 5!",
        files_quantity: 1,
        product: {
            id: 108,
            name: "Smartwatch Series 5"
        },
        users_quantity: 120
    },
    {
        id: 9,
        message: "¡Sumérgete en la realidad virtual con nuestro último headset!",
        files_quantity: 1,
        product: {
            id: 109,
            name: "Headset VR"
        },
        users_quantity: 60
    },
    {
        id: 10,
        message: "¡Nunca te quedes sin batería con nuestro cargador portátil!",
        files_quantity: 1,
        product: {
            id: 110,
            name: "Cargador Portátil"
        },
        users_quantity: 250
    }
];
const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName='Publicidad'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de publicidad' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Button className="mt-4">Agregar publicidad</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Mensaje</TableHead>
                                <TableHead>Cantidad de archivos</TableHead>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad de usuarios</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {advertising.map((el) => (
                                <TableRow key={el.id}>
                                    <TableCell className="font-medium">{el.id}</TableCell>
                                    <TableCell>{el.message}</TableCell>
                                    <TableCell>{el.files_quantity}</TableCell>
                                    <TableCell>{el.product.name}</TableCell>
                                    <TableCell>{el.users_quantity}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center gap-2'>
                                            <Button><Eye /></Button>
                                            <Button><Trash2/></Button>
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