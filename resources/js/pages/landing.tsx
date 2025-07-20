import { Head, Link, usePage } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    products_count?: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    is_on_sale: boolean;
    effective_price: number;
}

interface Props {
    featuredCategories: Category[];
    featuredProducts: Product[];
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function LandingPage({ featuredCategories, featuredProducts, auth }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };

    return (
        <>
            <Head title="Kanha Furniture - Quality Furniture for Every Home" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <Link href="/" className="text-3xl font-bold text-blue-600">
                                    Kanha Furniture
                                </Link>
                                <span className="ml-2 text-sm text-gray-500">Quality • Comfort • Style</span>
                            </div>
                            
                            <nav className="hidden md:flex items-center space-x-8">
                                <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                                    All Products
                                </Link>
                                <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Categories
                                </Link>
                                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                                    About
                                </Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
                                            Cart
                                        </Link>
                                        <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                            Login
                                        </Link>
                                        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Transform Your Home with
                                <span className="block text-yellow-300">Premium Furniture</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                                Discover our collection of high-quality, affordable furniture designed to make your space beautiful and functional.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/products"
                                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                                >
                                    Shop Now
                                </Link>
                                <Link 
                                    href="/categories"
                                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-16 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
                        </svg>
                    </div>
                </section>

                {/* Featured Categories */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Shop by Category
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Find exactly what you're looking for in our carefully curated furniture categories
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCategories.map((category) => (
                                <Link 
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100">
                                        <div className="flex items-center justify-center">
                                            <div className="text-6xl">
                                                {category.name === 'Chairs' && '🪑'}
                                                {category.name === 'Tables' && '🪑'}
                                                {category.name === 'Storage' && '🗄️'}
                                                {category.name === 'Stools' && '🪑'}
                                                {category.name === 'Outdoor' && '🌳'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {category.description}
                                        </p>
                                        {category.products_count && (
                                            <p className="text-sm text-blue-600 font-medium">
                                                {category.products_count} Products Available
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Featured Products
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Handpicked favorites that our customers love
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <Link 
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                        <img
                                            src={product.images[0] || '/placeholder-furniture.jpg'}
                                            alt={product.name}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {product.is_on_sale && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                                                SALE
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            {product.is_on_sale ? (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg font-bold text-green-600">
                                                        {formatPrice(product.sale_price!)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-lg font-bold text-gray-900">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link 
                                href="/products"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                View All Products
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Why Choose Kanha Furniture?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                                <p className="text-gray-600">
                                    High-quality materials and craftsmanship that lasts for years
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable Prices</h3>
                                <p className="text-gray-600">
                                    Best value for money with frequent sales and discounts
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚚</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                                <p className="text-gray-600">
                                    Quick and safe delivery to your doorstep across India
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Kanha Furniture</h3>
                                <p className="text-gray-400">
                                    Quality furniture for every home. Transform your space with our premium collection.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Quick Links</h4>
                                <div className="space-y-2">
                                    <Link href="/products" className="block text-gray-400 hover:text-white">All Products</Link>
                                    <Link href="/categories" className="block text-gray-400 hover:text-white">Categories</Link>
                                    <Link href="/about" className="block text-gray-400 hover:text-white">About Us</Link>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Categories</h4>
                                <div className="space-y-2">
                                    {featuredCategories.slice(0, 4).map((category) => (
                                        <Link 
                                            key={category.id}
                                            href={`/categories/${category.slug}`} 
                                            className="block text-gray-400 hover:text-white"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Contact Info</h4>
                                <div className="space-y-2 text-gray-400">
                                    <p>📧 info@kanhafurniture.com</p>
                                    <p>📞 +91 12345 67890</p>
                                    <p>📍 Mumbai, Maharashtra</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 Kanha Furniture. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
