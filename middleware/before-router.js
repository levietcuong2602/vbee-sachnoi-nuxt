export default async ({ redirect, route, app }) => {
  const whiteList = ["/login", "/register"]; // no redirect whitelist
  // determine whether the user has logged in
  const hasToken = app.$auth.getToken("local");

  if (hasToken) {
    if (whiteList.indexOf(route.path) !== -1) {
      // if is logged in, redirect to the home page
      redirect("/");
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(route.path) === -1) {
      // in the free login whitelist, go directly
      redirect({ path: "/login", query: { redirect: route.path } });
    }
  }
};
