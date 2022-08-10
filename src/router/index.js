import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";

// if we are importing a module this way, the file will be made into a chunk during the build
const HomeView = () => import("../views/HomeView.vue");
const ManageView = () => import("../views/ManageView.vue");
const SingleSong = () => import("../views/SingleSong.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    name: "manage",
    path: "/manage-music",
    // alias: "/manage",
    component: ManageView,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: (to, from, next) => {
    //   console.log("Manage Route Guard");
    //   next();
    // },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: SingleSong,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
