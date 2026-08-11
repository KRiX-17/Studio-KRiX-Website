import { permanentRedirect } from "next/navigation";

type CasaRedirectPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CasaRedirectPage({
  searchParams,
}: CasaRedirectPageProps) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.set(key, value);
    }
  }

  const suffix = query.toString();
  permanentRedirect(suffix ? `/lakaz?${suffix}` : "/lakaz");
}
