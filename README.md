A starter kit for TypeScript-based Gatsby projects with sensible defaults. Use it for creating new project.

## 💡 Required knowledge

> Main

- [ReactJS] https://reactjs.org/docs/getting-started.html
- [Gatsby] https://www.gatsbyjs.com/docs/
- [Typescript] https://www.typescriptlang.org/docs/handbook/intro.html
- [Redux] https://redux.js.org/introduction/getting-started
- [Redux-saga] https://redux-saga.js.org/docs/introduction/GettingStarted
- [SocketIO] https://socket.io/docs/v4/client-api/
- [Sass] https://sass-lang.com/documentation/syntax
- [emotion] https://emotion.sh/docs/introduction
- [AntdDesign] https://ant.design/docs/react/introduce

## ❓ What should be done after cloning a template for a project?

- **Read the flow and learn the convention code contained in the source.**
- **Remove libraries that are not needed for the project.**
- **Upgrade packages if they are outdated.**

## ⚙️ Setup project

> Prerequisites:

Using [nvm](https://github.com/nvm-sh/nvm) for node version management.

```bash
Node: >= v14.5.0
```

1. **Setup local environment**

> In the root directory, create a file called `.env` with the following contents(or copy contents in `env.example` file):

```bash
GATSBY_ARC_GIS=

GATSBY_API_URL=
GATSBY_SOCKET_URL=
GATSBY_GOOGLE_SITE_VERIFICATION=
GATSBY_GOOGLE_ANALYTICS=
GATSBY_SITE_MAP_URL=
GATSBY_SENTRY_DSN_URL=
GATSBY_GOOGLE_CLIENT_ID=

NODE_OPTIONS=--max_old_space_size=4096
```

2.  **Build your application in development.**

> Move to project's directory.

```bash
cd kingmakerdata-web/
```

> Install library in package.json file

```bash
npm install
```

> Start your site.

```bash
npm run dev
```

3.  **Build your application in production.**

> Move to project's directory.

```bash
cd kingmakerdata-web/
```

> Clear the cache in the project

```bash
npm run clean
```

> Install library in package.json file

```bash
npm install
```

> Build your project

```bash
npm run build
```

> Run your project in production

```bash
npm run serve
```

4. **Upgrade api sdk.**

> In terminal, run command line:

```bash
npm run upgrade-sdk
```
