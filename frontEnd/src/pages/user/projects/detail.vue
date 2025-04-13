<template>
  <div class="project-detail-page">
    <h1>项目详情</h1>
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
.project-detail-page {
  padding: 20px;
}
</style>
