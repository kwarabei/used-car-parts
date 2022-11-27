<template>
  <div>
    <n-select
      class="part_select"
      v-model:value="categorySpec.category"
      filterable
      placeholder="Категория"
      @click="pullCategories"
      :options="categories"
      @update:value="$emit('setPartSpec', categorySpec)"
    >
    </n-select>
    <n-select
      v-if="categorySpec.category"
      class="part_select"
      v-model:value="categorySpec.subcategory"
      filterable
      placeholder="Подкатегория"
      @click="pullSubCategories"
      :options="subcategories"
      @update:value="$emit('setPartSpec', categorySpec)"
    >
    </n-select>
  </div>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { ref, reactive } from "vue";
import { GetCategories, GetSubCategories } from "@/services/categories.service";
NSelect.prop;

const categorySpec = reactive({
  category: null,
  subcategory: null,
});

const categories = ref([]);

const pullCategories = () => {
  categories.value = GetCategories().map((cat) => ({
    label: cat,
    value: cat,
  }));
};

const subcategories = ref([]);

const pullSubCategories = () => {
  if (!categorySpec.category) return;

  subcategories.value = GetSubCategories(categorySpec.category).map((subcat) => ({
    label: subcat,
    value: subcat,
  }));
};
</script>

<style scoped>
.part_select {
  margin-bottom: 26px;
  border: 1px solid black;
  border-radius: 3px;
}
</style>
