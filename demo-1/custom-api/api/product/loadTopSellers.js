const gql = require('graphql-tag');

const loadTopSellers = async (context, variables) => {
  return await context.client.apollo.query({
    fetchPolicy: 'no-cache',
    variables,
    query: gql`
      query {
        topSellers {
          name
          image
          id
          sku
          price
          slug
          firstVariant
          isInStock
          websitePrice
          websitePublicPrice
          websitePriceDifference
          combinationInfo
          productVariants {
            id
            qty
            isInStock
          }
        }
      }
    `,
  });
};

module.exports = loadTopSellers;
