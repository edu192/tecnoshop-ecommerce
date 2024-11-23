import React from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {router} from "@inertiajs/react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import BackendLayout from "@/Layouts/BackendLayout";
import {Checkbox} from "@/shadcn-ui/checkbox";
import UserData = App.Data.UserData;
import {Label} from "@/shadcn-ui/label";
import {Textarea} from "@/shadcn-ui/textarea";
import {Eye} from "lucide-react";

type PageProps = { users: UserData[] };

const Page = ({users}: PageProps) => {
    const filteredUsers = users.slice(0, 10);
    return (
        <BackendLayout pageName='Crear Publicidad'>
            <div className="p-6 bg-white rounded-lg shadow">

                <div>
                    <form className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="product">Mensaje</Label>
                                <Textarea
                                />
                            </div>
                            <div>
                                <Label htmlFor="product">Imagen</Label>
                                <Input type='file'/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-start pb-6 mt-4 '>
                    <Input placeholder='Buscar por id de publicidad' className='w-1/6'/>
                    <Button>Buscar</Button>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <Checkbox/>
                                </TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <div className='flex justify-end'>
                        <Button>Enviar</Button>
                    </div>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;