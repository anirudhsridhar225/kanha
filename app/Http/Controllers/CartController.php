<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cartItems = $request->user()->cartItems()
            ->with('product.category')
            ->get();

        $cartTotal = $cartItems->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'cartTotal' => $cartTotal
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if item already exists in cart
        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            // Update quantity if item exists
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity
            ]);
        } else {
            // Create new cart item
            CartItem::create([
                'user_id' => $request->user()->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->effective_price
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        // Ensure user owns this cart item
        if ($cartItem->user_id !== $request->user()->id) {
            abort(403);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        // Ensure user owns this cart item
        if ($cartItem->user_id !== $request->user()->id) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

    public function clear(Request $request)
    {
        $request->user()->cartItems()->delete();

        return redirect()->route('cart')->with('success', 'Cart cleared!');
    }
}
