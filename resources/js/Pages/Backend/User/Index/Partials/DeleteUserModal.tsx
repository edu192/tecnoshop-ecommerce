import React from 'react';
import {router} from "@inertiajs/react";
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
import UserData = App.Data.UserData;

type DeleteUserModalProps = {
    deleteModalState: { user: UserData | null, isOpen: boolean }
    setDeleteModalState: React.Dispatch<React.SetStateAction<{ user: UserData | null, isOpen: boolean }>>
};

const DeleteUserModal = ({deleteModalState, setDeleteModalState}: DeleteUserModalProps) => {
    const handleDelete = () => {
        router.delete(route('mantenimiento.users.destroy', {user:deleteModalState.user}), {
            onSuccess: () => {
                setDeleteModalState(prev => ({user: null, isOpen: false}))
            }
        })
    }
    return (
        <AlertDialog open={deleteModalState.isOpen}
                     onOpenChange={(val) => setDeleteModalState(prev => ({...prev, isOpen: val}))}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro de borrar este usuario?
                        ID: {deleteModalState.user?.id}</AlertDialogTitle>
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

export default DeleteUserModal;