/* San Francisco Bay Area rail compatibility. */

window.CITIES = window.CITIES || {};
window.CITIES.sanfrancisco = {
  id: "sanfrancisco",
  name: "San Francisco",
  fullTitle: "SF Bay Area Train Compatibility",
  asOf: "May 2026",
  description: "Each dot is a Bay Area rail service. BART uses a 5'6\" broad gauge, Caltrain is heavy commuter rail, Muni Metro is light rail, the F Line is a historic streetcar, and cable cars are cable-hauled on narrow gauge, so almost none can run on another's tracks. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for details; drag any dot to rearrange the graph.",

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

    /* BART: 5'6" broad gauge, 1000 V DC third rail. No other Bay Area vehicle
       fits its rails and its cars fit nothing else. All pairings "no", dashed. */
    {
      source: "bart", target: "muni", level: "no", dashed: true,
      summary: "BART trains cannot run on Muni Metro tracks.",
      points: [
        "BART rides a 5'6\" broad gauge; Muni is standard gauge, so BART's wheels would not even sit on Muni's rails.",
        "Power is incompatible too: BART uses 1000 V DC third rail, Muni uses 600 V DC overhead.",
        "BART cars are large heavy-rail vehicles, far too big for Muni's light-rail envelope and platforms.",
        "No track connection exists."
      ]
    },
    {
      source: "muni", target: "bart", level: "no", dashed: true,
      summary: "Muni Metro trains cannot run on BART tracks.",
      points: [
        "Muni is standard gauge; BART is 5'6\" broad gauge, so a Muni LRV's wheels would not fit BART's rails.",
        "Muni draws 600 V DC from overhead; BART has 1000 V DC third rail and no catenary, so a Muni car would have no power.",
        "No track connection exists."
      ]
    },
    {
      source: "bart", target: "caltrain", level: "no", dashed: true,
      summary: "BART trains cannot run on Caltrain tracks.",
      points: [
        "BART's 5'6\" broad gauge does not fit Caltrain's standard-gauge rails.",
        "Power is incompatible: BART uses 1000 V DC third rail, Caltrain uses 25 kV AC overhead.",
        "No track connection exists between the systems."
      ]
    },
    {
      source: "caltrain", target: "bart", level: "no", dashed: true,
      summary: "Caltrain trains cannot run on BART tracks.",
      points: [
        "Caltrain is standard gauge; BART is 5'6\" broad gauge, so the wheels would not fit.",
        "Caltrain uses 25 kV AC overhead; BART has 1000 V DC third rail and no catenary.",
        "No track connection exists."
      ]
    },
    {
      source: "bart", target: "fline", level: "no", dashed: true,
      summary: "BART trains cannot run on F Line tracks.",
      points: [
        "BART's 5'6\" broad gauge does not fit the F Line's standard-gauge street track.",
        "BART uses 1000 V DC third rail; the F Line uses 600 V DC overhead.",
        "BART runs large heavy-rail cars; the F Line runs single streetcars.",
        "No track connection exists."
      ]
    },
    {
      source: "fline", target: "bart", level: "no", dashed: true,
      summary: "F Line streetcars cannot run on BART tracks.",
      points: [
        "The F Line is standard gauge; BART is 5'6\" broad gauge, so the wheels would not fit.",
        "F Line PCCs draw 600 V DC from overhead; BART has 1000 V DC third rail and no catenary.",
        "No track connection exists."
      ]
    },
    {
      source: "bart", target: "cable", level: "no", dashed: true,
      summary: "BART trains cannot run on cable car tracks.",
      points: [
        "BART's 5'6\" broad gauge does not fit the cable cars' 3'6\" narrow gauge.",
        "Cable cars are cable-hauled with no electrical traction; BART is a self-powered electric heavy-rail train.",
        "No track connection exists."
      ]
    },
    {
      source: "cable", target: "bart", level: "no", dashed: true,
      summary: "Cable cars cannot run on BART tracks.",
      points: [
        "Cable cars use 3'6\" narrow gauge; BART is 5'6\" broad gauge, so the wheels would not fit.",
        "Cable cars have no traction motors at all (they grip a moving cable), so they cannot move under their own power on BART track.",
        "No track connection exists."
      ]
    },

    /* Cable cars: 3'6" narrow gauge, cable-hauled, no traction motors. Nothing
       fits their track and they fit nothing else. All pairings "no", dashed. */
    {
      source: "muni", target: "cable", level: "no", dashed: true,
      summary: "Muni Metro trains cannot run on cable car tracks.",
      points: [
        "Muni is standard gauge; cable cars are 3'6\" narrow gauge, so the wheels would not fit.",
        "Cable car tracks have a center slot for the cable, not electrical power for a Muni LRV.",
        "No track connection exists."
      ]
    },
    {
      source: "cable", target: "muni", level: "no", dashed: true,
      summary: "Cable cars cannot run on Muni Metro tracks.",
      points: [
        "Cable cars are 3'6\" narrow gauge; Muni is standard gauge, so the wheels would not fit.",
        "Cable cars have no traction motors; with no street cable to grip, a cable car cannot move on Muni track.",
        "No track connection exists."
      ]
    },
    {
      source: "caltrain", target: "cable", level: "no", dashed: true,
      summary: "Caltrain trains cannot run on cable car tracks.",
      points: [
        "Caltrain is standard gauge; cable cars are 3'6\" narrow gauge, so the wheels would not fit.",
        "Cable car track carries a hauling cable, not 25 kV power, and could never bear Caltrain's weight.",
        "No track connection exists."
      ]
    },
    {
      source: "cable", target: "caltrain", level: "no", dashed: true,
      summary: "Cable cars cannot run on Caltrain tracks.",
      points: [
        "Cable cars are 3'6\" narrow gauge; Caltrain is standard gauge, so the wheels would not fit.",
        "Cable cars have no traction motors and no way to draw Caltrain's 25 kV AC power.",
        "No track connection exists."
      ]
    },
    {
      source: "fline", target: "cable", level: "no", dashed: true,
      summary: "F Line streetcars cannot run on cable car tracks.",
      points: [
        "The F Line is standard gauge; cable cars are 3'6\" narrow gauge, so the wheels would not fit.",
        "Cable car track has a cable slot, not the 600 V DC overhead an F Line PCC needs.",
        "No track connection exists."
      ]
    },
    {
      source: "cable", target: "fline", level: "no", dashed: true,
      summary: "Cable cars cannot run on F Line tracks.",
      points: [
        "Cable cars are 3'6\" narrow gauge; the F Line is standard gauge, so the wheels would not fit.",
        "Cable cars have no traction motors and cannot draw power from the F Line's overhead.",
        "No track connection exists."
      ]
    },

    /* Caltrain <-> F Line: both standard gauge, so the wheels fit, but power,
       weight, and size still rule it out. */
    {
      source: "caltrain", target: "fline", level: "no", dashed: true,
      summary: "Caltrain trains cannot run on F Line tracks.",
      points: [
        "Same standard gauge, so the wheels would actually fit.",
        "Power is incompatible: Caltrain uses 25 kV AC overhead, the F Line uses 600 V DC overhead.",
        "Caltrain consists are heavy commuter-rail trains far too large and heavy for the F Line's light street track and stops.",
        "No track connection exists."
      ]
    },
    {
      source: "fline", target: "caltrain", level: "no", dashed: true,
      summary: "F Line streetcars cannot run on Caltrain tracks.",
      points: [
        "Same standard gauge, so the wheels would fit.",
        "Power is incompatible: the F Line's PCCs use 600 V DC overhead, Caltrain uses 25 kV AC overhead.",
        "A vintage streetcar is not built for the loads, speeds, or crash standards of a commuter-rail mainline.",
        "No track connection exists."
      ]
    }
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
