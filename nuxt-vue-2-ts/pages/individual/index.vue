<template>
  <main class="container mb-50">
    <div class="grid grid-cols-12 gap-x-30">
      <IndexPageCards class="col-span-8" />
      <IndexPageUser class="col-span-4" />
    </div>

    <div class="grid grid-cols-12 gap-x-30">
      <IndexPageArticles :articles="articles" class="col-span-8" />

      <div class="col-span-4 mt-30">
        <IndexPageExpensesStatistics
          class="mb-30"
          :expenses-statistics="expensesStatistics"
        />
        <AppsPromoBlock />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import AppsPromoBlock from '~/components/AppsPromoBlock.vue'
import IndexPageArticles from '~/components/IndexPageArticles.vue'
import IndexPageCards from '~/components/IndexPageCards.vue'
import IndexPageExpensesStatistics from '~/components/IndexPageExpensesStatistics.vue'
import IndexPageUser from '~/components/IndexPageUser.vue'
import { ArticlesModule, ShortArticle } from '~/logic/modules/articles'
import {
  Transactions,
  TransactionsExpensesStatistics
} from '~/logic/modules/transactions'

@Component({
  components: {
    AppsPromoBlock,
    IndexPageCards,
    IndexPageUser,
    IndexPageArticles,
    IndexPageExpensesStatistics
  }
})
export default class extends Vue {
  articles: ShortArticle[] = []
  expensesStatistics: TransactionsExpensesStatistics | null | undefined = null

  async asyncData() {
    const statistics = await Transactions.getStatistics()
    return {
      articles: await ArticlesModule.getIndexPageArticles(),
      expensesStatistics: statistics?.expenses
    }
  }
}
</script>
