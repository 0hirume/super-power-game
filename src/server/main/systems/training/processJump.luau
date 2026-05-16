local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local blink = require("../../blink")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessJump",
    system = function(world: jecs.World)
        local query = world
            :query(instance.Player, value.JumpForce, jecs.pair(value.TokenMultiplier, value.JumpForce))
            :without(jecs.pair(state.TrainingMode, jecs.Wildcard))
            :without(jecs.pair(value.Cooldown, value.JumpForce))
            :cached()

        return {
            system = function()
                for _, sender in blink.jumped.iter() do
                    for entity, player, jumpForce, multiplier in query do
                        if sender ~= player then
                            continue
                        end

                        world:set(entity, value.JumpForce, jumpForce + multiplier)
                        world:set(entity, jecs.pair(value.Cooldown, value.JumpForce), 1)
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
