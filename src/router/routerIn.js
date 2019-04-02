const NavigationPges = resolve => require(['../Navigation'], resolve)

export const routes = [
  {
    path: '/',
    name: 'NavigationPges',
    component: NavigationPges,
    meta: {
      keepAlive: true // 需要被缓存
    },
    children: []
  }
]
