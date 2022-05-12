<template>
  <div class="
          h-40
          fixed
          bottom-0
          flex
          items-center
          bg-white
          px-2
          border border-gray-300
          z-50
        ">
    <div class="flex justify-between w-full">
      <div class="products flex items-start space-x-2">
        <div class="flex flex-row items-start space-x-3 hover:shadow-md">
          <div class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                ">
            <img class="w-14" src="/orange_bottle.png" />
          </div>
          <div class="product-details w-36">
            <h1 class="text-xl font-semibold my-2">
              Highlands Orange Juice Cordial 3L
            </h1>
            <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
          </div>
          <button class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                ">
            x
          </button>
        </div>
        <div class="flex flex-row items-start space-x-3 hover:shadow-md">
          <div class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                ">
            <img class="w-14" src="/orange_bottle.png" />
          </div>
          <div class="product-details w-36">
            <h1 class="text-xl font-semibold my-2">
              Highlands Orange Juice Cordial 3L
            </h1>
            <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
          </div>
          <button class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                ">
            x
          </button>
        </div>
        <div class="flex flex-row items-start space-x-3 hover:shadow-md">
          <div class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                ">
            <img class="w-14" src="/orange_bottle.png" />
          </div>
          <div class="product-details w-36">
            <h1 class="text-xl font-semibold my-2">
              Highlands Orange Juice Cordial 3L
            </h1>
            <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
          </div>
          <button class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                ">
            x
          </button>
        </div>
        <div class="flex flex-row items-start space-x-3 hover:shadow-md">
          <div class="
                  product-img
                  self-stretch
                  bg-gray-200
                  px-1
                  flex
                  items-center
                ">
            <img class="w-14" src="/orange_bottle.png" />
          </div>
          <div class="product-details w-36">
            <h1 class="text-xl font-semibold my-2">
              Highlands Orange Juice Cordial 3L
            </h1>
            <h1 class="text-2xl font-bold font-sans">KES 510.00</h1>
          </div>
          <button class="
                  close-btn
                  bg-red-600
                  rounded-full
                  h-8
                  w-8
                  p-1
                  text-center text-white
                ">
            x
          </button>
        </div>
      </div>
      <div class="btn-group self-center">
        <div class="w-36 flex flex-col items-end space-y-3">
          <nuxt-link to="/compare" class="
                  w-32
                  py-2
                  text-xl
                  uppercase
                  bg-yellow-400
                  border border-yellow-400
                  rounded-md
                  text-center
                ">
            compare
          </nuxt-link>
          <button class="
                  w-32
                  py-2
                  text-xl
                  uppercase
                  border border-black
                  rounded-md
                ">
            done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: 'TheCompareModal',


})
</script>