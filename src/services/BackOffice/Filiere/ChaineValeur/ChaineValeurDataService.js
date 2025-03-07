/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
import http from "@/http-common";
class ChaineValeurDataService {
    nomRoute = "chaine_valeurs";
    
    /**
     * @param qp chaine de paramètres
     * Liste
     * @returns {unresolved}
     */
    getAll(qp="") {
        return http.get("/" + this.nomRoute+qp);
    }
    /**
     * Liste des variétés
     * @returns {unresolved}
     */
    getFiliereVarietes() {
        return http.get("/filiere_varietes");
    }
    /**
     * Show
     * @param {type} uuid
     * @returns {unresolved}
     */
    get(uuid) {
        return http.get(`/`+this.nomRoute+`/${uuid}`);
    }
    /**
     * Store
     * @param {type} data
     * @returns {unresolved}
     */
    create(data) {
        return http.post("/"+this.nomRoute, data);
    }
    /**
     * Update
     * @param {type} uuid
     * @param {type} data
     * @returns {unresolved}
     */
    update(uuid, data) {
        return http.put(`/`+this.nomRoute+`/${uuid}`, data);
    }
    /**
     * Delete
     * @param {type} uuid
     * @returns {unresolved}
     */
    delete(uuid) {
        return http.delete(`/`+this.nomRoute+`/${uuid}`);
    }
    /**
     * Recherche
     * @param {type} requete
     * @returns {unresolved}
     */
    recherche(requete) {
        return http.get(`/`+this.nomRoute+`?requete=${requete}`);
    }
}
export default new ChaineValeurDataService();