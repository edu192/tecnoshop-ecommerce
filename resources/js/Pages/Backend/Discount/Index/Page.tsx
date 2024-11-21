import React from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Eye, File, Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";

type PageProps = {};
type Discount={
    id:number;
    name:string;
    product_quantity:number;
    discount:number;
    start_date:string;
    end_date:string;
    max_uses:number;
    actual_uses:number;
}
const discounts: Discount[] = [
    {
        id: 1,
        name: "Venta de Verano",
        product_quantity: 100,
        discount: 20,
        start_date: "2023-06-01",
        end_date: "2023-06-30",
        max_uses: 500,
        actual_uses: 150
    },
    {
        id: 2,
        name: "Black Friday",
        product_quantity: 200,
        discount: 50,
        start_date: "2023-11-24",
        end_date: "2023-11-24",
        max_uses: 1000,
        actual_uses: 800
    },
    {
        id: 3,
        name: "Cyber Monday",
        product_quantity: 150,
        discount: 40,
        start_date: "2023-11-27",
        end_date: "2023-11-27",
        max_uses: 800,
        actual_uses: 600
    },
    {
        id: 4,
        name: "Ofertas Navideñas",
        product_quantity: 300,
        discount: 25,
        start_date: "2023-12-01",
        end_date: "2023-12-31",
        max_uses: 1200,
        actual_uses: 900
    },
    {
        id: 5,
        name: "Venta de Año Nuevo",
        product_quantity: 250,
        discount: 30,
        start_date: "2024-01-01",
        end_date: "2024-01-10",
        max_uses: 700,
        actual_uses: 500
    },
    {
        id: 6,
        name: "Día de San Valentín",
        product_quantity: 100,
        discount: 15,
        start_date: "2024-02-10",
        end_date: "2024-02-14",
        max_uses: 400,
        actual_uses: 300
    },
    {
        id: 7,
        name: "Venta de Primavera",
        product_quantity: 200,
        discount: 20,
        start_date: "2024-03-20",
        end_date: "2024-03-31",
        max_uses: 600,
        actual_uses: 450
    },
    {
        id: 8,
        name: "Venta de Pascua",
        product_quantity: 150,
        discount: 25,
        start_date: "2024-04-10",
        end_date: "2024-04-20",
        max_uses: 500,
        actual_uses: 350
    },
    {
        id: 9,
        name: "Vuelta al Cole",
        product_quantity: 300,
        discount: 30,
        start_date: "2024-08-01",
        end_date: "2024-08-31",
        max_uses: 1000,
        actual_uses: 700
    },
    {
        id: 10,
        name: "Venta de Halloween",
        product_quantity: 200,
        discount: 35,
        start_date: "2024-10-25",
        end_date: "2024-10-31",
        max_uses: 800,
        actual_uses: 600
    }
];
const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName='Stock de productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de descuento' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Button className="mt-4">Agregar descuento</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas los descuentos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cantidad de productos</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Fecha Inicio</TableHead>
                                <TableHead>Fecha Fin</TableHead>
                                <TableHead>Usos Maximos</TableHead>
                                <TableHead>Usos Actuales</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {discounts.map((discount) => (
                                <TableRow key={discount.id}>
                                    <TableCell className="font-medium">{discount.id}</TableCell>
                                    <TableCell>{discount.name}</TableCell>
                                    <TableCell>{discount.product_quantity}</TableCell>
                                    <TableCell>{discount.discount}%</TableCell>
                                    <TableCell>{discount.start_date}</TableCell>
                                    <TableCell>{discount.end_date}</TableCell>
                                    <TableCell>{discount.max_uses}</TableCell>
                                    <TableCell>{discount.actual_uses}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center gap-2'>
                                            <Button><Eye /></Button>
                                            <Button><Pen/></Button>
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