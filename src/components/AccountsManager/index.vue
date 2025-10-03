<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <span>Управление учетными записями</span>
      <v-btn color="primary" icon="mdi-plus" @click="onAddHandler" data-test="add-btn" />
    </v-card-title>

    <v-card-subtitle>
      Подсказка: в поле «Метка» можно вводить несколько значений, разделяя их символом
      <code>;</code>.
    </v-card-subtitle>

    <v-divider />

    <v-card-text>
      <v-alert v-if="!accounts.length" type="info" variant="outlined">
        Нет учетных записей. Нажмите «+», чтобы добавить.
      </v-alert>
      <v-row v-else dense>
        <v-col cols="12" v-for="account in accounts" :key="account.id">
          <account-item :account="account" @on-save="onSaveHandler" @on-delete="onDeleteHandler" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import AccountItem from '@/components/AccountItem/index.vue'

import { useAccountsManagerComponent } from './index.script'

const { accounts, onAddHandler, onDeleteHandler, onSaveHandler } = useAccountsManagerComponent()
</script>
