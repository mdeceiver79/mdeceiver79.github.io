
class Rule {
	constructor(name, description, fullDescription) {
		this.name = name;
		this.description = description;
		this.fullDescription = fullDescription;
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

const itemSpecialAmmo = new Item("Special Ammunition", "Consume while shooting a [[weapon:Bolter]] to make it auto kill a target.", true);
const itemRelic = new Item("Holy Relic", "Consume at any time to reroll any dice.", true);
const itemPuritySeal = new Item("Purity Seal", "Consume to reroll any attack.", true);
const itemStims = new Item("Stims", "Consume to replenish AP to 4.", true);

const ruleSustainedFire = new Rule("Sustained Fire", "+1 modifier for repeated shots", "+1 for each shot taken against a target");
const ruleOffhand = new Rule("Offhand", "Can be fired alongside other actions.", "Alongside being used normally, this weapon can be shot during other actions for free, eg whilst moving.");
const ruleOverheats = new Rule("Overheats", "Death if 3 or more 1's are rolled at once.", "If 3 or more 1's are rolled at once the beater of this weapon dies.");
const ruleOvercharge = new Rule("Overcharge", "You can choose to roll up to 6 dice.", "When firing this weapon you can choose to roll up to six dice at once.");
const ruleGravgun = new Rule("Gravgun", "Pick the highest dice roll, move the target that many squares.", "Pick the highest dice roll, move the target that many squares. If they hit something along the way roll a dice for each remaining square for the damage done.");
const ruleMelta = new Rule("Melta", "Destroy doors and debris without a roll.", "Destroy doors and debris without rolling for damage.");
const ruleAreaOfEffect = new Rule("Area of Effect", "Hit all targets in section", "Hit all targets in section");

const weaponBolter = new Weapon("Bolter", null, 1, "2D6", 0, null, [ruleSustainedFire]);
const weaponBoltPistol = new Weapon("Bolt Pistol", "Pistol", 1, "1D6", 0, 6, [ruleOffhand]);
const weaponPlasmaPistol = new Weapon("Plasma Pistol", "Pistol", 1, "3D6", 1, 6, [ruleOffhand, ruleOverheats]);
const weaponPlasmaGun = new Weapon("Plasma Gun", "Special", 1, "3D6", 1, null, [ruleOverheats, ruleOvercharge]);
const weaponGravPistol = new Weapon("Grav Pistol", "Pistol", 1, "1D6", 0, 6, [ruleGravgun]);
const weaponGravGun = new Weapon("Grav Gun", "Special", 1, "2D6", 0, null, [ruleGravgun]);
const weaponMelta = new Weapon("Melta Gun", "Special", 2, "2D6", 2, 12, [ruleMelta]);
const weaponGrenade = new Weapon("Grenade", "Grenade", 1, "1D6", 0, 12, [ruleAreaOfEffect]);
