import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal} from "lucide-react";
import {PaginatedModelData} from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shadcn-ui/pagination";
import {router} from "@inertiajs/react";
import CreateModal from "@/Pages/Backend/Category/Partials/CreateModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import UpdateModal from "@/Pages/Backend/Category/Partials/UpdateModal";
import DeleteModal from "@/Pages/Backend/Category/Partials/DeleteModal";
import CategoryData = App.Data.CategoryData;

type PageProps = {
    paginated_collection: PaginatedModelData<CategoryData>
};

const Page = ({paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [searchValue, setSearchValue] = useState('')
    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState<{
        category: CategoryData | null
        isOpen: boolean,
    }>({
        category: null,
        isOpen: false
    })
    const [deleteModal, setDeleteModal] = useState<{
        category: CategoryData | null
        isOpen: boolean
    }>({
        category: null,
        isOpen: false
    })
    const handleSearch = () => {
        router.visit(route('mantenimiento.category.index', {'filter[name]': searchValue}))
    }
    return (
        <BackendLayout pageName="Categorias">
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre de categoria' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <UpdateModal updateModalState={updateModal} setUpdateModalState={setUpdateModal}/>
                    <CreateModal openState={createModal} setOpenState={setCreateModal}/>
                    <DeleteModal deleteModalState={deleteModal} setDeleteModalState={setDeleteModal}/>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripcion</TableHead>
                                <TableHead>Cantidad de productos</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>{category.products_count}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => setUpdateModal(prevState => ({
                                                        category,
                                                        isOpen: true
                                                    }))}>
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setDeleteModal(prev => ({
                                                            isOpen: true,
                                                            category
                                                        }))}>
                                                        Eliminar
                                                    </DropdownMenuItem>
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