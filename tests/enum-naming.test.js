import { tester } from "./init-tester-config.js";
import rule from "../rules/enum-naming.js";

tester.run("enum-naming", rule, {
  valid: [
    // корректный ts enum
    `
        enum BarColors {
            RED = 'red',
            DARK_BLUE = 'darkBlue',
        }
        `,

    // корректный object enum
    `
        const AppRoute = {
            LOGIN: '/login',
            MAIN: '/main',
        } as const;
        `,

    // пустой объект не попадает под правила
    `
        const headerCells: HeaderCells = {};
        `,

    // объект с функциями не попадает под правила
    `
        const TemplateAPI = {
            async getTemplateAnswer() {},
        } as const;
        `,

    // computed key не должен падать
    `
        const AppRoute = {
            ['LOGIN']: '/login',
            MAIN: '/main',
        } as const;
        `,

    // as SomeType не должен считаться enum-like (правило только про as const)
    `
        type Routes = Record<string, string>;
        const AppRoute = {
            login: '/login',
            MAIN: '/main',
        } as Routes;
        `,

    // satisfies поверх as const тоже должен проверяться
    `
        type Routes = Record<string, string>;
        const AppRoute = {
            LOGIN: '/login',
            MAIN: '/main',
        } as const satisfies Routes;
        `,
  ],

  invalid: [
    // имя ts enum не PascalCase
    {
      code: `
            enum barColors {
                RED = 'red',
            }
            `,
      errors: [{ messageId: "enumNameNotPascal" }],
    },

    // ключ ts enum не UPPER_SNAKE_CASE
    {
      code: `
            enum BarColors {
                red = 'red',
            }
            `,
      errors: [{ messageId: "enumKeyNotUpperSnake" }],
    },

    // имя object enum не PascalCase
    {
      code: `
            const appRoute = {
                LOGIN: '/login',
                MAIN: '/main',
            } as const;
            `,
      errors: [{ messageId: "enumNameNotPascal" }],
    },

    // ключ object enum не UPPER_SNAKE_CASE
    {
      code: `
            const AppRoute = {
                login: '/login',
                MAIN: '/main',
            } as const;
            `,
      errors: [{ messageId: "enumKeyNotUpperSnake" }],
    },
  ],
});
