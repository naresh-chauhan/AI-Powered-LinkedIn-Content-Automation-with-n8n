import { d as defineComponent, aZ as useClipboard, a as useToast, m as useSettingsStore, u as useUsersStore, p as computed, r as ref, o as onMounted, H as watch, c as openBlock, h as createElementBlock, j as createBaseVNode, t as toDisplayString, e as createBlock, A as unref, i as createVNode, w as withCtx, k as createTextVNode, n as normalizeClass, f as createCommentVNode, g as useI18n, x as nextTick, l as resolveComponent, am as getResourcePermissions, a8 as EnterpriseEditionFeature, _ as _export_sfc, gr as useEnvironmentsStore, K as useUIStore, a0 as useSourceControlStore, a3 as useDocumentTitle, a5 as usePageRedirectionHelper, av as onBeforeMount, v as onBeforeUnmount, aJ as createSlots, iP as uid, ae as MODAL_CONFIRM, ak as useTelemetry, al as useMessage } from "./index-40I5DMGP.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-9Vpyt6Ec.js";
const _hoisted_1$1 = { class: "variables-key-column" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3 = { class: "variables-value-column" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { class: "variables-usage-column" };
const _hoisted_6 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VariablesRow",
  props: {
    data: {},
    editing: { type: Boolean, default: false }
  },
  emits: ["save", "cancel", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const i18n = useI18n();
    const clipboard = useClipboard();
    const { showMessage } = useToast();
    const settingsStore = useSettingsStore();
    const usersStore = useUsersStore();
    const emit = __emit;
    const props = __props;
    const permissions = computed(
      () => {
        var _a;
        return getResourcePermissions((_a = usersStore.currentUser) == null ? void 0 : _a.globalScopes).variable;
      }
    );
    const modelValue = ref({ ...props.data });
    const formValidationStatus = ref({
      key: false,
      value: false
    });
    const formValid = computed(() => {
      return formValidationStatus.value.name && formValidationStatus.value.value;
    });
    const keyInputRef = ref();
    const valueInputRef = ref();
    const usage = ref(`$vars.${props.data.name}`);
    const isFeatureEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Variables]
    );
    onMounted(() => {
      focusFirstInput();
    });
    const keyValidationRules = [
      { name: "REQUIRED" },
      { name: "MAX_LENGTH", config: { maximum: 50 } },
      {
        name: "MATCH_REGEX",
        config: {
          regex: /^[a-zA-Z]/,
          message: i18n.baseText("variables.editing.key.error.startsWithLetter")
        }
      },
      {
        name: "MATCH_REGEX",
        config: {
          regex: /^[a-zA-Z][a-zA-Z0-9_]*$/,
          message: i18n.baseText("variables.editing.key.error.jsonKey")
        }
      }
    ];
    const valueValidationRules = [
      { name: "MAX_LENGTH", config: { maximum: 220 } }
    ];
    watch(
      () => modelValue.value.name,
      async () => {
        await nextTick();
        if (formValidationStatus.value.name) {
          updateUsageSyntax();
        }
      }
    );
    function updateUsageSyntax() {
      usage.value = `$vars.${modelValue.value.name || props.data.name}`;
    }
    async function onCancel() {
      modelValue.value = { ...props.data };
      emit("cancel", modelValue.value);
    }
    async function onSave() {
      emit("save", modelValue.value);
    }
    async function onEdit() {
      emit("edit", modelValue.value);
      await nextTick();
      focusFirstInput();
    }
    async function onDelete() {
      emit("delete", modelValue.value);
    }
    function onValidate(name, value) {
      formValidationStatus.value[name] = value;
    }
    function onUsageClick() {
      void clipboard.copy(usage.value);
      showMessage({
        title: i18n.baseText("variables.row.usage.copiedToClipboard"),
        type: "success"
      });
    }
    function focusFirstInput() {
      var _a, _b, _c;
      (_c = (_b = (_a = keyInputRef.value) == null ? void 0 : _a.inputRef) == null ? void 0 : _b.focus) == null ? void 0 : _c.call(_b);
    }
    return (_ctx, _cache) => {
      const _component_n8n_form_input = resolveComponent("n8n-form-input");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("tr", {
        class: normalizeClass(_ctx.$style.variablesRow),
        "data-test-id": "variables-row"
      }, [
        createBaseVNode("td", _hoisted_1$1, [
          createBaseVNode("div", null, [
            !_ctx.editing ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(_ctx.data.name), 1)) : (openBlock(), createBlock(_component_n8n_form_input, {
              key: 1,
              ref_key: "keyInputRef",
              ref: keyInputRef,
              modelValue: modelValue.value.name,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value.name = $event),
              label: "",
              name: "name",
              "data-test-id": "variable-row-key-input",
              placeholder: unref(i18n).baseText("variables.editing.key.placeholder"),
              required: "",
              "validate-on-blur": "",
              "validation-rules": keyValidationRules,
              onValidate: _cache[1] || (_cache[1] = (value) => onValidate("name", value))
            }, null, 8, ["modelValue", "placeholder"]))
          ])
        ]),
        createBaseVNode("td", _hoisted_3, [
          createBaseVNode("div", null, [
            !_ctx.editing ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.data.value), 1)) : (openBlock(), createBlock(_component_n8n_form_input, {
              key: 1,
              ref_key: "valueInputRef",
              ref: valueInputRef,
              modelValue: modelValue.value.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => modelValue.value.value = $event),
              label: "",
              name: "value",
              "data-test-id": "variable-row-value-input",
              placeholder: unref(i18n).baseText("variables.editing.value.placeholder"),
              "validate-on-blur": "",
              "validation-rules": valueValidationRules,
              onValidate: _cache[3] || (_cache[3] = (value) => onValidate("value", value))
            }, null, 8, ["modelValue", "placeholder"]))
          ])
        ]),
        createBaseVNode("td", _hoisted_5, [
          createBaseVNode("div", null, [
            createVNode(_component_n8n_tooltip, { placement: "top" }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.usage.copyToClipboard")), 1)
              ]),
              default: withCtx(() => [
                modelValue.value.name && usage.value ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(_ctx.$style.usageSyntax),
                  onClick: onUsageClick
                }, toDisplayString(usage.value), 3)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ])
        ]),
        isFeatureEnabled.value ? (openBlock(), createElementBlock("td", _hoisted_6, [
          _ctx.editing ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.buttons)
          }, [
            createVNode(_component_n8n_button, {
              "data-test-id": "variable-row-cancel-button",
              type: "tertiary",
              class: "mr-xs",
              onClick: onCancel
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.cancel")), 1)
              ]),
              _: 1
            }),
            createVNode(_component_n8n_button, {
              "data-test-id": "variable-row-save-button",
              disabled: !formValid.value,
              type: "primary",
              onClick: onSave
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.save")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([_ctx.$style.buttons, _ctx.$style.hoverButtons])
          }, [
            createVNode(_component_n8n_tooltip, {
              disabled: permissions.value.update,
              placement: "top"
            }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.edit.onlyRoleCanEdit")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_n8n_button, {
                    "data-test-id": "variable-row-edit-button",
                    type: "tertiary",
                    class: "mr-xs",
                    disabled: !permissions.value.update,
                    onClick: onEdit
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.edit")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              _: 1
            }, 8, ["disabled"]),
            createVNode(_component_n8n_tooltip, {
              disabled: permissions.value.delete,
              placement: "top"
            }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.delete.onlyRoleCanDelete")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_n8n_button, {
                    "data-test-id": "variable-row-delete-button",
                    type: "tertiary",
                    disabled: !permissions.value.delete,
                    onClick: onDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("variables.row.button.delete")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2))
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const variablesRow = "_variablesRow_14ir1_1";
const hoverButtons = "_hoverButtons_14ir1_1";
const buttons = "_buttons_14ir1_10";
const usageSyntax = "_usageSyntax_14ir1_21";
const style0$1 = {
  variablesRow,
  hoverButtons,
  buttons,
  usageSyntax
};
const cssModules$1 = {
  "$style": style0$1
};
const VariablesRow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const TEMPORARY_VARIABLE_UID_BASE = "@tmpvar";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VariablesView",
  setup(__props) {
    const settingsStore = useSettingsStore();
    const environmentsStore = useEnvironmentsStore();
    const usersStore = useUsersStore();
    const uiStore = useUIStore();
    const telemetry = useTelemetry();
    const i18n = useI18n();
    const message = useMessage();
    const sourceControlStore = useSourceControlStore();
    const documentTitle = useDocumentTitle();
    const pageRedirectionHelper = usePageRedirectionHelper();
    let sourceControlStoreUnsubscribe = () => {
    };
    const layoutRef = ref(null);
    const { showError } = useToast();
    const allVariables = ref([]);
    const editMode = ref({});
    const loading = ref(false);
    const permissions = computed(
      () => {
        var _a;
        return getResourcePermissions((_a = usersStore.currentUser) == null ? void 0 : _a.globalScopes).variable;
      }
    );
    const isFeatureEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Variables]
    );
    const variablesToResources = computed(
      () => allVariables.value.map((v) => ({ id: v.id, name: v.key, value: v.value }))
    );
    const canCreateVariables = computed(() => isFeatureEnabled.value && permissions.value.create);
    const datatableColumns = computed(() => [
      {
        id: 0,
        path: "name",
        label: i18n.baseText("variables.table.key"),
        classes: ["variables-key-column"]
      },
      {
        id: 1,
        path: "value",
        label: i18n.baseText("variables.table.value"),
        classes: ["variables-value-column"]
      },
      {
        id: 2,
        path: "usage",
        label: i18n.baseText("variables.table.usage"),
        classes: ["variables-usage-column"]
      },
      ...isFeatureEnabled.value ? [
        {
          id: 3,
          path: "actions",
          label: ""
        }
      ] : []
    ]);
    const contextBasedTranslationKeys = computed(() => uiStore.contextBasedTranslationKeys);
    const newlyAddedVariableIds = ref([]);
    const nameSortFn = (a, b, direction) => {
      if (`${a.id}`.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        return -1;
      } else if (`${b.id}`.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        return 1;
      } else if (newlyAddedVariableIds.value.includes(a.id) && newlyAddedVariableIds.value.includes(b.id)) {
        return newlyAddedVariableIds.value.indexOf(a.id) - newlyAddedVariableIds.value.indexOf(b.id);
      } else if (newlyAddedVariableIds.value.includes(a.id)) {
        return -1;
      } else if (newlyAddedVariableIds.value.includes(b.id)) {
        return 1;
      }
      return direction === "asc" ? displayName(a).trim().localeCompare(displayName(b).trim()) : displayName(b).trim().localeCompare(displayName(a).trim());
    };
    const sortFns = {
      nameAsc: (a, b) => {
        return nameSortFn(a, b, "asc");
      },
      nameDesc: (a, b) => {
        return nameSortFn(a, b, "desc");
      }
    };
    function resetNewVariablesList() {
      newlyAddedVariableIds.value = [];
    }
    const resourceToEnvironmentVariable = (data) => ({
      id: data.id,
      key: data.name,
      value: "value" in data ? data.value ?? "" : ""
    });
    const environmentVariableToResource = (data) => ({
      id: data.id,
      name: data.key,
      value: "value" in data ? data.value : ""
    });
    async function initialize() {
      if (!isFeatureEnabled.value) return;
      loading.value = true;
      await environmentsStore.fetchAllVariables();
      allVariables.value = [...environmentsStore.variables];
      loading.value = false;
    }
    function addTemporaryVariable() {
      const temporaryVariable = {
        id: uid(TEMPORARY_VARIABLE_UID_BASE),
        key: "",
        value: ""
      };
      if (layoutRef.value) {
        if (layoutRef.value.$refs.listWrapperRef) {
          layoutRef.value.$refs.listWrapperRef.scrollTop = 0;
        }
        if (layoutRef.value.currentPage !== 1) {
          layoutRef.value.setCurrentPage(1);
        }
      }
      allVariables.value.unshift(temporaryVariable);
      editMode.value[temporaryVariable.id] = true;
      telemetry.track("User clicked add variable button");
    }
    async function saveVariable(data) {
      const variable = resourceToEnvironmentVariable(data);
      try {
        if (typeof variable.id === "string" && variable.id.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
          const { id, ...rest } = variable;
          const updatedVariable = await environmentsStore.createVariable(rest);
          allVariables.value.unshift(updatedVariable);
          allVariables.value = allVariables.value.filter((variable2) => variable2.id !== data.id);
          newlyAddedVariableIds.value.unshift(updatedVariable.id);
        } else {
          const updatedVariable = await environmentsStore.updateVariable(variable);
          allVariables.value = allVariables.value.filter((variable2) => variable2.id !== data.id);
          allVariables.value.push(updatedVariable);
          toggleEditing(environmentVariableToResource(updatedVariable));
        }
      } catch (error) {
        showError(error, i18n.baseText("variables.errors.save"));
      }
    }
    function toggleEditing(data) {
      editMode.value = {
        ...editMode.value,
        [data.id]: !editMode.value[data.id]
      };
    }
    function cancelEditing(data) {
      if (typeof data.id === "string" && data.id.startsWith(TEMPORARY_VARIABLE_UID_BASE)) {
        allVariables.value = allVariables.value.filter((variable) => variable.id !== data.id);
      } else {
        toggleEditing(data);
      }
    }
    async function deleteVariable(data) {
      const variable = resourceToEnvironmentVariable(data);
      try {
        const confirmed = await message.confirm(
          i18n.baseText("variables.modals.deleteConfirm.message", {
            interpolate: { name: variable.key }
          }),
          i18n.baseText("variables.modals.deleteConfirm.title"),
          {
            confirmButtonText: i18n.baseText("variables.modals.deleteConfirm.confirmButton"),
            cancelButtonText: i18n.baseText("variables.modals.deleteConfirm.cancelButton")
          }
        );
        if (confirmed !== MODAL_CONFIRM) {
          return;
        }
        await environmentsStore.deleteVariable(variable);
        allVariables.value = allVariables.value.filter((variable2) => variable2.id !== data.id);
      } catch (error) {
        showError(error, i18n.baseText("variables.errors.delete"));
      }
    }
    function goToUpgrade() {
      void pageRedirectionHelper.goToUpgrade("variables", "upgrade-variables");
    }
    function displayName(resource) {
      return resource.name;
    }
    onBeforeMount(() => {
      sourceControlStoreUnsubscribe = sourceControlStore.$onAction(({ name, after }) => {
        if (name === "pullWorkfolder" && after) {
          after(() => {
            void initialize();
          });
        }
      });
    });
    onBeforeUnmount(() => {
      sourceControlStoreUnsubscribe();
    });
    onMounted(() => {
      documentTitle.set(i18n.baseText("variables.heading"));
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      return openBlock(), createBlock(ResourcesListLayout, {
        ref_key: "layoutRef",
        ref: layoutRef,
        class: "variables-view",
        "resource-key": "variables",
        disabled: !isFeatureEnabled.value,
        resources: variablesToResources.value,
        initialize,
        shareable: false,
        "display-name": displayName,
        "sort-fns": sortFns,
        "sort-options": ["nameAsc", "nameDesc"],
        "show-filters-dropdown": false,
        type: "datatable",
        "type-props": { columns: datatableColumns.value },
        loading: loading.value,
        onSort: resetNewVariablesList,
        "onClick:add": addTemporaryVariable
      }, createSlots({
        header: withCtx(() => [
          createVNode(_component_n8n_heading, {
            size: "2xlarge",
            class: "mb-m"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("variables.heading")), 1)
            ]),
            _: 1
          })
        ]),
        "add-button": withCtx(() => [
          createVNode(_component_n8n_tooltip, {
            placement: "top",
            disabled: canCreateVariables.value
          }, {
            content: withCtx(() => [
              !isFeatureEnabled.value ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(unref(i18n).baseText(`variables.add.unavailable${allVariables.value.length === 0 ? ".empty" : ""}`)), 1)) : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(i18n).baseText("variables.add.onlyOwnerCanCreate")), 1))
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(_component_n8n_button, {
                  size: "large",
                  block: "",
                  disabled: !canCreateVariables.value,
                  "data-test-id": "resources-list-add",
                  onClick: addTemporaryVariable
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$locale.baseText(`variables.add`)), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        default: withCtx(({ data }) => [
          (openBlock(), createBlock(VariablesRow, {
            key: data.id,
            editing: editMode.value[data.id],
            data,
            onSave: saveVariable,
            onEdit: toggleEditing,
            onCancel: cancelEditing,
            onDelete: deleteVariable
          }, null, 8, ["editing", "data"]))
        ]),
        _: 2
      }, [
        !isFeatureEnabled.value ? {
          name: "preamble",
          fn: withCtx(() => [
            createVNode(_component_n8n_action_box, {
              class: "mb-m",
              "data-test-id": "unavailable-resources-list",
              emoji: "👋",
              heading: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.title),
              description: _ctx.$locale.baseText(
                contextBasedTranslationKeys.value.variables.unavailable.description
              ),
              "button-text": _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.button),
              "button-type": "secondary",
              "onClick:button": goToUpgrade
            }, null, 8, ["heading", "description", "button-text"])
          ]),
          key: "0"
        } : void 0,
        !isFeatureEnabled.value || isFeatureEnabled.value && !canCreateVariables.value ? {
          name: "empty",
          fn: withCtx(() => {
            var _a;
            return [
              !isFeatureEnabled.value ? (openBlock(), createBlock(_component_n8n_action_box, {
                key: 0,
                "data-test-id": "unavailable-resources-list",
                emoji: "👋",
                heading: _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.title),
                description: _ctx.$locale.baseText(
                  contextBasedTranslationKeys.value.variables.unavailable.description
                ),
                "button-text": _ctx.$locale.baseText(contextBasedTranslationKeys.value.variables.unavailable.button),
                "button-type": "secondary",
                "onClick:button": goToUpgrade
              }, null, 8, ["heading", "description", "button-text"])) : !canCreateVariables.value ? (openBlock(), createBlock(_component_n8n_action_box, {
                key: 1,
                "data-test-id": "cannot-create-variables",
                emoji: "👋",
                heading: _ctx.$locale.baseText("variables.empty.notAllowedToCreate.heading", {
                  interpolate: { name: ((_a = unref(usersStore).currentUser) == null ? void 0 : _a.firstName) ?? "" }
                }),
                description: _ctx.$locale.baseText("variables.empty.notAllowedToCreate.description"),
                onClick: goToUpgrade
              }, null, 8, ["heading", "description"])) : createCommentVNode("", true)
            ];
          }),
          key: "1"
        } : void 0
      ]), 1032, ["disabled", "resources", "type-props", "loading"]);
    };
  }
});
const sidebarContainer = "_sidebarContainer_pm4w0_5";
const style0 = {
  "type-input": "_type-input_pm4w0_1",
  sidebarContainer
};
const cssModules = {
  "$style": style0
};
const VariablesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__scopeId", "data-v-3d6dcffa"]]);
export {
  VariablesView as default
};
