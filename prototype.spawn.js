var roles = [
    {
        role: "harvester",
        minimum: 2,
        numEachPart: [11,11,11],
        customFunction: require('role.harvester')
    },
    {
        role: "upgrader",
        minimum: 1,
        numEachPart: [11,11,11],
        customFunction: undefined
    },
    {
        role: "builder",
        minimum: 1,
        numEachPart: [11,11,11],
        customFunction: undefined
    },
    {
        role: "fixer",
        minimum: 1,
        numEachPart: [11,11,11],
        customFunction: undefined
    },
    {
        role: "fixer_wall",
        minimum: 1,
        numEachPart: [11,11,11],
        customFunction: undefined
    }
];

StructureSpawn.prototype.runSpawnCheck =
function () {
    room = this.room;
    thisRoomsCreeps = room.find(FIND_MY_CREEPS);
    let totalNumberOfCreeps = {};
    // find the current number of creeps for each role
    for (let creepType of roles) {
        totalNumberOfCreeps[creepType.role] = _.sum(thisRoomsCreeps, (c) => c.memory.role == creepType.role);
    }
    let maxEnergy = room.energyCapacityAvailable
    let spawnMemory = { working: false };
    let name = undefined;
    let memory = {};

    for (let creepType of roles) {
        if (creepType.minimum > totalNumberOfCreeps[creepType.role]) {
            if (creepType.customFunction != undefined) {
                name = creepType['customFunction'].spawn();
            }
            else {
                memory['role'] = creepType.role;
                name = Game.spawns.Spawn1.createCustomCreep(creepType.numEachPart, memory);
            }
        }
    }

    if (!(name<0) && name != undefined) {
        console.log(" *** " + name + " the " + Game.creeps[name].memory.role + " was spawned.");
    }

}

StructureSpawn.prototype.createCustomCreep =
function (numPartsEach, spawnMemory) {
    var body = [];
    var pieces = [WORK, CARRY, MOVE];
    for (let p = 0; p < 3; p++) {
        for (let i = 0; i < numPartsEach[p]; i++) {
            body.push(pieces[p]);
        }
    }
    // default memory entry for creep startup
    spawnMemory['working'] = false;
    return this.createCreep(body, undefined, spawnMemory);
}
