<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import useAddToCompare from '~/composables/useAddToCompare';

export default defineComponent({
  name: 'CompareButton',

  components: { SfButton },

  props: {
    productId: {
      type: [Number, String],
      default: null,
    }
  },

  setup() {
    const { addToCompare } = useAddToCompare();

    return {
      addToCompare
    }
  },
});
</script>

<template>
  <SfButton class="sf-button--pure compare-button p-1 mt-2 md:mt-4" data-testid="product-compare-button"
    @click="addToCompare(productId)">
    <slot>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_7_2456" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0_7_2456)">
          <path d="M16 4.66663L1.33333 4.66663L1.33333 3.33329L16 3.33329L16 4.66663Z" fill="#1D1F22" />
          <path
            d="M4.41128 -1.0803e-06L5.3335 0.836151L1.84335 4L5.3335 7.16385L4.41128 8L0.000162756 3.99999L4.41128 -1.0803e-06Z"
            fill="#1D1F22" />
          <path d="M0 11.3334L14.6667 11.3334L14.6667 12.6667L-2.33127e-07 12.6667L0 11.3334Z" fill="#1D1F22" />
          <path d="M11.5887 16L10.6665 15.1638L14.1566 12L10.6665 8.83615L11.5887 8L15.9998 12L11.5887 16Z"
            fill="#1D1F22" />
        </g>
      </svg>
    </slot>
  </SfButton>
</template>

<style scoped lang="scss">
.compare-button {
  position: absolute;
  right: var(--product-card-wishlist-icon-right, var(--spacer-xs));
  top: var(--spacer-lg);
  opacity: var(--product-card-wishlist-icon-opacity, 1);

  &:focus {
    svg {
      --product-card-wishlist-icon-opacity: 1;
    }
  }
}
</style>