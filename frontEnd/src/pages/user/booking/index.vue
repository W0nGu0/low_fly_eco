<template>
  <div class="booking-page">
    <h1>预约页面</h1>
    <p>项目ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
</script>

<style scoped>
.booking-page {
  padding: 20px;
}
</style>
