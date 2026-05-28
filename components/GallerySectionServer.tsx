import { getGallery } from "@/lib/api";
import GallerySection from "./GallerySection";

export default async function GallerySectionServer() {
  const gallery = await getGallery();

  return <GallerySection gallery={gallery} />;
}