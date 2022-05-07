import {
  Application,
  Context,
  Router,
  Status,
} from "https://deno.land/x/oak@v10.2.0/mod.ts";

const app = new Application();

const router = new Router();
router
  .get("/", (ctx: Context) => {
    const agent = ctx.request.headers.get("user-agent");
    if(!agent) {
      return;
    }
    const split = agent.split(/[\s+|\/]/g)
    if(split.includes("Firefox")) {
      ctx.response.body = "Ooh you use firefox, or atleast appear to, (smh to those who changed their user-agent), anyway you deserve a cookie"
      ctx.response.headers.set("Refresh", "5;https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    } else {
      ctx.response.body = "Please for all purposes and reasons, switch to Firefox for your daily usage. As you are not currently using Firefox, we cannot serve you this page, for this server only serves OSS consumers"
      ctx.response.headers.set("Refresh", "5;https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
  })

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Listening on: ${hostname}:${port}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
