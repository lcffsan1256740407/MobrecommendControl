import VueRouter from 'vue-router'

// 导入一级路由
import LoginPage from '../layoutPage/LoginPage.vue'
import HomePage from '../layoutPage/HomePage.vue'

// 导入二级路由
import Channel from "../secondPage/Channel.vue"
import List from "../secondPage/List.vue"
import MyInfo from "../secondPage/MyInfo.vue"

// 导入三级路由
import ShowList from "../secondPage/threePage/ShowList.vue"
import Add from "../secondPage/threePage/Add.vue"
import Complete from "../secondPage/threePage/Complete.vue"
import EditDetail from "../secondPage/threePage/EditDetail.vue"



let router = new VueRouter({
    routes: [
        // 登录页面
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
            meta: { isAuth: false }
        },
        // 主页面
        {
            name: 'home',
            path: '/home',
            component: HomePage,
            meta: { isAuth: true },
            children: [
                {
                    //频道
                    name: 'channel',
                    path: 'channel',
                    component: Channel,
                    meta: { isAuth: true },
                },
                {
                    //我的
                    name: 'myinfo',
                    path: 'myinfo',
                    component: MyInfo,
                    meta: { isAuth: true },
                },
                {
                    //建议书列表页面
                    name: 'list',
                    path: 'list',
                    component: List,
                    meta: { isAuth: true },
                    children: [
                        {
                            //展示列表页
                            name: 'showlist',
                            path: 'showlist',
                            component: ShowList,
                            meta: { isAuth: true },
                        },
                        {
                            //展示添加页
                            name: 'add',
                            path: 'add',
                            component: Add,
                            meta: { isAuth: true },
                        },
                        {
                            //展示完善页
                            name: 'complete',
                            path: 'complete',
                            component: Complete,
                            meta: { isAuth: true },
                        },
                        {
                            //展示详情页
                            name: 'editdetail',
                            path: 'editdetail',
                            component: EditDetail,
                            meta: { isAuth: true },
                        },
                    ]
                }
            ]
        },
        //跳转到404页面
        {
            path: '*',
            component: () => import("../layoutPage/Error404"),
            hidden: true
        }
    ]
})

// 全局前置路由守卫做权限限制
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth == true) {
        if (localStorage.getItem("token") == null) {
            alert("没有权限访问")
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router