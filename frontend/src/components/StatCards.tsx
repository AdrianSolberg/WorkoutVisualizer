import { StatCard } from "./StatCard";
import { get_current_max } from "../utils/exercise-utils";

export function StatCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard stat_name="Weight" stat_value={99.0} trend={1.2} />
      <StatCard stat_name="Incline dumbell press" stat_value={get_current_max("Skråbenk")} trend={-5.5} />
      <StatCard stat_name="Military press" stat_value={get_current_max("Militærpress")} trend={3.0} />
      <StatCard stat_name="Pullups" stat_value={get_current_max("Pullups")} trend={2.0} />
    </div>
  );
}
