import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/shadcn-ui/alert-dialog";
import {router} from "@inertiajs/react";
import ProductData = App.Data.ProductData;

type DeleteModalProps = {
    deleteModalState: { product: ProductData | null, isOpen: boolean }
    setDeleteModalState: React.Dispatch<React.SetStateAction<{ product: ProductData | null, isOpen: boolean }>>
};

const DeleteModal = ({deleteModalState, setDeleteModalState}: DeleteModalProps) => {
    const handleDelete = () => {
        router.delete(route('mantenimiento.products.destroy', {product: deleteModalState.product?.id}),  {
            onSuccess: () => {
                setDeleteModalState(prev => ({product: null, isOpen: false}))
            }
        })
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={(val) => setDeleteModalState(prev => ({...prev, isOpen: val}))}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro de borrar este producto?
                        ID: {deleteModalState.product?.id}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion es irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteModal;