import { d as defineComponent, p as computed, r as ref, e4 as isINodePropertyCollectionList, H as watch, e0 as deepCopy, av as onBeforeMount, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, k as createTextVNode, t as toDisplayString, A as unref, ei as N8nText, f as createCommentVNode, F as Fragment, z as renderList, e as createBlock, jh as N8nInputLabel, j as createBaseVNode, ej as _sfc_main$1, dY as _sfc_main$2, bs as Suspense, n as normalizeClass, et as N8nButton, eu as _sfc_main$3, ev as N8nSelect, I as withModifiers, g as useI18n, b9 as get, _ as _export_sfc } from "./index-40I5DMGP.js";
const _hoisted_1 = ["data-test-id"];
const _hoisted_2 = {
  key: 0,
  class: "no-items-exist"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 0,
  class: "delete-option"
};
const _hoisted_5 = {
  key: 2,
  class: "parameter-item"
};
const _hoisted_6 = { class: "parameter-item-wrapper" };
const _hoisted_7 = {
  key: 0,
  class: "delete-option"
};
const _hoisted_8 = {
  key: 1,
  class: "controls"
};
const _hoisted_9 = {
  key: 1,
  class: "add-option"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FixedCollectionParameter",
  props: {
    nodeValues: {},
    parameter: {},
    path: {},
    values: { default: () => ({}) },
    isReadOnly: { type: Boolean, default: false }
  },
  emits: ["valueChanged"],
  setup(__props, { emit: __emit }) {
    const locale = useI18n();
    const props = __props;
    const emit = __emit;
    const getPlaceholderText = computed(() => {
      const placeholder = locale.nodeText().placeholder(props.parameter, props.path);
      return placeholder ? placeholder : locale.baseText("fixedCollectionParameter.choose");
    });
    const mutableValues = ref({});
    const selectedOption = ref(null);
    const propertyNames = computed(() => {
      return new Set(Object.keys(mutableValues.value || {}));
    });
    const getProperties = computed(() => {
      const returnProperties = [];
      let tempProperties;
      for (const name of propertyNames.value) {
        tempProperties = getOptionProperties(name);
        if (tempProperties !== void 0) {
          returnProperties.push(tempProperties);
        }
      }
      return returnProperties;
    });
    const multipleValues = computed(() => {
      var _a;
      return !!((_a = props.parameter.typeOptions) == null ? void 0 : _a.multipleValues);
    });
    const parameterOptions = computed(() => {
      if (!isINodePropertyCollectionList(props.parameter.options)) return [];
      if (multipleValues.value) {
        return props.parameter.options;
      }
      return (props.parameter.options ?? []).filter((option) => {
        return !propertyNames.value.has(option.name);
      });
    });
    const sortable = computed(() => {
      var _a;
      return !!((_a = props.parameter.typeOptions) == null ? void 0 : _a.sortable);
    });
    watch(
      () => props.values,
      (newValues) => {
        mutableValues.value = deepCopy(newValues);
      },
      { deep: true }
    );
    onBeforeMount(() => {
      mutableValues.value = deepCopy(props.values);
    });
    const deleteOption = (optionName, index) => {
      const currentOptionsOfSameType = mutableValues.value[optionName];
      if (!currentOptionsOfSameType || currentOptionsOfSameType.length > 1) {
        emit("valueChanged", {
          name: getPropertyPath(optionName, index),
          value: void 0
        });
      } else {
        emit("valueChanged", {
          name: getPropertyPath(optionName),
          value: void 0
        });
      }
    };
    const getPropertyPath = (name, index) => {
      return `${props.path}.${name}` + (index !== void 0 ? `[${index}]` : "");
    };
    const getOptionProperties = (optionName) => {
      if (isINodePropertyCollectionList(props.parameter.options)) {
        for (const option of props.parameter.options) {
          if (option.name === optionName) {
            return option;
          }
        }
      }
      return void 0;
    };
    const moveOptionDown = (optionName, index) => {
      if (Array.isArray(mutableValues.value[optionName])) {
        mutableValues.value[optionName].splice(
          index + 1,
          0,
          mutableValues.value[optionName].splice(index, 1)[0]
        );
      }
      const parameterData = {
        name: getPropertyPath(optionName),
        value: mutableValues.value[optionName],
        type: "optionsOrderChanged"
      };
      emit("valueChanged", parameterData);
    };
    const moveOptionUp = (optionName, index) => {
      var _a;
      if (Array.isArray(mutableValues.value[optionName])) {
        (_a = mutableValues.value) == null ? void 0 : _a[optionName].splice(
          index - 1,
          0,
          mutableValues.value[optionName].splice(index, 1)[0]
        );
      }
      const parameterData = {
        name: getPropertyPath(optionName),
        value: mutableValues.value[optionName],
        type: "optionsOrderChanged"
      };
      emit("valueChanged", parameterData);
    };
    const optionSelected = (optionName) => {
      const option = getOptionProperties(optionName);
      if (option === void 0) {
        return;
      }
      const name = `${props.path}.${option.name}`;
      const newParameterValue = {};
      for (const optionParameter of option.values) {
        if (optionParameter.type === "fixedCollection" && optionParameter.typeOptions !== void 0 && optionParameter.typeOptions.multipleValues === true) {
          newParameterValue[optionParameter.name] = {};
        } else if (optionParameter.typeOptions !== void 0 && optionParameter.typeOptions.multipleValues === true) {
          const multiValue = get(props.nodeValues, [props.path, optionParameter.name], []);
          if (Array.isArray(optionParameter.default)) {
            multiValue.push(...deepCopy(optionParameter.default));
          } else if (optionParameter.default !== "" && typeof optionParameter.default !== "object") {
            multiValue.push(deepCopy(optionParameter.default));
          }
          newParameterValue[optionParameter.name] = multiValue;
        } else {
          newParameterValue[optionParameter.name] = deepCopy(optionParameter.default);
        }
      }
      let newValue;
      if (multipleValues.value) {
        newValue = get(props.nodeValues, name, []);
        newValue.push(newParameterValue);
      } else {
        newValue = newParameterValue;
      }
      const parameterData = {
        name,
        value: newValue
      };
      emit("valueChanged", parameterData);
      selectedOption.value = void 0;
    };
    const valueChanged = (parameterData) => {
      emit("valueChanged", parameterData);
    };
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: "fixed-collection-parameter",
        "data-test-id": `fixed-collection-${(_a = props.parameter) == null ? void 0 : _a.name}`,
        onKeydown: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["stop"]))
      }, [
        getProperties.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(unref(N8nText), { size: "small" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("fixedCollectionParameter.currentlyNoItemsExist")), 1)
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(getProperties.value, (property) => {
          return openBlock(), createElementBlock("div", {
            key: property.name,
            class: "fixed-collection-parameter-property"
          }, [
            property.displayName !== "" && _ctx.parameter.options && _ctx.parameter.options.length !== 1 ? (openBlock(), createBlock(unref(N8nInputLabel), {
              key: 0,
              label: unref(locale).nodeText().inputLabelDisplayName(property, _ctx.path),
              underline: true,
              size: "small",
              color: "text-dark"
            }, null, 8, ["label"])) : createCommentVNode("", true),
            multipleValues.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(mutableValues.value[property.name], (_, index) => {
                return openBlock(), createElementBlock("div", {
                  key: property.name + index,
                  class: "parameter-item"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(index ? "border-top-dashed parameter-item-wrapper " : "parameter-item-wrapper")
                  }, [
                    !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_4, [
                      createVNode(unref(_sfc_main$1), {
                        type: "tertiary",
                        text: "",
                        size: "mini",
                        icon: "trash",
                        "data-test-id": "fixed-collection-delete",
                        title: unref(locale).baseText("fixedCollectionParameter.deleteItem"),
                        onClick: ($event) => deleteOption(property.name, index)
                      }, null, 8, ["title", "onClick"]),
                      sortable.value && index !== 0 ? (openBlock(), createBlock(unref(_sfc_main$1), {
                        key: 0,
                        type: "tertiary",
                        text: "",
                        size: "mini",
                        icon: "angle-up",
                        title: unref(locale).baseText("fixedCollectionParameter.moveUp"),
                        onClick: ($event) => moveOptionUp(property.name, index)
                      }, null, 8, ["title", "onClick"])) : createCommentVNode("", true),
                      sortable.value && index !== mutableValues.value[property.name].length - 1 ? (openBlock(), createBlock(unref(_sfc_main$1), {
                        key: 1,
                        type: "tertiary",
                        text: "",
                        size: "mini",
                        icon: "angle-down",
                        title: unref(locale).baseText("fixedCollectionParameter.moveDown"),
                        onClick: ($event) => moveOptionDown(property.name, index)
                      }, null, 8, ["title", "onClick"])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    (openBlock(), createBlock(Suspense, null, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          parameters: property.values,
                          "node-values": _ctx.nodeValues,
                          path: getPropertyPath(property.name, index),
                          "hide-delete": true,
                          "is-read-only": _ctx.isReadOnly,
                          onValueChanged: valueChanged
                        }, null, 8, ["parameters", "node-values", "path", "is-read-only"])
                      ]),
                      _: 2
                    }, 1024))
                  ], 2)
                ]);
              }), 128))
            ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  createVNode(unref(_sfc_main$1), {
                    type: "tertiary",
                    text: "",
                    size: "mini",
                    icon: "trash",
                    "data-test-id": "fixed-collection-delete",
                    title: unref(locale).baseText("fixedCollectionParameter.deleteItem"),
                    onClick: ($event) => deleteOption(property.name)
                  }, null, 8, ["title", "onClick"])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  parameters: property.values,
                  "node-values": _ctx.nodeValues,
                  path: getPropertyPath(property.name),
                  "is-read-only": _ctx.isReadOnly,
                  class: "parameter-item",
                  "hide-delete": true,
                  onValueChanged: valueChanged
                }, null, 8, ["parameters", "node-values", "path", "is-read-only"])
              ])
            ]))
          ]);
        }), 128)),
        parameterOptions.value.length > 0 && !_ctx.isReadOnly ? (openBlock(), createElementBlock("div", _hoisted_8, [
          _ctx.parameter.options && _ctx.parameter.options.length === 1 ? (openBlock(), createBlock(unref(N8nButton), {
            key: 0,
            type: "tertiary",
            block: "",
            "data-test-id": "fixed-collection-add",
            label: getPlaceholderText.value,
            onClick: _cache[0] || (_cache[0] = ($event) => optionSelected(_ctx.parameter.options[0].name))
          }, null, 8, ["label"])) : (openBlock(), createElementBlock("div", _hoisted_9, [
            createVNode(unref(N8nSelect), {
              modelValue: selectedOption.value,
              "onUpdate:modelValue": [
                _cache[1] || (_cache[1] = ($event) => selectedOption.value = $event),
                optionSelected
              ],
              placeholder: getPlaceholderText.value,
              size: "small",
              filterable: ""
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(parameterOptions.value, (item) => {
                  return openBlock(), createBlock(unref(_sfc_main$3), {
                    key: item.name,
                    label: unref(locale).nodeText().collectionOptionDisplayName(_ctx.parameter, item, _ctx.path),
                    value: item.name
                  }, null, 8, ["label", "value"]);
                }), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ]))
        ])) : createCommentVNode("", true)
      ], 40, _hoisted_1);
    };
  }
});
const FixedCollectionParameter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb768adb"]]);
export {
  FixedCollectionParameter as default
};
