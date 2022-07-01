<template>
  <div
    id="my-account"
    class="my-account"
  >
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage
          title="My profile"
          data-testid="my-profile"
        >
          <SfMyProfile
            :account="account"
            data-testid="my-profile-tabs"
            @update:personal="account = { ...account, ...$event }"
            @update:password="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <SfContentPage
          title="Shipping & Payment Details"
          data-testid="shipping-details"
        >
          <SfShippingDetails
            :account="account"
            data-testid="shipping-details-tabs"
            @update:shipping="account = { ...account, ...$event }"
          />
        </SfContentPage>
        <div class="test">
          <SfContentPage title="Loyalty Card">
          <!-- <SfMyNewsletter /> -->
          </SfContentPage>
        </div>
        <SfContentPage title="Newsletter">
          <SfMyNewsletter />
        </SfContentPage>
      </SfContentCategory>

      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <SfOrderHistory :orders="account.orders" />
        </SfContentPage>

        <SfContentPage title="My reviews">
          <!-- <SfMyNewsletter /> -->
        </SfContentPage>
      </SfContentCategory>

      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>

<script>
import {
  SfMyProfile,
  SfShippingDetails,
  SfMyNewsletter,
  SfOrderHistory,
  SfBreadcrumbs, 
  SfContentPages
} from '@storefront-ui/vue';
import {
  useUserOrder
} from '@vue-storefront/odoo';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    SfMyProfile,
    SfShippingDetails,
    SfMyNewsletter,
    SfOrderHistory
  },
  data() {
    return {
      activePage: 'My profile',
      breadcrumbs: [
        {
          text: 'Home',
          link: '#'
        },
        {
          text: 'My Account',
          link: '#'
        }
      ],
      account: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Your email address',
        password: 'a*23Et',
        shipping: [
          {
            firstName: 'John',
            lastName: 'Dog',
            streetName: 'Sezame Street',
            apartment: '24/193A',
            city: 'Wroclaw',
            state: 'Lower Silesia',
            zipCode: '53-540',
            country: 'Poland',
            phoneNumber: '(00)560 123 456'
          },
          {
            firstName: 'John',
            lastName: 'Dog',
            streetName: 'Sezame Street',
            apartment: '20/193A',
            city: 'Wroclaw',
            state: 'Lower Silesia',
            zipCode: '53-603',
            country: 'Poland',
            phoneNumber: '(00)560 123 456'
          }
        ],
        orders: [
          ['#45', '23th June, 2021', 'Visa card', '$412.00', 'Finalised'],
          ['#46', '26th June, 2021', 'Paypal', '$132.00', 'Finalised'],
          ['#47', '28th June, 2021', 'Mastercard', '$12.00', 'Finalised'],
          ['#48', '28th June, 2021', 'Paypal', '$20.00', 'In process']
        ]
      }
    };
  },
  methods: {
    changeActivePage(title) {
      if (title === 'Log out') {
        alert('You are logged out!');

        this.$router.push('/home');
        
        return;
      }

      this.activePage = title;
    }
  },
  computed: {
    orders() {
      const { orders, search } = useUserOrder();

      return orders;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0 var(--spacer-lg);
  display: none;
}

::v-deep .my-account {
    margin-top: 40px;
}

::v-deep .my-account .sf-content-pages__sidebar {
    max-height: 550px;
    height: 100%;
    border-radius: 14px;
    max-width: 374px;
    overflow: hidden;
}

::v-deep .my-account .sf-content-pages__content {
    padding-left: 98px;
}

::v-deep .my-account .sf-tabs__title {
    padding-right: 10px;
    font-family: var(--font-family--primary);
}

::v-deep .my-account .sf-my-profile .message {
    color: #43464E;
}

::v-deep .sf-input__wrapper label {
    display: none;
}

::v-deep .my-account .sf-input input {
    padding-left: 5px;
    font-weight: 300;
    color: #43464E;
}

::v-deep .my-account .form__button {
    background: #32463D;
    color: #fff;
    font-family: var(--font-family--primary);
    max-width: 215px;
    width: 100%;
    text-align: center;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    padding-top: 20px;
}

::v-deep .my-account .notice {
    color: #000000;
    font-size: 14px;
    font-weight: 500;
}

::v-deep .my-account .notice a {
    color: #0468DB;
    text-decoration: underline;
    text-transform: uppercase;
    font-size: 14px;
}

::v-deep .sf-content-pages__category-title {
    display: none;
}

::v-deep .logout-btn button {
    color: red;
}

::v-deep .sf-content-pages__title {
    font-family: var(--font-family--primary);
    font-weight: 500;
    font-size: 26px;
}

::v-deep .sf-list .sf-list__item .sf-menu-item__label {
    font-family: var(--font-family--primary);
    font-weight: 500;
    font-size: 20px;
}

::v-deep .sf-content-pages__sidebar div:last-child {
    margin-top: 100px;
}

::v-deep .my-account .sf-content-pages__sidebar div:last-child span {
    color: #1D1F22;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: underline;
}

</style>
