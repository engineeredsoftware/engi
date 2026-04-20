import React, { type ComponentProps } from "react";

import OrbitalsConnectsPane from "@/app/orbitals/components/OrbitalsConnectsPane";

export type AuxillariesConnectsPaneProps = ComponentProps<typeof OrbitalsConnectsPane>;

export default function AuxillariesConnectsPane(props: AuxillariesConnectsPaneProps) {
  return <OrbitalsConnectsPane {...props} />;
}
