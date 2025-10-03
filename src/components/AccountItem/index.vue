<template>
  <v-card variant="outlined">
    <v-card-text>
      <v-form>
        <v-row dense>
          <!-- Метка -->
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.local.labelRaw"
              label="Метка"
              :error="Boolean(state.errors.labelRaw)"
              :error-messages="state.errors.labelRaw"
              hint="Введите несколько меток через ;"
              persistent-hint
              data-test="label-input"
              maxlength="50"
              variant="outlined"
              @blur="onValidateAndSaveHandler"
            />
          </v-col>

          <!-- Тип -->
          <v-col cols="12" md="2">
            <v-select
              v-model="state.local.type"
              :items="accountTypeItems"
              label="Тип записи"
              data-test="type-select"
              variant="outlined"
              item-title="text"
              item-value="value"
              menu-icon="mdi-chevron-down"
              @update:modelValue="onTypeChangeHandler"
            />
          </v-col>

          <!-- Логин -->
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.local.login"
              label="Логин"
              :error="Boolean(state.errors.login)"
              :error-messages="state.errors.login"
              data-test="login-input"
              variant="outlined"
              maxlength="100"
              @blur="onValidateAndSaveHandler"
            />
          </v-col>

          <!-- Пароль -->
          <v-col cols="12" md="3">
            <v-text-field
              v-model="state.local.password"
              type="password"
              label="Пароль"
              :disabled="isAccountTypeLdap"
              :error="Boolean(state.errors.password)"
              :error-messages="state.errors.password"
              data-test="password-input"
              variant="outlined"
              maxlength="100"
              @blur="onValidateAndSaveHandler"
            />
          </v-col>

          <!-- Delete -->
          <v-col cols="12" md="1" class="pt-2 grid text-center">
            <v-btn
              icon="mdi-delete"
              color="error"
              @click="$emit('onDelete', state.local.id)"
              data-test="delete-btn"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useAccountItemComponent, type IAccountItemProps, type IEmits } from './index.script'

const props = defineProps<IAccountItemProps>()
const emits = defineEmits<IEmits>()

const {
  state,
  isAccountTypeLdap,
  onValidateAndSaveHandler,
  onTypeChangeHandler,
  accountTypeItems,
} = useAccountItemComponent(props, emits)
</script>
