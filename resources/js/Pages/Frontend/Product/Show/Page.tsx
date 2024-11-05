import React, {useState} from 'react';
import {Button} from "@/shadcn-ui/button";
import {Card, CardContent} from "@/shadcn-ui/card";
import {Textarea} from "@/shadcn-ui/textarea";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Minus, Plus, Star, X} from 'lucide-react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {useCartStore} from "@/store/store";
import {router, usePage} from "@inertiajs/react";
import {User} from "@/types";

const StarRating = ({rating, setRating}: {
    rating: number,
    setRating: React.Dispatch<React.SetStateAction<number>>
}) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            className="hidden"
                        />
                        <Star
                            className={`w-6 h-6 cursor-pointer transition-colors ${
                                ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                );
            })}
        </div>
    );
};
export default function ProductPage({product}: { product: App.Data.ProductData }) {
    const user: User | null = usePage().props.auth.user ?? null;
    const [mainImage, setMainImage] = useState(product.image);
    const quantity = useCartStore().items.find(item => item.id === product.id)?.quantity;
    const {addProduct, removeProduct, clearProduct, items: cartItems} = useCartStore();
    const [formReview, setFormReview] = useState('')
    const [formStars, setFormStars] = useState(0)
    const {errors}=usePage().props
    console.log(errors)

    const renderStars = (rating: number, interactive: boolean = false) => {
        return interactive ? (
            <StarRating rating={formStars} setRating={setFormStars}/>
        ) : (
            <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                    <Star key={i}
                          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
                ))}
            </div>
        );
    };

    const submitReview = () => {
        router.post(route('product.reviews.store', {product: product.id}), {
            comment: formReview,
            stars: formStars
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setFormReview('')
                setFormStars(0)
            }
        })
    }
    const deleteReview = (e: React.MouseEvent<HTMLButtonElement>, review_id: number) => {
        router.delete(route('product.reviews.destroy',
            {product: product.id, review: review_id}),{
            preserveScroll:true,
        })

    }

    const handleAddToCart = () => {
        addProduct(product);
    };

    const handleIncreaseQuantity = () => {
        addProduct(product);
    };

    const handleDecreaseQuantity = () => {
        removeProduct(product);
    };

    const handleRemoveFromCart = () => {
        clearProduct(product.id);
    };

    const isInCart = cartItems.some(item => item.id === product.id);

    return (
        <FrontendLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img src={mainImage} alt={product.name} className="w-full rounded-lg shadow-lg mb-4"/>
                        <div className="grid grid-cols-4 gap-2">
                            <img
                                src={product.image as string}
                                alt={`${product.name} - Imagen `}
                                className="w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
                        <p className="text-sm text-gray-500 mb-4">Código de Producto: {product.id}</p>
                        <div className="flex items-center mb-4">
                            {renderStars(5)}
                            <span className="ml-2 text-gray-600">({product.reviews.length})</span>
                        </div>
                        {product.discount ? (
                            <>
                                <div className="text-3xl font-bold text-red-600 mb-2 w-fit flex items-center">
                                    <span>S/. {(product.price * (1 - product.discount.value / 100)).toFixed(2)}</span>
                                    <span className='bg-red-500 text-white p-1 rounded text-base'>{'-'+product.discount.value+'%'}</span>
                                </div>
                                <p className="text-xl text-gray-500 line-through mb-4">S/. {product.price.toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="text-3xl font-bold text-red-600 mb-2">
                                <span>S/. {product.price.toFixed(2)}</span>
                            </p>
                        )}
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        <div className="flex items-center space-x-4 mb-6">
                            {product.stock > 0 ? (
                                isInCart ? (
                                    <div className="flex space-x-2 items-center">
                                        <Button variant='outline' onClick={(e) => {
                                            e.stopPropagation();
                                            handleDecreaseQuantity();
                                        }}>
                                            <Minus className="h-4 w-4"/>
                                        </Button>
                                        <span>{quantity}</span>
                                        <Button variant='outline' onClick={(e) => {
                                            e.stopPropagation();
                                            handleIncreaseQuantity();
                                        }}>
                                            <Plus className="h-4 w-4"/>
                                        </Button>
                                        <Button variant='destructive' className='w-full' onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFromCart();
                                        }}>
                                            Eliminar del carrito
                                        </Button>
                                    </div>
                                ) : (
                                    <Button className='w-full' onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart();
                                    }}>
                                        Añadir al carrito
                                    </Button>
                                )
                            ) : (
                                <div className="text-center text-red-600">
                                    Sin stock
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Reseñas de Clientes</h2>
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-4">Escribir una Reseña</h3>
                            <div className="flex items-center mb-4">
                                <span className="mr-2">Tu Calificación:</span>
                                {renderStars(0, true)}
                            </div>
                            <Textarea value={formReview} onChange={(e) => setFormReview(e.target.value)}
                                      placeholder="Escribe tu reseña aquí..." className="mb-4"/>
                            {errors.comment && <p className='text-red-500'>{errors.comment}</p>}
                            <Button onClick={submitReview}>Enviar Reseña</Button>
                        </CardContent>
                    </Card>
                    {product.reviews.length > 0 ? product.reviews.map((comment) => (
                        <Card key={comment.id} className="mb-4 relative">
                            {comment.user_id === user?.id &&
                                <Button onClick={(e)=>deleteReview(e,comment.id)} variant='destructive' className='absolute top-0 right-0'><X/></Button>}
                            <CardContent className="pt-6">

                                <div className="flex items-center mb-2">
                                    <span className="font-semibold mr-2">{comment.user_name}</span>
                                    <div className="flex">
                                        {renderStars(comment.stars)}
                                    </div>
                                </div>
                                <p>{comment.comment}</p>
                            </CardContent>
                        </Card>
                    )) : <p className='text-gray-500'>No hay reseñas para este producto</p>}
                </div>
            </div>
        </FrontendLayout>
    )
        ;
}