import { route, GET } from "awilix-koa";
import { Context } from "koa";
@route("/")
class IndexController {
    @GET()
    async actionIndex(ctx: Context, next: () => Promise<object>) {
        ctx.body = await ctx.render("index");
    }
}
export default IndexController;