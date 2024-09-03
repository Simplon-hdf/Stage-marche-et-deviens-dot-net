export interface Utilisateur {
    id : number|null,
    prenom: string,
    nom: string,
    tel: string,
    mdp: string,
    mail: string,
    totalDistanceParcourue: number|null,
    dateCreation: string|null,
}
