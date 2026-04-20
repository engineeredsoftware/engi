import type { ComponentProps } from "react";

import OrbitalsProfilePane from "@/app/orbitals/components/OrbitalsProfilePane";

export type AuxillariesProfilePaneProps = ComponentProps<typeof OrbitalsProfilePane>;

export default function AuxillariesProfilePane(props: AuxillariesProfilePaneProps) {
  return <OrbitalsProfilePane {...props} />;
}
