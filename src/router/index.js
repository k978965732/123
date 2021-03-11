import Vue from "vue";
import VueRouter from "vue-router";
import Books from "../views/Books.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "Books" } },
  {
    path: "/books",
    name: "Books",
    component: Books
  },
  {
    path: "/books/:id",
    name: "BookDetail",
    component: Books
  }
];

const router = new VueRouter({
  routes
});

export default router;
