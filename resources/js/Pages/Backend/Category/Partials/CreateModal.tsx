import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {Textarea} from "@/shadcn-ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/shadcn-ui/select";
import {useForm} from "@inertiajs/react";

type CreateModalProps = {
    openState: boolean;
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateModal = ({openState, setOpenState}: CreateModalProps) => {
    const {data, setData, errors, post, reset, clearErrors} = useForm({
        name: '',
        description: '',
        image: '',
    });
    const handleSubmit = () => {
        post(route('mantenimiento.category.store'), {
            onSuccess: () => {
                setOpenState(false);
            }
        });
    };
    return (
        <Dialog open={openState} onOpenChange={setOpenState}>
            <DialogTrigger asChild>
                <Button>Crear categoria</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear producto</DialogTitle>
                    <DialogDescription>
                        Crear un producto y almacenarlo en la base de datos
                    </DialogDescription>
                </DialogHeader>
                <div className="grid  gap-4 py-2">
                    <div className="items-center">
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
                </div>
                <div className="grid  gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="description" className="text-right">
                            Descripcion
                        </Label>
                        <Textarea id='description' value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}/>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 py-2">
                    <div className="col-span-2 items-center">
                        <Label htmlFor="image" className="text-right">
                            Imagen
                        </Label>
                        <Input
                            type="file"
                            id="image"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Crear</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;