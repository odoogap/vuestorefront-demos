<template>
  <div v-if="productCompareBar" class="fixed left-0 right-0 fixed-bar bottom-0 z-50">
    <div id="layout" class="
        flex flex-col
        justify-between
        flex-grow
        p-3
        mx-auto
        bg-white
        md:flex-row md
        card-container
      ">
      {{ products }}
      <div class="flex flex-wrap flex-grow">
        <div v-for="x in 4" :key="x" class="flex items-start mx-2 items">
          <picture class="p-2 bg-gray-200">
            <img class="w-14" src="/orange_bottle.png" />
          </picture>
          <div class="p-2 ml-4 mr-3 text-sm">
            <p class="font-medium">
              Highlands Orange <br />
              Juice Cordial 3L
            </p>
            <p class="mt-2 text-xl font-bold">KES 510.00</p>
          </div>
          <button class="
              px-2
              py-1.5
              text-xs
              leading-3
              text-white
              bg-red-600
              rounded-full
            " @click="removeFromCompare">
            &times;
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center gap-3">
        <nuxt-link to="/compare" class="px-4 py-2 font-medium uppercase bg-yellow-400 rounded-md">
          compare
        </nuxt-link>
        <button class="
            px-4
            py-1.5
            border-black
            font-medium
            uppercase
            border-2
            rounded-md
          ">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, ref, watch } from '@nuxtjs/composition-api';
// import { getProductsByIds } from '../queries/product';

import { useProduct } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import useAddToCompare from '~/composables/useAddToCompare';

export default defineComponent({
  name: 'TheCompareModal',
  setup() {
    const route = useRoute();
    const productCompareBar = ref(true);
    const hideVisibility = () => {
      if (
        route.value.path === '/compare' ||
        route.value.path === '/checkout/shipping'
      ) {
        productCompareBar.value = false;
      } else {
        productCompareBar.value = true;
      }
    };
    hideVisibility()
    watch(() => route.value.path, hideVisibility);

    const { products, search } = useProduct('products');
    const { removeFromCompare } = useAddToCompare();

    // onSSR(async () => {
    //   await search({
    //     customQuery: {  }
    //   });
    // });
    search({
      customQuery: { getProductTemplate: 'getProductsByIds' }
    });

    return {
      productCompareBar,
      products,
      removeFromCompare,
    };
  },
});
</script>

<style scoped>
.font-16 {
  font-size: 16px !important;
}
</style>