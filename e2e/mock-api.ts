import { Page } from '@playwright/test';

const API = 'http://localhost:8090/api/v1/';

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();

const devices = [
  { id: 'dev-1', name: 'Living room', isMain: true },
  { id: 'dev-2', name: 'Bedroom', isMain: false },
];

const measurements = (seed: number) =>
  Array.from({ length: 48 }, (_, i) => ({
    device: 'dev-1',
    temperature: +(21 + seed + Math.sin(i / 4) * 1.5).toFixed(1),
    humidity: +(45 + Math.cos(i / 5) * 6).toFixed(0),
    measuredAt: hoursAgo(48 - i),
  }));

const weather = (i: number) => ({
  id: `w${i}`,
  main: { temp: +(8 + Math.sin(i / 3) * 4).toFixed(1), temp_max: 12, temp_min: 4, feels_like: 6.2, humidity: 71 },
  sys: { sunrise: 0, sunset: 0 },
  weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
  dt_txt: new Date(Date.now() + i * 3 * 3_600_000).toISOString(),
  pop: +(Math.abs(Math.sin(i / 2)) * 0.8).toFixed(2),
});

const articles = [
  { id: 'a1', title: 'Home server setup', isPrivate: false, isPubliclyEditable: false, section: 's1', createdBy: 'u1' },
  { id: 'a2', title: 'Keycloak notes', isPrivate: true, isPubliclyEditable: false, section: 's1', createdBy: 'u1' },
  { id: 'a3', title: 'Sourdough recipe', isPrivate: false, isPubliclyEditable: true, section: 's1', createdBy: 'u2' },
  { id: 'a4', title: 'Raspberry Pi sensors', isPrivate: false, isPubliclyEditable: false, section: 's1', createdBy: 'u1' },
];

const section = (id: string, superSection: string, depth: number, title: string, text: string) => ({
  id, superSection, depth, title, text, latestRevision: `r-${id}`, sectionOrder: 0, createdBy: 'u1', article: 'a1', subsections: [],
});

const sections = [
  section('s1', '', 0, '', 'Notes on how the **home server** is put together.\n\n- Fedora Server\n- Podman containers\n- Nightly backups'),
  section('s2', 's1', 1, 'Hardware', 'Intel N100 mini PC, 16 GB RAM, 2 TB NVMe.\n\n```bash\nsudo dnf install podman\n```'),
  section('s3', 's1', 1, 'Networking', 'Reverse proxy with Caddy. Services are exposed only over the VPN.'),
  section('s4', 's3', 2, 'DNS', 'Local resolver with ad blocking.'),
];

/** Fulfils backend calls with fixed data and makes Keycloak unreachable so the app runs logged out. */
export async function mockApi(page: Page): Promise<void> {
  await page.route('http://localhost:8080/**', (route) => route.abort());
  await page.route(`${API}**`, (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace('/api/v1/', '');
    const json = (body: unknown) => route.fulfill({ json: body });
    if (path === 'devices') return json(devices);
    if (path === 'measurements/latest') return json(measurements(0).at(-1));
    if (path === 'measurements') return json(measurements(url.searchParams.get('deviceId') === 'dev-2' ? -2 : 0));
    if (path === 'scheduled/weather') return json(weather(0));
    if (path === 'scheduled/forecast') return json({ id: 'f', list: Array.from({ length: 24 }, (_, i) => weather(i)) });
    if (path === 'scheduled/stocks') return json({ id: 's', ticker: 'X', value: 1 });
    if (path === 'articles') return json(articles);
    if (path.startsWith('sections/id/')) return json(sections);
    return route.fulfill({ status: 404, json: {} });
  });
}
