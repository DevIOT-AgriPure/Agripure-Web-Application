<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`" >
        <div class="logo" style="display: flex;justify-content: center;margin-top: 1rem;margin-bottom: 5rem">
            <img :src="logoURL" alt="Vue"   style="width: 70px;"/>
        </div>

        <div class="menu">
            <router-link to="/farmer/cropInventory" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-home" style="font-size: 1rem; margin-right: 0.9rem;color: white" ></i>
                <p class="text" style="font-size: 1.2rem;color: white">Home</p>
            </router-link>
            <router-link to="/specialist" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-user" style="font-size: 1rem; margin-right: 0.9rem;color: white"></i>
                <span class="text" style="font-size: 1.2rem;color: white">Specialist</span>
            </router-link>
            <router-link to="/" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-tablet" style="font-size: 1rem; margin-right: 0.9rem;color: white"></i>
                <span class="text" style="font-size: 1.2rem;color: white">Devices</span>
            </router-link>
            <router-link to="/farmer/chat" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-comments" style="font-size: 1rem; margin-right: 0.9rem;color: white"></i>
                <span class="text" style="font-size: 1.2rem;color: white">Chat</span>
            </router-link>
            <router-link to="/" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-calendar" style="font-size: 1rem; margin-right: 0.9rem;color: white"></i>
                <span class="text" style="font-size: 1.2rem;color: white">Projects</span>
            </router-link>
            <router-link to="/" class="button" style="margin-bottom: 1rem">
                <i class="pi pi-bell" style="font-size: 1rem; margin-right: 0.9rem;color: white"></i>
                <span class="text" style="font-size: 1.2rem;color: white">Notifications</span>
            </router-link>
        </div>

        <div class="flex"></div>

        <div style="display:flex">
            <pv-avatar image="https://pyxis.nymag.com/v1/imgs/049/bc0/0c4563fc79b3284bdb33bd8ac3521ef94f-14-huell-breaking-bad.2x.rsquare-zoom.w190.jpg" class="mr-2" size="large" shape="circle" style="margin-right: 1rem" />
            <div >
                <p class="text" style="color: white;font-weight: bold">Username</p>
                <p class="text" style="color: #939393;">@usertag</p>

            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.png'
const is_expanded = true
const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem("is_expanded", is_expanded.value)
    this.buttonClicked = true;
}
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

    .logo {
        margin-bottom: 1rem;

        img {
            width: 2rem;
        }
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

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}
</style>