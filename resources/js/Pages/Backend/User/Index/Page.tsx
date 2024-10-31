import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Button} from "@/shadcn-ui/button";
import {Pen, Trash2} from "lucide-react";
import {Input} from "@/shadcn-ui/input";
import CreateUserModal from "@/Pages/Backend/User/Index/Partials/CreateUserModal";
import UpdateUserModal from "@/Pages/Backend/User/Index/Partials/UpdateUserModal";
import DeleteUserModal from "@/Pages/Backend/User/Index/Partials/DeleteUserModal";
import {router} from "@inertiajs/react";
import UserData = App.Data.UserData;

type PageProps = {};

const Page = ({users}: { users: UserData[] }) => {
    const [createUserDialog, setCreateUserDialog] = useState(false)
    const [updateUserDialog, setUpdateUserDialog] = useState<{
        user: UserData | null,
        isOpen: boolean
    }>({user: null, isOpen: false})
    const [deleteUserDialog, setDeleteUserDialog] = useState<{
        user: UserData | null,
        isOpen: boolean
    }>({user: null, isOpen: false})
    const [searchValue, setSearchValue] = useState('')
    const handleOpenUpdateModal = (user: UserData) => {
        setUpdateUserDialog({user, isOpen: true})
    }
    const handleOpenDeleteModal = (user: UserData) => {
        setDeleteUserDialog({user, isOpen: true})
    }
    const handleSearch = () => {
        router.visit(route('mantenimiento.users.index', {'filter[name]': searchValue}))
    }
    return (
        <BackendLayout pageName='Usuarios'>
            <div className="p-6 bg-white rounded-lg shadow">
                <CreateUserModal openState={createUserDialog} setOpenState={setCreateUserDialog}/>
                <UpdateUserModal updateModalState={updateUserDialog} setUpdateModalState={setUpdateUserDialog}/>
                <DeleteUserModal deleteModalState={deleteUserDialog} setDeleteModalState={setDeleteUserDialog}/>
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div className='flex justify-end pb-6'>
                    <Button onClick={() => setCreateUserDialog(true)}>Crear Usuario</Button>
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
                                            <Button variant="outline" onClick={() => handleOpenUpdateModal(user)}>
                                                <Pen/> </Button>
                                            <Button variant="outline" onClick={() => handleOpenDeleteModal(user)}>
                                                <Trash2/> </Button>
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