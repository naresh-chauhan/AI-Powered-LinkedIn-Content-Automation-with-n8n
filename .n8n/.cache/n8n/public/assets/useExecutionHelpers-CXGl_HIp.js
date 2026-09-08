import { d as defineComponent, j4 as useAnnotationTagsStore, K as useUIStore, p as computed, c as openBlock, e as createBlock, j5 as ANNOTATION_TAGS_MANAGER_MODAL_KEY, j6 as _sfc_main$1, g as useI18n } from "./index-40I5DMGP.js";
import { b as convertToDisplayDate } from "./dateFormatter-BRi2wSZ-.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AnnotationTagsDropdown.ee",
  props: {
    placeholder: { default: "" },
    modelValue: { default: () => [] },
    createEnabled: { type: Boolean, default: false },
    eventBus: { default: null }
  },
  emits: ["update:modelValue", "esc", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagsStore = useAnnotationTagsStore();
    const uiStore = useUIStore();
    const selectedTags = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const allTags = computed(() => tagsStore.allTags);
    const isLoading = computed(() => tagsStore.isLoading);
    const tagsById = computed(() => tagsStore.tagsById);
    async function createTag(name) {
      return await tagsStore.create(name);
    }
    function handleManageTags() {
      uiStore.openModal(ANNOTATION_TAGS_MANAGER_MODAL_KEY);
    }
    function handleEsc() {
      emit("esc");
    }
    function handleBlur() {
      emit("blur");
    }
    void tagsStore.fetchAll();
    return (_ctx, _cache) => {
      const _component_TagsDropdown = _sfc_main$1;
      return openBlock(), createBlock(_component_TagsDropdown, {
        modelValue: selectedTags.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedTags.value = $event),
        placeholder: _ctx.placeholder,
        "create-enabled": _ctx.createEnabled,
        "event-bus": _ctx.eventBus,
        "all-tags": allTags.value,
        "is-loading": isLoading.value,
        "tags-by-id": tagsById.value,
        "create-tag": createTag,
        onManageTags: handleManageTags,
        onEsc: handleEsc,
        onBlur: handleBlur
      }, null, 8, ["modelValue", "placeholder", "create-enabled", "event-bus", "all-tags", "is-loading", "tags-by-id"]);
    };
  }
});
function useExecutionHelpers() {
  const i18n = useI18n();
  function getUIDetails(execution) {
    var _a, _b;
    const status = {
      name: "unknown",
      createdAt: ((_a = execution.createdAt) == null ? void 0 : _a.toString()) ?? "",
      startTime: formatDate(execution.startedAt),
      label: "Status unknown",
      runningTime: "",
      showTimestamp: true,
      tags: ((_b = execution.annotation) == null ? void 0 : _b.tags) ?? []
    };
    if (execution.status === "new") {
      status.name = "new";
      status.label = i18n.baseText("executionsList.new");
      status.showTimestamp = false;
    } else if (execution.status === "waiting") {
      status.name = "waiting";
      status.label = i18n.baseText("executionsList.waiting");
      status.showTimestamp = false;
    } else if (execution.status === "canceled") {
      status.label = i18n.baseText("executionsList.canceled");
    } else if (execution.status === "running") {
      status.name = "running";
      status.label = i18n.baseText("executionsList.running");
    } else if (execution.status === "success") {
      status.name = "success";
      status.label = i18n.baseText("executionsList.succeeded");
    } else if (execution.status === "error" || execution.status === "crashed") {
      status.name = "error";
      status.label = i18n.baseText("executionsList.error");
    }
    if (!execution.status) execution.status = "unknown";
    if (execution.startedAt && execution.stoppedAt) {
      const stoppedAt = execution.stoppedAt ? new Date(execution.stoppedAt).getTime() : Date.now();
      status.runningTime = i18n.displayTimer(
        stoppedAt - new Date(execution.startedAt).getTime(),
        true
      );
    }
    return status;
  }
  function formatDate(fullDate) {
    const { date, time } = convertToDisplayDate(fullDate);
    return i18n.baseText("executionsList.started", { interpolate: { time, date } });
  }
  function isExecutionRetriable(execution) {
    return ["crashed", "error"].includes(execution.status) && !execution.retrySuccessId;
  }
  return {
    getUIDetails,
    formatDate,
    isExecutionRetriable
  };
}
export {
  _sfc_main as _,
  useExecutionHelpers as u
};
