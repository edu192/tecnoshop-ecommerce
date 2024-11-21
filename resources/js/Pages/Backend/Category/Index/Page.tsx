import React from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {File, Pen, Trash2} from "lucide-react";
import CategoryData = App.Data.CategoryData;

type PageProps = {};
type Category={
    id:number;
    name:string;
    description:string;
    product_quantity:number;
}
const categories:Category[]=[
    {
        id:1,
        name:"Laptops",
        description:"Laptops de ultima generacion",
        product_quantity:110
    },
    {
        id:2,
        name:"Smartphones",
        description:"Smartphones de ultima generacion",
        product_quantity:60
    },
    {
        id:3,
        name:"Monitores",
        description:"Monitores de ultima generacion",
        product_quantity:40
    },
    {
        id:4,
        name:"Mouse",
        description:"Mouse de ultima generacion",
        product_quantity:180
    },
    {
        id:5,
        name:"Teclados",
        description:"Teclados de ultima generacion",
        product_quantity:20
    },
    {
        id:6,
        name:"Parlantes",
        description:"Parlantes de ultima generacion",
        product_quantity:70
    },
    {
        id:7,
        name:"Impresoras",
        description:"Impresoras de ultima generacion",
        product_quantity:60
    },
    {
        id:8,
        name:"Camaras",
        description:"Camaras de ultima generacion",
        product_quantity:50
    },
    {
        id:9,
        name:"Proyectores",
        description:"Proyectores de ultima generacion",
        product_quantity:80
    },
    {
        id:10,
        name:"Accesorios",
        description:"Accesorios de ultima generacion",
        product_quantity:10
    },
]
const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName="Categorias">
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de categoria' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Button className="mt-4">Agregar categoria</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripcion</TableHead>
                                <TableHead>Cantidad de productos</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>{category.product_quantity}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center gap-2'>
                                            <Button><Pen/></Button>
                                            <Button><Trash2 /></Button>
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