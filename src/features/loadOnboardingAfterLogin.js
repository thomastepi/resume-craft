import { loadGuidefoxAgent } from "../lib/loadGuidefox";

export default function loadOnboardingAfterLogin(user) {
  if (!user) return;
  const returningUser = Boolean(
    user.firstName &&
      user.lastName &&
      user.email &&
      user.mobileNumber &&
      user.address &&
      user.summary
  );
  const isNewUser = !returningUser;
  if (!isNewUser) return;

  loadGuidefoxAgent({
    user: {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    },
  }).catch(console.error);
}
