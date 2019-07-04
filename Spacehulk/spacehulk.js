const Registry = {

	weapon : {},
	npc : {},
	item : {},
	rule : {},
	object : {},
	faction : {},
	power : {},
	
	weapons : [],
	npcs : [],
	items : [],
	rules : [],
	objects : [],
	factions : [],
	powers : [],
	
	addWeapon : function(name, description, type, apCost, dice, modifier, range, rules) {
		var newWeapon = new Weapon(name, description,type, apCost, dice, modifier, range, rules);
		this.weapons.push(newWeapon);
		this.weapon[name] = newWeapon;
		return newWeapon;
	},
	addNpc : function(name, description, type, faction, ap, ca, weapons, rules, powers) {
		var newNpc = new Npc(name, description, type, faction, ap, ca, weapons, rules, powers);
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
	},
	addPower : function(name, description) {
		var newPower = new Power(name, description);
		this.powers.push(newPower);
		this.power[name] = newPower;
		return newPower;
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
	constructor(name, description, type, faction, ap, ca, weapons, rules, powers) {
		this.name = name;
		this.description = description;
		this.type = type;
		this.faction = faction;
		this.ap = ap;
		this.ca = ca;
		this.weapons = weapons;
		this.weaponsString = [];
		this.rules = rules;
		this.rulesString = [];
		this.powers = powers;
		
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
	constructor(name, description, type, apCost, dice, modifier, range, rules) {
		this.name = name;
		this.description = description;
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

class Power {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
}

const factionGenestealer = Registry.addFaction("Genestealer", "Genestealers are nasty", "#666fda");
const factionNurgle = Registry.addFaction("Nurgle", "Nurgles are also nasty", "#6bb136");
const factionChaos = Registry.addFaction("Chaos", "Nurgles are also nasty", "#6bb136");
const factionBeasts = Registry.addFaction("Beasts", "Wild animals", "#6bb136");
const factionMutants = Registry.addFaction("Mutants", "Wild animals", "#6bb136");
const factionCivilians = Registry.addFaction("Civilians", "Civilians and other characters", "#6bb136");
const factionDarkMechanicum = Registry.addFaction("Dark Mechanicum", "Evil dark mechanicum", "#6bb136");
const factionImperium = Registry.addFaction("Imperium", "Evil dark mechanicum", "#6bb136");
const factionOther = Registry.addFaction("Other", "A catch all group for minor factions and unaffiliated actors.", "#6bb136");

const itemSpecialAmmo = Registry.addItem("Special Ammunition", "Consume while shooting a [[weapon:Bolter]] to make it auto kill a target.", true);
const itemRelic = Registry.addItem("Holy Relic", "Consume at any time to reroll any dice.", true);
const itemPuritySeal = Registry.addItem("Purity Seal", "Consume to reroll any attack.", true);
const itemStims = Registry.addItem("Stims", "Consume to replenish AP to 4.", true);
const itemCoolant = Registry.addItem("Coolant Circuit", "Consume to ignore a wound for [[rule:Overheat]]ing plasma weapons like the [[weapon:Plasma Gun]] and [[weapon:Plasma Pistol]].", true);
const itemLighterArmour = Registry.addItem("Lighter Armour", "+1 AP (Passive)", false);
const itemChameleonine = Registry.addItem("Chameleonine", "Grants [[rule:Stealth]].", false);

const ruleSustainedFire = Registry.addRule("Sustained Fire", "+1 modifier for repeated shots", "+1 for each shot taken against a target");
const ruleHotShot= Registry.addRule("Hot Shot", "While shooting spend 1ap to roll an extra dice.", "While shooting spend 1ap to roll an extra dice. (cumulative). For example this allows you to spend 3 Action Points to roll 3D6 while shooting.");
const ruleOverheat = Registry.addRule("Overheat", "Death if 3 or more 1's are rolled at once.", "If 3 or more 1's are rolled at once the bearer of this weapon dies. ");
const ruleOverload = Registry.addRule("Overload", "You can choose to roll up to 6 dice.", "When firing this weapon you can choose to roll up to six dice at once.");
// const ruleOffhand = Registry.addRule("Offhand", "Can be fired alongside other actions.", "Alongside being used normally, this weapon can be shot during other actions for free, eg whilst moving.");
const ruleGravgun = Registry.addRule("Gravgun", "Pick the highest dice roll, move the target half that many squares.", "Pick the highest dice roll, move the target half that many squares. If they hit something along the way roll a \"to hit\" dice for each remaining square for the damage done.");
const ruleDoorbuster = Registry.addRule("Doorbuster", "Destroy doors and debris without a roll.", "Destroy [[object:Door]]s, [[object:Rubble]] and other objects without rolling for damage.");
const ruleAreaOfEffect = Registry.addRule("Area of Effect", "Hit all targets in section", "Hit all targets in section");
const ruleSteadyAim = Registry.addRule("Steady Aim", "Spend 1 action point to improve the modifier by 1. (cumulative)", "Spend 1 action point to improve the modifier by 1. Maximum bonus is 2+. Always fails on a one.");
const rulePersistentEffect = Registry.addRule("Persistent", "The effects of this weapon remain till next turn.", "The effects of this weapon remain till next turn.");
// const rulePermanentEffect = Registry.addRule("Permanent", "The effects of this weapon remain in play.", "The effects of this weapon remain in play.");
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
const ruleDaemon = Registry.addRule("Daemon", "This is a daemon.", "This is a daemon.");
const rulePlagueWeapons = Registry.addRule("Plague Weapons", "Rolls of 6 in close combat wound the attacker, even if combat is lost.", "Rolls of 6 in close combat wound the attacker, even if combat is lost.");
const ruleStealth = Registry.addRule("Stealth", "Cannot be shot at by Overwatch.", "Cannot be shot at by Overwatch.");
const rulePoison = Registry.addRule("Poison", "Rolls of 6 will wound the target, regardless of modifiers.", "Rolls of 6 will wound the target, regardless of modifiers.");
const rulePsyker = Registry.addRule("Psyker", "Has psychic powers.", "Has psychic powers.");
const ruleReturnToShadows = Registry.addRule("Return to Shadows", "Can turn back into blips, can appear from any blip, on death 4+ doesn't die but disappears.", "While out of enemy LOS can choose to turn into a random blip. Can choose to appear from any blip. On death, roll a d6, on 4+ instead of dying this model dissapears ready to appear from a blip again.");

const powerSmite = Registry.addPower("Smite", "Does a thing");

const weaponPsionicBlast = Registry.addWeapon("Psionic Blast", "", "Basic", 2, "1D6", 1, null, [ruleOverwatch]);
const weaponSmallArms = Registry.addWeapon("Small Arms", "Various small calibre fire arms, their low quality, accuracy and power lower their potency.", "Basic", 2, "1D6", 0, null, [ruleOverwatch]);
const weaponBolter = Registry.addWeapon("Bolter", "", "Basic", 1, "2D6", 0, null, [ruleOverwatch, ruleSustainedFire]);
const weaponLasgun = Registry.addWeapon("Lasgun", "", "Basic", 1, "1D6", 0, null, [ruleOverwatch, ruleHotShot]);
const weaponFlamer = Registry.addWeapon("Flamer", "", "Special", 2, "1D6", 2, null, [ruleAreaOfEffect, rulePersistentEffect, ruleFlameBased]);
const weaponSniperRifle = Registry.addWeapon("Sniper Rifle", "", "Special", 2, "2D6", 0, null, [ruleOverwatch, ruleSteadyAim]);
const weaponPlasmaGun = Registry.addWeapon("Plasma Gun", "", "Special", 1, "3D6", 1, null, [ruleOverheat, ruleOverload]);
// const weaponGravGun = Registry.addWeapon("Grav Gun", "", "Special", 1, "2D6", 0, null, [ruleGravgun]);
const weaponMelta = Registry.addWeapon("Melta Gun", "", "Special", 2, "2D6", 2, 8, [ruleDoorbuster]);
const weaponAssaultCannon = Registry.addWeapon("Assault Cannon", "", "Special", 1, "3D6", 0, null, [ruleSustainedFire, ruleOverheat]);
// const weaponBoltPistol = Registry.addWeapon("Bolt Pistol", "", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
const weaponLasPistol = Registry.addWeapon("Las Pistol", "", "Pistol", 1, "1D6", 0, 6, [ruleOverwatch]);
// const weaponGravPistol = Registry.addWeapon("Grav Pistol", "", "Pistol", 1, "1D6", 0, 6, [ruleGravgun]);
const weaponPlasmaPistol = Registry.addWeapon("Plasma Pistol", "", "Pistol", 1, "3D6", 1, 6, [ruleOverwatch, ruleOverheat]);
const weaponGrenade = Registry.addWeapon("Frag Grenade", "", "Grenade", 1, "1D6", 0, 12, [ruleAreaOfEffect]);
// const weaponPlasmaGrenade = Registry.addWeapon("Plasma Grenade", "", "Grenade", 1, "2D6", 3, 12, [ruleAreaOfEffect]);
const weaponPlagueBomb = Registry.addWeapon("Plague Bomb", "", "Grenade", 1, "1D6", 1, 12, [ruleAreaOfEffect, rulePersistentEffect, rulePlagueWeapon]);
const weaponMolotov = Registry.addWeapon("Fire Bomb", "", "Grenade", 1, "1D6", 0, 12, [ruleAreaOfEffect, rulePersistentEffect, ruleFlameBased]);
const weaponPoisonSpit = Registry.addWeapon("Poison Spit", "", "Beast", 2, "1D6-1", 0, 4, [rulePoison]);

const npcPurestrain = Registry.addNpc("Purestrain", "A hunched, mutlilimbed organism found creeping aboard floating space hulks. They can live for over 100 years, survive lengthy exposure to the void of space and have thick armoured carapaces Atop all this their tongue doubls as an ovipositor, infecting other organisms to do their bidding. They are fast, strong and intelligent.", "Grunt", factionGenestealer, 6, "3D6", [], [ruleBulky], null);
const npcAbberant = Registry.addNpc("Abberant", "A hulking mutated Genestealer hybrid. Not part of the regular reproduction cycle of Genestealers. Their thick skin and general resilience makes them hard to kill. Their superhuman strength makes them challenging fighters and they are often favoured by the Patriarch.", "Heavy", factionGenestealer, 4, "2D6", [], [ruleBulky, ruleThickSkin], null);
const npcAcolyte = Registry.addNpc("Acolyte", "A first or second generaration genestealer hybrid. They can have 2 to 4 arms. Generally they have sub human intelligence but can still operate weapons and machinery. They single minded and robust, needing fairly little sustainable and able to withstand great hardships.", "Grunt", factionGenestealer, 4, "2D6-1", [weaponSmallArms], [ruleBulky, ruleFlakArmour], null);
const npcNeophyte = Registry.addNpc("Neophyte", "A third or fourth generation genestealer hybrid. These can commonly pass for uninfected humans, generally possess a better than human intelligence and a higher than average psychic ability. Often they will be tasked with occupying positions of power in human hierarchies or passing as humans for infiltration or to avoid suspicion.", "Grunt", factionGenestealer, 4, "1D6-2", [weaponSmallArms], [ruleUnarmored], null);
const npcPatriarch = Registry.addNpc("Patriarch", "A gigantic elder Genestealer. It's thick armour and general physiology make it very hard to kill and it's talons can easily cut through metal. With a psychic link to their brood are potent Psykers and cunning strategists.", "Boss", factionGenestealer, 6, "3D6", [], [ruleBulky, ruleHeavyBlow, ruleHardToKill, rulePsyker], [powerSmite]);
const npcSanctus = Registry.addNpc("Sanctus", "A talented and stealthy 4th generation assassin hybrid, well trained and well equipped. Can do effective hit and run attacks.", "Boss", factionGenestealer, 6, "1D6+1", [weaponSniperRifle], [ruleReturnToShadows, ruleStealth]);
const npcMagus = Registry.addNpc("Magus", "A.", "Boss", factionGenestealer, 6, "1D6+2", [weaponLasPistol], [rulePsyker], [powerSmite]);

const npcPlagueZombie = Registry.addNpc("Plague Zombie", "A shambling victim of Nurgle's gifts. Slow but hard to kill, a threat in large numbers.", "Grunt", factionNurgle, 3, "1D6-2", [], [ruleWeaknessFire, ruleFeelNoPain3], null);
const npcPlagueBearer = Registry.addNpc("Plague Bearer", "A foetid lesser daemon of Nurgle. ", "Grunt", factionNurgle, 4, "1D6", [], [ruleDaemon, rulePlagueWeapons], null);
const npcPlagueMarine = Registry.addNpc("Plague Marine", "A bloated Chaos Space Marine blessed by Nurgle. Hard to kill, considered a threat.", "Heavy", factionNurgle, 4, "1D6", [weaponBolter, weaponPlagueBomb], [ruleBulky, rulePlagueWeapons, ruleFeelNoPain3], null);
const npcBlightCaller = Registry.addNpc("Blight Caller", "A champion of nurgle capable of summoning warp powers..", "Boss", factionNurgle, 4, "2D6", [weaponBolter, weaponPlagueBomb], [ruleBulky, ruleFeelNoPain3, rulePlagueWeapons, rulePsyker], [powerSmite]);

const npcChaosSpawn = Registry.addNpc("Chaos Spawn", "", "Heavy", factionChaos, 5, "3D6", [], [ruleBulky, ruleFeelNoPain3], null);

const npcUrGhul = Registry.addNpc("Ur Ghul", "", "Grunt", factionBeasts, 6, "1D6", [], [], null);
const npcAmbull = Registry.addNpc("Ambull", "", "Boss", factionBeasts, 4, "2D6", [], [ruleBulky, ruleHardToKill], null);
const npcDog = Registry.addNpc("Guard Dog", "Dogs have long accompanied humans for hunting, protection and companionship.", "Grunt", factionBeasts, 5, "1D6-2", [], [ruleUnarmored], null);
const npcHuntingBeast = Registry.addNpc("Hunting Beast", "Large beasts with thick hides", "Grunt", factionBeasts, 5, "1D6", [], [ruleFlakArmour], null);
const npcEnslaver = Registry.addNpc("Enslaver", "Telepathic slavers", "Heavy", factionBeasts, 4, "1D6", [], [ruleFlakArmour, rulePsyker], [powerSmite]);
const npcBorewyrm  = Registry.addNpc("Borewyrm", "Lil worms", "Grunt", factionBeasts, 4, "1D6-1", [], [], null);
const npcEyestingerSwarm = Registry.addNpc("Eyestinger Swarm", "Giant mutated parasitic insects, they will swarm a target to lay eggs. If successful in this endevour the target's flesh will rupture with fash growing maggots which will then emerge as more flies.", "Grunt", factionBeasts, 4, "1D6-2", [], [ruleWeaknessFire], null);
const npcFlea = Registry.addNpc("Flea", "Giant mutated fleas, drawn to the prospect of blood. Between their speed, their thick carapace and their general hardiness they can present a challenge. Capable of draining a human sized target of blood in several minutes they can swell up to 3 times their size, they will drain a target of blood before moving on.", "Grunt", factionBeasts, 4, "1D6-1", [], [ruleWeaknessFire, ruleLeap], null);
const npcGrub = Registry.addNpc("Grub", "Carnivorous giant grubs, they latch onto their prey poisoning them for later consumption. They can also spit short distances.", "Grunt", factionBeasts, 4, "1D6-2", [weaponPoisonSpit], [ruleWeaknessFire, rulePoison], null);

const npcHullghast = Registry.addNpc("Hullghast", "The Hullghast are mutants found aboard voidships. They share an origin with the Ghilliam, as both types are created by irradiated or polluted voidship decks. They have hairless, leathery skin, vicious talon-like claws, oversized mouths filled with layers of huge teeth, pustules of flesh erupting in tusks, and horns. Unlike the Ghilliam they are far more aggressive, and prefer feeding on crewmen that go too deep below decks; when unable to do so, they feed on each other.", "Heavy", factionMutants, 5, "1D6", [], [ruleBulky, ruleFeelNoPain5], null);
const npcGhilliam = Registry.addNpc("Ghilliam (Ghoul)", "A withered mutant", "Grunt", factionMutants, 4, "1D6-1", [], [ruleUnarmored], null);
const npcScalie = Registry.addNpc("Scalie", "A brutish scaley skinned mutant. Often used by criminals and gangs as hired muscle or enforcers.", "Grunt", factionMutants, 4, "1D6", [], [], null);
const npcWitch = Registry.addNpc("Witch", "An unregulated mutant psyker.", "Boss", factionMutants, 4, "1D6-2", [], [ruleUnarmored, rulePsyker], [powerSmite]);

const npcCivilian = Registry.addNpc("Civilian", "", "Grunt", factionCivilians, 4, "1D6-3", [], [ruleUnarmored], null);
const npcRabble = Registry.addNpc("Armed Rabble", "When civilians are pushed to defend themselves they group together and find whatever weapons they have available - but with little training they're unlikely to achieve much.", "Grunt", factionCivilians, 4, "1D6-3", [weaponSmallArms], [ruleUnarmored], null);
const npcAngryMob = Registry.addNpc("Angry Mob", "Angry mob equipped with sticks, pipes, knives and molotovs.", "Grunt", factionCivilians, 4, "1D6-2", [weaponMolotov], [ruleUnarmored], null);

const npcTechThrall = Registry.addNpc("Tech Thrall", "Human puppets controlled by a machine with nothing but base instincts and a withered sentience.", "Grunt", factionDarkMechanicum, 4, "1D6-1", [], [ruleFlakArmour], null);
const npcLogiDaemon = Registry.addNpc("Logi Daemon", "Daemon.", "Grunt", factionDarkMechanicum, 4, "1D6", [], [ruleDaemon, ruleStealth], null);
const npcPuppetMaster = Registry.addNpc("Puppet Master", "An unholy fusion of flesh and technology, primary purpose is command and coordination of Tech Thralls but also has psychic abilities.", "Heavy", factionDarkMechanicum, 4, "1D6", [], [rulePsyker], [powerSmite]);

const npcGuardsman = Registry.addNpc("Guardsman", "Cannon fodder of the Imperium", "Grunt", factionImperium, 4, "1D6-2", [weaponSmallArms], [ruleUnarmored], null);
const npcStormTrooper = Registry.addNpc("Stormtrooper", "Well trained soldiers of the imperium.", "Grunt", factionImperium, 4, "1D6-1", [weaponLasgun, weaponGrenade], [ruleFlakArmour], null);
const npcSpaceMarine = Registry.addNpc("Spacemarine", "Elite soldiers of the imperium.", "Grunt", factionImperium, 4, "1D6", [weaponBolter, weaponGrenade], [ruleBulky], null);

const npcHenchman = Registry.addNpc("Henchman", "Poorly equipped dispoable henchemen.", "Grunt", factionOther, 4, "1D6-2", [weaponSmallArms], [ruleUnarmored], null);
const npcMercenary = Registry.addNpc("Mercenary", "Well equipped mercenaries donning power armour.", "Grunt", factionOther, 4, "1D6-1", [weaponBolter], [], null);




const objectRubble = Registry.addObject("Rubble", "Areas of the facility have fallen into disrepair. Piles of stone rubble and metal rebar makes for an unstable footing in the heat of combat. Moving into this square costs +1AP.", false, false, false);
const objectBarrels = Registry.addObject("Barrels", "Barrels with unknown contents. On destruction roll a d6, on roll of a 1 the Barrel explodes with same effect as a [[weapon:Flamer]]", "6+", false, true);
const objectCrates = Registry.addObject("Crates", "Crates with unknown contents. On destruction place some rubble.", "7+", true, true);
const objectDoor = Registry.addObject("Door", "A heavy metal door, costs 1AP to open or close, providing the door isn't locked.", "6+", true, true);
