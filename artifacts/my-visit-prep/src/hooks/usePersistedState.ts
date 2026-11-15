import { useState, useEffect, useMemo, useRef } from "react";
import { EMPTY_STATE, parsePrepState, createPrepActions, initialVisitSelection, createVisitSelectionActions, PREP_LOAD_ERROR, PREP_SAVE_ERROR } from "@workspace/vaani-core";
import type { PersistedState } from "@workspace/vaani-core";
export type { CustomQuestion, CustomTopicCategory, CustomTopic, PersistedState } from "@workspace/vaani-core";

const STORAGE_KEY = "my-visit-prep-v1";

function load(initialConditionId: string): { state: PersistedState; error: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? parsePrepState(JSON.parse(raw)) : EMPTY_STATE;
    return {
      state: {
        ...saved,
        // An explicit condition route wins over the last home-page selection.
        selection: initialConditionId ? initialVisitSelection(initialConditionId) : saved.selection ?? initialVisitSelection(),
      },
      error: null,
    };
  } catch {
    return { state: EMPTY_STATE, error: PREP_LOAD_ERROR };
  }
}

export function usePersistedState(initialConditionId = "") {
  const [initial] = useState(() => load(initialConditionId));
  const [state, setState] = useState(initial.state);
  const [storageError, setStorageError] = useState(initial.error);
  // Do not overwrite an unreadable v1 record with the empty recovery view.
  const canSave = useRef(!initial.error);
  const actions = useMemo(() => createPrepActions(setState), []);
  const selectionActions = useMemo(() => createVisitSelectionActions(updater => {
    setState(previous => ({
      ...previous,
      selection: updater(previous.selection ?? initialVisitSelection(initialConditionId)),
    }));
  }), [initialConditionId]);

  useEffect(() => {
    // Hydration is read-only: never rewrite an existing record merely because
    // a page mounted (including React Strict Mode's effect replay).
    if (!canSave.current || state === initial.state) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStorageError(null);
    } catch {
      setStorageError(PREP_SAVE_ERROR);
    }
  }, [state, initial]);

  return {
    state, storageError, ...actions,
    selection: state.selection ?? initialVisitSelection(initialConditionId),
    selectionActions,
    resetAll() {
      canSave.current = true;
      actions.resetAll();
    },
  };
}