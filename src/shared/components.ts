import { sharedWorld } from "./world";
import { Name } from "@rbxts/jecs";

export const PlayerInstance = sharedWorld.component<Player>();
sharedWorld.set(PlayerInstance, Name, "PlayerInstance");

export const Health = sharedWorld.component<number>();
sharedWorld.set(Health, Name, "Health");
export const MaxHealth = sharedWorld.component<number>();
sharedWorld.set(MaxHealth, Name, "MaxHealth");

export const Strength = sharedWorld.component<number>();
sharedWorld.set(Strength, Name, "Strength");
export const StrengthMultiplier = sharedWorld.component<number>();
sharedWorld.set(StrengthMultiplier, Name, "StrengthMultiplier");
export const Endurance = sharedWorld.component<number>();
sharedWorld.set(Endurance, Name, "Endurance");
export const EnduranceMultiplier = sharedWorld.component<number>();
sharedWorld.set(EnduranceMultiplier, Name, "EnduranceMultiplier");
export const Speed = sharedWorld.component<number>();
sharedWorld.set(Speed, Name, "Speed");
export const SpeedMultiplier = sharedWorld.component<number>();
sharedWorld.set(SpeedMultiplier, Name, "SpeedMultiplier");
export const JumpForce = sharedWorld.component<number>();
sharedWorld.set(JumpForce, Name, "JumpForce");
export const JumpForceMultiplier = sharedWorld.component<number>();
sharedWorld.set(JumpForceMultiplier, Name, "JumpForceMultiplier");
export const Power = sharedWorld.component<number>();
sharedWorld.set(Power, Name, "Power");
export const PowerMultiplier = sharedWorld.component<number>();
sharedWorld.set(PowerMultiplier, Name, "PowerMultiplier");

export const CoolDown = sharedWorld.component<number>();
sharedWorld.set(CoolDown, Name, "CoolDown");
