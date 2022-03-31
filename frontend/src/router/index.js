import { createRouter, createWebHistory } from 'vue-router';

import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import HomeView from "../views/HomeView.vue";
import PublicationView from "../views/PublicationView.vue";
import UpdatePublicationView from "../views/UpdatePublicationView.vue";
import CommentView from "../views/CommentView.vue";
import UpdateCommentView from "../views/UpdateCommentView.vue";
import UpdateProfileView from "../views/UpdateProfileView.vue";
import AdminPanelView from "../views/AdminPanelView.vue";
import AdminPublicationView from "../views/AdminPublicationView.vue";
import AdminCommentaireView from "../views/AdminCommentaireView.vue";
import AdminCommentaireIdView from "../views/AdminCommentaireIdView.vue";
import AdminUserView from "../views/AdminUserView.vue";
import AdminUserIdView from "../views/AdminUserIdView.vue";

const routes = [
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/profile',
    component: ProfileView
  },
  {
    path: '/updateprofile',
    component: UpdateProfileView
  },
  {
    path: '/publications/:id',
    component: PublicationView
  },
  {
    path:'/updatepublication/:id',
    component: UpdatePublicationView
  },
  {
    path: '/comments/:id',
    component: CommentView
  },
  {
    path: '/updatecomment/:id',
    component: UpdateCommentView
  },
  {
    path: '/admin',
    component: AdminPanelView
  },
  {
    path: '/adminpublications/:id',
    component: AdminPublicationView
  },
  {
    path: '/admincommentaires/',
    component: AdminCommentaireView
  },
  {
    path: '/admincommentaire/:id',
    component: AdminCommentaireIdView
  },
  {
    path: '/adminuser/',
    component: AdminUserView
  },
  {
    path: '/adminuser/:id',
    component: AdminUserIdView
  },
  {
    path: '/home',
    component: HomeView,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
