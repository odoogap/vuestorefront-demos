

const useAddToCompare = () => {
    const addToCompare = (productIds) => {
        const existingIds = localStorage.getItem('compareProductIds');
        if (existingIds) {
            productIds = productIds.concat(existingIds.split(',').map(Number));
        }
        productIds = [...new Set(productIds)];

        localStorage.setItem('compareProductIds', productIds);

        return {
            success: true,
            message: 'Successfylly added'
        }
    }

    const getCompareProductIds = () => {
        const existingIds = localStorage.getItem('compareProductIds');
        return existingIds.split(',').map(Number)
    }

    const removeCompareProduct = (productId) => {
        const ids = getCompareProductIds().filter(item => item !== Number(productId))
        addToCompare(ids)
        return {
            success: true,
            message: 'Successfylly removed'
        }
    }


    return {
        addToCompare,
        getCompareProductIds,
        removeCompareProduct
    }
}

export default useAddToCompare
