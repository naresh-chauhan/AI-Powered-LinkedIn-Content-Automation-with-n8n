import { d as defineComponent, b as useRouter, c as openBlock, h as createElementBlock, i as createVNode, n as normalizeClass, j as createBaseVNode, t as toDisplayString, V as VIEWS, l as resolveComponent, _ as _export_sfc, f as createCommentVNode, q as renderSlot } from "./index-40I5DMGP.js";
const _hoisted_1 = ["textContent"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GoBackButton",
  setup(__props) {
    const router = useRouter();
    const navigateTo = () => {
      void router.push({ name: VIEWS.TEMPLATES });
    };
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.wrapper),
        onClick: navigateTo
      }, [
        createVNode(_component_font_awesome_icon, {
          class: normalizeClass(_ctx.$style.icon),
          icon: "arrow-left"
        }, null, 8, ["class"]),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.text),
          textContent: toDisplayString(_ctx.$locale.baseText("template.buttons.goBackButton"))
        }, null, 10, _hoisted_1)
      ], 2);
    };
  }
});
const wrapper = "_wrapper_1g0gc_1";
const icon = "_icon_1g0gc_6";
const text = "_text_1g0gc_7";
const style0$1 = {
  wrapper,
  icon,
  text
};
const cssModules$1 = {
  "$style": style0$1
};
const GoBackButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TemplatesView",
  props: {
    goBackEnabled: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.template)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.container)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.header)
          }, [
            _ctx.goBackEnabled ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.goBack)
            }, [
              createVNode(GoBackButton)
            ], 2)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "header")
          ], 2),
          createBaseVNode("div", null, [
            renderSlot(_ctx.$slots, "content")
          ])
        ], 2)
      ], 2);
    };
  }
});
const template = "_template_vnliu_1";
const container = "_container_vnliu_14";
const header = "_header_vnliu_18";
const goBack = "_goBack_vnliu_24";
const style0 = {
  template,
  container,
  header,
  goBack
};
const cssModules = {
  "$style": style0
};
const TemplatesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  TemplatesView as T
};
