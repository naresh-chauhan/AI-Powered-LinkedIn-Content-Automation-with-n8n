import { d as defineComponent, ck as mergeModels, c_ as useModel, r as ref, p as computed, c as openBlock, e as createBlock, w as withCtx, i as createVNode, k as createTextVNode, t as toDisplayString, A as unref, I as withModifiers, j as createBaseVNode, h as createElementBlock, j7 as ProjectSharing, n as normalizeClass, f as createCommentVNode, g as useI18n, l as resolveComponent, _ as _export_sfc, a5 as usePageRedirectionHelper, u as useUsersStore, a1 as useProjectsStore, jn as useRolesStore, aD as useCloudPlanStore, a as useToast, b as useRouter, a3 as useDocumentTitle, H as watch, av as onBeforeMount, o as onMounted, jo as N8nFormInput, F as Fragment, z as renderList, V as VIEWS, e0 as deepCopy, x as nextTick, ak as useTelemetry } from "./index-40I5DMGP.js";
import { P as ProjectHeader } from "./ProjectHeader-wdvHJxbT.js";
const _hoisted_1$2 = { class: "pt-l" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProjectDeleteDialog",
  props: /* @__PURE__ */ mergeModels({
    currentProject: {},
    projects: {}
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirmDelete"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const visible = useModel(__props, "modelValue");
    const emit = __emit;
    const locale = useI18n();
    const selectedProject = ref(null);
    const operation2 = ref(null);
    const wipeConfirmText = ref("");
    const isValid = computed(() => {
      if (operation2.value === "transfer") {
        return !!selectedProject.value;
      }
      if (operation2.value === "wipe") {
        return wipeConfirmText.value === locale.baseText("projects.settings.delete.question.wipe.placeholder");
      }
      return false;
    });
    const onDelete = () => {
      var _a;
      if (!isValid.value) {
        return;
      }
      if (operation2.value === "wipe") {
        selectedProject.value = null;
      }
      emit("confirmDelete", (_a = selectedProject.value) == null ? void 0 : _a.id);
    };
    return (_ctx, _cache) => {
      var _a;
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_n8n_input = resolveComponent("n8n-input");
      const _component_n8n_input_label = resolveComponent("n8n-input-label");
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => visible.value = $event),
        title: unref(locale).baseText("projects.settings.delete.title", {
          interpolate: { projectName: ((_a = props.currentProject) == null ? void 0 : _a.name) ?? "" }
        }),
        width: "500"
      }, {
        footer: withCtx(() => [
          createVNode(_component_N8nButton, {
            type: "danger",
            "native-type": "button",
            disabled: !isValid.value,
            "data-test-id": "project-settings-delete-confirm-button",
            onClick: withModifiers(onDelete, ["stop", "prevent"])
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.danger.deleteProject")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        default: withCtx(() => [
          createVNode(_component_n8n_text, { color: "text-base" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.delete.message")), 1)
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(_component_el_radio, {
              "model-value": operation2.value,
              label: "transfer",
              class: "mb-s",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => operation2.value = "transfer")
            }, {
              default: withCtx(() => [
                createVNode(_component_n8n_text, { color: "text-dark" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.delete.question.transfer.label")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model-value"]),
            operation2.value === "transfer" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.$style.operation)
            }, [
              createVNode(_component_n8n_text, { color: "text-dark" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.delete.question.transfer.title")), 1)
                ]),
                _: 1
              }),
              createVNode(ProjectSharing, {
                modelValue: selectedProject.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedProject.value = $event),
                class: "pt-2xs",
                projects: props.projects,
                "empty-options-text": unref(locale).baseText("projects.sharing.noMatchingProjects")
              }, null, 8, ["modelValue", "projects", "empty-options-text"])
            ], 2)) : createCommentVNode("", true),
            createVNode(_component_el_radio, {
              "model-value": operation2.value,
              label: "wipe",
              class: "mb-s",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => operation2.value = "wipe")
            }, {
              default: withCtx(() => [
                createVNode(_component_n8n_text, { color: "text-dark" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.delete.question.wipe.label")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model-value"]),
            operation2.value === "wipe" ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.$style.operation)
            }, [
              createVNode(_component_n8n_input_label, {
                label: unref(locale).baseText("projects.settings.delete.question.wipe.title")
              }, {
                default: withCtx(() => [
                  createVNode(_component_n8n_input, {
                    modelValue: wipeConfirmText.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => wipeConfirmText.value = $event),
                    placeholder: unref(locale).baseText("projects.settings.delete.question.wipe.placeholder")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              }, 8, ["label"])
            ], 2)) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const operation = "_operation_1mn5e_1";
const style0$1 = {
  operation
};
const cssModules$1 = {
  "$style": style0$1
};
const ProjectDeleteDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$1]]);
const _hoisted_1$1 = { class: "pt-l" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectRoleUpgradeDialog",
  props: /* @__PURE__ */ mergeModels({
    limit: {},
    planName: {}
  }, {
    "modelValue": { type: Boolean },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const visible = useModel(__props, "modelValue");
    const pageRedirectionHelper = usePageRedirectionHelper();
    const locale = useI18n();
    const goToUpgrade = async () => {
      await pageRedirectionHelper.goToUpgrade("rbac", "upgrade-rbac");
      visible.value = false;
    };
    return (_ctx, _cache) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        title: unref(locale).baseText("projects.settings.role.upgrade.title"),
        width: "500"
      }, {
        footer: withCtx(() => [
          createVNode(_component_N8nButton, {
            type: "secondary",
            "native-type": "button",
            onClick: _cache[0] || (_cache[0] = ($event) => visible.value = false)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("generic.cancel")), 1)
            ]),
            _: 1
          }),
          createVNode(_component_N8nButton, {
            type: "primary",
            "native-type": "button",
            onClick: goToUpgrade
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("projects.create.limitReached.link")), 1)
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createVNode(_component_i18n_t, { keypath: "projects.settings.role.upgrade.message" }, {
              planName: withCtx(() => [
                createTextVNode(toDisplayString(props.planName), 1)
              ]),
              limit: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("projects.create.limit", {
                  adjustToNumber: props.limit,
                  interpolate: { num: String(props.limit) }
                })), 1)
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "title"]);
    };
  }
});
const _hoisted_1 = { for: "projectName" };
const _hoisted_2 = { for: "projectMembers" };
const _hoisted_3 = {
  key: 0,
  class: "mr-2xs"
};
const _hoisted_4 = { class: "mb-xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectSettings",
  setup(__props) {
    const usersStore = useUsersStore();
    const locale = useI18n();
    const projectsStore = useProjectsStore();
    const rolesStore = useRolesStore();
    const cloudPlanStore = useCloudPlanStore();
    const toast = useToast();
    const router = useRouter();
    const telemetry = useTelemetry();
    const documentTitle = useDocumentTitle();
    const dialogVisible = ref(false);
    const upgradeDialogVisible = ref(false);
    const isDirty = ref(false);
    const isValid = ref(false);
    const formData = ref({
      name: "",
      relations: []
    });
    const projectRoleTranslations = ref({
      "project:viewer": locale.baseText("projects.settings.role.viewer"),
      "project:editor": locale.baseText("projects.settings.role.editor"),
      "project:admin": locale.baseText("projects.settings.role.admin")
    });
    const nameInput = ref(null);
    const usersList = computed(
      () => usersStore.allUsers.filter((user) => {
        const isAlreadySharedWithUser = (formData.value.relations || []).find(
          (r) => r.id === user.id
        );
        return !isAlreadySharedWithUser;
      })
    );
    const projects = computed(
      () => projectsStore.availableProjects.filter(
        (project) => project.id !== projectsStore.currentProjectId
      )
    );
    const projectRoles = computed(
      () => rolesStore.processedProjectRoles.map((role) => ({
        ...role,
        name: projectRoleTranslations.value[role.role]
      }))
    );
    const firstLicensedRole = computed(() => {
      var _a;
      return (_a = projectRoles.value.find((role) => role.licensed)) == null ? void 0 : _a.role;
    });
    const onAddMember = (userId) => {
      isDirty.value = true;
      const user = usersStore.usersById[userId];
      if (!user) return;
      const { id, firstName, lastName, email } = user;
      const relation = { id, firstName, lastName, email };
      if (firstLicensedRole.value) {
        relation.role = firstLicensedRole.value;
      }
      formData.value.relations.push(relation);
    };
    const onRoleAction = (user, role) => {
      isDirty.value = true;
      const index = formData.value.relations.findIndex((r) => r.id === user.id);
      if (role === "remove") {
        formData.value.relations.splice(index, 1);
      } else {
        formData.value.relations[index].role = role;
      }
    };
    const onNameInput = () => {
      isDirty.value = true;
    };
    const onCancel = () => {
      var _a, _b;
      formData.value.relations = ((_a = projectsStore.currentProject) == null ? void 0 : _a.relations) ? deepCopy(projectsStore.currentProject.relations) : [];
      formData.value.name = ((_b = projectsStore.currentProject) == null ? void 0 : _b.name) ?? "";
      isDirty.value = false;
    };
    const makeFormDataDiff = () => {
      const diff = {};
      if (!projectsStore.currentProject) {
        return diff;
      }
      if (formData.value.name !== projectsStore.currentProject.name) {
        diff.name = formData.value.name ?? "";
      }
      if (formData.value.relations.length !== projectsStore.currentProject.relations.length) {
        diff.memberAdded = formData.value.relations.filter(
          (r) => {
            var _a;
            return !((_a = projectsStore.currentProject) == null ? void 0 : _a.relations.find((cr) => cr.id === r.id));
          }
        );
        diff.memberRemoved = projectsStore.currentProject.relations.filter(
          (cr) => !formData.value.relations.find((r) => r.id === cr.id)
        );
      }
      diff.role = formData.value.relations.filter((r) => {
        var _a, _b;
        const currentRelation = (_a = projectsStore.currentProject) == null ? void 0 : _a.relations.find((cr) => cr.id === r.id);
        return (currentRelation == null ? void 0 : currentRelation.role) !== r.role && !((_b = diff.memberAdded) == null ? void 0 : _b.find((ar) => ar.id === r.id));
      });
      return diff;
    };
    const sendTelemetry = (diff) => {
      var _a;
      if (diff.name) {
        telemetry.track("User changed project name", {
          project_id: (_a = projectsStore.currentProject) == null ? void 0 : _a.id,
          name: diff.name
        });
      }
      if (diff.memberAdded) {
        diff.memberAdded.forEach((r) => {
          var _a2;
          telemetry.track("User added member to project", {
            project_id: (_a2 = projectsStore.currentProject) == null ? void 0 : _a2.id,
            target_user_id: r.id,
            role: r.role
          });
        });
      }
      if (diff.memberRemoved) {
        diff.memberRemoved.forEach((r) => {
          var _a2;
          telemetry.track("User removed member from project", {
            project_id: (_a2 = projectsStore.currentProject) == null ? void 0 : _a2.id,
            target_user_id: r.id
          });
        });
      }
      if (diff.role) {
        diff.role.forEach((r) => {
          var _a2;
          telemetry.track("User changed member role on project", {
            project_id: (_a2 = projectsStore.currentProject) == null ? void 0 : _a2.id,
            target_user_id: r.id,
            role: r.role
          });
        });
      }
    };
    const onSubmit = async () => {
      try {
        if (isDirty.value && projectsStore.currentProject) {
          const diff = makeFormDataDiff();
          await projectsStore.updateProject({
            id: projectsStore.currentProject.id,
            name: formData.value.name,
            relations: formData.value.relations.map((r) => ({
              userId: r.id,
              role: r.role
            }))
          });
          sendTelemetry(diff);
          isDirty.value = false;
          toast.showMessage({
            title: locale.baseText("projects.settings.save.successful.title", {
              interpolate: { projectName: formData.value.name ?? "" }
            }),
            type: "success"
          });
        }
      } catch (error) {
        toast.showError(error, locale.baseText("projects.settings.save.error.title"));
      }
    };
    const onDelete = async () => {
      await projectsStore.getAvailableProjects();
      dialogVisible.value = true;
    };
    const onConfirmDelete = async (transferId) => {
      var _a;
      try {
        if (projectsStore.currentProject) {
          const projectName = ((_a = projectsStore.currentProject) == null ? void 0 : _a.name) ?? "";
          await projectsStore.deleteProject(projectsStore.currentProject.id, transferId);
          await router.push({ name: VIEWS.HOMEPAGE });
          toast.showMessage({
            title: locale.baseText("projects.settings.delete.successful.title", {
              interpolate: { projectName }
            }),
            type: "success"
          });
          dialogVisible.value = true;
        }
      } catch (error) {
        toast.showError(error, locale.baseText("projects.settings.delete.error.title"));
      }
    };
    const selectProjectNameIfMatchesDefault = () => {
      var _a, _b, _c, _d;
      if (formData.value.name === locale.baseText("projects.settings.newProjectName")) {
        (_b = (_a = nameInput.value) == null ? void 0 : _a.inputRef) == null ? void 0 : _b.focus();
        (_d = (_c = nameInput.value) == null ? void 0 : _c.inputRef) == null ? void 0 : _d.select();
      }
    };
    watch(
      () => projectsStore.currentProject,
      async () => {
        var _a, _b;
        formData.value.name = ((_a = projectsStore.currentProject) == null ? void 0 : _a.name) ?? "";
        formData.value.relations = ((_b = projectsStore.currentProject) == null ? void 0 : _b.relations) ? deepCopy(projectsStore.currentProject.relations) : [];
        await nextTick();
        selectProjectNameIfMatchesDefault();
      },
      { immediate: true }
    );
    onBeforeMount(async () => {
      await usersStore.fetchUsers();
    });
    onMounted(() => {
      documentTitle.set(locale.baseText("projects.settings"));
      selectProjectNameIfMatchesDefault();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      const _component_N8nIcon = resolveComponent("N8nIcon");
      const _component_N8nUserSelect = resolveComponent("N8nUserSelect");
      const _component_N8nOption = resolveComponent("N8nOption");
      const _component_N8nSelect = resolveComponent("N8nSelect");
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_N8nUsersList = resolveComponent("N8nUsersList");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.projectSettings)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          createVNode(ProjectHeader)
        ], 2),
        createBaseVNode("form", {
          onSubmit: withModifiers(onSubmit, ["prevent"])
        }, [
          createBaseVNode("fieldset", null, [
            createBaseVNode("label", _hoisted_1, toDisplayString(unref(locale).baseText("projects.settings.name")), 1),
            createVNode(unref(N8nFormInput), {
              id: "projectName",
              ref_key: "nameInput",
              ref: nameInput,
              modelValue: formData.value.name,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.name = $event),
              label: "",
              type: "text",
              name: "name",
              required: "",
              "data-test-id": "project-settings-name-input",
              onInput: onNameInput,
              onValidate: _cache[1] || (_cache[1] = ($event) => isValid.value = $event)
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("fieldset", null, [
            createBaseVNode("label", _hoisted_2, toDisplayString(unref(locale).baseText("projects.settings.projectMembers")), 1),
            createVNode(_component_N8nUserSelect, {
              id: "projectMembers",
              class: "mb-s",
              size: "large",
              users: usersList.value,
              "current-user-id": (_a = unref(usersStore).currentUser) == null ? void 0 : _a.id,
              placeholder: _ctx.$locale.baseText("workflows.shareModal.select.placeholder"),
              "data-test-id": "project-members-select",
              "onUpdate:modelValue": onAddMember
            }, {
              prefix: withCtx(() => [
                createVNode(_component_N8nIcon, { icon: "search" })
              ]),
              _: 1
            }, 8, ["users", "current-user-id", "placeholder"]),
            createVNode(_component_N8nUsersList, {
              actions: [],
              users: formData.value.relations,
              "current-user-id": (_b = unref(usersStore).currentUser) == null ? void 0 : _b.id,
              "delete-label": _ctx.$locale.baseText("workflows.shareModal.list.delete")
            }, {
              actions: withCtx(({ user }) => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style.buttons)
                }, [
                  createVNode(_component_N8nSelect, {
                    class: "mr-2xs",
                    "model-value": (user == null ? void 0 : user.role) || projectRoles.value[0].role,
                    size: "small",
                    "data-test-id": "projects-settings-user-role-select",
                    "onUpdate:modelValue": ($event) => onRoleAction(user, $event)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(projectRoles.value, (role) => {
                        return openBlock(), createBlock(_component_N8nOption, {
                          key: role.role,
                          value: role.role,
                          label: role.name,
                          disabled: !role.licensed
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(role.name), 1),
                            !role.licensed ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              class: normalizeClass(_ctx.$style.upgrade),
                              onClick: _cache[2] || (_cache[2] = ($event) => upgradeDialogVisible.value = true)
                            }, "  - " + toDisplayString(unref(locale).baseText("generic.upgrade")), 3)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["value", "label", "disabled"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1032, ["model-value", "onUpdate:modelValue"]),
                  createVNode(_component_N8nButton, {
                    type: "tertiary",
                    "native-type": "button",
                    square: "",
                    icon: "trash",
                    "data-test-id": "project-user-remove",
                    onClick: ($event) => onRoleAction(user, "remove")
                  }, null, 8, ["onClick"])
                ], 2)
              ]),
              _: 1
            }, 8, ["users", "current-user-id", "delete-label"])
          ]),
          createBaseVNode("fieldset", {
            class: normalizeClass(_ctx.$style.buttons)
          }, [
            createBaseVNode("div", null, [
              isDirty.value ? (openBlock(), createElementBlock("small", _hoisted_3, toDisplayString(unref(locale).baseText("projects.settings.message.unsavedChanges")), 1)) : createCommentVNode("", true),
              createVNode(_component_N8nButton, {
                disabled: !isDirty.value,
                type: "secondary",
                "native-type": "button",
                class: "mr-2xs",
                "data-test-id": "project-settings-cancel-button",
                onClick: withModifiers(onCancel, ["stop", "prevent"])
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.button.cancel")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            createVNode(_component_N8nButton, {
              disabled: !isDirty.value || !isValid.value,
              type: "primary",
              "data-test-id": "project-settings-save-button"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.button.save")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ], 2),
          createBaseVNode("fieldset", null, [
            _cache[5] || (_cache[5] = createBaseVNode("hr", { class: "mb-2xl" }, null, -1)),
            createBaseVNode("h3", _hoisted_4, toDisplayString(unref(locale).baseText("projects.settings.danger.title")), 1),
            createBaseVNode("small", null, toDisplayString(unref(locale).baseText("projects.settings.danger.message")), 1),
            _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
            createVNode(_component_N8nButton, {
              type: "tertiary",
              "native-type": "button",
              class: "mt-s",
              "data-test-id": "project-settings-delete-button",
              onClick: withModifiers(onDelete, ["stop", "prevent"])
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("projects.settings.danger.deleteProject")), 1)
              ]),
              _: 1
            })
          ])
        ], 32),
        createVNode(ProjectDeleteDialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dialogVisible.value = $event),
          "current-project": unref(projectsStore).currentProject,
          projects: projects.value,
          onConfirmDelete
        }, null, 8, ["modelValue", "current-project", "projects"]),
        createVNode(_sfc_main$1, {
          modelValue: upgradeDialogVisible.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => upgradeDialogVisible.value = $event),
          limit: unref(projectsStore).teamProjectsLimit,
          "plan-name": (_c = unref(cloudPlanStore).currentPlanData) == null ? void 0 : _c.displayName
        }, null, 8, ["modelValue", "limit", "plan-name"])
      ], 2);
    };
  }
});
const projectSettings = "_projectSettings_2vgb7_1";
const header = "_header_2vgb7_21";
const upgrade = "_upgrade_2vgb7_27";
const buttons = "_buttons_2vgb7_31";
const style0 = {
  projectSettings,
  header,
  upgrade,
  buttons
};
const cssModules = {
  "$style": style0
};
const ProjectSettings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  ProjectSettings as default
};
