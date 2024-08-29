export interface Publication {
    id: number | null;
    nom: string;
    date_publication: Date;
    lien_media: string;
    contenu_text: string;
    id_session: number;
}
