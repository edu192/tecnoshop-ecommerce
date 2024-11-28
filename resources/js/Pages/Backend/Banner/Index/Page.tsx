import React, {useState} from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {MoreHorizontal} from "lucide-react";
import BackendLayout from "@/Layouts/BackendLayout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shadcn-ui/dropdown-menu";
import {PaginatedModelData} from "@/types";
import CreateModal from "@/Pages/Backend/Banner/Partials/CreateModal";
import UpdateModal from "@/Pages/Backend/Banner/Partials/UpdateModal";
import DeleteModal from "@/Pages/Backend/Banner/Partials/DeleteModal";
import BannerData = App.Data.BannerData;
import {router} from "@inertiajs/react";

type PageProps = {
    paginated_collection: PaginatedModelData<BannerData>
};

const Page = ({paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [searchValue, setSearchValue] = useState('')
    const [updateModalState, setUpdateModalState] = useState<{
        isOpen: boolean,
        banner: BannerData | null,
    }>({
        isOpen: false,
        banner: null
    })
    const [deleteModalState, setDeleteModalState] = useState<{
        isOpen: boolean,
        banner: BannerData | null,
    }>({
        isOpen: false,
        banner: null
    })
    const handleSearch = () => {
        router.visit(route('mantenimiento.banner.index', {'filter[name]': searchValue}));
    }
    return (
        <BackendLayout pageName='Banners'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por nombre' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div className='flex justify-end'>
                    <CreateModal/>
                    <UpdateModal updateModalState={updateModalState} setUpdateModalState={setUpdateModalState}/>
                    <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState}/>
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todos los banners del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Imagen</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className='text-center'>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell className="font-medium">{banner.id}</TableCell>
                                    <TableCell>{banner.name}</TableCell>
                                    <TableCell> <img src={banner.image} alt=""
                                                     className='w-32 aspect-square'/></TableCell>
                                    <TableCell>
                                        <a href={banner.link} className='text-blue-500'>{banner.link}</a>
                                    </TableCell>
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
                                                    <DropdownMenuItem onClick={() => setUpdateModalState({
                                                        isOpen: true,
                                                        banner: banner
                                                    })}>Editar banner</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setDeleteModalState(prev => ({
                                                        isOpen: true,
                                                        banner
                                                    }))}
                                                    >Borrar banner</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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