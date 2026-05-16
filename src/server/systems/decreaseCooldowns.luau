local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local value = require("@game/ReplicatedStorage/components/value")

local scheduler = require("@game/ReplicatedStorage/scheduler")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "DecreaseCooldowns",
    system = function(world: jecs.World)
        local query = world:query(jecs.pair(value.Cooldown, jecs.Wildcard)):cached()

        return {
            system = function()
                for entity in query do
                    local index = 0

                    while true do
                        local target = world:target(entity, value.Cooldown, index)

                        if target == nil then
                            break
                        end

                        local cooldown = world:get(entity, jecs.pair(value.Cooldown, target))

                        if cooldown == nil then
                            break
                        end

                        -- FIXME: remove this ascription when fixed
                        local newCooldown = cooldown - scheduler:getDeltaTime() :: number

                        if newCooldown <= 0 then
                            world:remove(entity, jecs.pair(value.Cooldown, target))
                        else
                            world:set(entity, jecs.pair(value.Cooldown, target), newCooldown)
                        end

                        index += 1
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
