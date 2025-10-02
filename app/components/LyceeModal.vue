<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Lycee {
  nom: string
  ville: string
  type: string
}

const props = defineProps<{
  isOpen: boolean
  currentLycee: Lycee
}>()

const emit = defineEmits<{
  close: []
  select: [lycee: Lycee]
}>()

const lycees = ref<Lycee[]>([])
const searchQuery = ref('')

onMounted(async () => {
  try {
    const data = await $fetch<Lycee[]>('/api/lycee-data?list=true')
    lycees.value = data
  } catch (error) {
    console.error('Erreur lors du chargement des lycées:', error)
  }
})

const filteredLycees = computed(() => {
  if (!searchQuery.value) return lycees.value

  const query = searchQuery.value.toLowerCase()
  return lycees.value.filter(lycee =>
    lycee.nom.toLowerCase().includes(query) ||
    lycee.ville.toLowerCase().includes(query)
  )
})

const selectLycee = (lycee: Lycee) => {
  emit('select', lycee)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-5"
        @click="emit('close')"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          leave-active-class="transition-transform duration-300"
          enter-from-class="scale-95"
          leave-to-class="scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-[20px] w-full max-w-[600px] max-h-[80vh] flex flex-col"
            @click.stop
          >
            <div class="flex justify-between items-center px-6 py-6 pb-4 border-b border-gray-100">
              <h2 class="text-2xl font-bold m-0 text-gray-900">Choisir un lycée</h2>
              <button
                @click="emit('close')"
                class="bg-transparent border-none text-[32px] text-gray-400 cursor-pointer p-0 w-8 h-8 flex items-center justify-center transition-colors hover:text-gray-900"
              >
                ×
              </button>
            </div>

            <div class="px-6 py-4 border-b border-gray-100">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un lycée..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base transition-colors focus:outline-none focus:border-[#b176ff]"
              />
            </div>

            <div class="overflow-y-auto p-2 flex-1">
              <button
                v-for="lycee in filteredLycees"
                :key="lycee.nom"
                @click="selectLycee(lycee)"
                class="w-full flex justify-between items-center p-4 border-none bg-white rounded-xl cursor-pointer transition-colors text-left mb-1 hover:bg-gray-50"
                :class="{ 'bg-purple-50': lycee.nom === currentLycee.nom }"
              >
                <div class="flex-1">
                  <div class="text-base font-semibold text-gray-900 mb-1">{{ lycee.nom }}</div>
                  <div class="text-sm text-gray-600 flex items-center gap-1.5">
                    <span>{{ lycee.ville }}</span>
                    <span class="opacity-50">•</span>
                    <span>{{ lycee.type }}</span>
                  </div>
                </div>
                <svg
                  v-if="lycee.nom === currentLycee.nom"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="text-[#b176ff]"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>