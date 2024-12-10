import { defineStore } from 'pinia';

export const ProductStore = defineStore('product', {
    state: () => ({
        product: null,
    }),
    actions: {
        setProduct(product) {
            this.product = product;
        },
    },
});