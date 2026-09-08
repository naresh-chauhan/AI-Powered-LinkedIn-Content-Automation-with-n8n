import { d as defineComponent, $ as useCanvasStore, el as storeToRefs, eW as useDeviceSupport, av as onBeforeMount, v as onBeforeUnmount, l as resolveComponent, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, A as unref, gn as KeyboardShortcutTooltip, e as createBlock, f as createCommentVNode, n as normalizeClass, _ as _export_sfc } from "./index-40I5DMGP.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CanvasControls",
  setup(__props) {
    const canvasStore = useCanvasStore();
    const { zoomToFit, zoomIn, zoomOut, resetZoom } = canvasStore;
    const { nodeViewScale, isDemo } = storeToRefs(canvasStore);
    const deviceSupport = useDeviceSupport();
    const keyDown = (e) => {
      const isCtrlKeyPressed = deviceSupport.isCtrlKeyPressed(e);
      if ((e.key === "=" || e.key === "+") && !isCtrlKeyPressed) {
        zoomIn();
      } else if ((e.key === "_" || e.key === "-") && !isCtrlKeyPressed) {
        zoomOut();
      } else if (e.key === "0" && !isCtrlKeyPressed) {
        resetZoom();
      } else if (e.key === "1" && !isCtrlKeyPressed) {
        zoomToFit();
      }
    };
    onBeforeMount(() => {
      document.addEventListener("keydown", keyDown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", keyDown);
    });
    return (_ctx, _cache) => {
      const _component_n8n_icon_button = resolveComponent("n8n-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          [_ctx.$style.zoomMenu]: true,
          [_ctx.$style.regularZoomMenu]: !unref(isDemo),
          [_ctx.$style.demoZoomMenu]: unref(isDemo)
        })
      }, [
        createVNode(KeyboardShortcutTooltip, {
          label: _ctx.$locale.baseText("nodeView.zoomToFit"),
          shortcut: { keys: ["1"] }
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_icon_button, {
              type: "tertiary",
              size: "large",
              icon: "expand",
              "data-test-id": "zoom-to-fit",
              onClick: unref(zoomToFit)
            }, null, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["label"]),
        createVNode(KeyboardShortcutTooltip, {
          label: _ctx.$locale.baseText("nodeView.zoomIn"),
          shortcut: { keys: ["+"] }
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_icon_button, {
              type: "tertiary",
              size: "large",
              icon: "search-plus",
              "data-test-id": "zoom-in-button",
              onClick: unref(zoomIn)
            }, null, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["label"]),
        createVNode(KeyboardShortcutTooltip, {
          label: _ctx.$locale.baseText("nodeView.zoomOut"),
          shortcut: { keys: ["-"] }
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_icon_button, {
              type: "tertiary",
              size: "large",
              icon: "search-minus",
              "data-test-id": "zoom-out-button",
              onClick: unref(zoomOut)
            }, null, 8, ["onClick"])
          ]),
          _: 1
        }, 8, ["label"]),
        createVNode(KeyboardShortcutTooltip, {
          label: _ctx.$locale.baseText("nodeView.resetZoom"),
          shortcut: { keys: ["0"] }
        }, {
          default: withCtx(() => [
            unref(nodeViewScale) !== 1 && !unref(isDemo) ? (openBlock(), createBlock(_component_n8n_icon_button, {
              key: 0,
              type: "tertiary",
              size: "large",
              icon: "undo",
              "data-test-id": "reset-zoom-button",
              onClick: unref(resetZoom)
            }, null, 8, ["onClick"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["label"])
      ], 2);
    };
  }
});
const zoomMenu = "_zoomMenu_1f09c_1";
const regularZoomMenu = "_regularZoomMenu_1f09c_20";
const demoZoomMenu = "_demoZoomMenu_1f09c_25";
const style0 = {
  zoomMenu,
  regularZoomMenu,
  demoZoomMenu
};
const cssModules = {
  "$style": style0
};
const CanvasControls = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  CanvasControls as default
};
