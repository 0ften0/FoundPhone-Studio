import { uid, type Work } from "./schema";
import { getApp, registry } from "./registry";
export type AppConfig = Work["apps"][number];
export const essentialApps = [
  "appstore",
  "phone",
  "messages",
  "photos",
  "notes",
  "safari",
  "settings",
];
export function category(id: string) {
  if (id === "appstore") return "系统";
  const index = registry.findIndex((a) => a.id === id);
  return index < 0
    ? "自定义"
    : index < 20
      ? "系统"
      : index < 31
        ? "中国"
        : "国际";
}
export function installApp(w: Work, id: string) {
  let app = w.apps.find((a) => a.id === id);
  if (!app) {
    app = {
      id,
      name: getApp(id).name,
      installed: true,
      visible: true,
      dock: false,
      folder: "",
      icon: "",
    };
    w.apps.push(app);
  }
  app.installed = true;
  app.visible = true;
  w.data[id] ??= [];
}
export function removeFromHome(w: Work, id: string) {
  const a = w.apps.find((a) => a.id === id);
  if (a) {
    a.visible = false;
    a.dock = false;
  }
}
export function uninstallApp(w: Work, id: string, keepData: boolean) {
  const a = w.apps.find((a) => a.id === id);
  if (a) {
    a.installed = false;
    a.visible = false;
    a.dock = false;
  }
  if (!keepData) delete w.data[id];
}
export function moveApp(w: Work, id: string, target: string) {
  const from = w.apps.findIndex((a) => a.id === id),
    to = w.apps.findIndex((a) => a.id === target);
  if (from < 0 || to < 0 || from === to) return;
  const [app] = w.apps.splice(from, 1);
  w.apps.splice(to, 0, app);
}
export function newCustomApp(w: Work, name: string) {
  const id = uid();
  w.apps.push({
    id,
    name,
    installed: true,
    visible: true,
    dock: false,
    folder: "",
    icon: "",
  });
  w.data[id] = [];
  return id;
}
