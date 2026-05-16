local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replication = require("../../conditions/replication")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsApplyFull",
    runConditions = { planck.isNot(replication.isStarted) },
    system = function()
        for _, buf, variants in blink.sendFull.iter() do
            replicator:apply_full(buf, variants)
            replication.start()
        end
    end,
}

return systemTable
