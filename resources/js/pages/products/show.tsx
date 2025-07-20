import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    short_description?: string;
    price: number;
    sale_price?: number;
    sku: string;
    stock_quantity: number;
    images: string[];
    material?: string;
    color?: string;
    dimensions?: string;
    weight?: number;
    specifications?: Record<string, any>;
    category: {
        id: number;
        name: string;
    };
    is_on_sale: boolean;
    effective_price: number;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    const addToCart = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity
        }, {
            onFinish: () => setProcessing(false)
        });
    };

    return (
        <>
            <Head title={product.name} />

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
                                <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                                    Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-gray-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className="text-gray-400">/</span>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-400 hover:text-gray-500">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <span className="text-gray-400">/</span>
                            </li>
                            <li>
                                <span className="text-gray-900">{product.name}</span>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        {/* Product Images */}
                        <div className="flex flex-col-reverse">
                            {/* Image thumbnails */}
                            {product.images.length > 1 && (
                                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                    <div className="grid grid-cols-4 gap-6">
                                        {product.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${index === currentImageIndex ? 'ring-2 ring-indigo-500' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="h-full w-full object-cover object-center rounded-md"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Main image */}
                            <div className="aspect-w-1 aspect-h-1 w-full">
                                <img
                                    src={product.images[currentImageIndex] || '/placeholder-furniture.jpg'}
                                    alt={product.name}
                                    className="w-full h-96 object-cover object-center sm:rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Product details */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                {product.name}
                            </h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <div className="flex items-center space-x-4">
                                    {product.is_on_sale ? (
                                        <>
                                            <span className="text-3xl text-green-600 font-bold">
                                                {formatPrice(product.sale_price!)}
                                            </span>
                                            <span className="text-xl text-gray-500 line-through">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                                                Sale
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl text-gray-900 font-bold">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 space-y-6">
                                    <p>{product.short_description || product.description}</p>
                                </div>
                            </div>

                            {/* Product details */}
                            <div className="mt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-900">Category:</span>
                                        <span className="ml-2 text-gray-600">{product.category.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">SKU:</span>
                                        <span className="ml-2 text-gray-600">{product.sku}</span>
                                    </div>
                                    {product.material && (
                                        <div>
                                            <span className="font-medium text-gray-900">Material:</span>
                                            <span className="ml-2 text-gray-600">{product.material}</span>
                                        </div>
                                    )}
                                    {product.color && (
                                        <div>
                                            <span className="font-medium text-gray-900">Color:</span>
                                            <span className="ml-2 text-gray-600">{product.color}</span>
                                        </div>
                                    )}
                                    {product.dimensions && (
                                        <div>
                                            <span className="font-medium text-gray-900">Dimensions:</span>
                                            <span className="ml-2 text-gray-600">{product.dimensions}</span>
                                        </div>
                                    )}
                                    {product.weight && (
                                        <div>
                                            <span className="font-medium text-gray-900">Weight:</span>
                                            <span className="ml-2 text-gray-600">{product.weight}kg</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Add to cart form */}
                            <form onSubmit={addToCart} className="mt-6">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <select
                                            id="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing || product.stock_quantity === 0}
                                        className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                                    >
                                        {processing ? 'Adding...' : product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            </form>

                            {/* Stock status */}
                            <div className="mt-4">
                                {product.stock_quantity > 0 ? (
                                    <p className="text-green-600 text-sm">
                                        ✓ In stock ({product.stock_quantity} available)
                                    </p>
                                ) : (
                                    <p className="text-red-600 text-sm">✗ Out of stock</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link
                                        key={relatedProduct.id}
                                        href={`/products/${relatedProduct.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                                            <img
                                                src={relatedProduct.images[0] || '/placeholder-furniture.jpg'}
                                                alt={relatedProduct.name}
                                                className="h-48 w-full object-cover rounded-t-lg"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                                                    {relatedProduct.name}
                                                </h3>
                                                <p className="mt-1 text-lg font-medium text-gray-900">
                                                    {formatPrice(relatedProduct.effective_price)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
