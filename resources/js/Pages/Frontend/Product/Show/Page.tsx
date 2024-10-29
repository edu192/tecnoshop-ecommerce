import {useState} from 'react';
import {Button} from "@/shadcn-ui/button";
import {Card, CardContent} from "@/shadcn-ui/card";
import {Textarea} from "@/shadcn-ui/textarea";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shadcn-ui/table";
import {Minus, Plus, Star} from 'lucide-react';
import FrontendLayout from "@/Layouts/FrontendLayout";
import {useCartStore} from "@/store/store";

const StarRating = () => {
    const [rating, setRating] = useState(0);
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

// Datos de producto de ejemplo
const product = {
    brand: "TechGear",
    name: "Televisor Inteligente Ultra HD",
    code: "TG-TV-55UHD",
    realPrice: 999.99,
    discountedPrice: 799.99,
    description: "Experimenta una impresionante resolución 4K y funciones inteligentes con nuestro último televisor inteligente Ultra HD. Perfecto para noches de cine y sesiones de juego.",
    rating: 4.5,
    images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
    ],
    specifications: [
        {name: "Tamaño de Pantalla", value: "55 pulgadas"},
        {name: "Resolución", value: "3840 x 2160 (4K)"},
        {name: "HDR", value: "Sí, HDR10+"},
        {name: "Televisor Inteligente", value: "Sí, con Wi-Fi integrado"},
        {name: "Frecuencia de Actualización", value: "120Hz"},
        {name: "Puertos HDMI", value: "4"},
        {name: "Puertos USB", value: "3"},
    ],

};
const comments = [
    {id: 1, user: "John D.", rating: 5, comment: "¡Excelente calidad de imagen y fácil de configurar!"},
    {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        comment: "Gran televisor, pero las funciones inteligentes podrían ser más intuitivas."
    },
]
export default function ProductPage({product}: { product: App.Data.ProductData }) {
    const [mainImage, setMainImage] = useState(product.image);
    const quantity=useCartStore().items.find(item => item.id === product.id)?.quantity;
    const {addProduct, removeProduct, clearProduct, items: cartItems} = useCartStore();

    const renderStars = (rating: number, interactive: boolean = false) => {
        return interactive ? (
            <StarRating/>
        ) : (
            <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                    <Star key={i}
                          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
                ))}
            </div>
        );
    };

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
                            <span className="ml-2 text-gray-600">({5})</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600 mb-2">${product.price.toFixed(2)}</p>
                        <p className="text-xl text-gray-500 line-through mb-4">S/. 99999</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        <div className="flex items-center space-x-4 mb-6">
                            {isInCart ? (
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
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Especificaciones del Producto</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3">Especificación</TableHead>
                                <TableHead>Valor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/*{product.specifications.map((spec, index) => (*/}
                            {/*    <TableRow key={index}>*/}
                            {/*        <TableCell className="font-medium">{spec.name}</TableCell>*/}
                            {/*        <TableCell>{spec.value}</TableCell>*/}
                            {/*    </TableRow>*/}
                            {/*))}*/}
                            <TableRow >
                                <TableCell className="font-medium">Color</TableCell>
                                <TableCell>Rojo</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
                            <Textarea placeholder="Escribe tu reseña aquí..." className="mb-4"/>
                            <Button>Enviar Reseña</Button>
                        </CardContent>
                    </Card>
                    {comments.map((comment) => (
                        <Card key={comment.id} className="mb-4">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold mr-2">{comment.user}</span>
                                    <div className="flex">
                                        {renderStars(comment.rating)}
                                    </div>
                                </div>
                                <p>{comment.comment}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </FrontendLayout>
    );
}