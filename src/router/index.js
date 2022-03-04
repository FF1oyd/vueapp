import {createRouter, createWebHistory} from 'vue-router'
import Register from '@/views/RegisterView'
import GlobalFeed from '@/views/GlobalFeedView'
import Login from '@/views/LoginView'
import YourFeed from '@/views/YourFeed'
import TagFeed from '@/views/TagFeed'
import ArticleView from '@/views/ArticleView'
import CreateArticle from '@/views/CreateArticle'
import EditArticle from '@/views/EditArticle'
import Settings from '@/views/SettingsView'
import UserProfile from '@/views/UserProfile'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/articles/new',
    name: 'createArticles',
    component: CreateArticle
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: ArticleView
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile
  },

]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
