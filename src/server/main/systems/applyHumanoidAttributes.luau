local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ApplyHumanoidAttributes",
    system = function(world: jecs.World)
        local query = world:query(instance.Humanoid, value.Health, value.Endurance, value.Speed, value.JumpForce):cached()

        return {
            system = function()
                for _, humanoid, health, endurance, speed, jumpForce in query do
                    humanoid.UseJumpPower = false

                    humanoid.Health = health
                    humanoid.MaxHealth = 100 + endurance

                    humanoid.WalkSpeed = 16 + speed
                    humanoid.JumpHeight = 5 + jumpForce
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
