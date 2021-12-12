import DashboardLayout from '../layouts/DashboardLayout.vue'
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
    component: DashboardLayout,
    meta: { middleware: "require-auth" },
    children: [
      {
        path: '/facilities',
        name: 'Facilities',
        component: () => import('../views/Facilities.vue'),
      }
    ]
  },
]