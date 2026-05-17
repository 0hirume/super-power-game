local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "RegenerateHealth",
    runConditions = { planck.timePassed(0.5) },
    system = function(world: jecs.World)
        local query = world:query(value.Health, value.Endurance):cached()

        return {
            system = function()
                for entity, health, endurance in query do
                    local maxHealth = 100 + endurance
                    world:set(entity, value.Health, math.clamp(health + maxHealth * 0.005, health, maxHealth))
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
