import React from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {router} from "@inertiajs/react";
import {PaginatedModelData} from "@/types";
import DeleteModal from "@/Pages/Backend/Discount/Partials/DeleteModal";
import DiscountGroupData = App.Data.DiscountGroupData;

type PageProps = {
    paginated_collection: PaginatedModelData<DiscountGroupData>
};

const Page = ({paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [deleteModalState, setDeleteModalState] = React.useState<{
        isOpen: boolean,
        discount_group: DiscountGroupData | null,
    }>({isOpen: false, discount_group: null});
    return (
        <BackendLayout pageName='Descuentos de productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de descuento' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <Button className="mt-4" onClick={() => router.visit(route('mantenimiento.discount.create'))}>Agregar
                        descuento</Button>
                    <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState}/>
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
                            {paginated_data.map((discount) => (
                                <TableRow key={discount.id}>
                                    <TableCell className="font-medium">{discount.id}</TableCell>
                                    <TableCell>{discount.name}</TableCell>
                                    <TableCell>{discount.discounts_count}</TableCell>
                                    <TableCell>{discount.value}%</TableCell>
                                    <TableCell>{discount.start_date}</TableCell>
                                    <TableCell>{discount.end_date}</TableCell>
                                    <TableCell>{discount.max_uses}</TableCell>
                                    <TableCell>{discount.actual_uses}</TableCell>
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

                                                    <DropdownMenuItem onClick={() => setDeleteModalState(prev => ({
                                                        isOpen: true,
                                                        discount_group: discount
                                                    }))}
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