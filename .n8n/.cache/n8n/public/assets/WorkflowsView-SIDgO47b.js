import { R as ResourcesListLayout } from "./ResourcesListLayout-9Vpyt6Ec.js";
import { j9 as arrayMap, ja as getAllKeysIn, jb as baseIteratee, jc as basePickBy, d as defineComponent, a as useToast, b as useRouter, m as useSettingsStore, K as useUIStore, u as useUsersStore, T as useWorkflowsStore, a1 as useProjectsStore, p as computed, am as getResourcePermissions, j2 as dateformat, l as resolveComponent, c as openBlock, e as createBlock, w as withCtx, i as createVNode, n as normalizeClass, k as createTextVNode, t as toDisplayString, A as unref, f as createCommentVNode, j as createBaseVNode, I as withModifiers, jd as ResourceType, aw as withDirectives, iB as _sfc_main$2, ax as vShow, h as createElementBlock, g as useI18n, V as VIEWS, ab as WORKFLOW_SHARE_MODAL_KEY, aj as DUPLICATE_MODAL_KEY, ae as MODAL_CONFIRM, je as PROJECT_MOVE_RESOURCE_MODAL, al as useMessage, ak as useTelemetry, _ as _export_sfc, U as useRoute, a0 as useSourceControlStore, hj as usePostHog, aH as useTemplatesStore, D as useTagsStore, a3 as useDocumentTitle, r as ref, a8 as EnterpriseEditionFeature, iu as MORE_ONBOARDING_OPTIONS_EXPERIMENT, H as watch, o as onMounted, ek as N8nTooltip, et as N8nButton, iF as N8nHeading, ei as N8nText, jf as N8nCard, jg as N8nIcon, jh as N8nInputLabel, a7 as _sfc_main$3, ev as N8nSelect, F as Fragment, z as renderList, eu as _sfc_main$4 } from "./index-40I5DMGP.js";
import { W as WorkflowActivator } from "./WorkflowActivator-CvdQVEtW.js";
import { P as ProjectCardBadge } from "./ProjectCardBadge-DzaTsr93.js";
import { P as ProjectHeader } from "./ProjectHeader-wdvHJxbT.js";
import "./useWorkflowActivate-CKedJlgZ.js";
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}
const _hoisted_1$1 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowCard",
  props: {
    data: { default: () => ({
      id: "",
      createdAt: "",
      updatedAt: "",
      active: false,
      connections: {},
      nodes: [],
      name: "",
      sharedWithProjects: [],
      homeProject: {},
      versionId: ""
    }) },
    readOnly: { type: Boolean, default: false }
  },
  emits: ["expand:tags", "click:tag"],
  setup(__props, { emit: __emit }) {
    const WORKFLOW_LIST_ITEM_ACTIONS = {
      OPEN: "open",
      SHARE: "share",
      DUPLICATE: "duplicate",
      DELETE: "delete",
      MOVE: "move"
    };
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const message = useMessage();
    const locale = useI18n();
    const router = useRouter();
    const telemetry = useTelemetry();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const projectsStore = useProjectsStore();
    const resourceTypeLabel = computed(() => locale.baseText("generic.workflow").toLowerCase());
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const workflowPermissions = computed(() => getResourcePermissions(props.data.scopes).workflow);
    const actions = computed(() => {
      const items = [
        {
          label: locale.baseText("workflows.item.open"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.OPEN
        },
        {
          label: locale.baseText("workflows.item.share"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.SHARE
        }
      ];
      if (workflowPermissions.value.create && !props.readOnly) {
        items.push({
          label: locale.baseText("workflows.item.duplicate"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE
        });
      }
      if (workflowPermissions.value.move && projectsStore.isTeamProjectFeatureEnabled) {
        items.push({
          label: locale.baseText("workflows.item.move"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.MOVE
        });
      }
      if (workflowPermissions.value.delete && !props.readOnly) {
        items.push({
          label: locale.baseText("workflows.item.delete"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DELETE
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
    async function onClick(event) {
      if ((event == null ? void 0 : event.ctrlKey) || (event == null ? void 0 : event.metaKey)) {
        const route = router.resolve({
          name: VIEWS.WORKFLOW,
          params: { name: props.data.id }
        });
        window.open(route.href, "_blank");
        return;
      }
      await router.push({
        name: VIEWS.WORKFLOW,
        params: { name: props.data.id }
      });
    }
    function onClickTag(tagId, event) {
      event.stopPropagation();
      emit("click:tag", tagId, event);
    }
    function onExpandTags() {
      emit("expand:tags");
    }
    async function onAction(action) {
      switch (action) {
        case WORKFLOW_LIST_ITEM_ACTIONS.OPEN:
          await onClick();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE:
          uiStore.openModalWithData({
            name: DUPLICATE_MODAL_KEY,
            data: {
              id: props.data.id,
              name: props.data.name,
              tags: (props.data.tags ?? []).map(
                (tag) => typeof tag !== "string" && "id" in tag ? tag.id : tag
              )
            }
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.SHARE:
          uiStore.openModalWithData({
            name: WORKFLOW_SHARE_MODAL_KEY,
            data: { id: props.data.id }
          });
          telemetry.track("User opened sharing modal", {
            workflow_id: props.data.id,
            user_id_sharer: currentUser.value.id,
            sub_view: "Workflows listing"
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DELETE:
          await deleteWorkflow();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.MOVE:
          moveResource();
          break;
      }
    }
    async function deleteWorkflow() {
      const deleteConfirmed = await message.confirm(
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.message", {
          interpolate: { workflowName: props.data.name }
        }),
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.headline"),
        {
          type: "warning",
          confirmButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.confirmButtonText"
          ),
          cancelButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.cancelButtonText"
          )
        }
      );
      if (deleteConfirmed !== MODAL_CONFIRM) {
        return;
      }
      try {
        await workflowsStore.deleteWorkflow(props.data.id);
      } catch (error) {
        toast.showError(error, locale.baseText("generic.deleteWorkflowError"));
        return;
      }
      toast.showMessage({
        title: locale.baseText("mainSidebar.showMessage.handleSelect1.title"),
        type: "success"
      });
    }
    function moveResource() {
      uiStore.openModalWithData({
        name: PROJECT_MOVE_RESOURCE_MODAL,
        data: {
          resource: props.data,
          resourceType: ResourceType.Workflow,
          resourceTypeLabel: resourceTypeLabel.value
        }
      });
    }
    return (_ctx, _cache) => {
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_tags = resolveComponent("n8n-tags");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      return openBlock(), createBlock(_component_n8n_card, {
        class: normalizeClass(_ctx.$style.cardLink),
        onClick
      }, {
        header: withCtx(() => [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            bold: "",
            class: normalizeClass(_ctx.$style.cardHeading),
            "data-test-id": "workflow-card-name"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.data.name) + " ", 1),
              !workflowPermissions.value.update ? (openBlock(), createBlock(_component_N8nBadge, {
                key: 0,
                class: "ml-3xs",
                theme: "tertiary",
                bold: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.readonly")), 1)
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
              "resource-type": unref(ResourceType).Workflow,
              "resource-type-label": resourceTypeLabel.value,
              "personal-project": unref(projectsStore).personalProject
            }, null, 8, ["resource", "resource-type", "resource-type-label", "personal-project"]),
            createVNode(WorkflowActivator, {
              class: "mr-s",
              "workflow-active": _ctx.data.active,
              "workflow-id": _ctx.data.id,
              "workflow-permissions": workflowPermissions.value,
              "data-test-id": "workflow-card-activator"
            }, null, 8, ["workflow-active", "workflow-id", "workflow-permissions"]),
            createVNode(_component_n8n_action_toggle, {
              actions: actions.value,
              theme: "dark",
              "data-test-id": "workflow-card-actions",
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
                withDirectives(createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.updated")) + " ", 1),
                  createVNode(_sfc_main$2, {
                    date: String(_ctx.data.updatedAt)
                  }, null, 8, ["date"]),
                  _cache[1] || (_cache[1] = createTextVNode(" | "))
                ], 512), [
                  [vShow, _ctx.data]
                ]),
                withDirectives(createBaseVNode("span", { class: "mr-2xs" }, toDisplayString(unref(locale).baseText("workflows.item.created")) + " " + toDisplayString(formattedCreatedAtDate.value), 513), [
                  [vShow, _ctx.data]
                ]),
                unref(settingsStore).areTagsEnabled && _ctx.data.tags && _ctx.data.tags.length > 0 ? withDirectives((openBlock(), createElementBlock("span", _hoisted_1$1, [
                  createVNode(_component_n8n_tags, {
                    tags: _ctx.data.tags,
                    "truncate-at": 3,
                    truncate: "",
                    "data-test-id": "workflow-card-tags",
                    "onClick:tag": onClickTag,
                    onExpand: onExpandTags
                  }, null, 8, ["tags"])
                ], 512)), [
                  [vShow, _ctx.data]
                ]) : createCommentVNode("", true)
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
const cardLink = "_cardLink_1ahnz_1";
const cardHeading = "_cardHeading_1ahnz_11";
const cardDescription = "_cardDescription_1ahnz_20";
const cardActions = "_cardActions_1ahnz_27";
const style0$1 = {
  cardLink,
  cardHeading,
  cardDescription,
  cardActions
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkflowCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = {
  target: "_blank",
  href: "https://docs.n8n.io/source-control-environments/"
};
const _hoisted_2 = { class: "text-center mt-s" };
const _hoisted_3 = ["href"];
const _hoisted_4 = {
  key: 0,
  class: "mb-s"
};
const _hoisted_5 = { class: "mb-s" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowsView",
  setup(__props) {
    const i18n = useI18n();
    const route = useRoute();
    const router = useRouter();
    const sourceControlStore = useSourceControlStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const settingsStore = useSettingsStore();
    const posthogStore = usePostHog();
    const projectsStore = useProjectsStore();
    const templatesStore = useTemplatesStore();
    const telemetry = useTelemetry();
    const uiStore = useUIStore();
    const tagsStore = useTagsStore();
    const documentTitle = useDocumentTitle();
    const StatusFilter = {
      ACTIVE: true,
      DEACTIVATED: false,
      ALL: ""
    };
    const loading = ref(false);
    const filters = ref({
      search: "",
      homeProject: "",
      status: StatusFilter.ALL,
      tags: []
    });
    const readOnlyEnv = computed(() => sourceControlStore.preferences.branchReadOnly);
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const allWorkflows = computed(() => workflowsStore.allWorkflows);
    const isShareable = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Sharing]
    );
    const statusFilterOptions = computed(() => [
      {
        label: i18n.baseText("workflows.filters.status.all"),
        value: StatusFilter.ALL
      },
      {
        label: i18n.baseText("workflows.filters.status.active"),
        value: StatusFilter.ACTIVE
      },
      {
        label: i18n.baseText("workflows.filters.status.deactivated"),
        value: StatusFilter.DEACTIVATED
      }
    ]);
    const userRole = computed(() => {
      var _a, _b;
      const role = (_a = usersStore.currentUserCloudInfo) == null ? void 0 : _a.role;
      if (role) return role;
      const answers = (_b = usersStore.currentUser) == null ? void 0 : _b.personalizationAnswers;
      if (answers && "role" in answers) {
        return answers.role;
      }
      return void 0;
    });
    const isOnboardingExperimentEnabled = computed(() => {
      return posthogStore.getVariant(MORE_ONBOARDING_OPTIONS_EXPERIMENT.name) === MORE_ONBOARDING_OPTIONS_EXPERIMENT.variant;
    });
    const isSalesUser = computed(() => {
      return ["Sales", "sales-and-marketing"].includes(userRole.value || "");
    });
    const addWorkflowButtonText = computed(() => {
      return projectsStore.currentProject ? i18n.baseText("workflows.project.add") : i18n.baseText("workflows.add");
    });
    const projectPermissions = computed(() => {
      var _a, _b;
      return getResourcePermissions(
        ((_a = projectsStore.currentProject) == null ? void 0 : _a.scopes) ?? ((_b = projectsStore.personalProject) == null ? void 0 : _b.scopes)
      );
    });
    const emptyListDescription = computed(() => {
      if (readOnlyEnv.value) {
        return i18n.baseText("workflows.empty.description.readOnlyEnv");
      } else if (!projectPermissions.value.workflow.create) {
        return i18n.baseText("workflows.empty.description.noPermission");
      } else {
        return i18n.baseText("workflows.empty.description");
      }
    });
    const onFilter = (resource, newFilters, matches) => {
      const iFilters = newFilters;
      if (settingsStore.areTagsEnabled && iFilters.tags.length > 0) {
        matches = matches && iFilters.tags.every(
          (tag) => {
            var _a;
            return (_a = resource.tags) == null ? void 0 : _a.find(
              (resourceTag) => typeof resourceTag === "object" ? `${resourceTag.id}` === `${tag}` : `${resourceTag}` === `${tag}`
            );
          }
        );
      }
      if (newFilters.status !== "") {
        matches = matches && resource.active === newFilters.status;
      }
      return matches;
    };
    const onFiltersUpdated = (newFilters) => {
      Object.assign(filters.value, newFilters);
    };
    const addWorkflow = () => {
      var _a;
      uiStore.nodeViewInitialized = false;
      void router.push({
        name: VIEWS.NEW_WORKFLOW,
        query: { projectId: (_a = route.params) == null ? void 0 : _a.projectId }
      });
      telemetry.track("User clicked add workflow button", {
        source: "Workflows list"
      });
      trackEmptyCardClick("blank");
    };
    const getTemplateRepositoryURL = () => templatesStore.websiteTemplateRepositoryURL;
    const trackEmptyCardClick = (option) => {
      telemetry.track("User clicked empty page option", {
        option
      });
      if (option === "templates" && isSalesUser.value) {
        trackCategoryLinkClick("Sales");
      }
    };
    const trackCategoryLinkClick = (category) => {
      var _a;
      telemetry.track(`User clicked Browse ${category} Templates`, {
        role: (_a = usersStore.currentUserCloudInfo) == null ? void 0 : _a.role,
        active_workflow_count: workflowsStore.activeWorkflows.length
      });
    };
    const initialize = async () => {
      var _a;
      loading.value = true;
      await Promise.all([
        usersStore.fetchUsers(),
        workflowsStore.fetchAllWorkflows((_a = route.params) == null ? void 0 : _a.projectId),
        workflowsStore.fetchActiveWorkflows()
      ]);
      loading.value = false;
    };
    const onClickTag = (tagId) => {
      if (!filters.value.tags.includes(tagId)) {
        filters.value.tags.push(tagId);
      }
    };
    const saveFiltersOnQueryString = () => {
      const query = {};
      if (filters.value.search) {
        query.search = filters.value.search;
      }
      if (typeof filters.value.status !== "string") {
        query.status = filters.value.status.toString();
      }
      if (filters.value.tags.length) {
        query.tags = filters.value.tags.join(",");
      }
      if (filters.value.homeProject) {
        query.homeProject = filters.value.homeProject;
      }
      void router.replace({
        query: Object.keys(query).length ? query : void 0
      });
    };
    function isValidProjectId(projectId) {
      return projectsStore.availableProjects.some((project) => project.id === projectId);
    }
    const setFiltersFromQueryString = async () => {
      const { tags, status, search, homeProject } = route.query ?? {};
      const filtersToApply = {};
      if (homeProject && typeof homeProject === "string") {
        await projectsStore.getAvailableProjects();
        if (isValidProjectId(homeProject)) {
          filtersToApply.homeProject = homeProject;
        }
      }
      if (search && typeof search === "string") {
        filtersToApply.search = search;
      }
      if (tags && typeof tags === "string") {
        await tagsStore.fetchAll();
        const currentTags = tagsStore.allTags.map((tag) => tag.id);
        filtersToApply.tags = tags.split(",").filter((tag) => currentTags.includes(tag));
      }
      if (status && typeof status === "string" && [StatusFilter.ACTIVE.toString(), StatusFilter.DEACTIVATED.toString()].includes(status)) {
        filtersToApply.status = status === "true";
      }
      if (Object.keys(filtersToApply).length) {
        Object.assign(filters.value, filtersToApply);
      }
      void router.replace({ query: pickBy(route.query) });
    };
    sourceControlStore.$onAction(({ name, after }) => {
      if (name !== "pullWorkfolder") return;
      after(async () => await initialize());
    });
    watch(filters, () => saveFiltersOnQueryString(), { deep: true });
    watch(
      () => {
        var _a;
        return (_a = route.params) == null ? void 0 : _a.projectId;
      },
      async () => await initialize()
    );
    onMounted(async () => {
      documentTitle.set(i18n.baseText("workflows.heading"));
      await setFiltersFromQueryString();
      void usersStore.showPersonalizationSurvey();
    });
    return (_ctx, _cache) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      return openBlock(), createBlock(ResourcesListLayout, {
        "resource-key": "workflows",
        resources: allWorkflows.value,
        filters: filters.value,
        "additional-filters-handler": onFilter,
        "type-props": { itemSize: 80 },
        shareable: isShareable.value,
        initialize,
        disabled: readOnlyEnv.value || !projectPermissions.value.workflow.create,
        loading: loading.value,
        "onClick:add": addWorkflow,
        "onUpdate:filters": onFiltersUpdated
      }, {
        header: withCtx(() => [
          createVNode(ProjectHeader)
        ]),
        "add-button": withCtx(({ disabled }) => [
          createVNode(unref(N8nTooltip), {
            disabled: !readOnlyEnv.value
          }, {
            content: withCtx(() => [
              createVNode(_component_i18n_t, {
                tag: "span",
                keypath: "mainSidebar.workflows.readOnlyEnv.tooltip"
              }, {
                link: withCtx(() => [
                  createBaseVNode("a", _hoisted_1, toDisplayString(unref(i18n).baseText("mainSidebar.workflows.readOnlyEnv.tooltip.link")), 1)
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(unref(N8nButton), {
                  size: "large",
                  block: "",
                  disabled,
                  "data-test-id": "resources-list-add",
                  onClick: addWorkflow
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(addWorkflowButtonText.value), 1)
                  ]),
                  _: 2
                }, 1032, ["disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["disabled"])
        ]),
        default: withCtx(({ data, updateItemSize }) => [
          createVNode(WorkflowCard, {
            "data-test-id": "resources-list-item",
            class: "mb-2xs",
            data,
            "read-only": readOnlyEnv.value,
            "onExpand:tags": ($event) => updateItemSize(data),
            "onClick:tag": onClickTag
          }, null, 8, ["data", "read-only", "onExpand:tags"])
        ]),
        empty: withCtx(() => [
          createBaseVNode("div", _hoisted_2, [
            createVNode(unref(N8nHeading), {
              tag: "h2",
              size: "xlarge",
              class: "mb-2xs"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(currentUser.value.firstName ? unref(i18n).baseText("workflows.empty.heading", {
                  interpolate: { name: currentUser.value.firstName }
                }) : unref(i18n).baseText("workflows.empty.heading.userNotSetup")), 1)
              ]),
              _: 1
            }),
            !isOnboardingExperimentEnabled.value ? (openBlock(), createBlock(unref(N8nText), {
              key: 0,
              size: "large",
              color: "text-base"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(emptyListDescription.value), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          !readOnlyEnv.value && projectPermissions.value.workflow.create ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["text-center", "mt-2xl", _ctx.$style.actionsContainer])
          }, [
            createVNode(unref(N8nCard), {
              class: normalizeClass(_ctx.$style.emptyStateCard),
              hoverable: "",
              "data-test-id": "new-workflow-card",
              onClick: addWorkflow
            }, {
              default: withCtx(() => [
                createVNode(unref(N8nIcon), {
                  class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                  icon: "file"
                }, null, 8, ["class"]),
                createVNode(unref(N8nText), {
                  size: "large",
                  class: "mt-xs",
                  color: "text-dark"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.startFromScratch")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class"]),
            isSalesUser.value || isOnboardingExperimentEnabled.value ? (openBlock(), createElementBlock("a", {
              key: 0,
              href: "https://docs.n8n.io/courses/#available-courses",
              class: normalizeClass(_ctx.$style.emptyStateCard),
              target: "_blank"
            }, [
              createVNode(unref(N8nCard), {
                hoverable: "",
                "data-test-id": "browse-sales-templates-card",
                onClick: _cache[0] || (_cache[0] = ($event) => trackEmptyCardClick("courses"))
              }, {
                default: withCtx(() => [
                  createVNode(unref(N8nIcon), {
                    class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                    icon: "graduation-cap"
                  }, null, 8, ["class"]),
                  createVNode(unref(N8nText), {
                    size: "large",
                    class: "mt-xs",
                    color: "text-dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.learnN8n")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ], 2)) : createCommentVNode("", true),
            isSalesUser.value || isOnboardingExperimentEnabled.value ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: getTemplateRepositoryURL(),
              class: normalizeClass(_ctx.$style.emptyStateCard),
              target: "_blank"
            }, [
              createVNode(unref(N8nCard), {
                hoverable: "",
                "data-test-id": "browse-sales-templates-card",
                onClick: _cache[1] || (_cache[1] = ($event) => trackEmptyCardClick("templates"))
              }, {
                default: withCtx(() => [
                  createVNode(unref(N8nIcon), {
                    class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                    icon: "box-open"
                  }, null, 8, ["class"]),
                  createVNode(unref(N8nText), {
                    size: "large",
                    class: "mt-xs",
                    color: "text-dark"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.browseTemplates")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ], 10, _hoisted_3)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ]),
        filters: withCtx(({ setKeyValue }) => [
          unref(settingsStore).areTagsEnabled ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.tags"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(_sfc_main$3, {
              placeholder: unref(i18n).baseText("workflowOpen.filterWorkflows"),
              "model-value": filters.value.tags,
              "create-enabled": false,
              "onUpdate:modelValue": ($event) => setKeyValue("tags", $event)
            }, null, 8, ["placeholder", "model-value", "onUpdate:modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_5, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.status"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(unref(N8nSelect), {
              "data-test-id": "status-dropdown",
              "model-value": filters.value.status,
              "onUpdate:modelValue": ($event) => setKeyValue("status", $event)
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(statusFilterOptions.value, (option) => {
                  return openBlock(), createBlock(unref(_sfc_main$4), {
                    key: option.label,
                    label: option.label,
                    value: option.value,
                    "data-test-id": "status"
                  }, null, 8, ["label", "value"]);
                }), 128))
              ]),
              _: 2
            }, 1032, ["model-value", "onUpdate:modelValue"])
          ])
        ]),
        _: 1
      }, 8, ["resources", "filters", "shareable", "disabled", "loading"]);
    };
  }
});
const actionsContainer = "_actionsContainer_1gv00_1";
const emptyStateCard = "_emptyStateCard_1gv00_6";
const emptyStateCardIcon = "_emptyStateCardIcon_1gv00_19";
const style0 = {
  actionsContainer,
  emptyStateCard,
  emptyStateCardIcon
};
const cssModules = {
  "$style": style0
};
const WorkflowsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowsView as default
};
