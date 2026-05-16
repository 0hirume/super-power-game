local isVerified = false
local isStarted = false

return {
    handshake = {
        isVerified = function()
            return isVerified
        end,
        verify = function()
            isVerified = true
        end,
    },
    isStarted = function()
        return isStarted
    end,
    start = function()
        isStarted = true
    end,
}
