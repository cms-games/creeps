
var roleFixerWall = require('role.fixer_wall');
module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var structure = undefined;
            structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                            && s.hits < s.hitsMax && s.structureType != STRUCTURE_RAMPART
            })

            if (structure == undefined) {
                roleFixerWall.run(creep);
            } else {
                //console.log(" fixing: " + structure.structureType + " at " + structure.pos);
            }

            if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }

        } else {
            creep.getEnergy(false, true);
        }
    }
};