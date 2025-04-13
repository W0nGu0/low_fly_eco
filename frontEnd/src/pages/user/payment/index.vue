<template>
  <div class="payment-page">
    <h1>支付页面</h1>
    <p>订单ID: {{ orderId }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  }
})
</script>

<style scoped>
.payment-page {
  padding: 20px;
}
</style>
