import React from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {Pen, Trash2} from "lucide-react";
import {Input} from "@/shadcn-ui/input";
import UserData = App.Data.UserData;

type PageProps = {};

const Page = ({users}: { users: UserData[] }) => {
    return (
        <BackendLayout pageName='Usuarios'>
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
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre o email' className='w-1/6'/>
                    <Button  >Buscar</Button>
                </div>
                <div className='flex justify-end pb-6'>
                    <Button>Crear Usuario</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todos los usuarios del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID Usuario</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Registro</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.type}</TableCell>
                                    <TableCell>{user.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='inline-flex gap-2'>
                                            <Button variant="outline">Ver mas</Button>
                                            <Button variant="outline"> <Pen/> </Button>
                                            <Button variant="outline"> <Trash2/> </Button>
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