import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {useForm} from "@inertiajs/react";

type CreateModalProps = {};

const CreateModal = ({}: CreateModalProps) => {
    const {data, setData, errors, clearErrors, reset, post} = useForm({
        name: "d",
        link: "",
        image: null
    });
    const [isOpen, setIsOpen] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        post(route('mantenimiento.banner.store'), {
            onSuccess: () => {
                reset()
                clearErrors()
                setIsOpen(false)
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={v => setIsOpen(v)}>
            <DialogTrigger asChild>
                <Button>Agregar Banner</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar Banner</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre Banner</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="link">Link de Productos</Label>
                        <div className="flex gap-2">
                            <Input id="link" className="flex-1" value={data.link}
                                   onChange={e => setData('link', e.target.value)}/>
                            {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}

                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Agregar Imagen</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>
                    <Button className="w-full mt-4" type={"submit"}>Guardar Banner</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;