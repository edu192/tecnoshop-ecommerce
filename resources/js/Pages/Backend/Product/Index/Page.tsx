import React, {useEffect, useState} from 'react';
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import DiscountsModal from "@/Pages/Backend/Product/Index/Partials/DiscountsModal";
import CreateProductModal from "@/Pages/Backend/Product/Index/Partials/CreateProductModal";
import DeleteModal from "@/Pages/Backend/Product/Index/Partials/DeleteModal";
import UpdateModal from "@/Pages/Backend/Product/Index/Partials/UpdateModal";
import {router, usePage} from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {toast} from "sonner";
import {PaginatedModelData} from "@/types";
import ProductData = App.Data.ProductData;
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/shadcn-ui/pagination";
import CategoryData = App.Data.CategoryData;

type PageProps = {};

const Page = ({paginated_collection: {paginated_data, meta, links},categories}: {
    paginated_collection: PaginatedModelData<ProductData>,categories:CategoryData[]
}) => {

    const {props: {flash}} = usePage()
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
    useEffect(() => {
        if (flash) {
            toast[flash?.type](flash?.body);
        }
    }, [flash])
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
                    <CreateProductModal categories={categories} openState={createModalIsOpen} setOpenState={setCreateModalIsOpen}/>

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
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>S/. {product.price}</TableCell>
                                    <TableCell className="text-center">
                                        <div className='inline-flex justify-center'>
                                            <DropdownMenu modal={false}>

                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => {
                                                        router.visit(route('mantenimiento.stock.index', {product: product}))
                                                    }}>
                                                        Ver lotes
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        router.visit(route('mantenimiento.review.index', {product: product}))
                                                    }}>
                                                        Ver reseñas
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        router.visit(route('product.show', {product: product}))
                                                    }}>
                                                        Ver producto
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openDiscountsDialog(product)}>
                                                        Ver descuentos
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => openUpdateDialog(product)}>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => openDeleteDialog(product)}>Eliminar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination>
                    <PaginationContent>
                        {links.length > 0 && (
                            <PaginationItem>
                                <PaginationPrevious href={links[0].url || '#'}/>
                            </PaginationItem>
                        )}
                        {links.slice(1, -1).map((link, index) => (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis/>
                                )}
                            </PaginationItem>
                        ))}
                        {links.length > 1 && (
                            <PaginationItem>
                                <PaginationNext href={links[links.length - 1].url || '#'}/>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </BackendLayout>
    );
};

export default Page;