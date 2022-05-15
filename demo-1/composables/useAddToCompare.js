const useAddToCompare = () => {
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

    const addToCompare = (productId) => {
        if (process.browser) {
            const items = getComparableProducts();

            if (!items.includes(productId)) {
                items.push(productId)
            }

            localStorage.setItem('comparableProducts', JSON.stringify(items));
        }
    }

    const removeFromCompare = (productId) => {
        const array = getComparableProducts().filter(_ => _ !== productId)

        if (process.browser) {
            localStorage.setItem('comparableProducts', JSON.stringify(array));
        }
    }

    return {
        addToCompare,
        getComparableProducts,
        removeFromCompare
    }
}

export default useAddToCompare
