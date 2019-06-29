var app = angular.module("spacehulk", ['ui.router']);

app.config(function($stateProvider) {
 
	var portal = {
		name: 'portal',
		url: '/'
	}
	var weapons = {
		name: 'weapons',
		url: '/weapons'
	}
	var weapon = {
		name: 'weapon',
		url: '/weapon/:id'
	}
	var items = {
		name: 'items',
		url: '/items'
	}
	var item = {
		name: 'item',
		url: '/item/:id'
	}
	var squads = {
		name: 'squads',
		url: '/squads'
	}
	var	squad = {
		name: 'squad',
		url: '/squad/:id'
	}
	var	squadCreator = {
		name: 'squadCreator',
		url: '/squadCreator'
	}
	var npcs = {
		name: 'npcs',
		url: '/npcs'
	}
  $stateProvider.state(portal);
  $stateProvider.state(weapons);
  $stateProvider.state(weapon);
  $stateProvider.state(items);
  $stateProvider.state(item);
  $stateProvider.state(squads);
  $stateProvider.state(squad);
  $stateProvider.state(squadCreator);
  $stateProvider.state(npcs);
});

app.controller("PageController", ["$scope", "$state", function($scope, $state) {
	$scope.$state = $state;
	
	$scope.weapons = [
		weaponBolter,
		weaponBoltPistol,
		weaponPlasmaPistol,
		weaponPlasmaGun,
		weaponGravPistol,
		weaponGravGun,
		weaponMelta,
		weaponGrenade,
	];
	$scope.items = [
		itemSpecialAmmo,
		itemRelic,
		itemPuritySeal,
		itemStims,
	];
	$scope.npcs = [
		{
			name : "Purestrain",
			faction : "Genestealer",
			ap : 6,
			melee : "3D6",
			range : null,
			rules : []
		},
		{
			name : "Acolyte Hybrid",
			faction : "Genestealer",
			ap : 4,
			melee : "2D6",
			range : null,
			rules : []
		},
		{
			name : "Neophyte Hybrid",
			faction : "Genestealer",
			ap : 4,
			melee : "1D6-2",
			range : null,
			rules : []
		},
		
	];
}]);

app.controller("WeaponsController", ["$scope", function($scope) {
	$scope.layout = "table";
	$scope.filter = null;
	$scope.sortBy = null;
	$scope.sortByReverse = false;
	$scope.changeSort = (sortby) => {
		if ($scope.sortBy === sortby) {
			if (!$scope.sortByReverse) {
				$scope.sortByReverse = true;
			} else {
				$scope.sortBy = null;
				$scope.sortByReverse = false;
			}
		} else {
			$scope.sortBy = sortby;
			$scope.sortByReverse = false;
		}
	};
}]);

app.controller("ItemsController", ["$scope", function($scope) {
	$scope.layout = "table";
	$scope.filter = null;
	$scope.sortBy = null;
	$scope.sortByReverse = false;
	$scope.changeSort = (sortby) => {
		if ($scope.sortBy === sortby) {
			if (!$scope.sortByReverse) {
				$scope.sortByReverse = true;
			} else {
				$scope.sortBy = null;
				$scope.sortByReverse = false;
			}
		} else {
			$scope.sortBy = sortby;
			$scope.sortByReverse = false;
		}
	};
}]);

app.controller("NpcsController", ["$scope", function($scope) {
	$scope.layout = "table";
	$scope.filter = null;
	$scope.sortBy = null;
	$scope.sortByReverse = false;
	$scope.changeSort = (sortby) => {
		if ($scope.sortBy === sortby) {
			if (!$scope.sortByReverse) {
				$scope.sortByReverse = true;
			} else {
				$scope.sortBy = null;
				$scope.sortByReverse = false;
			}
		} else {
			$scope.sortBy = sortby;
			$scope.sortByReverse = false;
		}
	};
}]);

app.directive('ngContextualLink', function ($compile) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			// first split the content up into pieces
			var formattedContent = [];
			var splitUpContent = element[0].innerHTML.split(/\[\[|\]\]/);
			splitUpContent.forEach((phrase, index) => {
				if (index % 2 == 0) return formattedContent.push(phrase); // we don't care about the evens
				// so now we're dealing with the contexted things
				var phraseParts = phrase.split(":");
				formattedContent.push("<a ui-sref=\""+phraseParts[0]+"({id:'"+phraseParts[1]+"'})\">"+phraseParts[1]+"</a>");
			});
			element[0].innerHTML = formattedContent.join('');
			$compile(element.contents())(scope);
		}
	};
});
