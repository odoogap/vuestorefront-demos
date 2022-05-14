module.exports = {
    getProductsByIds: ({ ids }) => ({
        ids,
        query: `
        products(filter: {ids: $ids}) {
            products {
            id
            name
            }
        }
    `,
        ids
    })
}