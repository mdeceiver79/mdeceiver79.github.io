const WeaponRegistry = {
	weapons : [],
	add : function(name, type, apCost, dice, modifier, range, rules) {
		var newWeapon = new Weapon(name, type, apCost, dice, modifier, range, rules);
		this.weapons.push(newWeapon);
		return newWeapon;
	}
};
const NpcRegistry = {
	npcs : [],
	add : function(name, type, faction, ap, melee, weapons, rules) {
		var newNpc = new Npc(name, type, faction, ap, melee, weapons, rules);
		this.npcs.push(newNpc);
		return newNpc;
	}
};
const ItemRegistry = {
	items : [],
	add : function(name, description, consumable) {
		var newItem = new Item(name, description, consumable);
		this.items.push(newItem);
		return newItem;
	}
};
const RuleRegistry = {
	rules : [],
	add : function(name, description, fullDescription) {
		var newRule = new Rule(name, description, fullDescription);
		this.rules.push(newRule);
		return newRule;
	}
};



class Rule {
	constructor(name, description, fullDescription) {
		this.name = name;
		this.description = description;
		this.fullDescription = fullDescription;
	}
}

class Npc {
	constructor(name, type, faction, ap, melee, weapons, rules) {
		this.name = name;
		this.type = type;
		this.faction = faction;
		this.ap = ap;
		this.melee = melee;
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

const itemSpecialAmmo = ItemRegistry.add("Special Ammunition", "Consume while shooting a [[weapon:Bolter]] to make it auto kill a target.", true);
const itemRelic = ItemRegistry.add("Holy Relic", "Consume at any time to reroll any dice.", true);
const itemPuritySeal = ItemRegistry.add("Purity Seal", "Consume to reroll any attack.", true);
const itemStims = ItemRegistry.add("Stims", "Consume to replenish AP to 4.", true);

const ruleSustainedFire = RuleRegistry.add("Sustained Fire", "+1 modifier for repeated shots", "+1 for each shot taken against a target");
const ruleOffhand = RuleRegistry.add("Offhand", "Can be fired alongside other actions.", "Alongside being used normally, this weapon can be shot during other actions for free, eg whilst moving.");
const ruleOverheats = RuleRegistry.add("Overheats", "Death if 3 or more 1's are rolled at once.", "If 3 or more 1's are rolled at once the beater of this weapon dies.");
const ruleOvercharge = RuleRegistry.add("Overcharge", "You can choose to roll up to 6 dice.", "When firing this weapon you can choose to roll up to six dice at once.");
const ruleGravgun = RuleRegistry.add("Gravgun", "Pick the highest dice roll, move the target that many squares.", "Pick the highest dice roll, move the target that many squares. If they hit something along the way roll a dice for each remaining square for the damage done.");
const ruleMelta = RuleRegistry.add("Melta", "Destroy doors and debris without a roll.", "Destroy doors and debris without rolling for damage.");
const ruleAreaOfEffect = RuleRegistry.add("Area of Effect", "Hit all targets in section", "Hit all targets in section");
const ruleSteadyAim = RuleRegistry.add("Steady Aim", "Spend 1 action point to improve the modifier by 1. (cumulative)", "Spend 1 action point to improve the modifier by 1. (cumulative)");
const rulePersistentEffect = RuleRegistry.add("Persistent", "The effects of this weapon remain till next turn.", "The effects of this weapon remain till next turn.");
const rulePermanentEffect = RuleRegistry.add("Permanent", "The effects of this weapon remain in play.", "The effects of this weapon remain in play.");
const rulePlagueWeapon = RuleRegistry.add("Plague Weapon", "Nurgle units ignore this.", "Nurgle units ignore this.");

const ruleHardToKill = RuleRegistry.add("Hard to kill", "Discard the highest dice when shooting this.", "Discard the highest dice when shooting this. So weapons rolling just one dice (eg flamer) can't possibly kill it.");
const ruleFeelNoPain5 = RuleRegistry.add("Feel No Pain (5+)", "Ignore death on a 5+", "When wounded, roll a 5+ on D6 to ignore the wound.");
const ruleFeelNoPain3 = RuleRegistry.add("Feel No Pain (3+)", "Ignore death on a 3+", "When wounded, roll a 3+ on D6 to ignore the wound.");
const ruleBulky = RuleRegistry.add("Bulky", "Takes up whole tile.", "This unit takes up a whole tile.");
const ruleUnarmored = RuleRegistry.add("Unarmoured (-2)", "All shooting against this gets +2 modifier.", "All shooting against this gets +2 modifier.");
const ruleFlakArmour = RuleRegistry.add("Flak Armour (-1)", "All shooting against this gets +1 modifier.", "All shooting against this gets +1 modifier.");

const weaponBolter = WeaponRegistry.add("Bolter", "Basic", 1, "2D6", 0, null, [ruleSustainedFire]);
const weaponLasRifle = WeaponRegistry.add("Las Rifle", "Basic", 1, "1D6", 0, null, []);
const weaponSpecialIssueLasgun = WeaponRegistry.add("Special Issue Lasgun", "Basic", 1, "1D6", 2, null, []);
const weaponFlamer = WeaponRegistry.add("Flamer", "Special", 2, "1D6", 2, null, [ruleAreaOfEffect, rulePersistentEffect]);
const weaponSniperRifle = WeaponRegistry.add("Sniper Rifle", "Special", 2, "2D6", 0, null, [ruleSteadyAim]);
const weaponPlasmaGun = WeaponRegistry.add("Plasma Gun", "Special", 1, "3D6", 1, null, [ruleOverheats, ruleOvercharge]);
const weaponGravGun = WeaponRegistry.add("Grav Gun", "Special", 1, "2D6", 0, null, [ruleGravgun]);
const weaponMelta = WeaponRegistry.add("Melta Gun", "Special", 2, "2D6", 2, 12, [ruleMelta]);
const weaponAssaultCannon = WeaponRegistry.add("Assault Cannon", "Special", 1, "3D6", 0, null, [ruleSustainedFire]);
const weaponBoltPistol = WeaponRegistry.add("Bolt Pistol", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
const weaponLasPistol = WeaponRegistry.add("Las Pistol", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
const weaponGravPistol = WeaponRegistry.add("Grav Pistol", "Pistol", 1, "1D6", 0, 6, [ruleGravgun]);
const weaponPlasmaPistol = WeaponRegistry.add("Plasma Pistol", "Pistol", 1, "3D6", 1, 6, [ruleOffhand, ruleOverheats]);
const weaponGrenade = WeaponRegistry.add("Grenade", "Grenade", 1, "1D6", 0, 12, [ruleAreaOfEffect]);
const weaponPlasmaGrenade = WeaponRegistry.add("Plasma Grenade", "Grenade", 1, "2D6", 3, 12, [ruleAreaOfEffect]);
const weaponPlagueBomb = WeaponRegistry.add("Plague Bomb", "Grenade", 1, "1D6", 1, 12, [ruleAreaOfEffect, rulePersistentEffect, rulePlagueWeapon]);


const npcHenchman = NpcRegistry.add("Henchman", "Grunt", "Generic", 4, "1D6-2", [weaponLasRifle], [ruleUnarmored]);
const npcHenchmanMelee = NpcRegistry.add("Henchman (melee)", "Grunt", "Generic", 4, "1D6-1", [weaponLasPistol], [ruleUnarmored]);
const npcRobot = NpcRegistry.add("Robot", "Character", "Generic", 4, "2D6", [weaponAssaultCannon], [ruleBulky]);
const npcStormTrooper = NpcRegistry.add("Storm Trooper", "Grunt", "Generic", 4, "1D6-1", [weaponSpecialIssueLasgun, weaponGrenade], [ruleFlakArmour]);
const npcStormTrooperSarg = NpcRegistry.add("Storm Trooper Sergeant", "Grunt", "Generic", 4, "1D6", [weaponBolter, weaponPlasmaPistol, weaponGrenade], [ruleFlakArmour]);
const npcAssassin = NpcRegistry.add("Assassin", "Specialist", "Generic", 4, "1D6-1", [weaponSniperRifle, weaponLasPistol], [ruleUnarmored]);
const npcPurestrain = NpcRegistry.add("Purestrain", "Grunt", "Genestealer", 6, "3D6", [], [ruleBulky]);
const npcAcolyte = NpcRegistry.add("Acolyte", "Grunt", "Genestealer", 4, "2D6-1", [weaponLasPistol], [ruleBulky, ruleFlakArmour]);
const npcNeophyte = NpcRegistry.add("Neophyte", "Grunt", "Genestealer", 4, "1D6-2", [weaponLasRifle], [ruleUnarmored]);
const npcNeophyteMelee = NpcRegistry.add("Neophyte (melee)", "Grunt", "Genestealer", 4, "1D6-1", [weaponLasPistol], [ruleUnarmored]);
const npcPatriarch = NpcRegistry.add("Patriarch", "Boss", "Genestealer", 6, "4D6+1", [], [ruleHardToKill,ruleBulky]);
const npcPlagueZombie = NpcRegistry.add("Plague Zombie", "Grunt", "Nurgle", 3, "1D6", [], [ruleFeelNoPain5]);
const npcPlagueMarine = NpcRegistry.add("Plague Marine", "Specialist", "Nurgle", 4, "2D6", [weaponBolter, weaponPlagueBomb], [ruleFeelNoPain3, ruleBulky]);
const npcChaosCultist = NpcRegistry.add("Cultist", "Grunt", "Chaos", 4, "1D6-2", [weaponLasRifle], [ruleUnarmored]);
const npcChaosCultistMelee = NpcRegistry.add("Cultist (melee)", "Grunt", "Chaos", 4, "1D6-1", [weaponLasPistol], [ruleUnarmored]);
const npcChaosCultistFlamer = NpcRegistry.add("Cultist (flamer)", "Specialist", "Chaos", 4, "1D6-3", [weaponLasPistol, weaponFlamer], [ruleUnarmored]);
const npcChaosMarine = NpcRegistry.add("Chaos Marine", "Specialist", "Chaos", 4, "1D6", [weaponBolter, weaponGrenade], []);
