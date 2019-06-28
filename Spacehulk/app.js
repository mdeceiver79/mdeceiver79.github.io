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
		url: '/weapon/:weaponName'
	}
	var items = {
		name: 'items',
		url: '/items'
	}
	var item = {
		name: 'item',
		url: '/item/:itemName'
	}
	var squads = {
		name: 'squads',
		url: '/squads'
	}
	var	squad = {
		name: 'squad',
		url: '/squad/:squadId'
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