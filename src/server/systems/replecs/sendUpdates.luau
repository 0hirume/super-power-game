local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsSendUpdates",
    system = function()
        for player, buf, variants in replicator:collect_updates() do
            blink.sendUpdates.fire(player, buf, variants)
        end
    end,
}

return systemTable
