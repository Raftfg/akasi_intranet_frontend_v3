<template>
  <BackOfficePageContent nomPage="Ajouter un rapport">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>

      <div class="card">
        <div class="card-header border-transparent">
          <h3 class="card-title"></h3>
        </div>

        <div class="card-body">
          <form @submit.prevent="bdObjetSave">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group"></div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="goals">
                    Objectifs de la semaine
                    <span class="text-danger">*</span>
                  </label>
                  <div v-if="checked">
                    <div
                      v-for="(goal, index) in bdObjet.goals"
                      :key="index"
                      class="mb-2"
                    >
                      <input
                        type="text"
                        class="goals form-control"
                        id="goals"
                        :value="goal"
                        disabled
                      />
                    </div>
                  </div>

                  <div v-else>
                    <div
                      v-for="(goal, index) in goals"
                      :key="index"
                      class="mb-2"
                    >
                      <div v-html="goal.val"></div>
                    </div>

                    <div class="d-flex align-items-center">
                      <div class="btn btn-success" @click="addGoal">+</div>
                      <div
                        class="btn btn-danger ml-3"
                        @click="removeGoal"
                        v-if="goals.length > 1"
                      >
                        -
                      </div>
                    </div>
                  </div>
                  <AgBaseInputCheckBoxComponent
                    nom="same"
                    label="Même objectifs que la semaine dernière"
                    v-model="checked"
                    class="mt-3"
                    labClass="ml-2"
                    @change="pop"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="status"
                    >Mes status <span class="text-danger">*</span>
                  </label>
                  <select
                    required
                    name="status"
                    id=""
                    class="form-control"
                    v-model="bdObjet.status"
                  >
                    <option value="0">En retard</option>
                    <option value="1">En cours</option>
                    <option value="2">Terminer</option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="achievements">
                    Travaux réalisés
                    <span class="text-danger">*</span>
                  </label>

                  <div
                    v-for="(achievement, index) in achievements"
                    :key="index"
                    class="mb-2"
                  >
                    <div class="form-group">
                      <select
                        required
                        name="status"
                        :id="`title${achievement.id}`"
                        class="form-control"
                        v-model="achievement.title"
                        :selected="option === ''"
                      >
                        <option value="0" disabled>Choisir un objectif</option>
                        <option
                          v-for="(goal, index) in goalsOptions"
                          :key="index"
                          :value="goal"
                        >
                          {{ goal }}
                        </option>
                      </select>
                    </div>
                    <div v-html="achievement.val"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="btn btn-success" @click="addAchievement">+</div>
                    <div
                      class="btn btn-danger ml-3"
                      @click="removeAchievement"
                      v-if="achievements.length > 1"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="observations">
                    Problème(s) et Commentaires
                    <span class="text-danger">*</span>
                  </label>

                  <div
                    v-for="(observation, index) in observations"
                    :key="index"
                    class="mb-2"
                  >
                    <div v-html="observation.val"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="btn btn-success" @click="addObservation">+</div>
                    <div
                      class="btn btn-danger ml-3"
                      @click="removeObservation"
                      v-if="observations.length > 1"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="nextGoals">
                    Objectif(s) de la semaine prochaine
                    <span class="text-danger">*</span>
                  </label>

                  <div
                    v-for="(nextGoal, index) in nextGoals"
                    :key="index"
                    class="mb-2"
                  >
                    <div v-html="nextGoal.val"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="btn btn-success" @click="addNextGoal">+</div>
                    <div
                      class="btn btn-danger ml-3"
                      @click="removeNextGoal"
                      v-if="nextGoals.length > 1"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-12">
                <div class="form-group">
                  <AgBaseTextareaComponent hidden v-model="bdObjet.status" />
                </div>
              </div> -->
            </div>
            <AgBaseButtonSubmitComponent
              buttonText="Enregistrer"
              :loading="loading"
            />
            <router-link
              :to="{
                name: 'report.list',
              }"
            >
              <div class="btn btn-danger ml-2 mt-3 p-2">Annuler</div>
            </router-link>
          </form>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>
<script>
import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseInputCheckBoxComponent from "@/components/Form/Field/AgBaseInputCheckBoxComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "RapportCreate",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
    AgBaseInputCheckBoxComponent,
  },
  data() {
    return {
      bdObjet: {
        status: "0",
        goals: "",
      },
      goalsOptions: [],
      error:false,
      goals: [
        {
          id: "0",
          val: "<input type='text' class='goals form-control' id='goals'  required />",
          title: "0",
          content: "",
        },
      ],
      achievements: [
        {
          id: "0",
          val: "<input type='text' class='achievements form-control' id='achievements' required />",
          title: "0",
        },
      ],
      observations: [
        {
          id: "0",
          val: "<input type='text' class='observations form-control' id='observations' required />",
        },
      ],
      nextGoals: [
        {
          id: "0",
          val: "<input type='text' class='nextGoals form-control' id='nextGoals' required />",
        },
      ],
      checked: false,
      loading: false,
      /* selectOptionItems: [
        { id: "0", content: "En retard" },
        { id: "1", content: "En cours" },
        { id: "2", content: "Terminer" },
      ], */
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Rapport", nomRoute: "report.list", parametres: {} },
        { texte: "Ajouter", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    populateGoal() {
      let goals = document.getElementsByClassName("goals");
      //console.log("goals", goals);
      let val = [];
      for (let i = 0; i < goals.length; i++) {
        val.push(goals[i].value);
      }

      this.goalsOptions = val;
      //console.log("goals", this.goalsOptions);
    },
    pop() {
      if (this.checked) {
        RapportDataService.getAll()
          .then((response) => {
            this.bdObjet.goals =
              response.data.reports[response.data.reports.length - 1].goals;
            this.isLoadingTable = false;
            // this.colonnesTable = response.data.colonnesTableAffichable
          })
          .catch((e) => {});
      } else {
        this.bdObjet.goals = "";
      }
    },
    removeGoal() {
      this.goals = this.goals.filter((it) => it.id != this.goals.length - 1);
      let tab = document.getElementsByTagName("input");
      for (let index = 0; index < tab.length; index++) {
        tab[index].addEventListener("keyup", () => {
          this.populateGoal();
        });
      }
    },
    addGoal() {
      let i = {
        id: this.goals.length,
        val: "<input type='text' class='goals form-control' id='goals' required />",
      };
      this.goals.push(i);
      setTimeout(() => {
        let tab = document.getElementsByTagName("input");
        for (let index = 0; index < tab.length; index++) {
          tab[index].addEventListener("keyup", () => {
            this.populateGoal();
          });
        }
      }, 1000);
    },
    removeAchievement() {
      this.achievements = this.achievements.filter(
        (it) => it.id != this.achievements.length - 1
      );
      this.populateGoal();
    },
    addAchievement() {
      let i = {
        id: this.achievements.length,
        title: "0",
        val: "<input type='text' class='achievements form-control' id='achievements' required />",
      };
      this.achievements.push(i);
    },
    removeObservation() {
      this.observations = this.observations.filter(
        (it) => it.id != this.observations.length - 1
      );
    },
    addObservation() {
      let i = {
        id: this.observations.length,
        val: "<input type='text' class='observations form-control' id='observations' required />",
      };
      this.observations.push(i);
    },
    removeNextGoal() {
      this.nextGoals = this.nextGoals.filter(
        (it) => it.id != this.nextGoals.length - 1
      );
    },
    addNextGoal() {
      let i = {
        id: this.nextGoals.length,
        val: "<input type='text' class='nextGoals form-control' id='nextGoals' />",
      };
      this.nextGoals.push(i);
    },
    bdObjetSave() {
      this.loading = true;
      let goals = document.getElementsByClassName("goals");
      let achievements = document.getElementsByClassName("achievements");
      let observations = document.getElementsByClassName("observations");
      let nextGoals = document.getElementsByClassName("nextGoals");

      if (this.bdObjet.goals == "") {
        this.bdObjet.goals = [];
        for (let i = 0; i < goals.length; i++) {
          this.bdObjet.goals.push(goals[i].value);
        }
      }
      this.bdObjet.achievements = [];
      this.bdObjet.observations = [];
      this.bdObjet.next_goals = [];

      let tabs = [];
      this.error = false;
      for (let j = 0; j < achievements.length; j++) {
        if (this.achievements[j].title == "0") {
          this.loading = false;
          this.error = true;
        } else {
          let obj = {
            title: this.achievements[j].title,
            content: achievements[j].value,
          };
          tabs.push(obj);
        }
      }
      if (this.error) {
        this.$refs.refAlerteMessage.setAlerteMessageErreur(
          "Veuillez renseigner tous les champs"
        );
      } else {
        for (let m = 0; m < this.goalsOptions.length; m++) {
          const filtered = tabs.filter(
            (tab) => tab.title === this.goalsOptions[m]
          );
          let contents = [];
          if (filtered.length > 0) {
            for (let n = 0; n < filtered.length; n++) {
              contents.push(filtered[n].content);
            }
          }
          const newObj = {
            title: filtered[0].title,
            content: contents,
          };
          this.bdObjet.achievements.push(newObj);
        }
        //console.log("this", this.bdObjet.achievements);
        for (let k = 0; k < observations.length; k++) {
          this.bdObjet.observations.push(observations[k].value);
        }
        for (let l = 0; l < nextGoals.length; l++) {
          this.bdObjet.next_goals.push(nextGoals[l].value);
        }

        //console.log("ok", this.bdObjet);
        /*  this.bdObjet.goals = this.bdObjet.goals.toString();
      this.bdObjet.achievements = this.bdObjet.achievements.toString();
      this.bdObjet.observations = this.bdObjet.observations.toString();
      this.bdObjet.next_goals = this.bdObjet.next_goals.toString();
        */
        RapportDataService.create(this.bdObjet)
          .then((response) => {
            // this.bdObjet.id = response.data.data.id;
            this.loading = false;
            this.$router.push({
              name: "report.list",
              query: { alertSucces: "Rapport créé avec succès" },
            });
          })
          .catch((err) => {
            this.loading = false;

            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Erreur lors de la création du rapport !"
            );
          });
      }
    },
 
  },
  mounted() {
    let tab = document.getElementsByTagName("input");
    for (let index = 0; index < tab.length; index++) {
      tab[index].addEventListener("keyup", () => {
        this.populateGoal();
      });
    }
  },
};
</script>
