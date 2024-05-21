import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TranslationsView from '../views/TranslationsView.vue'
import TranslationsTreeView from '../views/TranslationTreeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/translations',
      name: 'translations',
      component: TranslationsView
    },
    {
      path: '/translations/tree',
      name: 'translations-tree',
      component: TranslationsTreeView
    }
  ]
})

export default router
