export type GameId = 'ghep-the' | 'noi-day' | 'vong-nhan-thuc' | 'truong-nhom';

export type Progress = Record<GameId, boolean>;

const PROGRESS_KEY = 'triethoc_progress';
export const COMPLETION_DATE_KEY = 'triethoc_completion_date';
export const CERTIFICATE_NAME_KEY = 'triethoc_certificate_name';

export const gameIds: GameId[] = ['ghep-the', 'noi-day', 'vong-nhan-thuc', 'truong-nhom'];

const emptyProgress = (): Progress => ({
  'ghep-the': false,
  'noi-day': false,
  'vong-nhan-thuc': false,
  'truong-nhom': false,
});

export function getProgress(): Progress {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? '{}');
    if (!stored || typeof stored !== 'object') return emptyProgress();
    const values = stored as Partial<Record<GameId, unknown>>;
    return gameIds.reduce<Progress>((progress, id) => {
      progress[id] = values[id] === true;
      return progress;
    }, emptyProgress());
  } catch {
    return emptyProgress();
  }
}

export function isAllDone(): boolean {
  const progress = getProgress();
  return gameIds.every((id) => progress[id]);
}

export function getCompletedCount(): number {
  const progress = getProgress();
  return gameIds.filter((id) => progress[id]).length;
}

export function markGameDone(gameId: GameId): boolean {
  const progress = getProgress();
  const newlyCompleted = !progress[gameId];
  progress[gameId] = true;

  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    if (newlyCompleted && gameIds.every((id) => progress[id])) {
      window.localStorage.setItem(COMPLETION_DATE_KEY, new Date().toISOString());
    }
  } catch {
    // The game remains playable when browser storage is unavailable.
  }

  return newlyCompleted;
}

export function resetProgress(): void {
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
    window.localStorage.removeItem(COMPLETION_DATE_KEY);
  } catch {
    // Ignore unavailable browser storage.
  }
}
