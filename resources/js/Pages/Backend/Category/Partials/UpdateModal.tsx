import React, {useEffect} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {Textarea} from "@/shadcn-ui/textarea";
import {useForm} from "@inertiajs/react";
import CategoryData = App.Data.CategoryData;

type UpdateModalProps = {
    updateModalState: {
        category: CategoryData | null,
        isOpen: boolean
    };
    setUpdateModalState: React.Dispatch<React.SetStateAction<{ category: CategoryData | null, isOpen: boolean }>>
};

const UpdateModal = ({updateModalState, setUpdateModalState}: UpdateModalProps) => {
    const {data, setData, errors, post, reset, clearErrors} = useForm({
        name: updateModalState.category?.name || '',
        description: updateModalState.category?.description || '',
        image: null,
    });
    const handleSubmit = () => {
        post(route('mantenimiento.category.update', {category: updateModalState.category?.id}), {
            onSuccess: () => {
                setUpdateModalState(prev => ({category: null, isOpen: false}));
            }
        });
    };
    useEffect(() => {
        if (updateModalState.category) {
            // @ts-ignore
            setData({
                name: updateModalState.category.name ,
                description: updateModalState.category.description,
                image: null,
            });
        } else {
            reset();
        }
    }, [updateModalState.isOpen]);
    return (
        <Dialog open={updateModalState.isOpen}
                onOpenChange={v => setUpdateModalState(prevState => ({category: null, isOpen: false}))}>
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
                        {updateModalState.category?.image && (
                            <div>Tiene imagen</div>
                        )}
                        <Input
                            type="file"
                            id="image"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        />
                        {errors.image && <p className="text-red-500">{errors.image}</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Actualizar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateModal;