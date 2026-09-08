import { d as defineComponent, Z as useRootStore, K as useUIStore, p as computed, c as openBlock, h as createElementBlock, n as normalizeClass, _ as _export_sfc, ij as useSSOStore, a as useToast, l as resolveComponent, A as unref, j as createBaseVNode, t as toDisplayString, i as createVNode, f as createCommentVNode, g as useI18n, w as withCtx, k as createTextVNode, e as createBlock, aS as mergeProps } from "./index-40I5DMGP.js";
const _hoisted_1 = ["src"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  setup(__props) {
    const rootStore = useRootStore();
    const uiStore = useUIStore();
    const basePath = computed(() => rootStore.baseUrl);
    const logoPath = computed(() => basePath.value + uiStore.logo);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("img", {
        src: logoPath.value,
        class: normalizeClass(_ctx.$style.img),
        alt: "n8n.io"
      }, null, 10, _hoisted_1);
    };
  }
});
const img = "_img_8137c_1";
const style0$2 = {
  img
};
const cssModules$2 = {
  "$style": style0$2
};
const Logo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SSOLogin",
  setup(__props) {
    const i18n = useI18n();
    const ssoStore = useSSOStore();
    const toast = useToast();
    const onSSOLogin = async () => {
      try {
        window.location.href = await ssoStore.getSSORedirectUrl();
      } catch (error) {
        toast.showError(error, "Error", error.message);
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_button = resolveComponent("n8n-button");
      return unref(ssoStore).showSsoLoginButton ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.ssoLogin)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.divider)
        }, [
          createBaseVNode("span", null, toDisplayString(unref(i18n).baseText("sso.login.divider")), 1)
        ], 2),
        createVNode(_component_n8n_button, {
          size: "large",
          type: "primary",
          outline: "",
          label: unref(i18n).baseText("sso.login.button"),
          onClick: onSSOLogin
        }, null, 8, ["label"])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const ssoLogin = "_ssoLogin_41af7_1";
const divider = "_divider_41af7_5";
const style0$1 = {
  ssoLogin,
  divider
};
const cssModules$1 = {
  "$style": style0$1
};
const SSOLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthView",
  props: {
    form: {},
    formLoading: { type: Boolean, default: false },
    subtitle: {},
    withSso: { type: Boolean, default: false }
  },
  emits: ["update", "submit", "secondaryClick"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const onUpdate = (e) => {
      emit("update", e);
    };
    const onSubmit = (values) => {
      emit("submit", values);
    };
    const onSecondaryClick = () => {
      emit("secondaryClick");
    };
    return (_ctx, _cache) => {
      const _component_Logo = Logo;
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_form_box = resolveComponent("n8n-form-box");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.logoContainer)
        }, [
          createVNode(_component_Logo)
        ], 2),
        _ctx.subtitle ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.textContainer)
        }, [
          createVNode(_component_n8n_text, { size: "large" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.subtitle), 1)
            ]),
            _: 1
          })
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.formContainer)
        }, [
          createVNode(_component_n8n_form_box, mergeProps(_ctx.form, {
            "data-test-id": "auth-form",
            "button-loading": _ctx.formLoading,
            onSecondaryClick,
            onSubmit,
            onUpdate
          }), {
            default: withCtx(() => [
              _ctx.withSso ? (openBlock(), createBlock(SSOLogin, { key: 0 })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 16, ["button-loading"])
        ], 2)
      ], 2);
    };
  }
});
const container = "_container_16wci_5";
const logoContainer = "_logoContainer_16wci_16";
const textContainer = "_textContainer_16wci_21";
const formContainer = "_formContainer_16wci_25";
const style0 = {
  container,
  logoContainer,
  textContainer,
  formContainer
};
const cssModules = {
  "$style": style0
};
const AuthView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  AuthView as A,
  Logo as L
};
