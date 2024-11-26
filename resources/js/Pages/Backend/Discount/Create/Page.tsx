import React,{useState,useEffect} from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import BackendLayout from "@/Layouts/BackendLayout";
import {Label} from "@/shadcn-ui/label";
import {Checkbox} from "@/shadcn-ui/checkbox";
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
import {router, useForm, usePage} from "@inertiajs/react";

type PageProps = {
    paginated_collection: PaginatedModelData<ProductData>
};

const Page = ({ paginated_collection: { paginated_data, meta, links } }: PageProps) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const { data, setData } = useForm({
        name: '',
        discount: '',
        start_date: '',
        end_date: '',
        max_uses: '',
    });
    const {props:{errors}}=usePage()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name, e.target.value);
    };

    useEffect(() => {
        const savedSelectAll = localStorage.getItem('selectAll') === 'true';
        setSelectAll(savedSelectAll);
        if (savedSelectAll) {
            setSelectedProducts(paginated_data.map(product => product.id));
        }
    }, [paginated_data]);

    const handleSelectAllChange = (checked: boolean) => {
        setSelectAll(checked);
        localStorage.setItem('selectAll', checked.toString());
        const updatedSelectedProducts = checked ? paginated_data.map(product => product.id) : [];
        setSelectedProducts(updatedSelectedProducts);
    };

    const handleProductSelectChange = (productId: number, checked: boolean) => {
        const updatedSelectedProducts = checked
            ? [...selectedProducts, productId]
            : selectedProducts.filter(id => id !== productId);
        setSelectedProducts(updatedSelectedProducts);
        setSelectAll(updatedSelectedProducts.length === paginated_data.length);
    };
    const handleSubmit=()=>{
        router.post(route('mantenimiento.discount.store'),{
            ...data,
            allProductsSelected:selectAll,
            selectedProducts
        });
    }

    return (
        <BackendLayout pageName='Crear Descuento'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div>
                    <form className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input name="name" value={data.name} onChange={handleChange} />
                                {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="discount">Valor</Label>
                                <Input name="discount" value={data.discount} onChange={handleChange} />
                                {errors.discount && <p className='text-red-500 text-xs'>{errors.discount}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="start_date">Fecha inicio</Label>
                                <Input type='date' name="start_date" value={data.start_date} onChange={handleChange} />
                                {errors.start_date && <p className='text-red-500 text-xs'>{errors.start_date}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="end_date">Fecha fin</Label>
                                <Input type='date' name="end_date" value={data.end_date} onChange={handleChange} />
                                {errors.end_date && <p className='text-red-500 text-xs'>{errors.end_date}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="max_uses">Usos Maximos</Label>
                                <Input name="max_uses" value={data.max_uses} onChange={handleChange} />
                                {errors.max_uses && <p className='text-red-500 text-xs'>{errors.max_uses}</p>}
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-start pb-6 '>
                    <Input placeholder='Buscar por id de descuento' className='w-1/6' />
                    <Button>Buscar</Button>

                </div>
                <div>
                    {errors.selectedProducts && <p className='text-red-500 text-xs block'>{errors.selectedProducts}</p>}
                </div>
                <div>
                    <Table>
                        <TableCaption>Lista de todas los descuentos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <Checkbox
                                        checked={selectAll}
                                        onCheckedChange={(checked: boolean) => handleSelectAllChange(checked)}
                                    />
                                </TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated_data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox
                                            checked={selectedProducts.includes(product.id)}
                                            onCheckedChange={(checked: boolean) => handleProductSelectChange(product.id, checked)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.stock > 0 ? 'Disponible' : 'Agotado'}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            {links.length > 0 && (
                                <PaginationItem>
                                    <PaginationPrevious href={links[0].url || '#'} />
                                </PaginationItem>
                            )}
                            {links.slice(1, -1).map((link, index) => (
                                <PaginationItem key={index}>
                                    {link.url ? (
                                        <PaginationLink href={link.url} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    ) : (
                                        <PaginationEllipsis />
                                    )}
                                </PaginationItem>
                            ))}
                            {links.length > 1 && (
                                <PaginationItem>
                                    <PaginationNext href={links[links.length - 1].url || '#'} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
                <div className='flex justify-end'>
                    <Button onClick={handleSubmit}>
                        Crear descuento
                    </Button>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;