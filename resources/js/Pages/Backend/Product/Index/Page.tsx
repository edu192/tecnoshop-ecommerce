import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import ProductData = App.Data.ProductData;
import {Input} from "@/shadcn-ui/input";
import DiscountsModal from "@/Pages/Backend/Product/Index/Partials/DiscountsModal";

type PageProps = {};

const Page = ({products}: { products:ProductData[] }) => {
    const [updateDialog, setUpdateDialog] = useState<{ product: ProductData | null, isOpen: boolean }>({
        product: null,
        isOpen: false
    });
    const openUpdateDialog = (product: ProductData) => {
        setUpdateDialog({ product, isOpen: true });
    };
    return (
        <BackendLayout pageName='Productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                {/*<Dialog open={detailsDialog.isOpen}*/}
                {/*        onOpenChange={val => setDetailsDialog({ order: null, isOpen: val })}>*/}
                {/*    <DialogTrigger asChild></DialogTrigger>*/}
                {/*    <DialogContent className="sm:max-w-[425px]">*/}
                {/*        <DialogHeader>*/}
                {/*            <DialogTitle>Detalles del Pedido - {detailsDialog.order?.id}</DialogTitle>*/}
                {/*            <DialogDescription>Pedido el {detailsDialog.order?.created_at}</DialogDescription>*/}
                {/*        </DialogHeader>*/}
                {/*        <div>*/}
                {/*            <p><span className="font-semibold">Ciudad:</span> {detailsDialog.order?.city}</p>*/}
                {/*            <p><span className="font-semibold">Dirección:</span> {detailsDialog.order?.address}</p>*/}
                {/*            <p><span className="font-semibold">Departamento:</span> {detailsDialog.order?.department}</p>*/}
                {/*            <p><span className="font-semibold">Código Postal:</span> {detailsDialog.order?.postal_code}</p>*/}
                {/*            <p><span className="font-semibold">Metodo de pago:</span> {detailsDialog.order?.payment_method === 'credit_card' ? 'Tarjeta de Crédito' : 'Paypal'}</p>*/}
                {/*        </div>*/}
                {/*        <div className="py-4">*/}
                {/*            <h4 className="font-semibold mb-2">Artículos:</h4>*/}
                {/*            {detailsDialog.order?.details.map((detail) => (*/}
                {/*                <div key={detail.id} className="flex justify-between mb-2">*/}
                {/*                    <span>{detail.product_name} x {detail.quantity}</span>*/}
                {/*                    <span>S/. {(detail.unit_price * detail.quantity).toFixed(2)}</span>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*            <div className="flex justify-between font-semibold mt-4">*/}
                {/*                <span>Total:</span>*/}
                {/*                <span>S/. {parseFloat(detailsDialog.order?.total).toFixed(2)}</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </DialogContent>*/}
                {/*</Dialog>*/}
                <DiscountsModal discountModalState={updateDialog} setDiscountModalState={setUpdateDialog}/>



                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre o id' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div className='flex justify-end pb-6'>
                    <Button>Crear Producto</Button>
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