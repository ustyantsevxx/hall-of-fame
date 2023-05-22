// eslint-disable-next-line no-restricted-imports
import InfoCard from './InfoCard.vue'

export default {
  title: 'InfoCard',

  component: InfoCard,

  argTypes: {
    labelFirst: { control: 'boolean' },
    label: { control: 'text', defaultValue: 'Всего' },
    value: { control: 'text', defaultValue: '35ч' }
  }
}

const Template = args => ({
  components: { InfoCard },
  setup() {
    return { args }
  },
  template: '<InfoCard v-bind="args" />'
})

export const Default = Template.bind({})
export const Reversed = Template.bind({})
Reversed.args = { labelFirst: true }
