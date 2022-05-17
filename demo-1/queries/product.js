module.exports = {
    getProductsByIds: ({ variables }) => ({
        variables,
        query: `
            products(filter: {ids: $variables}) {
                products {
                id
                name
                }
            }
        `,
        variables
    })
}