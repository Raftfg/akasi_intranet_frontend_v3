import ConfirmerDeconnexionModaleComponent from "@/components/Modale/ConfirmerDeconnexionModaleComponent.vue";
import UserService from "@/services/user.service";
import { mapGetters } from "vuex";
export default {
  components: {
    ConfirmerDeconnexionModaleComponent,
  },
  data() {
    return {
      currentUser: UserService.currentUser(),
    };
  },
  methods: {
    logout() {
      this.$refs.refAfficherDeconnexionModale.fermerModale();
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "auth.login" });
    },
  },
  computed: {
    ...mapGetters("AclModule", {
      //hasPermission: 'hasPermission',
      hasPermissionReadChaineValeur: "hasPermissionReadChaineValeur",
      hasPermissionReadProduction: "hasPermissionReadProduction",
      hasPermissionReadConditionnement: "hasPermissionReadConditionnement",
      hasPermissionReadTransport: "hasPermissionReadTransport",
      hasPermissionReadReception: "hasPermissionReadReception",
      hasPermissionReadTestSanitaire: "hasPermissionReadTestSanitaire",
      hasPermissionReadTransformation: "hasPermissionReadTransformation",
      hasPermissionReadAttributionLot: "hasPermissionReadAttributionLot",
      hasPermissionReadMiseMarche: "hasPermissionReadMiseMarche",
      hasPermissionReadActeur: "hasPermissionReadActeur",
      hasPermissionReadUser: "hasPermissionReadUser",
      hasPermissionReadRole: "hasPermissionReadRole",
      hasPermissionReadFiliereVariete: "hasPermissionReadFiliereVariete",
      hasPermissionReadEtape: "hasPermissionReadEtape",
      hasPermissionReadEtapeDetail: "hasPermissionReadEtapeDetail",
      hasPermissionReadEtapeDetailAttribut:
        "hasPermissionReadEtapeDetailAttribut",
      hasPermissionReadActeurCategorie: "hasPermissionReadActeurCategorie",
      hasPermissionReadInformationSupport:
        "hasPermissionReadInformationSupport",
      hasPermissionReadCertification: "hasPermissionReadCertification",
      hasPermissionReadDepartement: "hasPermissionReadDepartement",
      hasPermissionReadCommune: "hasPermissionReadCommune",
      hasPermissionReadArrondissement: "hasPermissionReadArrondissement",
      hasPermissionReadVillage: "hasPermissionReadVillage",
      hasPermissionReadActivityLog: "hasPermissionReadActivityLog",
    }),
  },
  mounted() {
    let mesRoles = this.$store.getters["AclModule/getMesRoles"];
    this.$store.dispatch("AclModule/actMesPermissions", mesRoles);
    let mesPermissions = this.$store.getters["AclModule/getMesPermissions"];
    this.$store.dispatch("AclModule/actMesPermissionNoms", mesPermissions);
    let mesPermissionNoms =
      this.$store.getters["AclModule/getMesPermissionNoms"];
    //console.log("*****************************");
    //console.log(mesPermissionNoms);
    //Persister le menu cliqué
    var params = document.location.pathname;
    params = params.toLowerCase();

    if (params != "/") {
      $(".nav-sidebar li a").each(function (i) {
        var url = $(this).attr("href");
        if (url != undefined) {
          // console.log(url);
          if (url == "" || url == "#") {
            return true;
          }
          url = url.toLowerCase();
          if (url.indexOf(params) > -1) {
            //$(this).parent().addClass("active open menu-open"); pour les menus plus profonds il me semble
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
