import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { type VrmBaseActionParam } from "../assets/vrm";

export const useActionListStroe = defineStore("action-list", () => {
  const list: VrmBaseActionParam[] = reactive([]);

  const uuidList = computed(() => {
    return list.map((e) => e.uuid);
  });

  function addAction(action: VrmBaseActionParam) {
    const index = uuidList.value.indexOf(action.uuid);
    if (index !== -1) throw new Error(`duplicate action ${action.uuid}`);
    list.push(action);
  }

  function updateAction(action: VrmBaseActionParam) {
    const index = uuidList.value.indexOf(action.uuid);
    if (index === -1) throw new Error(`null action ${action.uuid}`);
    list[index] = action;
  }

  function deleteAction(uuid: string) {
    const index = uuidList.value.indexOf(uuid);
    if (index === -1) throw new Error(`null action ${uuid}`);
    list.splice(index, 1);
  }

  function readFromLocal(key: string = "actionList") {
    const str = localStorage.getItem(key) ?? "[]";
    list.length = 0;
    list.push(...JSON.parse(str));
  }

  function saveToLocal(key: string = "actionList") {
    localStorage.setItem(key, JSON.stringify(list));
  }

  return {
    list,
    uuidList,
    addAction,
    updateAction,
    deleteAction,
    readFromLocal,
    saveToLocal,
  };
});
