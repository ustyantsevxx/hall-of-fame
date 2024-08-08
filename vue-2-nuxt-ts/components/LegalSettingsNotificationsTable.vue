<template>
  <table class="w-full">
    <thead>
      <tr class="align-bottom border-b border-gray-100">
        <th class="pb-14 font-normal text-left">
          <slot name="first-column-header"></slot>
        </th>
        <th
          class="px-5 pb-14 font-normal text-center"
          :class="{ 'opacity-50': disabled }"
        >
          xx
        </th>
        <th
          class="px-5 pb-14 font-normal text-center"
          :class="{ 'opacity-50': disabled }"
        >
          Email
        </th>
      </tr>
    </thead>

    <tbody :class="{ 'opacity-50': disabled }">
      <tr>
        <td colspan="3" class="pb-14 border-t border-gray-100"></td>
      </tr>

      <template v-if="items.length > 0">
        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
          <td class="pr-50 pb-14" style="width: 650px">
            <div class="flex items-center space-x-19">
              <span class="text-gray-500">{{ item.name_translate }}</span>
              <div
                v-if="item.fields.balance"
                class="flex items-center space-x-8"
              >
                <InputDefault
                  v-model="item.balance"
                  :step="0.01"
                  :input-classes="{ 'text-center': true }"
                  :disabled="disabled"
                  type="number"
                  size="sm"
                  class="w-89"
                  rounded
                />
                <span class="text-description text-gray-500">&#8381;</span>
              </div>
            </div>
          </td>
          <td class="px-5 pb-14">
            <div class="flex justify-center">
              <InputCheckbox
                v-model="item.send_to_phone"
                :disabled="disabled"
                icon-size="22px"
              />
            </div>
          </td>
          <td class="px-5 pb-14">
            <div class="flex justify-center">
              <InputCheckbox
                v-model="item.send_to_email"
                :disabled="disabled"
                icon-size="22px"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="3">
            <div class="flex justify-center">
              <span>xx xx xx</span>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import InputCheckbox from '~/components/InputCheckbox.vue'
import InputDefault from '~/components/InputDefault.vue'
import { NotificationSettings } from '~/logic/modules/push-notification-settings'

@Component({
  components: {
    InputCheckbox,
    InputDefault
  }
})
export default class LegalSettingsNotificationsTable extends Vue {
  @Prop({ type: Array, required: true }) items!: NotificationSettings[]
  @Prop({ type: Boolean, default: false }) disabled!: boolean
}
</script>
