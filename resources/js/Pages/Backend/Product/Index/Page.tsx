import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import ProductData = App.Data.ProductData;
import {Input} from "@/shadcn-ui/input";
import DiscountsModal from "@/Pages/Backend/Product/Index/Partials/DiscountsModal";
import CreateProductModal from "@/Pages/Backend/Product/Index/Partials/CreateProductModal";

type PageProps = {};

const Page = ({products}: { products:ProductData[] }) => {
    const [updateDialog, setUpdateDialog] = useState<{ product: ProductData | null, isOpen: boolean }>({
        product: null,
        isOpen: false
    });
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
    const openUpdateDialog = (product: ProductData) => {
        setUpdateDialog({ product, isOpen: true });
    };
    return (
        <BackendLayout pageName='Productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <DiscountsModal discountModalState={updateDialog} setDiscountModalState={setUpdateDialog}/>


                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre o id' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end pb-6'>
                    <CreateProductModal openState={createModalIsOpen} setOpenState={setCreateModalIsOpen}/>

                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las ordenes del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID Pedido</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category_id}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>S/. {product.price}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='inline-flex gap-2'>
                                            <Button variant="outline" >Ver mas</Button>
                                            <Button variant="outline" onClick={()=>openUpdateDialog(product)}> <Pen/> </Button>
                                            <Button variant="outline" > <Trash2/> </Button>
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