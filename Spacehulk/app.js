var app = angular.module("spacehulk", ['ui.router']);

app.config(function($stateProvider, $sceProvider) {
	$sceProvider.enabled(false);
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
	var objects = {
		name: 'objects',
		url: '/objects'
	}
	var object = {
		name: 'object',
		url: '/object/:id'
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
	var npc = {
		name: 'npc',
		url: '/npc/:id'
	}
	var rules = {
		name: 'rules',
		url: '/rules'
	}
	var rule = {
		name: 'rule',
		url: '/rule/:id'
	}
	var factions = {
		name: 'factions',
		url: '/factions'
	}
	var faction = {
		name: 'faction',
		url: '/faction/:id'
	}
	var links = {
		name: 'links',
		url: '/links'
	}
	var about = {
		name: 'about',
		url: '/about'
	}
  $stateProvider.state(portal);
  $stateProvider.state(weapons);
  $stateProvider.state(weapon);
  $stateProvider.state(items);
  $stateProvider.state(item);
  $stateProvider.state(object);
  $stateProvider.state(objects);
  $stateProvider.state(rules);
  $stateProvider.state(rule);
  $stateProvider.state(squads);
  $stateProvider.state(squad);
  $stateProvider.state(factions);
  $stateProvider.state(faction);
  $stateProvider.state(squadCreator);
  $stateProvider.state(npcs);
  $stateProvider.state(npc);
  $stateProvider.state(links);
  $stateProvider.state(about);
});

app.controller("PageController", ["$scope", "$state", function($scope, $state) {
	$scope.$state = $state;
	$scope.date = new Date();
	$scope.weapons = Registry.weapons;
	$scope.objects = Registry.objects;
	$scope.items = Registry.items;
	$scope.npcs = Registry.npcs;
	$scope.npcs.forEach((npc) => {
		npc.$starred = false;
	});
	$scope.factions = Registry.factions;
}]);

app.directive("ngWeapon", function() {
	return {
		scope : { weapon: "=weapon" },
		template : "<a class=\"ctooltip\" ui-sref=\"weapon({id:weapon.name})\">"
			+"<span class=\"tooltiptext\">"
				+"<div>{{weapon.name}} ({{weapon.apCost}}AP)</div>"
				+"<div>{{weapon.dice}} ({{6-weapon.modifier}}+)</div>"
				+"<div>{{weapon.rulesString}}</div>"
			+"</span>"
			+"{{weapon.name}}"
			+"</a>"
	};
});

app.directive("ngRule", function() {
	return {
		scope : { rule: "=rule" },
		template : "<a class=\"ctooltip\" ui-sref=\"rule({id:rule.name})\">"
			+"<span class=\"tooltiptext\">"
				+"{{rule.description}}"
			+"</span>"
			+"{{rule.name}}"
			+"</a>"
	};
});

app.directive("ngItem", function() {
	return {
		scope : { item: "=item" },
		template : "<a class=\"ctooltip\" ui-sref=\"item({id:item.name})\">"
			+"<span class=\"tooltiptext\">"
				+"{{item.description}}"
			+"</span>"
			+"{{item.name}}"
			+"</a>"
	};
});

app.controller("TableController", ["$scope", function($scope) {
	$scope.layout = "table";
	$scope.filter = "";
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

app.controller("RegistryController", ["$scope", "$stateParams", "$state", function($scope, $stateParams, $state) {
	$scope.$stateParams = $stateParams;
	$scope.$watch("$stateParams.id", function() {
		if ( Registry[$state.current.name] && Registry[$state.current.name][$stateParams.id] ) {
			$scope.subject = null;
			$scope.subject = Registry[$state.current.name][$stateParams.id];
		} else {
			$scope.subject = null;
		}
	});
	$scope.subject = null;
}]);

app.controller("NpcsController", ["$scope", function($scope) {
	$scope.faction = "All";

	$scope.layout = "table";
	$scope.filter = "";
	$scope.sortBy = "faction";
	$scope.sortByReverse = false;
	$scope.sortByStar = () => {
		$scope.sortBy = "$starred";
		$scope.sortByReverse = true;
	}
	$scope.changeSort = (sortby) => {
		if ($scope.sortBy === sortby) {
			if (!$scope.sortByReverse) {
				$scope.sortByReverse = true;
			} else {
				$scope.sortByStar();
			}
		} else {
			$scope.sortBy = sortby;
			$scope.sortByReverse = false;
		}
	};
}]);

app.directive("ngContextualLink", function($compile) {
	return {
        replace: true,
		restrict: 'A',
		scope: { description: "=ngContextualLink" },
		link: function( $scope, element, attrs ) {
			$scope.$watch("$scope.description", function() {
				var formattedContent = [];
				var splitUpContent = ($scope.description || "").split(/\[\[|\]\]/);
				splitUpContent.forEach((phrase, index) => {
					if (index % 2 == 0) return formattedContent.push(phrase); // we don't care about the evens
					// so now we're dealing with the contexted things
					var phraseParts = phrase.split(":");
					formattedContent.push("<a ui-sref=\""+phraseParts[0]+"({id:'"+phraseParts[1]+"'})\">"+phraseParts[1]+"</a>");
				});
				element[0].innerHTML = formattedContent.join("");
				$compile(element.contents())($scope);
			});
		}
	};
});