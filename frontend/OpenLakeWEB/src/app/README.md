# Tests Unitaires Frontend

## 1) Commande pour exécuter les tests unitaires pour votre application
- Pour exécuter les tests unitaires, nous devons exécuter la commande suivante dans le terminal :
```
ng test
```

## 2) Résultat de la commande
- La sortie de la commande `ng test` dans le terminal : Il s'agit du nombre total de tests unitaires réussis qui ont été exécutés par **Karma**

- En plus de la sortie du terminal, vous remarquerez que la commande test a également lancé le lanceur de test **karma** dans un navigateur

- Si vous regardez attentivement, vous verrez le composant en cours de test « AppComponent » par exemple ainsi que le(s) test(s) unitaire(s) associé(s) : 
    - devrait créer l'application (should create) : s'assure que le composant est bien crée (pareil pour le service)

## 3) Explication (Fonctionnement)

### 3.1) Mise en place d’un test unitaire avec Angular

- Ce qui est bien avec le client Angular (**Angular Cli**), c’est qu’il nous génère automatiquement **un fichier de test**, à chaque fois que nous ajoutons **un Component, un Service**.

- Chaque fichier de test respecte la norme : **{nom du fichier}.spec.ts.**

### 3.2) Lancer le moteur de tests unitaires

- De base, Angular utilise **Karma** pour vérifier l’ensemble des fichiers avec l’extension **.spec.ts.**

- Nous pouvons lancer nos tests unitaires avec la commande : `ng test`.

### 3.3) Résultats depuis une page web

- `ng test` va lancer un serveur web pour exécuter les tests unitaires, avec karma.

- NOTE: tout est configurable depuis **le fichier karma.config.js**

### 3.4) Pour mieux comprendre

- **Jasmine** est le framework que nous allons utiliser pour créer nos tests. Il a un tas de fonctionnalités pour nous permettre d'écrire différents types de tests.

- **Karma** est un lanceur de tâches pour nos tests. Il utilise un fichier de configuration afin de définir le fichier de démarrage, les reporters, le framework de test, le navigateur entre autres.

- **Karma** charge tous les fichiers de test de l'application faisant correspondre leurs noms à une expression régulière. Tous les fichiers dans notre dossier d'application qui ont «**spec.ts**» sur son nom sont considérés comme un test.

- La CLI Angular télécharge et installe tout ce dont vous avez besoin pour tester votre application avec le framework de test **Jasmine**.

- Cela rend la tâche beaucoup plus facile pour vous en tant que Ainsi, pas d’excuse pour avoir au moins un tests unitaire dans notre projet Angular !
- Dès que l'application est créée avec succès, vous pourrez remarquer que **Karma** fait déjà partie de l'application. Il y a un fichier « **src/karma.conf.js** » qui est créé.

- Par défaut, lorsque vous créez un nouveau composant dans votre application, Angular CLI créera automatiquement un fichier " **spec** " avec les autres fichiers nécessaires à la création d'un composant, à moins que vous ne le lui disiez spécifiquement.

- Si vous naviguez jusqu'à « **src/app/** », vous remarquerez le fichier suivant : « **src/app/app.component.spec.ts** ». Il s'agit du fichier dans lequel les tests unitaires se déroulent pour le véritable " **src/app/app.component.ts** ". 

- La convention pour les applications angulaires est d'avoir un **.spec.ts** pour chaque fichier **.ts.**

- Par défaut, le fichier " **src/app/app.component.spec.ts** " contient trois tests unitaires qui sont créés dans le cadre de ce fichier (ces tests unitaires peuvent être supprimés, ils sont utiles car ils nous montrent comment créer un test unitaire).

- Les fichiers **.spec.ts** sont exécutés à l'aide du framework de test javascript **Jasmine** lorsque la commande de test est utilisée.

- **Remarque** : Dans votre application angulaire, vous remarquerez le fichier suivant « **src/tests.ts** ». Ce fichier est requis par **karma.conf.js** et est utilisé pour charger de manière récursive tous les fichiers **.spec** et framework. Ceci est également créé par défaut et vous n'avez rien à faire avec.