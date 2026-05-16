local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsApplyUpdates",
    system = function()
        for _, buf, variants in blink.sendUpdates.iter() do
            replicator:apply_updates(buf, variants)
        end
    end,
}

return systemTable
