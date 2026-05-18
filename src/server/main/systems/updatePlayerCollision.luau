local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "UpdatePlayerCollision",
    system = function(world: jecs.World)
        local query = world:query(instance.Head, instance.Torso):cached()

        return {
            system = function()
                for entity, head, torso in query do
                    local canCollide = not world:has(entity, jecs.pair(state.NoCollide, jecs.Wildcard))
                    head.CanCollide = canCollide
                    torso.CanCollide = canCollide
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
