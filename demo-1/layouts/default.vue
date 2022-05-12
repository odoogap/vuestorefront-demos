<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="layout" class="relative">
      <nuxt :key="$route.fullPath" />

      <MobileMenuSidebar />
      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
      <div
        v-if="productCompareBar"
        class="
          h-40
          fixed
          bottom-0
          flex
          items-center
          bg-white
          px-2
          border border-gray-300
          z-50
        "
      >
        <div class="flex justify-between w-full">
          <div class="products flex items-start space-x-2">
            <div class="flex flex-row items-start space-x-3 hover:shadow-md">
              <div
                class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                "
              >
                <img class="w-14" src="/orange_bottle.png" />
              </div>
              <div class="product-details w-36">
                <h1 class="text-xl font-semibold my-2">
                  Highlands Orange Juice Cordial 3L
                </h1>
                <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
              </div>
              <button
                class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                "
              >
                x
              </button>
            </div>
            <div class="flex flex-row items-start space-x-3 hover:shadow-md">
              <div
                class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                "
              >
                <img class="w-14" src="/orange_bottle.png" />
              </div>
              <div class="product-details w-36">
                <h1 class="text-xl font-semibold my-2">
                  Highlands Orange Juice Cordial 3L
                </h1>
                <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
              </div>
              <button
                class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                "
              >
                x
              </button>
            </div>
            <div class="flex flex-row items-start space-x-3 hover:shadow-md">
              <div
                class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                "
              >
                <img class="w-14" src="/orange_bottle.png" />
              </div>
              <div class="product-details w-36">
                <h1 class="text-xl font-semibold my-2">
                  Highlands Orange Juice Cordial 3L
                </h1>
                <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
              </div>
              <button
                class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                "
              >
                x
              </button>
            </div>
            <div class="flex flex-row items-start space-x-3 hover:shadow-md">
              <div
                class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                "
              >
                <img class="w-14" src="/orange_bottle.png" />
              </div>
              <div class="product-details w-36">
                <h1 class="text-xl font-semibold my-2">
                  Highlands Orange Juice Cordial 3L
                </h1>
                <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
              </div>
              <button
                class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                "
              >
                x
              </button>
            </div>
          </div>
          <div class="btn-group self-center">
            <div class="w-36 flex flex-col items-end space-y-3">
              <button
                class="
                  w-32
                  py-2
                  text-xl
                  uppercase
                  bg-yellow-400
                  border border-yellow-400
                  rounded-md
                  text-center
                "
              >
                compare
              </button>
              <button
                class="
                  w-32
                  py-2
                  text-xl
                  uppercase
                  border border-black
                  rounded-md
                "
              >
                done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import {
  ref,
  defineComponent,
  onMounted,
  useRoute,
  watch,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },
  setup() {
    const route = useRoute();
    const productCompareBar = ref(true);
    onMounted(() => {
      hideVisibility();
    });
    const hideVisibility = async () => {
      if (
        route.value.path === '/compare' ||
        route.value.path === '/checkout/shipping'
      ) {
        productCompareBar.value = false;
      } else {
        productCompareBar.value = true;
      }
    };
    watch(() => route.value.path, hideVisibility);
    return { productCompareBar };
  },
});
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  @include for-mobile {
    overflow: hidden;
  }
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-y: auto !important;
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
