<script lang="ts" setup>
import { logout } from "../modules/authentication/logout.js";
import { useUserStore } from "../modules/user/use-user-store.js";
import MainMenu from "./MainMenu.vue";

const userStore = useUserStore();
</script>

<template>
  <header>
    <nav class="navbar navbar-expand">
      <div class="container-fluid">
        <div
          data-bs-target="#main-menu"
          data-bs-toggle="offcanvas"
          role="button"
        >
          Menu →
        </div>

        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
            >
              {{ userStore.user?.username }}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

    <MainMenu></MainMenu>
  </header>
</template>
