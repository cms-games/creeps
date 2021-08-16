var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if ((creep.build(constructionSite) == ERR_NOT_IN_RANGE)) {
                creep.moveTo(constructionSite);
            }
            if (constructionSite == null) {
                roleUpgrader.run(creep);
            } else {
                //console.log(" building" + constructionSite + " at " + constructionSite.pos.x + "," + constructionSite.pos.y);
            }
        } else {
            creep.getEnergy(false, true);
        }
    }
};