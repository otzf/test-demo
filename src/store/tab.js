import { Select } from "element-ui";
import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [],
  },

  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      console.log(val, "val");
      if (val.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    closeMenu(state, item) {
      console.log(item, "item");
      const index = state.tabsList.findIndex((val) => val.name === item.name);
      state.tabsList.splice(index, 1);
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(state.menu));
    },
    // 动态添加路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get("menu")) return
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const menuList = [];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            // 为什么
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuList.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuList.push(item);
        }
      });
      console.log(menuList,"menuList");
      menuList.forEach(item => {
        router.addRoute("Main", item);
      });
    },
  },
};
