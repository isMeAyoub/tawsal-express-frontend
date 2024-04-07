import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // Accueil
  {
    id: 1,
    label: 'Accueil',
    icon: 'ri-home-5-line',
    link: '/accueil'
  },

  // Gestion des Opérations
  {
    id: 2,
    label: 'Gestion des Opérations',
    isTitle: true
  },
  {
    id: 3,
    label: 'Colis',
    icon: 'ri-inbox-line', // Icône pour les colis
    link: '/colis'
  },
  {
    id: 4,
    label: 'Bons de livraison',
    icon: 'ri-file-list-3-line', // Icône pour les bons de livraison
    link: '/bons-livraison'
  },
  {
    id: 5,
    label: 'Bons d\'envoi',
    icon: 'ri-send-plane-line', // Icône pour les bons d'envoi
    link: '/bons-envoi'
  },
  {
    id: 6,
    label: 'Bons de distribution',
    icon: 'ri-share-forward-line', // Icône pour les bons de distribution
    link: '/bons-distribution'
  },
  {
    id: 7,
    label: 'Demandes de ramassage',
    icon: 'ri-truck-line', // Icône pour les demandes de ramassage
    link: '/demandes-ramassage'
  },

  // Gestion Financière
  {
    id: 8,
    label: 'Gestion Financière',
    isTitle: true
  },
  {
    id: 9,
    label: 'Bons de paiement',
    icon: 'ri-wallet-3-line', // Icône pour les bons de paiement
    link: '/bons-paiement'
  },
  {
    id: 10,
    label: 'Bons de retour',
    icon: 'ri-refresh-line', // Icône pour les bons de retour
    link: '/bons-retour'
  },
  {
    id: 11,
    label: 'Factures',
    icon: 'ri-file-text-line', // Icône pour les factures
    link: '/factures'
  },

  // Gestion de la clientèle
  {
    id: 12,
    label: 'Gestion de la clientèle',
    isTitle: true
  },
  {
    id: 13,
    label: 'Réclamations',
    icon: 'ri-customer-service-2-line',
    link: '/reclamations'
  },
  {
    id: 14,
    label: 'Clients',
    icon: 'ri-team-line',
    link: '/clients'
  },
  {
    id: 15,
    label: 'Nouveau client',
    icon: 'ri-user-add-line', // Icône pour ajouter un nouveau client
    link: '/nouveau-client'
  },

  // Gestion des Utilisateurs
  {
    id: 16,
    label: 'Gestion des Utilisateurs',
    isTitle: true
  },
  {
    id: 17,
    label: 'Utilisateurs',
    icon: 'ri-team-line', // Icône pour la gestion des utilisateurs
    link: '/utilisateurs'
  },
  {
    id: 18,
    label: 'Nouveau livreur',
    icon: 'ri-user-add-line', // Icône pour ajouter un nouveau livreur
    link: '/nouveau-livreur'
  },

  // Paramètres
  {
    id: 19,
    label: 'Paramètres',
    icon: 'ri-settings-3-line',
    subItems: [
      {
        id: 20,
        label: 'Général',
        link: '/parametres/general',
        parentId: 19
      },
      {
        id: 21,
        label: 'Villes de livraison',
        link: '/parametres/villes-livraison',
        parentId: 19
      },
      {
        id: 22,
        label: 'Villes de ramassage',
        link: '/parametres/villes-ramassage',
        parentId: 19
      },
      {
        id: 23,
        label: 'Zones',
        link: '/parametres/zones',
        parentId: 19
      },
      {
        id: 24,
        label: 'Tarifs',
        link: '/parametres/tarifs',
        parentId: 19
      }
    ]
  }
];