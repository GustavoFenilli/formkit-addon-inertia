import '../css/app.css'
import '@formkit/themes/genesis'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { plugin as formkitPlugin, defaultConfig } from '@formkit/vue'

createInertiaApp({
  resolve: (name) => require(`./Pages/${name}`),
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .use(formkitPlugin, defaultConfig())
      .mount(el)
  },
})

InertiaProgress.init()