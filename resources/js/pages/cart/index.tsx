import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface CartItem {
    id: number;
    quantity: number;
    price: number;
    total: number;
    product: {
        id: number;
        name: string;
        images: string[];
        category: {
            name: string;
        };
    };
}

interface Props {
    cartItems: CartItem[];
    cartTotal: number;
}

export default function CartIndex({ cartItems, cartTotal }: Props) {
    const [updating, setUpdating] = useState<number | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    const updateQuantity = (cartItemId: number, quantity: number) => {
        setUpdating(cartItemId);
        router.put(`/cart/${cartItemId}`, {
            quantity: quantity
        }, {
            onFinish: () => setUpdating(null)
        });
    };

    const removeItem = (cartItemId: number) => {
        router.delete(`/cart/${cartItemId}`);
    };

    const clearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            router.delete('/cart');
        }
    };

    return (
        <>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                Kanha Furniture
                            </Link>
                            <div className="flex items-center space-x-4">
                                <Link href="/products" className="text-gray-600 hover:text-blue-600">
                                    Products
                                </Link>
                                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                                    Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
                                <p className="text-gray-600 mb-6">
                                    Looks like you haven't added any furniture to your cart yet.
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                            {/* Cart items */}
                            <div className="lg:col-span-7">
                                <div className="bg-white shadow rounded-lg">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Cart Items ({cartItems.length})
                                            </h2>
                                            {cartItems.length > 0 && (
                                                <button
                                                    onClick={clearCart}
                                                    className="text-sm text-red-600 hover:text-red-500"
                                                >
                                                    Clear Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="px-6 py-6">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-24 h-24">
                                                        <img
                                                            className="w-full h-full object-cover rounded-md"
                                                            src={item.product.images[0] || '/placeholder-furniture.jpg'}
                                                            alt={item.product.name}
                                                        />
                                                    </div>

                                                    <div className="ml-6 flex-1">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <h3 className="text-base font-medium text-gray-900">
                                                                    <Link href={`/products/${item.product.id}`}>
                                                                        {item.product.name}
                                                                    </Link>
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    {item.product.category.name}
                                                                </p>
                                                                <p className="text-sm text-gray-900 mt-1">
                                                                    {formatPrice(item.price)} each
                                                                </p>
                                                            </div>

                                                            <div className="flex flex-col items-end space-y-2">
                                                                <p className="text-lg font-medium text-gray-900">
                                                                    {formatPrice(item.total)}
                                                                </p>
                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    className="text-sm text-red-600 hover:text-red-500"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex items-center">
                                                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                                Quantity
                                                            </label>
                                                            <select
                                                                id={`quantity-${item.id}`}
                                                                value={item.quantity}
                                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                                disabled={updating === item.id}
                                                                className="block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                            >
                                                                {[...Array(10)].map((_, i) => (
                                                                    <option key={i + 1} value={i + 1}>
                                                                        {i + 1}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {updating === item.id && (
                                                                <span className="ml-2 text-sm text-gray-500">
                                                                    Updating...
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order summary */}
                            <div className="lg:col-span-5 mt-8 lg:mt-0">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>{formatPrice(cartTotal)}</p>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <p>Shipping</p>
                                            <p>Calculated at checkout</p>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <p>Tax</p>
                                            <p>Calculated at checkout</p>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between text-lg font-medium text-gray-900">
                                                <p>Total</p>
                                                <p>{formatPrice(cartTotal)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <Link
                                            href="/products"
                                            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
