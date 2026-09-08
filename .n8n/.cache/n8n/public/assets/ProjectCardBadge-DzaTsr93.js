import { d as defineComponent, p as computed, dZ as ProjectTypes, ji as splitName, l as resolveComponent, cD as resolveDirective, c as openBlock, e as createBlock, w as withCtx, k as createTextVNode, t as toDisplayString, j as createBaseVNode, n as normalizeClass, f as createCommentVNode, aw as withDirectives, h as createElementBlock, g as useI18n, _ as _export_sfc } from "./index-40I5DMGP.js";
const _hoisted_1 = { class: "mr-xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectCardBadge",
  props: {
    resource: {},
    resourceType: {},
    resourceTypeLabel: {},
    personalProject: {}
  },
  setup(__props) {
    const props = __props;
    const i18n = useI18n();
    const projectState = computed(() => {
      var _a, _b, _c, _d, _e;
      if (props.resource.homeProject && props.personalProject && props.resource.homeProject.id === props.personalProject.id || !props.resource.homeProject) {
        if ((_a = props.resource.sharedWithProjects) == null ? void 0 : _a.length) {
          return "shared-owned";
        }
        return "owned";
      } else if (((_b = props.resource.homeProject) == null ? void 0 : _b.type) !== ProjectTypes.Team) {
        if ((_c = props.resource.sharedWithProjects) == null ? void 0 : _c.length) {
          return "shared-personal";
        }
        return "personal";
      } else if (((_d = props.resource.homeProject) == null ? void 0 : _d.type) === ProjectTypes.Team) {
        if ((_e = props.resource.sharedWithProjects) == null ? void 0 : _e.length) {
          return "shared-team";
        }
        return "team";
      }
      return "unknown";
    });
    const numberOfMembersInHomeTeamProject = computed(
      () => {
        var _a;
        return ((_a = props.resource.sharedWithProjects) == null ? void 0 : _a.length) ?? 0;
      }
    );
    const badgeText = computed(() => {
      var _a;
      if (projectState.value === "owned" || projectState.value === "shared-owned") {
        return i18n.baseText("projects.menu.personal");
      } else {
        const { name, email } = splitName(((_a = props.resource.homeProject) == null ? void 0 : _a.name) ?? "");
        return name ?? email ?? "";
      }
    });
    const badgeIcon = computed(() => {
      switch (projectState.value) {
        case "owned":
        case "shared-owned":
          return "user";
        case "team":
        case "shared-team":
          return "layer-group";
        default:
          return "";
      }
    });
    const badgeTooltip = computed(() => {
      switch (projectState.value) {
        case "shared-owned":
          return i18n.baseText("projects.badge.tooltip.sharedOwned", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        case "shared-personal":
          return i18n.baseText("projects.badge.tooltip.sharedPersonal", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        case "personal":
          return i18n.baseText("projects.badge.tooltip.personal", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value
            }
          });
        case "team":
          return i18n.baseText("projects.badge.tooltip.team", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value
            }
          });
        case "shared-team":
          return i18n.baseText("projects.badge.tooltip.sharedTeam", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        default:
          return "";
      }
    });
    return (_ctx, _cache) => {
      const _component_N8nIcon = resolveComponent("N8nIcon");
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _directive_n8n_truncate = resolveDirective("n8n-truncate");
      return openBlock(), createBlock(_component_N8nTooltip, {
        disabled: !badgeTooltip.value,
        placement: "top"
      }, {
        content: withCtx(() => [
          createTextVNode(toDisplayString(badgeTooltip.value), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            badgeText.value ? (openBlock(), createBlock(_component_N8nBadge, {
              key: 0,
              class: normalizeClass(_ctx.$style.badge),
              theme: "tertiary",
              bold: "",
              "data-test-id": "card-badge"
            }, {
              default: withCtx(() => [
                badgeIcon.value ? (openBlock(), createBlock(_component_N8nIcon, {
                  key: 0,
                  icon: badgeIcon.value,
                  size: "small",
                  class: "mr-3xs"
                }, null, 8, ["icon"])) : createCommentVNode("", true),
                withDirectives((openBlock(), createElementBlock("span", null, [
                  createTextVNode(toDisplayString(badgeText.value), 1)
                ])), [
                  [_directive_n8n_truncate, void 0, "20"]
                ])
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true),
            numberOfMembersInHomeTeamProject.value ? (openBlock(), createBlock(_component_N8nBadge, {
              key: 1,
              class: normalizeClass([_ctx.$style.badge, _ctx.$style.countBadge]),
              theme: "tertiary",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" + " + toDisplayString(numberOfMembersInHomeTeamProject.value), 1)
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
});
const badge = "_badge_2xnky_1";
const countBadge = "_countBadge_2xnky_13";
const style0 = {
  badge,
  countBadge
};
const cssModules = {
  "$style": style0
};
const ProjectCardBadge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  ProjectCardBadge as P
};
