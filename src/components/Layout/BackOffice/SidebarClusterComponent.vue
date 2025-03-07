<template>
  <!-- Main Sidebar Container -->
  <!-- <div class="sidebar-mini"> -->
  <aside class="main-sidebar sidebar-dark-akgblue elevation-4">
    <!-- Brand Logo -->
    <router-link :to="{ name: 'pages.accueil' }" class="brand-link">
      <img
        src="@/assets/images/elements/akasiw.png"
        alt="Logo"
        class="brand-image"
      />
      <span class="brand-text text-white">Akasi Intranet</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <font-awesome-icon
            icon="user"
            class="fa-2xl text-white"
            alt="Photo User"
          />
        </div>
        <div class="info text-capitalize">
          <router-link :to="{ name: 'profil.show' }" class="d-block text-white">
            {{ currentUser.user.firstname }} {{ currentUser.user.lastname }}
          </router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library -->
          <li class="nav-item">
            <router-link :to="{ name: 'dashboard' }" class="nav-link">
              <font-awesome-icon icon="gauge" class="nav-icon text-white" />
              <p class="text-white">
                Tableau de bord
                <!-- Dashboard -->
              </p>
            </router-link>
          </li>
          <li class="nav-item nav-item-parent">
            <a to="#" class="nav-link nav-link-parent" @click="toggleMenu('rapports')">
              <font-awesome-icon
                icon="file-prescription"
                class="nav-icon text-white"
              />
              <p class="text-white">
                Rapports Hebdomadaires
                <font-awesome-icon icon="angle-left" class="right" />
              </p>
            </a>
            <ul v-if="activeMenu === 'rapports'" class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  v-if="role != 'DG'"
                  :to="{
                    name: 'report.create',
                  }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon
                    icon="circle-plus"
                    class="nav-icon text-white"
                  />
                  <p class="text-white">Ajouter</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'report.list',
                  }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon icon="list" class="nav-icon text-white" />
                  <p class="text-white">Liste</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item nav-item-parent">
            <a to="#" class="nav-link nav-link-parent" @click="toggleMenu('demandes')">
              <font-awesome-icon
                icon="hourglass-start"
                class="nav-icon text-white"
              />
              <p class="text-white">
                Mes Demandes
                <!--  MyRequest -->
                <font-awesome-icon icon="angle-left" class="right" />
              </p>
            </a>
            <ul v-if="activeMenu === 'demandes'" class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  v-if="role != 'DG'"
                  :to="{ name: 'request.create' }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon
                    icon="circle-plus"
                    class="nav-icon text-white"
                  />
                  <p class="text-white">Ajouter</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'request.list' }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon icon="list" class="nav-icon text-white" />
                  <p class="text-white">Liste</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item nav-item-parent" v-if="role == 'DG'">
            <a to="#" class="nav-link nav-link-parent" @click="toggleMenu('utilisateurs')">
              <font-awesome-icon icon="users" class="nav-icon text-white" />
              <p class="text-white">
                Utilisateurs
                <font-awesome-icon icon="angle-left" class="right" />
              </p>
            </a>
            <ul  v-if="activeMenu === 'utilisateurs'" class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'user.create' }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon
                    icon="circle-plus"
                    class="nav-icon text-white"
                  />
                  <p class="text-white">Ajouter</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'user.list' }" class="nav-link ms-3">
                  <font-awesome-icon icon="list" class="nav-icon text-white" />
                  <p class="text-white">Liste</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'user.desactivated' }" class="nav-link ms-3">
                  <font-awesome-icon icon="user-slash" class="nav-icon text-white" />
                  <p class="text-white">Comptes Désactivés</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item nav-item-parent">
            <a to="#" class="nav-link nav-link-parent" @click="toggleMenu('equipes')">
              <font-awesome-icon
                icon="people-group"
                class="nav-icon text-white"
              />
              <p class="text-white">
                Équipes
                <font-awesome-icon icon="angle-left" class="right" />
              </p>
            </a>
            <ul v-if="activeMenu === 'equipes'" class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'team.create' }"
                  class="nav-link ms-3"
                  v-if="role == 'DG'"
                >
                  <font-awesome-icon
                    icon="circle-plus"
                    class="nav-icon text-white"
                  />
                  <p class="text-white">Ajouter</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'team.list' }" class="nav-link ms-3">
                  <font-awesome-icon icon="list" class="nav-icon text-white" />
                  <p class="text-white">Liste</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item nav-item-parent" >
            <a to="#" class="nav-link nav-link-parent" @click="toggleMenu('projets')">
              <font-awesome-icon
                icon="lightbulb"
                class="nav-icon text-white"
              />
              <p class="text-white">
                Projets
                <font-awesome-icon icon="angle-left" class="right" />
              </p>
            </a>
            <ul v-if="activeMenu === 'projets'" class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'project.create' }"
                  class="nav-link ms-3"
                  v-if="role == 'DG'"
                >
                  <font-awesome-icon
                    icon="circle-plus"
                    class="nav-icon text-white"
                  />
                  <p class="text-white">Ajouter</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'project.list' }"
                  class="nav-link ms-3"
                >
                  <font-awesome-icon icon="list" class="nav-icon text-white" />
                  <p class="text-white">Liste</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a
              :to="'#'"
              class="nav-link nav-link-parent"
              data-bs-toggle="modal"
              data-bs-target="#confirmerDeconnexionModale"
            >
              <font-awesome-icon
                icon="power-off"
                class="nav-icon text-danger"
              />
              <p class="text-white">Logout</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
  <!-- </div> -->

  <ConfirmerDeconnexionModaleComponent
    ref="refAfficherDeconnexionModale"
    :logout="logout"
  />
</template>

<script>
import ConfirmerDeconnexionModaleComponent from "@/components/Modale/ConfirmerDeconnexionModaleComponent.vue";
import UserService from "@/services/user.service";
export default {
  components: {
    ConfirmerDeconnexionModaleComponent,
  },
  data() {
    return {
      currentUser: UserService.currentUser(),
      role: UserService.currentUser().user.title,
      activeMenu: null, 
    };
  },
  methods: {
    toggleMenu(menu) {
      // Permet d'ouvrir/fermer un menu
      if (this.activeMenu === menu) {
        this.activeMenu = null; // Fermer si le menu est déjà ouvert
      } else {
        this.activeMenu = menu; // Ouvrir le menu
      }
    },
    logout() {
      this.$refs.refAfficherDeconnexionModale.fermerModale();
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "auth.login" });
    },
  },
  mounted() {
    //Persister le menu cliqué
    var params = document.location.pathname;
    params = params.toLowerCase();
    //Ceci permet d'initialiser le Sidebar pour faire fonctionner le Treeview : Il marche pas du premier coup
    // Ceci a peut-être amené un autre bug, celui de ne pas pouvoir fermer le menu ouvert, à moins de cliquer sur un autre treeview
    $('[data-widget="treeview"]').Treeview('init');
    
    document.body.classList.add('layout-navbar-fixed', 'layout-fixed', 'sidebar-mini')


    if (params != "/") {
      $(".nav-sidebar li a").each(function (i) {
        var url = $(this).attr("href");
        if (url != undefined) {
          if (url == "" || url == "#") {
            return true;
          }
          url = url.toLowerCase();
          if (url.indexOf(params) > -1) {
            $(this).parent().addClass("active open menu-open");
            $(this).parent().parent().addClass("active open menu-open");
            $(this)
              .parent()
              .parent()
              .parent()
              .addClass("active open menu-open");
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("active open menu-open");
            $(this)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .addClass("active open menu-open");
            return false;
          }
        }
      });
    }
  },
};
</script>

<style scoped>
a.nav-link-parent:hover,
a.nav-link:hover,
li.nav-item a.router-link-active,
li.nav-item a.router-link-exact-active {
  background-color: #0c4cb4 !important;
  color: #fff !important;
}
li.menu-open > a:first-child {
  background-color: #0b3a85 !important;
}
a.nav-link-parent {
  cursor: pointer;
}
</style>
