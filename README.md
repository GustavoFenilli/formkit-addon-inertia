# InertiaJS Formkit Plugin

A plugin for integrating [FormKit](https://github.com/formkit/formkit) and [InertiaJS](https://inertiajs.com/).

## How to use

```bash
npm i inertiajs-formkit-plugin
```

```js
import inertiaFormkitPlugin from 'inertiajs-formkit-plugin'

// formkit.config.js
const config = {
    plugins: [inertiaFormkitPlugin]
}

<FormKit
    type="form"
    submit-label="Login"
    // Now when you call any inertia visit it adds to formkit node the states like loading and disabled
    @submit="(fields) => $inertia.post('/login', fields)"
>
    <FormKit type="email" name="email" label="E-mail" />
    <FormKit type="password" name="password" label="Password" />
</FormKit>
```

For more information about the plugin check out the plugin's [README](https://github.com/gustavofenilli/inertiajs-formkit-plugin/blob/main/packages/lib/README.md)

## Contributing

Any contribution is welcomed, be it an issue found, a feature you would like to see, to any pull request you wish to make.

* [Bug Report](https://github.com/GustavoFenilli/inertiajs-formkit-plugin/issues/new?assignees=GustavoFenilli&labels=bug&template=bug_report.md)
* [Feature Request](https://github.com/GustavoFenilli/inertiajs-formkit-plugin/discussions/new?category=ideas)
* [Pull Request](https://github.com/GustavoFenilli/inertiajs-formkit-plugin#setup-local)

## Setup Local

If you wish to make a pull request, you can test out your feature by following these steps.

1. Install [postgresql](https://www.postgresql.org/)
2. Install [node](https://nodejs.org/en/)
3. Clone this [repository](https://github.com/GustavoFenilli/inertiajs-formkit-plugin)
4. Enter the folder `packages/playground`
5. Rename the file `.env.example` to `.env`
6. Make sure your postgresql information is correct inside the `.env`
7. Run `node ace migration:run`
8. Go back to the root folder
9. Run `npm install`
10. Run `npm dev`
11. Enter `packages/lib` make the changes you want, commit and send us a PR
