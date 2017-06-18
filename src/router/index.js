import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/HomeView'
import DetailView from '../components/DetailView'
import PostView from '../components/PostView'
import RouteEditorView from '../components/RouteEditorView'
import SettingView from '../components/SettingView'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/post',
      name: 'post',
      component: PostView
    },
    {
      path: '/editor',
      name: 'editor',
      component: RouteEditorView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    }
  ]
})
