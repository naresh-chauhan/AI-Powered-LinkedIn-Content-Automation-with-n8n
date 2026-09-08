import { d as defineComponent, hj as usePostHog, m as useSettingsStore, K as useUIStore, u as useUsersStore, a as useToast, b as useRouter, r as ref, cz as reactive, c as openBlock, e as createBlock, g as useI18n, iu as MORE_ONBOARDING_OPTIONS_EXPERIMENT, V as VIEWS } from "./index-40I5DMGP.js";
import { A as AuthView } from "./AuthView-C7b2xzS9.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SetupView",
  setup(__props) {
    const posthogStore = usePostHog();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const toast = useToast();
    const locale = useI18n();
    const router = useRouter();
    const loading = ref(false);
    const formConfig = reactive({
      title: locale.baseText("auth.setup.setupOwner"),
      buttonText: locale.baseText("auth.setup.next"),
      inputs: [
        {
          name: "email",
          properties: {
            label: locale.baseText("auth.email"),
            type: "email",
            required: true,
            validationRules: [{ name: "VALID_EMAIL" }],
            autocomplete: "email",
            capitalize: true
          }
        },
        {
          name: "firstName",
          properties: {
            label: locale.baseText("auth.firstName"),
            maxlength: 32,
            required: true,
            autocomplete: "given-name",
            capitalize: true
          }
        },
        {
          name: "lastName",
          properties: {
            label: locale.baseText("auth.lastName"),
            maxlength: 32,
            required: true,
            autocomplete: "family-name",
            capitalize: true
          }
        },
        {
          name: "password",
          properties: {
            label: locale.baseText("auth.password"),
            type: "password",
            required: true,
            validationRules: [{ name: "DEFAULT_PASSWORD_RULES" }],
            infoText: locale.baseText("auth.defaultPasswordRequirements"),
            autocomplete: "new-password",
            capitalize: true
          }
        },
        {
          name: "agree",
          properties: {
            label: locale.baseText("auth.agreement.label"),
            type: "checkbox"
          }
        }
      ]
    });
    const onSubmit = async (values) => {
      try {
        const forceRedirectedHere = settingsStore.showSetupPage;
        const isPartOfOnboardingExperiment = posthogStore.getVariant(MORE_ONBOARDING_OPTIONS_EXPERIMENT.name) === MORE_ONBOARDING_OPTIONS_EXPERIMENT.variant;
        loading.value = true;
        await usersStore.createOwner(
          values
        );
        if (values.agree === true) {
          try {
            await uiStore.submitContactEmail(values.email.toString(), values.agree);
          } catch {
          }
        }
        if (forceRedirectedHere) {
          if (isPartOfOnboardingExperiment) {
            await router.push({ name: VIEWS.WORKFLOWS });
          } else {
            await router.push({ name: VIEWS.HOMEPAGE });
          }
        } else {
          await router.push({ name: VIEWS.USERS_SETTINGS });
        }
      } catch (error) {
        toast.showError(error, locale.baseText("auth.setup.settingUpOwnerError"));
      }
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AuthView, {
        form: formConfig,
        "form-loading": loading.value,
        "data-test-id": "setup-form",
        onSubmit
      }, null, 8, ["form", "form-loading"]);
    };
  }
});
export {
  _sfc_main as default
};
