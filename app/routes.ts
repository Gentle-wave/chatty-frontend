import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    // layout("./auth/layout.tsx", [
    //     route("login", "./auth/login.tsx"),
    //     route("register", "./auth/register.tsx"),
    // ]),
    layout("routes/home.tsx", [
        index("chat/EmptyRoom.tsx"),
        route(':roomId', "chat/RightSide.tsx")
    ]),
    layout("routes/auth/layout.tsx", [
        route("login", "routes/auth/Login.tsx"),
        route("signup", "routes/auth/Signup.tsx"),
    ])

] satisfies RouteConfig;
