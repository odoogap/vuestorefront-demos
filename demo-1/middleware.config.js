const formatedBaseUrl = process.env.BASE_URL && process.env.BASE_URL.slice(-1) == '/' ? 
                          process.env.BASE_URL : 
                          process.env.BASE_URL + '/';

const odooBaseUrl = formatedBaseUrl || 'https://vsfdemo.labs.odoogap.com/';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl
      }
    }
  }
};

