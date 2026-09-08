import { d as defineComponent, a as useToast, a3 as useDocumentTitle, r as ref, K as useUIStore, u as useUsersStore, m as useSettingsStore, p as computed, o as onMounted, v as onBeforeUnmount, id as promptMfaCodeBus, c as openBlock, h as createElementBlock, j as createBaseVNode, i as createVNode, w as withCtx, k as createTextVNode, t as toDisplayString, A as unref, n as normalizeClass, f as createCommentVNode, e as createBlock, ie as MFA_DOCS_URL, F as Fragment, z as renderList, g as useI18n, ia as createFormEventBus, ig as PROMPT_MFA_CODE_MODAL_KEY, ih as CHANGE_PASSWORD_MODAL_KEY, ii as MFA_SETUP_MODAL_KEY, l as resolveComponent, _ as _export_sfc } from "./index-40I5DMGP.js";
const _hoisted_1 = { class: "mb-s" };
const _hoisted_2 = { "data-test-id": "personal-data-form" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "mb-s" };
const _hoisted_5 = { class: "mb-s" };
const _hoisted_6 = {
  key: 0,
  "data-test-id": "mfa-section"
};
const _hoisted_7 = { class: "mb-xs" };
const _hoisted_8 = { class: "mb-s" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsPersonalView",
  setup(__props) {
    const i18n = useI18n();
    const { showToast, showError } = useToast();
    const documentTitle = useDocumentTitle();
    const hasAnyBasicInfoChanges = ref(false);
    const formInputs = ref(null);
    const formBus = createFormEventBus();
    const readyToSubmit = ref(false);
    const currentSelectedTheme = ref(useUIStore().theme);
    const themeOptions = ref([
      {
        name: "system",
        label: "settings.personal.theme.systemDefault"
      },
      {
        name: "light",
        label: "settings.personal.theme.light"
      },
      {
        name: "dark",
        label: "settings.personal.theme.dark"
      }
    ]);
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const settingsStore = useSettingsStore();
    const currentUser = computed(() => {
      return usersStore.currentUser;
    });
    const isExternalAuthEnabled = computed(() => {
      var _a;
      const isLdapEnabled = settingsStore.settings.enterprise.ldap && ((_a = currentUser.value) == null ? void 0 : _a.signInType) === "ldap";
      const isSamlEnabled = settingsStore.isSamlLoginEnabled && settingsStore.isDefaultAuthenticationSaml;
      return isLdapEnabled || isSamlEnabled;
    });
    const isPersonalSecurityEnabled = computed(() => {
      return usersStore.isInstanceOwner || !isExternalAuthEnabled.value;
    });
    const mfaDisabled = computed(() => {
      return !usersStore.mfaEnabled;
    });
    const isMfaFeatureEnabled = computed(() => {
      return settingsStore.isMfaFeatureEnabled;
    });
    const hasAnyPersonalisationChanges = computed(() => {
      return currentSelectedTheme.value !== uiStore.theme;
    });
    const hasAnyChanges = computed(() => {
      return hasAnyBasicInfoChanges.value || hasAnyPersonalisationChanges.value;
    });
    onMounted(() => {
      var _a, _b, _c;
      documentTitle.set(i18n.baseText("settings.personal.personalSettings"));
      formInputs.value = [
        {
          name: "firstName",
          initialValue: (_a = currentUser.value) == null ? void 0 : _a.firstName,
          properties: {
            label: i18n.baseText("auth.firstName"),
            maxlength: 32,
            required: true,
            autocomplete: "given-name",
            capitalize: true,
            disabled: isExternalAuthEnabled.value
          }
        },
        {
          name: "lastName",
          initialValue: (_b = currentUser.value) == null ? void 0 : _b.lastName,
          properties: {
            label: i18n.baseText("auth.lastName"),
            maxlength: 32,
            required: true,
            autocomplete: "family-name",
            capitalize: true,
            disabled: isExternalAuthEnabled.value
          }
        },
        {
          name: "email",
          initialValue: (_c = currentUser.value) == null ? void 0 : _c.email,
          properties: {
            label: i18n.baseText("auth.email"),
            type: "email",
            required: true,
            validationRules: [{ name: "VALID_EMAIL" }],
            autocomplete: "email",
            capitalize: true,
            disabled: !isPersonalSecurityEnabled.value
          }
        }
      ];
    });
    function onInput() {
      hasAnyBasicInfoChanges.value = true;
    }
    function onReadyToSubmit(ready) {
      readyToSubmit.value = ready;
    }
    async function saveUserSettings(params) {
      try {
        await updateUserBasicInfo(params);
        await updatePersonalisationSettings();
        showToast({
          title: i18n.baseText("settings.personal.personalSettingsUpdated"),
          message: "",
          type: "success"
        });
      } catch (e) {
        showError(e, i18n.baseText("settings.personal.personalSettingsUpdatedError"));
      }
    }
    async function onSubmit(form) {
      var _a;
      if (!((_a = usersStore.currentUser) == null ? void 0 : _a.mfaEnabled)) {
        await saveUserSettings(form);
        return;
      }
      uiStore.openModal(PROMPT_MFA_CODE_MODAL_KEY);
      promptMfaCodeBus.once("closed", async (payload) => {
        if (!payload) {
          return;
        }
        await saveUserSettings({
          ...form,
          mfaCode: payload.mfaCode
        });
      });
    }
    async function updateUserBasicInfo(userBasicInfo) {
      if (!hasAnyBasicInfoChanges.value || !usersStore.currentUserId) {
        return;
      }
      await usersStore.updateUser({
        firstName: userBasicInfo.firstName,
        lastName: userBasicInfo.lastName,
        email: userBasicInfo.email,
        mfaCode: userBasicInfo.mfaCode
      });
      hasAnyBasicInfoChanges.value = false;
    }
    async function updatePersonalisationSettings() {
      if (!hasAnyPersonalisationChanges.value) {
        return;
      }
      uiStore.setTheme(currentSelectedTheme.value);
    }
    function onSaveClick() {
      formBus.emit("submit");
    }
    function openPasswordModal() {
      uiStore.openModal(CHANGE_PASSWORD_MODAL_KEY);
    }
    async function onMfaEnableClick() {
      if (!settingsStore.isCloudDeployment || !usersStore.isInstanceOwner) {
        uiStore.openModal(MFA_SETUP_MODAL_KEY);
        return;
      }
      try {
        await usersStore.canEnableMFA();
        uiStore.openModal(MFA_SETUP_MODAL_KEY);
      } catch (e) {
        showToast({
          title: i18n.baseText("settings.personal.mfa.toast.canEnableMfa.title"),
          message: e.message,
          type: "error"
        });
        await usersStore.sendConfirmationEmail();
      }
    }
    async function disableMfa(payload) {
      if (!payload) {
        return;
      }
      try {
        await usersStore.disableMfa(payload.mfaCode);
        showToast({
          title: i18n.baseText("settings.personal.mfa.toast.disabledMfa.title"),
          message: i18n.baseText("settings.personal.mfa.toast.disabledMfa.message"),
          type: "success",
          duration: 0
        });
      } catch (e) {
        showError(e, i18n.baseText("settings.personal.mfa.toast.disabledMfa.error.message"));
      }
    }
    async function onMfaDisableClick() {
      uiStore.openModal(PROMPT_MFA_CODE_MODAL_KEY);
      promptMfaCodeBus.once("closed", disableMfa);
    }
    onBeforeUnmount(() => {
      promptMfaCodeBus.off("closed", disableMfa);
    });
    return (_ctx, _cache) => {
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_n8n_avatar = resolveComponent("n8n-avatar");
      const _component_n8n_form_inputs = resolveComponent("n8n-form-inputs");
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_input_label = resolveComponent("n8n-input-label");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_n8n_option = resolveComponent("n8n-option");
      const _component_n8n_select = resolveComponent("n8n-select");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container),
        "data-test-id": "personal-settings-container"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          createVNode(_component_n8n_heading, { size: "2xlarge" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("settings.personal.personalSettings")), 1)
            ]),
            _: 1
          }),
          currentUser.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style.user)
          }, [
            createBaseVNode("span", {
              class: normalizeClass(_ctx.$style.username),
              "data-test-id": "current-user-name"
            }, [
              createVNode(_component_n8n_text, { color: "text-light" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(currentUser.value.fullName), 1)
                ]),
                _: 1
              })
            ], 2),
            createVNode(_component_n8n_avatar, {
              "first-name": currentUser.value.firstName,
              "last-name": currentUser.value.lastName,
              size: "large"
            }, null, 8, ["first-name", "last-name"])
          ], 2)) : createCommentVNode("", true)
        ], 2),
        createBaseVNode("div", null, [
          createBaseVNode("div", _hoisted_1, [
            createVNode(_component_n8n_heading, { size: "large" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.personal.basicInformation")), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_2, [
            formInputs.value ? (openBlock(), createBlock(_component_n8n_form_inputs, {
              key: 0,
              inputs: formInputs.value,
              "event-bus": unref(formBus),
              onUpdate: onInput,
              onReady: onReadyToSubmit,
              onSubmit
            }, null, 8, ["inputs", "event-bus"])) : createCommentVNode("", true)
          ])
        ]),
        isPersonalSecurityEnabled.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_n8n_heading, { size: "large" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.personal.security")), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_n8n_input_label, {
              label: unref(i18n).baseText("auth.password")
            }, {
              default: withCtx(() => [
                createVNode(_component_n8n_link, {
                  "data-test-id": "change-password-link",
                  onClick: openPasswordModal
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("auth.changePassword")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["label"])
          ]),
          isMfaFeatureEnabled.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_n8n_input_label, {
                label: unref(i18n).baseText("settings.personal.mfa.section.title")
              }, null, 8, ["label"]),
              createVNode(_component_n8n_text, {
                bold: false,
                class: normalizeClass(_ctx.$style.infoText)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(mfaDisabled.value ? unref(i18n).baseText("settings.personal.mfa.button.disabled.infobox") : unref(i18n).baseText("settings.personal.mfa.button.enabled.infobox")) + " ", 1),
                  createVNode(_component_n8n_link, {
                    to: unref(MFA_DOCS_URL),
                    size: "small",
                    bold: true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("generic.learnMore")), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            mfaDisabled.value ? (openBlock(), createBlock(_component_n8n_button, {
              key: 0,
              class: normalizeClass(_ctx.$style.button),
              type: "tertiary",
              label: unref(i18n).baseText("settings.personal.mfa.button.enabled"),
              "data-test-id": "enable-mfa-button",
              onClick: onMfaEnableClick
            }, null, 8, ["class", "label"])) : (openBlock(), createBlock(_component_n8n_button, {
              key: 1,
              class: normalizeClass(_ctx.$style.disableMfaButton),
              type: "tertiary",
              label: unref(i18n).baseText("settings.personal.mfa.button.disabled"),
              "data-test-id": "disable-mfa-button",
              onClick: onMfaDisableClick
            }, null, 8, ["class", "label"]))
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", null, [
          createBaseVNode("div", _hoisted_8, [
            createVNode(_component_n8n_heading, { size: "large" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(i18n).baseText("settings.personal.personalisation")), 1)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", null, [
            createVNode(_component_n8n_input_label, {
              label: unref(i18n).baseText("settings.personal.theme")
            }, {
              default: withCtx(() => [
                createVNode(_component_n8n_select, {
                  modelValue: currentSelectedTheme.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentSelectedTheme.value = $event),
                  class: normalizeClass(_ctx.$style.themeSelect),
                  "data-test-id": "theme-select",
                  size: "small",
                  filterable: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(themeOptions.value, (item) => {
                      return openBlock(), createBlock(_component_n8n_option, {
                        key: item.name,
                        label: _ctx.$t(item.label),
                        value: item.name
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "class"])
              ]),
              _: 1
            }, 8, ["label"])
          ])
        ]),
        createBaseVNode("div", null, [
          createVNode(_component_n8n_button, {
            float: "right",
            label: unref(i18n).baseText("settings.personal.save"),
            size: "large",
            disabled: !hasAnyChanges.value || !readyToSubmit.value,
            "data-test-id": "save-settings-button",
            onClick: onSaveClick
          }, null, 8, ["label", "disabled"])
        ])
      ], 2);
    };
  }
});
const container = "_container_z1fqc_1";
const header = "_header_z1fqc_8";
const user = "_user_z1fqc_17";
const username = "_username_z1fqc_27";
const disableMfaButton = "_disableMfaButton_z1fqc_39";
const button = "_button_z1fqc_46";
const infoText = "_infoText_z1fqc_53";
const themeSelect = "_themeSelect_z1fqc_58";
const style0 = {
  container,
  header,
  user,
  username,
  disableMfaButton,
  button,
  infoText,
  themeSelect
};
const cssModules = {
  "$style": style0
};
const SettingsPersonalView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  SettingsPersonalView as default
};
