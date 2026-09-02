import React from 'react';

interface CartItem {
    id: number;
    quantity: number;
}

interface CartContextProps {
    items: CartItem[];
    addToCart: (id: number, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextProps>({} as CartContextProps);

const STORAGE_KEY = 'beeverage-cart';

const CartProvider = ({children}: React.PropsWithChildren) => {
    const [items, setItems] = React.useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (id: number, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === id);

            if (existing)
                return prev.map((item) => item.id === id ? {...item, quantity: item.quantity + quantity} : item);

            return [...prev, {id, quantity}];
        });
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }

        setItems((prev) => prev.map((item) => item.id === id ? {...item, quantity} : item));
    };

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider value={{items, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => React.useContext(CartContext);
