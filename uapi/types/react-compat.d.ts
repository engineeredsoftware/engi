declare module 'react' {
  export type DependencyList = readonly unknown[];
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;

  export interface MutableRefObject<T> {
    current: T;
  }

  export interface RefObject<T> {
    readonly current: T | null;
  }

  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: () => void | (() => void), deps?: DependencyList): void;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
  export function useRef<T>(initialValue: T): MutableRefObject<T>;
  export function useRef<T>(initialValue: T | null): RefObject<T>;
}
