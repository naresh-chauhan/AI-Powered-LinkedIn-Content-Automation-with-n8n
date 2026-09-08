import { K as useUIStore, $ as useCanvasStore, r as ref, p as computed, V as VIEWS, g as useI18n, at as useNDVStore, T as useWorkflowsStore, m as useSettingsStore, hJ as refDebounced, hK as useLocalStorage, ak as useTelemetry } from "./index-40I5DMGP.js";
function useBeforeUnload({ route }) {
  const uiStore = useUIStore();
  const canvasStore = useCanvasStore();
  const i18n = useI18n();
  const unloadTimeout = ref(null);
  const isDemoRoute = computed(() => route.name === VIEWS.DEMO);
  const handlers = [];
  function onBeforeUnload(e) {
    if (isDemoRoute.value || window.preventNodeViewBeforeUnload) {
      return;
    }
    handlers.forEach((handler) => handler());
    if (uiStore.stateIsDirty) {
      e.returnValue = true;
      return true;
    } else {
      canvasStore.startLoading(i18n.baseText("nodeView.redirecting"));
      return;
    }
  }
  function addBeforeUnloadHandler(handler) {
    handlers.push(handler);
  }
  function addBeforeUnloadEventBindings() {
    window.addEventListener("beforeunload", onBeforeUnload);
  }
  function removeBeforeUnloadEventBindings() {
    if (unloadTimeout.value) {
      clearTimeout(unloadTimeout.value);
    }
    window.removeEventListener("beforeunload", onBeforeUnload);
  }
  return {
    onBeforeUnload,
    addBeforeUnloadEventBindings,
    removeBeforeUnloadEventBindings,
    addBeforeUnloadHandler
  };
}
function useNodeViewVersionSwitcher() {
  const ndvStore = useNDVStore();
  const workflowsStore = useWorkflowsStore();
  const settingsStore = useSettingsStore();
  const telemetry = useTelemetry();
  const isNewUser = computed(() => workflowsStore.activeWorkflows.length === 0);
  const isNewUserDebounced = refDebounced(isNewUser, 3e3);
  const nodeViewVersion = useLocalStorage(
    "NodeView.version",
    settingsStore.isCanvasV2Enabled ? "2" : "1"
  );
  function setNodeViewSwitcherDropdownOpened(visible) {
    if (!visible) {
      setNodeViewSwitcherDiscovered();
    }
  }
  const nodeViewSwitcherDiscovered = useLocalStorage("NodeView.switcher.discovered", false);
  function setNodeViewSwitcherDiscovered() {
    nodeViewSwitcherDiscovered.value = true;
  }
  const isNodeViewDiscoveryTooltipVisible = computed(
    () => !ndvStore.activeNodeName && nodeViewVersion.value !== "2" && !(isNewUserDebounced.value || nodeViewSwitcherDiscovered.value)
  );
  function switchNodeViewVersion() {
    const toVersion = nodeViewVersion.value === "1" ? "2" : "1";
    telemetry.track("User switched canvas version", {
      to_version: toVersion
    });
    nodeViewVersion.value = toVersion;
  }
  return {
    nodeViewVersion,
    nodeViewSwitcherDiscovered,
    isNodeViewDiscoveryTooltipVisible,
    setNodeViewSwitcherDropdownOpened,
    setNodeViewSwitcherDiscovered,
    switchNodeViewVersion
  };
}
export {
  useNodeViewVersionSwitcher as a,
  useBeforeUnload as u
};
