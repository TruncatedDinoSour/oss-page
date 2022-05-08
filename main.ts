import {
  Application,
  Context,
  Router,
  Status,
} from "https://deno.land/x/oak@v10.2.0/mod.ts";

const app = new Application();

const database: [{ip: string, agent: string | undefined}] = [{ip: "", agent: "insert agent here"}];

const router = new Router();
router
  .get("/", (ctx: Context) => {
    const agent = ctx.request.headers.get("user-agent");
    if(!agent) {
      return;
    }
    const split = agent.split(/[\s+|\/]/g)
    let user: {ip: string, agent: string | undefined} | undefined = database.find(x => x.ip === ctx.request.ip)
    if(!user) {
      user = database.at(database.push({ip: ctx.request.ip, agent: split.at(-2)}))
      return
    }
    let ua = user?.agent
    if(split.includes("Firefox")) {
      ua = "Firefox"
      ctx.response.body = "Ooh you use firefox, or atleast appear to, (smh to those who changed their user-agent), anyway you deserve a cookie"
      ctx.response.headers.set("Refresh", "4;https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    } else {
      if(ua !== "Firefox") {
      ctx.response.body = "Please for all purposes and reasons, switch to Firefox for your daily usage. As you are not currently using Firefox, we cannot serve you this page, for this server only serves OSS consumers"
        ua = split.at(split.length - 2)
      } else {
        ctx.response.body = "You betrayer, how could you use firefox and then switch to another browser (or switch your user-agent), smh."
        ua = split.at(split.length - 2)
      }
      user.agent = ua
    }
  })

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Listening on: ${hostname}:${port}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
