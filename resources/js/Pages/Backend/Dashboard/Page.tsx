import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import OrderData = App.Data.OrderData;
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {Pen} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";

type PageProps = {};

const Page = ({orders,usersCount,productsCount,ordersCount,ordersTotal}: { orders: OrderData[], usersCount: number, productsCount: number, ordersCount: number,ordersTotal:number }) => {
    const [selectedOrder, setSelectedOrder] = useState<null|OrderData>(null)
    return (
        <BackendLayout pageName='Dashboard'>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold">Total de ventas</h2>
                    <p className="text-2xl font-bold">S/. {ordersTotal}</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold">Ordenes</h2>
                    <p className="text-2xl font-bold">{ordersCount}</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold">Usuarios</h2>
                    <p className="text-2xl font-bold">{usersCount}</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold">Productos</h2>
                    <p className="text-2xl font-bold">{productsCount}</p>
                </div>
            </div>

            {/* Tabla de Pedidos Recientes */}
            <div className="mt-8 rounded-lg bg-white p-4 shadow">
                <h2 className="mb-4 text-lg font-semibold">Pedidos Recientes</h2>
                <div className="overflow-x-auto">
                    <Table>
                        <TableCaption>Lista de todas las ordenes</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID del Pedido</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.created_at}</TableCell>
                                    <TableCell>S/. {parseFloat(order.total).toFixed(2)}</TableCell>
                                    <TableCell>{order.state}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline"
                                                        onClick={() => setSelectedOrder(order)}>Ver
                                                    Detalles</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Detalles del Pedido
                                                        - {selectedOrder?.id}</DialogTitle>
                                                    <DialogDescription>
                                                        Pedido el {selectedOrder?.created_at}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div>
                                                    <p>
                                                                        <span
                                                                            className="font-semibold">Ciudad:</span> {selectedOrder?.city}
                                                    </p>
                                                    <p>
                                                                        <span
                                                                            className="font-semibold">Dirección:</span> {selectedOrder?.address}
                                                    </p>
                                                    <p>
                                                                        <span
                                                                            className="font-semibold">Departamento:</span> {selectedOrder?.department}
                                                    </p>
                                                    <p>
                                                                        <span
                                                                            className="font-semibold">Código Postal:</span> {selectedOrder?.postal_code}
                                                    </p>
                                                    <p>
                                                                        <span
                                                                            className="font-semibold">Metodo de pago:</span> {selectedOrder?.payment_method=='credit_card'?'Tarjeta de Crédito':'Paypal'}
                                                    </p>
                                                </div>
                                                <div className="py-4">
                                                    <h4 className="font-semibold mb-2">Artículos:</h4>
                                                    {selectedOrder?.details.map((detail) => (
                                                        <div key={detail.id}
                                                             className="flex justify-between mb-2">
                                                            <span>{detail.product_name} x {detail.quantity}</span>
                                                            <span>S/. {(detail.unit_price * detail.quantity).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                    <div
                                                        className="flex justify-between font-semibold mt-4">
                                                        <span>Total:</span>
                                                        <span>S/. {parseFloat(selectedOrder?.total).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
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