import React from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/shadcn-ui/dialog";
import {Label} from "@/shadcn-ui/label";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";

type UpdateModalProps = {
    updateModalState: boolean,
    setUpdateModalState: (state: boolean) => void,
};

const UpdateModal = ({updateModalState, setUpdateModalState}: UpdateModalProps) => {
    return (
        <Dialog modal={true} open={updateModalState} onOpenChange={(v) => setUpdateModalState(v)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nuevo lote</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label htmlFor="product">Produto</Label>
                            <Input
                                id="product"
                                defaultValue={product.name}
                                readOnly
                                className="bg-muted"
                                disabled
                            />
                        </div>
                        <div>
                            <Label htmlFor="provider">Proveedor</Label>
                            <Input
                                id="provider"
                                value={data.provider}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label htmlFor="quantity">Cantidad</Label>
                            <Input
                                id="quantity"
                                value={data.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="price_unit">Precio Unidad</Label>
                            <Input
                                id="price_unit"
                                value={data.price_unit}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="voucher">Comprobante</Label>
                        <Input id="voucher" type='file' onChange={handleChange}/>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                    <Button type="submit">Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateModal;