/// <reference types="svelte" />
/// <reference types="vite/client" />
interface Window {
  _ctx: {
    csrf_token: string;
    old: Record<string, any>;
    errors: Record<string, any>;
    sessions: Record<string, any>;
    view: string;
    data: any;
  };
}
