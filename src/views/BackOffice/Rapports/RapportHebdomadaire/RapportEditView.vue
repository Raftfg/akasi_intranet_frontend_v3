<template>
  <BackOfficePageContent nomPage="Editer un rapport">
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
                <div class="form-group">
                  <label for="goals">
                    Objectifs de la semaine
                    <span class="text-danger">*</span>
                  </label>
                  <div
                    v-for="(goal, index) in bdObjet.goals"
                    :key="index"
                    class="mb-2"
                  >
                    <input
                      type="text"
                      class="goals form-control"
                      id="goals"
                      v-model="bdObjet.goals[index]"
                    />
                  </div>
                  <div v-for="(goal, index) in goals" :key="index" class="mb-2">
                    <div v-html="goal.val"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="btn btn-success" @click="addGoal">+</div>
                    <div
                      class="btn btn-danger ml-3"
                      @click="removeGoal"
                      v-if="goals.length > 0"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="achievements">
                    Travaux réalisés
                    <span class="text-danger">*</span>
                  </label>
                  <div
                    v-for="(achievement, index) in bdObjet.achievements"
                    :key="index"
                    class="mb-3"
                  >
                    <div
                      v-for="(content, ind) in achievement.content"
                      :key="ind"
                      class="mb-2"
                    >
                      <select
                        required
                        name="status"
                        :id="`title${achievement.id}`"
                        class="form-control mb-1 selectedAchievement"
                        v-model="achievement.title"
                      >
                        <option
                          v-for="(goal, indx) in goalsOptions"
                          :key="indx"
                          :value="goal.val"
                        >
                          {{ goal.val }}
                        </option>
                      </select>
                      <input
                        type="text"
                        class="achievements form-control"
                        id="achievements"
                        v-model="bdObjet.achievements[index].content[ind]"
                      />
                    </div>
                  </div>
                  <div
                    v-for="(achievement, index) in achievements"
                    :key="index"
                    class="mb-3"
                  >
                    <select
                      required
                      name="status"
                      :id="`title${achievement.id}`"
                      class="form-control mb-1 selectedAchievement"
                      v-model="achievement.title"
                    >
                      <option value="0" disabled>Choisir un objectif</option>
                      <option
                        v-for="(goal, index) in goalsOptions"
                        :key="index"
                        :value="goal.val"
                      >
                        {{ goal.val }}
                      </option>
                    </select>
                    <div v-html="achievement.val"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="btn btn-success" @click="addAchievement">+</div>
                    <div
                      class="btn btn-danger ml-3"
                      @click="removeAchievement"
                      v-if="achievements.length > 0"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="status"
                    >Mes status <span class="text-danger">*</span>
                  </label>
                  <select
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
                  <label for="observations">
                    Problème(s) et Commentaires
                    <span class="text-danger">*</span>
                  </label>
                  <div
                    v-for="(observation, index) in bdObjet.observations"
                    :key="index"
                    class="mb-2"
                  >
                    <input
                      type="text"
                      class="observations form-control"
                      id="observations"
                      v-model="bdObjet.observations[index]"
                    />
                  </div>
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
                      v-if="observations.length > 0"
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
                    v-for="(next_goal, index) in bdObjet.next_goals"
                    :key="index"
                    class="mb-2"
                  >
                    <input
                      type="text"
                      class="nextGoals form-control"
                      id="nextGoals"
                      v-model="bdObjet.next_goals[index]"
                    />
                  </div>
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
                      v-if="nextGoals.length > 0"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseTextareaComponent hidden v-model="bdObjet.status" />
                </div>
              </div>
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
import { useRoute } from "vue-router";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "RapportCreate",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseTextareaComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {},
      loading: false,
      id: null,
      goalsOptions: [],
      error: false,
      goals: [],
      achievements: [],
      observations: [],
      nextGoals: [],
      selectOptionItemsEtapeBase: [],
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

      //    this.goalsOptions = [];
      for (let i = 0; i < goals.length; i++) {
        let it = {
          id: i,
          val: goals[i].value,
        };
        val.push(it);

        this.bdObjet.achievements.forEach((achievement, index) => {
          if (
            this.goalsOptions[i] &&
            achievement.title == this.goalsOptions[i].val
          ) {
            achievement.title = goals[i].value;
          }
        });
      }

      this.goalsOptions = val;

      //this.goalsOptions = val;
      //console.log("goals", this.goalsOptions);
    },
    bdObjetGet(id) {
      RapportDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.report;
          //this.bdObjet.goals.default = response.data.report.goals;
          this.id = id;

          response.data.report.goals.forEach((element, index) => {
            let it = {
              id: index,
              val: element,
            };

            this.goalsOptions.push(it);
          });

          let tab = document.getElementsByTagName("input");
          setTimeout(() => {
            for (let index = 0; index < tab.length; index++) {
              tab[index].addEventListener("keyup", () => {
                this.populateGoal();
              });
            }
          }, 1000);
        })
        .catch((e) => {});
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
    },
    addAchievement() {
      let i = {
        id: this.achievements.length,
        val: "<input type='text' class='achievements form-control' id='achievements' required />",
        title: "0",
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
      let selectedAchievements = document.getElementsByClassName(
        "selectedAchievement"
      );

      this.bdObjet.goals = [];
      this.bdObjet.achievements = [];
      this.bdObjet.observations = [];
      this.bdObjet.next_goals = [];

      /* for (let i = 0; i < goals.length; i++) {
        this.bdObjet.goals.push(goals[i].value);
      }
      for (let j = 0; j < achievements.length; j++) {
        this.bdObjet.achievements.push(achievements[j].value);
      }
      for (let k = 0; k < observations.length; k++) {
        this.bdObjet.observations.push(observations[k].value);
      }
      for (let l = 0; l < nextGoals.length; l++) {
        this.bdObjet.next_goals.push(nextGoals[l].value);
      } */
      for (let i = 0; i < goals.length; i++) {
        this.bdObjet.goals.push(goals[i].value);
      }
      let tabs = [];
      this.error = false;
      for (let j = 0; j < achievements.length; j++) {
        console.log("ok", selectedAchievements[j].value);
        if (selectedAchievements[j].value == "0") {
          this.loading = false;
          this.error = true;
        } else {
          let obj = {
            title: selectedAchievements[j].value,
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
            (tab) => tab.title === this.goalsOptions[m].val
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

        RapportDataService.update(this.id, this.bdObjet)
          .then((response) => {
            this.$router.push({
              name: "report.list",
              query: { alertSucces: "Rapport mis à jour avec succès" },
            });
            this.loading = false;
          })
          .catch((e) => {
            this.loading = false;
            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Erreur lors de la mise à jour du rapport !"
            );
          });
      }
    },
  },
  mounted() {
    const route = useRoute();
    this.bdObjetGet(route.params.id);
  },
};
</script>
