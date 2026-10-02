import { isAllDone } from './progress';

const CONGRATS_SHOWN_KEY = 'triethoc_congrats_shown';

export function syncCongratsCycle(): void {
  if (isAllDone()) return;
  try {
    window.localStorage.removeItem(CONGRATS_SHOWN_KEY);
  } catch {
    // The games remain playable when browser storage is unavailable.
  }
}

export function shouldShowCongratsAfterCompletion(newlyCompleted: boolean): boolean {
  if (!newlyCompleted || !isAllDone()) return false;
  try {
    if (window.localStorage.getItem(CONGRATS_SHOWN_KEY) === 'true') return false;
    window.localStorage.setItem(CONGRATS_SHOWN_KEY, 'true');
    return true;
  } catch {
    return true;
  }
}
