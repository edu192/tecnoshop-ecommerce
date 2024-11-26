import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Eye, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {router} from "@inertiajs/react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Label} from "@/shadcn-ui/label";
import {Textarea} from "@/shadcn-ui/textarea";
import {PaginatedModelData} from "@/types";
import AdvertisingData = App.Data.AdvertisingData;

type PageProps = {
    paginated_collection: PaginatedModelData<AdvertisingData>
};

const Page = ({paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [resumeDialog, setResumeDialog] = useState(false)
    return (
        <BackendLayout pageName='Publicidad'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de publicidad' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div>
                    <form action="">

                    </form>
                </div>
                <div className='flex justify-end'>
                    <Button onClick={() => router.visit(route('mantenimiento.advertising.create'))}>Crear
                        publicidad</Button>
                </div>
                <div className='flex justify-end'>
                    <div className='flex justify-end'>
                        <Dialog open={resumeDialog} onOpenChange={(v) => setResumeDialog(v)}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Resumen de publicidad</DialogTitle>
                                </DialogHeader>
                                <form className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <div>
                                            <Label htmlFor="product">Mensaje</Label>
                                            <Textarea value={'Mensaje enviado'} disabled
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="product">Imagen</Label>
                                            <a href=""
                                               className='text-blue-500 block flex'>Imagen-promocional.png <Eye/></a>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="voucher" className='flex'>Ver lista de
                                            usuarios <Eye/></Label>
                                    </div>
                                </form>
                                <DialogFooter>
                                    <Button type="submit">Ok</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Mensaje</TableHead>
                                <TableHead>Producto</TableHead>
                                <TableHead>Cantidad de usuarios</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((el) => (
                                <TableRow key={el.id}>
                                    <TableCell className="font-medium">{el.id}</TableCell>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell>{el.message}</TableCell>
                                    <TableCell>{el.product_id}</TableCell>
                                    <TableCell>{el.users_count}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => setResumeDialog(true)}
                                                    >Ver registro</DropdownMenuItem>
                                                    <DropdownMenuItem
                                                    >Eliminar</DropdownMenuItem>
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