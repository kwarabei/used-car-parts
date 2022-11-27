<template>
  <div>
    <n-select
      class="car_select"
      v-model:value="carSpec.make"
      filterable
      placeholder="Марка авто"
      :options="makeItems"
      @click="fetchMakes"
      @update-value="updateSelectedMake"
      @update:value="$emit('setCarSpec', carSpec)"
      remote
      :loading="isMakesLoading"
    >
    </n-select>
    <n-select
      v-if="carSpec.make"
      class="car_select"
      v-model:value="carSpec.model"
      filterable
      placeholder="Модель авто"
      :options="modelItems"
      @click="fetchModels"
      @update:value="$emit('setCarSpec', carSpec)"
      remote
      :loading="isModelsLoading"
    >
    </n-select>
  </div>
</template>

<script setup lang="ts">
// TODO move requests to services

import { NSelect } from "naive-ui";
import { ref, reactive } from "vue";

const carSpec = reactive({
  make: null,
  model: null,
});

const makeItems = ref([]);
const isMakesLoading = ref(false);

const fetchMakes = () => {
  if (makeItems.value.length > 0) return;

  isMakesLoading.value = true;

  const url =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";
  fetch(url)
    .then((resp) => resp.json())
    .then((makes) => {
      makeItems.value = makes.Results.map(({ MakeName }: { MakeName: string }) => ({
        label: MakeName,
        value: MakeName,
      }));

      isMakesLoading.value = false;
    });
};

const updateSelectedMake = () => {
  carSpec.model = null;
  modelItems.value = [];
};

const modelItems = ref([]);
const isModelsLoading = ref(false);

const fetchModels = () => {
  if (modelItems.value.length > 0 || !carSpec.make) return;

  isModelsLoading.value = true;

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${carSpec.make}/vehicletype/car?format=json`;
  fetch(url)
    .then((resp) => resp.json())
    .then((models) => {
      modelItems.value = models.Results.map(({ Model_Name }: any) => ({
        label: Model_Name,
        value: Model_Name,
      }));

      isModelsLoading.value = false;
    });
};
</script>

<style scoped>
.car_select {
  margin-bottom: 26px;
  border: 1px solid black;
  border-radius: 3px;
}
</style>
