import gql from 'graphql-tag';

module.exports = {
    getProductsByIds: ({ variables }) => ({
        variables,
        query: gql`
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