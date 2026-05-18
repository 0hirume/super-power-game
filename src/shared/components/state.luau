local makeTag = require("../utilities/ecs/makeTag")
local world = require("../world")

return {
    TrainingMode = makeTag(world, "TrainingMode", true),
    MovementFrozen = makeTag(world, "MovementFrozen"),
}
