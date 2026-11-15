import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_PMF_STATE, parsePmfState, recordPmfExport, type PmfState } from "@workspace/vaani-core";

const KEY = "vaani-pmf-survey-v1";
async function load(): Promise<PmfState> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? parsePmfState(JSON.parse(raw)) : { ...DEFAULT_PMF_STATE };
}
async function save(state: PmfState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}
export async function recordExportAndCheckSurvey(): Promise<boolean> {
  try {
    const result = recordPmfExport(await load(), Date.now());
    await save(result.state);
    return result.show;
  } catch {
    // Best-effort survey storage is not a preparation failure. Do not repeatedly
    // show a survey whose cap cannot be read or recorded.
    console.warn("Vaani could not persist survey frequency settings; survey suppressed.");
    return false;
  }
}
export async function markSurveyAnswered(): Promise<void> {
  try {
    await save({ ...await load(), answered: true });
  } catch {
    // Survey submission is independent of local frequency-cap persistence.
    console.warn("Vaani could not save the survey answered preference.");
  }
}