<template>
    <aside v-if="shouldShowSidebar">
        <div class="logo">
            <img src="../assets/logo.png" alt="Vue"/>
            <h3 style="color: white;">Agripure</h3>
        </div>
        <div class="menu">
            <router-link v-if="usertype==='farmer'" to="/farmer/cropInventory" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-home" ></i>
                <p class="text" style="font-size: 1.2rem;color: white">Home</p>
            </router-link>
            <router-link v-if="usertype==='farmer'" to="/farmer/specialist" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-user" ></i>
                <span class="text" style="font-size: 1.2rem;color: white">Specialist</span>
            </router-link>
            <router-link v-if="usertype==='farmer'" to="/farmer/chat" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-comments" ></i>
                <span class="text" style="font-size: 1.2rem;color: white">Chat</span>
            </router-link>
            <router-link v-if="usertype==='farmer'" to="/farmer/projects" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-calendar" ></i>
                <span class="text" style="font-size: 1.2rem;color: white">Projects</span>
            </router-link>
            <router-link v-if="usertype==='farmer'" to="/farmer/devices" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-tablet" ></i>
                <span class="text" style="font-size: 1.2rem;color: white">Devices</span>
            </router-link>
            <router-link v-if="usertype==='farmer'" to="/farmer/notifications" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-bell" ></i>
                <span class="text" style="font-size: 1.2rem;color: white">Notifications</span>
            </router-link>
            <router-link v-if="usertype==='specialist'" to="/specialist/farmers" class="button" style="margin-bottom: 1rem">
            <i class="pi pi-user" ></i>
            <span class="text" style="font-size: 1.2rem;color: white">Farmers</span>
          </router-link>
            <router-link v-if="usertype==='specialist'" to="/specialist/chat" class="button" style="margin-bottom: 1rem">
            <i class="pi pi-comments" ></i>
            <span class="text" style="font-size: 1.2rem;color: white">Chat</span>
          </router-link>
            <router-link v-if="usertype==='specialist'" to="/specialist/projects" class="button" style="margin-bottom: 1rem">
            <i class="pi pi-calendar" ></i>
            <span class="text" style="font-size: 1.2rem;color: white">Projects</span>
          </router-link>
            <router-link v-if="usertype==='specialist'" to="/specialist/notifications" class="button" style="margin-bottom: 1rem">
            <i class="pi pi-bell" ></i>
            <span class="text" style="font-size: 1.2rem;color: white">Notifications</span>
          </router-link>
            <router-link to="/farmer/profile" class="button-profile" style="margin-bottom: 1rem">
                <div style="display:flex">
                    <pv-avatar
                        image="https://pyxis.nymag.com/v1/imgs/049/bc0/0c4563fc79b3284bdb33bd8ac3521ef94f-14-huell-breaking-bad.2x.rsquare-zoom.w190.jpg"
                        class="footer-img" shape="circle" />
                    <div class="footer-text">
                        <p class="text" style="color: white;font-weight: bold">Username</p>
                        <p class="text" style="color: #939393;">@usertag</p>
                    </div>
                </div>
            </router-link>

        </div>
    </aside>
</template>

<script>
import { useRoute } from 'vue-router';
import logoURL from '../assets/logo.png'
export default {
    data() {
        return {
            is_expanded: true,
            route: null, // Variable para almacenar la ruta actual
          usertype:""
        };
    },
    computed: {
        shouldShowSidebar() {
            if (this.route) {
                const path = this.route.path;
                this.usertype=sessionStorage.getItem("type")
                return path !== '/sign-in' && path !== '/sign-up';
            }
            return false;
        }
    },
    methods: {
        ToggleMenu() {
            this.is_expanded = !this.is_expanded;
            localStorage.setItem('is_expanded', this.is_expanded);
            this.buttonClicked = true;
        },
    },
    created() {
        this.route = useRoute(); // Obtener la ruta actual
    },
};
</script>


<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;

    background-color: var(--dark);
    color: var(--light);

    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;

    transition: 0.2s ease-in-out;

    .flex {
        flex: 1 1 0%;
    }

    .footer-img{
        width: 2rem;
        height: 2rem;
    }
    .footer-text{
        visibility: hidden;
    }

    .logo {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centra horizontalmente */
        margin-top: 1rem;
        margin-bottom: 5rem;
        color: white;
    }

    .logo img {
        width: 30px;
        margin-bottom: 0.5rem; /* Espacio entre la imagen y el texto */
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s ease-in-out;

        .menu-toggle {
            transition: 0.2s ease-in-out;
            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    h3, .button .text {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        justify-content: center;
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: 0.2s ease-in-out;
            padding: 0.5rem 1rem;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-in-out;
            }
            .text {
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            &:hover {
                background-color: var(--dark-alt);

                .material-icons, .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {
                border-right: 5px solid var(--primary);

                .material-icons, .text {
                    color: var(--primary);
                }
            }
        }
        .button-profile {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 200px;
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: 0.2s ease-in-out;
            margin: 8rem 0.5rem;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-in-out;
            }
            .text {
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            &:hover {

                .material-icons, .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {

                .material-icons, .text {
                    color: var(--primary);
                }
            }
        }
    }

    .menu i{
        font-size: 1rem;
        margin-right: 0.9rem;
        color: white
    }

    .footer {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        p {
            font-size: 0.875rem;
            color: var(--grey);
        }
    }

    &.is-expanded {
        width: var(--sidebar-width);

        .menu-toggle-wrap {
            top: -3rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        h3, .button .text {
            opacity: 1;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }

        .footer {
            opacity: 0;
        }
    }

    @media (min-width: 530px) {
        width: var(--sidebar-width);

        .footer-text{
            visibility: visible;
        }

        .footer-img{
            margin-right: 1rem;
            width: 3rem;
            height: 3rem;
        }

        .menu {
            justify-content: center;
            margin: 0 -1rem;

            .button {
                display: flex;
                align-items: center;
                text-decoration: none;

                transition: 0.2s ease-in-out;
                padding: 0.5rem 1rem;

                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }
                .text {
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }

                &:hover {
                    background-color: var(--dark-alt);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }

                &.router-link-exact-active {
                    border-right: 5px solid var(--primary);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }
            }
        }

        .menu-toggle-wrap {
            top: -3rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        .menu i{
            font-size: 1rem;
            margin-right: 0.9rem;
            color: white
        }

        h3, .button .text {
            opacity: 1;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }

        .footer {
            opacity: 0;
        }

        .logo img {
            width: 50px;
            margin-bottom: 0.5rem; /* Espacio entre la imagen y el texto */
        }
    }

    @media (max-width: 430px) {
        .flex {
            flex: 1 1 0%;
        }

        .footer-img{
            width: 1.5rem;
            height: 1.5rem;
        }
        .footer-text{
            visibility: hidden;
        }

        .logo {
            display: flex;
            flex-direction: column;
            align-items: center; /* Centra horizontalmente */
            margin-top: 1rem;
            margin-bottom: 5rem;
            color: white;
        }

        .logo img {
            width: 30px;
            margin-bottom: 0.5rem; /* Espacio entre la imagen y el texto */
        }

        .menu-toggle-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;

            position: relative;
            top: 0;
            transition: 0.2s ease-in-out;

            .menu-toggle {
                transition: 0.2s ease-in-out;
                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-out;
                }

                &:hover {
                    .material-icons {
                        color: var(--primary);
                        transform: translateX(0.5rem);
                    }
                }
            }
        }

        h3, .button .text {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        h3 {
            color: var(--grey);
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .menu {
            justify-content: center;
            margin: 0 -1rem;

            .button {
                display: flex;
                align-items: center;
                text-decoration: none;
                transition: 0.2s ease-in-out;
                padding: 0.5rem 0.5rem;

                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }
                .text {
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }

                &:hover {
                    background-color: var(--dark-alt);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }

                &.router-link-exact-active {
                    border-right: 5px solid var(--primary);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }
            }
            .button-profile {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                display: flex;
                align-items: center;
                text-decoration: none;
                transition: 0.2s ease-in-out;
                padding: 0.5rem 0.2rem;

                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }
                .text {
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }

                &:hover {

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }

                &.router-link-exact-active {

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }
            }
        }

        .menu i{
            font-size: 1rem;
            margin-right: 0.9rem;
            color: white
        }

        .footer {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;

            p {
                font-size: 0.875rem;
                color: var(--grey);
            }
        }

        &.is-expanded {
            width: var(--sidebar-width);

            .menu-toggle-wrap {
                top: -3rem;

                .menu-toggle {
                    transform: rotate(-180deg);
                }
            }

            h3, .button .text {
                opacity: 1;
            }

            .button {
                .material-icons {
                    margin-right: 1rem;
                }
            }

            .footer {
                opacity: 0;
            }
        }
    }

    @media (max-width: 375px) {
        .flex {
            flex: 1 1 0%;
        }

        .footer-img{
            width: 1rem;
            height: 1rem;
        }
        .footer-text{
            visibility: hidden;
        }

        .logo {
            display: flex;
            flex-direction: column;
            align-items: center; /* Centra horizontalmente */
            margin-top: 1rem;
            margin-bottom: 5rem;
            color: white;
        }

        .logo img {
            width: 30px;
            margin-bottom: 0.5rem; /* Espacio entre la imagen y el texto */
        }

        .menu-toggle-wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;

            position: relative;
            top: 0;
            transition: 0.2s ease-in-out;

            .menu-toggle {
                transition: 0.2s ease-in-out;
                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-out;
                }

                &:hover {
                    .material-icons {
                        color: var(--primary);
                        transform: translateX(0.5rem);
                    }
                }
            }
        }

        h3, .button .text {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        h3 {
            color: var(--grey);
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .menu {
            justify-content: center;
            margin: 0 -1rem;

            .button {
                display: flex;
                align-items: center;
                text-decoration: none;
                transition: 0.2s ease-in-out;
                padding: 0.5rem 0.5rem;

                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }
                .text {
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }

                &:hover {
                    background-color: var(--dark-alt);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }

                &.router-link-exact-active {
                    border-right: 5px solid var(--primary);

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }
            }
            .button-profile {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                display: flex;
                align-items: center;
                text-decoration: none;
                transition: 0.2s ease-in-out;
                padding: 0.5rem 0;

                .material-icons {
                    font-size: 2rem;
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }
                .text {
                    color: var(--light);
                    transition: 0.2s ease-in-out;
                }

                &:hover {

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }

                &.router-link-exact-active {

                    .material-icons, .text {
                        color: var(--primary);
                    }
                }
            }
        }

        .menu i{
            font-size: 1rem;
            margin-right: 0.9rem;
            color: white
        }

        .footer {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;

            p {
                font-size: 0.875rem;
                color: var(--grey);
            }
        }

        &.is-expanded {
            width: var(--sidebar-width);

            .menu-toggle-wrap {
                top: -3rem;

                .menu-toggle {
                    transform: rotate(-180deg);
                }
            }

            h3, .button .text {
                opacity: 1;
            }

            .button {
                .material-icons {
                    margin-right: 1rem;
                }
            }

            .footer {
                opacity: 0;
            }
        }
    }

}
</style>