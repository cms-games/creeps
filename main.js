
// noinspection JSUnresolvedVariable
require('prototype.spawn');
require('prototype.creep');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleFixerWall = require('role.fixer_wall');

var spawnMemory = {
    role: undefined,
    working: false
};

module.exports.loop = function () {
    //clear stale memory entries for creeps that have died
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            console.log(name + " removed from memory. RIP.");
            delete Memory.creeps[name];
        }
    }

    // iterate through each creep in Game.creeps
    for (let name in Game.creeps) {
        Game.creeps[name].runRole();
    }

    Game.spawns.Spawn1.runSpawnCheck();
    /*
    var minNumHarvesters = 2;
    var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var minNumBuilders = 1;
    var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var minNumFixers = 1;
    var numFixers = _.sum(Game.creeps, (c) => c.memory.role == 'fixer');
    var minNumFixersWall = 1;
    var numFixersWall = _.sum(Game.creeps, (c) => c.memory.role == 'fixer_wall');

    var numCreeps = _.sum(Game.creeps);
    var maxCreeps = 8;

    var name = undefined;
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var numberOfParts = Math.floor(energy / 200);
    var numPartsEach = [numberOfParts, numberOfParts, numberOfParts];

    spawnMemory.role = 'harvester';

    if (numHarvesters < minNumHarvesters) {
        var name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);
        if (name == ERR_NOT_ENOUGH_ENERGY && numHarvesters == 0) {
            energy = Game.spawns.Spawn1.room.energyAvailable;
            numberOfParts = Math.floor(energy / 200);
            numPartsEach = [numberOfParts, numberOfParts, numberOfParts];
            name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);
        }
    }
    else if (numFixers < minNumFixers)
    {
         spawnMemory.role = 'fixer';
        var name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);
    }
    else if (numBuilders < minNumBuilders)
    {
         spawnMemory.role = 'builder';
        var name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);

    }
    else if (numFixersWall < minNumFixersWall)
    {
         spawnMemory.role = 'fixer_wall';
        var name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);
    }
    else if (numCreeps < maxCreeps)
    {
         spawnMemory.role = 'upgrader';
        var name = Game.spawns.Spawn1.createCustomCreep(numPartsEach, spawnMemory);
    }
    if (!(name<0) && name != undefined) {
        console.log(" *** " + name + " the " + Game.creeps[name].memory.role + " was spawned.");
    }
    */
    var towers = Game.rooms.W22S18.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    if (towers != undefined) {
        for (let tower of towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                tower.attack(target);
            }
        }
    }
};