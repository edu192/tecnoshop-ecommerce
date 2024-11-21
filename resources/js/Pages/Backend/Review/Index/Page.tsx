import React from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Check, File, Pen, Trash2} from "lucide-react";

type PageProps = {};
type Review={
    id:number;
    product:string;
    user:string;
    rating:number;
    comment:string;
}
const reviews: Review[] = [
    {
        id: 1,
        product: "Laptop Pro 15",
        user: "Eduardo",
        rating: 5,
        comment: "Excelente producto, muy recomendado."
    },
    {
        id: 2,
        product: "Smartphone X",
        user: "Maria",
        rating: 4,
        comment: "Muy buen teléfono, pero la batería podría durar más."
    },
    {
        id: 3,
        product: "4K Monitor",
        user: "Carlos",
        rating: 5,
        comment: "La calidad de imagen es impresionante."
    },
    {
        id: 4,
        product: "Wireless Mouse",
        user: "Ana",
        rating: 3,
        comment: "Funciona bien, pero a veces pierde conexión."
    },
    {
        id: 5,
        product: "Bluetooth Headphones",
        user: "Luis",
        rating: 5,
        comment: "Sonido excelente y muy cómodos."
    },
    {
        id: 6,
        product: "Gaming Keyboard",
        user: "Sofia",
        rating: 4,
        comment: "Muy buen teclado, pero un poco ruidoso."
    },
    {
        id: 7,
        product: "External SSD 1TB",
        user: "Jorge",
        rating: 5,
        comment: "Muy rápido y con gran capacidad."
    },
    {
        id: 8,
        product: "Smartwatch Series 5",
        user: "Lucia",
        rating: 4,
        comment: "Muy útil, pero la batería dura poco."
    },
    {
        id: 9,
        product: "VR Headset",
        user: "Miguel",
        rating: 5,
        comment: "Experiencia de realidad virtual increíble."
    },
    {
        id: 10,
        product: "Portable Charger",
        user: "Elena",
        rating: 4,
        comment: "Carga rápido, pero es un poco pesado."
    },
    {
        id: 11,
        product: "Laptop Pro 15",
        user: "Pedro",
        rating: 5,
        comment: "Excelente rendimiento y diseño."
    },
    {
        id: 12,
        product: "Smartphone X",
        user: "Laura",
        rating: 3,
        comment: "Buen teléfono, pero la cámara no es la mejor."
    },
    {
        id: 13,
        product: "4K Monitor",
        user: "Diego",
        rating: 5,
        comment: "Perfecto para trabajar y jugar."
    },
    {
        id: 14,
        product: "Wireless Mouse",
        user: "Marta",
        rating: 4,
        comment: "Muy cómodo y fácil de usar."
    },
    {
        id: 15,
        product: "Bluetooth Headphones",
        user: "Raul",
        rating: 5,
        comment: "Calidad de sonido impresionante."
    },
    {
        id: 16,
        product: "Gaming Keyboard",
        user: "Sara",
        rating: 4,
        comment: "Muy buen teclado, pero las teclas son un poco duras."
    },
    {
        id: 17,
        product: "External SSD 1TB",
        user: "Alberto",
        rating: 5,
        comment: "Gran capacidad y velocidad."
    },
    {
        id: 18,
        product: "Smartwatch Series 5",
        user: "Isabel",
        rating: 4,
        comment: "Muy útil, pero la pantalla es pequeña."
    },
    {
        id: 19,
        product: "VR Headset",
        user: "Pablo",
        rating: 5,
        comment: "Experiencia de juego increíble."
    },
    {
        id: 20,
        product: "Portable Charger",
        user: "Carmen",
        rating: 4,
        comment: "Muy útil, pero tarda en cargar."
    },
    {
        id: 21,
        product: "Laptop Pro 15",
        user: "Fernando",
        rating: 5,
        comment: "Muy buen producto, recomendado."
    }
];

const Page = ({}: PageProps) => {
    return (
        <BackendLayout pageName='Reseña de productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de producto' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Valoracion</TableHead>
                                <TableHead>Comentario</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell className="font-medium">{review.id}</TableCell>
                                    <TableCell>{review.product}</TableCell>
                                    <TableCell>{review.user}</TableCell>
                                    <TableCell>{review.rating}</TableCell>
                                    <TableCell>{review.comment}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center gap-2'>
                                            <Button><Check /></Button>
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