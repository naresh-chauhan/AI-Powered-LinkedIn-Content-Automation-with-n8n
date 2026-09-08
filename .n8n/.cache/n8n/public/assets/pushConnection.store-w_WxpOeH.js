import { C as createEventBus, R as defineStore, S as STORES, Z as useRootStore, m as useSettingsStore, p as computed, r as ref, W as TIME } from "./index-40I5DMGP.js";
const globalLinkActionsEventBus = createEventBus();
const usePushConnectionStore = defineStore(STORES.PUSH, () => {
  const rootStore = useRootStore();
  const settingsStore = useSettingsStore();
  const pushRef = computed(() => rootStore.pushRef);
  const pushSource = ref(null);
  const reconnectTimeout = ref(null);
  const connectRetries = ref(0);
  const lostConnection = ref(false);
  const outgoingQueue = ref([]);
  const isConnectionOpen = ref(false);
  const onMessageReceivedHandlers = ref([]);
  const addEventListener = (handler) => {
    onMessageReceivedHandlers.value.push(handler);
    return () => {
      const index = onMessageReceivedHandlers.value.indexOf(handler);
      if (index !== -1) {
        onMessageReceivedHandlers.value.splice(index, 1);
      }
    };
  };
  function onConnectionError() {
    pushDisconnect();
    connectRetries.value++;
    reconnectTimeout.value = setTimeout(
      attemptReconnect,
      Math.min(connectRetries.value * 2e3, 8 * TIME.SECOND)
      // maximum 8 seconds backoff
    );
  }
  function pushDisconnect() {
    if (pushSource.value !== null) {
      pushSource.value.removeEventListener("error", onConnectionError);
      pushSource.value.removeEventListener("close", onConnectionError);
      pushSource.value.removeEventListener("message", pushMessageReceived);
      if (pushSource.value.readyState < 2) pushSource.value.close();
      pushSource.value = null;
    }
    isConnectionOpen.value = false;
  }
  function pushConnect() {
    pushDisconnect();
    if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value);
      reconnectTimeout.value = null;
    }
    const useWebSockets = settingsStore.pushBackend === "websocket";
    const restUrl = rootStore.restUrl;
    const url = `/push?pushRef=${pushRef.value}`;
    if (useWebSockets) {
      const { protocol, host } = window.location;
      const baseUrl = restUrl.startsWith("http") ? restUrl.replace(/^http/, "ws") : `${protocol === "https:" ? "wss" : "ws"}://${host + restUrl}`;
      pushSource.value = new WebSocket(`${baseUrl}${url}`);
    } else {
      pushSource.value = new EventSource(`${restUrl}${url}`, { withCredentials: true });
    }
    pushSource.value.addEventListener("open", onConnectionSuccess, false);
    pushSource.value.addEventListener("message", pushMessageReceived, false);
    pushSource.value.addEventListener(useWebSockets ? "close" : "error", onConnectionError, false);
  }
  function attemptReconnect() {
    pushConnect();
  }
  function serializeAndSend(message) {
    if (pushSource.value && "send" in pushSource.value) {
      pushSource.value.send(JSON.stringify(message));
    }
  }
  function onConnectionSuccess() {
    var _a;
    isConnectionOpen.value = true;
    connectRetries.value = 0;
    lostConnection.value = false;
    rootStore.setPushConnectionActive();
    (_a = pushSource.value) == null ? void 0 : _a.removeEventListener("open", onConnectionSuccess);
    if (outgoingQueue.value.length) {
      for (const message of outgoingQueue.value) {
        serializeAndSend(message);
      }
      outgoingQueue.value = [];
    }
  }
  function send(message) {
    if (!isConnectionOpen.value) {
      outgoingQueue.value.push(message);
      return;
    }
    serializeAndSend(message);
  }
  async function pushMessageReceived(event) {
    let receivedData;
    try {
      receivedData = JSON.parse(event.data);
    } catch (error) {
      return;
    }
    onMessageReceivedHandlers.value.forEach((handler) => handler(receivedData));
  }
  const clearQueue = () => {
    outgoingQueue.value = [];
  };
  return {
    pushRef,
    pushSource,
    isConnectionOpen,
    onMessageReceivedHandlers,
    addEventListener,
    pushConnect,
    pushDisconnect,
    send,
    clearQueue
  };
});
export {
  globalLinkActionsEventBus as g,
  usePushConnectionStore as u
};
