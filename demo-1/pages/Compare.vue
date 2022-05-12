<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader :class="{ loading }" :loading="loading"> </SfLoader>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products">
          <transition-group
            appear
            name="products__slide"
            tag="div"
            class="products__grid gap-7"
          >
            <SfProductCard
              data-cy="category-product-card"
              v-for="(product, i) in products"
              :key="wishlistGetters.getItemSku(product)"
              :style="{ '--index': i }"
              :imageWidth="216"
              :imageHeight="288"
              :title="wishlistGetters.getItemName(product)"
              :image="$image(wishlistGetters.getItemImage(product))"
              :nuxtImgConfig="{ fit: 'cover' }"
              image-tag="nuxt-img"
              :regular-price="
                $n(wishlistGetters.getItemPrice(product).regular, 'currency')
              "
              :special-price="
                wishlistGetters.getItemPrice(product).special &&
                $n(wishlistGetters.getItemPrice(product).special, 'currency')
              "
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :show-add-to-cart-button="true"
              :isInWishlist="isInWishlist({ product })"
              :isAddedToCart="isInCart({ product })"
              :link="localePath(getLocalPathFromWishListItem(product))"
              @click:wishlist="
                isInWishlist({ product })
                  ? removeItemFromWishList({ product: { product } })
                  : addItemToWishlist({ product })
              "
              class="products__product-card"
            >
              <!-- <template #wishlist-icon>
                <div class="flex flex-col justify-end space-y-2">
                  <div class="self-end">
                    <SfIcon
                      @click="$emit('click:wishlist')"
                      icon="heart"
                      size="xs"
                      color="black"
                      viewBox="0 0 24 24"
                      :coverage="1"
                    />
                  </div>
                  <div class="self-end mr-1">
                    <div class="cursor-pointer" title="Compare the products">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_7_2456"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="16"
                          height="16"
                        >
                          <rect width="16" height="16" fill="#C4C4C4" />
                        </mask>
                        <g mask="url(#mask0_7_2456)">
                          <path
                            d="M16 4.66663L1.33333 4.66663L1.33333 3.33329L16 3.33329L16 4.66663Z"
                            fill="#1D1F22"
                          />
                          <path
                            d="M4.41128 -1.0803e-06L5.3335 0.836151L1.84335 4L5.3335 7.16385L4.41128 8L0.000162756 3.99999L4.41128 -1.0803e-06Z"
                            fill="#1D1F22"
                          />
                          <path
                            d="M0 11.3334L14.6667 11.3334L14.6667 12.6667L-2.33127e-07 12.6667L0 11.3334Z"
                            fill="#1D1F22"
                          />
                          <path
                            d="M11.5887 16L10.6665 15.1638L14.1566 12L10.6665 8.83615L11.5887 8L15.9998 12L11.5887 16Z"
                            fill="#1D1F22"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </template> -->
            </SfProductCard>
          </transition-group>
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
} from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import {
  useWishlist,
  useUser,
  wishlistGetters,
  productGetters,
  useFacet,
  useCart,
} from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';

export default defineComponent({
  name: 'Compare',
  transition: 'fade',
  setup() {
    const {} = useWishlist();

    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const {
      wishlist,
      removeItem,
      isInWishlist,
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
    } = useWishlist();
    const { isInCart } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value),
    );

    onSSR(async () => {
      // await loadWishlist();
    });

    const getLocalPathFromWishListItem = (wishlistItem) => {
      return `/p/${productGetters.getId(
        wishlistItem.product,
      )}/${productGetters.getSlug(wishlistItem.product)}`;
    };
    const { loading } = useFacet(); //
    const showProducts = computed(
      //
      () => !loading.value && products.value?.length > 0,
    );

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
      showProducts,
      loading,
      isInWishlist,
      isInCart,
      getLocalPathFromWishListItem,
      isAuthenticated,
      products,
      removeItem,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      totals,
      totalItems,
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
  },
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/category.scss';
</style>
