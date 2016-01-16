angular.module('starter.services', [])
.factory('UserFavs', function () {
    var favs = {
        favorites: []
    }

    favs.addRecipe = function (newRecipe) {
        if (!newRecipe) return false;
        favs.favorites.unshift(newRecipe);
    };

    favs.removeRecipe = function (delRecipe, index) {
        if (!delRecipe) return false;
        favs.favorites.splice(index, 1);
    }
    return favs;
})
.filter('inArray', function () {
})
.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});
;