import type { ComponentProps } from "react";

import OrbitalsInterfacesPane from "@/app/orbitals/components/OrbitalsInterfacesPane";

export type AuxillariesInterfacesPaneProps = ComponentProps<typeof OrbitalsInterfacesPane>;

export default function AuxillariesInterfacesPane(props: AuxillariesInterfacesPaneProps) {
  return <OrbitalsInterfacesPane {...props} />;
}
