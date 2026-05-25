import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContext {
  path: string;
  params: Record<string, string>;
  query: URLSearchParams;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterContext>({
  path: '/',
  params: {},
  query: new URLSearchParams(),
  navigate: () => {},
});

export function useLocation() {
  return useContext(Ctx);
}

export function useNavigate() {
  const { navigate } = useContext(Ctx);
  return navigate;
}

export function useParams() {
  return useContext(Ctx).params;
}

export function useSearchParams(): [URLSearchParams] {
  return [useContext(Ctx).query];
}

function getHash() {
  const hash = window.location.hash.slice(1) || '/';
  const [path, qs] = hash.split('?');
  return { path: path || '/', query: new URLSearchParams(qs || '') };
}

export function Router({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(getHash);

  useEffect(() => {
    const onHashChange = () => setState(getHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return (
    <Ctx.Provider value={{ path: state.path, params: {}, query: state.query, navigate }}>
      {children}
    </Ctx.Provider>
  );
}

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export function Routes({ routes }: { routes: RouteConfig[] }) {
  const { path } = useContext(Ctx);

  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params !== null) {
      return (
        <Ctx.Consumer>
          {(ctx) => (
            <Ctx.Provider value={{ ...ctx, params }}>
              {route.element}
            </Ctx.Provider>
          )}
        </Ctx.Consumer>
      );
    }
  }

  // Fallback to first route (home)
  return <>{routes[0]?.element}</>;
}

export function Link({ to, children, className, ...props }: { to: string; children: React.ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = to;
    window.scrollTo(0, 0);
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
