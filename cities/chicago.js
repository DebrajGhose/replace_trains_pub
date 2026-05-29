/* Chicago CTA L train compatibility. */

window.CITIES = window.CITIES || {};
window.CITIES.chicago = {
  id: "chicago",
  name: "Chicago",
  fullTitle: "Chicago CTA L Compatibility",
  asOf: "May 2026",
  description: "Each dot is a CTA L line. All L lines share the same gauge, 600 V DC third rail, loading gauge, and rolling-stock pool, so any car can run on any line; differences exist only between rolling-stock series. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for details; drag any dot to rearrange the graph.",

  nodes: [
    { id: "red",    name: "Red Line",    color: "#C60C30", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "blue",   name: "Blue Line",   color: "#00A1DE", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "brown",  name: "Brown Line",  color: "#62361B", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "orange", name: "Orange Line", color: "#F9461C", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "green",  name: "Green Line",  color: "#009B3A", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "yellow", name: "Yellow Line", color: "#F9E300", type: "Heavy rail · 600 V DC third rail · standard gauge" }
  ],

  /* All CTA L lines share the same standard gauge, 600 V DC third rail, and a
     single rolling-stock pool (2600/5000/7000 series) on a track-connected
     network, so every directed pair is "yes, solid" (vehicles run, tracks
     joined). The only caveat is at the rolling-stock level: 5000- and
     7000-series cars cannot be coupled into one consist. All 15 line pairs are
     drawn in both directions. */
  links: [
    {
      source: "red", target: "blue", level: "yes", dashed: false,
      summary: "Red Line trains can run on the Blue Line.",
      points: [
        "All CTA L lines use the same standard gauge and the same 600 V DC third rail, so vehicle compatibility is essentially universal across lines.",
        "Both lines have track connections through the Loop and via various interchange points, so cars do move between lines for service shuffles and yard moves.",
        "Caveat at the rolling stock level: the 5000-series and 7000-series cars are NOT electronically compatible, so you cannot mix them inside a single consist. But each series can independently serve either line."
      ]
    },
    {
      source: "blue", target: "red", level: "yes", dashed: false,
      summary: "Blue Line trains can run on the Red Line.",
      points: [
        "Same gauge, same power, same loading envelope.",
        "Track connections via the Loop make cross-line movements practical.",
        "5000-series and 7000-series cars cannot be mixed in one consist, but either series can serve either line."
      ]
    },
    {
      source: "red", target: "brown", level: "yes", dashed: false,
      summary: "Red Line trains can run on the Brown Line.",
      points: [
        "Same gauge, same power, same loading envelope.",
        "Tracks connect through the Loop and at junctions near State and Lake."
      ]
    },
    {
      source: "brown", target: "red", level: "yes", dashed: false,
      summary: "Brown Line trains can run on the Red Line.",
      points: [
        "Same gauge, same power, same loading envelope.",
        "Tracks connect through the Loop and at junctions near State and Lake."
      ]
    },
    {
      source: "brown", target: "orange", level: "yes", dashed: false,
      summary: "Brown Line trains can run on the Orange Line.",
      points: [
        "Both share the Loop and use identical rolling stock specs.",
        "Cars cycle through both lines depending on assignments."
      ]
    },
    {
      source: "orange", target: "brown", level: "yes", dashed: false,
      summary: "Orange Line trains can run on the Brown Line.",
      points: [
        "Both share the Loop and use identical rolling stock specs.",
        "Cars cycle through both lines depending on assignments."
      ]
    },
    {
      source: "green", target: "orange", level: "yes", dashed: false,
      summary: "Green Line trains can run on the Orange Line.",
      points: [
        "Both share the Loop's elevated structure.",
        "Same gauge, same power, same envelope."
      ]
    },
    {
      source: "orange", target: "green", level: "yes", dashed: false,
      summary: "Orange Line trains can run on the Green Line.",
      points: [
        "Both share the Loop's elevated structure.",
        "Same gauge, same power, same envelope."
      ]
    },
    {
      source: "red", target: "yellow", level: "yes", dashed: false,
      summary: "Red Line trains can run on the Yellow Line.",
      points: [
        "The Yellow Line (Skokie Swift) physically connects to the Red Line at Howard Yard.",
        "Same gauge, same power, same rolling stock pool. Yellow Line service is generally provided by the same 5000-series cars used elsewhere on the system."
      ]
    },
    {
      source: "yellow", target: "red", level: "yes", dashed: false,
      summary: "Yellow Line trains can run on the Red Line.",
      points: [
        "Cars used on Yellow are physically identical to other CTA L stock.",
        "Howard Yard connects Yellow to Red, so vehicles transfer easily."
      ]
    },

    /* Remaining line pairs. Every CTA L line shares standard gauge, 600 V DC
       third rail, the same loading envelope, and one rolling-stock pool
       (2600/5000/7000 series) on a track-connected network, so every pair is
       "yes, solid". The only caveat is at the rolling-stock level: 5000- and
       7000-series cars cannot be coupled into one consist. */

    // Red <-> Orange
    {
      source: "red", target: "orange", level: "yes", dashed: false,
      summary: "Red Line trains can run on the Orange Line.",
      points: [
        "Same gauge, same 600 V DC third rail, same loading envelope.",
        "Both reach the Loop, so cars route between them over connected track."
      ]
    },
    {
      source: "orange", target: "red", level: "yes", dashed: false,
      summary: "Orange Line trains can run on the Red Line.",
      points: [
        "Identical rolling-stock specs across both lines.",
        "Track connections through the Loop make the move routine."
      ]
    },

    // Red <-> Green
    {
      source: "red", target: "green", level: "yes", dashed: false,
      summary: "Red Line trains can run on the Green Line.",
      points: [
        "Same gauge, power, and envelope as the rest of the system.",
        "The lines connect via junctions and the Loop, so stock transfers freely."
      ]
    },
    {
      source: "green", target: "red", level: "yes", dashed: false,
      summary: "Green Line trains can run on the Red Line.",
      points: [
        "Identical car specs and one shared rolling-stock pool.",
        "Connected track makes cross-line moves practical."
      ]
    },

    // Blue <-> Brown
    {
      source: "blue", target: "brown", level: "yes", dashed: false,
      summary: "Blue Line trains can run on the Brown Line.",
      points: [
        "Same gauge, power, and loading envelope.",
        "Both are part of the single connected L network, joined through junctions and non-revenue connections.",
        "5000- and 7000-series cars cannot be mixed in one consist, but either series can serve either line."
      ]
    },
    {
      source: "brown", target: "blue", level: "yes", dashed: false,
      summary: "Brown Line trains can run on the Blue Line.",
      points: [
        "Identical rolling-stock specs across both lines.",
        "Cars route between them over connected track."
      ]
    },

    // Blue <-> Orange
    {
      source: "blue", target: "orange", level: "yes", dashed: false,
      summary: "Blue Line trains can run on the Orange Line.",
      points: [
        "Same gauge, power, and envelope.",
        "Both connect into the single L network, so cars can be routed between them."
      ]
    },
    {
      source: "orange", target: "blue", level: "yes", dashed: false,
      summary: "Orange Line trains can run on the Blue Line.",
      points: [
        "Identical car specs and a shared rolling-stock pool.",
        "Connected track makes the transfer routine."
      ]
    },

    // Blue <-> Green
    {
      source: "blue", target: "green", level: "yes", dashed: false,
      summary: "Blue Line trains can run on the Green Line.",
      points: [
        "Same gauge, power, and loading envelope.",
        "Both belong to the one track-connected L network."
      ]
    },
    {
      source: "green", target: "blue", level: "yes", dashed: false,
      summary: "Green Line trains can run on the Blue Line.",
      points: [
        "Identical rolling-stock specs.",
        "Cars route between the lines over connected track."
      ]
    },

    // Blue <-> Yellow
    {
      source: "blue", target: "yellow", level: "yes", dashed: false,
      summary: "Blue Line trains can run on the Yellow Line.",
      points: [
        "Same gauge, power, and envelope; the Yellow Line uses the same 5000-series stock as the rest of the system.",
        "The Yellow Line joins the network via the Red Line at Howard, so a Blue Line car routes there over connected track."
      ]
    },
    {
      source: "yellow", target: "blue", level: "yes", dashed: false,
      summary: "Yellow Line trains can run on the Blue Line.",
      points: [
        "Yellow Line cars are physically identical to other CTA L stock.",
        "They reach the Blue Line via Howard and the connected network."
      ]
    },

    // Brown <-> Green
    {
      source: "brown", target: "green", level: "yes", dashed: false,
      summary: "Brown Line trains can run on the Green Line.",
      points: [
        "Same gauge, power, and envelope.",
        "Both share the Loop, so cars move between them over connected track."
      ]
    },
    {
      source: "green", target: "brown", level: "yes", dashed: false,
      summary: "Green Line trains can run on the Brown Line.",
      points: [
        "Identical rolling-stock specs.",
        "Connected track through the Loop makes the move routine."
      ]
    },

    // Brown <-> Yellow
    {
      source: "brown", target: "yellow", level: "yes", dashed: false,
      summary: "Brown Line trains can run on the Yellow Line.",
      points: [
        "Same gauge, power, and envelope; both run the same shared stock.",
        "The Yellow Line connects via the Red Line at Howard, so a Brown Line car routes there over connected track."
      ]
    },
    {
      source: "yellow", target: "brown", level: "yes", dashed: false,
      summary: "Yellow Line trains can run on the Brown Line.",
      points: [
        "Yellow Line cars are identical to other CTA L stock.",
        "They reach the Brown Line via Howard and the connected network."
      ]
    },

    // Orange <-> Yellow
    {
      source: "orange", target: "yellow", level: "yes", dashed: false,
      summary: "Orange Line trains can run on the Yellow Line.",
      points: [
        "Same gauge, power, and envelope; both use the shared rolling-stock pool.",
        "The Yellow Line joins the network via the Red Line at Howard, so an Orange Line car routes there over connected track."
      ]
    },
    {
      source: "yellow", target: "orange", level: "yes", dashed: false,
      summary: "Yellow Line trains can run on the Orange Line.",
      points: [
        "Yellow Line cars are physically identical to other CTA L stock.",
        "They reach the Orange Line via Howard and the connected network."
      ]
    },

    // Green <-> Yellow
    {
      source: "green", target: "yellow", level: "yes", dashed: false,
      summary: "Green Line trains can run on the Yellow Line.",
      points: [
        "Same gauge, power, and envelope; both run the same shared stock.",
        "The Yellow Line connects via the Red Line at Howard, so a Green Line car routes there over connected track."
      ]
    },
    {
      source: "yellow", target: "green", level: "yes", dashed: false,
      summary: "Yellow Line trains can run on the Green Line.",
      points: [
        "Yellow Line cars are identical to other CTA L stock.",
        "They reach the Green Line via Howard and the connected network."
      ]
    }
  ],

  sources: [
    { title: "Wikipedia. Chicago L rolling stock", url: "https://en.wikipedia.org/wiki/Chicago_%22L%22_rolling_stock" },
    { title: "Wikipedia. CTA 5000-series", url: "https://en.wikipedia.org/wiki/5000-series_(CTA)" },
    { title: "Wikipedia. CTA 7000-series", url: "https://en.wikipedia.org/wiki/7000-series_(CTA)" },
    { title: "Chicago-L.org. Car assignments by line", url: "https://www.chicago-l.org/trains/assignline.html" },
    { title: "CTA. 7000-series introduction (press release)", url: "https://www.transitchicago.com/cta-introduces-new-7000-series-railcars-to-scheduled-service/" }
  ]
};
