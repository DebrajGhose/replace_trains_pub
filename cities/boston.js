/*
  Boston (MBTA) data for the train compatibility graph.

  Schema:
    id           short URL slug (used by ?city=<id>)
    name         short display name, shown in the city dropdown
    fullTitle    long title shown in the page header
    asOf         "as of" date label appended after the title
    description  one-paragraph blurb below the title
    nodes        array of { id, name, color, type } for each rail service
    links        array of { source, target, level, dashed, summary, points }
                   level: "yes" | "caveat" | "no"
                   dashed: true if tracks are not physically joined
    sources      array of { title, url } shown in the bottom-left panel
*/

window.CITIES = window.CITIES || {};
window.CITIES.boston = {
  id: "boston",
  name: "Boston",
  fullTitle: "Boston T Train Compatibility",
  asOf: "May 2026",
  description: "Each dot is an MBTA rail service. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for the details, and drag any dot to rearrange the graph.",

  nodes: [
    { id: "red",      name: "Red Line",         color: "#DA291C", type: "Heavy rail · 600 V DC third rail" },
    { id: "blue",     name: "Blue Line",        color: "#003DA5", type: "Heavy rail · third rail + overhead catenary" },
    { id: "orange",   name: "Orange Line",      color: "#ED8B00", type: "Heavy rail · 600 V DC third rail" },
    { id: "green",    name: "Green Line",       color: "#00843D", type: "Light rail · 600 V DC overhead catenary" },
    { id: "mattapan", name: "Mattapan Trolley", color: "#E91E63", type: "Light rail · 600 V DC overhead catenary" }
  ],

  links: [
    // Green to/from Mattapan. Type 9 LRVs are the same design on both lines.
    {
      source: "green", target: "mattapan", level: "yes", dashed: true,
      summary: "Green Line vehicles can run on Mattapan tracks. Tracks not joined.",
      points: [
        "Both lines are 600 V DC overhead-catenary light rail on standard gauge.",
        "Type 9 LRVs (CAF) are the design used on both. They are already in revenue service on the Green Line, and planned to replace Mattapan's 1940s PCC streetcars as Type 10s arrive.",
        "Caveat: only single-car consists fit Mattapan's short platforms.",
        "Caveat: as of 2026 the transfer hasn't happened yet. Mattapan still runs PCCs, and the Ashmont and Mattapan station modifications needed to accept Type 9s are only about 15% complete.",
        "There's no continuous track between the two services, so even after the swap, vehicles must be trucked between systems."
      ]
    },
    {
      source: "mattapan", target: "green", level: "yes", dashed: true,
      summary: "Mattapan vehicles can run on Green Line tracks. Tracks not joined.",
      points: [
        "When the Mattapan Line transitions to Type 9 LRVs, those vehicles will be the same design as Green Line stock, fully cross-compatible.",
        "Today, Mattapan still runs vintage PCC streetcars, which would not meet modern Green Line operating standards (low-platform-only doors, no modern signaling interface).",
        "Tracks are not physically joined. Equipment must be trucked between systems."
      ]
    },

    // Blue to Red. Blue cars are smaller than Red, same gauge and power.
    {
      source: "blue", target: "red", level: "caveat", dashed: true,
      summary: "A Blue Line car could in principle run on Red Line tracks, with significant modifications.",
      points: [
        "Same standard gauge (4'8½\") and same 600 V DC third-rail voltage, so electrically and mechanically the basics line up.",
        "Blue Line cars (~48 ft long, ~9'3\" wide) are SMALLER than Red Line clearance allows, so they would physically fit Red Line tunnels and stations with room to spare.",
        "Caveat: Wikipedia says the lines are \"otherwise incompatible. Trains of one line would have to be significantly modified (width, length, dynamic envelope) to run on another.\"",
        "Caveat: door spacing wouldn't match Red Line platform markings, so passenger service would be awkward.",
        "Caveat: signaling and train-control systems are different, so cab equipment would need changes.",
        "Caveat: third-rail contact-shoe geometry and platform-side fairings may differ.",
        "Caveat: no track connection exists between the lines, so the car would have to be trucked over."
      ]
    },
    // Red to Blue. Red cars are too WIDE for the East Boston harbor tunnel.
    {
      source: "red", target: "blue", level: "no", dashed: true,
      summary: "A Red Line car cannot run on Blue Line tracks.",
      points: [
        "Red Line cars (~70 ft long, ~10 ft wide) are the widest MBTA heavy-rail car, and they are too wide for the Blue Line's East Boston Tunnel under Boston Harbor (built 1904, tight envelope).",
        "The Blue Line runs partly on overhead catenary east of Airport, so its cars carry pantographs. Red Line cars have none, though the underground third-rail sections share 600 V DC.",
        "Door spacing and platform alignment differ.",
        "No revenue track connection exists between the lines."
      ]
    },

    // Orange to Red. Orange cars are smaller than Red, same gauge and power.
    {
      source: "orange", target: "red", level: "caveat", dashed: true,
      summary: "An Orange Line car could in principle run on Red Line tracks, with significant modifications.",
      points: [
        "Same standard gauge and same 600 V DC third-rail voltage.",
        "Orange Line CRRC 1400 cars (~65 ft long, ~9'2\" wide) are narrower than the Red Line envelope, so they would fit clearance-wise.",
        "Caveat: significant modifications needed. Wikipedia notes the lines are \"otherwise incompatible.\" Cab signaling, door spacing, and train-control systems differ.",
        "Caveat: Red Line platforms expect doors at Red Line car positions, so Orange Line door spacing won't match.",
        "Caveat: no track connection exists, so the vehicle would have to be trucked between lines."
      ]
    },
    // Red to Orange. Red cars are too WIDE for the Orange Line envelope.
    {
      source: "red", target: "orange", level: "no", dashed: true,
      summary: "A Red Line car cannot run on Orange Line tracks.",
      points: [
        "Red Line cars (~70 ft long, ~10 ft wide) are too wide for the Orange Line clearance envelope.",
        "Same standard gauge and 600 V DC third rail, so the wheels and power pickup would line up, but the car body would not fit.",
        "Door spacing and platform layouts differ.",
        "No through track connection exists in revenue service."
      ]
    },

    // Blue to Orange. Blue cars are smaller than Orange.
    {
      source: "blue", target: "orange", level: "caveat", dashed: true,
      summary: "A Blue Line car could in principle run on Orange Line tracks, with significant modifications.",
      points: [
        "Same gauge and same 600 V DC third-rail voltage.",
        "Blue Line cars are shorter and roughly the same width as Orange Line cars, so they would fit Orange Line tunnels.",
        "Caveat: door spacing wouldn't match Orange Line platforms (Blue cars are unusually short).",
        "Caveat: signaling and train-control systems differ between the lines.",
        "Caveat: no track connection between the lines."
      ]
    },
    // Orange to Blue. Orange cars are too BIG for the Blue Line tunnel.
    {
      source: "orange", target: "blue", level: "no", dashed: true,
      summary: "An Orange Line car cannot run on Blue Line tracks.",
      points: [
        "Orange Line cars are bigger than the Blue Line's East Boston Tunnel envelope allows.",
        "Same standard gauge and 600 V DC third rail, but the Blue Line's overhead-pantograph requirement is irrelevant on Orange and the car body simply won't fit the harbor tunnel.",
        "Door spacing and platform alignment differ.",
        "No revenue track connection exists between the lines."
      ]
    }
  ],

  sources: [
    { title: "Wikipedia. Mattapan Line", url: "https://en.wikipedia.org/wiki/Mattapan_Line" },
    { title: "Wikipedia. Blue Line (MBTA)", url: "https://en.wikipedia.org/wiki/Blue_Line_(MBTA)" },
    { title: "Wikipedia. Red Line (MBTA)", url: "https://en.wikipedia.org/wiki/Red_Line_(MBTA)" },
    { title: "Wikipedia. MBTA CAF USA Type 9", url: "https://en.wikipedia.org/wiki/MBTA_CAF_USA_Type_9" },
    { title: "MBTA. Mattapan Line Program", url: "https://www.mbta.com/projects/mattapan-line-program" },
    { title: "Dorchester Reporter (Dec 2025). Mattapan trolley project remains far behind its projected timeline", url: "https://www.dotnews.com/2025/12/21/mattapan-trolley-project-remains-far-behind-its-projected-timeline/" },
    { title: "MBTA. Red / Orange Line Vehicle Technical Specification (2013)", url: "https://bc.mbta.com/business_center/bidding_solicitations/pdf/MBTA%20RO%20Technical%20Specification%20October%2022%202013.pdf" }
  ]
};
