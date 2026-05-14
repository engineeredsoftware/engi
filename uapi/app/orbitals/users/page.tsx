import { redirect } from 'next/navigation';
import { buildAuxillariesRoutePath } from '@/app/auxillaries/components/auxillary-pane-meta';

export default function OrbitalsUsersPage() {
  redirect(buildAuxillariesRoutePath('profile'));
}
