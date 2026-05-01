local makeComponent = require("../utilities/ecs/makeComponent")
local world = require("../world")

return {
    Player = makeComponent<<Player>>(world, "Player", true),
    Character = makeComponent<<Model>>(world, "Character", true),
    Humanoid = makeComponent<<Humanoid>>(world, "Humanoid", true),
    HumanoidRoot = makeComponent<<Part>>(world, "HumanoidRoot", true),
    Animator = makeComponent<<Animator>>(world, "Animator", true),
    Torso = makeComponent<<Part>>(world, "Torso", true),
}
