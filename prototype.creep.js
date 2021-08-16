var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    fixer: require('role.fixer'),
    fixer_wall: require('role.fixer_wall')
};

Creep.prototype.runRole =
    function () {
        //console.log(this.name + " the " + this.memory.role + " ");
        roles[this.memory.role].run(this);

    };

Creep.prototype.getEnergy =
    function (useContainer, useSource) {
        let container;
        // if the Creep should look for containers
        if (useContainer) {
            // find closest container
            container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                             s.store[RESOURCE_ENERGY] > 0
            });
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(container);
                }
            }
        }
        // if no container was found and the Creep should look for Sources
        if (container == undefined && useSource) {
            let source;
            // find closest source
            source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // if all the sources dry up, ensure the Creep finishes working
            // using any remaining harvested energy
            if (source == undefined) {
                this.memory.working = true;
            }
            else {
                // try to harvest energy, if the source is not in range
                if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(source);
                } else {
                    //console.log(" harvesting energy")
                }
            }

        }
    };