const SET_LOADING = 'SET_LOADING'
const SET_PRODUCT = 'SET_PRODUCT'
const PUSH_PRODUCT = 'PUSH_PRODUCT'
const POP_PRODUCT = 'POP_PRODUCT'

export const state = () => ({
  loading: false,
  products: []
});

export const mutations = {
  [SET_LOADING] (state, payload) {
    state.loading = payload
  },
  [SET_PRODUCT] (state, payload) {
    state.products = payload
  },
  [PUSH_PRODUCT] (state, payload) {
    state.products.push(payload)
  },
  [POP_PRODUCT] (state, payload) {
    const index = state.products.findIndex(p => p.id === payload)
    if (index > -1) {
      state.products.splice(index, 1)
    }
  },
};
