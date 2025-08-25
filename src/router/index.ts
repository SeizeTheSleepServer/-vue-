import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: '/',
            redirect: '/home',
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/login.vue')
                },
                {
                    path:'register',
                    name:'register',
                    component: () => import('../views/register.vue')
                },
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('../views/home.vue')
                },
                {
                path: 'resume',
                name:   'jianli',
                component: () => import('../views/resume.vue')
                },
                {
                    path: 'logout',
                    name: 'logout',
                    component: () => import('../views/logout.vue')
                },
                {
                    path: 'my',
                    name:'my',
                    component: () => import('../views/my.vue')
                },
                {
                    path: 'cancel',
                    name: 'cancel',
                    component: () => import('../views/cancel.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('../views/about.vue')
                },
                {
                    path: 'skill',
                    name: 'skill',
                    component: () => import('../views/skill.vue')
                }
            ]
        }
    ]
})

export default router