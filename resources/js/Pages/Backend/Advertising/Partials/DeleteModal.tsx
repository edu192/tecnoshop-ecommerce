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
import AdvertisingData = App.Data.AdvertisingData;

type DeleteModalProps = {
    deleteModalState: {
        isOpen: boolean,
        advertising: AdvertisingData | null,
    },
    setDeleteModalState: React.Dispatch<React.SetStateAction<{ isOpen: boolean, advertising: AdvertisingData | null }>>,
};

const DeleteModal = ({deleteModalState, setDeleteModalState}: DeleteModalProps) => {
    const handleSubmit = () => {
        router.delete(route('mantenimiento.advertising.delete', {advertising: deleteModalState.advertising}),)
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={v => setDeleteModalState(prev => ({...prev, isOpen: v}))}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta accion no se puede deshacer. Esta publicidad sera eliminada permanentemente.
                        <br/>
                        ID de la publicidad: {deleteModalState.advertising?.id}
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