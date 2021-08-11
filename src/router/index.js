import VueRouter from 'vue-router'

// 导入一级路由
import LoginPage from '../layoutPage/LoginPage.vue'
import HomePage from '../layoutPage/HomePage.vue'

// 导入二级路由
import Channel from "../secondPage/Channel.vue"
import List from "../secondPage/List.vue"
import MyInfo from "../secondPage/MyInfo.vue"

let router = new VueRouter({
    routes: [
        // 登录页面
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        // 主页面
        {
            name: 'home',
            path: '/home',
            component: HomePage,
            children: [
                {
                    //频道
                    name: 'channel',
                    path: 'channel',
                    component: Channel,
                },
                {
                    //建议书列表页面
                    name: 'list',
                    path: 'list',
                    component: List,
                },
                {
                    //我的
                    name: 'myinfo',
                    path: 'myinfo',
                    component: MyInfo,
                }
            ]
        }
    ]
})


export default router