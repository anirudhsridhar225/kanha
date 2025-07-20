import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    category: {
        id: number;
        name: string;
    };
    is_on_sale: boolean;
    effective_price: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    products: {
        data: Product[];
        links: any[];
        meta: any;
    };
    categories: Category[];
    filters: {
        category_id?: number;
        search?: string;
    };
    currentCategory?: Category;
}

export default function ProductsIndex({ products, categories, filters, currentCategory }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    return (
        <>
            <Head title={currentCategory ? `${currentCategory.name} - Products` : 'Products'} />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                Kanha Furniture
                            </Link>
                            <div className="flex items-center space-x-4">
                                <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                                    Cart
                                </Link>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {currentCategory ? currentCategory.name : 'All Products'}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {currentCategory
                                ? `Browse our collection of ${currentCategory.name.toLowerCase()}`
                                : 'Browse our complete furniture collection'
                            }
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            {/* Search */}
                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
                                <form method="GET">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            {/* Categories */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/products"
                                            className={`block py-2 px-3 rounded ${!filters.category_id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            All Products
                                        </Link>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/categories/${category.slug}`}
                                                className={`block py-2 px-3 rounded ${filters.category_id === category.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                                        <Link href={`/products/${product.slug}`}>
                                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                                                <img
                                                    src={product.images[0] || '/placeholder-furniture.jpg'}
                                                    alt={product.name}
                                                    className="h-48 w-full object-cover object-center group-hover:opacity-75"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-sm text-gray-700">
                                                    {product.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {product.category.name}
                                                </p>
                                                <div className="mt-2">
                                                    {product.is_on_sale ? (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-lg font-medium text-green-600">
                                                                {formatPrice(product.sale_price!)}
                                                            </span>
                                                            <span className="text-sm text-gray-500 line-through">
                                                                {formatPrice(product.price)}
                                                            </span>
                                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                                Sale
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-lg font-medium text-gray-900">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.meta.last_page > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {products.links.map((link: any, index: number) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 text-sm font-medium rounded-md ${link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
