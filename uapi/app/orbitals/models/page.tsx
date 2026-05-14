import { redirect } from 'next/navigation';
import { buildAuxillariesRoutePath } from '@/app/auxillaries/components/auxillary-pane-meta';

export default function OrbitalsInterfacesRedirectPage() {
  redirect(buildAuxillariesRoutePath('interfaces'));
}
