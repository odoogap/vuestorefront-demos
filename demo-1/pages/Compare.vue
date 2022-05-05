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
              class="products__product-card"
            />
          </transition-group>
        </div>
      </SfLoader>
    </div>
    <template>
      <SfTable class="sf-table--bordered mt-10">
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
        <!-- <SfTableRow>
          <SfTableData class="opacity-50">Category</SfTableData>
          <SfTableHeader
            class="font-bold"
            v-for="(product, index) in products"
            :key="index"
          >
            <span
              v-for="category in product.product.categories"
              :key="category.id"
              >{{ category.name }}</span
            >
          </SfTableHeader>
        </SfTableRow> -->
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
      </SfTable>
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
    const { wishlist, removeItem, isInWishlist } = useWishlist();
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
    };
  },
  components: {
    SfProductCard,
    SfBreadcrumbs,
    SfLoader,
    SfTable,
    SfHeading,
  },
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/category.scss';
</style>
