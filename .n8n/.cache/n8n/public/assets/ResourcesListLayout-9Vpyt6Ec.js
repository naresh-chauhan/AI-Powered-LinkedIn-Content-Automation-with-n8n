import { _ as _export_sfc, c as openBlock, h as createElementBlock, q as renderSlot, j as createBaseVNode, n as normalizeClass, d as defineComponent, f as createCommentVNode, r as ref, a1 as useProjectsStore, p as computed, H as watch, av as onBeforeMount, e as createBlock, w as withCtx, i as createVNode, aw as withDirectives, ax as vShow, k as createTextVNode, t as toDisplayString, A as unref, a8 as EnterpriseEditionFeature, j7 as ProjectSharing, g as useI18n, l as resolveComponent, U as useRoute, J as useDebounce, u as useUsersStore, o as onMounted, x as nextTick, aQ as normalizeProps, aR as guardReactiveProps, F as Fragment, z as renderList, ak as useTelemetry } from "./index-40I5DMGP.js";
const wrapper$1 = "_wrapper_179di_1";
const content = "_content_179di_12";
const style0$3 = {
  wrapper: wrapper$1,
  content
};
const _sfc_main$3 = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.wrapper)
  }, [
    renderSlot(_ctx.$slots, "header"),
    createBaseVNode("main", {
      class: normalizeClass(_ctx.$style.content)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ], 2);
}
const cssModules$3 = {
  "$style": style0$3
};
const PageViewLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__cssModules", cssModules$3]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PageViewLayoutList",
  props: {
    overflow: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ [_ctx.$style.wrapper]: true, [_ctx.$style.overflow]: _ctx.overflow })
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.list)
        }, [
          _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.header)
          }, [
            renderSlot(_ctx.$slots, "header")
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.body)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ], 2)
      ], 2);
    };
  }
});
const wrapper = "_wrapper_183my_1";
const overflow = "_overflow_183my_6";
const list = "_list_183my_6";
const body = "_body_183my_6";
const style0$2 = {
  wrapper,
  overflow,
  list,
  body
};
const cssModules$2 = {
  "$style": style0$2
};
const PageViewLayoutList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ResourceFiltersDropdown",
  props: {
    modelValue: { default: () => ({}) },
    keys: { default: () => [] },
    shareable: { type: Boolean, default: true },
    reset: { type: Function, default: () => {
    } }
  },
  emits: ["update:modelValue", "update:filtersLength"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedProject = ref(null);
    const projectsStore = useProjectsStore();
    const i18n = useI18n();
    const filtersLength = computed(() => {
      let length = 0;
      props.keys.forEach((key) => {
        if (key === "search") {
          return;
        }
        const value = props.modelValue[key];
        length += (Array.isArray(value) ? value.length > 0 : value !== "") ? 1 : 0;
      });
      return length;
    });
    const hasFilters = computed(() => filtersLength.value > 0);
    const setKeyValue = (key, value) => {
      const filters2 = {
        ...props.modelValue,
        [key]: value
      };
      emit("update:modelValue", filters2);
    };
    const resetFilters = () => {
      if (props.reset) {
        props.reset();
      } else {
        const filters2 = { ...props.modelValue };
        props.keys.forEach((key) => {
          filters2[key] = Array.isArray(props.modelValue[key]) ? [] : "";
        });
        emit("update:modelValue", filters2);
      }
      selectedProject.value = null;
    };
    watch(filtersLength, (value) => {
      emit("update:filtersLength", value);
    });
    onBeforeMount(async () => {
      await projectsStore.getAvailableProjects();
      selectedProject.value = projectsStore.availableProjects.find(
        (project) => project.id === props.modelValue.homeProject
      ) ?? null;
    });
    return (_ctx, _cache) => {
      const _component_n8n_badge = resolveComponent("n8n-badge");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_input_label = resolveComponent("n8n-input-label");
      const _component_enterprise_edition = resolveComponent("enterprise-edition");
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_popover = resolveComponent("n8n-popover");
      return openBlock(), createBlock(_component_n8n_popover, {
        trigger: "click",
        width: "304",
        size: "large"
      }, {
        reference: withCtx(() => [
          createVNode(_component_n8n_button, {
            icon: "filter",
            type: "tertiary",
            active: hasFilters.value,
            class: normalizeClass(_ctx.$style["filter-button"]),
            "data-test-id": "resources-list-filters-trigger"
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(_component_n8n_badge, {
                theme: "primary",
                class: "mr-4xs"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(filtersLength.value), 1)
                ]),
                _: 1
              }, 512), [
                [vShow, filtersLength.value > 0]
              ]),
              createTextVNode(" " + toDisplayString(unref(i18n).baseText("forms.resourceFiltersDropdown.filters")), 1)
            ]),
            _: 1
          }, 8, ["active", "class"])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style["filters-dropdown"]),
            "data-test-id": "resources-list-filters-dropdown"
          }, [
            renderSlot(_ctx.$slots, "default", {
              filters: _ctx.modelValue,
              setKeyValue
            }),
            _ctx.shareable && unref(projectsStore).isProjectHome ? (openBlock(), createBlock(_component_enterprise_edition, {
              key: 0,
              features: [unref(EnterpriseEditionFeature).Sharing]
            }, {
              default: withCtx(() => [
                createVNode(_component_n8n_input_label, {
                  label: unref(i18n).baseText("forms.resourceFiltersDropdown.owner"),
                  bold: false,
                  size: "small",
                  color: "text-base",
                  class: "mb-3xs"
                }, null, 8, ["label"]),
                createVNode(ProjectSharing, {
                  modelValue: selectedProject.value,
                  "onUpdate:modelValue": [
                    _cache[0] || (_cache[0] = ($event) => selectedProject.value = $event),
                    _cache[1] || (_cache[1] = ($event) => setKeyValue("homeProject", $event.id))
                  ],
                  projects: unref(projectsStore).availableProjects,
                  placeholder: unref(i18n).baseText("forms.resourceFiltersDropdown.owner.placeholder"),
                  "empty-options-text": unref(i18n).baseText("projects.sharing.noMatchingProjects")
                }, null, 8, ["modelValue", "projects", "placeholder", "empty-options-text"])
              ]),
              _: 1
            }, 8, ["features"])) : createCommentVNode("", true),
            hasFilters.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass([_ctx.$style["filters-dropdown-footer"], "mt-s"])
            }, [
              createVNode(_component_n8n_link, { onClick: resetFilters }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n).baseText("forms.resourceFiltersDropdown.reset")), 1)
                ]),
                _: 1
              })
            ], 2)) : createCommentVNode("", true)
          ], 2)
        ]),
        _: 3
      });
    };
  }
});
const style0$1 = {
  "filter-button": "_filter-button_i7gly_1",
  "filters-dropdown": "_filters-dropdown_i7gly_6",
  "filters-dropdown-footer": "_filters-dropdown-footer_i7gly_10"
};
const cssModules$1 = {
  "$style": style0$1
};
const ResourceFiltersDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = {
  key: 0,
  class: "resource-list-loading"
};
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 0,
  class: "mt-xs"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResourcesListLayout",
  props: {
    resourceKey: {},
    displayName: { type: Function, default: (resource) => resource.name },
    resources: {},
    disabled: { type: Boolean },
    initialize: { type: Function, default: async () => {
    } },
    filters: { default: () => ({ search: "", homeProject: "" }) },
    additionalFiltersHandler: { type: Function, default: void 0 },
    shareable: { type: Boolean, default: true },
    showFiltersDropdown: { type: Boolean, default: true },
    sortFns: { default: () => ({}) },
    sortOptions: { default: () => ["lastUpdated", "lastCreated", "nameAsc", "nameDesc"] },
    type: { default: "list" },
    typeProps: { default: () => ({ itemSize: 80 }) },
    loading: { type: Boolean, default: true }
  },
  emits: ["update:filters", "click:add", "sort"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const route = useRoute();
    const i18n = useI18n();
    const { callDebounced } = useDebounce();
    const usersStore = useUsersStore();
    const telemetry = useTelemetry();
    const sortBy = ref(props.sortOptions[0]);
    const hasFilters = ref(false);
    const filtersModel = ref(props.filters);
    const currentPage = ref(1);
    const rowsPerPage = ref(10);
    const resettingFilters = ref(false);
    const search2 = ref(null);
    const filterKeys = computed(() => {
      return Object.keys(filtersModel.value);
    });
    const filteredAndSortedResources = computed(() => {
      const filtered = props.resources.filter((resource) => {
        let matches = true;
        if (filtersModel.value.homeProject) {
          matches = matches && !!(resource.homeProject && resource.homeProject.id === filtersModel.value.homeProject);
        }
        if (filtersModel.value.search) {
          const searchString = filtersModel.value.search.toLowerCase();
          matches = matches && props.displayName(resource).toLowerCase().includes(searchString);
        }
        if (props.additionalFiltersHandler) {
          matches = props.additionalFiltersHandler(resource, filtersModel.value, matches);
        }
        return matches;
      });
      return filtered.sort((a, b) => {
        switch (sortBy.value) {
          case "lastUpdated":
            return props.sortFns.lastUpdated ? props.sortFns.lastUpdated(a, b) : new Date(b.updatedAt ?? "").valueOf() - new Date(a.updatedAt ?? "").valueOf();
          case "lastCreated":
            return props.sortFns.lastCreated ? props.sortFns.lastCreated(a, b) : new Date(b.createdAt ?? "").valueOf() - new Date(a.createdAt ?? "").valueOf();
          case "nameAsc":
            return props.sortFns.nameAsc ? props.sortFns.nameAsc(a, b) : props.displayName(a).trim().localeCompare(props.displayName(b).trim());
          case "nameDesc":
            return props.sortFns.nameDesc ? props.sortFns.nameDesc(a, b) : props.displayName(b).trim().localeCompare(props.displayName(a).trim());
          default:
            return props.sortFns[sortBy.value] ? props.sortFns[sortBy.value](a, b) : 0;
        }
      });
    });
    const focusSearchInput = () => {
      if (search2.value) {
        search2.value.focus();
      }
    };
    const hasAppliedFilters = () => {
      return !!filterKeys.value.find(
        (key) => key !== "search" && (Array.isArray(props.filters[key]) ? props.filters[key].length > 0 : props.filters[key] !== "")
      );
    };
    const setRowsPerPage = (numberOfRowsPerPage) => {
      rowsPerPage.value = numberOfRowsPerPage;
    };
    const setCurrentPage = (page) => {
      currentPage.value = page;
    };
    __expose({
      currentPage,
      setCurrentPage
    });
    const sendFiltersTelemetry = (source) => {
      if (resettingFilters.value) {
        if (source !== "reset") {
          return;
        }
        setTimeout(() => resettingFilters.value = false, 1500);
      }
      const filters2 = filtersModel.value;
      const filtersSet = [];
      const filterValues = [];
      Object.keys(filters2).forEach((key) => {
        if (filters2[key]) {
          filtersSet.push(key);
          filterValues.push(key === "search" ? null : filters2[key]);
        }
      });
      telemetry.track(`User set filters in ${props.resourceKey} list`, {
        filters_set: filtersSet,
        filter_values: filterValues,
        [`${props.resourceKey}_total_in_view`]: props.resources.length,
        [`${props.resourceKey}_after_filtering`]: filteredAndSortedResources.value.length
      });
    };
    const onAddButtonClick = (e) => {
      emit("click:add", e);
    };
    const onUpdateFilters = (e) => {
      emit("update:filters", e);
    };
    const resetFilters = () => {
      Object.keys(filtersModel.value).forEach((key) => {
        filtersModel.value[key] = Array.isArray(filtersModel.value[key]) ? [] : "";
      });
      resettingFilters.value = true;
      sendFiltersTelemetry("reset");
      emit("update:filters", filtersModel.value);
    };
    const itemSize = () => {
      if ("itemSize" in props.typeProps) {
        return props.typeProps.itemSize;
      }
      return 0;
    };
    const getColumns = () => {
      if ("columns" in props.typeProps) {
        return props.typeProps.columns;
      }
      return {};
    };
    const sendSortingTelemetry = () => {
      telemetry.track(`User changed sorting in ${props.resourceKey} list`, {
        sorting: sortBy.value
      });
    };
    const onUpdateFiltersLength = (length) => {
      hasFilters.value = length > 0;
    };
    const onSearch = (s) => {
      filtersModel.value.search = s;
      emit("update:filters", filtersModel.value);
    };
    watch(
      () => props.filters,
      (value) => {
        filtersModel.value = value;
      }
    );
    watch(
      () => filtersModel.value.homeProject,
      () => {
        sendFiltersTelemetry("homeProject");
      }
    );
    watch(
      () => filtersModel.value.tags,
      () => {
        sendFiltersTelemetry("tags");
      }
    );
    watch(
      () => filtersModel.value.type,
      () => {
        sendFiltersTelemetry("type");
      }
    );
    watch(
      () => filtersModel.value.search,
      () => callDebounced(sendFiltersTelemetry, { debounceTime: 1e3, trailing: true }, "search")
    );
    watch(
      () => sortBy.value,
      (newValue) => {
        emit("sort", newValue);
        sendSortingTelemetry();
      }
    );
    watch(
      () => {
        var _a;
        return (_a = route == null ? void 0 : route.params) == null ? void 0 : _a.projectId;
      },
      () => {
        resetFilters();
      }
    );
    onMounted(async () => {
      await props.initialize();
      await nextTick();
      focusSearchInput();
      if (hasAppliedFilters()) {
        hasFilters.value = true;
      }
    });
    return (_ctx, _cache) => {
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_n8n_action_box = resolveComponent("n8n-action-box");
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_input = resolveComponent("n8n-input");
      const _component_n8n_option = resolveComponent("n8n-option");
      const _component_n8n_select = resolveComponent("n8n-select");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_info_tip = resolveComponent("n8n-info-tip");
      const _component_n8n_recycle_scroller = resolveComponent("n8n-recycle-scroller");
      const _component_n8n_datatable = resolveComponent("n8n-datatable");
      const _component_n8n_text = resolveComponent("n8n-text");
      return openBlock(), createBlock(PageViewLayout, null, {
        header: withCtx(() => [
          renderSlot(_ctx.$slots, "header", {}, void 0, true)
        ]),
        default: withCtx(() => [
          _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(_component_n8n_loading, {
              rows: 25,
              "shrink-last": false
            })
          ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            _ctx.resources.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "empty", {}, () => {
                var _a, _b;
                return [
                  createVNode(_component_n8n_action_box, {
                    "data-test-id": "empty-resources-list",
                    emoji: "👋",
                    heading: unref(i18n).baseText(
                      ((_a = unref(usersStore).currentUser) == null ? void 0 : _a.firstName) ? `${_ctx.resourceKey}.empty.heading` : `${_ctx.resourceKey}.empty.heading.userNotSetup`,
                      {
                        interpolate: { name: ((_b = unref(usersStore).currentUser) == null ? void 0 : _b.firstName) ?? "" }
                      }
                    ),
                    description: unref(i18n).baseText(`${_ctx.resourceKey}.empty.description`),
                    "button-text": unref(i18n).baseText(`${_ctx.resourceKey}.empty.button`),
                    "button-type": "secondary",
                    "button-disabled": _ctx.disabled,
                    "onClick:button": onAddButtonClick
                  }, {
                    disabledButtonTooltip: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText(`${_ctx.resourceKey}.empty.button.disabled.tooltip`)), 1)
                    ]),
                    _: 1
                  }, 8, ["heading", "description", "button-text", "button-disabled"])
                ];
              }, true)
            ])) : (openBlock(), createBlock(PageViewLayoutList, {
              key: 1,
              overflow: _ctx.type !== "list"
            }, {
              header: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["filters-row"])
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(_ctx.$style.filters)
                  }, [
                    createVNode(_component_n8n_input, {
                      ref_key: "search",
                      ref: search2,
                      "model-value": filtersModel.value.search,
                      class: normalizeClass([_ctx.$style["search"], "mr-2xs"]),
                      placeholder: unref(i18n).baseText(`${_ctx.resourceKey}.search.placeholder`),
                      clearable: "",
                      "data-test-id": "resources-list-search",
                      "onUpdate:modelValue": onSearch
                    }, {
                      prefix: withCtx(() => [
                        createVNode(_component_n8n_icon, { icon: "search" })
                      ]),
                      _: 1
                    }, 8, ["model-value", "class", "placeholder"]),
                    _ctx.showFiltersDropdown ? (openBlock(), createBlock(ResourceFiltersDropdown, {
                      key: 0,
                      keys: filterKeys.value,
                      reset: resetFilters,
                      "model-value": filtersModel.value,
                      shareable: _ctx.shareable,
                      "onUpdate:modelValue": onUpdateFilters,
                      "onUpdate:filtersLength": onUpdateFiltersLength
                    }, {
                      default: withCtx((resourceFiltersSlotProps) => [
                        renderSlot(_ctx.$slots, "filters", normalizeProps(guardReactiveProps(resourceFiltersSlotProps)), void 0, true)
                      ]),
                      _: 3
                    }, 8, ["keys", "model-value", "shareable"])) : createCommentVNode("", true),
                    createBaseVNode("div", {
                      class: normalizeClass(_ctx.$style["sort-and-filter"])
                    }, [
                      createVNode(_component_n8n_select, {
                        modelValue: sortBy.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => sortBy.value = $event),
                        "data-test-id": "resources-list-sort"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sortOptions, (sortOption) => {
                            return openBlock(), createBlock(_component_n8n_option, {
                              key: sortOption,
                              "data-test-id": "resources-list-sort-item",
                              value: sortOption,
                              label: unref(i18n).baseText(`${_ctx.resourceKey}.sort.${sortOption}`)
                            }, null, 8, ["value", "label"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 2)
                  ], 2),
                  renderSlot(_ctx.$slots, "add-button", { disabled: _ctx.disabled }, () => [
                    createVNode(_component_n8n_button, {
                      size: "large",
                      disabled: _ctx.disabled,
                      "data-test-id": "resources-list-add",
                      onClick: onAddButtonClick
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(i18n).baseText(`${_ctx.resourceKey}.add`)), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], true)
                ], 2),
                renderSlot(_ctx.$slots, "callout", {}, void 0, true),
                _ctx.showFiltersDropdown ? withDirectives((openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_component_n8n_info_tip, { bold: false }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText(`${_ctx.resourceKey}.filters.active`)) + " ", 1),
                      createVNode(_component_n8n_link, {
                        "data-test-id": "workflows-filter-reset",
                        size: "small",
                        onClick: resetFilters
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(i18n).baseText(`${_ctx.resourceKey}.filters.active.reset`)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ], 512)), [
                  [vShow, hasFilters.value]
                ]) : createCommentVNode("", true),
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "pb-xs" }, null, -1))
              ]),
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "preamble", {}, void 0, true),
                filteredAndSortedResources.value.length > 0 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  ref: "listWrapperRef",
                  class: normalizeClass(_ctx.$style.listWrapper)
                }, [
                  _ctx.type === "list" ? (openBlock(), createBlock(_component_n8n_recycle_scroller, {
                    key: 0,
                    "data-test-id": "resources-list",
                    items: filteredAndSortedResources.value,
                    "item-size": itemSize(),
                    "item-key": "id"
                  }, {
                    default: withCtx(({ item, updateItemSize }) => [
                      renderSlot(_ctx.$slots, "default", {
                        data: item,
                        updateItemSize
                      }, void 0, true)
                    ]),
                    _: 3
                  }, 8, ["items", "item-size"])) : createCommentVNode("", true),
                  _ctx.type === "datatable" ? (openBlock(), createBlock(_component_n8n_datatable, {
                    key: 1,
                    "data-test-id": "resources-table",
                    class: normalizeClass(_ctx.$style.datatable),
                    columns: getColumns(),
                    rows: filteredAndSortedResources.value,
                    "current-page": currentPage.value,
                    "rows-per-page": rowsPerPage.value,
                    "onUpdate:currentPage": setCurrentPage,
                    "onUpdate:rowsPerPage": setRowsPerPage
                  }, {
                    row: withCtx(({ columns, row }) => [
                      renderSlot(_ctx.$slots, "default", {
                        data: row,
                        columns
                      }, void 0, true)
                    ]),
                    _: 3
                  }, 8, ["class", "columns", "rows", "current-page", "rows-per-page"])) : createCommentVNode("", true)
                ], 2)) : (openBlock(), createBlock(_component_n8n_text, {
                  key: 1,
                  color: "text-base",
                  size: "medium",
                  "data-test-id": "resources-list-empty"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText(`${_ctx.resourceKey}.noResults`)), 1)
                  ]),
                  _: 1
                })),
                renderSlot(_ctx.$slots, "postamble", {}, void 0, true)
              ]),
              _: 3
            }, 8, ["overflow"]))
          ], 64))
        ]),
        _: 3
      });
    };
  }
});
const filters = "_filters_eysnt_1";
const search = "_search_eysnt_16";
const listWrapper = "_listWrapper_eysnt_20";
const datatable = "_datatable_eysnt_30";
const style0 = {
  "filters-row": "_filters-row_eysnt_1",
  filters,
  search,
  listWrapper,
  "sort-and-filter": "_sort-and-filter_eysnt_26",
  datatable
};
const cssModules = {
  "$style": style0
};
const ResourcesListLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules], ["__scopeId", "data-v-edd6a4a4"]]);
export {
  ResourcesListLayout as R
};
