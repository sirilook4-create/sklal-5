/*
# Revoke execute on _insert_move from all roles

## Rationale
`_insert_move` is an internal SECURITY DEFINER function called by higher-level
functions. It should never be called directly from the frontend.
*/

revoke all on function public._insert_move(
  integer, integer, integer, numeric, numeric,
  text, text, integer, integer, uuid, text,
  timestamp with time zone, bigint
) from public, anon, authenticated;