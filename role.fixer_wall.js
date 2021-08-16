var roleBuilder = require('role.builder');
var pct = 0.0029

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var walls = creep.room.find(FIND_STRUCTURES,
                {
                    filter: (w) => w.structureType == STRUCTURE_WALL
                                || w.structureType == STRUCTURE_RAMPART
                });
            var target = undefined;

            for (let percentage = 0.0001; percentage <= pct; percentage = percentage + 0.0001) {
                target = creep.pos.findClosestByPath(walls, {
                    filter: (w) => w.hits / w.hitsMax < percentage
                })
                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                //console.log(" fixing wall at " + target);
            }
            else {
                roleBuilder.run(creep);
            }

        } else {
            creep.getEnergy(false, true);
        }
    }
};