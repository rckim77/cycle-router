const NYC_CENTER = [40.73061, -73.935242];
const STORAGE_KEY = "cycle-router.savedRoutes";
const DEFAULT_START_KEY = "cycle-router.defaultStart";
const THEME_KEY = "cycle-router.theme";
const PANEL_COLLAPSED_KEY = "cycle-router.panelCollapsed";
const ROUTING_BASE = "https://routing.openstreetmap.de/routed-bike/route/v1/bike";
const PHOTON_BASE = "https://photon.komoot.io/api/";
const NYC_BIKE_ROUTES_API = "https://data.cityofnewyork.us/resource/mzxg-pwib.geojson";
const THEME_MODES = ["light", "dark"];
const THEME_LABELS = {
  light: "Light mode",
  dark: "Dark mode",
};
const THEME_ICONS = {
  light: `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `,
  dark: `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M20.5 14.5A8 8 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"></path>
    </svg>
  `,
};
function routeCue(id, name, coord, options = {}) {
  return {
    id,
    name,
    aliases: [],
    coord,
    known: true,
    routeGuide: true,
    ...options,
  };
}

const CENTRAL_PARK_DRIVE_LOOP = [
  routeCue("central-park-loop-columbus-circle", "Full Central Park Loop", [40.76808, -73.9819], { routeGuide: false }),
  routeCue("central-park-loop-southeast", "Central Park East Drive", [40.76535, -73.97278]),
  routeCue("central-park-loop-east-72", "Central Park East Drive", [40.773, -73.9667]),
  routeCue("central-park-loop-east-96", "Central Park East Drive", [40.7883, -73.9566]),
  routeCue("central-park-loop-north", "Central Park North Drive", [40.8006, -73.958]),
  routeCue("central-park-loop-west-100", "Central Park West Drive", [40.7956, -73.9632]),
  routeCue("central-park-loop-west-86", "Central Park West Drive", [40.7872, -73.9695]),
  routeCue("central-park-loop-west-72", "Central Park West Drive", [40.7791, -73.9741]),
  routeCue("central-park-loop-return", "Central Park Loop Return", [40.76808, -73.9819]),
];

const QUEENSBORO_BRIDGE_TO_MANHATTAN = [
  routeCue("lic-vernon-46th", "LIC Bike Connector", [40.7472, -73.9536]),
  routeCue("lic-11th-st", "LIC Bike Connector", [40.7503, -73.9499]),
  routeCue("queensboro-bridge-queens-approach", "Queensboro Bridge", [40.7522, -73.9433], { routeGuide: false }),
  routeCue("queensboro-bridge-path", "Queensboro Bridge", [40.7556, -73.951], { routeGuide: false }),
  routeCue("queensboro-bridge-manhattan-landing", "Queensboro Bridge", [40.7589, -73.9588], { routeGuide: false }),
  routeCue("east-60th-crosstown", "Manhattan Crosstown Connector", [40.7618, -73.9633]),
];

const MANHATTAN_TO_LIC_VIA_QUEENSBORO = [
  routeCue("east-60th-crosstown-return", "Manhattan Crosstown Connector", [40.7618, -73.9633], { routeGuide: false }),
  routeCue("queensboro-bridge-manhattan-landing-return", "Queensboro Bridge", [40.7589, -73.9588], { routeGuide: false }),
  routeCue("queensboro-bridge-path-return", "Queensboro Bridge", [40.7556, -73.951], { routeGuide: false }),
  routeCue("queensboro-bridge-queens-approach-return", "Queensboro Bridge", [40.7522, -73.9433], { routeGuide: false }),
  routeCue("lic-11th-st-return", "LIC Bike Connector", [40.7503, -73.9499]),
  routeCue("lic-vernon-return", "LIC Bike Connector", [40.7472, -73.9536]),
];

const EAST_RIVER_LON_BY_LAT = [
  { lat: 40.70, lon: -73.972 },
  { lat: 40.75, lon: -73.962 },
  { lat: 40.80, lon: -73.952 },
];

function reverseCorridor(cues) {
  return [...cues].reverse().map((cue) => ({
    ...cue,
    id: `${cue.id}-rev`,
  }));
}

const HUDSON_RIVER_GREENWAY_SOUTHBOUND = [
  routeCue("hudson-greenway-72", "Hudson River Greenway", [40.7814, -73.9883], { routeGuide: false }),
  routeCue("hudson-greenway-59", "Hudson River Greenway", [40.7715, -73.9952]),
  routeCue("hudson-greenway-46", "Hudson River Greenway", [40.7632, -74.0011]),
  routeCue("hudson-greenway-34", "Hudson River Greenway", [40.7553, -74.0067]),
  routeCue("hudson-greenway-20", "Hudson River Greenway", [40.7455, -74.0108]),
  routeCue("hudson-greenway-battery", "Hudson River Greenway", [40.7049, -74.0171]),
];

const BROOKLYN_BRIDGE_CROSSING = [
  routeCue("brooklyn-bridge-manhattan-approach", "Brooklyn Bridge Approach", [40.7124, -74.0047]),
  routeCue("brooklyn-bridge-crossing", "Brooklyn Bridge", [40.7062, -73.9969], { routeGuide: false }),
  routeCue("brooklyn-bridge-brooklyn-landing", "Brooklyn Bridge Brooklyn Landing", [40.7024, -73.9903]),
];

const KENT_AVE_TO_LIC = [
  routeCue("brooklyn-navy-yard-flushing", "Brooklyn Navy Yard Connector", [40.7009, -73.9724]),
  routeCue("kent-ave-south", "Kent Avenue Bike Path", [40.7108, -73.9684], { routeGuide: false }),
  routeCue("kent-ave-north", "Kent Avenue Bike Path", [40.723, -73.9602]),
  routeCue("greenpoint-franklin-st", "Greenpoint Waterfront Connector", [40.7303, -73.9575]),
  routeCue("pulaski-bridge", "Pulaski Bridge", [40.738, -73.9528]),
];

const MANHATTAN_TO_BROOKLYN_VIA_BRIDGE = reverseCorridor(BROOKLYN_BRIDGE_CROSSING);
const BROOKLYN_TO_QUEENS_VIA_PULASKI = reverseCorridor(KENT_AVE_TO_LIC);

const LIC_TO_ROCKAWAY = [
  routeCue("pulaski-bridge-crossing", "Pulaski Bridge", [40.738, -73.9528], { routeGuide: false }),
  routeCue("kent-ave-north-rockaway", "Kent Avenue Bike Path", [40.723, -73.9602]),
  routeCue("flushing-ave-connector", "Brooklyn Navy Yard Connector", [40.7009, -73.9724]),
  routeCue("prospect-park-west", "Prospect Park West Drive", [40.6617, -73.9795]),
  routeCue("ocean-parkway-church", "Ocean Parkway Bike Path", [40.652, -73.978]),
  routeCue("ocean-parkway-beverley", "Ocean Parkway Bike Path", [40.629, -73.976]),
  routeCue("ocean-parkway-brighton", "Ocean Parkway Bike Path", [40.5782, -73.9742]),
  routeCue("shore-parkway-sheepshead", "Shore Parkway Bike Path", [40.5865, -73.9515]),
  routeCue("shore-parkway-howard", "Shore Parkway Bike Path", [40.5838, -73.905]),
  routeCue("cross-bay-bridge", "Cross Bay Veterans Memorial Bridge", [40.5825, -73.8438], { routeGuide: false }),
  routeCue("rockaway-beach-boardwalk", "Rockaway Beach Boardwalk", [40.5834, -73.8215]),
];

const ROCKAWAY_RETURN_TO_LIC = [
  routeCue("cross-bay-bridge-return", "Cross Bay Veterans Memorial Bridge", [40.5825, -73.8438], { routeGuide: false }),
  routeCue("shore-parkway-return", "Shore Parkway Bike Path", [40.5865, -73.9515]),
  routeCue("ocean-parkway-return", "Ocean Parkway Bike Path", [40.629, -73.976]),
  routeCue("kent-ave-return", "Kent Avenue Bike Path", [40.723, -73.9602]),
  routeCue("pulaski-return", "Pulaski Bridge", [40.738, -73.9528]),
];

const BROOKLYN_SOUTH_DESTINATIONS = new Set([
  "rockaway-beach",
  "rockaway-beach-boardwalk",
  "cross-bay-bridge",
  "coney-island",
  "brooklyn-bridge",
  "brooklyn-bridge-park",
  "red-hook",
  "prospect-park",
  "kent-ave",
  "kent-ave-south",
  "williamsburg",
]);

const LANDMARKS = [
  { id: "central-park", name: "Central Park", aliases: ["central park", "columbus circle"], coord: [40.76437, -73.97319] },
  { id: "prospect-park", name: "Prospect Park", aliases: ["prospect park", "park slope"], coord: [40.66177, -73.97109] },
  { id: "hudson-river-greenway", name: "Hudson River Greenway", aliases: ["hudson river greenway", "hudson greenway", "hudson west side highway", "west side highway", "west side path"], coord: [40.7359, -74.0107] },
  { id: "brooklyn-bridge", name: "Brooklyn Bridge", aliases: ["brooklyn bridge"], coord: [40.70495, -73.99345] },
  { id: "brooklyn-bridge-park", name: "Brooklyn Bridge Park", aliases: ["brooklyn bridge park", "dumbo"], coord: [40.7003, -73.9967] },
  { id: "red-hook", name: "Red Hook", aliases: ["red hook"], coord: [40.6782, -74.01316] },
  { id: "battery-park", name: "Battery Park", aliases: ["battery park", "the battery", "financial district"], coord: [40.70488, -74.01713] },
  { id: "hudson-yards", name: "Hudson Yards", aliases: ["hudson yards", "chelsea"], coord: [40.754, -74.002] },
  { id: "riverside-park", name: "Riverside Park", aliases: ["riverside park", "upper west side"], coord: [40.8012, -73.9707] },
  { id: "george-washington-bridge", name: "George Washington Bridge", aliases: ["george washington bridge", "gw bridge", "gwb"], coord: [40.8517, -73.9527] },
  { id: "long-island-city", name: "Long Island City", aliases: ["long island city", "lic"], coord: [40.74467, -73.95701] },
  { id: "astoria-park", name: "Astoria Park", aliases: ["astoria park", "astoria"], coord: [40.7792, -73.9228] },
  { id: "randalls-island", name: "Randall's Island", aliases: ["randall's island", "randalls island", "randall island"], coord: [40.79334, -73.92976] },
  { id: "coney-island", name: "Coney Island", aliases: ["coney island"], coord: [40.5749, -73.985] },
  { id: "rockaway-beach", name: "Rockaway Beach", aliases: ["rockaway beach", "rockaway", "rockaways", "rockaway peninsula", "rockaway boardwalk"], coord: [40.5834, -73.8215] },
  { id: "brighton-beach", name: "Brighton Beach", aliases: ["brighton beach"], coord: [40.578, -73.959] },
  { id: "williamsburg", name: "Williamsburg", aliases: ["williamsburg", "williamsburg bridge"], coord: [40.7133, -73.9632] },
  { id: "queensboro-bridge", name: "Queensboro Bridge", aliases: ["queensboro bridge", "queensborough bridge", "59th street bridge", "ed koch bridge"], coord: [40.7556, -73.951] },
  { id: "kent-ave", name: "Kent Avenue Bike Path", aliases: ["kent ave", "kent avenue", "kent ave bike path", "kent avenue bike path"], coord: [40.7191, -73.9631] },
  { id: "pulaski-bridge", name: "Pulaski Bridge", aliases: ["pulaski bridge"], coord: [40.738, -73.9528] },
];

const STYLE_NOTES = {
  balanced: "Balances distance, bike infrastructure, and scenery.",
  direct: "Favors the shortest practical distance while keeping to mostly dedicated bike lanes.",
  scenic: "Favors less car-heavy riding, mostly dedicated bike lanes, and greener corridors.",
};

const elements = {
  form: document.querySelector("#routeForm"),
  startAddress: document.querySelector("#startAddress"),
  saveDefaultStartButton: document.querySelector("#saveDefaultStartButton"),
  clearDefaultStartButton: document.querySelector("#clearDefaultStartButton"),
  defaultStartHint: document.querySelector("#defaultStartHint"),
  prompt: document.querySelector("#routePrompt"),
  style: document.querySelector("#routeStyle"),
  routeSummary: document.querySelector("#routeSummary"),
  routeStatus: document.querySelector("#routeStatus"),
  routeStatusText: document.querySelector("#routeStatusText"),
  mapRouteButton: document.querySelector("#mapRouteButton"),
  buttonRow: document.querySelector("#buttonRow"),
  mapPanel: document.querySelector(".map-panel"),
  mapStats: document.querySelector(".map-stats"),
  controlPanel: document.querySelector(".control-panel"),
  controlPanelBody: document.querySelector("#controlPanelBody"),
  panelCollapseButton: document.querySelector("#panelCollapseButton"),
  distanceReadout: document.querySelector("#distanceReadout"),
  timeReadout: document.querySelector("#timeReadout"),
  saveButton: document.querySelector("#saveButton"),
  shareButton: document.querySelector("#shareButton"),
  themeButton: document.querySelector("#themeButton"),
  clearSavedButton: document.querySelector("#clearSavedButton"),
  savedRoutes: document.querySelector("#savedRoutes"),
  voiceButton: document.querySelector("#voiceButton"),
  voiceLabel: document.querySelector("#voiceLabel"),
  voiceStatus: document.querySelector("#voiceStatus"),
  voiceStatusText: document.querySelector("#voiceStatusText"),
  voiceInputStack: document.querySelector("#voiceInputStack"),
  planTabButton: document.querySelector("#planTabButton"),
  savedTabButton: document.querySelector("#savedTabButton"),
  planTabPanel: document.querySelector("#planTabPanel"),
  savedTabPanel: document.querySelector("#savedTabPanel"),
};

let map;
let routeLayer;
let markerLayer;
let activeRoute;
let recognition;
let voiceSessionActive = false;
let voiceStopRequested = false;
let voiceFinalizeHandled = false;
let voiceFinalTranscript = "";
let voiceInterimTranscript = "";
let nycBikeNetworkCache = new Map();

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (THEME_MODES.includes(stored)) return stored;
  } catch {
    // Local storage can be unavailable in privacy-restricted browser contexts.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode, persist = true) {
  const theme = THEME_MODES.includes(mode) ? mode : getStoredTheme();
  document.documentElement.dataset.theme = theme;

  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Local storage can be unavailable in privacy-restricted browser contexts.
    }
  }

  elements.themeButton.innerHTML = `${THEME_ICONS[theme]}<span class="sr-only">${THEME_LABELS[theme]}</span>`;
  elements.themeButton.setAttribute("aria-label", THEME_LABELS[theme]);
  elements.themeButton.title = THEME_LABELS[theme];
}

function cycleTheme() {
  const current = getStoredTheme();
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
}

function updateSheetOffset() {
  const sheetHeight = elements.controlPanel?.offsetHeight ?? 72;
  document.documentElement.style.setProperty("--sheet-offset", `${sheetHeight}px`);
  updateMapStatsPosition();
}

function updateMapStatsPosition() {
  if (!elements.mapStats || !elements.controlPanel || !elements.mapPanel) return;

  const gap = 10;
  const isMobileLayout = window.matchMedia("(max-width: 919px)").matches;

  if (!isMobileLayout) {
    elements.mapStats.style.bottom = "20px";
    elements.mapStats.style.transform = "";
    return;
  }

  const sheetRect = elements.controlPanel.getBoundingClientRect();
  const mapRect = elements.mapPanel.getBoundingClientRect();
  const bottomPx = Math.max(gap, mapRect.bottom - sheetRect.top + gap);

  elements.mapStats.style.bottom = `${bottomPx}px`;
  elements.mapStats.style.transform = "";
}

function isPanelCollapsed() {
  return elements.controlPanel?.classList.contains("is-collapsed") ?? false;
}

const SHEET_TRANSITION_MS = 380;
const SHEET_ZOOM_DELTA = 0.5;
let sheetParallaxFrameId = 0;
let layoutZoomBase = null;
let sheetZoomOffset = 0;
let lastExpandedPanelHeight = null;

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function clampZoom(zoom) {
  if (!map) return zoom;
  return Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), zoom));
}

function syncLayoutZoomFromMap() {
  if (!map) return;
  layoutZoomBase = clampZoom(map.getZoom() - sheetZoomOffset);
}

function applyRouteMapLayout() {
  if (!map) return;

  syncLayoutZoomFromMap();

  if (isPanelCollapsed()) {
    sheetZoomOffset = SHEET_ZOOM_DELTA;
    map.setZoom(clampZoom(layoutZoomBase + sheetZoomOffset), { animate: false });
  } else {
    sheetZoomOffset = 0;
    lastExpandedPanelHeight = elements.controlPanel.offsetHeight;
    map.setZoom(clampZoom(layoutZoomBase), { animate: false });
  }

  updateSheetOffset();
}

function cancelSheetParallaxAnimation() {
  if (!sheetParallaxFrameId) return;
  cancelAnimationFrame(sheetParallaxFrameId);
  sheetParallaxFrameId = 0;
}

function applySheetMapState(collapsed, { animate = true, initialHeight = null } = {}) {
  if (!map || !elements.controlPanel) return;

  if (layoutZoomBase === null) {
    syncLayoutZoomFromMap();
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = animate && !prefersReducedMotion ? SHEET_TRANSITION_MS : 0;
  const heightBefore = initialHeight ?? elements.controlPanel.offsetHeight;
  const expandedHeight = collapsed ? heightBefore : (lastExpandedPanelHeight ?? heightBefore);
  let lastHeight = heightBefore;
  const startZoomOffset = sheetZoomOffset;
  const targetZoomOffset = collapsed ? SHEET_ZOOM_DELTA : 0;
  const startedAt = performance.now();

  const finish = (finalHeight) => {
    sheetZoomOffset = targetZoomOffset;
    sheetParallaxFrameId = 0;

    if (collapsed) {
      lastExpandedPanelHeight = expandedHeight;
    } else {
      lastExpandedPanelHeight = finalHeight;
    }

    map.setZoom(clampZoom(layoutZoomBase + sheetZoomOffset), { animate: false });
    updateSheetOffset();
  };

  const step = (now) => {
    const currentHeight = elements.controlPanel.offsetHeight;
    const frameDelta = lastHeight - currentHeight;
    const progress = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
    const eased = easeOutCubic(progress);

    if (Math.abs(frameDelta) > 0.25) {
      map.panBy([0, -frameDelta / 2], { animate: false });
      lastHeight = currentHeight;
    }

    const currentZoomOffset = startZoomOffset + (targetZoomOffset - startZoomOffset) * eased;
    map.setZoom(clampZoom(layoutZoomBase + currentZoomOffset), { animate: false });

    updateSheetOffset();

    if (progress >= 1) {
      finish(currentHeight);
      return;
    }

    sheetParallaxFrameId = requestAnimationFrame(step);
  };

  if (duration === 0) {
    requestAnimationFrame(() => {
      const finalHeight = elements.controlPanel.offsetHeight;
      const heightDelta = heightBefore - finalHeight;

      if (Math.abs(heightDelta) > 0.5) {
        map.panBy([0, -heightDelta / 2], { animate: false });
      }

      finish(finalHeight);
    });
    return;
  }

  sheetParallaxFrameId = requestAnimationFrame(step);
}

function animateMapParallaxWithSheet(collapsed, initialHeight) {
  cancelSheetParallaxAnimation();
  applySheetMapState(collapsed, { animate: true, initialHeight });
}

function setPanelCollapsed(collapsed, persist = true, { animate = true } = {}) {
  if (!elements.controlPanel || !elements.panelCollapseButton) return;

  cancelSheetParallaxAnimation();

  const sheetHeightBeforeToggle = elements.controlPanel.offsetHeight;

  elements.controlPanel.classList.toggle("is-collapsed", collapsed);
  elements.panelCollapseButton.setAttribute("aria-expanded", String(!collapsed));
  elements.panelCollapseButton.title = collapsed ? "Show route panel" : "Hide route panel";
  elements.panelCollapseButton.querySelector(".sr-only").textContent = collapsed
    ? "Show route panel"
    : "Hide route panel";

  if (persist) {
    try {
      localStorage.setItem(PANEL_COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      // Local storage can be unavailable in privacy-restricted browser contexts.
    }
  }

  if (animate) {
    requestAnimationFrame(() => {
      animateMapParallaxWithSheet(collapsed, sheetHeightBeforeToggle);
    });
    return;
  }

  applySheetMapState(collapsed, { animate: false, initialHeight: sheetHeightBeforeToggle });
}

function togglePanelCollapsed() {
  setPanelCollapsed(!isPanelCollapsed());
}

function getStoredPanelCollapsed() {
  try {
    return localStorage.getItem(PANEL_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

function getMapFitPadding() {
  const isMobileLayout = window.matchMedia("(max-width: 919px)").matches;
  if (!isMobileLayout) {
    return {
      paddingTopLeft: [24, 24],
      paddingBottomRight: [24, 86],
    };
  }

  const header = document.querySelector(".app-header");
  const top = (header?.offsetHeight ?? 72) + 16;
  const bottom = (elements.controlPanel?.offsetHeight ?? 72) + 16;

  return {
    paddingTopLeft: [16, top],
    paddingBottomRight: [16, bottom],
  };
}

function initMap() {
  map = L.map("map", {
    zoomControl: false,
    preferCanvas: true,
  }).setView(NYC_CENTER, 11);

  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  routeLayer = L.layerGroup().addTo(map);
  markerLayer = L.layerGroup().addTo(map);

  requestAnimationFrame(() => {
    map.invalidateSize();
  });
  window.addEventListener("resize", () => {
    window.setTimeout(() => {
      updateSheetOffset();
      map.invalidateSize();
    }, 120);
  });

  if (elements.controlPanel && typeof ResizeObserver !== "undefined") {
    const sheetObserver = new ResizeObserver(() => {
      updateSheetOffset();
    });
    sheetObserver.observe(elements.controlPanel);
  }
}

async function buildRoute() {
  const prompt = elements.prompt.value.trim();
  const style = inferStyle(prompt, elements.style.value);

  setRouteGenerationState("loading", "Reading your route description…");

  try {
    setRouteGenerationState("loading", "Planning waypoints…");
    const plan = await planRoute(prompt);
    setRouteGenerationState("loading", "Fetching bike directions…");
    const routed = await fetchBikeRoute(plan.waypoints);
    const actualMiles = routed.distanceMeters / 1609.344;
    const roundedDistance = actualMiles >= 10 ? Math.round(actualMiles) : Math.round(actualMiles * 10) / 10;
    const minutes = Math.max(10, Math.round(routed.durationSeconds / 60));

    activeRoute = {
      id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      title: makeTitle(prompt, plan, roundedDistance, "mi"),
      prompt,
      startAddress: elements.startAddress.value.trim(),
      style,
      planLabel: plan.label,
      distance: roundedDistance,
      unit: "mi",
      minutes,
      points: routed.points,
      waypoints: plan.waypoints,
      source: "OpenStreetMap bike routing + NYC Open Data bike network",
      note: makeRouteNote(plan, style, roundedDistance),
    };

    renderRoute(activeRoute);
    updateUrlHash(activeRoute);
    setRouteGenerationState("ready");
  } catch (error) {
    renderError(error);
    setRouteGenerationState("error");
  }
}

async function planRoute(prompt) {
  const normalized = prompt.toLowerCase();
  const targetMiles = estimateTargetMiles(normalized);
  const mentioned = findMentionedLandmarks(normalized);
  const explicitEnd = extractEndpoint(normalized, "to");
  const wantsLoop = normalized.match(/\b(loop|round trip|out and back|out-and-back|return|back to|back home)\b/);

  const start = await resolveStartAddress();
  const wantsReturnToStart = Boolean(
    wantsLoop
    && (
      /\bback home\b/.test(normalized)
      || (/\b(?:long island city|lic)\b/.test(normalized) && startsInLic(start))
    ),
  );
  const stopLandmarks = mentioned.filter((landmark) => {
    if (landmark.id === start.id) return false;
    if (wantsReturnToStart && isSamePlace(landmark, start)) return false;
    return true;
  });
  const expandedStops = expandContextualStops(
    uniqueWaypoints(stopLandmarks),
    normalized,
    start,
  );
  if (expandedStops.length > 0) {
    let waypoints = [start, ...expandedStops];
    if (wantsLoop && !isSamePlace(waypoints[waypoints.length - 1], start)) {
      if (normalized.match(/\brockaway\b/) && startsInLic(start)) {
        waypoints = [...waypoints, ...ROCKAWAY_RETURN_TO_LIC, start];
      } else {
        waypoints.push(start);
      }
    }

    return finalizePlannedRoute(waypoints);
  }

  let finish = explicitEnd;

  if (finish && !finish.known) {
    finish = await geocodePlace(finish.name);
  }

  if (!finish) {
    finish = chooseTurnaround(start, targetMiles, normalized);
  }

  let waypoints = wantsLoop || !explicitEnd
    ? [start, finish, start]
    : [start, finish];

  if (normalized.match(/\brockaway\b/) && finish.id === "rockaway-beach" && startsInLic(start)) {
    waypoints = wantsLoop
      ? [start, ...LIC_TO_ROCKAWAY, ...ROCKAWAY_RETURN_TO_LIC, start]
      : [start, ...LIC_TO_ROCKAWAY];
  }

  return finalizePlannedRoute(waypoints);
}

function eastRiverLonAtLat(lat) {
  const clampedLat = Math.max(EAST_RIVER_LON_BY_LAT[0].lat, Math.min(EAST_RIVER_LON_BY_LAT.at(-1).lat, lat));
  for (let index = 0; index < EAST_RIVER_LON_BY_LAT.length - 1; index += 1) {
    const start = EAST_RIVER_LON_BY_LAT[index];
    const end = EAST_RIVER_LON_BY_LAT[index + 1];
    if (clampedLat < start.lat || clampedLat > end.lat) continue;
    const ratio = (clampedLat - start.lat) / (end.lat - start.lat);
    return start.lon + (end.lon - start.lon) * ratio;
  }
  return EAST_RIVER_LON_BY_LAT.at(-1).lon;
}

function classifyBorough(coord) {
  const [lat, lon] = coord;
  const riverLon = eastRiverLonAtLat(lat);

  if (lat < 40.57 || lon < -74.12 || lon > -73.75) return "unknown";
  if (lat < 40.65 && lon > -74.05) return "staten-island";
  if (lat > 40.83 && lon > -73.88) return "bronx";
  // West Side Highway / Battery Park City sit west of -74.0 but are Manhattan.
  if (lon <= -73.995 && lat >= 40.70 && lat <= 40.82) return "manhattan";
  if (lat < 40.68 && lon > -74.05 && lon < -73.88) return "brooklyn";
  if (lon > riverLon + 0.004) return "queens";
  if (lon <= riverLon - 0.002) return "manhattan";
  if (lat < 40.74 && lon > -73.98) return "brooklyn";
  return "unknown";
}

function isWaterSeparatedBoroughPair(a, b) {
  const pair = new Set([a, b]);
  return (
    (pair.has("queens") && pair.has("manhattan"))
    || (pair.has("brooklyn") && pair.has("manhattan"))
    || (pair.has("queens") && pair.has("brooklyn"))
  );
}

function requiresWaterCrossing(from, to) {
  const miles = haversineMiles(from.coord, to.coord);
  if (miles < 0.3) return false;

  const fromBorough = classifyBorough(from.coord);
  const toBorough = classifyBorough(to.coord);

  if (fromBorough !== "unknown" && toBorough !== "unknown") {
    return isWaterSeparatedBoroughPair(fromBorough, toBorough);
  }

  const lonGap = Math.abs(from.coord[1] - to.coord[1]);
  const latGap = Math.abs(from.coord[0] - to.coord[0]);
  return miles > 0.55 && lonGap > 0.025 && latGap < 0.12;
}

function getCrossingCorridor(from, to) {
  const fromBorough = classifyBorough(from.coord);
  const toBorough = classifyBorough(to.coord);

  if (fromBorough === "queens" && toBorough === "manhattan") {
    return QUEENSBORO_BRIDGE_TO_MANHATTAN;
  }
  if (fromBorough === "manhattan" && toBorough === "queens") {
    return MANHATTAN_TO_LIC_VIA_QUEENSBORO;
  }
  if (fromBorough === "brooklyn" && toBorough === "manhattan") {
    return BROOKLYN_BRIDGE_CROSSING;
  }
  if (fromBorough === "manhattan" && toBorough === "brooklyn") {
    return MANHATTAN_TO_BROOKLYN_VIA_BRIDGE;
  }
  if (fromBorough === "queens" && toBorough === "brooklyn") {
    return reverseCorridor(KENT_AVE_TO_LIC);
  }
  if (fromBorough === "brooklyn" && toBorough === "queens") {
    return BROOKLYN_TO_QUEENS_VIA_PULASKI;
  }

  if (!requiresWaterCrossing(from, to)) return [];

  if ((fromBorough === "queens" || toBorough === "queens") && (fromBorough === "manhattan" || toBorough === "manhattan")) {
    return fromBorough === "queens" ? QUEENSBORO_BRIDGE_TO_MANHATTAN : MANHATTAN_TO_LIC_VIA_QUEENSBORO;
  }

  return [];
}

function appendWaypoint(route, waypoint) {
  if (!route.length || !isSamePlace(route[route.length - 1], waypoint)) {
    route.push(waypoint);
  }
}

function insertWaterCrossingCorridors(waypoints) {
  if (waypoints.length < 2) return waypoints;

  const route = [];

  appendWaypoint(route, waypoints[0]);

  for (let index = 0; index < waypoints.length - 1; index += 1) {
    const from = route[route.length - 1];
    const to = waypoints[index + 1];

    if (requiresWaterCrossing(from, to)) {
      getCrossingCorridor(from, to).forEach((cue) => appendWaypoint(route, cue));
    }

    appendWaypoint(route, to);
  }

  return route;
}

function dedupeConsecutiveWaypoints(waypoints) {
  const deduped = [];

  waypoints.forEach((waypoint) => {
    appendWaypoint(deduped, waypoint);
  });

  return deduped;
}

function isBridgeWaypoint(waypoint) {
  return waypoint.routeGuide === false
    || /bridge|greenway|connector|crossing|pulaski|queensboro/i.test(waypoint.id);
}

async function finalizePlannedRoute(waypoints) {
  const withCrossings = dedupeConsecutiveWaypoints(insertWaterCrossingCorridors(waypoints));
  const refined = await refineWaypointsWithNycBikeData(withCrossings);
  return {
    label: describeWaypoints(refined),
    waypoints: refined,
  };
}

function getSavedDefaultStart() {
  try {
    const stored = localStorage.getItem(DEFAULT_START_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed?.address || !Array.isArray(parsed.coord) || parsed.coord.length !== 2) return null;
    return parsed;
  } catch {
    return null;
  }
}

function setSavedDefaultStart(entry) {
  localStorage.setItem(DEFAULT_START_KEY, JSON.stringify(entry));
}

function clearSavedDefaultStart() {
  localStorage.removeItem(DEFAULT_START_KEY);
}

function waypointFromSavedDefault(saved) {
  return {
    id: "user-default-start",
    name: saved.name || saved.address,
    coord: saved.coord,
    known: true,
  };
}

function updateDefaultStartUi() {
  const saved = getSavedDefaultStart();
  const hasSaved = Boolean(saved);

  if (elements.clearDefaultStartButton) {
    elements.clearDefaultStartButton.hidden = !hasSaved;
  }

  if (elements.defaultStartHint) {
    elements.defaultStartHint.textContent = hasSaved
      ? `Default start: ${saved.address}`
      : "No default start saved. Enter an address and save one for quicker planning.";
  }
}

function applySavedDefaultStartToField() {
  const saved = getSavedDefaultStart();
  if (saved?.address) {
    elements.startAddress.value = saved.address;
  }
}

async function saveDefaultStartFromField() {
  const address = elements.startAddress.value.trim();
  if (!address) {
    throw new Error("Enter a start address before saving your default.");
  }

  const waypoint = await geocodePlace(address);
  setSavedDefaultStart({
    address,
    name: waypoint.name,
    coord: waypoint.coord,
  });
  updateDefaultStartUi();
}

async function resolveStartAddress() {
  const rawAddress = elements.startAddress.value.trim();
  const savedDefault = getSavedDefaultStart();

  if (!rawAddress) {
    if (savedDefault) {
      return waypointFromSavedDefault(savedDefault);
    }
    throw new Error("Enter a start address or save a default start address.");
  }

  const normalized = rawAddress.toLowerCase();
  const known = LANDMARKS.find((landmark) => {
    return landmark.aliases.some((alias) => normalized.includes(alias));
  });

  if (known) {
    return { ...known, known: true };
  }

  if (savedDefault && rawAddress === savedDefault.address) {
    return waypointFromSavedDefault(savedDefault);
  }

  return geocodePlace(rawAddress);
}

function findMentionedLandmarks(normalizedPrompt) {
  const matches = [];

  LANDMARKS.forEach((landmark) => {
    let bestMatch = null;

    landmark.aliases.forEach((alias) => {
      const index = normalizedPrompt.indexOf(alias);
      if (index === -1) return;
      if (!bestMatch || index < bestMatch.index || alias.length > bestMatch.alias.length) {
        bestMatch = { index, alias };
      }
    });

    if (bestMatch) {
      matches.push({ ...landmark, known: true, promptIndex: bestMatch.index, promptAlias: bestMatch.alias });
    }
  });

  return matches
    .sort((a, b) => a.promptIndex - b.promptIndex || b.promptAlias.length - a.promptAlias.length)
    .filter((match, index, sorted) => {
      return !sorted.some((candidate, candidateIndex) => {
        if (candidateIndex >= index) return false;
        return candidate.promptIndex === match.promptIndex && candidate.promptAlias.includes(match.promptAlias);
      });
    });
}

function uniqueWaypoints(waypoints) {
  const seen = new Set();
  return waypoints.filter((waypoint) => {
    if (seen.has(waypoint.id)) return false;
    seen.add(waypoint.id);
    return true;
  });
}

function expandContextualStops(waypoints, normalizedPrompt, start) {
  const wantsCentralParkLoop = /\b(?:around central park|central park loop|loop around central park|full central park loop)\b/.test(normalizedPrompt);
  const wantsWestSideGreenway = /\b(?:hudson|west side highway|west side path|west side greenway)\b/.test(normalizedPrompt);
  const wantsBrooklynBridge = /\bbrooklyn bridge\b/.test(normalizedPrompt);
  const wantsLicReturn = startsInLic(start)
    && /\b(?:long island city|lic|back home)\b/.test(normalizedPrompt);
  const wantsKentAve = /\b(?:kent ave|kent avenue|kent ave bike path|kent avenue bike path)\b/.test(normalizedPrompt);
  const wantsRockaway = /\b(?:rockaway beach|rockaway|rockaways|rockaway peninsula|rockaway boardwalk)\b/.test(normalizedPrompt);
  const wantsLoop = /\b(loop|round trip|out and back|out-and-back|return|back to|back home)\b/.test(normalizedPrompt);

  return waypoints.flatMap((waypoint) => {
    if (waypoint.id === "rockaway-beach" && wantsRockaway) {
      return startsInLic(start) ? LIC_TO_ROCKAWAY : [waypoint];
    }

    if (waypoint.id === "central-park" && wantsCentralParkLoop) {
      return CENTRAL_PARK_DRIVE_LOOP;
    }

    if (waypoint.id === "queensboro-bridge") {
      return QUEENSBORO_BRIDGE_TO_MANHATTAN;
    }

    if (waypoint.id === "hudson-river-greenway" && wantsWestSideGreenway) {
      if (wantsLoop && wantsLicReturn && startsInLic(start)) {
        return [...HUDSON_RIVER_GREENWAY_SOUTHBOUND, ...MANHATTAN_TO_LIC_VIA_QUEENSBORO];
      }
      return HUDSON_RIVER_GREENWAY_SOUTHBOUND;
    }

    if (waypoint.id === "brooklyn-bridge" && wantsBrooklynBridge) {
      const bridgeRoute = [...BROOKLYN_BRIDGE_CROSSING];
      if (wantsKentAve || wantsLicReturn) {
        bridgeRoute.push(...KENT_AVE_TO_LIC);
      }
      return bridgeRoute;
    }

    if (waypoint.id === "kent-ave") {
      return KENT_AVE_TO_LIC;
    }

    return [waypoint];
  });
}

function startsInLic(start) {
  return classifyBorough(start.coord) === "queens"
    && start.coord[0] >= 40.73
    && start.coord[0] <= 40.77
    && start.coord[1] > -73.98;
}

function isSamePlace(a, b) {
  return a.id === b.id || haversineMiles(a.coord, b.coord) < 0.15;
}

function describeWaypoints(waypoints) {
  const displayWaypoints = displayableWaypoints(waypoints);

  if (displayWaypoints.length <= 2) {
    return `${displayWaypoints[0].name} to ${displayWaypoints[1].name}`;
  }

  const via = displayWaypoints.slice(1, -1).map((waypoint) => waypoint.name).join(", ");
  const returnsToStart = isSamePlace(displayWaypoints[0], displayWaypoints[displayWaypoints.length - 1]);
  return returnsToStart
    ? `${displayWaypoints[0].name} loop via ${via}`
    : `${displayWaypoints[0].name} to ${displayWaypoints[displayWaypoints.length - 1].name} via ${via}`;
}

function displayableWaypoints(waypoints) {
  const requiredIndexes = new Set([0, waypoints.length - 1]);
  const seen = new Set();

  return waypoints.filter((waypoint, index) => {
    if (!requiredIndexes.has(index) && waypoint.routeGuide) return false;
    const key = `${waypoint.name}-${waypoint.coord.join(",")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractEndpoint(normalizedPrompt, keyword) {
  const match = normalizedPrompt.match(new RegExp(`\\b${keyword}\\s+([^,.]+?)(?:\\s+(?:to|via|through|with|for|around|and then)\\b|$)`));
  if (!match) return null;

  const phrase = cleanupPlacePhrase(match[1]);
  const known = LANDMARKS.find((landmark) => {
    return landmark.aliases.some((alias) => phrase.includes(alias));
  });

  if (known) {
    return { ...known, known: true };
  }

  return phrase.length > 1 ? { name: titleCase(phrase), known: false } : null;
}

function cleanupPlacePhrase(value) {
  return value
    .replace(/\b(a|an|the|scenic|protected|quiet|fast|direct|bike|ride|route|loop|waterfront)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chooseTurnaround(start, targetMiles, normalizedPrompt) {
  const candidates = LANDMARKS.filter((landmark) => landmark.id !== start.id);
  const scenicBias = normalizedPrompt.match(/scenic|waterfront|view|river|park/) ? new Set([
    "brooklyn-bridge-park",
    "red-hook",
    "battery-park",
    "riverside-park",
    "astoria-park",
    "long-island-city",
  ]) : new Set();

  const scored = candidates.map((landmark) => {
    const outAndBackMiles = haversineMiles(start.coord, landmark.coord) * 2.7;
    const distanceScore = Math.abs(outAndBackMiles - targetMiles);
    const bias = scenicBias.has(landmark.id) ? -1.2 : 0;
    return { landmark, score: distanceScore + bias };
  }).sort((a, b) => a.score - b.score);

  return { ...scored[0].landmark, known: true };
}

async function geocodePlace(place) {
  const url = new URL(PHOTON_BASE);
  url.searchParams.set("limit", "1");
  const normalizedPlace = place.toLowerCase();
  const query = normalizedPlace.includes("rockaway")
    ? "Rockaway Beach boardwalk, Queens, NY"
    : `${place}, New York City`;
  url.searchParams.set("q", query);
  url.searchParams.set("bbox", "-74.35,40.45,-73.65,40.95");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not geocode that place.");
  }

  const results = await response.json();
  const feature = results.features?.[0];
  if (!feature) {
    throw new Error(`Could not find ${place} around New York City.`);
  }

  const [lon, lat] = feature.geometry.coordinates;
  const name = feature.properties.name || place;
  const city = feature.properties.city || feature.properties.district || "NYC";

  return {
    id: `geocoded-${Date.now()}`,
    name: `${name}, ${city}`,
    coord: [Number(lat), Number(lon)],
    known: false,
  };
}

async function fetchBikeRouteSegment(waypoints) {
  const coordinateString = waypoints
    .map((waypoint) => `${waypoint.coord[1]},${waypoint.coord[0]}`)
    .join(";");
  const url = `${ROUTING_BASE}/${coordinateString}?overview=full&geometries=geojson&steps=false`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Bike routing service is unavailable.");
  }

  const data = await response.json();
  if (data.code !== "Ok" || !data.routes?.[0]?.geometry?.coordinates?.length) {
    throw new Error("No bike route found for those locations.");
  }

  return {
    points: data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]),
    distanceMeters: data.routes[0].distance,
    durationSeconds: data.routes[0].duration,
  };
}

function segmentCrossesEastRiver(a, b) {
  const miles = haversineMiles(a, b);
  if (miles < 0.12) return false;

  const midLat = (a[0] + b[0]) / 2;
  const riverLon = eastRiverLonAtLat(midLat);
  const westOfRiver = (coord) => coord[1] <= riverLon - 0.002;
  const eastOfRiver = (coord) => coord[1] >= riverLon + 0.004;

  const aWest = westOfRiver(a);
  const bWest = westOfRiver(b);
  const aEast = eastOfRiver(a);
  const bEast = eastOfRiver(b);

  return (aWest && bEast) || (aEast && bWest);
}

function validateRouteGeometry(points) {
  for (let index = 1; index < points.length; index += 1) {
    const gapMiles = haversineMiles(points[index - 1], points[index]);
    if (gapMiles > 0.08 && segmentCrossesEastRiver(points[index - 1], points[index])) {
      throw new Error("Route would cross the East River without a bridge. Add a bridge or landmark to your description.");
    }
  }
}

function snapLegEndpoints(legPoints, startCoord, endCoord) {
  const points = legPoints.slice();

  if (!points.length) {
    return [startCoord, endCoord];
  }

  if (haversineMiles(points[0], startCoord) > 0.04) {
    points.unshift(startCoord);
  }

  if (haversineMiles(points[points.length - 1], endCoord) > 0.04) {
    points.push(endCoord);
  }

  return points;
}

function mergeLegGeometry(existingPoints, legPoints) {
  if (!existingPoints.length) return legPoints;
  if (!legPoints.length) return existingPoints;

  const anchor = existingPoints[existingPoints.length - 1];
  const startGap = haversineMiles(anchor, legPoints[0]);

  if (startGap > 0.35) {
    throw new Error("Route could not connect two segments cleanly. Try adding a bridge or major bike path to your description.");
  }

  if (startGap > 0.08 && segmentCrossesEastRiver(anchor, legPoints[0])) {
    throw new Error("Route would cross the East River without a bridge. Add a bridge or landmark to your description.");
  }

  const startIndex = startGap < 0.08 ? 1 : 0;
  return existingPoints.concat(legPoints.slice(startIndex));
}

async function fetchBikeRoute(waypoints) {
  if (waypoints.length < 2) {
    throw new Error("At least two waypoints are required to build a route.");
  }

  let mergedPoints = [];
  let distanceMeters = 0;
  let durationSeconds = 0;

  for (let index = 0; index < waypoints.length - 1; index += 1) {
    const from = waypoints[index];
    const to = waypoints[index + 1];
    const leg = await fetchBikeRouteSegment([from, to]);
    const snapped = snapLegEndpoints(leg.points, from.coord, to.coord);
    mergedPoints = mergeLegGeometry(mergedPoints, snapped);
    distanceMeters += leg.distanceMeters;
    durationSeconds += leg.durationSeconds;
  }

  if (!mergedPoints.length) {
    throw new Error("No bike route found for those locations.");
  }

  validateRouteGeometry(mergedPoints);

  return { points: mergedPoints, distanceMeters, durationSeconds };
}

function bboxForWaypoints(waypoints, padding = 0.03) {
  const lats = waypoints.map((waypoint) => waypoint.coord[0]);
  const lons = waypoints.map((waypoint) => waypoint.coord[1]);
  return [
    Math.min(...lats) - padding,
    Math.min(...lons) - padding,
    Math.max(...lats) + padding,
    Math.max(...lons) + padding,
  ];
}

function bikeFacilityScore(properties = {}) {
  const facility = `${properties.tf_facilit || ""} ${properties.ft_facilit || ""} ${properties.grnwy || ""}`.toLowerCase();
  if (facility.includes("greenway") || facility.includes("boardwalk")) return 3;
  if (facility.includes("protected") || facility.includes("buffered")) return 2;
  if (facility.includes("lane")) return 1;
  return 0;
}

function bikeFacilityLabel(properties = {}, street) {
  const facility = properties.tf_facilit || properties.ft_facilit;
  const greenway = properties.grnwy;
  if (greenway) return `${street} (${greenway})`;
  if (facility) return `${street} (${facility})`;
  return street;
}

function representativeCoord(geometry) {
  const line = geometry?.coordinates?.[0]?.[0] ?? geometry?.coordinates?.[0];
  if (!line) return null;
  const [lon, lat] = line;
  return [lat, lon];
}

async function loadNycBikeFeaturesForWaypoints(waypoints) {
  const [minLat, minLon, maxLat, maxLon] = bboxForWaypoints(waypoints);
  const cacheKey = [minLat, minLon, maxLat, maxLon].map((value) => value.toFixed(2)).join(":");

  if (nycBikeNetworkCache.has(cacheKey)) {
    return nycBikeNetworkCache.get(cacheKey);
  }

  try {
    const url = new URL(NYC_BIKE_ROUTES_API);
    url.searchParams.set("$limit", "2500");
    url.searchParams.set("$where", `within_box(the_geom, ${minLat}, ${minLon}, ${maxLat}, ${maxLon})`);

    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    const features = data.features ?? [];
    nycBikeNetworkCache.set(cacheKey, features);
    return features;
  } catch {
    return [];
  }
}

function snapWaypointToBikeNetwork(waypoint, features) {
  if (isBridgeWaypoint(waypoint)) {
    return waypoint;
  }

  let best = null;

  features.forEach((feature) => {
    const coord = representativeCoord(feature.geometry);
    if (!coord) return;

    const distance = haversineMiles(waypoint.coord, coord);
    if (distance > 0.14) return;

    const score = bikeFacilityScore(feature.properties) - distance;
    if (!best || score > best.score) {
      best = {
        score,
        coord,
        label: bikeFacilityLabel(feature.properties, feature.properties.street || waypoint.name),
      };
    }
  });

  if (!best) return waypoint;

  return {
    ...waypoint,
    coord: best.coord,
    name: best.label || waypoint.name,
  };
}

async function refineWaypointsWithNycBikeData(waypoints) {
  const features = await loadNycBikeFeaturesForWaypoints(waypoints);
  if (!features.length) return waypoints;
  return waypoints.map((waypoint) => snapWaypointToBikeNetwork(waypoint, features));
}

function estimateTargetMiles(normalizedPrompt) {
  const rangeMatch = normalizedPrompt.match(/\b(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:mi|mile|miles)\b/);
  if (rangeMatch) {
    return (Number(rangeMatch[1]) + Number(rangeMatch[2])) / 2;
  }

  const exactMatch = normalizedPrompt.match(/\b(\d+(?:\.\d+)?)\s*(?:mi|mile|miles)\b/);
  if (exactMatch) {
    return Number(exactMatch[1]);
  }

  if (normalizedPrompt.match(/\b(?:short|quick|easy|brief)\b/)) return 7;
  if (normalizedPrompt.match(/\b(?:long|big|extended|training|workout)\b/)) return 24;
  return 15;
}

function inferStyle(prompt, selectedStyle) {
  const selected = normalizeStyle(selectedStyle);

  if (selected !== "balanced") {
    return selected;
  }

  const normalized = prompt.toLowerCase();
  if (normalized.match(/fast|direct|shortest|efficient|workout|training/)) return "direct";
  if (normalized.match(/scenic|waterfront|view|park|pretty|nature|green|quiet|calm|low traffic|less crowded/)) return "scenic";
  return "balanced";
}

function normalizeStyle(style) {
  return {
    balanced: "balanced",
    direct: "direct",
    fast: "direct",
    scenic: "scenic",
    quiet: "scenic",
    protected: "balanced",
  }[style] ?? "balanced";
}

function haversineMiles(a, b) {
  const radiusMiles = 3958.8;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
  return 2 * radiusMiles * Math.asin(Math.sqrt(h));
}

function makeTitle(prompt, plan, distance, unit) {
  if (prompt.length > 0) {
    const clean = prompt.replace(/\s+/g, " ").trim();
    return clean.length > 58 ? `${clean.slice(0, 55)}...` : clean;
  }
  return `${distance} ${unit} ${plan.label}`;
}

function makeRouteNote(plan, style, actualDistance) {
  return `${plan.label}. Estimated from prompt: ${actualDistance} mi. ${STYLE_NOTES[normalizeStyle(style)]}`;
}

function renderRoute(route) {
  map.invalidateSize();
  routeLayer.clearLayers();
  markerLayer.clearLayers();
  elements.routeSummary.hidden = false;
  const waypoints = route.waypoints?.length
    ? route.waypoints
    : [
      { name: "Start", coord: route.points[0] },
      { name: "Finish", coord: route.points[route.points.length - 1] },
    ];
  const displayWaypoints = displayableWaypoints(waypoints);

  const line = L.polyline(route.points, {
    color: "#167447",
    weight: 5,
    opacity: 0.95,
    lineCap: "round",
    lineJoin: "round",
  }).addTo(routeLayer);

  displayWaypoints.forEach((waypoint, index) => {
    const isStart = index === 0;
    const isFinish = index === displayWaypoints.length - 1;
    const label = isStart ? "Start" : isFinish ? "Finish" : "Via";
    L.circleMarker(waypoint.coord, {
      radius: isStart || isFinish ? 7 : 6,
      color: isFinish ? "#d45f28" : "#145b3c",
      fillColor: "#ffffff",
      fillOpacity: 1,
      weight: 3,
    }).bindTooltip(`${label}: ${waypoint.name}`, {
      permanent: false,
      direction: "top",
    }).addTo(markerLayer);
  });

  const fitPadding = getMapFitPadding();
  map.fitBounds(line.getBounds(), {
    paddingTopLeft: fitPadding.paddingTopLeft,
    paddingBottomRight: fitPadding.paddingBottomRight,
    maxZoom: 15,
  });
  window.setTimeout(() => {
    map.invalidateSize();
    applyRouteMapLayout();
  }, 120);

  elements.distanceReadout.textContent = `${route.distance} ${route.unit}`;
  elements.timeReadout.textContent = formatMinutes(route.minutes);
  elements.routeSummary.innerHTML = renderRouteSummaryLine(route);
}

function renderRouteSummaryLine(route) {
  const description = escapeHtml(route.prompt || route.title || "Your route");

  return `
    <h3 class="route-summary-title">${description}</h3>
    <div class="route-meta">
      <span>${route.distance} ${route.unit}</span>
      <span>${formatMinutes(route.minutes)}</span>
      <span>${labelForStyle(route.style)}</span>
    </div>
  `;
}

function renderError(error) {
  elements.routeSummary.hidden = false;
  elements.routeSummary.innerHTML = `
    <p class="route-summary-line route-summary-line--error">
      <strong>Route not found.</strong> ${escapeHtml(error.message)} Try a simpler request like "waterfront loop" or "to Central Park".
    </p>
  `;
}

function setRouteGenerationState(state, message = "") {
  const isLoading = state === "loading";
  const isReady = state === "ready";

  elements.form.classList.toggle("is-mapping", isLoading);
  elements.mapPanel.classList.toggle("is-mapping", isLoading);
  elements.mapPanel.classList.toggle("has-route", isReady);
  elements.routeSummary.classList.toggle("is-ready", isReady);

  elements.routeStatus.hidden = !isLoading;
  if (message) {
    elements.routeStatusText.textContent = message;
  }

  elements.mapRouteButton.disabled = isLoading;
  elements.mapRouteButton.textContent = isLoading ? "Mapping…" : "Map route";
  elements.saveButton.hidden = !isReady;
  elements.shareButton.hidden = !isReady;
  elements.buttonRow.classList.toggle("has-generated-route", isReady);
}

function labelForStyle(style) {
  return {
    balanced: "Balanced",
    direct: "Direct",
    scenic: "Scenic",
    fast: "Direct",
    quiet: "Scenic",
    protected: "Balanced",
  }[style] ?? "Balanced";
}

function formatMinutes(minutes) {
  if (minutes < 60) return `~${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `~${hours}h` : `~${hours}h ${mins}m`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function updateUrlHash(route) {
  const shareRoute = {
    ...route,
    points: simplifyPoints(route.points, 450),
  };
  const payload = btoa(encodeURIComponent(JSON.stringify(shareRoute)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
  history.replaceState(null, "", `#route=${payload}`);
}

function simplifyPoints(points, maxPoints) {
  if (points.length <= maxPoints) return points;
  const step = Math.ceil(points.length / maxPoints);
  const simplified = points.filter((_, index) => index % step === 0);
  const last = points[points.length - 1];
  return simplified[simplified.length - 1] === last ? simplified : [...simplified, last];
}

function routeFromHash() {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const routePayload = hash.get("route");
  if (!routePayload) return null;

  try {
    const padded = routePayload.padEnd(Math.ceil(routePayload.length / 4) * 4, "=");
    const json = decodeURIComponent(atob(padded.replaceAll("-", "+").replaceAll("_", "/")));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function saveActiveRoute() {
  if (!activeRoute) {
    await buildRoute();
  }

  if (!activeRoute) return;

  const saved = getSavedRoutes().filter((route) => route.id !== activeRoute.id);
  saved.unshift(activeRoute);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.slice(0, 20)));
  renderSavedRoutes();
  setActivePanel("saved");
}

function getSavedRoutes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function renderSavedRoutes() {
  const saved = getSavedRoutes();

  if (saved.length === 0) {
    elements.savedRoutes.innerHTML = '<p class="muted">Saved rides will appear here.</p>';
    return;
  }

  elements.savedRoutes.innerHTML = saved.map((route) => `
    <div class="saved-route">
      <div>
        <strong>${escapeHtml(route.title)}</strong>
        <small>${route.distance} ${route.unit} - ${formatMinutes(route.minutes)}</small>
      </div>
      <button type="button" data-route-id="${route.id}">Open</button>
    </div>
  `).join("");
}

async function shareActiveRoute() {
  if (!activeRoute) {
    await buildRoute();
  }

  if (!activeRoute) return;

  const url = window.location.href;
  const shareData = {
    title: activeRoute.title,
    text: `${activeRoute.title} (${activeRoute.distance} ${activeRoute.unit})`,
    url,
  };

  if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
    await navigator.share(shareData);
    return;
  }

  await copyText(url);
  elements.shareButton.textContent = "Copied";
  window.setTimeout(() => {
    elements.shareButton.textContent = "Copy Link";
  }, 1400);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function setVoiceUiState(state) {
  const isRecording = state === "recording";
  const isTranscribing = state === "transcribing";

  elements.voiceButton.classList.toggle("listening", isRecording || isTranscribing);
  elements.voiceInputStack.classList.toggle("is-recording", isRecording);
  elements.voiceInputStack.classList.toggle("is-transcribing", isTranscribing);
  elements.voiceButton.setAttribute("aria-pressed", String(voiceSessionActive));

  if (isRecording) {
    elements.voiceStatus.hidden = false;
    elements.voiceStatusText.textContent = "Recording audio. Tap the microphone again to stop.";
    elements.voiceLabel.textContent = "Stop recording";
    elements.voiceButton.setAttribute("aria-label", "Stop voice recording");
    elements.voiceButton.title = "Stop recording";
    return;
  }

  if (isTranscribing) {
    elements.voiceStatus.hidden = false;
    elements.voiceStatusText.textContent = "Transcribing…";
    elements.voiceLabel.textContent = "Transcribing";
    elements.voiceButton.setAttribute("aria-label", "Transcribing voice input");
    elements.voiceButton.title = "Transcribing";
    elements.voiceButton.disabled = true;
    return;
  }

  elements.voiceStatus.hidden = true;
  elements.voiceButton.disabled = false;
  elements.voiceLabel.textContent = "Voice";
  elements.voiceButton.setAttribute("aria-label", "Start voice input");
  elements.voiceButton.title = "Start voice input";
}

function syncTranscriptFromResults(results) {
  const finals = [];
  let interim = "";

  for (let index = 0; index < results.length; index += 1) {
    const result = results[index];
    const transcript = result[0]?.transcript?.trim();
    if (!transcript) continue;

    if (result.isFinal) {
      finals.push(transcript);
    } else {
      interim = transcript;
    }
  }

  voiceFinalTranscript = finals.join(" ").replace(/\s+/g, " ").trim();
  voiceInterimTranscript = interim.replace(/\s+/g, " ").trim();
}

function commitVoiceTranscript() {
  const transcript = `${voiceFinalTranscript} ${voiceInterimTranscript}`.replace(/\s+/g, " ").trim();
  resetVoiceTranscript();

  if (!transcript) {
    elements.voiceStatus.hidden = false;
    elements.voiceStatusText.textContent = "No speech detected. Tap the microphone and try again.";
    return;
  }

  elements.prompt.value = transcript;
  elements.prompt.focus();
  elements.prompt.setSelectionRange(transcript.length, transcript.length);
}

function resetVoiceTranscript() {
  voiceFinalTranscript = "";
  voiceInterimTranscript = "";
}

function updateVoiceInterimPreview() {
  if (!voiceSessionActive && !voiceStopRequested) return;

  const preview = `${voiceFinalTranscript} ${voiceInterimTranscript}`.replace(/\s+/g, " ").trim();
  elements.voiceStatusText.textContent = preview
    ? `Recording audio. Tap the microphone again to stop. Heard: “${preview}”`
    : "Recording audio. Tap the microphone again to stop.";
}

function finalizeVoiceInput() {
  if (voiceFinalizeHandled) return;
  voiceFinalizeHandled = true;
  voiceStopRequested = false;
  voiceSessionActive = false;
  setVoiceUiState("transcribing");

  window.setTimeout(() => {
    commitVoiceTranscript();
    setVoiceUiState("idle");
    voiceFinalizeHandled = false;
  }, 450);
}

function setupVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    elements.voiceButton.disabled = true;
    elements.voiceLabel.textContent = "No voice";
    elements.voiceButton.setAttribute("aria-label", "Voice input unavailable");
    elements.voiceButton.title = "Voice input unavailable";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    setVoiceUiState("recording");
  };

  recognition.onend = () => {
    if (voiceSessionActive && !voiceStopRequested) {
      try {
        recognition.start();
      } catch {
        window.setTimeout(() => {
          if (voiceSessionActive && !voiceStopRequested) {
            try {
              recognition.start();
            } catch {
              // Browser may reject immediate restarts; user can tap stop and retry.
            }
          }
        }, 250);
      }
      return;
    }

    if (voiceStopRequested || voiceFinalTranscript || voiceInterimTranscript) {
      finalizeVoiceInput();
      return;
    }

    voiceStopRequested = false;
    setVoiceUiState("idle");
  };

  recognition.onerror = (event) => {
    if (event.error === "aborted") return;

    if ((event.error === "no-speech" || event.error === "network") && voiceSessionActive && !voiceStopRequested) {
      return;
    }

    voiceSessionActive = false;
    voiceStopRequested = false;
    voiceFinalizeHandled = false;

    if (event.error !== "no-speech") {
      elements.voiceStatus.hidden = false;
      elements.voiceStatusText.textContent = "Voice input failed. Tap the microphone to try again.";
      resetVoiceTranscript();
      setVoiceUiState("idle");
      return;
    }

    if (voiceFinalTranscript || voiceInterimTranscript) {
      finalizeVoiceInput();
      return;
    }

    resetVoiceTranscript();
    setVoiceUiState("idle");
  };

  recognition.onresult = (event) => {
    syncTranscriptFromResults(event.results);
    updateVoiceInterimPreview();
  };
}

function toggleVoiceInput() {
  if (!recognition) return;

  if (voiceSessionActive || voiceStopRequested) {
    voiceStopRequested = true;
    voiceSessionActive = false;

    try {
      recognition.stop();
    } catch {
      finalizeVoiceInput();
    }

    window.setTimeout(() => {
      if (!voiceFinalizeHandled) {
        finalizeVoiceInput();
      }
    }, 1500);

    return;
  }

  resetVoiceTranscript();
  voiceStopRequested = false;
  voiceFinalizeHandled = false;
  voiceSessionActive = true;

  try {
    recognition.start();
  } catch {
    recognition.stop();
    window.setTimeout(() => {
      if (voiceSessionActive) {
        recognition.start();
      }
    }, 160);
  }
}

function setActivePanel(tabName) {
  const showSaved = tabName === "saved";

  elements.planTabButton.classList.toggle("is-active", !showSaved);
  elements.savedTabButton.classList.toggle("is-active", showSaved);
  elements.planTabButton.setAttribute("aria-selected", String(!showSaved));
  elements.savedTabButton.setAttribute("aria-selected", String(showSaved));
  elements.planTabPanel.hidden = showSaved;
  elements.savedTabPanel.hidden = !showSaved;
}

function bindEvents() {
  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    buildRoute();
  });

  elements.saveButton.addEventListener("click", () => {
    saveActiveRoute();
  });

  elements.shareButton.addEventListener("click", () => {
    shareActiveRoute().catch(() => {
      elements.shareButton.textContent = "Copy failed";
      window.setTimeout(() => {
        elements.shareButton.textContent = "Copy Link";
      }, 1400);
    });
  });

  elements.themeButton.addEventListener("click", cycleTheme);

  elements.clearSavedButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    renderSavedRoutes();
  });

  elements.saveDefaultStartButton.addEventListener("click", () => {
    saveDefaultStartFromField()
      .then(() => {
        elements.saveDefaultStartButton.textContent = "Saved";
        window.setTimeout(() => {
          elements.saveDefaultStartButton.textContent = "Save as default start";
        }, 1400);
      })
      .catch((error) => {
        renderError(error);
        setRouteGenerationState("error");
      });
  });

  elements.clearDefaultStartButton.addEventListener("click", () => {
    clearSavedDefaultStart();
    updateDefaultStartUi();
  });

  elements.savedRoutes.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-route-id]");
    if (!button) return;

    const route = getSavedRoutes().find((candidate) => candidate.id === button.dataset.routeId);
    if (!route) return;
    activeRoute = route;
    elements.startAddress.value = route.startAddress ?? getSavedDefaultStart()?.address ?? "";
    elements.prompt.value = route.prompt;
    elements.style.value = normalizeStyle(route.style);
    setActivePanel("plan");
    renderRoute(route);
    updateUrlHash(route);
    setRouteGenerationState("ready");
  });

  elements.voiceButton.addEventListener("click", () => {
    toggleVoiceInput();
  });

  elements.planTabButton.addEventListener("click", () => {
    setActivePanel("plan");
    window.requestAnimationFrame(updateSheetOffset);
  });

  elements.savedTabButton.addEventListener("click", () => {
    setActivePanel("saved");
    renderSavedRoutes();
    window.requestAnimationFrame(updateSheetOffset);
  });

  elements.panelCollapseButton.addEventListener("click", () => {
    togglePanelCollapsed();
  });
}

function boot() {
  applyTheme(getStoredTheme(), false);
  initMap();
  setupVoiceInput();
  bindEvents();
  setActivePanel("plan");
  const initiallyCollapsed = getStoredPanelCollapsed();
  setPanelCollapsed(initiallyCollapsed, false, { animate: false });
  updateSheetOffset();
  renderSavedRoutes();
  updateDefaultStartUi();

  const sharedRoute = routeFromHash();
  if (sharedRoute?.points?.length > 1) {
    activeRoute = sharedRoute;
    elements.startAddress.value = sharedRoute.startAddress ?? getSavedDefaultStart()?.address ?? "";
    elements.prompt.value = sharedRoute.prompt ?? "";
    elements.style.value = normalizeStyle(sharedRoute.style);
    renderRoute(sharedRoute);
    setRouteGenerationState("ready");
  } else {
    applySavedDefaultStartToField();
    elements.routeSummary.hidden = true;
    elements.routeSummary.innerHTML = "";
    elements.distanceReadout.textContent = "-";
    elements.timeReadout.textContent = "-";
    setRouteGenerationState("idle");
  }
}

boot();
