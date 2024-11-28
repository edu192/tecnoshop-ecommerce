import React, {useEffect, useState} from 'react';
import {Input} from "@/shadcn-ui/input";
import {Button} from "@/shadcn-ui/button";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import BackendLayout from "@/Layouts/BackendLayout";
import {Checkbox} from "@/shadcn-ui/checkbox";
import {Label} from "@/shadcn-ui/label";
import {Textarea} from "@/shadcn-ui/textarea";
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
import {router, useForm, usePage} from "@inertiajs/react";
import UserData = App.Data.UserData;

type PageProps = {
    paginated_collection: PaginatedModelData<UserData>
};


const Page = ({paginated_collection: {paginated_data, meta, links}}: PageProps) => {
    const [users, setUsers] = useState(
        paginated_data.map(user => ({
            ...user,
            selected: false
        }))
    );
    const [searchValue, setSearchValue] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const {data, setData, clearErrors, reset} = useForm({
        message: '',
        image: null,
        users: [] as number[],
        product: 0,
        name:''
    });
    const {props: {errors}} = usePage();

    useEffect(() => {
        const savedUsers = localStorage.getItem('selectedUsers');
        const savedSelectAll = localStorage.getItem('selectAll');
        if (savedUsers) {
            const parsedUsers = JSON.parse(savedUsers);
            setUsers(users.map(user => ({
                ...user,
                selected: parsedUsers.includes(user.id)
            })));
            setData('users', parsedUsers);
        }
        if (savedSelectAll) {
            const isSelectAll = JSON.parse(savedSelectAll);
            setSelectAll(isSelectAll);
            if (isSelectAll) {
                const allUserIds = users.map(user => user.id);
                setUsers(users.map(user => ({
                    ...user,
                    selected: true
                })));
                setData('users', allUserIds);
            }
        }
    }, [paginated_data]);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        const updatedUsers = users.map(user =>
            user.id === id ? {...user, selected: checked} : user
        );
        setUsers(updatedUsers);
        const selectedUserIds = updatedUsers.filter(user => user.selected).map(user => user.id);
        setData('users', selectedUserIds);
        localStorage.setItem('selectedUsers', JSON.stringify(selectedUserIds));
    };

    const handleSelectAllChange = (checked: boolean | string) => {
        const isChecked = Boolean(checked);
        const updatedUsers = users.map(user => ({
            ...user,
            selected: isChecked
        }));
        setUsers(updatedUsers);
        setSelectAll(isChecked);
        const selectedUserIds = isChecked ? updatedUsers.map(user => user.id) : [];
        setData('users', selectedUserIds);
        localStorage.setItem('selectedUsers', JSON.stringify(selectedUserIds));
        localStorage.setItem('selectAll', JSON.stringify(isChecked));
    };

    const handleSearch = () => {
        router.visit(route('mantenimiento.advertising.create', {'filter[email]': searchValue}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('mantenimiento.advertising.store'), {
            ...data,
            allUsersSelected: selectAll,
        }, {
            onSuccess: () => {
                setUsers(users.map(user => ({ ...user, selected: false })));
                setSelectAll(false);
                setData('users', []);
                localStorage.removeItem('selectedUsers');
                localStorage.removeItem('selectAll');
            }
        });
    };

    return (
        <BackendLayout pageName='Crear Publicidad'>
            <div className="p-6 bg-white rounded-lg shadow">
                <div>
                    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs ">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="message">Product(ID)</Label>
                                <Input
                                    id="product"
                                    value={data.product}
                                    onChange={(e) => setData('product', e.target.value)}
                                />
                                {errors.product && (
                                    <p className="text-red-500 text-xs ">{errors.product}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="message">Mensaje</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs ">{errors.message}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="image">Imagen</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-xs ">{errors.image}</p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-start pb-6 mt-4 '>
                    <Input placeholder='Buscar por id de publicidad' className='w-1/6' value={searchValue}
                           onChange={e => setSearchValue(e.target.value)}/>
                    <Button onClick={handleSearch}>Buscar</Button>
                </div>
                <div>
                    {errors.users && (
                        <p className="text-red-500 text-xs ">{errors.users}</p>
                    )}
                    <Table>
                        <TableCaption>Lista de todas las entradas de productos del sistema.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    <Checkbox
                                        checked={selectAll}
                                        onCheckedChange={(checked) => handleSelectAllChange(checked)}
                                    />
                                </TableHead>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <Checkbox
                                            checked={user.selected}
                                            onCheckedChange={(checked) => handleCheckboxChange(user.id, checked)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
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
                    <div className='flex justify-end'>
                        <Button onClick={handleSubmit}>Enviar</Button>
                    </div>
                </div>
            </div>
        </BackendLayout>
    );
};

export default Page;