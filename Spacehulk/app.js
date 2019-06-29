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
  $stateProvider.state(portal);
  $stateProvider.state(weapons);
  $stateProvider.state(weapon);
  $stateProvider.state(items);
  $stateProvider.state(item);
  $stateProvider.state(squads);
  $stateProvider.state(squad);
  $stateProvider.state(squadCreator);
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
