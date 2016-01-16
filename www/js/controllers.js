angular.module('starter.controllers', ['ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.foodList = ['boudin', 'gumbo', 'jambalaya', 'rice', 'gravy', 'crawfish', 'beignets', 'alligator', 'crepe', 'frog', 'sausage', 'catfish', 'potato',
  'salad', 'balls', 'pie', 'cake', 'cheese', 'cream', 'grits'];
})

.controller('RecipesCtrl', ['$scope', '$http', '$state', '$stateParams', 'UserFavs', function ($scope, $http, $state, $stateParams, UserFavs) {
    $http.get('js/recipedata.json').success(function (data) {
        $scope.recipes = data;
        $scope.whichRecipe = $state.params.reci;
        $scope.myFavorite = false;
    });
    if ($stateParams.reci) {
        console.log('Got reci: ' + $stateParams.reci)
        $scope.whichRecipe = $state.params.reci;
    }
    $scope.reciClick = function () {
        var newQuestion = 'What is ' + $scope.whichRecipe + '?';
        console.log('Try to ask Watson ' + newQuestion);
        $state.go('app.search', { sendq: newQuestion , qtype: 'docSearch'});
    };
    $scope.favClick = function (faved) {
        if (!faved && UserFavs.favorites.indexOf($scope.whichRecipe) == -1) {
            UserFavs.addRecipe($scope.whichRecipe);
            console.log(UserFavs);
            $scope.myFavorite = true;
        }
        else {
            index = UserFavs.favorites.indexOf($scope.whichRecipe);
            console.log('Remove ' + index);
            if (index != -1) {
                UserFavs.removeRecipe($scope.whichRecipe, index);
            }
            $scope.myFavorite = false;
        }
    }
    $scope.toggleStar = function (item) {
        item.star = !item.star;
    }
}])

.controller('RecipeCtrl', function ($scope, $stateParams) {
    $scope.recipeTitle = $stateParams.reci;
})

.controller('BackgroundCtrl', ['$scope', '$http', '$state', '$stateParams', function ($scope, $http, $state, $stateParams) {
    $scope.enableBackdocButton = true;
    $scope.docNoun = 'something';
    $scope.gotTitle = '';
    if ($stateParams.backId) {
        $scope.gotTitle = $stateParams.backId;
    }
    $http.get('js/backgrounddata.json').success(function (data) {
        $scope.backgroundDocs = data;
        $scope.whichDoc = $state.params.backId;
    })
    if ($scope.gotTitle) {
        res = $scope.gotTitle.split(' ');
        arr = $scope.foodList;
        i = 0;
        for (i; i < res.length; i++) {
            var str = res[i].toLowerCase();
            if (arr.indexOf(str) != -1) {
                $scope.backDocButton = str;
                $scope.enableBackdocButton = true;
                break;
            }
        }
        if (i == res.length) {
            $scope.enableBackdocButton = false;
        }
    }
    $scope.docClick = function () {
        newQuestion = 'What recipes are there for ' + str + '?';
        console.log('Try to ask Watson ' + newQuestion);
        $state.go('app.search', { sendq: newQuestion, qtype: 'reciSearch'});
    }
}])

.controller('CollectionCtrl', function ($scope, $http, $stateParams) {
    $http.get('js/collectionsdata.json').success(function (data) {
        $scope.collective = data;
        $scope.whichCol = $stateParams.speciCol;
        console.log($scope.whichCol)
    });
})

.controller('FavoritesCtrl', function ($scope, UserFavs, $http) {
    $http.get('js/recipedata.json').success(function (data) {
        $scope.baseRecipes = data;
    });
    $scope.favorites = UserFavs.favorites;
    console.log($scope.favorites);
})
.controller('WatsonCtrl', function ($scope, $http, $state, $stateParams) {
    $scope.watsonAskModel = {};
    if ($stateParams.sendq) {
        $scope.watsonAskModel = { question: $stateParams.sendq };
    }
    // Build the request object
    $scope.newPost = function () {
        $scope.question = $scope.watsonAskModel.question;
        $scope.req = {
            method: 'POST',
            url: watsonURL,
            headers: {
                'Accept' : 'application/json',
                'Authorization': 'Basic ' + btoa(loginString),
                //'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'X-SyncTimeout': 30
            },
            data: {
                'question': {
                    questionText: $scope.question
                }
            }
        };
        console.log($scope.req);
        postVar = $http($scope.req)
        .then(function (response) {
            $scope.watsonAnswer = response.data;
            $scope.answerList = $scope.watsonAnswer.question.answers;
            $scope.evidenList = $scope.watsonAnswer.question.evidencelist;
            //console.log($scope.answerList);
            //console.log($scope.evidenList);
        })
        .catch(function (response) {
            console.error('Watson query error: ', response.status, response.data);
            console.log(response);
        })
        .finally(function () {
            console.log('Finished query');
        });
    }

    $scope.changePage = function (response) {
        if (typeof response !== 'undefined') {
            console.log("Clicked a list element and got:" + response);
            attemptLink = String(response).split(':').slice(0, 1);
            console.log('href =' + attemptLink);
            if ($state.is('app.recipe', { reci: attemptLink })) {
                console.log('Found a matching recipe!');
            }
            $state.go('app.recipe', { reci: attemptLink }, {
                reload: true, inherit: false,
                notify: true
            });
        }
    }
});
