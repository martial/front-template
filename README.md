# Template pour front design

## Installation :

1 - Installer GIT
http://git-scm.com/downloads

2 - Installer NODE.JS
http://nodejs.org/ 

3 - Installer grunt
http://gruntjs.com/getting-started/


4 - Installer les modules grunts

Aller via terminal dans le dossier du template ( root )
```shell
npm install grunt
npm install
```

Aussi installer les modules dans le dossier Bootstrap

```shell
cd bootstrap3-0.0
npm install
cd..
```

5 - compiler tout pour la première fois 

```shell
grunt dist
```

6 - Executer le watcher
```shell
grunt watch
```

celui ci va détecter tous les changements dans les fichiers less et js puis les compiler / copier dans public

That's it !


# Hiérarchie des dossiers


--- root


------ bootstrap-3.0.0 ( bootstrap folder )


------ js


------------ libs ( mettre ici les librairies communes - Typeflow, Modernizr, whatever )

------------ site ( tous les fichiers .js du site, 1 fichier par layout )


------ less


------------ index.less ( le less de index.html )

------------ main.less ( les imports )

------------ variables.less ( les variables )


------ public ( dossier ou vonts les fichiers HTML et assets compilés )


------------ index.html etc .. ( tous les templates )


------ static ( Dossier pour mettre les assets qui ne seront PAS en production. )


# Utilisation des .js / rajout

## Fichiers JS communs

Il suffit de rajouter le fichier dans js/libs/
Ce fichier sera donc chargé sur toutes les pages


## Un JS par template

Il suffit d'aller à la racine et d'ouvrir Gruntfile.js

Rajouter une propriété pour chaque fichier comme dans le cas de index


```js
uglify: {

        libs: {
            src : ['<%= concat.libs.dest %>'],
            dest: 'public/js/libs.min.js'
        },

        index: {
            src : ['js/site/index.js'],
            dest: 'public/js/index.min.js'
        },

        page: {
            src : ['js/site/page.js'],
            dest: 'public/js/page.min.js'
        }

    }
```

# Tips & chips

- Sortir du watcher sur mac os x ( ctrl + c )

