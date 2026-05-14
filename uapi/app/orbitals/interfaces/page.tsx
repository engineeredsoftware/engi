import { redirect } from 'next/navigation';
import { buildAuxillariesRoutePath } from '@/app/auxillaries/components/auxillary-pane-meta';

export default function OrbitalsInterfacesPage() {
  redirect(buildAuxillariesRoutePath('interfaces'));
}
