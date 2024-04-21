import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/book/:id",
    name: "book.edit",
    component: () => import("@/views/BookEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/book",
    name: "book.add",
    component: () => import("@/views/BookAdd.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/NXB",
    name: "contactNXB",
    component: () => import("@/views/ContactNXB.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/NXB/:id",
    name: "NXB.edit",
    component: () => import("@/views/NXBEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/NXB",
    name: "NXB.add",
    component: () => import("@/views/NXBAdd.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
