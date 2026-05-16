local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessMove",
    runConditions = { planck.timePassed(1) },
    system = function(world: jecs.World)
        local query = world
            :query(instance.Humanoid, value.Speed, jecs.pair(value.TokenMultiplier, value.Speed))
            :without(jecs.pair(state.TrainingMode, jecs.Wildcard))
            :without(jecs.pair(value.Cooldown, value.Speed))
            :cached()

        return {
            system = function()
                for entity, humanoid, speed, multiplier in query do
                    if humanoid.MoveDirection.Magnitude <= 0.5 then
                        continue
                    end

                    world:set(entity, value.Speed, speed + multiplier)
                    world:set(entity, jecs.pair(value.Cooldown, value.Speed), 1)
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
