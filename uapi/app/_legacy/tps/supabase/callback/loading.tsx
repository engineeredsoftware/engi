/**
 * Route-level loader for /tps/supabase/callback.
 */
export default function Loading() {
  return (
    <div className="callback-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'black',
        pointerEvents: 'auto',
      }}
    />
  );
}
