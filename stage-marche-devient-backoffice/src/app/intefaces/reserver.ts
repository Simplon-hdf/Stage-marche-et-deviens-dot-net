export interface Reserver {
    idReserver: number,
    idUtilisateur: number,
    idSession: number,
    nbrParticipantsInscrits: number,
    ref: string,
    datePaiement: string,
    validation: boolean,
    nbrActuelParticipant: number,
}
