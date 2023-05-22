<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'

import InputBase from '~/components/InputBase.vue'

@Component
export default class InputBaseValidatable extends InputBase {
  @Prop({ type: Boolean, default: false }) invalid!: boolean
}
</script>
