<script setup lang="ts">
import { ref, watch } from 'vue'

interface ClasseData {
  niveau: string
  typeBac: string
}

const props = defineProps<{
  classe: ClasseData
}>()

const emit = defineEmits<{
  'selection-change': [{ niveau: string; typeBac: string }]
}>()

const isOpen = ref(false)
const selectedNiveau = ref(props.classe.niveau)
const selectedTypeBac = ref(props.classe.typeBac)

const niveaux = ['Seconde', 'Première', 'Terminale']
const typesBac = ['Général', 'Technologique', 'Professionnel']

const confirmer = () => {
  emit('selection-change', {
    niveau: selectedNiveau.value,
    typeBac: selectedTypeBac.value
  })
  isOpen.value = false
}

// Émettre les changements
watch([selectedNiveau, selectedTypeBac], () => {
  emit('selection-change', {
    niveau: selectedNiveau.value,
    typeBac: selectedTypeBac.value
  })
})
</script>

<template>
  <div class="bg-white rounded-2xl p-5 max-w-[720px] mx-auto mb-4">
    <div
      class="flex justify-between items-center cursor-pointer select-none"
      @click="isOpen = !isOpen"
    >
      <div class="flex-1">
        <h3 class="text-[16px] font-semibold m-0 text-[#212121] leading-[22.4px]">Classe</h3>
        <p v-if="!isOpen && selectedNiveau && selectedTypeBac" class="text-[14px] text-[#212121] mt-2 leading-[19.6px] font-medium">
          {{ selectedNiveau }}, {{ selectedTypeBac }}
        </p>
      </div>

      <button
        class="bg-transparent border-none cursor-pointer flex items-center justify-center transition-transform"
        :class="{ 'rotate-180': isOpen }"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div 
      v-show="isOpen" 
      class="mt-5 transition-all duration-800 ease-in-out"
      :class="isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'"
    >
        <div class="mb-6">
          <div class="flex gap-2 flex-wrap">
          <button
            v-for="niveau in niveaux"
            :key="niveau"
            @click="selectedNiveau = niveau"
            class="h-9 px-4 text-[16px] font-medium cursor-pointer transition-all border-2 leading-[16px]"
            :class="selectedNiveau === niveau
              ? 'bg-white border-[#212121] text-[#212121] rounded-[24px]'
              : 'bg-[#F5F5F5] border-transparent text-[#212121] hover:bg-gray-200 rounded-[24px]'"
          >
            {{ niveau }}
          </button>
        </div>
      </div>

      <!-- Separator -->
      <div class="border-t border-[#E0E0E0] my-6"></div>

      <div class="mb-6">
        <h4 class="text-[14px] font-medium m-0 mb-3 text-[#212121] leading-[16px]">Type de bac</h4>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="type in typesBac"
            :key="type"
            @click="selectedTypeBac = type"
            class="h-9 px-4 text-[16px] font-medium cursor-pointer transition-all border-2 leading-[16px]"
            :class="selectedTypeBac === type
              ? 'bg-white border-[#212121] text-[#212121] rounded-[24px]'
              : 'bg-[#F5F5F5] border-transparent text-[#212121] hover:bg-gray-200 rounded-[24px]'"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <button
        @click="confirmer"
        class="w-full h-12 border rounded-full text-[16px] font-medium cursor-pointer transition-all px-6 flex items-center justify-center"
        :class="selectedNiveau && selectedTypeBac
          ? 'bg-[#212121] text-white hover:bg-gray-800 border-[#212121]'
          : 'bg-white text-[#212121] border-[#212121]'"
      >
        Confirmer
      </button>
    </div>
  </div>
</template>