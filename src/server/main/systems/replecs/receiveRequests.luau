local Players = game:GetService("Players")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsReceiveRequests",
    system = function()
        local processingHandshake: { [Player]: boolean } = {}
        local processingReplication: { [Player]: boolean } = {}

        local connection = Players.PlayerRemoving:Connect(function(player)
            processingHandshake[player] = nil
            processingReplication[player] = nil
        end)

        return {
            system = function()
                for _, player, handshake in blink.sendClientHandshake.iter() do
                    if processingHandshake[player] then
                        continue
                    end

                    processingHandshake[player] = true

                    local success, errorMessage = replicator:verify_handshake(handshake)

                    if success then
                        blink.sendServerHandshake.fire(player, replicator:generate_handshake())
                    else
                        warn(`Client handshake mismatch: {errorMessage}`)
                    end
                end

                for _, player in blink.requestReplication.iter() do
                    if processingReplication[player] then
                        continue
                    end

                    processingReplication[player] = true

                    replicator:mark_player_ready(player)

                    local buf, variants = replicator:get_full(player)
                    blink.sendFull.fire(player, buf, variants)
                end
            end,
            cleanup = function()
                connection:Disconnect()
                table.clear(processingHandshake)
                table.clear(processingReplication)
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
