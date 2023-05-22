export class IntersectionObserverService {
  private static _observers: {
    element: HTMLElement
    observer: IntersectionObserver
  }[] = []

  public static attachObserver(
    element: HTMLElement,
    onIntersectionFunction: (
      entry: IntersectionObserverEntry & { target: HTMLElement },
      observer: IntersectionObserver
    ) => any,
    // eslint-disable-next-line no-undef
    observerOptions?: IntersectionObserverInit
  ) {
    const observer = new IntersectionObserver(
      async ([entry]: any, observer) => {
        if (entry.isIntersecting) {
          await onIntersectionFunction(entry, observer)
        }
      },
      observerOptions
    )
    observer.observe(element)
    IntersectionObserverService._observers.push({
      element,
      observer
    })
  }

  public static detachAllObservers() {
    for (const observerData of IntersectionObserverService._observers) {
      observerData.observer.unobserve(observerData.element)
    }
  }
}

export const scrollToElement = (
  element: HTMLElement,
  container = document.body,
  offset = 0
) => {
  container.scrollTop = element.offsetTop - offset
}

export const getBottomScrollLeft = (element: HTMLElement) => {
  return element.scrollHeight - element.scrollTop - element.clientHeight
}

export const scrollToBottom = (element: HTMLElement, offset = 0) => {
  element.scrollTop = element.scrollHeight - offset
}
