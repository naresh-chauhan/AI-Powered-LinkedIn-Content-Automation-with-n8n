import { d as defineComponent, a as useToast, au as useExecutionsStore, r as ref, p as computed, o as onMounted, v as onBeforeUnmount, H as watch, c as openBlock, h as createElementBlock, n as normalizeClass, i as createVNode, f as createCommentVNode, j as createBaseVNode, l as resolveComponent, g as useI18n, _ as _export_sfc } from "./index-40I5DMGP.js";
const _hoisted_1 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowPreview",
  props: {
    loading: { type: Boolean, default: false },
    mode: { default: "workflow" },
    workflow: { default: void 0 },
    executionId: { default: void 0 },
    executionMode: { default: void 0 },
    loaderType: { default: "image" },
    canOpenNDV: { type: Boolean, default: true },
    hideNodeIssues: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const i18n = useI18n();
    const toast = useToast();
    const executionsStore = useExecutionsStore();
    const iframeRef = ref(null);
    const nodeViewDetailsOpened = ref(false);
    const ready = ref(false);
    const insideIframe = ref(false);
    const scrollX = ref(0);
    const scrollY = ref(0);
    const iframeSrc = computed(() => {
      return `${window.BASE_PATH ?? "/"}workflows/demo`;
    });
    const showPreview = computed(() => {
      return !props.loading && (props.mode === "workflow" && !!props.workflow || props.mode === "execution" && !!props.executionId) && ready.value;
    });
    const loadWorkflow = () => {
      var _a, _b, _c;
      try {
        if (!props.workflow) {
          throw new Error(i18n.baseText("workflowPreview.showError.missingWorkflow"));
        }
        if (!props.workflow.nodes || !Array.isArray(props.workflow.nodes)) {
          throw new Error(i18n.baseText("workflowPreview.showError.arrayEmpty"));
        }
        (_c = (_b = (_a = iframeRef.value) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage) == null ? void 0 : _c.call(
          _b,
          JSON.stringify({
            command: "openWorkflow",
            workflow: props.workflow,
            canOpenNDV: props.canOpenNDV,
            hideNodeIssues: props.hideNodeIssues
          }),
          "*"
        );
      } catch (error) {
        toast.showError(
          error,
          i18n.baseText("workflowPreview.showError.previewError.title"),
          i18n.baseText("workflowPreview.showError.previewError.message")
        );
      }
    };
    const loadExecution = () => {
      var _a, _b, _c, _d, _e, _f;
      try {
        if (!props.executionId) {
          throw new Error(i18n.baseText("workflowPreview.showError.missingExecution"));
        }
        (_c = (_b = (_a = iframeRef.value) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage) == null ? void 0 : _c.call(
          _b,
          JSON.stringify({
            command: "openExecution",
            executionId: props.executionId,
            executionMode: props.executionMode ?? "",
            canOpenNDV: props.canOpenNDV
          }),
          "*"
        );
        if (executionsStore.activeExecution) {
          (_f = (_e = (_d = iframeRef.value) == null ? void 0 : _d.contentWindow) == null ? void 0 : _e.postMessage) == null ? void 0 : _f.call(
            _e,
            JSON.stringify({
              command: "setActiveExecution",
              executionId: executionsStore.activeExecution.id
            }),
            "*"
          );
        }
      } catch (error) {
        toast.showError(
          error,
          i18n.baseText("workflowPreview.showError.previewError.title"),
          i18n.baseText("workflowPreview.executionMode.showError.previewError.message")
        );
      }
    };
    const onMouseEnter = () => {
      insideIframe.value = true;
      scrollX.value = window.scrollX;
      scrollY.value = window.scrollY;
    };
    const onMouseLeave = () => {
      insideIframe.value = false;
    };
    const receiveMessage = ({ data }) => {
      var _a;
      if (!((_a = data == null ? void 0 : data.includes) == null ? void 0 : _a.call(data, '"command"'))) {
        return;
      }
      try {
        const json = JSON.parse(data);
        if (json.command === "n8nReady") {
          ready.value = true;
        } else if (json.command === "openNDV") {
          nodeViewDetailsOpened.value = true;
        } else if (json.command === "closeNDV") {
          nodeViewDetailsOpened.value = false;
        } else if (json.command === "error") {
          emit("close");
        }
      } catch (e) {
        console.error(e);
      }
    };
    const onDocumentScroll = () => {
      if (insideIframe.value) {
        window.scrollTo(scrollX.value, scrollY.value);
      }
    };
    onMounted(() => {
      window.addEventListener("message", receiveMessage);
      document.addEventListener("scroll", onDocumentScroll);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("message", receiveMessage);
      document.removeEventListener("scroll", onDocumentScroll);
    });
    watch(
      () => showPreview.value,
      () => {
        if (showPreview.value) {
          if (props.mode === "workflow") {
            loadWorkflow();
          } else if (props.mode === "execution") {
            loadExecution();
          }
        }
      }
    );
    watch(
      () => props.executionId,
      () => {
        if (props.mode === "execution" && props.executionId) {
          loadExecution();
        }
      }
    );
    watch(
      () => props.workflow,
      () => {
        if (props.mode === "workflow" && props.workflow) {
          loadWorkflow();
        }
      }
    );
    return (_ctx, _cache) => {
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_n8n_spinner = resolveComponent("n8n-spinner");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        _ctx.loaderType === "image" && !showPreview.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.imageLoader)
        }, [
          createVNode(_component_n8n_loading, {
            loading: !showPreview.value,
            rows: 1,
            variant: "image"
          }, null, 8, ["loading"])
        ], 2)) : _ctx.loaderType === "spinner" && !showPreview.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.$style.spinner)
        }, [
          createVNode(_component_n8n_spinner, { type: "dots" })
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("iframe", {
          ref_key: "iframeRef",
          ref: iframeRef,
          class: normalizeClass({
            [_ctx.$style.workflow]: !nodeViewDetailsOpened.value,
            [_ctx.$style.executionPreview]: _ctx.mode === "execution",
            [_ctx.$style.openNDV]: nodeViewDetailsOpened.value,
            [_ctx.$style.show]: showPreview.value
          }),
          src: iframeSrc.value,
          "data-test-id": "workflow-preview-iframe",
          onMouseenter: onMouseEnter,
          onMouseleave: onMouseLeave
        }, null, 42, _hoisted_1)
      ], 2);
    };
  }
});
const container = "_container_wh5y0_1";
const workflow = "_workflow_wh5y0_8";
const show = "_show_wh5y0_14";
const openNDV = "_openNDV_wh5y0_20";
const spinner = "_spinner_wh5y0_29";
const imageLoader = "_imageLoader_wh5y0_37";
const executionPreview = "_executionPreview_wh5y0_45";
const style0 = {
  container,
  workflow,
  show,
  openNDV,
  spinner,
  imageLoader,
  executionPreview
};
const cssModules = {
  "$style": style0
};
const WorkflowPreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowPreview as W
};
