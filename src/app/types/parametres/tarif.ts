export interface Tarif {
    tarifId: number;
    prixLivraison: number;
    prixRetour: number;
    prixRefuse: number;
    delaiLivraison: string;
    villeLivraison: {
        villeId: number;
        nomVille: string;
    };
    villeRamassage: {
        villeId: number;
        nomVille: string;
    };
}