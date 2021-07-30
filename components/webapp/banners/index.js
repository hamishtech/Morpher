import { SimpleGrid } from "@chakra-ui/react";
import UploadModal from "../uploadModal";
import BannerCard from "./bannerCard";

const BannerView = ({ banners, setBanners }) => {
  if (!banners) return null;
  return (
    <>
      <SimpleGrid
        spacing='10px'
        columns={{
          base: 1,
          md: 1,
        }}
      >
        {banners.map((banner) => {
          return (
            <BannerCard
              key={banner.id}
              banner={banner}
              setBanners={setBanners}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default BannerView;
