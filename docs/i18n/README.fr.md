# Doctor Bones

Doctor Bones est un modèle de dépôt indépendant des fournisseurs d’IA pour le développement assisté par IA.

Il aide à garder la mémoire du projet dans le dépôt, au lieu de la laisser enfermée dans le chat. Il donne à l’équipe humain/IA une discipline de travail partagée : ordres de travail, playbooks, exemples, vérifications, règles de passation et habitudes de préparation aux releases.

Tu n’as pas forcément besoin de cloner en local la copie modèle de ton dépôt pour l’utiliser. Doctor Bones porte sa cognitionkitecture dans le dépôt lui-même. Si tu suis les instructions de démarrage ci-dessous, ton IA de premier plan devrait avoir assez de repères projet pour raisonner à partir de la guidance du dépôt, des exemples, des playbooks, des vérifications et des règles de passation.

Par défaut, rien n’a besoin de “tourner” quelque part au sens traditionnel, et tu n’as pas forcément besoin d’invoquer un exécuteur comme Codex. Commence par orienter ton IA de premier plan vers l’instance de dépôt appropriée basée sur Doctor Bones. Utilise un exécuteur seulement quand la tâche exige des modifications de fichiers, un environnement d’exécution, des vérifications, des commits ou des pull requests.

## Langues

- [English](../../README.md)
- [Español](README.es.md)
- Français : ce fichier
- [Deutsch](README.de.md)
- [Português do Brasil](README.pt-BR.md)
- [हिन्दी](README.hi.md)

## Ce que c’est

Doctor Bones n’est pas un autre agent de programmation.

C’est une couche de discipline native du dépôt pour utiliser des assistants IA et des agents de programmation sans perdre l’intention, les contraintes, les vérifications ni l’historique du projet.

Le modèle de base est :

```text
intention humaine
→ l’IA de premier plan clarifie la tâche
→ le dépôt capture une guidance durable
→ l’IA exécutrice réalise un travail borné
→ les vérifications contrôlent ce qui peut l’être
→ la clôture se rattache à l’intention source
```

Pense à l’IA de premier plan comme à l’assistant de planification et d’architecture. Pense à l’IA exécutrice comme au travailleur qui a accès aux fichiers, à un environnement d’exécution, aux tests et aux outils de commit/PR.

Le dépôt est la couche de mémoire et de discipline entre les deux.

## Démarrage

1. Si tu as copié ce modèle, réécris bientôt ce README autour de ton vrai projet.
2. Lis [`examples/README.md`](../../examples/README.md) pour voir les exemples de workflows “day-in-the-life”.
3. Lis [`readme_pmp.md`](../../readme_pmp.md) au moins une fois et garde-le sous la main.
4. Lis [`AGENTS.md`](../../AGENTS.md) avant de demander à un assistant IA de travailler dans le dépôt.
5. Utilise un ordre de travail pour les tâches substantielles, multi-fichiers, sensibles à l’architecture ou sensibles au processus.
6. Lance les vérifications disponibles avant de considérer le travail comme terminé.

## Prompt de démarrage pour l’IA de premier plan

Ce prompt est destiné à un dépôt créé à partir du modèle Doctor Bones. Après avoir copié ce modèle, remplace `<your project repository URL>` par l’URL de ton propre dépôt de projet.

Quand tu démarres un nouveau chat ou un nouvel onglet pour ton dépôt de projet, colle ceci dans l’IA de premier plan :

```text
You are the foreground AI for <your project repository URL>.

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Raccourci d’ordre de travail

Pour un travail substantiel dans ton dépôt de projet copié, discute avec l’IA de premier plan jusqu’à ce que la tâche soit claire, puis dis :

```text
Create a workorder and also show it to me here.
```

Tu peux copier un lien vers le fichier d’ordre de travail et demander à ton IA exécutrice, dans un environnement pour ton dépôt de projet, de l’exécuter.

Tu peux aussi copier/coller le corps de l’ordre de travail si tu as demandé à l’IA de premier plan de l’afficher d’abord. Garde ce bloc propre : pas de citations, notes d’assistant, explications, liens supplémentaires ni commentaires dans le corps de l’ordre de travail.

## Vérifications

Lance ceci depuis la racine du dépôt quand c’est disponible :

```text
python tools/pmp_check.py --area all
python -m pytest
```

Si une vérification échoue, colle la sortie exacte de la commande dans l’IA de premier plan et demande la plus petite correction sûre.

## À propos de Doctor Bones

Doctor Bones est une discipline de travail agnostique vis-à-vis des fournisseurs d’IA pour les projets assistés par IA.

La version courte :

```text
intention capturée
portée bornée
contraintes préservées
exécuteur instruit
vérifications requises
clôture rattachée à l’intention source
```

L’explication complète se trouve dans [`readme_pmp.md`](../../readme_pmp.md).
