<template>
  <div id="compare">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <div class="main section">
      <SfLoader :class="{ loading }" :loading="loading">
        <div v-if="products.length" class="products">
          <transition-group
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              data-cy="compare-product-card"
              v-for="(product, i) in products"
              :key="i"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :imageWidth="216"
              :imageHeight="288"
              :image="$image(productGetters.getCoverImage(product))"
              :nuxtImgConfig="{ fit: 'cover' }"
              image-tag="nuxt-img"
              :regular-price="
                $n(productGetters.getPrice(product).regular, 'currency')
              "
              :special-price="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              :isAddedToCart="isInCart({ product })"
              :link="
                localePath(
                  `/p/${productGetters.getId(product)}/${productGetters.getSlug(
                    product,
                  )}`,
                )
              "
              @click:wishlist="
                isInWishlist({ product })
                  ? removeItemFromWishList({ product: { product } })
                  : addItemToWishlist({ product })
              "
              class="products__product-card"
            />
          </transition-group>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :width="256"
            :height="176"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t('Sorry, we didnt find what youre looking for') }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </SfButton>
        </div>
      </SfLoader>
    </div>
    <template>
      <!-- <SfTable class="sf-table--bordered mt-10">
        <SfTableRow>
          <SfTableHeader class="opacity-50">In Stock</SfTableHeader>
          <SfTableHeader
            class="font-bold"
            v-for="(product, index) in products"
            :key="index"
            >{{ product.product.isInStock ? 'Yes' : 'No' }}</SfTableHeader
          >
        </SfTableRow>
        <SfTableRow>
          <SfTableData class="opacity-50">Barcode</SfTableData>
          <SfTableHeader
            class="font-bold"
            v-for="(product, index) in products"
            :key="index"
            >{{
              product.product.barcode ? product.product.barcode : 'No'
            }}</SfTableHeader
          >
        </SfTableRow>
        <SfTableRow>
          <SfTableData class="opacity-50">Weight</SfTableData>
          <SfTableHeader
            class="font-bold"
            v-for="(product, index) in products"
            :key="index"
            >{{
              product.product.weight ? product.product.weight : '0'
            }}</SfTableHeader
          >
        </SfTableRow>
        
        <SfTableRow>
          <SfTableData class="opacity-50">Price</SfTableData>
          <SfTableHeader
            class="font-bold"
            v-for="(product, index) in products"
            :key="index"
          >
            {{ product.product.price }}
          </SfTableHeader>
        </SfTableRow>
      </SfTable> -->
    </template>
  </div>
</template>


<script>
import {
  SfProductCard,
  SfBreadcrumbs,
  SfLoader,
  SfHeading,
  SfTable,
  SfIcon,
  SfImage,
  SfButton
} from '@storefront-ui/vue';
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';
import {
  useWishlist,
  useUser,
  wishlistGetters,
  productGetters,
  useCart,
} from '@vue-storefront/odoo';
import { useUiState } from '~/composables';
import useAddToCompare from '~/composables/useAddToCompare';

export default defineComponent({
  name: 'Compare',

  transition: 'fade',

  setup() {
    const { state } = useStore();
    const { loading } = useAddToCompare();
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const {
      removeItem,
      isInWishlist,
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
    } = useWishlist();
    const { isInCart } = useCart();
    const { isAuthenticated } = useUser();

    const products = computed(() => state.compare.products);

    const breadcrumbs = computed(() => [
      //
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Compare products',
        link: '#',
      },
    ]);

    return {
      loading,
      isInWishlist,
      isInCart,
      isAuthenticated,
      products,
      removeItem,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      wishlistGetters,
      productGetters,
      breadcrumbs,
      addItemToWishlist,
      removeItemFromWishList,
    };
  },
  components: {
    SfProductCard,
    SfBreadcrumbs,
    SfLoader,
    SfTable,
    SfHeading,
    SfIcon,
    SfImage,
    SfButton
  },
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/compare.scss';
</style>
