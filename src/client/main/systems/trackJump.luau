local Players = game:GetService("Players")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")

local blink = require("../blink")

local LOCAL_PLAYER = Players.LocalPlayer

local systemTable: planck.SystemTable<jecs.World> = {
    name = "TrackJump",
    system = function(world: jecs.World)
        local query = world:query(instance.Player, instance.Humanoid):cached()

        return {
            system = function()
                for _, player, humanoid in query do
                    if player ~= LOCAL_PLAYER then
                        continue
                    end

                    if humanoid:GetState() ~= Enum.HumanoidStateType.Jumping then
                        continue
                    end

                    blink.jumped.fire()
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
