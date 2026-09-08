import { d as defineComponent, Z as useRootStore, p as computed, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, aw as withDirectives, A as unref, j as createBaseVNode, k as createTextVNode, t as toDisplayString, q as renderSlot, g as useI18n, l as resolveComponent, cD as resolveDirective } from "./index-40I5DMGP.js";
const _hoisted_1 = {
  key: 0,
  class: "push-connection-lost primary-color"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PushConnectionTracker",
  setup(__props) {
    const rootStore = useRootStore();
    const pushConnectionActive = computed(() => rootStore.pushConnectionActive);
    const i18n = useI18n();
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _directive_n8n_html = resolveDirective("n8n-html");
      return openBlock(), createElementBlock("span", null, [
        !pushConnectionActive.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_n8n_tooltip, { placement: "bottom-end" }, {
            content: withCtx(() => [
              withDirectives(createBaseVNode("div", null, null, 512), [
                [_directive_n8n_html, unref(i18n).baseText("pushConnectionTracker.cannotConnectToServer")]
              ])
            ]),
            default: withCtx(() => [
              createBaseVNode("span", null, [
                createVNode(_component_font_awesome_icon, { icon: "exclamation-triangle" }),
                createTextVNode("  " + toDisplayString(unref(i18n).baseText("pushConnectionTracker.connectionLost")), 1)
              ])
            ]),
            _: 1
          })
        ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
      ]);
    };
  }
});
export {
  _sfc_main as _
};
