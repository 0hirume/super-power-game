local jecs = require("../../roblox_packages/jecs")
local replecs = require("../../roblox_packages/replecs")

return function<T>(world: jecs.World, name: string?, isShared: boolean?): jecs.Component<T>
    local component = world:component<<T>>()

    if name ~= nil then
        world:set(component, jecs.Name, name)
    end

    if isShared then
        world:add(component, replecs.shared)
    end

    return component
end
