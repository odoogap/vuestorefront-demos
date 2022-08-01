const gql = require('graphql-tag');
const orderFragment = require('../fragments/orderFragment.ts');

const updateCartItem = async (context, variables) => {
    return await context.client.apollo.mutate({
      variables,
      mutation: gql`
        mutation($productId: Int!, $quantity: Int!){
          cartUpdateItem(productId: $productId, quantity: $quantity) {
            ${orderFragment}
          }
        }
      `,
    });
}

module.exports = updateCartItem;
