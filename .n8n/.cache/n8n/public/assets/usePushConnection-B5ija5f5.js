import { iY as makeRestApiRequest, R as defineStore, Z as useRootStore, d as defineComponent, c as openBlock, h as createElementBlock, k as createTextVNode, t as toDisplayString, j as createBaseVNode, A as unref, g as useI18n, a4 as useWorkflowHelpers, bg as useNodeHelpers, a as useToast, dS as useCredentialsStore, bf as useNodeTypesStore, m as useSettingsStore, K as useUIStore, T as useWorkflowsStore, hP as useAssistantStore, r as ref, iZ as parse, i_ as codeNodeEditorEventBus, ag as WORKFLOW_SETTINGS_MODAL_KEY, gw as generateNodesGraph, aq as h, eV as getTriggerNodeServiceName, aK as useExternalHooks, ak as useTelemetry } from "./index-40I5DMGP.js";
import { u as usePushConnectionStore, g as globalLinkActionsEventBus } from "./pushConnection.store-w_WxpOeH.js";
const GET_STATUS_ENDPOINT = "/orchestration/worker/status";
const sendGetWorkerStatus = async (context) => {
  await makeRestApiRequest(context, "POST", GET_STATUS_ENDPOINT);
};
const WORKER_HISTORY_LENGTH = 100;
const STALE_SECONDS = 120 * 1e3;
const useOrchestrationStore = defineStore("orchestrationManager", {
  state: () => ({
    initialStatusReceived: false,
    workers: {},
    workersHistory: {},
    workersLastUpdated: {},
    statusInterval: null
  }),
  actions: {
    updateWorkerStatus(data) {
      this.workers[data.senderId] = data;
      if (!this.workersHistory[data.senderId]) {
        this.workersHistory[data.senderId] = [];
      }
      this.workersHistory[data.senderId].push({ data, timestamp: Date.now() });
      if (this.workersHistory[data.senderId].length > WORKER_HISTORY_LENGTH) {
        this.workersHistory[data.senderId].shift();
      }
      this.workersLastUpdated[data.senderId] = Date.now();
      this.initialStatusReceived = true;
    },
    removeStaleWorkers() {
      for (const id in this.workersLastUpdated) {
        if (this.workersLastUpdated[id] + STALE_SECONDS < Date.now()) {
          delete this.workers[id];
          delete this.workersHistory[id];
          delete this.workersLastUpdated[id];
        }
      }
    },
    startWorkerStatusPolling() {
      const rootStore = useRootStore();
      if (!this.statusInterval) {
        this.statusInterval = setInterval(async () => {
          await sendGetWorkerStatus(rootStore.restApiContext);
          this.removeStaleWorkers();
        }, 1e3);
      }
    },
    stopWorkerStatusPolling() {
      if (this.statusInterval) {
        clearInterval(this.statusInterval);
        this.statusInterval = null;
      }
    },
    getWorkerLastUpdated(workerId) {
      return this.workersLastUpdated[workerId] ?? 0;
    },
    getWorkerStatus(workerId) {
      return this.workers[workerId];
    },
    getWorkerStatusHistory(workerId) {
      return this.workersHistory[workerId] ?? [];
    }
  }
});
const _hoisted_1 = ["data-action-parameter-node"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NodeExecutionErrorMessage",
  props: {
    nodeName: {},
    errorMessage: {}
  },
  setup(__props) {
    const i18n = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createTextVNode(toDisplayString(_ctx.errorMessage), 1),
        _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1)),
        createBaseVNode("a", {
          "data-action": "openNodeDetail",
          "data-action-parameter-node": _ctx.nodeName
        }, toDisplayString(unref(i18n).baseText("node.executionError.openNode")), 9, _hoisted_1)
      ]);
    };
  }
});
function usePushConnection({ router }) {
  const workflowHelpers = useWorkflowHelpers({ router });
  const nodeHelpers = useNodeHelpers();
  const toast = useToast();
  const i18n = useI18n();
  const telemetry = useTelemetry();
  const credentialsStore = useCredentialsStore();
  const nodeTypesStore = useNodeTypesStore();
  const orchestrationManagerStore = useOrchestrationStore();
  const pushStore = usePushConnectionStore();
  const settingsStore = useSettingsStore();
  const uiStore = useUIStore();
  const workflowsStore = useWorkflowsStore();
  const assistantStore = useAssistantStore();
  const retryTimeout = ref(null);
  const pushMessageQueue = ref([]);
  const removeEventListener = ref(null);
  function initialize() {
    removeEventListener.value = pushStore.addEventListener((message) => {
      void pushMessageReceived(message);
    });
  }
  function terminate() {
    if (typeof removeEventListener.value === "function") {
      removeEventListener.value();
    }
  }
  function queuePushMessage(event2, retryAttempts) {
    pushMessageQueue.value.push({ message: event2, retriesLeft: retryAttempts });
    if (retryTimeout.value === null) {
      retryTimeout.value = setTimeout(processWaitingPushMessages, 20);
    }
  }
  async function processWaitingPushMessages() {
    if (retryTimeout.value !== null) {
      clearTimeout(retryTimeout.value);
      retryTimeout.value = null;
    }
    const queueLength = pushMessageQueue.value.length;
    for (let i = 0; i < queueLength; i++) {
      const messageData = pushMessageQueue.value.shift();
      const result = await pushMessageReceived(messageData.message, true);
      if (!result) {
        messageData.retriesLeft -= 1;
        if (messageData.retriesLeft > 0) {
          pushMessageQueue.value.unshift(messageData);
        }
        break;
      }
    }
    if (pushMessageQueue.value.length !== 0 && retryTimeout.value === null) {
      retryTimeout.value = setTimeout(processWaitingPushMessages, 25);
    }
  }
  async function pushMessageReceived(receivedData, isRetry) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
    const retryAttempts = 5;
    if (receivedData.type === "sendWorkerStatusMessage") {
      const pushData = receivedData.data;
      orchestrationManagerStore.updateWorkerStatus(pushData.status);
      return true;
    }
    if (receivedData.type === "sendConsoleMessage") {
      const pushData = receivedData.data;
      console.log(pushData.source, ...pushData.messages);
      return true;
    }
    if (!["testWebhookReceived"].includes(receivedData.type) && isRetry !== true && pushMessageQueue.value.length) {
      queuePushMessage(receivedData, retryAttempts);
      return false;
    }
    if (receivedData.type === "nodeExecuteAfter" || receivedData.type === "nodeExecuteBefore") {
      if (!uiStore.isActionActive["workflowRunning"]) {
        return false;
      }
      const pushData = receivedData.data;
      if (workflowsStore.activeExecutionId !== pushData.executionId) {
        if (isRetry !== true) {
          queuePushMessage(event, retryAttempts);
        }
        return false;
      }
    }
    let recoveredPushData = void 0;
    if (receivedData.type === "executionRecovered") {
      const recoveredExecutionId = (_a = receivedData.data) == null ? void 0 : _a.executionId;
      const isWorkflowRunning = uiStore.isActionActive["workflowRunning"];
      if (isWorkflowRunning && workflowsStore.activeExecutionId === recoveredExecutionId) {
        const executionData = await workflowsStore.fetchExecutionDataById(
          workflowsStore.activeExecutionId
        );
        if (executionData == null ? void 0 : executionData.data) {
          executionData.data = parse(executionData.data);
          const iRunExecutionData = {
            startData: (_b = executionData.data) == null ? void 0 : _b.startData,
            resultData: ((_c = executionData.data) == null ? void 0 : _c.resultData) ?? { runData: {} },
            executionData: (_d = executionData.data) == null ? void 0 : _d.executionData
          };
          if (((_e = workflowsStore.workflowExecutionData) == null ? void 0 : _e.workflowId) === executionData.workflowId) {
            const activeRunData = (_h = (_g = (_f = workflowsStore.workflowExecutionData) == null ? void 0 : _f.data) == null ? void 0 : _g.resultData) == null ? void 0 : _h.runData;
            if (activeRunData) {
              for (const key of Object.keys(activeRunData)) {
                iRunExecutionData.resultData.runData[key] = activeRunData[key];
              }
            }
          }
          const iRun = {
            data: iRunExecutionData,
            finished: executionData.finished,
            mode: executionData.mode,
            waitTill: (_i = executionData.data) == null ? void 0 : _i.waitTill,
            startedAt: executionData.startedAt,
            stoppedAt: executionData.stoppedAt,
            status: "crashed"
          };
          if (executionData.data) {
            recoveredPushData = {
              executionId: executionData.id,
              data: iRun
            };
          }
        }
      }
    }
    if (receivedData.type === "workflowFailedToActivate" && workflowsStore.workflowId === receivedData.data.workflowId) {
      workflowsStore.setWorkflowInactive(receivedData.data.workflowId);
      workflowsStore.setActive(false);
      toast.showError(
        new Error(receivedData.data.errorMessage),
        i18n.baseText("workflowActivator.showError.title", {
          interpolate: { newStateName: "activated" }
        }) + ":"
      );
      return true;
    }
    if (receivedData.type === "workflowActivated") {
      workflowsStore.setWorkflowActive(receivedData.data.workflowId);
      return true;
    }
    if (receivedData.type === "workflowDeactivated") {
      workflowsStore.setWorkflowInactive(receivedData.data.workflowId);
      return true;
    }
    if (receivedData.type === "executionFinished" || receivedData.type === "executionRecovered") {
      let pushData;
      if (receivedData.type === "executionRecovered" && recoveredPushData !== void 0) {
        pushData = recoveredPushData;
      } else {
        pushData = receivedData.data;
      }
      const { activeExecutionId } = workflowsStore;
      if (activeExecutionId === pushData.executionId) {
        const activeRunData = (_l = (_k = (_j = workflowsStore.workflowExecutionData) == null ? void 0 : _j.data) == null ? void 0 : _k.resultData) == null ? void 0 : _l.runData;
        if (activeRunData) {
          for (const key of Object.keys(activeRunData)) {
            if (((_w = (_v = (_u = (_t = (_s = (_r = (_q = (_p = (_o = (_n = (_m = pushData.data) == null ? void 0 : _m.data) == null ? void 0 : _n.resultData) == null ? void 0 : _o.runData) == null ? void 0 : _p[key]) == null ? void 0 : _q[0]) == null ? void 0 : _r.data) == null ? void 0 : _s.main) == null ? void 0 : _t[0]) == null ? void 0 : _u[0]) == null ? void 0 : _v.json) == null ? void 0 : _w.isArtificialRecoveredEventItem) === true && activeRunData[key].length > 0)
              pushData.data.data.resultData.runData[key] = activeRunData[key];
          }
        }
        workflowsStore.finishActiveExecution(pushData);
      }
      if (!uiStore.isActionActive["workflowRunning"]) {
        return false;
      }
      if (activeExecutionId !== pushData.executionId) {
        if (isRetry !== true) {
          queuePushMessage(event, retryAttempts);
        }
        return false;
      }
      const runDataExecuted = pushData.data;
      let runDataExecutedErrorMessage = getExecutionError(runDataExecuted.data);
      if (runDataExecuted.status === "crashed") {
        runDataExecutedErrorMessage = i18n.baseText("pushConnection.executionFailed.message");
      } else if (runDataExecuted.status === "canceled") {
        runDataExecutedErrorMessage = i18n.baseText(
          "executionsList.showMessage.stopExecution.message",
          {
            interpolate: { activeExecutionId }
          }
        );
      }
      const lineNumber = (_z = (_y = (_x = runDataExecuted == null ? void 0 : runDataExecuted.data) == null ? void 0 : _x.resultData) == null ? void 0 : _y.error) == null ? void 0 : _z.lineNumber;
      codeNodeEditorEventBus.emit("highlightLine", lineNumber ?? "final");
      const workflow = workflowHelpers.getCurrentWorkflow();
      if (runDataExecuted.waitTill !== void 0) {
        const workflowSettings = workflowsStore.workflowSettings;
        const saveManualExecutions = settingsStore.saveManualExecutions;
        const isSavingExecutions = workflowSettings.saveManualExecutions === void 0 ? saveManualExecutions : workflowSettings.saveManualExecutions;
        if (!isSavingExecutions) {
          globalLinkActionsEventBus.emit("registerGlobalLinkAction", {
            key: "open-settings",
            action: async () => {
              if (workflowsStore.isNewWorkflow) await workflowHelpers.saveAsNewWorkflow();
              uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
            }
          });
        }
        workflowHelpers.setDocumentTitle(workflow.name, "IDLE");
      } else if (runDataExecuted.finished !== true) {
        workflowHelpers.setDocumentTitle(workflow.name, "ERROR");
        if (((_A = runDataExecuted.data.resultData.error) == null ? void 0 : _A.name) === "ExpressionError" && runDataExecuted.data.resultData.error.functionality === "pairedItem") {
          const error = runDataExecuted.data.resultData.error;
          void workflowHelpers.getWorkflowDataToSave().then((workflowData) => {
            const eventData = {
              caused_by_credential: false,
              error_message: error.description,
              error_title: error.message,
              error_type: error.context.type,
              node_graph_string: JSON.stringify(
                generateNodesGraph(
                  workflowData,
                  workflowHelpers.getNodeTypes()
                ).nodeGraph
              ),
              workflow_id: workflowsStore.workflowId
            };
            if (error.context.nodeCause && ["paired_item_no_info", "paired_item_invalid_info"].includes(
              error.context.type
            )) {
              const node = workflow.getNode(error.context.nodeCause);
              if (node) {
                eventData.is_pinned = !!workflow.getPinDataOfNode(node.name);
                eventData.mode = node.parameters.mode;
                eventData.node_type = node.type;
                eventData.operation = node.parameters.operation;
                eventData.resource = node.parameters.resource;
              }
            }
            telemetry.track("Instance FE emitted paired item error", eventData, {
              withPostHog: true
            });
          });
        }
        if (((_B = runDataExecuted.data.resultData.error) == null ? void 0 : _B.name) === "SubworkflowOperationError") {
          const error = runDataExecuted.data.resultData.error;
          workflowsStore.subWorkflowExecutionError = error;
          toast.showMessage({
            title: error.message,
            message: error.description,
            type: "error",
            duration: 0
          });
        } else if ((((_C = runDataExecuted.data.resultData.error) == null ? void 0 : _C.name) === "NodeOperationError" || ((_D = runDataExecuted.data.resultData.error) == null ? void 0 : _D.name) === "NodeApiError") && runDataExecuted.data.resultData.error.functionality === "configuration-node") {
          let title;
          const nodeError = runDataExecuted.data.resultData.error;
          if (nodeError.node.name) {
            title = `Error in sub-node ‘${nodeError.node.name}‘`;
          } else {
            title = "Problem executing workflow";
          }
          toast.showMessage({
            title,
            message: h(_sfc_main, {
              errorMessage: (nodeError == null ? void 0 : nodeError.description) ?? runDataExecutedErrorMessage,
              nodeName: nodeError.node.name
            }),
            type: "error",
            duration: 0
          });
        } else {
          let title;
          const isManualExecutionCancelled = runDataExecuted.mode === "manual" && runDataExecuted.status === "canceled";
          if (isManualExecutionCancelled) {
            toast.showMessage({
              title: i18n.baseText("nodeView.showMessage.stopExecutionTry.title"),
              type: "success"
            });
          } else {
            if (runDataExecuted.data.resultData.lastNodeExecuted) {
              title = `Problem in node ‘${runDataExecuted.data.resultData.lastNodeExecuted}‘`;
            } else {
              title = "Problem executing workflow";
            }
            toast.showMessage({
              title,
              message: runDataExecutedErrorMessage,
              type: "error",
              duration: 0
            });
          }
        }
      } else {
        workflowHelpers.setDocumentTitle(workflow.name, "IDLE");
        const execution = workflowsStore.getWorkflowExecution;
        if (execution == null ? void 0 : execution.executedNode) {
          const node = workflowsStore.getNodeByName(execution.executedNode);
          const nodeType = node && nodeTypesStore.getNodeType(node.type, node.typeVersion);
          const nodeOutput = execution && execution.executedNode && ((_G = (_F = (_E = execution.data) == null ? void 0 : _E.resultData) == null ? void 0 : _F.runData) == null ? void 0 : _G[execution.executedNode]);
          if ((nodeType == null ? void 0 : nodeType.polling) && !nodeOutput) {
            toast.showMessage({
              title: i18n.baseText("pushConnection.pollingNode.dataNotFound", {
                interpolate: {
                  service: getTriggerNodeServiceName(nodeType)
                }
              }),
              message: i18n.baseText("pushConnection.pollingNode.dataNotFound.message", {
                interpolate: {
                  service: getTriggerNodeServiceName(nodeType)
                }
              }),
              type: "success"
            });
          } else {
            toast.showMessage({
              title: i18n.baseText("pushConnection.nodeExecutedSuccessfully"),
              type: "success"
            });
          }
        } else {
          toast.showMessage({
            title: i18n.baseText("pushConnection.workflowExecutedSuccessfully"),
            type: "success"
          });
        }
      }
      if (workflowsStore.getWorkflowRunData) {
        runDataExecuted.data.resultData.runData = workflowsStore.getWorkflowRunData;
      }
      workflowsStore.executingNode.length = 0;
      workflowsStore.setWorkflowExecutionData(runDataExecuted);
      uiStore.removeActiveAction("workflowRunning");
      nodeHelpers.updateNodesExecutionIssues();
      const lastNodeExecuted = runDataExecuted.data.resultData.lastNodeExecuted;
      let itemsCount = 0;
      if (lastNodeExecuted && runDataExecuted.data.resultData.runData[lastNodeExecuted] && !runDataExecutedErrorMessage) {
        itemsCount = runDataExecuted.data.resultData.runData[lastNodeExecuted][0].data.main[0].length;
      }
      void useExternalHooks().run("pushConnection.executionFinished", {
        itemsCount,
        nodeName: runDataExecuted.data.resultData.lastNodeExecuted,
        errorMessage: runDataExecutedErrorMessage,
        runDataExecutedStartData: runDataExecuted.data.startData,
        resultDataError: runDataExecuted.data.resultData.error
      });
    } else if (receivedData.type === "executionStarted") {
      const pushData = receivedData.data;
      const executionData = {
        id: pushData.executionId,
        finished: false,
        status: "running",
        mode: pushData.mode,
        startedAt: pushData.startedAt,
        retryOf: pushData.retryOf,
        workflowId: pushData.workflowId,
        workflowName: pushData.workflowName
      };
      workflowsStore.addActiveExecution(executionData);
    } else if (receivedData.type === "nodeExecuteAfter") {
      const pushData = receivedData.data;
      workflowsStore.addNodeExecutionData(pushData);
      workflowsStore.removeExecutingNode(pushData.nodeName);
      void assistantStore.onNodeExecution(pushData);
    } else if (receivedData.type === "nodeExecuteBefore") {
      const pushData = receivedData.data;
      workflowsStore.addExecutingNode(pushData.nodeName);
    } else if (receivedData.type === "testWebhookDeleted") {
      const pushData = receivedData.data;
      if (pushData.workflowId === workflowsStore.workflowId) {
        workflowsStore.executionWaitingForWebhook = false;
        uiStore.removeActiveAction("workflowRunning");
      }
    } else if (receivedData.type === "testWebhookReceived") {
      const pushData = receivedData.data;
      if (pushData.workflowId === workflowsStore.workflowId) {
        workflowsStore.executionWaitingForWebhook = false;
        workflowsStore.activeExecutionId = pushData.executionId;
      }
      void processWaitingPushMessages();
    } else if (receivedData.type === "reloadNodeType") {
      await nodeTypesStore.getNodeTypes();
      await nodeTypesStore.getFullNodesProperties([receivedData.data]);
    } else if (receivedData.type === "removeNodeType") {
      const pushData = receivedData.data;
      const nodesToBeRemoved = [pushData];
      await credentialsStore.fetchCredentialTypes(false).then(() => {
        nodeTypesStore.removeNodeTypes(nodesToBeRemoved);
      });
    } else if (receivedData.type === "nodeDescriptionUpdated") {
      await nodeTypesStore.getNodeTypes();
      await credentialsStore.fetchCredentialTypes(true);
    }
    return true;
  }
  function getExecutionError(data) {
    const error = data.resultData.error;
    let errorMessage;
    if (data.resultData.lastNodeExecuted && error) {
      errorMessage = error.message || error.description;
    } else {
      errorMessage = i18n.baseText("pushConnection.executionError", {
        interpolate: { error: "!" }
      });
      if (error == null ? void 0 : error.message) {
        let nodeName;
        if ("node" in error) {
          nodeName = typeof error.node === "string" ? error.node : error.node.name;
        }
        const receivedError = nodeName ? `${nodeName}: ${error.message}` : error.message;
        errorMessage = i18n.baseText("pushConnection.executionError", {
          interpolate: {
            error: `.${i18n.baseText("pushConnection.executionError.details", {
              interpolate: {
                details: receivedError
              }
            })}`
          }
        });
      }
    }
    return errorMessage;
  }
  return {
    initialize,
    terminate,
    pushMessageReceived,
    queuePushMessage,
    processWaitingPushMessages,
    pushMessageQueue,
    retryTimeout
  };
}
export {
  useOrchestrationStore as a,
  usePushConnection as u
};
