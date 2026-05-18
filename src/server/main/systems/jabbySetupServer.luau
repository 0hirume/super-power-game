local Players = game:GetService("Players")

local jabby = require("@game/ReplicatedStorage/roblox_packages/jabby")
local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local world = require("@game/ReplicatedStorage/world")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "JabbySetupServer",
    runConditions = { planck.runOnce() },
    system = function()
        jabby.register({
            applet = jabby.applets.world,
            configuration = { world = world },
            name = "Server World",
        })

        local allowedPlayers: { [Player]: true? } = {}

        for _, player in Players:GetPlayers() do
            task.spawn(function()
                if player:IsInGroupAsync(985474832) then
                    allowedPlayers[player] = true
                end
            end)
        end

        Players.PlayerAdded:Connect(function(player)
            if player:IsInGroupAsync(985474832) then
                allowedPlayers[player] = true
                jabby.broadcast_server()
            end
        end)

        Players.PlayerRemoving:Connect(function(player)
            allowedPlayers[player] = nil
        end)

        jabby.set_check_function(function(player)
            return allowedPlayers[player] == true
        end)
    end,
}

return systemTable
