import React from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {Label} from "@/shadcn-ui/label";
import ProductData = App.Data.ProductData;
import {Checkbox} from "@/shadcn-ui/checkbox";

type PageProps = {
    products: ProductData[]
};

const Page = ({products}: PageProps) => {
    const filteredProducts = products.slice(0, 10);
    return (
        <BackendLayout pageName='Crear Descuento'>
            <div className="p-6 bg-white rounded-lg shadow">

                <div>
                    <form className="grid gap-4 py-4">
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Nombre</Label>
                                <Input/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Cantidad</Label>
                                <Input/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Valor</Label>
                                <Input/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Fecha inicio</Label>
                                <Input type='date'/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Fecha fin</Label>
                                <Input type='date'/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Usos Maximos</Label>
                                <Input/>
                            </div>
                        </div>
                        <div className="grid  gap-2">
                            <div>
                                <Label htmlFor="product">Usos Actuales</Label>
                                <Input />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de descuento' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas los descuentos del sistema.</TableCaption>
                        <TableHeader>
                        <TableRow>
                                <TableHead className="w-[100px]">
                                    <Checkbox/>
                                </TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.stock > 0 ? 'Disponible' : 'Agotado'}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex justify-end'>
                    <Button>
                        Crear descuento
                    </Button>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;