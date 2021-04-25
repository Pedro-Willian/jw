import { GrupoScreen } from 'screens/congregacao/grupo/core-grupo';
import { HomeScreen } from 'screens/home';
import { Screen404 } from 'screens/screen-404';

export type Router = {
  url: string;
  title: string;
  component: () => JSX.Element;
};

const getRoute = (pathname: string) => {
  switch (pathname) {
    // -----------HOME-----------
    case '/':
      return {
        url: pathname,
        title: 'Sistema',
        component: HomeScreen,
      };

    // -----------CONGREGAÇÃO-----------
    case '/congregacao-grupos':
      return {
        url: pathname,
        title: 'Grupos',
        component: GrupoScreen,
      };
    // -----------CONGREGAÇÃO-----------

    // -----------PUBLICADORES-----------
    // ROTAS AQUI
    // -----------PUBLICADORES-----------

    // -----------PROGRAMAR-----------
    // ROTAS AQUI
    // -----------PROGRAMAR-----------

    // -----------DEFAULTS-----------
    default:
      return {
        url: pathname,
        title: 'Página não encontrada',
        component: Screen404,
      };
  }
};

export { getRoute };
