local jecs = require("../../roblox_packages/jecs")
local replecs = require("../../roblox_packages/replecs")

return function(world: jecs.World, name: string?, isShared: boolean?): jecs.Entity
    local tag = world:entity()

    if name ~= nil then
        world:set(tag, jecs.Name, name)
    end

    if isShared then
        world:add(tag, replecs.shared)
    end

    return tag
end
