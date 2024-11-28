import React, {useEffect, useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Pen} from "lucide-react";
import {router, usePage} from "@inertiajs/react";
import {Input} from "@/shadcn-ui/input";
import {toast} from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shadcn-ui/pagination";
import {PaginatedModelData} from "@/types";
import OrderData = App.Data.OrderData;
import dayjs from "dayjs";
const Page = ({paginated_collection: {paginated_data, meta, links}}: {
    paginated_collection: PaginatedModelData<OrderData>
}) => {

    const {props: {flash}} = usePage()
    const [detailsDialog, setDetailsDialog] = useState<{ order: OrderData | null, isOpen: boolean }>({
        order: null,
        isOpen: false
    });
    const [updateDialog, setUpdateDialog] = useState<{ order: OrderData | null, isOpen: boolean }>({
        order: null,
        isOpen: false
    });
    const [selectedState, setSelectedState] = useState<string>('');
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (updateDialog.order) {
            setSelectedState(updateDialog.order.state);
        }
    }, [updateDialog.order]);

    const openDetailsDialog = (order: OrderData) => {
        setDetailsDialog({order, isOpen: true});
    };

    const openUpdateDialog = (order: OrderData) => {
        setUpdateDialog({order, isOpen: true});
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
    };
    const handleUpdateOrder = () => {
        if (updateDialog.order) {
            router.post(route('mantenimiento.orders.update', updateDialog.order.id), {
                state: selectedState
            }, {
                onSuccess: () => {
                    setUpdateDialog({order: null, isOpen: false});
                }
            });
        }
    }
    const handleSearch = () => {
        router.visit(route('mantenimiento.orders.index', {'filter[id]': searchValue}));
    }
    useEffect(() => {
        if (flash) {
            toast[flash?.type](flash?.body);
        }
    }, [flash])
    return (
        <BackendLayout pageName='Ordenes'>
            <div className="p-6 bg-white rounded-lg shadow">
                <Dialog open={detailsDialog.isOpen}
                        onOpenChange={val => setDetailsDialog({order: null, isOpen: val})}>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Detalles del Pedido - {detailsDialog.order?.id}</DialogTitle>
                            <DialogDescription>Pedido el {dayjs(detailsDialog.order?.created_at).format('DD/MM/YYYY')} {dayjs(detailsDialog.order?.created_at).diff(detailsDialog.order?.updated_at,"day")}</DialogDescription>
                        </DialogHeader>
                        <div>
                            <p><span className="font-semibold">Ciudad:</span> {detailsDialog.order?.city}</p>
                            <p><span className="font-semibold">Dirección:</span> {detailsDialog.order?.address}</p>
                            <p><span className="font-semibold">Departamento:</span> {detailsDialog.order?.department}
                            </p>
                            <p><span className="font-semibold">Código Postal:</span> {detailsDialog.order?.postal_code}
                            </p>
                            <p><span
                                className="font-semibold">Metodo de pago:</span> {detailsDialog.order?.payment_method === 'credit_card' ? 'Tarjeta de Crédito' : 'Paypal'}
                            </p>
                        </div>
                        <div className="py-4">
                            <h4 className="font-semibold mb-2">Artículos:</h4>
                            {detailsDialog.order?.details?.map((detail) => (
                                <div key={detail.id} className="flex justify-between mb-2">
                                    <span>{detail.product_name} x {detail.quantity}</span>
                                    <span>S/. {(detail.unit_price * detail.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-semibold mt-4">
                                <span>Total:</span>
                                <span>S/. {parseFloat(detailsDialog.order?.total as string).toFixed(2)}</span>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog open={updateDialog.isOpen}
                        onOpenChange={val => setUpdateDialog({order: null, isOpen: val})}>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Estado del pedido - {updateDialog.order?.id}</DialogTitle>
                            <DialogDescription>Pedido el {updateDialog.order?.created_at}</DialogDescription>
                        </DialogHeader>
                        <div>
                            <select name="state" id="state" className="w-full" value={selectedState}
                                    onChange={handleStateChange}>
                                <option value="en_proceso">En proceso</option>
                                <option value="completado">Completado</option>
                            </select>
                            <Button className='w-full' onClick={handleUpdateOrder}>Actualizar</Button>
                        </div>
                        <div className="py-4"></div>
                    </DialogContent>
                </Dialog>
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar id' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
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
                            {paginated_data.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{dayjs(order.created_at).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>S/. {order.total}</TableCell>
                                    <TableCell className="text-right">{order.state}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='inline-flex gap-2'>
                                            <Button variant="outline" onClick={() => openDetailsDialog(order)}>Ver
                                                Detalles</Button>
                                            <Button variant="outline" onClick={() => openUpdateDialog(order)}> <Pen/>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination>
                    <PaginationContent>
                        {links.length > 0 && (
                            <PaginationItem>
                                <PaginationPrevious href={links[0].url || '#'}/>
                            </PaginationItem>
                        )}
                        {links.slice(1, -1).map((link, index) => (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis/>
                                )}
                            </PaginationItem>
                        ))}
                        {links.length > 1 && (
                            <PaginationItem>
                                <PaginationNext href={links[links.length - 1].url || '#'}/>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </BackendLayout>
    );
};

export default Page;