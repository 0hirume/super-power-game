local makeTag = require("../utilities/ecs/makeTag")
local world = require("../world")

return {
    TrainingMode = makeTag(world, "TrainingMode", true),
    StrengthTraining = makeTag(world, "StrengthTraining"),
    EnduranceTraining = makeTag(world, "EnduranceTraining"),
    PowerTraining = makeTag(world, "PowerTraining"),
    MovementFrozen = makeTag(world, "MovementFrozen"),
}
