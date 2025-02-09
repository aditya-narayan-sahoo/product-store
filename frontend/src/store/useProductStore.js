import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    name: "",
    image: "",
    price: "",
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", image: "", price: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("addProductModal").close();
    } catch (error) {
      console.log(`Error adding product: ${error}`);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      set({
        error:
          err.status === 429 ? "Rate limit exceeded" : "Something went wrong",
        products: [],
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prevState) => ({
        products: prevState.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(`Error deleting product: ${error}`);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
