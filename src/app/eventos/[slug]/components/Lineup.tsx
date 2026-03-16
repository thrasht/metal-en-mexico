import type { ShowData } from "@/lib/types/event";
import styles from "./Lineup.module.css";

function formatShowDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

interface ShowsByDay {
  date: string;
  label: string;
  stages: {
    stage: string;
    shows: ShowData[];
  }[];
}

function organizeShows(shows: ShowData[], isFestival: boolean): ShowsByDay[] {
  if (!isFestival) {
    const sorted = [...shows].sort((a, b) => {
      if (!a.startTime || !b.startTime) return 0;
      return a.startTime.localeCompare(b.startTime);
    });
    return [
      {
        date: "",
        label: "",
        stages: [{ stage: "", shows: sorted }],
      },
    ];
  }

  const dayMap = new Map<string, Map<string, ShowData[]>>();

  for (const show of shows) {
    const day = show.showDate ?? "";
    const stage = show.stage ?? "General";

    if (!dayMap.has(day)) dayMap.set(day, new Map());
    const stageMap = dayMap.get(day)!;
    if (!stageMap.has(stage)) stageMap.set(stage, []);
    stageMap.get(stage)!.push(show);
  }

  const days = [...dayMap.keys()].sort();

  return days.map((day) => {
    const stageMap = dayMap.get(day)!;
    const stages = [...stageMap.entries()]
      .map(([stage, stageShows]) => ({
        stage,
        shows: stageShows.sort((a, b) => {
          if (!a.startTime || !b.startTime) return 0;
          return b.startTime.localeCompare(a.startTime);
        }),
      }))
      .sort((a, b) => a.stage.localeCompare(b.stage));

    return {
      date: day,
      label: day ? formatShowDate(day) : "",
      stages,
    };
  });
}

interface LineupProps {
  shows: ShowData[];
  isFestival: boolean;
}

export function Lineup({ shows, isFestival }: LineupProps) {
  if (shows.length === 0) return null;

  const organized = organizeShows(shows, isFestival);

  return (
    <div className={styles.lineup}>
      {organized.map((day, dayIdx) => (
        <div key={dayIdx} className={styles.dayGroup}>
          {day.label && <div className={styles.dayLabel}>{day.label}</div>}

          {day.stages.map((stageGroup, stageIdx) => (
            <div key={stageIdx} className={styles.stageGroup}>
              {stageGroup.stage && (
                <div className={styles.stageLabel}>{stageGroup.stage}</div>
              )}

              {stageGroup.shows.map((show, showIdx) => (
                <div
                  key={showIdx}
                  className={`${styles.showItem} ${show.isHeadliner ? styles.headliner : ""}`}
                >
                  <span className={styles.showTime}>
                    {show.startTime ?? ""}
                  </span>
                  <span className={styles.showBand}>{show.band.name}</span>
                  {show.band.genre && (
                    <span className={styles.showGenre}>{show.band.genre}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
