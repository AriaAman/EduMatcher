<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Lycee {
  nom: string
  ville: string
  type: string
}

interface ClasseData {
  niveau: string
  typeBac: string
}

interface LyceeData {
  lycee: Lycee
  classe: ClasseData
}

const lyceeData = ref<LyceeData | null>(null)
const isModalOpen = ref(false)
const hasSelection = ref(false)
const isLoading = ref(true)

const loadData = async () => {
  try {
    // Attendre 2 secondes avant de charger les données
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const data = await $fetch<LyceeData>('/api/lycee-data')
    lyceeData.value = data
    hasSelection.value = true
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    // Données de fallback en cas d'erreur
    lyceeData.value = {
      lycee: { nom: 'Etienne Dolet', ville: 'Paris', type: 'Lycée Public' },
      classe: { niveau: 'Terminale', typeBac: 'Général' }
    }
    hasSelection.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})

const handleModifier = () => {
  isModalOpen.value = true
}

const handleLyceeSelect = (lycee: Lycee) => {
  if (lyceeData.value) {
    lyceeData.value.lycee = lycee
  }
}

const handleSelectionChange = (selection: { niveau: string; typeBac: string }) => {
  hasSelection.value = !!(selection.niveau && selection.typeBac)
}

const navigateToResults = () => {
  if (lyceeData.value && hasSelection.value) {
    // Stocker les données dans le state global de Nuxt
    const selectedLycee = useState('selectedLycee')
    const selectedClasse = useState('selectedClasse')
    
    selectedLycee.value = lyceeData.value.lycee
    selectedClasse.value = lyceeData.value.classe
    
    navigateTo('/results')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <main class="py-10">
      <div class="max-w-[1400px] mx-auto px-6">
        <div v-if="lyceeData" class="max-w-[800px] mx-auto">
          <LyceeCard
            :lycee="lyceeData.lycee"
            @modifier="handleModifier"
          />

          <ClasseCard
            :classe="lyceeData.classe"
            @selection-change="handleSelectionChange"
          />

          <SimpleCard title="Spécialités" />

          <SimpleCard title="Notes" />

          <div class="max-w-[720px] mx-auto my-8 px-5 flex justify-center">
            <button
              @click="hasSelection && navigateToResults()"
              class="w-auto border rounded-full px-12 h-12 text-[16px] font-medium transition-all flex items-center justify-center"
              :class="hasSelection
                ? 'bg-[#212121] text-white hover:bg-gray-800 border-[#212121] cursor-pointer'
                : 'bg-white text-[#212121] border-[#212121] cursor-not-allowed'"
              :disabled="!hasSelection"
            >
              Confirmer
            </button>
          </div>
        </div>

        <div v-else class="text-center py-16 px-5">
          <div class="animate-pulse">
            <div class="text-lg text-gray-600 mb-4">Chargement de vos données...</div>
            <div class="w-8 h-8 border-4 border-[#FF7342] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    </main>

    <LyceeModal
      v-if="lyceeData"
      :is-open="isModalOpen"
      :current-lycee="lyceeData.lycee"
      @close="isModalOpen = false"
      @select="handleLyceeSelect"
    />
  </div>
</template>