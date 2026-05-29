/* San Francisco Bay Area rail compatibility. */

window.CITIES = window.CITIES || {};
window.CITIES.sanfrancisco = {
  id: "sanfrancisco",
  name: "San Francisco",
  fullTitle: "SF Bay Area Train Compatibility",
  asOf: "May 2026",
  description: "Each dot is a rail service in the Bay Area. The story here is fragmentation: BART runs on a unique broad gauge, Caltrain is heavy commuter rail, Muni Metro is light rail, cable cars are cable-hauled, so almost nothing can run on anything else. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for the details, and drag any dot to rearrange the graph.",

  nodes: [
    { id: "bart",     name: "BART",                color: "#0099CC", type: "Heavy rail · 1000 V DC third rail · BROAD 5'6\" gauge" },
    { id: "muni",     name: "Muni Metro",          color: "#BB0000", type: "Light rail · 600 V DC overhead catenary · standard gauge" },
    { id: "caltrain", name: "Caltrain",            color: "#A23B0D", type: "Commuter rail · 25 kV AC overhead (electrified 2024) · standard gauge" },
    { id: "fline",    name: "Muni F Line",         color: "#E91E27", type: "Historic streetcar · 600 V DC overhead · standard gauge" },
    { id: "cable",    name: "Cable Cars",          color: "#8B5A2B", type: "Cable-hauled · no electrical traction · narrow 3'6\" gauge" }
  ],

  links: [
    /* Muni Metro and the F Line share Market Street infrastructure and use
       the same overhead catenary voltage. The F Line is operated by Muni
       with vintage PCC streetcars, but the modern Muni LRVs and the historic
       PCCs are mechanically compatible enough that they share track. */
    {
      source: "muni", target: "fline", level: "yes", dashed: false,
      summary: "Muni LRVs can travel on F Line tracks.",
      points: [
        "Same gauge (standard), same power (600 V DC overhead catenary), same operator (SFMTA Muni).",
        "Tracks are physically joined along Market Street. F Line cars and Muni LRVs share corridor with separation by service patterns.",
        "Caveat: F Line is operated as a historic streetcar service with vintage PCC cars. Modern Muni LRVs are taller and longer, so they would not match heritage stop spacing and would feel out of place visually, but mechanically they fit."
      ]
    },
    {
      source: "fline", target: "muni", level: "yes", dashed: false,
      summary: "F Line vintage streetcars can travel on Muni Metro tracks.",
      points: [
        "Same gauge, same power, same operator.",
        "Tracks are joined along Market Street.",
        "Caveat: vintage PCC cars have shorter, lower bodies and would not align with high-platform Muni Metro subway stations. They are fine on at-grade and surface segments."
      ]
    },

    /* BART is broad gauge. Nothing else in the Bay Area can ride on it, and
       BART trains cannot ride on anything else. No edges to BART. */

    /* Caltrain on Muni Metro tracks would clear the gauge but not the
       loading envelope and certainly not the voltage. Worth showing as a
       red arrow because the lines briefly run parallel near 4th and King,
       and the "Caltrain Downtown Extension" project regularly raises the
       question. Tracks are NOT physically joined for revenue. */
    {
      source: "caltrain", target: "muni", level: "no", dashed: true,
      summary: "Caltrain trains cannot run on Muni Metro tracks.",
      points: [
        "Same standard gauge, so the wheels would fit.",
        "Caltrain rolling stock is significantly WIDER than Muni LRVs. Caltrain trains would crash into Muni's high-level platforms.",
        "Power is incompatible. Caltrain uses 25 kV AC overhead (electrified 2024), Muni uses 600 V DC overhead. A Caltrain locomotive on Muni tracks would have no usable power.",
        "Caltrain consists are far heavier and longer than Muni track structure expects.",
        "No track connection exists."
      ]
    },
    {
      source: "muni", target: "caltrain", level: "no", dashed: true,
      summary: "Muni Metro trains cannot run on Caltrain tracks.",
      points: [
        "Same standard gauge, so the wheels would fit.",
        "Power is incompatible. Muni uses 600 V DC overhead, Caltrain uses 25 kV AC overhead (electrified 2024). A Muni LRV on Caltrain catenary would have no usable power.",
        "Muni LRVs are lightweight light-rail vehicles, not built for the loads, speeds, or crash standards of a heavy commuter-rail mainline.",
        "Platform heights and door positions do not match between the systems.",
        "No track connection exists."
      ]
    },

    /* Cable cars are mechanically unique. Narrow gauge, no electrical
       traction (cable-hauled). They cannot ride on anything else and
       nothing can ride on them. No edges. */
  ],

  sources: [
    { title: "Wikipedia. Bay Area Rapid Transit", url: "https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit" },
    { title: "BART. System facts (gauge, voltage)", url: "https://www.bart.gov/about/history/facts" },
    { title: "Streetsblog SF. The crazy idea of running Caltrain onto Muni's tracks", url: "https://sf.streetsblog.org/2017/06/13/the-crazy-idea-of-running-caltrain-onto-munis-tracks" },
    { title: "Wikipedia. Muni Metro", url: "https://en.wikipedia.org/wiki/Muni_Metro" },
    { title: "Wikipedia. San Francisco cable car system", url: "https://en.wikipedia.org/wiki/San_Francisco_cable_car_system" },
    { title: "Wikipedia. F Market & Wharves", url: "https://en.wikipedia.org/wiki/F_Market_%26_Wharves" },
    { title: "Wikipedia. Caltrain Modernization Program", url: "https://en.wikipedia.org/wiki/Caltrain_Modernization_Program" }
  ]
};
