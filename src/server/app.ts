import * as Koa from "koa";
import * as render from 'koa-swig';
import * as co from 'co';
import * as  serve from 'koa-static';
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import { join } from "path";
const app = new Koa();
app.context.render = co.wrap(render({
    root: join(__dirname, 'views'),
    autoescape: true,
    cache: false, // disable, set to false
    ext: 'html',
    writeBody: false
}));
const container = createContainer();
container.loadModules([__dirname + "/services/*.ts"], {
    formatName: "camelCase",
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
})
//跟koa融合起来
app.use(serve(__dirname + '/assets'));
app.use(historyApiFallback({ index:"/",whiteList: ['/api'] }));
app.use(scopePerRequest(container));
app.use(loadControllers(__dirname + "/controllers/*.ts"));
app.listen(3000, () => {
    console.log("服务启动成功🍺");
});