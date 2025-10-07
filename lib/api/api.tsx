import { createClient, Entry, EntryFieldTypes } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const localeMap: Record<string, string> = {
  eu: 'en-US', 
  am: 'hy',
};

interface NavbarItem {
  id: string;
  name: string;
  url: string;
  order: number;
}

type NavbarEntrySkeleton = {
  contentTypeId: 'navbar';
  fields: {
    name: EntryFieldTypes.Text;
    url: EntryFieldTypes.Text;
    order: EntryFieldTypes.Number; 
  };
};

export async function fetchNavbarItems(locale: string = 'en-US'): Promise<NavbarItem[]> {
  const validLocale = localeMap[locale] || 'en-US';
  console.log('Using locale:', validLocale);
  try {
    const entries = await client.getEntries<NavbarEntrySkeleton>({
      content_type: 'navbar',
      locale: validLocale,
      order: ['sys.createdAt']
    });

   return (entries.items as Entry<NavbarEntrySkeleton>[]).map((item) => ({
  id: item.sys.id,
  name: String(item.fields.name),
  url: String(item.fields.url),
  order: Number(item.fields.order),
})).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch navbar items:', error);
    return [];
  }
}

//Contentful's SDK (v10+) no longer supports sorting by fields like fields.order directly in the query.
// Enable fallback (optional)
// If you want Contentful to fall back to en-US when a field is missing in hy, you can configure fallback locales in: