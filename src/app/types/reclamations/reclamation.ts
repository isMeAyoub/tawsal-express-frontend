import {ReclamationEtat} from "./reclamation.enum";

export interface Reclamation{

    reclamationId: number;
    objet: string;
    message: string;
    etat: ReclamationEtat;
    type: string;
    createdDate: Date;

    // TODO: Add the following properties: clientId , clientName
}