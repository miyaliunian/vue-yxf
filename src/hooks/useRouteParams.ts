import { useRoute } from 'vue-router'

export function useRouteParams() {
  let route
  if (!route) {
    route = useRoute()
  }
  const { creditUserId } = route.params

  return {
    creditUserId,
  }
}
