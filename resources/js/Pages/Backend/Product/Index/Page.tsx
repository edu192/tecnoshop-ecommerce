import React from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import ProductData = App.Data.ProductData;

type PageProps = {};

const Page = ({products}: { products:ProductData[] }) => {
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
                {/*<Dialog open={updateDialog.isOpen}*/}
                {/*        onOpenChange={val => setUpdateDialog({ order: null, isOpen: val })}>*/}
                {/*    <DialogTrigger asChild></DialogTrigger>*/}
                {/*    <DialogContent className="sm:max-w-[425px]">*/}
                {/*        <DialogHeader>*/}
                {/*            <DialogTitle>Estado del pedido - {updateDialog.order?.id}</DialogTitle>*/}
                {/*            <DialogDescription>Pedido el {updateDialog.order?.created_at}</DialogDescription>*/}
                {/*        </DialogHeader>*/}
                {/*        <div>*/}
                {/*            <select name="state" id="state" className="w-full" value={selectedState} onChange={handleStateChange}>*/}
                {/*                <option value="en_proceso">En proceso</option>*/}
                {/*                <option value="completado">Completado</option>*/}
                {/*            </select>*/}
                {/*            <Button className='w-full' onClick={handleUpdateOrder}>Actualizar</Button>*/}
                {/*        </div>*/}
                {/*        <div className="py-4"></div>*/}
                {/*    </DialogContent>*/}
                {/*</Dialog>*/}
                <div className='flex justify-start pb-6'></div>
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
                            {products.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.brand}</TableCell>
                                    <TableCell>{order.category_id}</TableCell>
                                    <TableCell>{order.stock}</TableCell>
                                    <TableCell>S/. {order.price}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='inline-flex gap-2'>
                                            <Button variant="outline" >Ver mas</Button>
                                            <Button variant="outline" > <Pen/> </Button>
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