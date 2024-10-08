import { Heading2 } from '@components/ui/heading-2';
import { SignOut } from '@components/auth/sign-out';
import { ProfileForm } from '@components/profile/profile-form';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';

const Profile = async () => {
  const session = await auth();

  if (!session) throw new Error('User not found');

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  if (!user) throw new Error('User not found');

  return (
    <div className="mt-4 px-6 md:px-20">
      <div className="mb-4 flex items-center gap-4">
        {user.image && (
          <Image
            src={user.image}
            alt="Profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        <Heading2>Mi perfil</Heading2>
      </div>

      <ProfileForm user={user} />
      <SignOut />
    </div>
  );
};

export default Profile;
