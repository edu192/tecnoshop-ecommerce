import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn-ui/table"
import {Button} from "@/shadcn-ui/button";
import {Pen} from "lucide-react";
import OrderData = App.Data.OrderData;
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";

type PageProps = {};
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
const Page = ({orders}: { orders: OrderData[] }) => {
    const [selectedOrder, setSelectedOrder] = useState<null|OrderData>(null)
    return (
        <BackendLayout pageName='Ordenes'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6'>

                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las ordenes del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID Pedido</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.created_at}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                    <TableCell className="text-right">{order.state}</TableCell>
                                    <TableCell className="text-right">
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