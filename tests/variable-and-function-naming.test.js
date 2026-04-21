import { tester } from "./init-tester-config.js";
import rule from "../rules/variable-and-function-naming.js";

tester.run("variable-and-function-naming", rule, {
  valid: [
    // camelCase переменная
    `
        const userName = 'Admin';
        `,

    // camelCase функция
    `
        function getUser() {}
        `,

    // компонент - исключение
    `
        const UserCard = () => <div />;
        `,

    // компонент через memo - исключение
    `
        const UserCard = memo(() => <div />);
        `,

    // компонент через forwardRef - исключение
    `
        const Input = forwardRef((props, ref) => <input ref={ref} />);
        `,

    // компонент через идентификатор - исключение
    `
        const UserCard = memo(UserCardInner);
        `,

    // константа - исключение
    `
        const API_URL = 'https://api.com';
        `,

    // object enum объект - исключение
    `
        const AppRoute = {
            LOGIN: '/login',
            MAIN: '/main',
        } as const;
        `,

    // статический объект - исключение
    `
        const config = { a: 1 };
        `,

    // статический массив - исключение
    `
        const list = [1, 2, 3];
        `,

    // пустой объект - исключение
    `
        const headerCells = {};
        `,

    // объект с type annotation - исключение
    `
        const user: User = { id: 1 };
        `,
  ],

  invalid: [
    // переменная в snake_case
    {
      code: `
            const user_name = 'Paul';
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "user_name" } }],
    },

    // переменная с заглавной буквы
    {
      code: `
            const UserName = 'Paul';
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "UserName" } }],
    },

    // функция в snake_case
    {
      code: `
            function get_user() {}
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "get_user" } }],
    },

    // переменная с неправильным именем
    {
      code: `
            const Some_value = compute();
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "Some_value" } }],
    },

    // переменная в PascalCase, но не компонент
    {
      code: `
            const UserName = computeValue();
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "UserName" } }],
    },

    // некорректное имя
    {
      code: `
            const User_List = getList();
            `,
      errors: [{ messageId: "notCamelCase", data: { name: "User_List" } }],
    },
  ],
});
