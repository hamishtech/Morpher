import { SimpleGrid } from "@chakra-ui/react";
import AvatarCard from "./avatarCard";

const AvatarView = ({ avatars, setAvatars }) => {
  if (!avatars) return null;
  return (
    <>
      <SimpleGrid
        spacing='100px'
        columns={{
          base: 1,
          md: avatars.length > 1 ? (avatars.length === 2 ? 2 : 3) : 1,
        }}
      >
        {avatars.map((avatar) => {
          return (
            <AvatarCard
              key={avatar.id}
              avatar={avatar}
              setAvatars={setAvatars}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default AvatarView;
