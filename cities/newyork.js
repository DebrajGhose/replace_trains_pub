/* New York City Subway compatibility. */

window.CITIES = window.CITIES || {};
window.CITIES.newyork = {
  id: "newyork",
  name: "New York",
  fullTitle: "NYC Subway Train Compatibility",
  asOf: "May 2026",
  description: "Each dot is a rolling-stock family in the NYC Subway. Cars run across services within a division but not across divisions, because car and tunnel dimensions differ. The 7 and L lines are CBTC-only and physically isolated. An arrow from A to B means A's train could physically run on B's tracks; its color is the verdict. Hover an arrow for details; drag any dot to rearrange the graph.",

  nodes: [
    /* The MTA splits the system into two divisions of incompatible-sized
       cars. A Division ("numbered routes") and B Division ("lettered
       routes"). The 7 train (Flushing) and L train (Canarsie) deserve
       their own nodes because both run CBTC and are physically isolated
       from their division's mainline. */
    { id: "adiv",  name: "A Division (1–6)",    color: "#EE352E", type: "IRT-spec heavy rail · ~8'9\" wide cars · 600 V DC third rail" },
    { id: "seven", name: "7 Train (Flushing)",  color: "#B933AD", type: "IRT-spec, but CBTC-signaled and isolated from rest of A Division" },
    { id: "bdiv",  name: "B Division (A–Z)",    color: "#0039A6", type: "BMT/IND-spec heavy rail · ~10' wide cars · 600 V DC third rail" },
    { id: "ltrain",name: "L Train (Canarsie)",  color: "#A7A9AC", type: "BMT-spec, but CBTC-signaled and isolated from rest of B Division" },
    { id: "sir",   name: "Staten Island Railway", color: "#0078C6", type: "BMT-spec rolling stock (R211), physically isolated" }
  ],

  links: [
    /* 7 Train and A Division share the IRT loading envelope. The 7 has
       had CBTC since 2018 and the rest of the A Division does not. A 7
       car is mechanically identical to other A Division cars (R188s, now
       R262s coming) and can operate without CBTC. But a non-CBTC A
       Division car cannot operate revenue service on the Flushing Line. */
    {
      source: "seven", target: "adiv", level: "yes", dashed: false,
      summary: "7 Train cars can run on A Division tracks.",
      points: [
        "Cars are physically identical to other A Division (IRT) rolling stock. Same width, length, gauge, and power.",
        "Track connections exist (yard at Corona connects to the rest of the IRT through 207th Street Yard via the Steinway tubes were severed long ago, but stock has been transferred historically).",
        "Caveat: 7 cars are equipped with CBTC, which is unused on non-CBTC IRT lines. They simply default to manual block signaling, no problem."
      ]
    },
    {
      source: "adiv", target: "seven", level: "no", dashed: false,
      summary: "A Division non-CBTC cars cannot run revenue service on the 7 Line.",
      points: [
        "Mechanically the cars fit (same IRT dimensions).",
        "But the Flushing Line is CBTC-only since 2018. Without on-board CBTC equipment, a car cannot operate revenue trains on the line.",
        "Tracks join only for non-revenue equipment moves through yards."
      ]
    },

    /* L Train and B Division. Same story as 7 vs A Division. */
    {
      source: "ltrain", target: "bdiv", level: "yes", dashed: false,
      summary: "L Train cars can run on B Division tracks.",
      points: [
        "L cars (R143, R160, soon R211T open-gangway) are standard B Division stock. Same width, length, gauge, and power as the rest of BMT/IND.",
        "Tracks join at East New York Yard, where the Canarsie Line meets the rest of the B Division.",
        "Caveat: L cars carry CBTC equipment, which is dormant on non-CBTC B Division lines."
      ]
    },
    {
      source: "bdiv", target: "ltrain", level: "no", dashed: false,
      summary: "B Division non-CBTC cars cannot run revenue service on the L Line.",
      points: [
        "Mechanically the cars fit (same B Division dimensions).",
        "But the Canarsie Line is CBTC-only since 2012. Cars without on-board CBTC equipment cannot operate revenue service.",
        "Tracks join at East New York Yard for non-revenue moves."
      ]
    },

    /* Cross-division: incompatible by tunnel size, not by gauge. Same
       4'8.5" rail gauge but different loading envelopes. */
    {
      source: "adiv", target: "bdiv", level: "no", dashed: true,
      summary: "A Division cars cannot run on B Division tracks.",
      points: [
        "Same standard rail gauge, but A Division cars (about 8'9\" wide, 51' long) would leave a dangerously large gap at B Division high-level platforms.",
        "Trip-stop equipment is located on opposite sides of the track between divisions, so signaling would also be incompatible.",
        "No revenue track connection between divisions."
      ]
    },
    {
      source: "bdiv", target: "adiv", level: "no", dashed: true,
      summary: "B Division cars cannot run on A Division tracks.",
      points: [
        "B Division cars (about 10' wide, 60' to 75' long) do not fit inside A Division tunnel clearances or platform setbacks. Tighter curves on the IRT also exceed B Division minimum radius.",
        "Trip-stop equipment is on the wrong side.",
        "No revenue track connection between divisions."
      ]
    },

    /* Staten Island Railway. Uses B Division rolling stock specs (R211s
       being delivered). Cars are physically compatible with the rest of
       the B Division. But the railway is physically isolated from the
       mainland subway. */
    {
      source: "sir", target: "bdiv", level: "yes", dashed: true,
      summary: "SIR cars are B Division stock and could run on B Division tracks.",
      points: [
        "The R211S cars assigned to SIR are essentially the same as the R211 cars used on the B Division mainland.",
        "Same loading envelope, same gauge, same power.",
        "But the Staten Island Railway is physically isolated from the rest of the system. Equipment is moved by barge for major overhauls."
      ]
    },
    {
      source: "bdiv", target: "sir", level: "yes", dashed: true,
      summary: "B Division cars could run on SIR tracks.",
      points: [
        "Identical rolling stock specs (R211 family).",
        "No track connection, so vehicles must be barged over to reach Staten Island."
      ]
    },

    /* A Division <-> L Train. Cross-division: IRT-narrow vs BMT-wide, and the
       L is CBTC-only and physically isolated. Incompatible both ways. */
    {
      source: "adiv", target: "ltrain", level: "no", dashed: true,
      summary: "A Division cars cannot run on the L.",
      points: [
        "A Division (IRT) cars are about 8'9\" wide and would leave a large gap at the L's B-Division (BMT) platforms.",
        "The Canarsie Line is CBTC-only, so a non-CBTC IRT car could not run revenue service even if it fit.",
        "No revenue track connection: the L is isolated and on the opposite division."
      ]
    },
    {
      source: "ltrain", target: "adiv", level: "no", dashed: true,
      summary: "L cars cannot run on A Division tracks.",
      points: [
        "L cars are BMT-spec (about 10' wide, 60'+ long) and do not fit IRT tunnel clearances, platform setbacks, or curve radii.",
        "Trip-stop / signaling equipment is on the opposite side between divisions.",
        "No revenue track connection between the divisions."
      ]
    },

    /* A Division <-> SIR. IRT-narrow vs SIR's B-Division-spec R211S, and SIR
       is isolated (barge). Incompatible both ways. */
    {
      source: "adiv", target: "sir", level: "no", dashed: true,
      summary: "A Division cars cannot run on SIR tracks.",
      points: [
        "SIR uses B-Division-spec R211S cars and B-Division-width platforms; an 8'9\"-wide IRT car would leave a large platform gap.",
        "The Staten Island Railway is physically isolated; equipment reaches it only by barge.",
        "No track connection exists."
      ]
    },
    {
      source: "sir", target: "adiv", level: "no", dashed: true,
      summary: "SIR cars cannot run on A Division tracks.",
      points: [
        "SIR's R211S are B-Division-spec (about 10' wide) and do not fit IRT clearances, platform setbacks, or curves.",
        "SIR is isolated; vehicles would have to be barged to the mainland first.",
        "No track connection exists."
      ]
    },

    /* 7 Train <-> B Division. The 7 is IRT-spec (narrow); B Division is
       BMT/IND-spec (wide). Cross-division, plus the 7 is CBTC-only. */
    {
      source: "seven", target: "bdiv", level: "no", dashed: true,
      summary: "7 Train cars cannot run on B Division tracks.",
      points: [
        "The 7 uses IRT-spec cars (about 8'9\" wide), which would leave a large gap at B Division's wider platforms.",
        "Trip-stop / signaling differs between divisions.",
        "No revenue track connection: the Flushing Line is isolated and on the opposite division."
      ]
    },
    {
      source: "bdiv", target: "seven", level: "no", dashed: true,
      summary: "B Division cars cannot run on the 7.",
      points: [
        "B Division cars (about 10' wide) do not fit the IRT-spec Flushing Line's clearances and curves.",
        "The Flushing Line is CBTC-only, so a non-CBTC car could not run revenue service even if it fit.",
        "No revenue track connection between the divisions."
      ]
    },

    /* 7 Train <-> L Train. Both isolated and CBTC, but opposite divisions
       (IRT-narrow vs BMT-wide) and different CBTC suppliers. */
    {
      source: "seven", target: "ltrain", level: "no", dashed: true,
      summary: "7 Train cars cannot run on the L.",
      points: [
        "The 7 is IRT-spec (about 8'9\" wide); the L is BMT-spec, so a 7 car would leave a large gap at L platforms.",
        "Both lines are CBTC, but they use different, non-interoperable CBTC systems (Flushing: Thales; Canarsie: Siemens).",
        "Both lines are physically isolated from each other; no track connection exists."
      ]
    },
    {
      source: "ltrain", target: "seven", level: "no", dashed: true,
      summary: "L cars cannot run on the 7.",
      points: [
        "The L is BMT-spec (about 10' wide) and does not fit the IRT-spec Flushing Line's clearances and curves.",
        "Different, non-interoperable CBTC systems on the two lines.",
        "No track connection exists between the two isolated lines."
      ]
    },

    /* 7 Train <-> SIR. IRT-narrow vs SIR's B-Division-spec stock, both
       isolated. Incompatible both ways. */
    {
      source: "seven", target: "sir", level: "no", dashed: true,
      summary: "7 Train cars cannot run on SIR tracks.",
      points: [
        "The 7 is IRT-spec (about 8'9\" wide); SIR uses B-Division-spec R211S with wider platforms, so a 7 car would leave a large gap.",
        "Both are physically isolated; SIR is reachable only by barge.",
        "No track connection exists."
      ]
    },
    {
      source: "sir", target: "seven", level: "no", dashed: true,
      summary: "SIR cars cannot run on the 7.",
      points: [
        "SIR's R211S are B-Division-spec (about 10' wide) and do not fit the IRT-spec Flushing Line.",
        "The Flushing Line is also CBTC-only, which SIR cars are not equipped for.",
        "No track connection exists between the isolated lines."
      ]
    },

    /* L Train <-> SIR. Both are B-Division-spec, so they FIT each other
       mechanically. Asymmetry comes from CBTC: the L is CBTC-only, SIR is
       not, so L cars can fall back to manual on SIR but SIR cars (no CBTC)
       cannot run revenue on the L. Both isolated, so dashed either way. */
    {
      source: "ltrain", target: "sir", level: "yes", dashed: true,
      summary: "L cars could run on SIR tracks.",
      points: [
        "Both are B-Division-spec (R211 family), so the L's cars fit SIR's loading envelope, platforms, and gauge.",
        "SIR is not CBTC, and L cars can operate under conventional signaling, so they would work there.",
        "Both lines are isolated, so a vehicle would have to be barged over."
      ]
    },
    {
      source: "sir", target: "ltrain", level: "no", dashed: true,
      summary: "SIR cars cannot run revenue service on the L.",
      points: [
        "Mechanically they fit: SIR's R211S share the L's B-Division loading envelope.",
        "But the Canarsie Line is CBTC-only, and SIR cars are not CBTC-equipped, so they could not run revenue service.",
        "Both lines are isolated; equipment would have to be barged between them."
      ]
    }
  ],

  sources: [
    { title: "The City. Notes from the underground (subway car families)", url: "https://www.thecity.nyc/2025/04/14/subway-train-cars-subway-guide/" },
    { title: "nycsubway.org. Subway FAQ", url: "https://www.nycsubway.org/wiki/Subway_FAQ" },
    { title: "Wikipedia. New York City Subway", url: "https://en.wikipedia.org/wiki/New_York_City_Subway" },
    { title: "Wikipedia. R211 (New York City Subway car)", url: "https://en.wikipedia.org/wiki/R211_(New_York_City_Subway_car)" },
    { title: "Wikipedia. Staten Island Railway", url: "https://en.wikipedia.org/wiki/Staten_Island_Railway" },
    { title: "Wikipedia. Communications-based train control on NYC Subway", url: "https://en.wikipedia.org/wiki/Communications-based_train_control" }
  ]
};
