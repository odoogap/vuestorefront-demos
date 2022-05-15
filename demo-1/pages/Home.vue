<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
        />
      </SfHero>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :link="localePath(item.link)"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Match with it" :level="2" />
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">
          {{ $t('See all') }}
        </nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCarousel
        class="carousel"
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left sf-arrow--long"
            @click="go('prev')"
          />
        </template>
        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right sf-arrow--long"
            @click="go('next')"
          />
        </template>
        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in products"
          :key="i"
        >
          <section class="group relative flex justify-center">
            <SfProductCard
              :title="product.title"
              :image="product.image"
              :imageWidth="216"
              :imageHeight="288"
              :nuxtImgConfig="{ fit: 'cover' }"
              image-tag="nuxt-img"
              :regular-price="product.price.regular"
              :max-rating="product.rating.max"
              :score-rating="product.rating.score"
              :show-add-to-cart-button="true"
              :is-on-wishlist="product.isInWishlist"
              :link="localePath({ name: 'home' })"
              class="carousel__item__product"
              @click:wishlist="toggleWishlist(i)"
            />
            <div
              class="
                cursor-pointer
                lg:hidden
                group-hover:block
                absolute
                product-compare-btn
                z-50
              "
              title="Compare the products"
              @click="addToCompareProduct(product)"
            >
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
          </section>
        </SfCarouselItem>
      </SfCarousel>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        :image="addBasePath('/homepage/newsletter.webp')"
        class="call-to-action"
      >
        <template #button>
          <SfButton
            class="sf-call-to-action__button"
            data-testid="cta-button"
            @click="toggleNewsletterModal"
          >
            {{ $t('Subscribe') }}
          </SfButton>
        </template>
      </SfCallToAction>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <NewsletterModal @email-submitted="onSubscribe" :loading="loading" />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfIcon,
} from '@storefront-ui/vue';
import { ref, useContext, onMounted } from '@nuxtjs/composition-api';
import InstagramFeed from '~/components/InstagramFeed.vue';
import NewsletterModal from '~/components/NewsletterModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiState } from '../composables';
import { useNewsLetter } from '@vue-storefront/odoo';
import { addBasePath } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
import useAddToCompare from '~/composables/useAddToCompare';

export default {
  name: 'Home',
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    NewsletterModal,
    LazyHydrate,
    SfIcon,
  },
  setup() {
    const { $config } = useContext();
    const { sendSubscription, loading } = useNewsLetter();
    const { toggleNewsletterModal } = useUiState();
    const { send } = useUiNotification();

    const products = ref([
      {
        id: 1,
        title: 'Cream Beach Bag',
        image: addBasePath('/homepage/productA.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: true,
      },
      {
        id: 2,
        title: 'Cream Beach Bag 2',
        image: addBasePath('/homepage/productB.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 3,
        title: 'Cream Beach Bag 3',
        image: addBasePath('homepage/productC.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 4,
        title: 'Cream Beach Bag RR',
        image: addBasePath('/homepage/productA.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 5,
        title: 'Cream Beach Bag',
        image: addBasePath('/homepage/productB.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 6,
        title: 'Cream Beach Bag',
        image: addBasePath('/homepage/productC.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 7,
        title: 'Cream Beach Bag',
        image: addBasePath('/homepage/productA.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
      {
        id: 8,
        title: 'Cream Beach Bag',
        image: addBasePath('/homepage/productB.webp'),
        price: { regular: '50.00 $' },
        rating: { max: 5, score: 4 },
        isInWishlist: false,
      },
    ]);
    const heroes = [
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#eceff1',
        image: addBasePath('/homepage/bannerH.webp'),
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#efebe9',
        image: addBasePath('/homepage/bannerA.webp'),
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right',
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        background: '#fce4ec',
        image: addBasePath('/homepage/bannerB.webp'),
      },
    ];
    const banners = [
      {
        slot: 'banner-A',
        subtitle: 'Dresses',
        title: 'Cocktail & Party',
        description:
          "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: 'Shop now',
        image: {
          mobile: addBasePath($config.theme.home.bannerA.image.mobile),
          desktop: addBasePath($config.theme.home.bannerA.image.desktop),
        },
        class: 'sf-banner--slim desktop-only',
        link: $config.theme.home.bannerA.link,
      },
      {
        slot: 'banner-B',
        subtitle: 'Dresses',
        title: 'Linen Dresses',
        description:
          "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: 'Shop now',
        image: addBasePath($config.theme.home.bannerB.image),
        class: 'sf-banner--slim banner-central desktop-only',
        link: $config.theme.home.bannerB.link,
      },
      {
        slot: 'banner-C',
        subtitle: 'T-Shirts',
        title: 'The Office Life',
        image: addBasePath($config.theme.home.bannerC.image),
        class: 'sf-banner--slim banner__tshirt',
        link: $config.theme.home.bannerC.link,
      },
      {
        slot: 'banner-D',
        subtitle: 'Summer Sandals',
        title: 'Eco Sandals',
        image: addBasePath($config.theme.home.bannerD.image),
        class: 'sf-banner--slim',
        link: $config.theme.home.bannerD.link,
      },
    ];

    const onSubscribe = async (emailAddress) => {
      const data = await sendSubscription({ email: emailAddress });

      if (data.subscribed) {
        send({
          message: 'Subscribe successfull!',
          type: 'success',
        });
      }
      if (!data.subscribed) {
        send({
          message: 'Something wrong!',
          type: 'danger',
        });
      }
      toggleNewsletterModal();
    };

    const toggleWishlist = (index) => {
      products.value[index].isInWishlist = !products.value[index].isInWishlist;
    };

    const { addToCompare } = useAddToCompare();
    const addToCompareProduct = (product) => {
      addToCompare([product.id]);
    };

    // onMounted(() => {
    //   const el = document.getElementsByClassName(
    //     'sf-product-card__wishlist-icon',
    //   );
    //   // console.log(el);
    //   el.forEach(element => {

    //   })
    //   var rect = el[0].getBoundingClientRect();
    //   console.log(rect.top, rect.right);
    // });

    return {
      toggleWishlist,
      toggleNewsletterModal,
      onSubscribe,
      addBasePath,
      banners,
      heroes,
      products,
      loading,
      addToCompareProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

@media screen and (max-width: 768px) {
  .product-compare-btn {
    top: 46px !important;
    right: 120px !important;
  }
}
@media screen and (max-width: 425px) {
  .product-compare-btn {
    top: 46px !important;
    right: 230px !important;
  }
}
@media screen and (max-width: 375px) {
  .product-compare-btn {
    top: 46px !important;
    right: 193px !important;
  }
}
@media screen and (max-width: 320px) {
  .product-compare-btn {
    top: 46px !important;
    right: 169px !important;
  }
}
</style>
