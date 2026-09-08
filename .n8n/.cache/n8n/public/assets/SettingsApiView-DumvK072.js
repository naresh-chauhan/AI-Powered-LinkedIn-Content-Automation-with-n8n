import { d as defineComponent, m as useSettingsStore, aD as useCloudPlanStore, Z as useRootStore, a as useToast, a3 as useDocumentTitle, a5 as usePageRedirectionHelper, r as ref, p as computed, o as onMounted, iq as DOCS_DOMAIN, c as openBlock, h as createElementBlock, j as createBaseVNode, i as createVNode, w as withCtx, k as createTextVNode, t as toDisplayString, A as unref, n as normalizeClass, eT as CopyInput, e as createBlock, f as createCommentVNode, g as useI18n, ae as MODAL_CONFIRM, l as resolveComponent, al as useMessage, ak as useTelemetry, _ as _export_sfc } from "./index-40I5DMGP.js";
const _hoisted_1 = { style: { fontSize: "var(--font-size-s)", color: "var(--color-text-light)" } };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "mb-s" };
const _hoisted_4 = ["textContent"];
const _hoisted_5 = ["textContent"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsApiView",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const cloudPlanStore = useCloudPlanStore();
    const { baseUrl } = useRootStore();
    const { showError, showMessage } = useToast();
    const { confirm } = useMessage();
    const documentTitle = useDocumentTitle();
    const i18n = useI18n();
    const { goToUpgrade } = usePageRedirectionHelper();
    const telemetry = useTelemetry();
    const loading = ref(false);
    const mounted = ref(false);
    const apiKeys = ref([]);
    const apiDocsURL = ref("");
    const { isPublicApiEnabled, isSwaggerUIEnabled, publicApiPath, publicApiLatestVersion } = settingsStore;
    const isRedactedApiKey = computed(() => {
      if (!apiKeys.value) return false;
      return apiKeys.value[0].apiKey.includes("*");
    });
    onMounted(() => {
      documentTitle.set(i18n.baseText("settings.api"));
      if (!isPublicApiEnabled) return;
      void getApiKeys();
      apiDocsURL.value = isSwaggerUIEnabled ? `${baseUrl}${publicApiPath}/v${publicApiLatestVersion}/docs` : `https://${DOCS_DOMAIN}/api/api-reference/`;
    });
    function onUpgrade() {
      void goToUpgrade("settings-n8n-api", "upgrade-api", "redirect");
    }
    async function showDeleteModal() {
      const confirmed = await confirm(
        i18n.baseText("settings.api.delete.description"),
        i18n.baseText("settings.api.delete.title"),
        {
          confirmButtonText: i18n.baseText("settings.api.delete.button"),
          cancelButtonText: i18n.baseText("generic.cancel")
        }
      );
      if (confirmed === MODAL_CONFIRM) {
        await deleteApiKey();
      }
    }
    async function getApiKeys() {
      try {
        apiKeys.value = await settingsStore.getApiKeys();
      } catch (error) {
        showError(error, i18n.baseText("settings.api.view.error"));
      } finally {
        mounted.value = true;
      }
    }
    async function createApiKey() {
      loading.value = true;
      try {
        const newApiKey = await settingsStore.createApiKey();
        apiKeys.value.push(newApiKey);
      } catch (error) {
        showError(error, i18n.baseText("settings.api.create.error"));
      } finally {
        loading.value = false;
        telemetry.track("User clicked create API key button");
      }
    }
    async function deleteApiKey() {
      try {
        await settingsStore.deleteApiKey(apiKeys.value[0].id);
        showMessage({
          title: i18n.baseText("settings.api.delete.toast"),
          type: "success"
        });
        apiKeys.value = [];
      } catch (error) {
        showError(error, i18n.baseText("settings.api.delete.error"));
      } finally {
        telemetry.track("User clicked delete API key button");
      }
    }
    function onCopy() {
      telemetry.track("User clicked copy API key button");
    }
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_card = resolveComponent("n8n-card");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          createVNode(_component_n8n_heading, { size: "2xlarge" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("settings.api")) + " ", 1),
              createBaseVNode("span", _hoisted_1, " (" + toDisplayString(unref(i18n).baseText("generic.beta")) + ") ", 1)
            ]),
            _: 1
          })
        ], 2),
        apiKeys.value.length ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("p", _hoisted_3, [
            createVNode(_component_n8n_info_tip, { bold: false }, {
              default: withCtx(() => [
                createVNode(_component_i18n_t, {
                  keypath: "settings.api.view.info",
                  tag: "span"
                }, {
                  apiAction: withCtx(() => [
                    createBaseVNode("a", {
                      href: "https://docs.n8n.io/api",
                      target: "_blank",
                      textContent: toDisplayString(unref(i18n).baseText("settings.api.view.info.api"))
                    }, null, 8, _hoisted_4)
                  ]),
                  webhookAction: withCtx(() => [
                    createBaseVNode("a", {
                      href: "https://docs.n8n.io/integrations/core-nodes/n8n-nodes-base.webhook/",
                      target: "_blank",
                      textContent: toDisplayString(unref(i18n).baseText("settings.api.view.info.webhook"))
                    }, null, 8, _hoisted_5)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          createVNode(_component_n8n_card, {
            class: normalizeClass(["mb-4xs", _ctx.$style.card])
          }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                class: normalizeClass(_ctx.$style.delete)
              }, [
                createVNode(_component_n8n_link, {
                  bold: true,
                  onClick: showDeleteModal
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("generic.delete")), 1)
                  ]),
                  _: 1
                })
              ], 2),
              createBaseVNode("div", null, [
                createVNode(CopyInput, {
                  label: apiKeys.value[0].label,
                  value: apiKeys.value[0].apiKey,
                  "copy-button-text": unref(i18n).baseText("generic.clickToCopy"),
                  "toast-title": unref(i18n).baseText("settings.api.view.copy.toast"),
                  "redact-value": true,
                  "disable-copy": isRedactedApiKey.value,
                  hint: !isRedactedApiKey.value ? unref(i18n).baseText("settings.api.view.copy") : "",
                  onCopy
                }, null, 8, ["label", "value", "copy-button-text", "toast-title", "disable-copy", "hint"])
              ])
            ]),
            _: 1
          }, 8, ["class"]),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.hint)
          }, [
            createVNode(_component_n8n_text, { size: "small" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText(`settings.api.view.${unref(isSwaggerUIEnabled) ? "tryapi" : "more-details"}`)), 1)
              ]),
              _: 1
            }),
            _cache[0] || (_cache[0] = createTextVNode(" " + toDisplayString(" ") + " ")),
            createVNode(_component_n8n_link, {
              to: apiDocsURL.value,
              "new-window": true,
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText(
                  `settings.api.view.${unref(isSwaggerUIEnabled) ? "apiPlayground" : "external-docs"}`
                )), 1)
              ]),
              _: 1
            }, 8, ["to"])
          ], 2)
        ])) : !unref(isPublicApiEnabled) && unref(cloudPlanStore).userIsTrialing ? (openBlock(), createBlock(_component_n8n_action_box, {
          key: 1,
          "data-test-id": "public-api-upgrade-cta",
          heading: unref(i18n).baseText("settings.api.trial.upgradePlan.title"),
          description: unref(i18n).baseText("settings.api.trial.upgradePlan.description"),
          "button-text": unref(i18n).baseText("settings.api.trial.upgradePlan.cta"),
          "onClick:button": onUpgrade
        }, null, 8, ["heading", "description", "button-text"])) : mounted.value && !unref(cloudPlanStore).state.loadingPlan ? (openBlock(), createBlock(_component_n8n_action_box, {
          key: 2,
          "button-text": unref(i18n).baseText(loading.value ? "settings.api.create.button.loading" : "settings.api.create.button"),
          description: unref(i18n).baseText("settings.api.create.description"),
          "onClick:button": createApiKey
        }, null, 8, ["button-text", "description"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const container = "_container_1xc1f_1";
const header = "_header_1xc1f_5";
const card = "_card_1xc1f_14";
const hint = "_hint_1xc1f_25";
const style0 = {
  container,
  header,
  card,
  "delete": "_delete_1xc1f_18",
  hint
};
const cssModules = {
  "$style": style0
};
const SettingsApiView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  SettingsApiView as default
};
