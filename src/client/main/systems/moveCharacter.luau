local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local scheduler = require("@game/ReplicatedStorage/scheduler")
local state = require("@game/ReplicatedStorage/components/state")

local blink = require("../blink")

local LOCAL_PLAYER = Players.LocalPlayer

local MOVEMENT_CONTEXT = ReplicatedStorage.assets.inputs.movement

local MOVE_ACTION = MOVEMENT_CONTEXT.move
local JUMP_ACTION = MOVEMENT_CONTEXT.jump

local systemTable: planck.SystemTable<jecs.World> = {
    name = "MoveCharacter",
    system = function(world: jecs.World)
        local moveDirection = Vector2.zero

        MOVE_ACTION.StateChanged:Connect(function(newDirection: Vector2)
            moveDirection = newDirection
        end)

        local isPressed = false

        JUMP_ACTION.StateChanged:Connect(function(newIsPressed: boolean)
            isPressed = newIsPressed
        end)

        local query = world:query(instance.Player, instance.Humanoid):cached()

        local jumpTimer = 0

        return {
            system = function()
                for entity, player, humanoid in query do
                    if player ~= LOCAL_PLAYER then
                        continue
                    end

                    if world:has(entity, jecs.pair(state.MovementDisabled, jecs.Wildcard)) then
                        humanoid:Move(Vector3.zero)
                        humanoid.Jump = false

                        continue
                    end

                    humanoid:Move(Vector3.new(moveDirection.X, 0, -moveDirection.Y), true)
                    humanoid.Jump = isPressed

                    jumpTimer = math.min(jumpTimer + scheduler:getDeltaTime(), 1)

                    if not isPressed then
                        continue
                    end

                    if jumpTimer < 1 then
                        continue
                    end

                    jumpTimer = 0

                    blink.jumped.fire()
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
}

return systemTable
