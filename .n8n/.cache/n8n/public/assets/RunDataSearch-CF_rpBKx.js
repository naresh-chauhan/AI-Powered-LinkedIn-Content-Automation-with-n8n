import { d as defineComponent, J as useDebounce, r as ref, p as computed, o as onMounted, aX as onUnmounted, H as watch, l as resolveComponent, c as openBlock, e as createBlock, w as withCtx, i as createVNode, n as normalizeClass, B as normalizeStyle, g as useI18n, _ as _export_sfc } from "./index-40I5DMGP.js";
const COLLAPSED_WIDTH = "30px";
const OPEN_WIDTH = "204px";
const OPEN_MIN_WIDTH = "120px";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunDataSearch",
  props: {
    modelValue: {},
    paneType: { default: "output" },
    displayMode: { default: "schema" },
    isAreaActive: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "focus"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const locale = useI18n();
    const { debounce } = useDebounce();
    const inputRef = ref(null);
    const search = ref(props.modelValue ?? "");
    const opened = ref(!!search.value);
    const placeholder = computed(() => {
      if (props.paneType === "output") {
        return locale.baseText("ndv.search.placeholder.output");
      }
      if (props.displayMode === "schema") {
        return locale.baseText("ndv.search.placeholder.input.schema");
      }
      return locale.baseText("ndv.search.placeholder.input");
    });
    const style = computed(
      () => opened.value ? { maxWidth: OPEN_WIDTH, minWidth: OPEN_MIN_WIDTH } : { maxWidth: COLLAPSED_WIDTH }
    );
    const documentKeyHandler = (event) => {
      var _a, _b, _c, _d;
      const isTargetFormElementOrEditable = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement || ((_b = (_a = event.target) == null ? void 0 : _a.getAttribute) == null ? void 0 : _b.call(_a, "contentEditable")) === "true";
      if (event.key === "/" && props.isAreaActive && !isTargetFormElementOrEditable) {
        (_c = inputRef.value) == null ? void 0 : _c.focus();
        (_d = inputRef.value) == null ? void 0 : _d.select();
      }
    };
    const debouncedEmitUpdate = debounce(async (value) => emit("update:modelValue", value), {
      debounceTime: 300,
      trailing: true
    });
    const onSearchUpdate = (value) => {
      search.value = value;
      void debouncedEmitUpdate(value);
    };
    const onFocus = () => {
      var _a;
      opened.value = true;
      (_a = inputRef.value) == null ? void 0 : _a.select();
      emit("focus");
    };
    const onBlur = () => {
      if (!props.modelValue) {
        opened.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("keyup", documentKeyHandler);
    });
    onUnmounted(() => {
      document.removeEventListener("keyup", documentKeyHandler);
    });
    watch(
      () => props.modelValue,
      (value) => {
        search.value = value;
      }
    );
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_input = resolveComponent("n8n-input");
      return openBlock(), createBlock(_component_n8n_input, {
        ref_key: "inputRef",
        ref: inputRef,
        "data-test-id": "ndv-search",
        class: normalizeClass({
          [_ctx.$style.ioSearch]: true,
          [_ctx.$style.ioSearchOpened]: opened.value
        }),
        style: normalizeStyle(style.value),
        "model-value": search.value,
        placeholder: placeholder.value,
        size: "small",
        "onUpdate:modelValue": onSearchUpdate,
        onFocus,
        onBlur
      }, {
        prefix: withCtx(() => [
          createVNode(_component_n8n_icon, {
            class: normalizeClass(_ctx.$style.ioSearchIcon),
            icon: "search"
          }, null, 8, ["class"])
        ]),
        _: 1
      }, 8, ["class", "style", "model-value", "placeholder"]);
    };
  }
});
const ioSearch = "_ioSearch_1w9ua_1";
const ioSearchIcon = "_ioSearchIcon_1w9ua_4";
const ioSearchOpened = "_ioSearchOpened_1w9ua_21";
const style0 = {
  ioSearch,
  ioSearchIcon,
  ioSearchOpened
};
const cssModules = {
  "$style": style0
};
const RunDataSearch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  RunDataSearch as default
};
