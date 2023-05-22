export type QuestionAnswer = {
  question: string
  answer: string
}

export type LoyaltyPageContent = {
  id: number
  title: string
  body?: string
  faqs: QuestionAnswer[]
}
