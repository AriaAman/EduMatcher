<script setup lang="ts">
interface Lycee {
  nom: string
  ville: string
  type: string
}

defineProps<{
  lycee: Lycee
}>()

const emit = defineEmits<{
  modifier: []
}>()
</script>

<template>
  <div class="rounded-[16px] p-5 max-w-[720px] mx-auto mb-4 bg-gradient-to-r from-[#FF7342] from-55% to-[#B176FF] to-100%">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div class="flex-1">
        <h2 class="text-white text-[20px] font-bold mb-1 leading-[24px] tracking-[-0.02em]">{{ lycee.nom }}</h2>
        <div class="text-white text-[14px] flex items-center gap-1.5 leading-[24px]">
          <Icon name="mdi:map-marker-outline" class="text-white" size="16" />
          <span>{{ lycee.ville }}</span>
          <Icon name="mdi:office-building" class="text-white" size="16" />
          <span>{{ lycee.type }}</span>
        </div>
      </div>
      <button
        @click="emit('modifier')"
        class="bg-white text-[#212121] border-none rounded-[1000px] h-8 px-4 text-[14px] font-medium cursor-pointer transition-transform hover:scale-105 leading-[16px] w-fit"
      >
        Modifier
      </button>
    </div>
  </div>
</template>