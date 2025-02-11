import HomeFeed from '../../components/HomeFeed';
import { DUMMY_PHOTOGRAPHERS } from '../../constants/Data';

export default function HomeScreen() {
  return <HomeFeed photographers={DUMMY_PHOTOGRAPHERS} />;
}