import React from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal, Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {Label} from "@/shadcn-ui/label";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";

type PageProps = {};
type Banner = {
    id: number;
    name: string;
    image: string;
    link: string;
}
const banners: Banner[] = [
    {
        id: 1,
        name: "Venta de Verano",
        image: "venta_verano.jpg",
        link: "https://example.com/venta-verano"
    },
    {
        id: 2,
        name: "Nuevas Llegadas",
        image: "nuevas_llegadas.jpg",
        link: "https://example.com/nuevas-llegadas"
    },
    {
        id: 3,
        name: "Black Friday",
        image: "black_friday.jpg",
        link: "https://example.com/black-friday"
    },
    {
        id: 4,
        name: "Cyber Monday",
        image: "cyber_monday.jpg",
        link: "https://example.com/cyber-monday"
    },
    {
        id: 5,
        name: "Ofertas Navideñas",
        image: "ofertas_navidenas.jpg",
        link: "https://example.com/ofertas-navidenas"
    },
    {
        id: 6,
        name: "Vuelta al Cole",
        image: "vuelta_al_cole.jpg",
        link: "https://example.com/vuelta-al-cole"
    },
    {
        id: 7,
        name: "Venta de Liquidación",
        image: "venta_liquidacion.jpg",
        link: "https://example.com/venta-liquidacion"
    },
    {
        id: 8,
        name: "Venta Flash",
        image: "venta_flash.jpg",
        link: "https://example.com/venta-flash"
    },
    {
        id: 9,
        name: "Día de San Valentín",
        image: "san_valentin.jpg",
        link: "https://example.com/san-valentin"
    },
    {
        id: 10,
        name: "Colección de Primavera",
        image: "coleccion_primavera.jpg",
        link: "https://example.com/coleccion-primavera"
    }
];
const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName='Banners'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de banner' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Agregar Banner</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Agregar Banner</DialogTitle>
                            </DialogHeader>
                            <form className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre Banner</Label>
                                    <Input id="name"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="link">Link de Productos</Label>
                                    <div className="flex gap-2">
                                        <Input id="link" className="flex-1"/>

                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Agregar Imagen</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        id="image-upload"
                                    />
                                </div>
                                <Button className="w-full mt-4">Guardar Banner</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Imagen</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell className="font-medium">{banner.id}</TableCell>
                                    <TableCell>{banner.name}</TableCell>
                                    <TableCell> <a href="" className='text-blue-500'>{banner.image}</a></TableCell>
                                    <TableCell>
                                        <a href="" className='text-blue-500'>{banner.link}</a>
                                    </TableCell>
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
                                                    >Editar banner</DropdownMenuItem>
                                                    <DropdownMenuItem
                                                    >Borrar banner</DropdownMenuItem>
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