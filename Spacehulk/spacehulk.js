const Registry = {

	weapon : {},
	npc : {},
	item : {},
	rule : {},
	object : {},
	faction : {},
	
	weapons : [],
	npcs : [],
	items : [],
	rules : [],
	objects : [],
	factions : [],
	
	addWeapon : function(name, type, apCost, dice, modifier, range, rules) {
		var newWeapon = new Weapon(name, type, apCost, dice, modifier, range, rules);
		this.weapons.push(newWeapon);
		this.weapon[name] = newWeapon;
		return newWeapon;
	},
	addNpc : function(name, type, faction, ap, ca, weapons, rules) {
		var newNpc = new Npc(name, type, faction, ap, ca, weapons, rules);
		this.npcs.push(newNpc);
		this.npc[name] = newNpc;
		return newNpc;
	},
	addItem : function(name, description, consumable) {
		var newItem = new Item(name, description, consumable);
		this.items.push(newItem);
		this.item[name] = newItem;
		return newItem;
	},
	addRule : function(name, description, fullDescription) {
		var newRule = new Rule(name, description, fullDescription);
		this.rules.push(newRule);
		this.rule[name] = newRule;
		return newRule;
	},
	addObject : function(name, description, destructible, blocksLOS, blocksMovement) {
		var newObject = new SHObject(name, description, destructible, blocksLOS, blocksMovement);
		this.objects.push(newObject);
		this.object[name] = newObject;
		return newObject;
	},
	addFaction : function(name, description, color) {
		var newFaction = new SHObject(name, description, color);
		this.factions.push(newFaction);
		this.faction[name] = newFaction;
		return newFaction;
	}
};

class Faction {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
}

class SHObject {
	constructor(name, description, destructible, blocksLOS, blocksMovement) {
		this.name = name;
		this.description = description;
		this.destructible = destructible;
		this.blocksLOS = blocksLOS;
		this.blocksMovement = blocksMovement;
	}
}

class Rule {
	constructor(name, description, fullDescription) {
		this.name = name;
		this.description = description;
		this.fullDescription = fullDescription;
	}
}

class Npc {
	constructor(name, type, faction, ap, ca, weapons, rules) {
		this.name = name;
		this.type = type;
		this.faction = faction;
		this.ap = ap;
		this.ca = ca;
		this.weapons = weapons;
		this.weaponsString = [];
		this.rules = rules;
		this.rulesString = [];
		
		rules.forEach((rule) => {
			this.rulesString.push(rule.name);
		});
		this.rulesString = this.rulesString.join(", ");
		
		weapons.forEach((weapon) => {
			this.weaponsString.push(weapon.name);
		});
		this.weaponsString = this.weaponsString.join(", ");

	}
}

class Weapon {
	constructor(name, type, apCost, dice, modifier, range, rules) {
		this.name = name;
		this.type = type;
		this.apCost = apCost;
		this.dice = dice;
		this.modifier = modifier;
		this.modifierString = new String(modifier);
		this.range = range;
		this.rules = rules;
		this.rulesString = [];
		
		rules.forEach((rule) => {
			this.rulesString.push(rule.name);
		});
		this.rulesString = this.rulesString.join(", ");
		if (modifier < 0) {
			this.modifierString = '+'+this.modifierString;
		}
	}
}

class Item {
	constructor(name, description, consumable) {
		this.name = name;
		this.description = description;
		this.consumable = consumable || false;
	}
}

const factionGenestealer = Registry.addFaction("Genestealer", "Genestealers are nasty", "#666fda");
const factionNurgle = Registry.addFaction("Nurgle", "Nurgles are also nasty", "#6bb136");

const itemSpecialAmmo = Registry.addItem("Special Ammunition", "Consume while shooting a [[weapon:Bolter]] to make it auto kill a target.", true);
const itemRelic = Registry.addItem("Holy Relic", "Consume at any time to reroll any dice.", true);
const itemPuritySeal = Registry.addItem("Purity Seal", "Consume to reroll any attack.", true);
const itemStims = Registry.addItem("Stims", "Consume to replenish AP to 4.", true);

const ruleSustainedFire = Registry.addRule("Sustained Fire", "+1 modifier for repeated shots", "+1 for each shot taken against a target");
const ruleHotShot= Registry.addRule("Hot Shot", "While shooting spend 1ap to roll an extra dice.", "While shooting spend 1ap to roll an extra dice. (cumulative)");

const ruleOffhand = Registry.addRule("Offhand", "Can be fired alongside other actions.", "Alongside being used normally, this weapon can be shot during other actions for free, eg whilst moving.");
const ruleOverheats = Registry.addRule("Overheats", "Death if 3 or more 1's are rolled at once.", "If 3 or more 1's are rolled at once the beater of this weapon dies.");
const ruleOverload = Registry.addRule("Overload", "You can choose to roll up to 6 dice.", "When firing this weapon you can choose to roll up to six dice at once.");
const ruleGravgun = Registry.addRule("Gravgun", "Pick the highest dice roll, move the target half that many squares.", "Pick the highest dice roll, move the target half that many squares. If they hit something along the way roll a \"to hit\" dice for each remaining square for the damage done.");
const ruleDoorbuster = Registry.addRule("Doorbuster", "Destroy doors and debris without a roll.", "Destroy [[object:Door]]s, [[object:Rubble]] and other objects without rolling for damage.");
const ruleAreaOfEffect = Registry.addRule("Area of Effect", "Hit all targets in section", "Hit all targets in section");
const ruleSteadyAim = Registry.addRule("Steady Aim", "Spend 1 action point to improve the modifier by 1. (cumulative)", "Spend 1 action point to improve the modifier by 1. (cumulative)");
const rulePersistentEffect = Registry.addRule("Persistent", "The effects of this weapon remain till next turn.", "The effects of this weapon remain till next turn.");
const rulePermanentEffect = Registry.addRule("Permanent", "The effects of this weapon remain in play.", "The effects of this weapon remain in play.");
const rulePlagueWeapon = Registry.addRule("Plague Weapon", "Nurgle units ignore this.", "[[faction:Nurgle]] units ignore this.");
const ruleFlameBased = Registry.addRule("Flame Based", "This weapon is flame based.", "This weapon is flame based.");
const ruleOverwatch = Registry.addRule("Overwatch", "This weapon can be used in overwatch.", "This weapon can be used in overwatch.");

const ruleHardToKill = Registry.addRule("Hard to kill", "Requires 2 hits in 1 ranged attack.", "Requires 2 hits in 1 ranged attack. So weapons rolling just one dice (eg flamer) can't possibly kill it.");
const ruleThickSkin = Registry.addRule("Thick Skin", "Reroll highest successful shooting dice against this.", "Reroll highest successful shooting dice against this.");
const ruleFeelNoPain5 = Registry.addRule("Feel No Pain (5+)", "Ignore highest successful attack die on a 5+", "When wounded, roll a 5+ on D6 to remove the highest successful attack die.");
const ruleFeelNoPain3 = Registry.addRule("Feel No Pain (3+)", "Ignore highest successful attack die on a 3+", "When wounded, roll a 3+ on D6 to remove the highest successful attack die.");
const ruleBulky = Registry.addRule("Bulky", "Takes up whole tile.", "This unit takes up a whole tile.");
const ruleUnarmored = Registry.addRule("Unarmoured (-2)", "All shooting against this gets +2 modifier.", "All shooting against this gets +2 modifier.");
const ruleFlakArmour = Registry.addRule("Flak Armour (-1)", "All shooting against this gets +1 modifier.", "All shooting against this gets +1 modifier.");
const ruleWeaknessFire = Registry.addRule("Weak Against Fire", "Flame based attacks kill this on 2+.", "Flame based attacks (Flamer, Fire Bomb) kill this on 2+.");
const ruleLeap = Registry.addRule("Leap", "Spend 2AP to move up to 6 spaces.", "Spend 2AP to move up to 6 spaces in one action.");
const ruleHeavyBlow = Registry.addRule("Heavy Blow", "Combat Ability is highest dice + lowest dice.", "Combat Ability is highest dice + lowest dice.");

const weaponSmallArms = Registry.addWeapon("Small Arms", "Basic", 2, "1D6", 0, null, [ruleOverwatch]);
const weaponBolter = Registry.addWeapon("Bolter", "Basic", 1, "2D6", 0, null, [ruleOverwatch, ruleSustainedFire]);
const weaponLasgun = Registry.addWeapon("Lasgun", "Basic", 1, "1D6", 0, null, [ruleOverwatch, ruleHotShot]);
// const weaponSpecialIssueLasgun = Registry.addWeapon("Special Issue Lasgun", "Basic", 1, "1D6", 2, null, []);
const weaponFlamer = Registry.addWeapon("Flamer", "Special", 2, "1D6", 2, null, [ruleAreaOfEffect, rulePersistentEffect, ruleFlameBased]);
// const weaponSniperRifle = Registry.addWeapon("Sniper Rifle", "Special", 2, "2D6", 0, null, [ruleSteadyAim]);
const weaponPlasmaGun = Registry.addWeapon("Plasma Gun", "Special", 1, "3D6", 1, null, [ruleOverheats, ruleOverload]);
// const weaponGravGun = Registry.addWeapon("Grav Gun", "Special", 1, "2D6", 0, null, [ruleGravgun]);
const weaponMelta = Registry.addWeapon("Melta Gun", "Special", 2, "2D6", 2, 8, [ruleDoorbuster]);
// const weaponAssaultCannon = Registry.addWeapon("Assault Cannon", "Special", 1, "3D6", 0, null, [ruleSustainedFire]);
// const weaponBoltPistol = Registry.addWeapon("Bolt Pistol", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
// const weaponLasPistol = Registry.addWeapon("Las Pistol", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
// const weaponGravPistol = Registry.addWeapon("Grav Pistol", "Pistol", 1, "1D6", 0, 6, [ruleGravgun]);
const weaponPlasmaPistol = Registry.addWeapon("Plasma Pistol", "Pistol", 1, "3D6", 1, 6, [ruleOverwatch, ruleOverheats]);
const weaponGrenade = Registry.addWeapon("Grenade", "Grenade", 1, "1D6", 0, 12, [ruleAreaOfEffect]);
// const weaponPlasmaGrenade = Registry.addWeapon("Plasma Grenade", "Grenade", 1, "2D6", 3, 12, [ruleAreaOfEffect]);
const weaponPlagueBomb = Registry.addWeapon("Plague Bomb", "Grenade", 1, "1D6", 1, 12, [ruleAreaOfEffect, rulePersistentEffect, rulePlagueWeapon]);
// const weaponFireBomb = Registry.addWeapon("Fire Bomb", "Grenade", 1, "1D6", 1, 12, [ruleAreaOfEffect, rulePersistentEffect, ruleFlameBased]);

// const npcHenchman = Registry.addNpc("Henchman", "Grunt", "Generic", 4, "1D6-2", [weaponSmallArms], [ruleUnarmored]);
// const npcHenchmanMelee = Registry.addNpc("Henchman (melee)", "Grunt", "Generic", 4, "1D6-1", [weaponLasPistol], [ruleUnarmored]);
// const npcRobot = Registry.addNpc("Robot", "Character", "Generic", 4, "2D6", [weaponAssaultCannon], [ruleBulky]);
// const npcStormTrooper = Registry.addNpc("Storm Trooper", "Grunt", "Generic", 4, "1D6-1", [weaponSpecialIssueLasgun, weaponGrenade], [ruleFlakArmour]);
// const npcStormTrooperSarg = Registry.addNpc("Storm Trooper Sergeant", "Grunt", "Generic", 4, "1D6", [weaponBolter, weaponPlasmaPistol, weaponGrenade], [ruleFlakArmour]);
// const npcAssassin = Registry.addNpc("Assassin", "Specialist", "Generic", 4, "1D6-1", [weaponSniperRifle, weaponLasPistol], [ruleUnarmored]);
const npcPurestrain = Registry.addNpc("Purestrain", "Grunt", factionGenestealer, 6, "3D6", [], [ruleBulky]);
const npcAbberant = Registry.addNpc("Abberant", "Heavy", factionGenestealer, 4, "2D6", [], [ruleBulky,ruleThickSkin]);
const npcAcolyte = Registry.addNpc("Acolyte", "Grunt", factionGenestealer, 4, "2D6-1", [weaponSmallArms], [ruleBulky, ruleFlakArmour]);
const npcNeophyte = Registry.addNpc("Neophyte", "Grunt", factionGenestealer, 4, "1D6-2", [weaponSmallArms], [ruleUnarmored]);
const npcPatriarch = Registry.addNpc("Patriarch", "Boss", factionGenestealer, 6, "3D6", [], [ruleBulky, ruleHeavyBlow, ruleHardToKill]);
const npcPlagueZombie = Registry.addNpc("Plague Zombie", "Grunt", factionNurgle, 3, "1D6-2", [], [ruleWeaknessFire]);
const npcPlagueMarine = Registry.addNpc("Plague Marine", "Heavy", factionNurgle, 4, "2D6", [weaponBolter, weaponPlagueBomb], [ruleBulky, ruleThickSkin]);
// const npcChaosCultist = Registry.addNpc("Cultist", "Grunt", "Chaos", 4, "1D6-2", [Lasgun], [ruleUnarmored]);
// const npcChaosCultistMelee = Registry.addNpc("Cultist (melee)", "Grunt", "Chaos", 4, "1D6-1", [weaponLasPistol], [ruleUnarmored]);
// const npcChaosCultistFlamer = Registry.addNpc("Cultist (flamer)", "Specialist", "Chaos", 4, "1D6-3", [weaponLasPistol, weaponFlamer], [ruleUnarmored]);
// const npcChaosMarine = Registry.addNpc("Chaos Marine", "Specialist", "Chaos", 4, "1D6", [weaponBolter, weaponGrenade], []);
// const npcGuardsman = Registry.addNpc("Guardsman", "Grunt", "Imperial", 4, "1D6-2", [weaponLasgun, weaponGrenade], [ruleUnarmored]);
// const npcStormtrooper = Registry.addNpc("Stormtrooper", "Grunt", "Imperial", 4, "1D6-1", [weaponLasgun, weaponGrenade], [ruleFlakArmour]);
// const npcStormtrooperSarg = Registry.addNpc("Stormtrooper Sergeant", "Grunt", "Imperial", 4, "1D6", [weaponPlasmaPistol, weaponBolter, weaponGrenade], [ruleFlakArmour]);
// const npcSpaceMarine = Registry.addNpc("Space Marine", "Heavy", "Imperial", 4, "1D6", [weaponBolter, weaponGrenade], [ruleBulky]);
// const npcSpaceMarineVeteran = Registry.addNpc("Space Marine Veteran", "Heavy", "Imperial", 4, "2D6", [weaponBolter, weaponGrenade], [ruleBulky]);
// const npcSpaceMarineSergeant = Registry.addNpc("Space Marine Sergeant", "Heavy", "Imperial", 4, "2D6+1", [weaponBolter, weaponGrenade], [ruleBulky]);

const npcChaosSpawn = Registry.addNpc("Chaos Spawn", "Heavy", "Chaos", 5, "3D6", [], [ruleBulky, ruleFeelNoPain3]);



const objectRubble = Registry.addObject("Rubble", "Areas of the facility have fallen into disrepair. Piles of stone rubble and metal rebar makes for an unstable footing in the heat of combat. Moving into this square costs +1AP.", false, false, false);
const objectBarrels = Registry.addObject("Barrels", "Barrels with unknown contents. On destruction roll a d6, on roll of a 1 the Barrel explodes with same effect as a [[weapon:Flamer]]", "6+", false, true);
const objectCrates = Registry.addObject("Crates", "Crates with unknown contents. On destruction place some rubble.", "7+", true, true);
const objectDoor = Registry.addObject("Door", "A heavy metal door, costs 1AP to open or close, providing the door isn't locked.", "6+", true, true);
