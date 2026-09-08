import { d as defineComponent, T as useWorkflowsStore, bf as useNodeTypesStore, K as useUIStore, hj as usePostHog, p as computed, jB as doesNodeHaveAllCredentialsFilled, iE as TEMPLATE_CREDENTIAL_SETUP_EXPERIMENT, H as watch, v as onBeforeUnmount, jC as SETUP_CREDENTIALS_MODAL_KEY, l as resolveComponent, c as openBlock, e as createBlock, A as unref, f as createCommentVNode, g as useI18n } from "./index-40I5DMGP.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SetupWorkflowCredentialsButton",
  setup(__props) {
    const workflowsStore = useWorkflowsStore();
    const nodeTypesStore = useNodeTypesStore();
    const uiStore = useUIStore();
    const posthogStore = usePostHog();
    const i18n = useI18n();
    const isTemplateSetupCompleted = computed(() => {
      var _a, _b;
      return !!((_b = (_a = workflowsStore.workflow) == null ? void 0 : _a.meta) == null ? void 0 : _b.templateCredsSetupCompleted);
    });
    const allCredentialsFilled = computed(() => {
      if (isTemplateSetupCompleted.value) {
        return true;
      }
      const nodes = workflowsStore.getNodes();
      if (!nodes.length) {
        return false;
      }
      return nodes.every((node) => doesNodeHaveAllCredentialsFilled(nodeTypesStore, node));
    });
    const showButton = computed(() => {
      var _a, _b;
      const isFeatureEnabled = posthogStore.isFeatureEnabled(TEMPLATE_CREDENTIAL_SETUP_EXPERIMENT);
      const isCreatedFromTemplate = !!((_b = (_a = workflowsStore.workflow) == null ? void 0 : _a.meta) == null ? void 0 : _b.templateId);
      if (!isFeatureEnabled || !isCreatedFromTemplate || isTemplateSetupCompleted.value) {
        return false;
      }
      return !allCredentialsFilled.value;
    });
    const unsubscribe = watch(allCredentialsFilled, (newValue) => {
      if (newValue) {
        workflowsStore.addToWorkflowMetadata({
          templateCredsSetupCompleted: true
        });
        unsubscribe();
      }
    });
    const handleClick = () => {
      uiStore.openModal(SETUP_CREDENTIALS_MODAL_KEY);
    };
    onBeforeUnmount(() => {
      uiStore.closeModal(SETUP_CREDENTIALS_MODAL_KEY);
    });
    return (_ctx, _cache) => {
      const _component_n8n_button = resolveComponent("n8n-button");
      return showButton.value ? (openBlock(), createBlock(_component_n8n_button, {
        key: 0,
        label: unref(i18n).baseText("nodeView.setupTemplate"),
        size: "large",
        icon: "box-open",
        type: "secondary",
        onClick: _cache[0] || (_cache[0] = ($event) => handleClick())
      }, null, 8, ["label"])) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
