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

    // lazy
    `
        const LoginContainer = lazy(() => import('./login'));
        `,

    // React.lazy
    `
        const LoginContainer = React.lazy(() => import('./login'));
        `,
    // реэкспорт/ компонента-алиаса
    `
        const DsLabeled = Labeled;
        `,

    // компонент-алиаса через условие
    `
        const DsLabeled = condition ? Labeled : Label;
        const Image = index < count ? GoldStar : SilverStar;
        `,
    // компонент-алиаса через Object.assign
    `
        const SbPopupIcon = Object.assign(SbPopupIconComponent, { Item: MenuItem });
        `,
    // компонент-алиаса через ??
    `
        const buttonTypes = { primary: ButtonPrimary, base: ButtonBase };
        const RenderComponent = buttonTypes[type] ?? ButtonPrimary;
        `,
    // navigator factory
    `
        const Stack = createNativeStackNavigator();
        `,
    // компонент-алиас через свойство объекта
    `
        const RenderItemLeft = left.RenderItem;
        `,
    // createContext
    `
        const ThemeContext = createContext(defaultTheme);
        export const ThemeContext = React.createContext(defaultTheme);
        `,
    // animated
    `
        const AnimatedImage = animated.Image;
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

    // lazy - некорректное наименование компонента
    {
      code: `
            const loginContainer = lazy(() => import('./login'));
            `,
      errors: [{ messageId: "notPascal", data: { name: "loginContainer" } }],
    },
    // реэкспорт компонента-алиаса, некорректное наименование компонента
    {
      code: `
          export const dsLabeled = Labeled;
        `,
      errors: [{ messageId: "notPascal", data: { name: "dsLabeled" } }],
    },
    // компонент-алиас через условие, некорректное наименование компонента
    {
      code: `
            const dsLabeled = condition ? Labeled : Label;
          `,
      errors: [{ messageId: "notPascal", data: { name: "dsLabeled" } }],
    },
    // компонент-алиас через условие, некорректное наименование компонента
    {
      code: `
        const image = index < count ? GoldStar : SilverStar;
      `,
      errors: [{ messageId: "notPascal", data: { name: "image" } }],
    },
    // компонент-алиас через Object.assign, некорректное наименование компонента
    {
      code: `
              const sbPopupIcon = Object.assign(SbPopupIconComponent, { Item: MenuItem });
          `,
      errors: [{ messageId: "notPascal", data: { name: "sbPopupIcon" } }],
    },
    // компонент-алиас через ??, некорректное наименование компонента
    {
      code: `
          const buttonTypes = { primary: ButtonPrimary, base: ButtonBase };
          const renderComponent = buttonTypes[type] ?? ButtonPrimary;
        `,
      errors: [{ messageId: "notPascal", data: { name: "renderComponent" } }],
    },
    // navigator factory, некорректное наименование компонента
    {
      code: `
        const stack = createNativeStackNavigator();
      `,
      errors: [{ messageId: "notPascal", data: { name: "stack" } }],
    },
    // компонент-алиас через свойство объекта, некорректное наименование компонента
    {
      code: `
        const renderItemLeft = left.RenderItem;
      `,
      errors: [{ messageId: "notPascal", data: { name: "renderItemLeft" } }],
    },
    // createContext, некорректное наименование
    {
      code: `
        const themeContext = createContext(defaultTheme);
      `,
      errors: [{ messageId: "notPascal", data: { name: "themeContext" } }],
    },
    // animated, некорректное наименование
    {
      code: `
        const animatedImage = animated.Image;
      `,
      errors: [{ messageId: "notPascal", data: { name: "animatedImage" } }],
    },
  ],
});
