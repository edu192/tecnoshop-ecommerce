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
import ReviewData = App.Data.ReviewData;
import ProductData = App.Data.ProductData;

type DeleteModalProps = {
    deleteModalState: {
        isOpen: boolean,
        review: ReviewData | null,
    },
    setDeleteModalState: React.Dispatch<React.SetStateAction<{
        review: ReviewData | null,
        isOpen: boolean,
    }>>,
    product: ProductData
};

const DeleteModal = ({deleteModalState, setDeleteModalState,product}: DeleteModalProps) => {
    const handleSubmit = () => {
        router.delete(route('mantenimiento.review.delete', {
            review: deleteModalState.review?.id,
            product: product.id
        }))
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={v => setDeleteModalState(prev => ({...prev, isOpen: v}))}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro de querer borrar esta reseña?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion no se puede deshacer.
                        <br/>
                        ID de la reseña: {deleteModalState.review?.id}
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