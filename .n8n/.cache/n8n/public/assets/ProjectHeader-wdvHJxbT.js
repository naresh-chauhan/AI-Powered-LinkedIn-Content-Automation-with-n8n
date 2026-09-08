import { d as defineComponent, U as useRoute, r as ref, p as computed, H as watch, c as openBlock, h as createElementBlock, i as createVNode, n as normalizeClass, l as resolveComponent, V as VIEWS, g as useI18n, _ as _export_sfc, a1 as useProjectsStore, j as createBaseVNode, w as withCtx, k as createTextVNode, t as toDisplayString, e as createBlock, q as renderSlot, f as createCommentVNode, dZ as ProjectTypes, am as getResourcePermissions } from "./index-40I5DMGP.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectTabs",
  props: {
    showSettings: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const locale = useI18n();
    const route = useRoute();
    const selectedTab = ref("");
    const options = computed(() => {
      var _a;
      const projectId = (_a = route == null ? void 0 : route.params) == null ? void 0 : _a.projectId;
      const to = projectId ? {
        workflows: {
          name: VIEWS.PROJECTS_WORKFLOWS,
          params: { projectId }
        },
        credentials: {
          name: VIEWS.PROJECTS_CREDENTIALS,
          params: { projectId }
        },
        executions: {
          name: VIEWS.PROJECTS_EXECUTIONS,
          params: { projectId }
        }
      } : {
        workflows: {
          name: VIEWS.WORKFLOWS
        },
        credentials: {
          name: VIEWS.CREDENTIALS
        },
        executions: {
          name: VIEWS.EXECUTIONS
        }
      };
      const tabs = [
        {
          label: locale.baseText("mainSidebar.workflows"),
          value: to.workflows.name,
          to: to.workflows
        },
        {
          label: locale.baseText("mainSidebar.credentials"),
          value: to.credentials.name,
          to: to.credentials
        },
        {
          label: locale.baseText("mainSidebar.executions"),
          value: to.executions.name,
          to: to.executions
        }
      ];
      if (props.showSettings) {
        tabs.push({
          label: locale.baseText("projects.settings"),
          value: VIEWS.PROJECT_SETTINGS,
          to: { name: VIEWS.PROJECT_SETTINGS, params: { projectId } }
        });
      }
      return tabs;
    });
    watch(
      () => route == null ? void 0 : route.name,
      () => {
        selectedTab.value = route == null ? void 0 : route.name;
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      const _component_N8nTabs = resolveComponent("N8nTabs");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.projectTabs)
      }, [
        createVNode(_component_N8nTabs, {
          modelValue: selectedTab.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedTab.value = $event),
          options: options.value,
          "data-test-id": "project-tabs"
        }, null, 8, ["modelValue", "options"])
      ], 2);
    };
  }
});
const projectTabs = "_projectTabs_1nw28_1";
const style0$1 = {
  projectTabs
};
const cssModules$1 = {
  "$style": style0$1
};
const ProjectTabs = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectHeader",
  setup(__props) {
    const route = useRoute();
    const i18n = useI18n();
    const projectsStore = useProjectsStore();
    const headerIcon = computed(() => {
      var _a, _b;
      if (((_a = projectsStore.currentProject) == null ? void 0 : _a.type) === ProjectTypes.Personal) {
        return "user";
      } else if ((_b = projectsStore.currentProject) == null ? void 0 : _b.name) {
        return "layer-group";
      } else {
        return "home";
      }
    });
    const projectName = computed(() => {
      if (!projectsStore.currentProject) {
        return i18n.baseText("projects.menu.home");
      } else if (projectsStore.currentProject.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      } else {
        return projectsStore.currentProject.name;
      }
    });
    const projectPermissions = computed(
      () => {
        var _a;
        return getResourcePermissions((_a = projectsStore.currentProject) == null ? void 0 : _a.scopes).project;
      }
    );
    const showSettings = computed(
      () => {
        var _a, _b;
        return !!((_a = route == null ? void 0 : route.params) == null ? void 0 : _a.projectId) && !!projectPermissions.value.update && ((_b = projectsStore.currentProject) == null ? void 0 : _b.type) === ProjectTypes.Team;
      }
    );
    return (_ctx, _cache) => {
      const _component_N8nIcon = resolveComponent("N8nIcon");
      const _component_N8nHeading = resolveComponent("N8nHeading");
      const _component_N8nText = resolveComponent("N8nText");
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: normalizeClass([_ctx.$style.projectHeader])
        }, [
          createBaseVNode("div", {
            class: normalizeClass([_ctx.$style.icon])
          }, [
            createVNode(_component_N8nIcon, {
              icon: headerIcon.value,
              color: "text-light"
            }, null, 8, ["icon"])
          ], 2),
          createBaseVNode("div", null, [
            createVNode(_component_N8nHeading, {
              bold: "",
              tag: "h2",
              size: "xlarge"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(projectName.value), 1)
              ]),
              _: 1
            }),
            _ctx.$slots.subtitle ? (openBlock(), createBlock(_component_N8nText, {
              key: 0,
              size: "small",
              color: "text-light"
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "subtitle")
              ]),
              _: 3
            })) : createCommentVNode("", true)
          ]),
          _ctx.$slots.actions ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([_ctx.$style.actions])
          }, [
            renderSlot(_ctx.$slots, "actions")
          ], 2)) : createCommentVNode("", true)
        ], 2),
        createVNode(ProjectTabs, { "show-settings": showSettings.value }, null, 8, ["show-settings"])
      ]);
    };
  }
});
const projectHeader = "_projectHeader_13qlt_1";
const icon = "_icon_13qlt_9";
const actions = "_actions_13qlt_15";
const style0 = {
  projectHeader,
  icon,
  actions
};
const cssModules = {
  "$style": style0
};
const ProjectHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  ProjectHeader as P
};
