import { _ as __unplugin_components_1 } from "./TemplateDetails-BAQ3vBNJ.js";
import { W as WorkflowPreview } from "./WorkflowPreview-hC6wSe-Y.js";
import { d as defineComponent, aH as useTemplatesStore, hj as usePostHog, bf as useNodeTypesStore, U as useRoute, b as useRouter, a3 as useDocumentTitle, r as ref, p as computed, H as watch, o as onMounted, c as openBlock, e as createBlock, aJ as createSlots, w as withCtx, j as createBaseVNode, f as createCommentVNode, n as normalizeClass, i as createVNode, A as unref, h as createElementBlock, k as createTextVNode, t as toDisplayString, g as useI18n, l as resolveComponent, aK as useExternalHooks, ak as useTelemetry, _ as _export_sfc } from "./index-40I5DMGP.js";
import { u as useTemplateWorkflow } from "./templateActions-D4EHdA9n.js";
import { T as TemplatesView } from "./TemplatesView-BZFc4hZ1.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TemplatesWorkflowView",
  setup(__props) {
    const externalHooks = useExternalHooks();
    const templatesStore = useTemplatesStore();
    const posthogStore = usePostHog();
    const nodeTypesStore = useNodeTypesStore();
    const route = useRoute();
    const router = useRouter();
    const telemetry = useTelemetry();
    const i18n = useI18n();
    const documentTitle = useDocumentTitle();
    const loading = ref(true);
    const showPreview = ref(true);
    const notFoundError = ref(false);
    const templateId = computed(
      () => Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    );
    const template = computed(() => templatesStore.getFullTemplateById(templateId.value));
    const openTemplateSetup = async (id, e) => {
      await useTemplateWorkflow({
        posthogStore,
        router,
        templateId: id,
        inNewBrowserTab: e.metaKey || e.ctrlKey,
        externalHooks,
        nodeTypesStore,
        telemetry,
        templatesStore,
        source: "template_preview"
      });
    };
    const onHidePreview = () => {
      showPreview.value = false;
    };
    const scrollToTop = () => {
      const contentArea = document.getElementById("content");
      if (contentArea) {
        contentArea.scrollTo({
          top: 0
        });
      }
    };
    watch(
      () => template.value,
      (newTemplate) => {
        if (newTemplate) {
          documentTitle.set(`Template template: ${newTemplate.name}`);
        } else {
          documentTitle.set("Templates");
        }
      }
    );
    onMounted(async () => {
      var _a;
      scrollToTop();
      if ((_a = template.value) == null ? void 0 : _a.full) {
        loading.value = false;
        return;
      }
      try {
        await templatesStore.fetchTemplateById(templateId.value);
      } catch (e) {
        notFoundError.value = true;
      }
      loading.value = false;
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_WorkflowPreview = WorkflowPreview;
      const _component_n8n_markdown = resolveComponent("n8n-markdown");
      const _component_TemplateDetails = __unplugin_components_1;
      return openBlock(), createBlock(TemplatesView, { "go-back-enabled": true }, createSlots({
        header: withCtx(() => [
          !notFoundError.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.wrapper)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.title)
            }, [
              template.value && template.value.name ? (openBlock(), createBlock(_component_n8n_heading, {
                key: 0,
                tag: "h1",
                size: "2xlarge"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(template.value.name), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              template.value && template.value.name ? (openBlock(), createBlock(_component_n8n_text, {
                key: 1,
                color: "text-base",
                size: "small"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("generic.workflow")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_n8n_loading, {
                loading: !template.value || !template.value.name,
                rows: 2,
                variant: "h1"
              }, null, 8, ["loading"])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.button)
            }, [
              template.value ? (openBlock(), createBlock(_component_n8n_button, {
                key: 0,
                "data-test-id": "use-template-button",
                label: unref(i18n).baseText("template.buttons.useThisWorkflowButton"),
                size: "large",
                onClick: _cache[0] || (_cache[0] = ($event) => openTemplateSetup(templateId.value, $event))
              }, null, 8, ["label"])) : createCommentVNode("", true),
              createVNode(_component_n8n_loading, {
                loading: !template.value,
                rows: 1,
                variant: "button"
              }, null, 8, ["loading"])
            ], 2)
          ], 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.$style.notFound)
          }, [
            createVNode(_component_n8n_text, { color: "text-base" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("templates.workflowsNotFound")), 1)
              ]),
              _: 1
            })
          ], 2))
        ]),
        _: 2
      }, [
        !notFoundError.value ? {
          name: "content",
          fn: withCtx(() => {
            var _a, _b, _c;
            return [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.image)
              }, [
                showPreview.value ? (openBlock(), createBlock(_component_WorkflowPreview, {
                  key: 0,
                  loading: loading.value,
                  workflow: (_a = template.value) == null ? void 0 : _a.workflow,
                  onClose: onHidePreview
                }, null, 8, ["loading", "workflow"])) : createCommentVNode("", true)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.content)
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.markdown),
                  "data-test-id": "template-description"
                }, [
                  createVNode(_component_n8n_markdown, {
                    content: (_b = template.value) == null ? void 0 : _b.description,
                    images: (_c = template.value) == null ? void 0 : _c.image,
                    loading: loading.value
                  }, null, 8, ["content", "images", "loading"])
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.details)
                }, [
                  createVNode(_component_TemplateDetails, {
                    "block-title": unref(i18n).baseText("template.details.appsInTheWorkflow"),
                    loading: loading.value,
                    template: template.value
                  }, null, 8, ["block-title", "loading", "template"])
                ], 2)
              ], 2)
            ];
          }),
          key: "0"
        } : void 0
      ]), 1024);
    };
  }
});
const wrapper = "_wrapper_trbdo_1";
const notFound = "_notFound_trbdo_6";
const title = "_title_trbdo_10";
const button = "_button_trbdo_14";
const image = "_image_trbdo_18";
const content = "_content_trbdo_29";
const markdown = "_markdown_trbdo_40";
const details = "_details_trbdo_51";
const style0 = {
  wrapper,
  notFound,
  title,
  button,
  image,
  content,
  markdown,
  details
};
const cssModules = {
  "$style": style0
};
const TemplatesWorkflowView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  TemplatesWorkflowView as default
};
