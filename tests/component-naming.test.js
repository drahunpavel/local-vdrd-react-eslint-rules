import { tester } from "./init-tester-config.js";
import rule from "../rules/component-naming.js";

tester.run("component-naming", rule, {
  valid: [
    // function declaration
    `
        function UserProfile() {
            return <div />;
        }
        `,

    // variable declarator
    `
        const LoginForm = () => <form />;
        `,

    // memo
    `
        const UserCard = memo(() => <div />);
        `,

    // forwardRef
    `
        const Input = forwardRef((props, ref) => <input ref={ref} />);
        `,

    //  class declarator
    `
        class UserTable extends React.Component {
            render() {
                return <table />;
            }
        }
        `,

    // правило игнорирует внутренние функции, которые возвращают jsx
    `
        const Table = () => {
            const renderBody = () => <tbody />;
            return <table>{renderBody()}</table>;
        };
        `,

    // правило игнорирует внутренние функции, которые возвращают jsx
    `
        function Page() {
            function renderHeader() {
                return <header />;
            }
            return <div>{renderHeader()}</div>;
        }
        `,
  ],

  invalid: [
    // function declaration - некорректное наименование компонента
    {
      code: `
            function userProfile() {
                return <div />;
            }
            `,
      errors: [{ messageId: "notPascal", data: { name: "userProfile" } }],
    },

    // variable declarator — некорректное наименование компонента
    {
      code: `
            const loginForm = () => <form />;
            `,
      errors: [{ messageId: "notPascal", data: { name: "loginForm" } }],
    },

    // memo - некорректное наименование компонента
    {
      code: `
            const userCard = memo(() => <div />);
            `,
      errors: [{ messageId: "notPascal", data: { name: "userCard" } }],
    },

    // forwardRef - некорректное наименование компонента
    {
      code: `
            const input = forwardRef((props, ref) => <input ref={ref} />);
            `,
      errors: [{ messageId: "notPascal", data: { name: "input" } }],
    },

    // class declarator - некорректное наименование компонента
    {
      code: `
            class userTable extends React.Component {
                render() {
                    return <table />;
                }
            }
            `,
      errors: [{ messageId: "notPascal", data: { name: "userTable" } }],
    },
  ],
});
