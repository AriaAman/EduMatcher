export default defineEventHandler(() => {
  const lycees = [
    { nom: 'Etienne Dolet', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée privé Charles de Foucauld', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée polyvalent Guillaume Tirel', ville: 'Paris', type: 'Lycée Public' },
    { nom: "Lycée polyvalent l'Initiative", ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée polyvalent privé Saint Jean de Montmartre', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée privé Pascal', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée du bâtiment et des travaux publics', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée polyvalent privé Saint-Nicolas', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée privé La Rochefoucauld', ville: 'Paris', type: 'Lycée Privé' },
    { nom: "Lycée technique privé de l'école technique supérieure du laboratoire", ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée privé Charles Péguy', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée privé Sainte-Louise', ville: 'Paris', type: 'Lycée Privé' },
    { nom: "Lycée privé L'Ecole alsacienne", ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée polyvalent ESAA-Ecole Boulle', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée polyvalent Paul Poiret', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée Charlemagne', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée Claude Monet', ville: 'Paris', type: 'Lycée Public' },
    { nom: 'Lycée privé Lucien de Hirsch', ville: 'Paris', type: 'Lycée Privé' },
    { nom: 'Lycée privé Saint-Michel de Picpus', ville: 'Paris', type: 'Lycée Privé' },
  ]

  const classes = ['Seconde', 'Première', 'Terminale']
  const typeBac = ['Général', 'Technologique', 'Professionnel']

  // Sélection aléatoire
  const randomLycee = lycees[Math.floor(Math.random() * lycees.length)]
  const randomClasse = classes[Math.floor(Math.random() * classes.length)]
  const randomTypeBac = typeBac[Math.floor(Math.random() * typeBac.length)]

  return {
    lycee: randomLycee,
    classe: {
      niveau: randomClasse,
      typeBac: randomTypeBac,
    },
  }
})