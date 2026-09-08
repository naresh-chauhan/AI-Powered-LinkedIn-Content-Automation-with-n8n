import { d as defineComponent, U as useRoute, T as useWorkflowsStore, m as useSettingsStore, p as computed, o as onMounted, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, j as createBaseVNode, e as createBlock, k as createTextVNode, t as toDisplayString, A as unref, n as normalizeClass, f as createCommentVNode, V as VIEWS, g as useI18n, l as resolveComponent, a8 as EnterpriseEditionFeature, _ as _export_sfc, b as useRouter, au as useExecutionsStore, r as ref, H as watch, F as Fragment, z as renderList, bx as TransitionGroup, i2 as isComponentPublicInstance, am as getResourcePermissions, a4 as useWorkflowHelpers, hI as onBeforeRouteLeave, gt as getNodeViewTab, ao as MAIN_HEADER_TABS, bf as useNodeTypesStore, a as useToast, J as useDebounce, bg as useNodeHelpers, v as onBeforeUnmount, X as PLACEHOLDER_EMPTY_WORKFLOW_ID, i3 as NO_NETWORK_ERROR_CODE, ak as useTelemetry, hH as NEW_WORKFLOW_ID } from "./index-40I5DMGP.js";
import { _ as _sfc_main$4, E as ExecutionsFilter } from "./ExecutionsTime.vue_vue_type_script_setup_true_lang-Ba-at9rw.js";
import { u as useExecutionHelpers } from "./useExecutionHelpers-CXGl_HIp.js";
import { t as toDayMonth, a as toTime } from "./dateFormatter-BRi2wSZ-.js";
import { W as WorkflowExecutionsInfoAccordion } from "./WorkflowExecutionsInfoAccordion-D2GFnpq1.js";
const _hoisted_1$1 = { key: 2 };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowExecutionsCard",
  props: {
    execution: {},
    highlight: { type: Boolean },
    showGap: { type: Boolean },
    workflowPermissions: {}
  },
  emits: ["retryExecution", "mounted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const route = useRoute();
    const locale = useI18n();
    const executionHelpers = useExecutionHelpers();
    const workflowsStore = useWorkflowsStore();
    const settingsStore = useSettingsStore();
    const isAdvancedExecutionFilterEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.AdvancedExecutionFilters]
    );
    const isAnnotationEnabled = computed(() => isAdvancedExecutionFilterEnabled.value);
    const currentWorkflow = computed(() => route.params.name || workflowsStore.workflowId);
    const retryExecutionActions = computed(() => [
      {
        id: "current-workflow",
        label: locale.baseText("executionsList.retryWithCurrentlySavedWorkflow")
      },
      {
        id: "original-workflow",
        label: locale.baseText("executionsList.retryWithOriginalWorkflow")
      }
    ]);
    const executionUIDetails = computed(
      () => executionHelpers.getUIDetails(props.execution)
    );
    const isActive = computed(() => props.execution.id === route.params.executionId);
    const isRetriable = computed(() => executionHelpers.isExecutionRetriable(props.execution));
    onMounted(() => {
      emit("mounted", props.execution.id);
    });
    function onRetryMenuItemSelect(action) {
      emit("retryExecution", { execution: props.execution, command: action });
    }
    return (_ctx, _cache) => {
      const _component_N8nText = resolveComponent("N8nText");
      const _component_N8nSpinner = resolveComponent("N8nSpinner");
      const _component_FontAwesomeIcon = resolveComponent("FontAwesomeIcon");
      const _component_N8nTags = resolveComponent("N8nTags");
      const _component_N8nActionDropdown = resolveComponent("N8nActionDropdown");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          ["execution-card"]: true,
          [_ctx.$style.WorkflowExecutionsCard]: true,
          [_ctx.$style.active]: isActive.value,
          [_ctx.$style[executionUIDetails.value.name]]: true,
          [_ctx.$style.highlight]: _ctx.highlight,
          [_ctx.$style.showGap]: _ctx.showGap
        })
      }, [
        createVNode(_component_router_link, {
          class: normalizeClass(_ctx.$style.executionLink),
          to: {
            name: unref(VIEWS).EXECUTION_PREVIEW,
            params: { name: currentWorkflow.value, executionId: _ctx.execution.id }
          },
          "data-test-execution-status": executionUIDetails.value.name
        }, {
          default: withCtx(() => {
            var _a;
            return [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.description)
              }, [
                executionUIDetails.value.name === "new" ? (openBlock(), createBlock(_component_N8nText, {
                  key: 0,
                  color: "text-dark",
                  bold: true,
                  size: "medium",
                  "data-test-id": "execution-time"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(toDayMonth)(executionUIDetails.value.createdAt)) + " - " + toDisplayString(unref(locale).baseText("executionDetails.startingSoon")), 1)
                  ]),
                  _: 1
                })) : (openBlock(), createBlock(_component_N8nText, {
                  key: 1,
                  color: "text-dark",
                  bold: true,
                  size: "medium",
                  "data-test-id": "execution-time"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(executionUIDetails.value.startTime), 1)
                  ]),
                  _: 1
                })),
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.executionStatus)
                }, [
                  executionUIDetails.value.name === "running" ? (openBlock(), createBlock(_component_N8nSpinner, {
                    key: 0,
                    size: "small",
                    class: normalizeClass([_ctx.$style.spinner, "mr-4xs"])
                  }, null, 8, ["class"])) : createCommentVNode("", true),
                  createVNode(_component_N8nText, {
                    class: normalizeClass(_ctx.$style.statusLabel),
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(executionUIDetails.value.label), 1)
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  _cache[0] || (_cache[0] = createTextVNode(" " + toDisplayString(" ") + " ")),
                  executionUIDetails.value.name === "running" ? (openBlock(), createBlock(_component_N8nText, {
                    key: 1,
                    color: isActive.value ? "text-dark" : "text-base",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(locale).baseText("executionDetails.runningTimeRunning")) + " ", 1),
                      createVNode(_sfc_main$4, {
                        "start-time": _ctx.execution.startedAt
                      }, null, 8, ["start-time"])
                    ]),
                    _: 1
                  }, 8, ["color"])) : createCommentVNode("", true),
                  executionUIDetails.value.name === "new" && _ctx.execution.createdAt ? (openBlock(), createBlock(_component_N8nText, {
                    key: 2,
                    color: isActive.value ? "text-dark" : "text-base",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("span", null, toDisplayString(unref(locale).baseText("executionDetails.at")) + " " + toDisplayString(unref(toTime)(_ctx.execution.createdAt)), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])) : executionUIDetails.value.runningTime !== "" ? (openBlock(), createBlock(_component_N8nText, {
                    key: 3,
                    color: isActive.value ? "text-dark" : "text-base",
                    size: "small"
                  }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createTextVNode(toDisplayString(unref(locale).baseText("executionDetails.runningTimeFinished", {
                          interpolate: { time: (_a2 = executionUIDetails.value) == null ? void 0 : _a2.runningTime }
                        })), 1)
                      ];
                    }),
                    _: 1
                  }, 8, ["color"])) : createCommentVNode("", true)
                ], 2),
                _ctx.execution.mode === "retry" ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
                  createVNode(_component_N8nText, {
                    color: isActive.value ? "text-dark" : "text-base",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(locale).baseText("executionDetails.retry")) + " #" + toDisplayString(_ctx.execution.retryOf), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ])) : createCommentVNode("", true),
                isAnnotationEnabled.value ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass(_ctx.$style.annotation)
                }, [
                  ((_a = _ctx.execution.annotation) == null ? void 0 : _a.vote) ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(_ctx.$style.ratingIcon)
                  }, [
                    _ctx.execution.annotation.vote == "up" ? (openBlock(), createBlock(_component_FontAwesomeIcon, {
                      key: 0,
                      class: normalizeClass(_ctx.$style.up),
                      icon: "thumbs-up"
                    }, null, 8, ["class"])) : (openBlock(), createBlock(_component_FontAwesomeIcon, {
                      key: 1,
                      class: normalizeClass(_ctx.$style.down),
                      icon: "thumbs-down"
                    }, null, 8, ["class"]))
                  ], 2)) : createCommentVNode("", true),
                  executionUIDetails.value.tags.length > 0 ? (openBlock(), createBlock(_component_N8nTags, {
                    key: 1,
                    tags: executionUIDetails.value.tags,
                    clickable: false
                  }, null, 8, ["tags"])) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.icons)
              }, [
                isRetriable.value ? (openBlock(), createBlock(_component_N8nActionDropdown, {
                  key: 0,
                  class: normalizeClass([_ctx.$style.icon, _ctx.$style.retry]),
                  items: retryExecutionActions.value,
                  disabled: !_ctx.workflowPermissions.execute,
                  "activator-icon": "redo",
                  "data-test-id": "retry-execution-button",
                  onSelect: onRetryMenuItemSelect
                }, null, 8, ["class", "items", "disabled"])) : createCommentVNode("", true),
                _ctx.execution.mode === "manual" ? (openBlock(), createBlock(_component_N8nTooltip, {
                  key: 1,
                  placement: "top"
                }, {
                  content: withCtx(() => [
                    createBaseVNode("span", null, toDisplayString(unref(locale).baseText("executionsList.test")), 1)
                  ]),
                  default: withCtx(() => [
                    _ctx.execution.mode === "manual" ? (openBlock(), createBlock(_component_FontAwesomeIcon, {
                      key: 0,
                      class: normalizeClass([_ctx.$style.icon, _ctx.$style.manual]),
                      icon: "flask"
                    }, null, 8, ["class"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], 2)
            ];
          }),
          _: 1
        }, 8, ["class", "to", "data-test-execution-status"])
      ], 2);
    };
  }
});
const WorkflowExecutionsCard$1 = "_WorkflowExecutionsCard_1246h_1";
const active = "_active_1246h_8";
const executionStatus = "_executionStatus_1246h_11";
const executionLink = "_executionLink_1246h_14";
const spinner = "_spinner_1246h_17";
const running = "_running_1246h_17";
const statusLabel = "_statusLabel_1246h_24";
const success = "_success_1246h_29";
const waiting = "_waiting_1246h_38";
const error = "_error_1246h_44";
const unknown = "_unknown_1246h_50";
const annotation = "_annotation_1246h_53";
const ratingIcon = "_ratingIcon_1246h_60";
const up = "_up_1246h_60";
const down = "_down_1246h_63";
const icon = "_icon_1246h_80";
const icons = "_icons_1246h_85";
const retry = "_retry_1246h_93";
const manual = "_manual_1246h_96";
const showGap = "_showGap_1246h_104";
const style0$2 = {
  WorkflowExecutionsCard: WorkflowExecutionsCard$1,
  active,
  executionStatus,
  executionLink,
  "new": "_new_1246h_17",
  spinner,
  running,
  statusLabel,
  success,
  waiting,
  error,
  unknown,
  annotation,
  ratingIcon,
  up,
  down,
  icon,
  icons,
  retry,
  manual,
  showGap
};
const cssModules$2 = {
  "$style": style0$2
};
const WorkflowExecutionsCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$2]]);
const _hoisted_1 = {
  key: 0,
  class: "mr-l"
};
const _hoisted_2 = {
  key: 3,
  class: "mr-m"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowExecutionsSidebar",
  props: {
    workflow: {},
    executions: {},
    loading: { type: Boolean },
    loadingMore: { type: Boolean },
    temporaryExecution: {}
  },
  emits: ["retryExecution", "loadMore", "filterUpdated", "update:autoRefresh"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const route = useRoute();
    const router = useRouter();
    const executionsStore = useExecutionsStore();
    const mountedItems = ref([]);
    const autoScrollDeps = ref({
      activeExecutionSet: false,
      cardsMounted: false,
      scroll: true
    });
    const currentWorkflowExecutionsCardRefs = ref({});
    const sidebarContainerRef = ref(null);
    const executionListRef = ref(null);
    const workflowPermissions = computed(() => {
      var _a;
      return getResourcePermissions((_a = props.workflow) == null ? void 0 : _a.scopes).workflow;
    });
    watch(
      () => route,
      (to, from) => {
        if (from.name === VIEWS.EXECUTION_PREVIEW && to.name === VIEWS.EXECUTION_HOME) {
          router.go(-1);
        }
      }
    );
    watch(
      () => executionsStore.activeExecution,
      (newValue, oldValue) => {
        if (newValue && newValue.id !== (oldValue == null ? void 0 : oldValue.id)) {
          autoScrollDeps.value.activeExecutionSet = true;
        }
      }
    );
    watch(
      autoScrollDeps,
      (updatedDeps) => {
        if (Object.values(updatedDeps).every(Boolean)) {
          scrollToActiveCard();
        }
      },
      { deep: true }
    );
    function addCurrentWorkflowExecutionsCardRef(comp, id) {
      if (comp && isComponentPublicInstance(comp) && id) {
        currentWorkflowExecutionsCardRefs.value[id] = comp;
      }
    }
    function onItemMounted(id) {
      var _a;
      mountedItems.value.push(id);
      if (mountedItems.value.length === props.executions.length) {
        autoScrollDeps.value.cardsMounted = true;
        checkListSize();
      }
      if (((_a = executionsStore.activeExecution) == null ? void 0 : _a.id) === id) {
        autoScrollDeps.value.activeExecutionSet = true;
      }
    }
    function loadMore(limit = 20) {
      if (!props.loading) {
        if (executionListRef.value) {
          const diff = executionListRef.value.offsetHeight - (executionListRef.value.scrollHeight - executionListRef.value.scrollTop);
          if (diff > -10 && diff < 10) {
            emit("loadMore", limit);
          }
        }
      }
    }
    function onRetryExecution(payload) {
      emit("retryExecution", payload);
    }
    function onFilterChanged(filter) {
      autoScrollDeps.value.activeExecutionSet = false;
      autoScrollDeps.value.scroll = true;
      mountedItems.value = [];
      emit("filterUpdated", filter);
    }
    function onAutoRefreshChange(enabled) {
      emit("update:autoRefresh", enabled);
    }
    function checkListSize() {
      const cards = Object.values(currentWorkflowExecutionsCardRefs.value);
      if (sidebarContainerRef.value && cards.length) {
        const cardElement = cards[0].$el;
        const listCapacity = Math.ceil(
          sidebarContainerRef.value.clientHeight / cardElement.clientHeight
        );
        if (listCapacity > props.executions.length) {
          emit("loadMore", listCapacity - props.executions.length);
        }
      }
    }
    function scrollToActiveCard() {
      if (executionListRef.value && executionsStore.activeExecution && currentWorkflowExecutionsCardRefs.value[executionsStore.activeExecution.id]) {
        const cardElement = currentWorkflowExecutionsCardRefs.value[executionsStore.activeExecution.id].$el;
        const cardRect = cardElement.getBoundingClientRect();
        const LIST_HEADER_OFFSET = 200;
        if (cardRect.top > executionListRef.value.offsetHeight) {
          autoScrollDeps.value.scroll = false;
          executionListRef.value.scrollTo({
            top: cardRect.top - LIST_HEADER_OFFSET,
            behavior: "smooth"
          });
        }
      }
    }
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_n8n_text = resolveComponent("n8n-text");
      return openBlock(), createElementBlock("div", {
        ref_key: "sidebarContainerRef",
        ref: sidebarContainerRef,
        class: normalizeClass(["executions-sidebar", _ctx.$style.container]),
        "data-test-id": "executions-sidebar"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.heading)
        }, [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            size: "medium",
            color: "text-dark"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("generic.executions")), 1)
            ]),
            _: 1
          })
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.controls)
        }, [
          createVNode(_component_el_checkbox, {
            modelValue: unref(executionsStore).autoRefresh,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => unref(executionsStore).autoRefresh = $event),
              onAutoRefreshChange
            ],
            "data-test-id": "auto-refresh-checkbox"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsList.autoRefresh")), 1)
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(ExecutionsFilter, {
            "popover-placement": "left-start",
            onFilterChanged
          })
        ], 2),
        createBaseVNode("div", {
          ref_key: "executionListRef",
          ref: executionListRef,
          class: normalizeClass(_ctx.$style.executionList),
          "data-test-id": "current-executions-list",
          onScroll: _cache[1] || (_cache[1] = ($event) => loadMore(20))
        }, [
          _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(_component_n8n_loading, { variant: "rect" })
          ])) : createCommentVNode("", true),
          !_ctx.loading && _ctx.executions.length === 0 ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.$style.noResultsContainer),
            "data-test-id": "execution-list-empty"
          }, [
            createVNode(_component_n8n_text, {
              color: "text-base",
              size: "medium",
              align: "center"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$locale.baseText("executionsLandingPage.noResults")), 1)
              ]),
              _: 1
            })
          ], 2)) : _ctx.temporaryExecution ? (openBlock(), createBlock(WorkflowExecutionsCard, {
            key: 2,
            ref: (el) => {
              var _a;
              return addCurrentWorkflowExecutionsCardRef(el, (_a = _ctx.temporaryExecution) == null ? void 0 : _a.id);
            },
            execution: _ctx.temporaryExecution,
            "data-test-id": `execution-details-${_ctx.temporaryExecution.id}`,
            "show-gap": true,
            "workflow-permissions": workflowPermissions.value,
            onRetryExecution
          }, null, 8, ["execution", "data-test-id", "workflow-permissions"])) : createCommentVNode("", true),
          createVNode(TransitionGroup, { name: "executions-list" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.executions, (execution) => {
                return openBlock(), createBlock(WorkflowExecutionsCard, {
                  key: execution.id,
                  ref_for: true,
                  ref: (el) => addCurrentWorkflowExecutionsCardRef(el, execution.id),
                  execution,
                  "workflow-permissions": workflowPermissions.value,
                  "data-test-id": `execution-details-${execution.id}`,
                  onRetryExecution,
                  onMounted: onItemMounted
                }, null, 8, ["execution", "workflow-permissions", "data-test-id"]);
              }), 128))
            ]),
            _: 1
          }),
          _ctx.loadingMore ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(_component_n8n_loading, {
              variant: "p",
              rows: 1
            })
          ])) : createCommentVNode("", true)
        ], 34),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.infoAccordion)
        }, [
          createVNode(WorkflowExecutionsInfoAccordion, { "initially-expanded": false })
        ], 2)
      ], 2);
    };
  }
});
const container$1 = "_container_qg8we_1";
const heading = "_heading_qg8we_12";
const controls = "_controls_qg8we_19";
const executionList = "_executionList_qg8we_31";
const infoAccordion = "_infoAccordion_qg8we_49";
const noResultsContainer = "_noResultsContainer_qg8we_61";
const style0$1 = {
  container: container$1,
  heading,
  controls,
  executionList,
  infoAccordion,
  noResultsContainer
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkflowExecutionsSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$1], ["__scopeId", "data-v-411abc8c"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowExecutionsList",
  props: {
    loading: { type: Boolean, default: false },
    workflow: {},
    executions: { default: () => [] },
    execution: {},
    loadingMore: { type: Boolean, default: false }
  },
  emits: ["execution:delete", "execution:stop", "execution:retry", "update:auto-refresh", "update:filters", "load-more", "reload"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const workflowHelpers = useWorkflowHelpers({ router: useRouter() });
    const router = useRouter();
    const temporaryExecution = computed(
      () => props.executions.find((execution) => {
        var _a;
        return execution.id === ((_a = props.execution) == null ? void 0 : _a.id);
      }) ? void 0 : props.execution ?? void 0
    );
    const hidePreview = computed(() => {
      return props.loading || !props.execution && props.executions.length;
    });
    const onDeleteCurrentExecution = () => {
      var _a;
      if (!((_a = props.execution) == null ? void 0 : _a.id)) return;
      emit("execution:delete", props.execution.id);
    };
    const onStopExecution = () => {
      var _a;
      if (!((_a = props.execution) == null ? void 0 : _a.id)) return;
      emit("execution:stop", props.execution.id);
    };
    const onRetryExecution = (payload) => {
      const loadWorkflow = payload.command === "current-workflow";
      emit("execution:retry", {
        id: payload.execution.id,
        loadWorkflow
      });
    };
    watch(
      () => props.execution,
      (value) => {
        if (!value) {
          return;
        }
        router.push({
          name: VIEWS.EXECUTION_PREVIEW,
          params: { name: props.workflow.id, executionId: value.id }
        }).catch(() => {
        });
      }
    );
    onBeforeRouteLeave(async (to, _, next) => {
      if (getNodeViewTab(to) === MAIN_HEADER_TABS.WORKFLOW) {
        next();
        return;
      }
      await workflowHelpers.promptSaveUnsavedWorkflowChanges(next);
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createVNode(WorkflowExecutionsSidebar, {
          executions: _ctx.executions,
          loading: _ctx.loading && !_ctx.executions.length,
          "loading-more": _ctx.loadingMore,
          "temporary-execution": temporaryExecution.value,
          workflow: _ctx.workflow,
          "onUpdate:autoRefresh": _cache[0] || (_cache[0] = ($event) => emit("update:auto-refresh", $event)),
          onReloadExecutions: _cache[1] || (_cache[1] = ($event) => emit("reload")),
          onFilterUpdated: _cache[2] || (_cache[2] = ($event) => emit("update:filters", $event)),
          onLoadMore: _cache[3] || (_cache[3] = ($event) => emit("load-more")),
          onRetryExecution
        }, null, 8, ["executions", "loading", "loading-more", "temporary-execution", "workflow"]),
        !hidePreview.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.content)
        }, [
          createVNode(_component_router_view, {
            name: "executionPreview",
            execution: _ctx.execution,
            onDeleteCurrentExecution,
            onRetryExecution,
            onStopExecution
          }, null, 8, ["execution"])
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const container = "_container_16o1g_1";
const content = "_content_16o1g_7";
const style0 = {
  container,
  content
};
const cssModules = {
  "$style": style0
};
const WorkflowExecutionsList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowExecutionsView",
  setup(__props) {
    const executionsStore = useExecutionsStore();
    const workflowsStore = useWorkflowsStore();
    const nodeTypesStore = useNodeTypesStore();
    const i18n = useI18n();
    const telemetry = useTelemetry();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const { callDebounced } = useDebounce();
    const workflowHelpers = useWorkflowHelpers({ router });
    const nodeHelpers = useNodeHelpers();
    const loading = ref(false);
    const loadingMore = ref(false);
    const workflow = ref();
    const workflowId = computed(() => {
      const workflowIdParam = route.params.name;
      return [PLACEHOLDER_EMPTY_WORKFLOW_ID, NEW_WORKFLOW_ID].includes(workflowIdParam) ? void 0 : workflowIdParam;
    });
    const executionId = computed(() => route.params.executionId);
    const executions = computed(
      () => workflowId.value ? [
        ...executionsStore.currentExecutionsByWorkflowId[workflowId.value] ?? [],
        ...executionsStore.executionsByWorkflowId[workflowId.value] ?? []
      ] : []
    );
    const execution = computed(() => {
      return executions.value.find((e) => e.id === executionId.value) ?? currentExecution.value;
    });
    const currentExecution = ref();
    watch(
      () => workflowId.value,
      async () => {
        await fetchWorkflow();
      }
    );
    watch(
      () => executionId.value,
      async () => {
        await fetchExecution();
      }
    );
    onMounted(async () => {
      await Promise.all([nodeTypesStore.loadNodeTypesIfNotLoaded(), fetchWorkflow()]);
      if (workflowId.value) {
        await Promise.all([executionsStore.initialize(workflowId.value), fetchExecution()]);
      }
      await initializeRoute();
      document.addEventListener("visibilitychange", onDocumentVisibilityChange);
    });
    onBeforeUnmount(() => {
      executionsStore.reset();
      document.removeEventListener("visibilitychange", onDocumentVisibilityChange);
    });
    async function fetchExecution() {
      if (!executionId.value) {
        return;
      }
      try {
        currentExecution.value = await executionsStore.fetchExecution(
          executionId.value
        );
        executionsStore.activeExecution = currentExecution.value;
      } catch (error2) {
        toast.showError(error2, i18n.baseText("nodeView.showError.openExecution.title"));
      }
    }
    function onDocumentVisibilityChange() {
      if (document.visibilityState === "hidden") {
        executionsStore.stopAutoRefreshInterval();
      } else {
        void executionsStore.startAutoRefreshInterval(workflowId.value);
      }
    }
    async function initializeRoute() {
      if (route.name === VIEWS.EXECUTION_HOME && executions.value.length > 0 && workflow.value) {
        await router.replace({
          name: VIEWS.EXECUTION_PREVIEW,
          params: { name: workflow.value.id, executionId: executions.value[0].id }
        }).catch(() => {
        });
      }
    }
    async function fetchWorkflow() {
      if (workflowId.value) {
        if (workflowsStore.workflow.id === PLACEHOLDER_EMPTY_WORKFLOW_ID) {
          try {
            await workflowsStore.fetchActiveWorkflows();
            const data = await workflowsStore.fetchWorkflow(workflowId.value);
            workflowHelpers.initState(data);
            await nodeHelpers.addNodes(data.nodes, data.connections);
          } catch (error2) {
            toast.showError(error2, i18n.baseText("nodeView.showError.openWorkflow.title"));
          }
        }
        workflow.value = workflowsStore.getWorkflowById(workflowId.value);
      } else {
        workflow.value = workflowsStore.workflow;
      }
    }
    async function onAutoRefreshToggle(value) {
      if (value) {
        await executionsStore.startAutoRefreshInterval(workflowId.value);
      } else {
        executionsStore.stopAutoRefreshInterval();
      }
    }
    async function onRefreshData() {
      if (!workflowId.value) {
        return;
      }
      try {
        await executionsStore.fetchExecutions({
          ...executionsStore.executionsFilters,
          workflowId: workflowId.value
        });
      } catch (error2) {
        if (error2.errorCode === NO_NETWORK_ERROR_CODE) {
          toast.showMessage(
            {
              title: i18n.baseText("executionsList.showError.refreshData.title"),
              message: error2.message,
              type: "error",
              duration: 3500
            },
            false
          );
        } else {
          toast.showError(error2, i18n.baseText("executionsList.showError.refreshData.title"));
        }
      }
    }
    async function onUpdateFilters(newFilters) {
      executionsStore.reset();
      executionsStore.setFilters(newFilters);
      await executionsStore.initialize(workflowId.value);
    }
    async function onExecutionStop(id) {
      if (!id) {
        return;
      }
      try {
        await executionsStore.stopCurrentExecution(id);
        toast.showMessage({
          title: i18n.baseText("executionsList.showMessage.stopExecution.title"),
          message: i18n.baseText("executionsList.showMessage.stopExecution.message", {
            interpolate: { activeExecutionId: id }
          }),
          type: "success"
        });
        await onRefreshData();
      } catch (error2) {
        toast.showError(error2, i18n.baseText("executionsList.showError.stopExecution.title"));
      }
    }
    async function onExecutionDelete(id) {
      if (!id) {
        return;
      }
      loading.value = true;
      try {
        const executionIndex = executions.value.findIndex((e) => e.id === id);
        const nextExecution = executions.value[executionIndex + 1] || executions.value[executionIndex - 1] || executions.value[0];
        await executionsStore.deleteExecutions({
          ids: [id]
        });
        if (workflow.value) {
          if (executions.value.length > 0) {
            await router.replace({
              name: VIEWS.EXECUTION_PREVIEW,
              params: { name: workflow.value.id, executionId: nextExecution.id }
            }).catch(() => {
            });
          } else {
            await router.replace({
              name: VIEWS.EXECUTION_HOME,
              params: { name: workflow.value.id }
            });
          }
        }
      } catch (error2) {
        loading.value = false;
        toast.showError(error2, i18n.baseText("executionsList.showError.handleDeleteSelected.title"));
        return;
      }
      loading.value = false;
      toast.showMessage({
        title: i18n.baseText("executionsList.showMessage.handleDeleteSelected.title"),
        type: "success"
      });
    }
    async function onExecutionRetry(payload) {
      var _a;
      toast.showMessage({
        title: i18n.baseText("executionDetails.runningMessage"),
        type: "info",
        duration: 2e3
      });
      await retryExecution(payload);
      await onRefreshData();
      telemetry.track("User clicked retry execution button", {
        workflow_id: (_a = workflow.value) == null ? void 0 : _a.id,
        execution_id: payload.id,
        retry_type: payload.loadWorkflow ? "current" : "original"
      });
    }
    async function retryExecution(payload) {
      try {
        const retrySuccessful = await executionsStore.retryExecution(payload.id, payload.loadWorkflow);
        if (retrySuccessful) {
          toast.showMessage({
            title: i18n.baseText("executionsList.showMessage.retrySuccessfulTrue.title"),
            type: "success"
          });
        } else {
          toast.showMessage({
            title: i18n.baseText("executionsList.showMessage.retrySuccessfulFalse.title"),
            type: "error"
          });
        }
      } catch (error2) {
        toast.showError(error2, i18n.baseText("executionsList.showError.retryExecution.title"));
      }
    }
    async function onLoadMore() {
      if (!loadingMore.value) {
        await callDebounced(loadMore, { debounceTime: 1e3 });
      }
    }
    async function loadMore() {
      var _a;
      if (!!((_a = executionsStore.executionsFilters.status) == null ? void 0 : _a.includes("running")) || executions.value.length >= executionsStore.executionsCount) {
        return;
      }
      loadingMore.value = true;
      let lastId;
      if (executions.value.length !== 0) {
        const lastItem = executions.value.slice(-1)[0];
        lastId = lastItem.id;
      }
      try {
        await executionsStore.fetchExecutions(executionsStore.executionsFilters, lastId);
      } catch (error2) {
        loadingMore.value = false;
        toast.showError(error2, i18n.baseText("executionsList.showError.loadMore.title"));
        return;
      }
      loadingMore.value = false;
    }
    return (_ctx, _cache) => {
      return workflow.value ? (openBlock(), createBlock(WorkflowExecutionsList, {
        key: 0,
        executions: executions.value,
        execution: execution.value,
        workflow: workflow.value,
        loading: loading.value,
        "loading-more": loadingMore.value,
        "onExecution:stop": onExecutionStop,
        "onExecution:delete": onExecutionDelete,
        "onExecution:retry": onExecutionRetry,
        "onUpdate:filters": onUpdateFilters,
        "onUpdate:autoRefresh": onAutoRefreshToggle,
        onLoadMore,
        onReload: onRefreshData
      }, null, 8, ["executions", "execution", "workflow", "loading", "loading-more"])) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
