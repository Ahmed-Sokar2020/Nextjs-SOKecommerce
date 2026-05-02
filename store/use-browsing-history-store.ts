import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  category: string;
};

type BrowsingHistory = {
  products: Product[];
  addItem: (product: Product) => void;
  clear: () => void;
};

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(
    (set, get) => ({
      products: [],

      addItem: (product) => {
        const products = get().products;

        const filteredProducts = products.filter(
          (p) => p.id !== product.id
        );

        const updatedProducts = [product, ...filteredProducts].slice(0, 10);

        set({
          products: updatedProducts,
        });
      },

      clear: () => {
        set({
          products: [],
        });
      },
    }),
    {
      name: "browsingHistoryStore",
    }
  )
);

export default function useBrowsingHistoryStore() {
  const products = browsingHistoryStore((state) => state.products);
  const addItem = browsingHistoryStore((state) => state.addItem);
  const clear = browsingHistoryStore((state) => state.clear);

  return {
    products,
    addItem,
    clear,
  };
}
