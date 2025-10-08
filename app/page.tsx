import { fetchNavbarItems} from '@/lib/api/api';
import { Header } from '@/components/Header';



export default async function Page() {
  const navbarItems = await fetchNavbarItems('en-US');

  return (
    <>
      <Header initialNavbarItems={navbarItems} />
    </>
  );
}


