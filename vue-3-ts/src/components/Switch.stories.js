// eslint-disable-next-line no-restricted-imports
import Switch from './Switch.vue'

export default {
  title: 'Switch',

  component: Switch,

  argTypes: {
    modelValue: { control: { type: 'boolean' } }
  }
}

const Template = args => ({
  components: { Switch },
  setup() {
    return { args }
  },
  template: '<Switch v-bind="args"  />'
})

export const Default = Template.bind({})
