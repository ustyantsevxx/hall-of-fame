import { Directive, DirectiveBinding } from 'vue'

const _scrollClassListener = (el: HTMLElement, { value }: DirectiveBinding) => {
  el.scrollTop > (value.offset ?? 0)
    ? el.classList.add(value.class)
    : el.classList.remove(value.class)
}

export const ScrollClassDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    el.addEventListener('scroll', _scrollClassListener.bind(null, el, binding))
  }
}
