// import { createClient } from 'contentful';

// const client = createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
// });

// interface NavbarItem {
//   id: string;
//   name: string;
//   url: string;
//   order: string;
// }




// export async function fetchNavbarItems(locale: string = 'en-US'): Promise<NavbarItem[]> {
//   const entries = await client.getEntries({
//     content_type: 'navbar',
//     locale, //us or am
//     order: ['fields.order'],
//   });

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return entries.items.map((item: any) => ({
//     id: item.sys.id,
//     name: item.fields.name,
//     url: item.fields.url,
//     order: item.fields.order,
//   }));
// }



import { createClient, Entry, EntrySkeletonType } from 'contentful';

// Setup Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

// Define the field structure of your 'navbar' content type
type NavbarFields = {
  name: string;
  url: string;
  order: string;
};

// Create a skeleton for entries
type NavbarSkeleton = EntrySkeletonType<NavbarFields, "navbar">;

interface NavbarItem {
  id: string;
  name: string;
  url: string;
  order: string;
}

// Fetch function
export async function fetchNavbarItems(locale: string = 'en-US'): Promise<NavbarItem[]> {
  const entries = await client.getEntries<NavbarSkeleton>({
    content_type: 'navbar',
    locale,
    order: ['fields.order'], // ✅ Now this is valid
  });

  return entries.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
    order: item.fields.order,
  }));
}
