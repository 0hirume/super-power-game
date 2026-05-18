local Players = game:GetService("Players")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local control = require("../conditions/control")

local LOCAL_PLAYER = Players.LocalPlayer

local systemTable: planck.SystemTable<jecs.World> = {
    name = "DisableControlModule",
    runConditions = { planck.isNot(control.isDisabled) },
    system = function()
        local playerScripts = LOCAL_PLAYER:FindFirstChild("PlayerScripts")
        local playerModule = playerScripts and playerScripts:FindFirstChild("PlayerModule")
        local controlModule = playerModule and playerModule:FindFirstChild("ControlModule")

        if controlModule == nil or not controlModule:IsA("ModuleScript") then
            return
        end

        -- FIXME: remove when a better method exists
        (require(controlModule) :: any):Disable()

        control.disable()
    end,
}

return systemTable
