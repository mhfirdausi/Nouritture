// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    //$ionicConfigProvider.views.maxCache(1);
    $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search?sendq?qtype',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.background', {
      url: '/background',
      views: {
        'menuContent': {
            templateUrl: 'templates/background.html',
            controller: 'BackgroundCtrl'
        }
      }
    })
    .state('app.backgroundDoc', {
        url: '/background/:backId',
        views: {
            'menuContent': {
                templateUrl: 'templates/backgroundarticle.html',
                controller: 'BackgroundCtrl'
            }
        }
    })
    .state('app.recipes', {
      url: '/recipes',
      views: {
        'menuContent': {
          templateUrl: 'templates/recipes.html',
          controller: 'RecipesCtrl'
        }
      }
    })

  .state('app.recipe', {
    url: '/recipes/:reci',
    views: {
      'menuContent': {
        templateUrl: 'templates/recipe.html',
        controller: 'RecipesCtrl'
      }
    }
  })
  .state('app.favorites', {
      url: '/favorites',
      views: {
          'menuContent': {
              templateUrl: 'templates/userfavorites.html',
              controller: 'FavoritesCtrl'
          }
      }
  })
  .state('app.collections', {
      url: '/collections',
      views: {
          'menuContent': {
              templateUrl: 'templates/collections.html',
              controller: 'CollectionCtrl'
          }
      }
  })
    .state('app.collectionDoc', {
        url: '/collections/:speciCol',
        views: {
            'menuContent': {
                templateUrl: 'templates/collectionpage.html',
                controller: 'CollectionCtrl'
            }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/recipes');
});
