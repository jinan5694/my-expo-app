https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/BottomNavigationBar

# react-navigation bottom-tab
`tabBar` 这个api 配合 RNP 的组件可以实现改变样式
https://reactnavigation.org/docs/bottom-tab-navigator#tabbar

## 更新依赖
```shell
npx expo install --fix
```

## flatlist 优化心得
pureComponent 是没有内部状态的函数式组件。内部不可以有外部引入的东西，包括样式。

需要使用 `React.memo`包裹。