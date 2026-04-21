import { tester } from "./init-tester-config.js";
import rule from "../rules/constant-naming.js";

tester.run("constant-naming", rule, {
  valid: [
    // простые литералы
    `const API_URL = "https://example.com";`,
    `const MAX_COUNT = 10;`,
    `const IS_ENABLED = true;`,

    // статический объект
    `const USER_DATA = { id: 1, name: "Paul" };`,

    // статический массив
    `const COLORS = ["red", "green", "blue"];`,

    // статический объект c type annotation
    `const USER: User = { id: 1, name: "Paul" };`,

    // type annotation "as const" - исключение
    `const UserType = { ADMIN: "admin", USER: "user" } as const;`,

    // не const не проверяется
    `let foo = 1;`,
    `var bar = 2;`,
  ],

  invalid: [
    {
      code: `const apiUrl = "https://example.com";`,
      errors: [{ messageId: "notUpperSnake", data: { name: "apiUrl" } }],
    },
    {
      code: `const maxCount = 10;`,
      errors: [{ messageId: "notUpperSnake", data: { name: "maxCount" } }],
    },
    {
      code: `const userData = { id: 1 };`,
      errors: [{ messageId: "notUpperSnake", data: { name: "userData" } }],
    },
    {
      code: `const userData: User = { id: 1 };`,
      errors: [{ messageId: "notUpperSnake", data: { name: "userData" } }],
    },
    {
      code: `const colors = ["red", "green"];`,
      errors: [{ messageId: "notUpperSnake", data: { name: "colors" } }],
    },
  ],
});
