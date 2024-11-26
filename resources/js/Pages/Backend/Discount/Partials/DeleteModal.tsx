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
import DiscountGroupData = App.Data.DiscountGroupData;

type DeleteModalProps = {
    deleteModalState: {
        isOpen: boolean,
        discount_group: DiscountGroupData | null,
    },
    setDeleteModalState: React.Dispatch<React.SetStateAction<{
        isOpen: boolean,
        discount_group: DiscountGroupData | null
    }>>,
};

const DeleteModal = ({deleteModalState, setDeleteModalState}: DeleteModalProps) => {
    const handleSubmit = () => {
        router.delete(route('mantenimiento.discount.delete', {discountGroup: deleteModalState.discount_group}),)
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={v => setDeleteModalState(prev => ({...prev, isOpen: v}))}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion no se puede deshacer. Este grupo de descuento sera eliminado sera eliminada
                        permanentemente.
                        <br/>
                        ID de grupo de descuento: {deleteModalState.discount_group?.id}
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