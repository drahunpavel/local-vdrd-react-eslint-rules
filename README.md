## Подключение в `eslint.config`

После установки пакета `vdrd-react-eslint-rules` подключите его в общий ESLint‑конфиг:

```ts
import vdrdReactEslintRules from 'vdrd-react-eslint-rules';

export default [
    // базовые конфиги ESLint
    ...configs.recommended,

    // подключение набора правил из плагина
    vdrdReactEslintRules.configs.recommended,

    // дополнительные настройки
    {
        rules: {
            // при необходимости можно переопределить параметры правил
            'vdrd-react-eslint-rules/component-naming': 'error',
        },
    },
];
