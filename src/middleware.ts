import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  // auth guard for protected routes
  const protectedRoutes = ["/profile", "/roles"];
  const isAuthorized = !!context.cookies.get("sb-access-token");
  context.locals.isSignedIn = isAuthorized;

  if (protectedRoutes.includes(context.url.pathname) && !isAuthorized) {
    return next(
      new Request(`${context.url.origin}/signin`, {
        headers: {
          "x-redirect-to": context.url.pathname,
        },
      })
    );
  }

  return next();
});
