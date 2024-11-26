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
import BannerData = App.Data.BannerData;

type DeleteModalProps = {
    deleteModalState: {
        isOpen: boolean;
        banner: BannerData | null
    }
    setDeleteModalState: React.Dispatch<React.SetStateAction<{ isOpen: boolean; banner: BannerData | null }>>
};

const DeleteModal = ({deleteModalState, setDeleteModalState}: DeleteModalProps) => {
    const handleSubmit = () => {
        router.delete(route('mantenimiento.banner.destroy', deleteModalState.banner?.id))
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={v => setDeleteModalState(prev => ({...prev, isOpen: v}))}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion es irreversible. Una vez eliminado el banner no podra ser recuperado.
                        <br/>
                        ID banner: {deleteModalState.banner?.id}
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