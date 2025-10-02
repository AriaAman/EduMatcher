<script setup lang="ts">
import { ref } from 'vue'

// Récupérer les données du lycée sélectionné
const selectedLycee = useState('selectedLycee', () => ({
  nom: 'EDHEC Business School',
  ville: 'Roubaix',
  type: 'Lycée Privé'
}))

const selectedClasse = useState('selectedClasse', () => ({
  niveau: 'Terminale',
  typeBac: 'Général'
}))

const recommendation = ref({
  school: selectedLycee.value.nom,
  location: selectedLycee.value.ville,
  program: 'International BBA',
  score: 91,
  level: 'Très élevées',
  reliability: 4,
  description: "Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de l'établissement."
})
</script>

<template>
  <div class="min-h-screen bg-[#F7F3F0]">
    <main class="pt-4">
      <div class="md:max-w-[720px] mx-auto px-4 md:px-5">
        <!-- School Info Header -->
        <div class="bg-[#EEE8E4] rounded-2xl p-4 mb-4 text-center flex flex-col gap-1">
          <p class="text-[14px] text-[#757575] font-medium leading-[140%]">
            {{ recommendation.school }} |
            <span class="iconify i-mdi:map-marker-outline" aria-hidden="true" style="font-size: 13px;"></span>
            {{ recommendation.location }}
          </p>
          <h1 class="text-[20px] font-semibold text-[#212121] leading-[140%]">{{ recommendation.program }}</h1>
        </div>

        <!-- Result Card -->
        <div class="bg-white rounded-2xl p-6 md:p-8">

          <!-- Score Circle -->
          <div class="flex justify-center mb-4">
            <div class="relative w-40 h-40">
              <!-- Circle SVG -->
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <!-- Background circle -->
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#f0f0f0"
                  stroke-width="7"
                />
                <!-- Progress circle -->
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="7"
                  stroke-linecap="round"
                  :stroke-dasharray="`${(recommendation.score / 100) * 440} 440`"
                />
                <!-- Gradient definition -->
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff7342;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#b176ff;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Lightning icon -->
              <div class="absolute inset-0 flex items-center justify-center">
                <img src="/Rating-Icon.svg" alt="Rating" class="w-22 h-22" />
              </div>
            </div>
          </div>

          <!-- Score Text -->
          <div class="text-center mb-4">
            <p class="text-[20px] font-semibold text-[#212121] mb-2 leading-[140%]">
              {{ recommendation.score }}% <span class="text-base">•</span> {{ recommendation.level }}
            </p>

            <!-- Stars -->
            <div class="flex justify-center items-center gap-1">
              <span class="text-xs text-[#212121] mr-2 font-medium">Fiabilité</span>
              <span v-for="i in 5" :key="i" class="text-base text-[#212121]">
                {{ i <= recommendation.reliability ? '★' : '☆' }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-sm text-[#757575] text-center leading-[140%] px-2">
            {{ recommendation.description }}
          </p>
        </div>

        <!-- Action Button -->
        <div class="px-9 md:px-0 mt-[39px]">
          <button
            @click="$router.push('/')"
            class="w-full md:w-[303px] bg-[#212121] text-white border-none rounded-full h-12 text-[16px] font-medium cursor-pointer transition-all hover:bg-gray-800 md:mx-auto block"
          >
            Tester une autre formation
          </button>
        </div>
      </div>
    </main>
  </div>
</template>