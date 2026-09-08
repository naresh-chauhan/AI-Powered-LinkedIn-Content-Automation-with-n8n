import { _ as _sfc_main$2 } from "./PushConnectionTracker.vue_vue_type_script_setup_true_lang-ByoMju5L.js";
import { d as defineComponent, b as useRouter, a3 as useDocumentTitle, Z as useRootStore, p as computed, o as onMounted, av as onBeforeMount, v as onBeforeUnmount, l as resolveComponent, c as openBlock, h as createElementBlock, i as createVNode, j as createBaseVNode, w as withCtx, k as createTextVNode, t as toDisplayString, n as normalizeClass, A as unref, F as Fragment, z as renderList, g as useI18n, ak as useTelemetry, _ as _export_sfc, m as useSettingsStore, a5 as usePageRedirectionHelper, e as createBlock } from "./index-40I5DMGP.js";
import { u as usePushConnection, a as useOrchestrationStore } from "./usePushConnection-B5ija5f5.js";
import { u as usePushConnectionStore } from "./pushConnection.store-w_WxpOeH.js";
const _hoisted_1$1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkerList.ee",
  props: {
    autoRefreshEnabled: { type: Boolean, default: true }
  },
  setup(__props) {
    const router = useRouter();
    const i18n = useI18n();
    const pushConnection = usePushConnection({ router });
    const documentTitle = useDocumentTitle();
    const telemetry = useTelemetry();
    const orchestrationManagerStore = useOrchestrationStore();
    const rootStore = useRootStore();
    const pushStore = usePushConnectionStore();
    const initialStatusReceived = computed(() => orchestrationManagerStore.initialStatusReceived);
    const workerIds = computed(() => Object.keys(orchestrationManagerStore.workers));
    const pageTitle = computed(() => i18n.baseText("workerList.pageTitle"));
    onMounted(() => {
      documentTitle.set(pageTitle.value);
      telemetry.track("User viewed worker view", {
        instance_id: rootStore.instanceId
      });
    });
    onBeforeMount(() => {
      if (window.Cypress !== void 0) {
        return;
      }
      pushConnection.initialize();
      pushStore.pushConnect();
      orchestrationManagerStore.startWorkerStatusPolling();
    });
    onBeforeUnmount(() => {
      if (window.Cypress !== void 0) {
        return;
      }
      orchestrationManagerStore.stopWorkerStatusPolling();
      pushStore.pushDisconnect();
      pushConnection.terminate();
    });
    return (_ctx, _cache) => {
      const _component_PushConnectionTracker = _sfc_main$2;
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_spinner = resolveComponent("n8n-spinner");
      const _component_WorkerCard = resolveComponent("WorkerCard");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_PushConnectionTracker, { class: "actions" }),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.workerListHeader)
        }, [
          createVNode(_component_n8n_heading, {
            tag: "h1",
            size: "2xlarge"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(pageTitle.value), 1)
            ]),
            _: 1
          })
        ], 2),
        !initialStatusReceived.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createVNode(_component_n8n_spinner)
        ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
          workerIds.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref(i18n).baseText("workerList.empty")), 1)) : (openBlock(), createElementBlock("div", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(workerIds.value, (workerId) => {
              return openBlock(), createElementBlock("div", {
                key: workerId,
                class: normalizeClass(_ctx.$style.card)
              }, [
                createVNode(_component_WorkerCard, {
                  "worker-id": workerId,
                  "data-test-id": "worker-card"
                }, null, 8, ["worker-id"])
              ], 2);
            }), 128))
          ]))
        ]))
      ]);
    };
  }
});
const workerListHeader = "_workerListHeader_12j1s_1";
const card = "_card_12j1s_8";
const tableLoader = "_tableLoader_12j1s_12";
const style0$1 = {
  workerListHeader,
  card,
  tableLoader
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkerList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = ["href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkerView",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const pageRedirectionHelper = usePageRedirectionHelper();
    const goToUpgrade = () => {
      void pageRedirectionHelper.goToUpgrade("worker-view", "upgrade-worker-view");
    };
    return (_ctx, _cache) => {
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return unref(settingsStore).isQueueModeEnabled && unref(settingsStore).isWorkerViewAvailable ? (openBlock(), createBlock(WorkerList, {
        key: 0,
        "data-test-id": "worker-view-licensed"
      })) : (openBlock(), createBlock(_component_n8n_action_box, {
        key: 1,
        "data-test-id": "worker-view-unlicensed",
        class: normalizeClass(_ctx.$style.actionBox),
        description: _ctx.$locale.baseText("workerList.actionBox.description"),
        "button-text": _ctx.$locale.baseText("workerList.actionBox.buttonText"),
        "onClick:button": goToUpgrade
      }, {
        heading: withCtx(() => [
          createBaseVNode("span", null, toDisplayString(_ctx.$locale.baseText("workerList.actionBox.title")), 1)
        ]),
        description: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.$locale.baseText("workerList.actionBox.description")) + " ", 1),
          createBaseVNode("a", {
            href: _ctx.$locale.baseText("workerList.docs.url"),
            target: "_blank"
          }, toDisplayString(_ctx.$locale.baseText("workerList.actionBox.description.link")), 9, _hoisted_1)
        ]),
        _: 1
      }, 8, ["class", "description", "button-text"]));
    };
  }
});
const actionBox = "_actionBox_13ul9_1";
const style0 = {
  actionBox
};
const cssModules = {
  "$style": style0
};
const WorkerView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkerView as default
};
