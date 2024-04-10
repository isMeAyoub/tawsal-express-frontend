export interface VilleLivraison {
    villeId: number;
    reference: string;
    nomVille: string;
    isActive: boolean;
    zone: {
        zoneId: number;
        nomZone: string;
    };
}