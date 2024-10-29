import React, {useState} from 'react'
import {Button} from "@/shadcn-ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shadcn-ui/card"
import {Input} from "@/shadcn-ui/input"
import {Label} from "@/shadcn-ui/label"
import {RadioGroup, RadioGroupItem} from "@/shadcn-ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcn-ui/select"
import {Separator} from "@/shadcn-ui/separator"
import {useCartStore} from "@/store/store"
import {router} from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";

export default function CheckoutPage() {
    const cartItems = useCartStore(state => state.items)
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        department: '',
        postal_code: '',
    })
    const [paymentMethod, setPaymentMethod] = useState('credit_card')
    const {clearCart} = useCartStore()

    const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo({...shippingInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Pedido enviado', {shippingInfo, paymentMethod, cartItems})
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

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 10 // Tarifa plana de envío para este ejemplo
    const total = subtotal + shipping

    return (
        <FrontendLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
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
                                    </div>
                                    <div>
                                        <Label htmlFor="city">Ciudad</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleShippingInfoChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Departamento</Label>
                                        <Select name="country" onValueChange={(value) => setShippingInfo({
                                            ...shippingInfo,
                                            department: value
                                        })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar departamento"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Lima">Lima</SelectItem>
                                                <SelectItem value="Arequipa">Arequipa</SelectItem>
                                                <SelectItem value="Cusco">Cusco</SelectItem>
                                                <SelectItem value="Puno">Puno</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="postal_code">Código Postal</Label>
                                        <Input
                                            id="postal_code"
                                            name="postal_code"
                                            value={shippingInfo.postal_code}
                                            onChange={handleShippingInfoChange}
                                        />
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Método de Pago</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="credit_card" id="credit_card"/>
                                        <Label htmlFor="credit_card">Tarjeta de Crédito</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="paypal" id="paypal"/>
                                        <Label htmlFor="paypal">PayPal</Label>
                                    </div>
                                </RadioGroup>
                                {paymentMethod === 'credit_card' && (
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                                            <Input id="cardNumber" name="cardNumber"/>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                                                <Input id="expiryDate" name="expiryDate"/>
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input id="cvv" name="cvv" type='number'/>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator className="my-4"/>
                                <div className="flex justify-between py-2">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span>Envío</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <Separator className="my-4"/>
                                <div className="flex justify-between py-2 font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
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