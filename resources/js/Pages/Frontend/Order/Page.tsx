'use client'

import React, {useState} from 'react'
import {Button} from "@/shadcn-ui/button"
import {Card, CardContent, CardDescription,  CardHeader, CardTitle} from "@/shadcn-ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn-ui/tabs"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/shadcn-ui/table"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/shadcn-ui/dialog"
import FrontendLayout from "@/Layouts/FrontendLayout";
import OrderData = App.Data.OrderData;


export default function UserManagementPage({orders}:{orders:OrderData[]}) {
    const [selectedOrder, setSelectedOrder] = useState<null|OrderData>(null)

    return (
        <FrontendLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Mis Pedidos</CardTitle>
                            <CardDescription>Ver y gestionar tus pedidos</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="all">Todos los Pedidos</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    <Table>
                                        <TableCaption>Una lista de tus pedidos recientes</TableCaption>
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
                                </TabsContent>
                                <TabsContent value="processing">
                                    <p>Contenido de pedidos en proceso</p>
                                </TabsContent>
                                <TabsContent value="shipped">
                                    <p>Contenido de pedidos enviados</p>
                                </TabsContent>
                                <TabsContent value="delivered">
                                    <p>Contenido de pedidos entregados</p>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FrontendLayout>
    )
}