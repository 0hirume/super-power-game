local planck_jabby = require("@game/ReplicatedStorage/roblox_packages/planck-jabby")
local planck_runservice = require("@game/ReplicatedStorage/roblox_packages/planck-runservice")

local scheduler = require("@game/ReplicatedStorage/scheduler")
local world = require("@game/ReplicatedStorage/world")

local jabbySetupServer = require("./systems/jabbySetupServer")
local setupPlayer = require("./systems/setupPlayer")

local applyHumanoidAttributes = require("./systems/applyHumanoidAttributes")
local decreaseCooldowns = require("./systems/decreaseCooldowns")
local processTrainingMode = require("./systems/training/processTrainingMode")
local receiveRequests = require("./systems/replecs/receiveRequests")
local replicator = require("./replicator")
local sendUpdates = require("./systems/replecs/sendUpdates")
local setTrainingMode = require("./systems/training/setTrainingMode")

require("@game/ReplicatedStorage/components/instance")
require("@game/ReplicatedStorage/components/intent")
require("@game/ReplicatedStorage/components/state")
require("@game/ReplicatedStorage/components/value")

replicator:init(world)

scheduler
    :addPlugin(planck_jabby.new())
    :addPlugin(planck_runservice.Plugin.new())
    :addSystem(receiveRequests)
    :addSystem(sendUpdates)
    :addSystem(jabbySetupServer)
    :addSystem(setupPlayer)
    :addSystem(applyHumanoidAttributes)
    :addSystem(setTrainingMode)
    :addSystem(processTrainingMode)
    :addSystem(decreaseCooldowns)
