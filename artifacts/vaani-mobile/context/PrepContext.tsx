import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { EMPTY_STATE, parsePrepState, createPrepActions, initialVisitSelection, createVisitSelectionActions, PREP_LOAD_ERROR, PREP_SAVE_ERROR } from "@workspace/vaani-core";
import type { PersistedState, PrepActions } from "@workspace/vaani-core";
export type { CustomQuestion, CustomTopicCategory, CustomTopicArticle, CustomTopic, PersistedState } from "@workspace/vaani-core";

const STORAGE_KEY = "vaani-prep-v1";
interface PrepContextValue extends PrepActions {
  state: PersistedState;
  storageError: string | null;
  selection: ReturnType<typeof initialVisitSelection>;
  selectionActions: ReturnType<typeof createVisitSelectionActions>;
}
const PrepContext = createContext<PrepContextValue | null>(null);

export function PrepProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(EMPTY_STATE);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const canSave = useRef(false);
  const hydrated = useRef(false);
  const dirty = useRef(false);
  const pendingUpdates = useRef<((state: PersistedState) => PersistedState)[]>([]);
  const update = useCallback((updater: (state: PersistedState) => PersistedState) => {
    // Users can interact before native storage resolves. Replay those actions
    // over the saved snapshot rather than replacing it with the empty UI state.
    if (!hydrated.current) pendingUpdates.current.push(updater);
    dirty.current = true;
    setState(updater);
  }, []);
  const actions = useMemo(() => createPrepActions(update), [update]);
  const selectionActions = useMemo(() => createVisitSelectionActions(updater => {
    update(previous => ({
      ...previous,
      selection: updater(previous.selection ?? initialVisitSelection()),
    }));
  }), [update]);
  const writes = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (!active) return;
      const restored = raw ? parsePrepState(JSON.parse(raw)) : EMPTY_STATE;
      setState(pendingUpdates.current.reduce((snapshot, apply) => apply(snapshot), restored));
      pendingUpdates.current = [];
      hydrated.current = true;
      canSave.current = true;
    }).catch(() => {
      if (active) setStorageError(PREP_LOAD_ERROR);
    }).finally(() => {
      if (active) {
        hydrated.current = true;
        pendingUpdates.current = [];
        setLoaded(true);
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    // Reading a snapshot never writes it back, even under Strict Mode. Save
    // only user changes, after hydration (and after pending edits are replayed).
    if (!loaded || !canSave.current || !dirty.current) return;
    // Serialize native writes so an earlier save cannot overwrite newer notes.
    writes.current = writes.current.then(() =>
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    ).then(() => setStorageError(null)).catch(() => setStorageError(PREP_SAVE_ERROR));
  }, [state, loaded]);

  return <PrepContext.Provider value={{
    state, storageError, ...actions,
    selection: state.selection ?? initialVisitSelection(),
    selectionActions,
    resetAll() {
      canSave.current = true;
      actions.resetAll();
    },
  }}>{children}</PrepContext.Provider>;
}

export function usePrep(): PrepContextValue {
  const ctx = useContext(PrepContext);
  if (!ctx) throw new Error("usePrep must be used within PrepProvider");
  return ctx;
}