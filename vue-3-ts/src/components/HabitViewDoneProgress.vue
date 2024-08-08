<template>
  <div
    class="flex items-center justify-between rounded-15 bg-white pl-15 pr-32 pt-18 pb-20"
    style="box-shadow: 0 0 16px rgba(0, 0, 0, 0.06)"
  >
    <div class="space-y-5">
      <div>
        <div class="text-15">xx xx</div>
        <div class="text-subcolor-palet-blue text-17">21 xx</div>
      </div>

      <div>
        <div class="text-15">xx</div>
        <div class="text-subcolor-green-done text-17">21 xx</div>
      </div>

      <div>
        <div class="text-15">xx</div>
        <div class="text-subcolor-rose text-17">5 xx</div>
      </div>
    </div>

    <ChartCircleProgress
      :size="134"
      :items="[
        {
          color: 'rgba(157, 173, 255, 1)',
          value: 15
        },
        {
          color: 'rgba(59, 232, 138, 1)',
          value: 15
        },
        {
          color: 'rgba(255, 130, 167, 1)',
          value: 15
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import ChartCircleProgress from '@/components/ChartCircleProgress.vue'
</script>
