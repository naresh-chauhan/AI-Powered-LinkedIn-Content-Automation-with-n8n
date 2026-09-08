import { d as defineComponent, K as useUIStore, dS as useCredentialsStore, a1 as useProjectsStore, p as computed, am as getResourcePermissions, j2 as dateformat, l as resolveComponent, c as openBlock, e as createBlock, w as withCtx, i as createVNode, jj as CredentialIcon, n as normalizeClass, k as createTextVNode, t as toDisplayString, A as unref, f as createCommentVNode, j as createBaseVNode, I as withModifiers, jd as ResourceType, h as createElementBlock, aw as withDirectives, iB as _sfc_main$2, ax as vShow, g as useI18n, ae as MODAL_CONFIRM, je as PROJECT_MOVE_RESOURCE_MODAL, al as useMessage, _ as _export_sfc, bf as useNodeTypesStore, a0 as useSourceControlStore, gp as useExternalSecretsStore, a3 as useDocumentTitle, U as useRoute, b as useRouter, r as ref, jk as listenForModalChanges, H as watch, jl as CREDENTIAL_SELECT_MODAL_KEY, o as onMounted, et as N8nButton, jh as N8nInputLabel, ev as N8nSelect, F as Fragment, z as renderList, eu as _sfc_main$3, m as useSettingsStore, a8 as EnterpriseEditionFeature, gr as useEnvironmentsStore, ak as useTelemetry, jm as CREDENTIAL_EDIT_MODAL_KEY } from "./index-40I5DMGP.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout-9Vpyt6Ec.js";
import { P as ProjectCardBadge } from "./ProjectCardBadge-DzaTsr93.js";
import { P as ProjectHeader } from "./ProjectHeader-wdvHJxbT.js";
const _hoisted_1$1 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CredentialCard",
  props: {
    data: { default: () => ({
      id: "",
      createdAt: "",
      updatedAt: "",
      type: "",
      name: "",
      sharedWithProjects: [],
      homeProject: {}
    }) },
    readOnly: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const CREDENTIAL_LIST_ITEM_ACTIONS = {
      OPEN: "open",
      DELETE: "delete",
      MOVE: "move"
    };
    const emit = __emit;
    const props = __props;
    const locale = useI18n();
    const message = useMessage();
    const uiStore = useUIStore();
    const credentialsStore = useCredentialsStore();
    const projectsStore = useProjectsStore();
    const resourceTypeLabel = computed(() => locale.baseText("generic.credential").toLowerCase());
    const credentialType = computed(() => credentialsStore.getCredentialTypeByName(props.data.type));
    const credentialPermissions = computed(() => getResourcePermissions(props.data.scopes).credential);
    const actions = computed(() => {
      const items = [
        {
          label: locale.baseText("credentials.item.open"),
          value: CREDENTIAL_LIST_ITEM_ACTIONS.OPEN
        }
      ];
      if (credentialPermissions.value.delete) {
        items.push({
          label: locale.baseText("credentials.item.delete"),
          value: CREDENTIAL_LIST_ITEM_ACTIONS.DELETE
        });
      }
      if (credentialPermissions.value.move && projectsStore.isTeamProjectFeatureEnabled) {
        items.push({
          label: locale.baseText("credentials.item.move"),
          value: CREDENTIAL_LIST_ITEM_ACTIONS.MOVE
        });
      }
      return items;
    });
    const formattedCreatedAtDate = computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
      return dateformat(
        props.data.createdAt,
        `d mmmm${String(props.data.createdAt).startsWith(currentYear) ? "" : ", yyyy"}`
      );
    });
    function onClick() {
      emit("click", props.data.id);
    }
    async function onAction(action) {
      switch (action) {
        case CREDENTIAL_LIST_ITEM_ACTIONS.OPEN:
          onClick();
          break;
        case CREDENTIAL_LIST_ITEM_ACTIONS.DELETE:
          await deleteResource();
          break;
        case CREDENTIAL_LIST_ITEM_ACTIONS.MOVE:
          moveResource();
          break;
      }
    }
    async function deleteResource() {
      const deleteConfirmed = await message.confirm(
        locale.baseText("credentialEdit.credentialEdit.confirmMessage.deleteCredential.message", {
          interpolate: { savedCredentialName: props.data.name }
        }),
        locale.baseText("credentialEdit.credentialEdit.confirmMessage.deleteCredential.headline"),
        {
          confirmButtonText: locale.baseText(
            "credentialEdit.credentialEdit.confirmMessage.deleteCredential.confirmButtonText"
          )
        }
      );
      if (deleteConfirmed === MODAL_CONFIRM) {
        await credentialsStore.deleteCredential({ id: props.data.id });
      }
    }
    function moveResource() {
      uiStore.openModalWithData({
        name: PROJECT_MOVE_RESOURCE_MODAL,
        data: {
          resource: props.data,
          resourceType: ResourceType.Credential,
          resourceTypeLabel: resourceTypeLabel.value
        }
      });
    }
    return (_ctx, _cache) => {
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      return openBlock(), createBlock(_component_n8n_card, {
        class: normalizeClass(_ctx.$style.cardLink),
        onClick: withModifiers(onClick, ["stop"])
      }, {
        prepend: withCtx(() => {
          var _a;
          return [
            createVNode(CredentialIcon, {
              "credential-type-name": ((_a = credentialType.value) == null ? void 0 : _a.name) ?? ""
            }, null, 8, ["credential-type-name"])
          ];
        }),
        header: withCtx(() => [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            bold: "",
            class: normalizeClass(_ctx.$style.cardHeading)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.data.name) + " ", 1),
              _ctx.readOnly ? (openBlock(), createBlock(_component_N8nBadge, {
                key: 0,
                class: "ml-3xs",
                theme: "tertiary",
                bold: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("credentials.item.readonly")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        append: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardActions),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createVNode(ProjectCardBadge, {
              resource: _ctx.data,
              "resource-type": unref(ResourceType).Credential,
              "resource-type-label": resourceTypeLabel.value,
              "personal-project": unref(projectsStore).personalProject
            }, null, 8, ["resource", "resource-type", "resource-type-label", "personal-project"]),
            createVNode(_component_n8n_action_toggle, {
              "data-test-id": "credential-card-actions",
              actions: actions.value,
              theme: "dark",
              onAction
            }, null, 8, ["actions"])
          ], 2)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardDescription)
          }, [
            createVNode(_component_n8n_text, {
              color: "text-light",
              size: "small"
            }, {
              default: withCtx(() => [
                credentialType.value ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(credentialType.value.displayName) + " | ", 1)) : createCommentVNode("", true),
                withDirectives(createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(unref(locale).baseText("credentials.item.updated")) + " ", 1),
                  createVNode(_sfc_main$2, {
                    date: _ctx.data.updatedAt
                  }, null, 8, ["date"]),
                  _cache[1] || (_cache[1] = createTextVNode(" | "))
                ], 512), [
                  [vShow, _ctx.data]
                ]),
                withDirectives(createBaseVNode("span", null, toDisplayString(unref(locale).baseText("credentials.item.created")) + " " + toDisplayString(formattedCreatedAtDate.value), 513), [
                  [vShow, _ctx.data]
                ])
              ]),
              _: 1
            })
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const cardLink = "_cardLink_1no2l_1";
const cardHeading = "_cardHeading_1no2l_11";
const cardDescription = "_cardDescription_1no2l_19";
const cardActions = "_cardActions_1no2l_26";
const style0$1 = {
  cardLink,
  cardHeading,
  cardDescription,
  cardActions
};
const cssModules$1 = {
  "$style": style0$1
};
const CredentialCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = { class: "mb-s" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CredentialsView",
  props: {
    credentialId: {}
  },
  setup(__props) {
    const props = __props;
    const credentialsStore = useCredentialsStore();
    const nodeTypesStore = useNodeTypesStore();
    const uiStore = useUIStore();
    const sourceControlStore = useSourceControlStore();
    const externalSecretsStore = useExternalSecretsStore();
    const projectsStore = useProjectsStore();
    const documentTitle = useDocumentTitle();
    const route = useRoute();
    const router = useRouter();
    const telemetry = useTelemetry();
    const i18n = useI18n();
    const filters = ref({
      search: "",
      homeProject: "",
      type: []
    });
    const loading = ref(false);
    const allCredentials = computed(
      () => credentialsStore.allCredentials.map((credential) => ({
        id: credential.id,
        name: credential.name,
        value: "",
        updatedAt: credential.updatedAt,
        createdAt: credential.createdAt,
        homeProject: credential.homeProject,
        scopes: credential.scopes,
        type: credential.type,
        sharedWithProjects: credential.sharedWithProjects,
        readOnly: !getResourcePermissions(credential.scopes).credential.update
      }))
    );
    const allCredentialTypes = computed(() => credentialsStore.allCredentialTypes);
    const credentialTypesById = computed(
      () => credentialsStore.credentialTypesById
    );
    const addCredentialButtonText = computed(
      () => projectsStore.currentProject ? i18n.baseText("credentials.project.add") : i18n.baseText("credentials.add")
    );
    const readOnlyEnv = computed(() => sourceControlStore.preferences.branchReadOnly);
    const projectPermissions = computed(
      () => {
        var _a, _b;
        return getResourcePermissions(
          ((_a = projectsStore.currentProject) == null ? void 0 : _a.scopes) ?? ((_b = projectsStore.personalProject) == null ? void 0 : _b.scopes)
        );
      }
    );
    const setRouteCredentialId = (credentialId) => {
      void router.replace({ params: { credentialId } });
    };
    const addCredential = () => {
      setRouteCredentialId("create");
      telemetry.track("User clicked add cred button", {
        source: "Creds list"
      });
    };
    listenForModalChanges({
      store: uiStore,
      onModalClosed(modalName) {
        if ([CREDENTIAL_SELECT_MODAL_KEY, CREDENTIAL_EDIT_MODAL_KEY].includes(modalName)) {
          void router.replace({ params: { credentialId: "" } });
        }
      }
    });
    watch(
      () => props.credentialId,
      (id) => {
        if (!id) return;
        if (id === "create") {
          uiStore.openModal(CREDENTIAL_SELECT_MODAL_KEY);
          return;
        }
        uiStore.openExistingCredential(id);
      },
      {
        immediate: true
      }
    );
    const onFilter = (resource, newFilters, matches) => {
      const iResource = resource;
      const filtersToApply = newFilters;
      if (filtersToApply.type.length > 0) {
        matches = matches && filtersToApply.type.includes(iResource.type);
      }
      if (filtersToApply.search) {
        const searchString = filtersToApply.search.toLowerCase();
        matches = matches || credentialTypesById.value[iResource.type] && credentialTypesById.value[iResource.type].displayName.toLowerCase().includes(searchString);
      }
      return matches;
    };
    const initialize = async () => {
      var _a;
      loading.value = true;
      const isVarsEnabled = useSettingsStore().isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Variables];
      const loadPromises = [
        credentialsStore.fetchAllCredentials((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.projectId),
        credentialsStore.fetchCredentialTypes(false),
        externalSecretsStore.fetchAllSecrets(),
        nodeTypesStore.loadNodeTypesIfNotLoaded(),
        isVarsEnabled ? useEnvironmentsStore().fetchAllVariables() : Promise.resolve()
        // for expression resolution
      ];
      await Promise.all(loadPromises);
      loading.value = false;
    };
    sourceControlStore.$onAction(({ name, after }) => {
      if (name !== "pullWorkfolder") return;
      after(() => {
        void initialize();
      });
    });
    watch(() => {
      var _a;
      return (_a = route == null ? void 0 : route.params) == null ? void 0 : _a.projectId;
    }, initialize);
    onMounted(() => {
      documentTitle.set(i18n.baseText("credentials.heading"));
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ResourcesListLayout, {
        ref: "layout",
        "resource-key": "credentials",
        resources: allCredentials.value,
        initialize,
        filters: filters.value,
        "additional-filters-handler": onFilter,
        "type-props": { itemSize: 77 },
        loading: loading.value,
        disabled: readOnlyEnv.value || !projectPermissions.value.credential.create,
        "onClick:add": addCredential,
        "onUpdate:filters": _cache[0] || (_cache[0] = ($event) => filters.value = $event)
      }, {
        header: withCtx(() => [
          createVNode(ProjectHeader)
        ]),
        "add-button": withCtx(({ disabled }) => [
          createBaseVNode("div", null, [
            createVNode(unref(N8nButton), {
              size: "large",
              block: "",
              disabled,
              "data-test-id": "resources-list-add",
              onClick: addCredential
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(addCredentialButtonText.value), 1)
              ]),
              _: 2
            }, 1032, ["disabled"])
          ])
        ]),
        default: withCtx(({ data }) => [
          createVNode(CredentialCard, {
            "data-test-id": "resources-list-item",
            class: "mb-2xs",
            data,
            "read-only": data.readOnly,
            onClick: setRouteCredentialId
          }, null, 8, ["data", "read-only"])
        ]),
        filters: withCtx(({ setKeyValue }) => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("credentials.filters.type"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(unref(N8nSelect), {
              ref: "typeInput",
              "model-value": filters.value.type,
              size: "medium",
              multiple: "",
              filterable: "",
              class: normalizeClass(_ctx.$style["type-input"]),
              "onUpdate:modelValue": ($event) => setKeyValue("type", $event)
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(allCredentialTypes.value, (credentialType) => {
                  return openBlock(), createBlock(unref(_sfc_main$3), {
                    key: credentialType.name,
                    value: credentialType.name,
                    label: credentialType.displayName
                  }, null, 8, ["value", "label"]);
                }), 128))
              ]),
              _: 2
            }, 1032, ["model-value", "class", "onUpdate:modelValue"])
          ])
        ]),
        _: 1
      }, 8, ["resources", "filters", "loading", "disabled"]);
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
const CredentialsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  CredentialsView as default
};
