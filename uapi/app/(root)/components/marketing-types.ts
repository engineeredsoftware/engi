export interface Screenshot {
  id: string;
  src: string;
  alt: string;
  description?: string;
  width?: number;
  height?: number;
  revealingSoon?: boolean;
}