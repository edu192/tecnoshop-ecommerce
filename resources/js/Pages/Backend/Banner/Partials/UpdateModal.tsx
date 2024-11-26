import React, {useEffect} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Button} from "@/shadcn-ui/button";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {useForm} from "@inertiajs/react";
import BannerData = App.Data.BannerData;

type UpdateModalProps = {
    updateModalState: {
        isOpen: boolean;
        banner: BannerData | null
    }
    setUpdateModalState: React.Dispatch<React.SetStateAction<{ isOpen: boolean; banner: BannerData | null }>>
};

const UpdateModal = ({updateModalState, setUpdateModalState}: UpdateModalProps) => {
    const {data, setData, errors, clearErrors, reset, post} = useForm({
        name: '',
        link: '',
        image: null
    });
    useEffect(() => {
        if (updateModalState.banner) {
            setData({
                name: updateModalState.banner.name,
                link: updateModalState.banner.link,
                image: null
            })
        } else {
            reset()
        }
    }, [updateModalState.isOpen]);
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('mantenimiento.banner.update', updateModalState.banner?.id), {
            onSuccess: () => {
                reset()
                clearErrors()
                setUpdateModalState(prev => ({...prev, isOpen: false}))
            }
        })
    }
    return (
        <Dialog open={updateModalState.isOpen} onOpenChange={v => setUpdateModalState(prev => ({...prev, isOpen: v}))}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Banner : {updateModalState.banner?.id}</DialogTitle>
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
                    <Button className="w-full mt-4" type='submit'>Guardar Banner</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateModal;