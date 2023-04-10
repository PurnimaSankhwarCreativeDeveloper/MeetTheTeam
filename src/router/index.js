import { createRouter, createWebHistory } from "vue-router";
import meetTheTeam from "../pages/meetTheTeam/meetTheTeam.route";

const router = createRouter({
    history: createWebHistory(),
    routes: [  ...meetTheTeam ],
});

export default router;