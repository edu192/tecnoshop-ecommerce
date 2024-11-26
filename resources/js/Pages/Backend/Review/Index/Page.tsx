import React, {useState} from 'react';
import BackendLayout from "@/Layouts/BackendLayout";
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
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
import DeleteModal from "@/Pages/Backend/Review/Partials/DeleteModal";
import ProductData = App.Data.ProductData;
import ReviewData = App.Data.ReviewData;

type PageProps = {
    product: ProductData;
    paginated_collection: PaginatedModelData<ReviewData>
};


const Page = ({product, paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean,
        review: ReviewData | null,
    }>({
        isOpen: false,
        review: null,
    })
    const [searchValue, setSearchValue] = useState('')
    const handleSubmit = (review: ReviewData) => {
        router.post(route('mantenimiento.review.update', {product, review}), {
            status: !review.status,
        },)
    }
    const handleSearch = () => {
        router.visit(route('mantenimiento.review.index', {product, 'filter[comment]': searchValue,}))
    }
    return (
        <BackendLayout pageName={`Reseñas de producto: ${product.name}`}>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de producto' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div>
                    <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState}
                                 product={product}/>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Valoracion</TableHead>
                                <TableHead>Comentario</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell className="font-medium">{review.id}</TableCell>
                                    <TableCell>{review.user_name}</TableCell>
                                    <TableCell>{review.stars}</TableCell>
                                    <TableCell>{review.comment}</TableCell>
                                    <TableCell>{review.status ? 'Aprobado' : 'Desaprobado'}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => handleSubmit(review)}
                                                    >{review.status ? 'Desaprobar' : 'Aprobar'}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setDeleteModalState(prev => ({
                                                        review,
                                                        isOpen: true
                                                    }))}
                                                    >Eliminar</DropdownMenuItem>
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