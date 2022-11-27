<template>
  <v-container class="post_part">
    <v-row>
      <v-col>
        <CarSpecification @setCarSpec="updateCarSpec"></CarSpecification>
      </v-col>
      <v-col>
        <v-text-field
          v-model="formState.title"
          density="compact"
          class="part_title"
          label="Название объявления"
          variant="outlined"
          clearable
        >
        </v-text-field>
        <v-textarea
          v-model="formState.description"
          auto-grow
          rows="5"
          label="Описание объявления"
          variant="outlined"
        >
        </v-textarea>
        <v-text-field
          v-model="formState.price"
          density="compact"
          label="Цена"
          variant="outlined"
          clearable
        >
        </v-text-field>
        <v-file-input
          density="compact"
          multiple
          small-chips
          accept="image/*"
          label="Фотографии"
        ></v-file-input>
        <v-btn @click="handlePublishPart" color="success">
          Опубликовать объявление
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <PartSpecification
          @setPartSpec="updatePartSpec"
          class="part_spec"
        ></PartSpecification>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CarSpecification from "@/components/CarSpecification.vue";
import PartSpecification from "@/components/PartSpecification.vue";
import { reactive } from "vue";
import { gql } from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useUserId } from "@nhost/vue";

const formState = reactive({
  title: "",
  description: null,
  price: 0,
  make: "",
  model: "",
  category: "",
  subcategory: "",
});

const updatePartSpec = (partSpec: { category: string; subcategory: string }) => {
  if (partSpec.category) {
    formState.category = partSpec.category;
  }
  if (partSpec.subcategory) {
    formState.subcategory = partSpec.subcategory;
  }
};

const updateCarSpec = (carSpec: { make: string; model: string }) => {
  if (carSpec.make) {
    formState.make = carSpec.make;
  }
  if (carSpec.model) {
    formState.model = carSpec.model;
  }
};

const handlePublishPart = () => {
  console.log(formState);

  // TODO solve error, I suspect it appears due to provide/inject issues
  const userId = useUserId();
  if (!userId.value) {
    return;
  }

  const { mutate: postPart, error } = useMutation(gql`
    mutation insert_single_part($object: parts_insert_input!) {
      insert_parts_one(object: $object) {
        id
        title
        description
        price
        seller
      }
    }
  `);

  postPart({
    title: formState.title,
    description: formState.description,
    price: formState.price as number,
    seller: userId.value,
  });

  if (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
