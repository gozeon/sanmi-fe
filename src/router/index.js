import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import axios from "../axios";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    component: () => import("../views/Admin.vue"),
    redirect: { name: "Admin" },
    children: [
      {
        path: "home",
        name: "Admin",
        component: () => import("../views/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "role",
        name: "Admin.Role",
        component: () => import("../views/role/RoleList.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "user",
        name: "Admin.User",
        component: () => import("../views/user/UserList.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "curtain",
        redirect: { name: "Admin.Curtain" },
        component: () => import("../views/curtain/Curtain.vue"),
        children: [
          {
            path: "",
            name: "Admin.Curtain",
            component: () => import("../views/curtain/CurtainList.vue"),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "new",
            name: "Admin.Curtain.New",
            component: () => import("../views/curtain/NewCurtain.vue"),
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Logout" */ "../views/Logout.vue"),
  },
  { path: "**", component: () => import("../views/PageNotFound.vue") },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 需要权限
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    axios
      .get("/user/me")
      .then(({ data }) => {
        store.commit("setUser", data?.data);
        next();
      })
      .catch((e) => {
        next({
          name: "Login",
          query: { nextUrl: to.fullPath },
        });
      });
  } else {
    // 判断 guest
    next();
  }
});

export default router;
