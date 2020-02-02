import path from 'path'

export function onlyOneShowingChild(children = [], parent) {
  let onlyOneChild = null
  const showingChildren = children.filter(item => !item.hidden)

  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    return onlyOneChild
  }

  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ... parent, path: '', noShowingChildren: true }
    return onlyOneChild
  }

  return false
}

export function generateRoutes(routes, basePath = '/') {
  const res = []

  for (let route of routes) {
    // skip some route
    if (route.hidden) { continue }

    const onlyOneShowingChilda = onlyOneShowingChild(route.children, route)

    if (route.children && onlyOneShowingChilda && !route.alwaysShow) {
      route = onlyOneShowingChilda
    }

    const data = {
      path: path.resolve(basePath, route.path),
      title: route.meta && route.meta.title

    }

    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children, data.path)
    }
    res.push(data)
  }
  return res
}

export function generateTree(routes, basePath = '/', checkedKeys) {
  const res = []

  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)

    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys)
    }

    if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
      res.push(route)
    }
  }
  return res
}
