import React, {useEffect, useState} from 'react'
import {Button} from "@/shadcn-ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shadcn-ui/card"
import {Input} from "@/shadcn-ui/input"
import {Label} from "@/shadcn-ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn-ui/select"
import {Separator} from "@/shadcn-ui/separator"
import {useCartStore} from "@/store/store"
import {router, usePage} from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import {Alert, AlertDescription, AlertTitle} from "@/shadcn-ui/alert";
import {AlertCircle} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shadcn-ui/tabs";
import FakeQR from '../../../img/yape-test-fake.png'
import DepartmentData = App.Data.DepartmentData;
import CityData = App.Data.CityData;

export default function CheckoutPage({departments, cities}: { departments: DepartmentData[], cities: CityData[] }) {
    const cartItems = useCartStore(state => state.items)
    const {errors} = usePage().props
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        department: '',
        postal_code: '',
        credit_card: '',
        expiry_date: '',
        cvv: '',
        paypal_email: ''
    })
    const [filteredCities, setFilteredCities] = useState<CityData[]>([])
    const [paymentMethod, setPaymentMethod] = useState('credit_card')
    const {clearCart} = useCartStore()

    useEffect(() => {
        if (shippingInfo.department) {
            setFilteredCities(cities.filter(city => city.department_id === parseInt(shippingInfo.department)))
        } else {
            setFilteredCities([])
        }
    }, [shippingInfo.department, cities])

    const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({...shippingInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.post(route('checkout.store'), {
                ...shippingInfo,
                cartItems: cartItems,
                payment_method: paymentMethod,
            },
            {
                onSuccess: () => {
                    clearCart()
                }
            })
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.discount ? item.price * (1 - item.discount.value / 100) : item.price
        return sum + price * item.quantity
    }, 0)
    const shipping = 10 // Tarifa plana de envío para este ejemplo
    const total = subtotal + shipping

    return (
        <FrontendLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        {errors.cartItems &&
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    El carrito esta vacio
                                </AlertDescription>
                            </Alert>
                        }
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Información de Envío</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div>
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={shippingInfo.address}
                                            onChange={handleShippingInfoChange}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="department">Departamento</Label>
                                        <Select name="department" onValueChange={(value) => setShippingInfo({
                                            ...shippingInfo,
                                            department: value
                                        })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar departamento"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.map(department => (
                                                    <SelectItem key={department.id}
                                                                value={department.id.toString()}>{department.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="city">Ciudad</Label>
                                        <Select name="city" onValueChange={(value) => setShippingInfo({
                                            ...shippingInfo,
                                            city: value
                                        })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar ciudad"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredCities.map(city => (
                                                    <SelectItem key={city.id}
                                                                value={city.id.toString()}>{city.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="postal_code">Código Postal</Label>
                                        <Input
                                            id="postal_code"
                                            name="postal_code"
                                            value={shippingInfo.postal_code}
                                            onChange={handleShippingInfoChange}
                                        />
                                        {errors.postal_code &&
                                            <p className="text-red-500 text-sm">{errors.postal_code}</p>}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Método de Pago</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <TabsList>
                                        <TabsTrigger value="credit_card">Tarjeta de Crédito</TabsTrigger>
                                        <TabsTrigger value="yape">Yape</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="credit_card">
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <Label htmlFor="credit_card">Número de Tarjeta</Label>
                                                <Input id="credit_card" name="credit_card"
                                                       onChange={handleShippingInfoChange}
                                                       value={shippingInfo.credit_card}/>
                                                {errors.credit_card &&
                                                    <p className="text-red-500 text-sm">{errors.credit_card}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="expiry_date">Fecha de Expiración</Label>
                                                    <Input id="expiry_date" name="expiry_date"
                                                           onChange={handleShippingInfoChange}
                                                           value={shippingInfo.expiry_date}/>
                                                    {errors.expiry_date &&
                                                        <p className="text-red-500 text-sm">{errors.expiry_date}</p>}
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" name="cvv" type='number'
                                                           onChange={handleShippingInfoChange}
                                                           value={shippingInfo.cvv}/>
                                                    {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="yape">
                                        <Card className="max-w-md mx-auto p-4">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-bold">Pago con Yape</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div>
                                                    <Label>Información de YAPE</Label>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Nombre: TecnoShop</span>
                                                        <span>Celular: 98986457</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="monto">Monto a Pagar</Label>
                                                    <Input id="monto" placeholder={`S/. ${total.toFixed(2)}`} disabled/>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Pasos para realizar el pago:</Label>
                                                    <ol className="list-decimal list-inside text-sm">
                                                        <li>Abre tu app de YAPE</li>
                                                        <li>Selecciona la opción "Yapear"</li>
                                                        <li>Ingresa el número 989888777</li>
                                                        <li>Ingresa el monto exacto</li>
                                                        <li>Completa la transferencia</li>
                                                    </ol>
                                                </div>
                                                <div>
                                                    <img src={FakeQR as string} alt=""/>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Resumen del Pedido</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between py-2">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>S/. {((item.discount ? item.price * (1 - item.discount.value / 100) : item.price) * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator className="my-4"/>
                                <div className="flex justify-between py-2">
                                    <span>Subtotal</span>
                                    <span>S/. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Envío</span>
                                    <span>S/. {shipping.toFixed(2)}</span>
                                </div>
                                <Separator className="my-4"/>
                                <div className="flex justify-between py-2 font-bold">
                                    <span>Total</span>
                                    <span>S/. {total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSubmit}>Realizar Pedido</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    )
}