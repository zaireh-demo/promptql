// Define the exact columns you need
export interface PersonOrgDoc {
  id: string;
  schema: string;
  name: string;
  aliases: string;
  birth_date: string;
  countries: string;
  addresses: string;
  identifiers: string;
  sanctions: string;
  phones: string;
  emails: string;
  dataset: string;
  first_seen: string;
  last_seen: string;
  last_change: string;
}

const SEARCH_ENDPOINT = "https://promptqldemo.search.windows.net";
const SEARCH_INDEX = "azureblob-index";
const SEARCH_API_KEY = "<azure_key>";

export async function searchByName(
  name?: string
): Promise<{ results: PersonOrgDoc[] }> {
  if (!name) return { results: [] };

  const url =
    `${SEARCH_ENDPOINT}/indexes/${SEARCH_INDEX}/docs` +
    `?api-version=2024-07-01&search eq name`;

  const resp = await fetch(url, {
    headers: {
      "api-key": SEARCH_API_KEY,
      "Content-Type": "application/json",
    },
  });
  if (!resp.ok) {
    throw new Error(`Search API error ${resp.status}: ${await resp.text()}`);
  }

  const data = (await resp.json()) as { value: PersonOrgDoc[] };
  return { results: data.value ?? [] };
}

