import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

interface NavbarItem {
  id: string;
  name: string;
  url: string;
  order: string;
}


export async function fetchNavbarItems(locale: string = 'en-US'): Promise<NavbarItem[]> {
  const entries = await client.getEntries({
    content_type: 'navbar',
    locale, //us or am
    order: ['fields.order'],
  });

  return entries.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    order: item.fields.order,
  }));
}
