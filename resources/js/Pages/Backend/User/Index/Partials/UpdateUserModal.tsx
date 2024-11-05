import React, {useEffect} from 'react';
import {useForm} from "@inertiajs/react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/shadcn-ui/select";
import {Button} from "@/shadcn-ui/button";
import UserData = App.Data.UserData;

type UpdateUserModalProps = {
    updateModalState: { user: UserData | null, isOpen: boolean }
    setUpdateModalState: React.Dispatch<React.SetStateAction<{ user: UserData | null, isOpen: boolean }>>
};

const UpdateUserModal = ({updateModalState, setUpdateModalState}: UpdateUserModalProps) => {
    const {data, setData, post, processing, errors, reset,clearErrors} = useForm({
        name: '',
        email: '',
        type: '',
        password: '',
    })
    useEffect(() => {
        setData({
            name: updateModalState.user?.name,
            email: updateModalState.user?.email,
            type: updateModalState.user?.type,
            password: ''
        });
        clearErrors()
    }, [updateModalState.isOpen]);
    const handleSubmit = () => {
        post(route('mantenimiento.users.update',{user:updateModalState.user}), {
            onSuccess: () => {
                setUpdateModalState({user: null, isOpen: false})
                reset()
            }
        })
    }
    return (
        <Dialog open={updateModalState.isOpen}
                onOpenChange={val => setUpdateModalState(prev => ({...prev, isOpen: val}))}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar usuario - {updateModalState.user?.id}</DialogTitle>
                    <DialogDescription>
                        Actualizar un usuario y guardar los cambios en la base de datos
                    </DialogDescription>
                </DialogHeader>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className=" items-center">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div className="items-center">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="password" className="text-right">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            className="col-span-3"
                            type='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="type" className="text-right">
                            Rol
                        </Label>
                        <Select value={data.type} onValueChange={(e) => setData('type', e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un rol"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value="user">Usuario</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-red-500">{errors.type}</p>}
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateUserModal;