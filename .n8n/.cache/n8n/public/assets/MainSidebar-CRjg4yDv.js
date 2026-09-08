import { d as defineComponent, az as useLoadingService, K as useUIStore, a0 as useSourceControlStore, a as useToast, r as ref, p as computed, c as openBlock, h as createElementBlock, A as unref, n as normalizeClass, j as createBaseVNode, i as createVNode, k as createTextVNode, t as toDisplayString, w as withCtx, e as createBlock, f as createCommentVNode, B as normalizeStyle, g as useI18n, an as hasPermission, ah as SOURCE_CONTROL_PUSH_MODAL_KEY, x as nextTick, aA as sourceControlEventBus, aB as SOURCE_CONTROL_PULL_MODAL_KEY, l as resolveComponent, C as createEventBus, _ as _export_sfc, aC as get, R as defineStore, S as STORES, aD as useCloudPlanStore, Z as useRootStore, aE as useStorage, aF as DateTime, ak as useTelemetry, b as useRouter, a1 as useProjectsStore, a5 as usePageRedirectionHelper, o as onMounted, F as Fragment, z as renderList, V as VIEWS, aG as sortByProperty, m as useSettingsStore, aH as useTemplatesStore, u as useUsersStore, aI as useVersionsStore, T as useWorkflowsStore, J as useDebounce, U as useRoute, v as onBeforeUnmount, aJ as createSlots, aK as useExternalHooks, aL as VERSIONS_MODAL_KEY, aM as ABOUT_MODAL_KEY } from "./index-40I5DMGP.js";
import { u as useBugReporting } from "./useBugReporting-CFOQlQpP.js";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MainSidebarSourceControl",
  props: {
    isCollapsed: { type: Boolean }
  },
  setup(__props) {
    const responseStatuses = {
      CONFLICT: 409
    };
    const loadingService = useLoadingService();
    const uiStore = useUIStore();
    const sourceControlStore = useSourceControlStore();
    const toast = useToast();
    const i18n = useI18n();
    const eventBus = createEventBus();
    const tooltipOpenDelay = ref(300);
    const currentBranch = computed(() => {
      return sourceControlStore.preferences.branchName;
    });
    const sourceControlAvailable = computed(
      () => sourceControlStore.isEnterpriseSourceControlEnabled && hasPermission(["rbac"], { rbac: { scope: "sourceControl:manage" } })
    );
    async function pushWorkfolder() {
      loadingService.startLoading();
      loadingService.setLoadingText(i18n.baseText("settings.sourceControl.loading.checkingForChanges"));
      try {
        const status = await sourceControlStore.getAggregatedStatus();
        uiStore.openModalWithData({
          name: SOURCE_CONTROL_PUSH_MODAL_KEY,
          data: { eventBus, status }
        });
      } catch (error) {
        toast.showError(error, i18n.baseText("error"));
      } finally {
        loadingService.stopLoading();
        loadingService.setLoadingText(i18n.baseText("genericHelpers.loading"));
      }
    }
    async function pullWorkfolder() {
      loadingService.startLoading();
      loadingService.setLoadingText(i18n.baseText("settings.sourceControl.loading.pull"));
      try {
        const status = await sourceControlStore.pullWorkfolder(
          false
        ) || [];
        const statusWithoutLocallyCreatedWorkflows = status.filter((file) => {
          return !(file.type === "workflow" && file.status === "created" && file.location === "local");
        });
        if (statusWithoutLocallyCreatedWorkflows.length === 0) {
          toast.showMessage({
            title: i18n.baseText("settings.sourceControl.pull.upToDate.title"),
            message: i18n.baseText("settings.sourceControl.pull.upToDate.description"),
            type: "success"
          });
        } else {
          toast.showMessage({
            title: i18n.baseText("settings.sourceControl.pull.success.title"),
            type: "success"
          });
          const incompleteFileTypes = ["variables", "credential"];
          const hasVariablesOrCredentials = (status || []).some((file) => {
            return incompleteFileTypes.includes(file.type);
          });
          if (hasVariablesOrCredentials) {
            void nextTick(() => {
              toast.showMessage({
                message: i18n.baseText("settings.sourceControl.pull.oneLastStep.description"),
                title: i18n.baseText("settings.sourceControl.pull.oneLastStep.title"),
                type: "info",
                duration: 0,
                showClose: true,
                offset: 0
              });
            });
          }
        }
        sourceControlEventBus.emit("pull");
      } catch (error) {
        const errorResponse = error.response;
        if ((errorResponse == null ? void 0 : errorResponse.status) === responseStatuses.CONFLICT) {
          uiStore.openModalWithData({
            name: SOURCE_CONTROL_PULL_MODAL_KEY,
            data: { eventBus, status: errorResponse.data.data }
          });
        } else {
          toast.showError(error, "Error");
        }
      } finally {
        loadingService.stopLoading();
        loadingService.setLoadingText(i18n.baseText("genericHelpers.loading"));
      }
    }
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_tooltip = resolveComponent("n8n-tooltip");
      return sourceControlAvailable.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass({
          [_ctx.$style.sync]: true,
          [_ctx.$style.collapsed]: _ctx.isCollapsed,
          [_ctx.$style.isConnected]: unref(sourceControlStore).isEnterpriseSourceControlEnabled
        }),
        style: normalizeStyle({ borderLeftColor: unref(sourceControlStore).preferences.branchColor }),
        "data-test-id": "main-sidebar-source-control"
      }, [
        unref(sourceControlStore).preferences.connected && unref(sourceControlStore).preferences.branchName ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.connected),
          "data-test-id": "main-sidebar-source-control-connected"
        }, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.branchName)
          }, [
            createVNode(_component_n8n_icon, { icon: "code-branch" }),
            createTextVNode(" " + toDisplayString(currentBranch.value), 1)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass({ "pt-xs": !_ctx.isCollapsed })
          }, [
            createVNode(_component_n8n_tooltip, {
              disabled: !_ctx.isCollapsed,
              "show-after": tooltipOpenDelay.value,
              placement: "right"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", null, toDisplayString(unref(i18n).baseText("settings.sourceControl.button.pull")), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_n8n_button, {
                  class: normalizeClass({
                    "mr-2xs": !_ctx.isCollapsed,
                    "mb-2xs": _ctx.isCollapsed && !unref(sourceControlStore).preferences.branchReadOnly
                  }),
                  icon: "arrow-down",
                  type: "tertiary",
                  size: "mini",
                  square: _ctx.isCollapsed,
                  label: _ctx.isCollapsed ? "" : unref(i18n).baseText("settings.sourceControl.button.pull"),
                  onClick: pullWorkfolder
                }, null, 8, ["class", "square", "label"])
              ]),
              _: 1
            }, 8, ["disabled", "show-after"]),
            !unref(sourceControlStore).preferences.branchReadOnly ? (openBlock(), createBlock(_component_n8n_tooltip, {
              key: 0,
              disabled: !_ctx.isCollapsed,
              "show-after": tooltipOpenDelay.value,
              placement: "right"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", null, toDisplayString(unref(i18n).baseText("settings.sourceControl.button.push")), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_n8n_button, {
                  square: _ctx.isCollapsed,
                  label: _ctx.isCollapsed ? "" : unref(i18n).baseText("settings.sourceControl.button.push"),
                  icon: "arrow-up",
                  type: "tertiary",
                  size: "mini",
                  onClick: pushWorkfolder
                }, null, 8, ["square", "label"])
              ]),
              _: 1
            }, 8, ["disabled", "show-after"])) : createCommentVNode("", true)
          ], 2)
        ], 2)) : createCommentVNode("", true)
      ], 6)) : createCommentVNode("", true);
    };
  }
});
const sync = "_sync_15zv3_1";
const isConnected = "_isConnected_15zv3_8";
const collapsed$1 = "_collapsed_15zv3_12";
const branchName = "_branchName_15zv3_22";
const connected = "_connected_15zv3_32";
const style0$4 = {
  sync,
  isConnected,
  collapsed: collapsed$1,
  branchName,
  connected
};
const cssModules$4 = {
  "$style": style0$4
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__cssModules", cssModules$4]]);
const notification = "_notification_197jx_8";
const style0$3 = {
  "gift-icon": "_gift-icon_197jx_1",
  notification
};
const _sfc_main$3 = {};
function _sfc_render(_ctx, _cache) {
  const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style["gift-icon"])
  }, [
    createVNode(_component_font_awesome_icon, { icon: "gift" }),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style["notification"])
    }, _cache[0] || (_cache[0] = [
      createBaseVNode("div", null, null, -1)
    ]), 2)
  ], 2);
}
const cssModules$3 = {
  "$style": style0$3
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__cssModules", cssModules$3]]);
async function getBecomeCreatorCta(context) {
  const response = await get(context.baseUrl, "/cta/become-creator");
  return response;
}
const LOCAL_STORAGE_KEY = "N8N_BECOME_TEMPLATE_CREATOR_CTA_DISMISSED_AT";
const RESHOW_DISMISSED_AFTER_DAYS = 30;
const POLL_INTERVAL_IN_MS = 15 * 60 * 1e3;
const useBecomeTemplateCreatorStore = defineStore(STORES.BECOME_TEMPLATE_CREATOR, () => {
  const cloudPlanStore = useCloudPlanStore();
  const rootStore = useRootStore();
  const dismissedAt = useStorage(LOCAL_STORAGE_KEY);
  const ctaMeetsCriteria = ref(false);
  const monitorCtasTimer = ref(null);
  const isDismissed = computed(() => {
    return dismissedAt.value ? !hasEnoughTimePassedSinceDismissal(dismissedAt.value) : false;
  });
  const showBecomeCreatorCta = computed(() => {
    return ctaMeetsCriteria.value && !cloudPlanStore.userIsTrialing && !isDismissed.value;
  });
  const dismissCta = () => {
    dismissedAt.value = DateTime.now().toISO();
  };
  const fetchBecomeCreatorCta = async () => {
    const becomeCreatorCta = await getBecomeCreatorCta(rootStore.restApiContext);
    ctaMeetsCriteria.value = becomeCreatorCta;
  };
  const fetchUserCtasIfNeeded = async () => {
    if (isDismissed.value || cloudPlanStore.userIsTrialing || ctaMeetsCriteria.value) {
      return;
    }
    await fetchBecomeCreatorCta();
  };
  const startMonitoringCta = () => {
    if (monitorCtasTimer.value) {
      return;
    }
    setTimeout(fetchUserCtasIfNeeded, 1e3);
    monitorCtasTimer.value = setInterval(fetchUserCtasIfNeeded, POLL_INTERVAL_IN_MS);
  };
  const stopMonitoringCta = () => {
    if (!monitorCtasTimer.value) {
      return;
    }
    clearInterval(monitorCtasTimer.value);
    monitorCtasTimer.value = null;
  };
  return {
    showBecomeCreatorCta,
    dismissCta,
    startMonitoringCta,
    stopMonitoringCta
  };
});
function hasEnoughTimePassedSinceDismissal(dismissedAt) {
  const reshowAtTime = DateTime.fromISO(dismissedAt).plus({
    days: RESHOW_DISMISSED_AFTER_DAYS
  });
  return reshowAtTime <= DateTime.now();
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BecomeTemplateCreatorCta",
  setup(__props) {
    const i18n = useI18n();
    const store = useBecomeTemplateCreatorStore();
    const telemetry = useTelemetry();
    const onClick = () => {
      telemetry.track("User clicked become creator CTA");
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_button = resolveComponent("n8n-button");
      return unref(store).showBecomeCreatorCta ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.container),
        "data-test-id": "become-template-creator-cta"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.textAndCloseButton)
        }, [
          createBaseVNode("p", {
            class: normalizeClass(_ctx.$style.text)
          }, toDisplayString(unref(i18n).baseText("becomeCreator.text")), 3),
          createBaseVNode("button", {
            class: normalizeClass(_ctx.$style.closeButton),
            "data-test-id": "close-become-template-creator-cta",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(store).dismissCta())
          }, [
            createVNode(_component_n8n_icon, {
              icon: "times",
              size: "xsmall",
              title: unref(i18n).baseText("generic.close")
            }, null, 8, ["title"])
          ], 2)
        ], 2),
        createVNode(_component_n8n_button, {
          class: normalizeClass(_ctx.$style.becomeCreatorButton),
          label: unref(i18n).baseText("becomeCreator.buttonText"),
          size: "xmini",
          type: "secondary",
          element: "a",
          href: "https://creators.n8n.io/hub",
          target: "_blank",
          onClick
        }, null, 8, ["class", "label"])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const container = "_container_92ffs_1";
const textAndCloseButton = "_textAndCloseButton_92ffs_9";
const text = "_text_92ffs_9";
const closeButton = "_closeButton_92ffs_22";
const becomeCreatorButton = "_becomeCreatorButton_92ffs_35";
const style0$2 = {
  container,
  textAndCloseButton,
  text,
  closeButton,
  becomeCreatorButton
};
const cssModules$2 = {
  "$style": style0$2
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1$1 = {
  key: 0,
  class: "mt-m mb-m"
};
const _hoisted_2$1 = {
  key: 4,
  class: "mb-m"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectNavigation",
  props: {
    collapsed: { type: Boolean },
    planName: {}
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const locale = useI18n();
    const toast = useToast();
    const projectsStore = useProjectsStore();
    const pageRedirectionHelper = usePageRedirectionHelper();
    const isCreatingProject = ref(false);
    const isComponentMounted = ref(false);
    const home = computed(() => ({
      id: "home",
      label: locale.baseText("projects.menu.home"),
      icon: "home",
      route: {
        to: { name: VIEWS.HOMEPAGE }
      }
    }));
    const addProject = computed(() => ({
      id: "addProject",
      label: locale.baseText("projects.menu.addProject"),
      icon: "plus",
      disabled: !isComponentMounted.value || isCreatingProject.value || !projectsStore.canCreateProjects,
      isLoading: isCreatingProject.value
    }));
    const getProjectMenuItem = (project) => ({
      id: project.id,
      label: project.name,
      icon: props.collapsed ? void 0 : "layer-group",
      route: {
        to: {
          name: VIEWS.PROJECTS_WORKFLOWS,
          params: { projectId: project.id }
        }
      }
    });
    const personalProject = computed(() => {
      var _a, _b;
      return {
        id: ((_a = projectsStore.personalProject) == null ? void 0 : _a.id) ?? "",
        label: locale.baseText("projects.menu.personal"),
        icon: props.collapsed ? void 0 : "user",
        route: {
          to: {
            name: VIEWS.PROJECTS_WORKFLOWS,
            params: { projectId: (_b = projectsStore.personalProject) == null ? void 0 : _b.id }
          }
        }
      };
    });
    const addProjectClicked = async () => {
      isCreatingProject.value = true;
      try {
        const newProject = await projectsStore.createProject({
          name: locale.baseText("projects.settings.newProjectName")
        });
        await router.push({ name: VIEWS.PROJECT_SETTINGS, params: { projectId: newProject.id } });
        toast.showMessage({
          title: locale.baseText("projects.settings.save.successful.title", {
            interpolate: { projectName: newProject.name ?? "" }
          }),
          type: "success"
        });
      } catch (error) {
        toast.showError(error, locale.baseText("projects.error.title"));
      } finally {
        isCreatingProject.value = false;
      }
    };
    const displayProjects = computed(
      () => sortByProperty(
        "name",
        projectsStore.myProjects.filter((p) => p.type === "team")
      )
    );
    const canCreateProjects = computed(
      () => projectsStore.hasPermissionToCreateProjects && projectsStore.isTeamProjectFeatureEnabled
    );
    const goToUpgrade = async () => {
      await pageRedirectionHelper.goToUpgrade("rbac", "upgrade-rbac");
    };
    onMounted(async () => {
      await nextTick();
      isComponentMounted.value = true;
    });
    return (_ctx, _cache) => {
      const _component_N8nMenuItem = resolveComponent("N8nMenuItem");
      const _component_ElMenu = resolveComponent("ElMenu");
      const _component_N8nText = resolveComponent("N8nText");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.projects)
      }, [
        createVNode(_component_ElMenu, {
          collapse: props.collapsed,
          class: "home"
        }, {
          default: withCtx(() => [
            createVNode(_component_N8nMenuItem, {
              item: home.value,
              compact: props.collapsed,
              "active-tab": unref(projectsStore).projectNavActiveId,
              mode: "tabs",
              "data-test-id": "project-home-menu-item"
            }, null, 8, ["item", "compact", "active-tab"])
          ]),
          _: 1
        }, 8, ["collapse"]),
        unref(projectsStore).isTeamProjectFeatureEnabled ? (openBlock(), createElementBlock("hr", _hoisted_1$1)) : createCommentVNode("", true),
        !props.collapsed && unref(projectsStore).isTeamProjectFeatureEnabled ? (openBlock(), createBlock(_component_N8nText, {
          key: 1,
          class: normalizeClass(_ctx.$style.projectsLabel),
          tag: "h3",
          bold: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("span", null, toDisplayString(unref(locale).baseText("projects.menu.title")), 1)
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("", true),
        unref(projectsStore).isTeamProjectFeatureEnabled ? (openBlock(), createBlock(_component_ElMenu, {
          key: 2,
          collapse: props.collapsed,
          class: normalizeClass(_ctx.$style.projectItems)
        }, {
          default: withCtx(() => [
            createVNode(_component_N8nMenuItem, {
              item: personalProject.value,
              compact: props.collapsed,
              "active-tab": unref(projectsStore).projectNavActiveId,
              mode: "tabs",
              "data-test-id": "project-personal-menu-item"
            }, null, 8, ["item", "compact", "active-tab"]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(displayProjects.value, (project) => {
              return openBlock(), createBlock(_component_N8nMenuItem, {
                key: project.id,
                class: normalizeClass({
                  [_ctx.$style.collapsed]: props.collapsed
                }),
                item: getProjectMenuItem(project),
                compact: props.collapsed,
                "active-tab": unref(projectsStore).projectNavActiveId,
                mode: "tabs",
                "data-test-id": "project-menu-item"
              }, null, 8, ["class", "item", "compact", "active-tab"]);
            }), 128))
          ]),
          _: 1
        }, 8, ["collapse", "class"])) : createCommentVNode("", true),
        canCreateProjects.value ? (openBlock(), createBlock(_component_N8nTooltip, {
          key: 3,
          placement: "right",
          disabled: unref(projectsStore).canCreateProjects
        }, {
          content: withCtx(() => [
            createVNode(_component_i18n_t, { keypath: "projects.create.limitReached" }, {
              planName: withCtx(() => [
                createTextVNode(toDisplayString(props.planName), 1)
              ]),
              limit: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("projects.create.limit", {
                  adjustToNumber: unref(projectsStore).teamProjectsLimit,
                  interpolate: { num: String(unref(projectsStore).teamProjectsLimit) }
                })), 1)
              ]),
              link: withCtx(() => [
                createBaseVNode("a", {
                  class: normalizeClass(_ctx.$style.upgradeLink),
                  href: "#",
                  onClick: goToUpgrade
                }, toDisplayString(unref(locale).baseText("projects.create.limitReached.link")), 3)
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_ElMenu, {
              collapse: props.collapsed,
              class: "pl-xs pr-xs mb-m"
            }, {
              default: withCtx(() => [
                createVNode(_component_N8nMenuItem, {
                  item: addProject.value,
                  compact: props.collapsed,
                  "handle-select": addProjectClicked,
                  mode: "tabs",
                  "data-test-id": "add-project-menu-item"
                }, null, 8, ["item", "compact"])
              ]),
              _: 1
            }, 8, ["collapse"])
          ]),
          _: 1
        }, 8, ["disabled"])) : createCommentVNode("", true),
        unref(projectsStore).isTeamProjectFeatureEnabled ? (openBlock(), createElementBlock("hr", _hoisted_2$1)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const projects = "_projects_6p5d2_1";
const projectItems = "_projectItems_6p5d2_9";
const upgradeLink = "_upgradeLink_6p5d2_15";
const collapsed = "_collapsed_6p5d2_20";
const projectsLabel = "_projectsLabel_6p5d2_24";
const style0$1 = {
  projects,
  projectItems,
  upgradeLink,
  collapsed,
  projectsLabel
};
const cssModules$1 = {
  "$style": style0$1
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1], ["__scopeId", "data-v-f0b80637"]]);
const _hoisted_1 = ["src"];
const _hoisted_2 = {
  class: "ml-3xs",
  "data-test-id": "main-sidebar-user-menu"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainSidebar",
  setup(__props) {
    const becomeTemplateCreatorStore = useBecomeTemplateCreatorStore();
    const cloudPlanStore = useCloudPlanStore();
    const rootStore = useRootStore();
    const settingsStore = useSettingsStore();
    const templatesStore = useTemplatesStore();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const versionsStore = useVersionsStore();
    const workflowsStore = useWorkflowsStore();
    const { callDebounced } = useDebounce();
    const externalHooks = useExternalHooks();
    const locale = useI18n();
    useRoute();
    const router = useRouter();
    const telemetry = useTelemetry();
    const pageRedirectionHelper = usePageRedirectionHelper();
    const { getReportingURL } = useBugReporting();
    const user = ref(null);
    const basePath = ref("");
    const fullyExpanded = ref(false);
    const userMenuItems = ref([
      {
        id: "settings",
        label: locale.baseText("settings")
      },
      {
        id: "logout",
        label: locale.baseText("auth.signout")
      }
    ]);
    const mainMenuItems = computed(() => [
      {
        id: "cloud-admin",
        position: "bottom",
        label: "Admin Panel",
        icon: "cloud",
        available: settingsStore.isCloudDeployment && hasPermission(["instanceOwner"])
      },
      {
        // Link to in-app templates, available if custom templates are enabled
        id: "templates",
        icon: "box-open",
        label: locale.baseText("mainSidebar.templates"),
        position: "bottom",
        available: settingsStore.isTemplatesEnabled && templatesStore.hasCustomTemplatesHost,
        route: { to: { name: VIEWS.TEMPLATES } }
      },
      {
        // Link to website templates, available if custom templates are not enabled
        id: "templates",
        icon: "box-open",
        label: locale.baseText("mainSidebar.templates"),
        position: "bottom",
        available: settingsStore.isTemplatesEnabled && !templatesStore.hasCustomTemplatesHost,
        link: {
          href: templatesStore.websiteTemplateRepositoryURL,
          target: "_blank"
        }
      },
      {
        id: "variables",
        icon: "variable",
        label: locale.baseText("mainSidebar.variables"),
        customIconSize: "medium",
        position: "bottom",
        route: { to: { name: VIEWS.VARIABLES } }
      },
      {
        id: "help",
        icon: "question",
        label: locale.baseText("mainSidebar.help"),
        position: "bottom",
        children: [
          {
            id: "quickstart",
            icon: "video",
            label: locale.baseText("mainSidebar.helpMenuItems.quickstart"),
            link: {
              href: "https://www.youtube.com/watch?v=1MwSoB0gnM4",
              target: "_blank"
            }
          },
          {
            id: "docs",
            icon: "book",
            label: locale.baseText("mainSidebar.helpMenuItems.documentation"),
            link: {
              href: "https://docs.n8n.io?utm_source=n8n_app&utm_medium=app_sidebar",
              target: "_blank"
            }
          },
          {
            id: "forum",
            icon: "users",
            label: locale.baseText("mainSidebar.helpMenuItems.forum"),
            link: {
              href: "https://community.n8n.io?utm_source=n8n_app&utm_medium=app_sidebar",
              target: "_blank"
            }
          },
          {
            id: "examples",
            icon: "graduation-cap",
            label: locale.baseText("mainSidebar.helpMenuItems.course"),
            link: {
              href: "https://docs.n8n.io/courses/",
              target: "_blank"
            }
          },
          {
            id: "report-bug",
            icon: "bug",
            label: locale.baseText("mainSidebar.helpMenuItems.reportBug"),
            link: {
              href: getReportingURL(),
              target: "_blank"
            }
          },
          {
            id: "about",
            icon: "info",
            label: locale.baseText("mainSidebar.aboutN8n"),
            position: "bottom"
          }
        ]
      }
    ]);
    const isCollapsed = computed(() => uiStore.sidebarMenuCollapsed);
    const logoPath = computed(
      () => basePath.value + (isCollapsed.value ? "static/logo/collapsed.svg" : uiStore.logo)
    );
    const hasVersionUpdates = computed(
      () => settingsStore.settings.releaseChannel === "stable" && versionsStore.hasVersionUpdates
    );
    const nextVersions = computed(() => versionsStore.nextVersions);
    const showUserArea = computed(() => hasPermission(["authenticated"]));
    const userIsTrialing = computed(() => cloudPlanStore.userIsTrialing);
    onMounted(async () => {
      window.addEventListener("resize", onResize);
      basePath.value = rootStore.baseUrl;
      if (user.value) {
        void externalHooks.run("mainSidebar.mounted", {
          userRef: user.value
        });
      }
      await nextTick(() => {
        uiStore.sidebarMenuCollapsed = window.innerWidth < 900;
        fullyExpanded.value = !isCollapsed.value;
      });
      becomeTemplateCreatorStore.startMonitoringCta();
    });
    onBeforeUnmount(() => {
      becomeTemplateCreatorStore.stopMonitoringCta();
      window.removeEventListener("resize", onResize);
    });
    const trackTemplatesClick = () => {
      var _a;
      telemetry.track("User clicked on templates", {
        role: (_a = usersStore.currentUserCloudInfo) == null ? void 0 : _a.role,
        active_workflow_count: workflowsStore.activeWorkflows.length
      });
    };
    const trackHelpItemClick = (itemType) => {
      telemetry.track("User clicked help resource", {
        type: itemType,
        workflow_id: workflowsStore.workflowId
      });
    };
    const onUserActionToggle = (action) => {
      switch (action) {
        case "logout":
          onLogout();
          break;
        case "settings":
          void router.push({ name: VIEWS.PERSONAL_SETTINGS });
          break;
      }
    };
    const onLogout = () => {
      void router.push({ name: VIEWS.SIGNOUT });
    };
    const toggleCollapse = () => {
      uiStore.toggleSidebarMenuCollapse();
      if (!isCollapsed.value) {
        setTimeout(() => {
          fullyExpanded.value = !isCollapsed.value;
        }, 300);
      } else {
        fullyExpanded.value = !isCollapsed.value;
      }
    };
    const openUpdatesPanel = () => {
      uiStore.openModal(VERSIONS_MODAL_KEY);
    };
    const handleSelect = (key) => {
      switch (key) {
        case "templates":
          if (settingsStore.isTemplatesEnabled && !templatesStore.hasCustomTemplatesHost) {
            trackTemplatesClick();
          }
          break;
        case "about": {
          trackHelpItemClick("about");
          uiStore.openModal(ABOUT_MODAL_KEY);
          break;
        }
        case "cloud-admin": {
          void pageRedirectionHelper.goToDashboard();
          break;
        }
        case "quickstart":
        case "docs":
        case "forum":
        case "examples": {
          trackHelpItemClick(key);
          break;
        }
      }
    };
    const onResize = (event) => {
      void callDebounced(onResizeEnd, { debounceTime: 100 }, event);
    };
    const onResizeEnd = async (event) => {
      const browserWidth = event.target.outerWidth;
      await checkWidthAndAdjustSidebar(browserWidth);
    };
    const checkWidthAndAdjustSidebar = async (width) => {
      if (width < 900) {
        uiStore.sidebarMenuCollapsed = true;
        await nextTick();
        fullyExpanded.value = !isCollapsed.value;
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_ProjectNavigation = __unplugin_components_0;
      const _component_BecomeTemplateCreatorCta = __unplugin_components_1;
      const _component_GiftNotificationIcon = __unplugin_components_2;
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_MainSidebarSourceControl = __unplugin_components_3;
      const _component_n8n_avatar = resolveComponent("n8n-avatar");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_n8n_action_dropdown = resolveComponent("n8n-action-dropdown");
      const _component_n8n_menu = resolveComponent("n8n-menu");
      return openBlock(), createElementBlock("div", {
        id: "side-menu",
        class: normalizeClass({
          ["side-menu"]: true,
          [_ctx.$style.sideMenu]: true,
          [_ctx.$style.sideMenuCollapsed]: isCollapsed.value
        })
      }, [
        createBaseVNode("div", {
          id: "collapse-change-button",
          class: normalizeClass(["clickable", _ctx.$style.sideMenuCollapseButton]),
          onClick: toggleCollapse
        }, [
          isCollapsed.value ? (openBlock(), createBlock(_component_n8n_icon, {
            key: 0,
            icon: "chevron-right",
            size: "xsmall",
            class: "ml-5xs"
          })) : (openBlock(), createBlock(_component_n8n_icon, {
            key: 1,
            icon: "chevron-left",
            size: "xsmall",
            class: "mr-5xs"
          }))
        ], 2),
        createVNode(_component_n8n_menu, {
          items: mainMenuItems.value,
          collapsed: isCollapsed.value,
          onSelect: handleSelect
        }, createSlots({
          header: withCtx(() => {
            var _a;
            return [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.logo)
              }, [
                createBaseVNode("img", {
                  src: logoPath.value,
                  "data-test-id": "n8n-logo",
                  class: normalizeClass(_ctx.$style.icon),
                  alt: "n8n"
                }, null, 10, _hoisted_1)
              ], 2),
              createVNode(_component_ProjectNavigation, {
                collapsed: isCollapsed.value,
                "plan-name": (_a = unref(cloudPlanStore).currentPlanData) == null ? void 0 : _a.displayName
              }, null, 8, ["collapsed", "plan-name"])
            ];
          }),
          beforeLowerMenu: withCtx(() => [
            fullyExpanded.value && !userIsTrialing.value ? (openBlock(), createBlock(_component_BecomeTemplateCreatorCta, { key: 0 })) : createCommentVNode("", true)
          ]),
          menuSuffix: withCtx(() => [
            createBaseVNode("div", null, [
              hasVersionUpdates.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                "data-test-id": "version-updates-panel-button",
                class: normalizeClass(_ctx.$style.updates),
                onClick: openUpdatesPanel
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.giftContainer)
                }, [
                  createVNode(_component_GiftNotificationIcon)
                ], 2),
                createVNode(_component_n8n_text, {
                  class: normalizeClass({ ["ml-xs"]: true, [_ctx.$style.expanded]: fullyExpanded.value }),
                  color: "text-base"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(nextVersions.value.length > 99 ? "99+" : nextVersions.value.length) + " update" + toDisplayString(nextVersions.value.length > 1 ? "s" : ""), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ], 2)) : createCommentVNode("", true),
              createVNode(_component_MainSidebarSourceControl, { "is-collapsed": isCollapsed.value }, null, 8, ["is-collapsed"])
            ])
          ]),
          _: 2
        }, [
          showUserArea.value ? {
            name: "footer",
            fn: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "user",
                ref: user,
                class: normalizeClass(_ctx.$style.userArea)
              }, [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_component_el_dropdown, {
                    placement: "right-end",
                    trigger: "click",
                    onCommand: onUserActionToggle
                  }, createSlots({
                    default: withCtx(() => {
                      var _a, _b;
                      return [
                        createBaseVNode("div", {
                          class: normalizeClass({ [_ctx.$style.avatar]: true, ["clickable"]: isCollapsed.value })
                        }, [
                          createVNode(_component_n8n_avatar, {
                            "first-name": (_a = unref(usersStore).currentUser) == null ? void 0 : _a.firstName,
                            "last-name": (_b = unref(usersStore).currentUser) == null ? void 0 : _b.lastName,
                            size: "small"
                          }, null, 8, ["first-name", "last-name"])
                        ], 2)
                      ];
                    }),
                    _: 2
                  }, [
                    isCollapsed.value ? {
                      name: "dropdown",
                      fn: withCtx(() => [
                        createVNode(_component_el_dropdown_menu, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_dropdown_item, { command: "settings" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$locale.baseText("settings")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, { command: "logout" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$locale.baseText("auth.signout")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1024)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass({ ["ml-2xs"]: true, [_ctx.$style.userName]: true, [_ctx.$style.expanded]: fullyExpanded.value })
                }, [
                  createVNode(_component_n8n_text, {
                    size: "small",
                    bold: true,
                    color: "text-dark"
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createTextVNode(toDisplayString((_a = unref(usersStore).currentUser) == null ? void 0 : _a.fullName), 1)
                      ];
                    }),
                    _: 1
                  })
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass({ [_ctx.$style.userActions]: true, [_ctx.$style.expanded]: fullyExpanded.value })
                }, [
                  createVNode(_component_n8n_action_dropdown, {
                    items: userMenuItems.value,
                    placement: "top-start",
                    "data-test-id": "user-menu",
                    onSelect: onUserActionToggle
                  }, null, 8, ["items"])
                ], 2)
              ], 2)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "collapsed"])
      ], 2);
    };
  }
});
const sideMenu = "_sideMenu_1qnza_1";
const logo = "_logo_1qnza_8";
const sideMenuCollapsed = "_sideMenuCollapsed_1qnza_19";
const sideMenuCollapseButton = "_sideMenuCollapseButton_1qnza_26";
const updates = "_updates_1qnza_45";
const expanded = "_expanded_1qnza_58";
const userArea = "_userArea_1qnza_65";
const userName = "_userName_1qnza_72";
const userActions = "_userActions_1qnza_86";
const style0 = {
  sideMenu,
  logo,
  sideMenuCollapsed,
  sideMenuCollapseButton,
  updates,
  expanded,
  userArea,
  userName,
  userActions
};
const cssModules = {
  "$style": style0
};
const MainSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  MainSidebar as default
};
