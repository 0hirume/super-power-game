import type { VisualEffectModel } from "./src/shared/types";

declare global {
    interface ReplicatedStorage extends Instance {
        assets: Folder & {
            effects: Folder & {
                meditation: VisualEffectModel;
            };
        };
    }
}
