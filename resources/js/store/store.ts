import ProductData = App.Data.ProductData;
import {create} from "zustand";

interface CartState {
    items: ProductData[];
    quantity: number;
    total: number;
    selectedBrand: string | null;
    searchInput: string;
    currentRouteCategoryId: number;
    addProduct: (product: ProductData) => void;
    removeProduct: (product: ProductData) => void;
    clearProduct: (productId: number) => void;
    setSelectedBrand: (brand: string|null) => void;
    setSearchInput: (searchInput: string) => void;
    setCurrentRouteCategoryId: (categoryId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    total: 0,
    quantity: 0,
    selectedBrand: null,
    addProduct: (product: ProductData) => set((state) => {
        const items = get().items;
        const existingProduct = items.find(item => item.id === product.id);
        let newItems;
        if (existingProduct) {
            newItems = items.map(item =>
                item.id === product.id ? {...item, quantity: (item.quantity || 1) + 1} : item
            );
        } else {
            newItems = [...items, {...product, quantity: 1}];
        }
        const total = newItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
        const quantity = newItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        return {items: newItems, total, quantity};
    }),
    removeProduct: (product: ProductData) => set((state) => {
        const items = get().items;
        const existingProduct = items.find(item => item.id === product.id);
        let newItems;
        if (existingProduct && existingProduct.quantity > 1) {
            newItems = items.map(item =>
                item.id === product.id ? {...item, quantity: item.quantity - 1} : item
            );
        } else {
            newItems = items.filter(item => item.id !== product.id);
        }
        const total = newItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
        const quantity = newItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        return {items: newItems, total, quantity};
    }),
    clearProduct: (productId: number) => set((state) => {
        const items = get().items.filter(item => item.id !== productId);
        const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
        const quantity = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
        return {items, total, quantity};
    }),
    setSelectedBrand: (brand: string | null) => set({selectedBrand: brand}),
    setSearchInput: (searchInput: string) => set({searchInput: searchInput}),
    setCurrentRouteCategoryId: (categoryId: number) => set({currentRouteCategoryId: categoryId}),
    clearCart: () => set({items: [], total: 0, quantity: 0})
}));