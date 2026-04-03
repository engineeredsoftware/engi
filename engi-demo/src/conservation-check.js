export function buildConservationCheck(bundleId, meteredUnits, allocations) {
  const allocatedUnits = (allocations || []).reduce((sum, item) => sum + Number(item.units || 0), 0);
  return {
    bundleId,
    meteredUnits,
    allocatedUnits,
    conserved: allocatedUnits === meteredUnits,
    difference: allocatedUnits - meteredUnits,
    allocations: allocations || []
  };
}
