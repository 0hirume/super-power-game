local Players = game:GetService("Players")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local playerEntities = require("../playerEntities")

local replicator = require("../replicator")

type Command =
    | { read kind: "PlayerAdded", read player: Player }
    | { read kind: "PlayerRemoving", read player: Player }
    | { read kind: "CharacterAdded", read player: Player, read character: Model }
    | { read kind: "CharacterRemoving", read player: Player, read character: Model }
    | { read kind: "HumanoidAdded", read player: Player, read humanoid: Humanoid }
    | { read kind: "HumanoidRemoving", read player: Player }
    | { read kind: "AnimatorAdded", read player: Player, read animator: Animator }
    | { read kind: "AnimatorRemoving", read player: Player }
    | { read kind: "HumanoidRootAdded", read player: Player, read root: Part }
    | { read kind: "HumanoidRootRemoving", read player: Player }
    | { read kind: "TorsoAdded", read player: Player, read torso: Part }
    | { read kind: "TorsoRemoving", read player: Player }

type PlayerConnections = {
    characterAdded: RBXScriptConnection,
    characterRemoving: RBXScriptConnection,
}

type CharacterConnections = {
    descendantAdded: RBXScriptConnection,
    descendantRemoving: RBXScriptConnection,
}

local systemTable: planck.SystemTable<jecs.World> = {
    name = "SetupPlayer",
    system = function(world: jecs.World)
        local queue: { Command } = {}

        local playerConnections: { [Player]: PlayerConnections } = {}
        local characterConnections: { [Player]: CharacterConnections } = {}

        local function onDescendantAdded(player: Player, descendant: Instance)
            if descendant:IsA("Humanoid") then
                descendant.UseJumpPower = false
                table.insert(queue, { kind = "HumanoidAdded", player = player, humanoid = descendant } :: Command)
            elseif descendant:IsA("Animator") then
                table.insert(queue, { kind = "AnimatorAdded", player = player, animator = descendant } :: Command)
            elseif descendant.Name == "HumanoidRootPart" and descendant:IsA("Part") then
                table.insert(queue, { kind = "HumanoidRootAdded", player = player, root = descendant } :: Command)
            elseif descendant.Name == "Torso" and descendant:IsA("Part") then
                table.insert(queue, { kind = "TorsoAdded", player = player, torso = descendant } :: Command)
            end
        end

        local function onDescendantRemoving(player: Player, descendant: Instance)
            if descendant:IsA("Humanoid") then
                table.insert(queue, { kind = "HumanoidRemoving", player = player } :: Command)
            elseif descendant:IsA("Animator") then
                table.insert(queue, { kind = "AnimatorRemoving", player = player } :: Command)
            elseif descendant.Name == "HumanoidRootPart" and descendant:IsA("Part") then
                table.insert(queue, { kind = "HumanoidRootRemoving", player = player } :: Command)
            elseif descendant.Name == "Torso" and descendant:IsA("Part") then
                table.insert(queue, { kind = "TorsoRemoving", player = player } :: Command)
            end
        end

        local function onCharacterAdded(player: Player, character: Model)
            table.insert(queue, { kind = "CharacterAdded", player = player, character = character } :: Command)

            characterConnections[player] = {
                descendantAdded = character.DescendantAdded:Connect(function(descendant)
                    onDescendantAdded(player, descendant)
                end),

                descendantRemoving = character.DescendantRemoving:Connect(function(descendant)
                    onDescendantRemoving(player, descendant)
                end),
            }

            for _, descendant in character:GetDescendants() do
                onDescendantAdded(player, descendant)
            end
        end

        local function onCharacterRemoving(player: Player, character: Model)
            local connections = characterConnections[player]

            if connections then
                characterConnections[player] = nil

                connections.descendantAdded:Disconnect()
                connections.descendantRemoving:Disconnect()
            end

            table.insert(queue, { kind = "CharacterRemoving", player = player, character = character } :: Command)
        end

        local function onPlayerAdded(player: Player)
            table.insert(queue, { kind = "PlayerAdded", player = player } :: Command)

            playerConnections[player] = {
                characterAdded = player.CharacterAdded:Connect(function(character)
                    onCharacterAdded(player, character)
                end),

                characterRemoving = player.CharacterRemoving:Connect(function(character)
                    onCharacterRemoving(player, character)
                end),
            }
        end

        local function onPlayerRemoving(player: Player)
            local connections = playerConnections[player]

            if connections then
                playerConnections[player] = nil

                connections.characterAdded:Disconnect()
                connections.characterRemoving:Disconnect()
            end

            connections = characterConnections[player]

            if connections then
                characterConnections[player] = nil

                connections.descendantAdded:Disconnect()
                connections.descendantRemoving:Disconnect()
            end

            table.insert(queue, { kind = "PlayerRemoving", player = player } :: Command)
        end

        for _, player in Players:GetPlayers() do
            onPlayerAdded(player)
        end

        Players.PlayerAdded:Connect(onPlayerAdded)
        Players.PlayerRemoving:Connect(onPlayerRemoving)

        return {
            system = function()
                for _, command in queue do
                    if command.kind == "PlayerAdded" then
                        local player = world:entity()
                        replicator:set_networked(player)
                        replicator:set_reliable(player, instance.Player)
                        replicator:set_reliable(player, instance.Character)
                        replicator:set_reliable(player, instance.Humanoid)
                        replicator:set_reliable(player, instance.Animator)
                        replicator:set_reliable(player, instance.HumanoidRoot)
                        replicator:set_reliable(player, instance.Torso)
                        replicator:set_reliable(player, value.Health)
                        replicator:set_reliable(player, value.Strength)
                        replicator:set_reliable(player, value.Endurance)
                        replicator:set_reliable(player, value.Speed)
                        replicator:set_reliable(player, value.JumpForce)
                        replicator:set_reliable(player, value.Power)
                        replicator:set_relation(player, value.TokenMultiplier)
                        replicator:set_relation(player, state.TrainingMode)

                        world:set(player, instance.Player, command.player)
                        world:set(player, value.Health, 100)
                        world:set(player, value.Strength, 0)
                        world:set(player, value.Endurance, 0)
                        world:set(player, value.Speed, 0)
                        world:set(player, value.JumpForce, 0)
                        world:set(player, value.Power, 0)
                        world:set(player, jecs.pair(value.TokenMultiplier, value.Strength), 1)
                        world:set(player, jecs.pair(value.TokenMultiplier, value.Endurance), 1)
                        world:set(player, jecs.pair(value.TokenMultiplier, value.Speed), 1)
                        world:set(player, jecs.pair(value.TokenMultiplier, value.JumpForce), 1)
                        world:set(player, jecs.pair(value.TokenMultiplier, value.Power), 1)

                        playerEntities[command.player] = player

                        continue
                    end

                    local entity = playerEntities[command.player]

                    if entity == nil then
                        continue
                    end

                    if command.kind == "PlayerRemoving" then
                        playerEntities[command.player] = nil
                        world:delete(entity)
                    elseif command.kind == "CharacterAdded" then
                        world:set(entity, instance.Character, command.character)
                    elseif command.kind == "CharacterRemoving" then
                        world:remove(entity, instance.Character)
                    elseif command.kind == "HumanoidAdded" then
                        world:set(entity, instance.Humanoid, command.humanoid)
                    elseif command.kind == "HumanoidRemoving" then
                        world:remove(entity, instance.Humanoid)
                    elseif command.kind == "AnimatorAdded" then
                        world:set(entity, instance.Animator, command.animator)
                    elseif command.kind == "AnimatorRemoving" then
                        world:remove(entity, instance.Animator)
                    elseif command.kind == "HumanoidRootAdded" then
                        world:set(entity, instance.HumanoidRoot, command.root)
                    elseif command.kind == "HumanoidRootRemoving" then
                        world:remove(entity, instance.HumanoidRoot)
                    elseif command.kind == "TorsoAdded" then
                        world:set(entity, instance.Torso, command.torso)
                    elseif command.kind == "TorsoRemoving" then
                        world:remove(entity, instance.Torso)
                    end
                end

                table.clear(queue)
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
