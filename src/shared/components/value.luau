local makeComponent = require("../utilities/ecs/makeComponent")
local world = require("../world")

return {
    Health = makeComponent<<number>>(world, "Health", true),
    Strength = makeComponent<<number>>(world, "Strength", true),
    Endurance = makeComponent<<number>>(world, "Endurance", true),
    Speed = makeComponent<<number>>(world, "Speed", true),
    JumpForce = makeComponent<<number>>(world, "JumpForce", true),
    Power = makeComponent<<number>>(world, "Power", true),
    Cooldown = makeComponent<<number>>(world, "Cooldown"),
    TokenMultiplier = makeComponent<<number>>(world, "TokenMultiplier", true),
}
