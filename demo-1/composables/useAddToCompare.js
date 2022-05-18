import { useStore } from "@nuxtjs/composition-api";
import { useProduct } from "@vue-storefront/odoo";

const useAddToCompare = () => {
    const { products, search, loading } = useProduct()
    const { commit } = useStore()

    const getComparableProducts = () => {
        let items = [];
        if (process.browser) {
            const existingProduts = localStorage.getItem('comparableProducts');

            if (existingProduts) {
                const array = JSON.parse(existingProduts)
                if (Array.isArray(array)) {
                    items = array
                }
            }
        }

        return items;
    }

    const getProduct = async (id) => {
        await search({ id })

        commit('compare/PUSH_PRODUCT', products.value)
    }

    const getProducts = () => {
        getComparableProducts().forEach(async (id) => {
            await search({ id })
            commit('compare/PUSH_PRODUCT', products.value)
        })
    }

    const addToCompare = async (productId) => {
        if (process.browser) {
            const items = getComparableProducts();

            if (!items.includes(productId) && items.length < 4) {
                items.push(productId)
                await getProduct(productId)
            }

            localStorage.setItem('comparableProducts', JSON.stringify(items));
        }
    }

    const removeFromCompare = (productId) => {
        const array = getComparableProducts().filter(_ => _ !== productId)

        if (process.browser) {
            localStorage.setItem('comparableProducts', JSON.stringify(array));
        }
        commit('compare/POP_PRODUCT', productId)
    }

    const clear = () => {
        if (process.browser) {
            localStorage.removeItem('comparableProducts');
        }
        commit('compare/SET_PRODUCT', [])
    }

    return {
        addToCompare,
        getProducts,
        removeFromCompare,
        clear,
        loading
    }
}

export default useAddToCompare
