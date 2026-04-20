import type { ComponentProps } from "react";

import OrbitalsBTDPane from "@/app/orbitals/components/OrbitalsBTDPane";

export type AuxillariesBTDPaneProps = ComponentProps<typeof OrbitalsBTDPane>;

export default function AuxillariesBTDPane(props: AuxillariesBTDPaneProps) {
  return <OrbitalsBTDPane {...props} />;
}
