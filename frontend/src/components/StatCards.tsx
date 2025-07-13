import { StatCard } from "./StatCard";
import { get_current_max, get_current_max_trend } from "../utils/exercise-utils";
import { get_current_weight, get_weight_trend } from "@/utils/weight_utils";

export function StatCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard stat_name="Weight" stat_value={get_current_weight(true)} trend={get_weight_trend(true)} />
      <StatCard stat_name="Incline dumbell press" stat_value={get_current_max("Skråbenk")} trend={get_current_max_trend("Skråbenk")} />
      <StatCard stat_name="Military press" stat_value={get_current_max("Militærpress")} trend={get_current_max_trend("Militærpress")} />
      <StatCard stat_name="Pullups" stat_value={get_current_max("Pullups")} trend={get_current_max_trend("Pullups")} />
    </div>
  );
}
