import React from 'react';
import {useForm} from "@inertiajs/react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
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

type CreateUserModalProps = {
    openState: boolean
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
};

const CreateUserModal = ({openState, setOpenState}: CreateUserModalProps) => {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        type: '',
        password: '',
    })
    const handleSubmit = () => {
        post(route('mantenimiento.users.store'), {
            onSuccess: () => {
                setOpenState(false)
                reset()
            }
        })
    }
    return (
        <Dialog open={openState} onOpenChange={setOpenState}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear usuario</DialogTitle>
                    <DialogDescription>
                        Crear un usuario y almacenarlo en la base de datos
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
                    <Button onClick={handleSubmit}>Crear</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserModal;