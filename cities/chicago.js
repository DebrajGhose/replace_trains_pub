/* Chicago CTA L train compatibility. */

window.CITIES = window.CITIES || {};
window.CITIES.chicago = {
  id: "chicago",
  name: "Chicago",
  fullTitle: "Chicago CTA L Compatibility",
  asOf: "May 2026",
  description: "Each dot is a CTA L line. Chicago's L is built as one network: almost every car can run on every line because the lines share the Loop, voltage, gauge, and clearance, so the interesting nuance is between rolling stock series, not lines. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for the details, and drag any dot to rearrange the graph.",

  nodes: [
    { id: "red",    name: "Red Line",    color: "#C60C30", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "blue",   name: "Blue Line",   color: "#00A1DE", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "brown",  name: "Brown Line",  color: "#62361B", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "orange", name: "Orange Line", color: "#F9461C", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "green",  name: "Green Line",  color: "#009B3A", type: "Heavy rail · 600 V DC third rail · standard gauge" },
    { id: "yellow", name: "Yellow Line", color: "#F9E300", type: "Heavy rail · 600 V DC third rail · standard gauge" }
  ],

  /* Story: All CTA L lines share the same standard gauge, the same 600 V DC
     third rail, and a single rolling stock pool (2600-series, 5000-series,
     7000-series). Cars are routinely moved between lines, and most lines
     converge on the Loop. So almost every directed pair is "yes, solid green"
     (vehicles can run, tracks are joined). The exceptions are about rolling
     stock generations being unable to MU into mixed consists, not about
     lines being incompatible. We pick a few representative line pairs rather
     than drawing all 30 directed edges, but every pair we DO show is drawn in
     both directions, consistent with the other cities. */
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
