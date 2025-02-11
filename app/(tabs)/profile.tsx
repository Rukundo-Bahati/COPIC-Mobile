import ProfilePage from '../../components/ProfilePage';
import { CURRENT_USER } from '../../constants/Data';

export default function ProfileScreen() {
  return <ProfilePage user={CURRENT_USER} />;
}