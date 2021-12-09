import AdminLayout from '../layouts/AdminLayout.vue'
import PublicLayout from '../layouts/PublicLayout.vue'

export default [
  {
    path: "",
    component: PublicLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
    ]
  },
  {
    path: "",
    component: AdminLayout,
    meta: { middleware: "require-auth" },
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
      }
    ]
  },
]