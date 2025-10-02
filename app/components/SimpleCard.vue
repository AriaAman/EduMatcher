<script setup lang="ts">
defineProps<{
  title: string
  status?: string
}>()
</script>

<template>
  <div class="bg-white rounded-2xl p-5 max-w-[720px] mx-auto mb-4">
    <div class="flex justify-between items-center">
      <h3 class="text-[16px] font-semibold m-0 text-[#212121] leading-[140%]">{{ title }}</h3>
      <span class="text-[14px] text-[#757575] flex items-center gap-1 leading-[140%] font-normal">
        {{ status || 'À compléter' }}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </div>
</template>