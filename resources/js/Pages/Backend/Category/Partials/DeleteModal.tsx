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
import CategoryData = App.Data.CategoryData;

type DeleteModalProps = {
    deleteModalState: {
        category: CategoryData | null,
        isOpen: boolean
    };
    setDeleteModalState: React.Dispatch<React.SetStateAction<{ category: CategoryData | null, isOpen: boolean }>>
};

const DeleteModal = ({deleteModalState, setDeleteModalState}: DeleteModalProps) => {
    const handleSubmit = () => {
        router.delete(route('mantenimiento.category.destroy', {category: deleteModalState.category?.id}))
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={v => setDeleteModalState(prev => ({...prev, isOpen: v}))}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Existen productos que dependen de esta categoria, si la eliminas, todos los productos que
                        dependen de esta categoria seran eliminados.
                        <br/>
                        Numero de productos que dependen de esta categoria: {deleteModalState.category?.products_count}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteModal;