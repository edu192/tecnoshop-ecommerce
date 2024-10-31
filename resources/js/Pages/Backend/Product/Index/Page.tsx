import React, {useState} from 'react';
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Pen, Trash2} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import DiscountsModal from "@/Pages/Backend/Product/Index/Partials/DiscountsModal";
import CreateProductModal from "@/Pages/Backend/Product/Index/Partials/CreateProductModal";
import DeleteModal from "@/Pages/Backend/Product/Index/Partials/DeleteModal";
import UpdateModal from "@/Pages/Backend/Product/Index/Partials/UpdateModal";
import {router} from "@inertiajs/react";
import ProductData = App.Data.ProductData;

type PageProps = {};

const Page = ({products}: { products: ProductData[] }) => {
    const [updateDialog, setUpdateDialog] = useState<{ product: ProductData | null, isOpen: boolean }>({
        product: null,
        isOpen: false
    });
    const [deleteDialog, setDeleteDialog] = useState<{ product: ProductData | null, isOpen: boolean }>(
        {
            product: null,
            isOpen: false
        }
    )
    const [discountsDialog, setDiscountsDialog] = useState<{ product: ProductData | null, isOpen: boolean }>({
        product: null,
        isOpen: false
    });
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const openUpdateDialog = (product: ProductData) => {
        setUpdateDialog({product: product, isOpen: true});
    };
    const openDeleteDialog = (product: ProductData) => {
        setDeleteDialog({product, isOpen: true});
    }
    const openDiscountsDialog = (product: ProductData) => {
        setDiscountsDialog({product, isOpen: true});
    }
    const handleSearch = () => {
        router.visit(route('mantenimiento.products.index', {'filter[name]': searchValue}));
    }
    return (
        <BackendLayout pageName='Productos'>
            <div className="p-6 bg-white rounded-lg shadow">
                <DiscountsModal discountModalState={discountsDialog} setDiscountModalState={setDiscountsDialog}/>
                <DeleteModal deleteModalState={deleteDialog} setDeleteModalState={setDeleteDialog}/>
                <UpdateModal updateModalState={updateDialog} setUpdateModalState={setUpdateDialog}/>
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div className='flex justify-end pb-6'>
                    <CreateProductModal openState={createModalIsOpen} setOpenState={setCreateModalIsOpen}/>

                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las ordenes del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID Pedido</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category_id}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>S/. {product.price}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='inline-flex gap-2'>
                                            <Button variant="outline"
                                                    onClick={() => openDiscountsDialog(product)}>Descuentos</Button>
                                            <Button variant="outline" onClick={() => openUpdateDialog(product)}> <Pen/>
                                            </Button>
                                            <Button variant="outline" onClick={() => openDeleteDialog(product)}>
                                                <Trash2/> </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;