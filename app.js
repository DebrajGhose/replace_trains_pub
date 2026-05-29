/* Train compatibility graph. Renders the city selected via ?city=<id>. */

(function bootstrap() {
  const allCities = window.CITIES || {};
  const cityIds = Object.keys(allCities);
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("city");
  const cityId = (requested && allCities[requested]) ? requested : cityIds[0];

  if (!cityId) {
    document.getElementById("title").textContent = "No city data loaded.";
    return;
  }

  const city = allCities[cityId];

  /* ---------- HEADER ---------- */

  document.title = city.fullTitle + " · " + city.asOf;
  document.getElementById("title").textContent = city.fullTitle + " · " + city.asOf;
  document.getElementById("description").textContent = city.description;

  /* ---------- CITY SWITCHER ---------- */

  if (cityIds.length > 1) {
    const switcher = document.getElementById("city-switcher");
    const select = document.createElement("select");
    cityIds.forEach(function (id) {
      const opt = document.createElement("option");
      opt.value = id;
      opt.textContent = allCities[id].name;
      if (id === cityId) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", function (e) {
      const url = new URL(window.location.href);
      url.searchParams.set("city", e.target.value);
      window.location.href = url.toString();
    });
    switcher.appendChild(select);
  }

  /* ---------- SOURCES ---------- */

  const sourcesList = document.getElementById("sources-list");
  city.sources.forEach(function (s) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = s.title;
    li.appendChild(a);
    sourcesList.appendChild(li);
  });

  /* ---------- GRAPH ---------- */

  renderGraph(city.nodes, city.links);
})();


function renderGraph(rawNodes, rawLinks) {
  /* Clone so we don't mutate the data on the city object (so the page can
     re-render cleanly if we ever want to swap cities without reloading). */
  const nodes = rawNodes.map(function (n) { return Object.assign({}, n); });
  const links = rawLinks.map(function (l) { return Object.assign({}, l); });

  const svg = d3.select("#graph");
  const tooltipEl = document.getElementById("tooltip");
  const tooltip = d3.select(tooltipEl);

  let width = window.innerWidth;
  let height = window.innerHeight;
  svg.attr("viewBox", [0, 0, width, height]);

  const levelColor = {
    yes:    "#a6e3a1",
    caveat: "#f9e2af",
    no:     "#f38ba8"
  };

  const NODE_RADIUS = 30;
  const ARROW_GAP   = 4;

  /* Arrow markers, one per compatibility level. */
  const defs = svg.append("defs");
  Object.entries(levelColor).forEach(function (entry) {
    const level = entry[0];
    const color = entry[1];
    defs.append("marker")
      .attr("id", "arrow-" + level)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", color);
  });

  /* Seed initial positions on a ring so the layout opens up immediately. */
  nodes.forEach(function (n, i) {
    const angle = (i / nodes.length) * Math.PI * 2;
    const radius = Math.min(width, height) * 0.28;
    n.x = width / 2 + Math.cos(angle) * radius;
    n.y = height / 2 + Math.sin(angle) * radius;
  });

  /* Deduplicate by unordered pair so a node-pair with arrows in both
     directions counts as ONE spring, not two. Rendering still uses the full
     `links` array so both arrows are drawn. */
  const seenPairs = new Set();
  const simLinks = [];
  for (const l of links) {
    const key = [l.source, l.target].sort().join("|");
    if (seenPairs.has(key)) continue;
    seenPairs.add(key);
    simLinks.push({ source: l.source, target: l.target });
  }

  /* Resolve render-side links to node-object references manually, since
     d3.forceLink will only touch simLinks. Without this the tick handler
     reads `d.source.x` on a plain string and produces NaN paths. */
  const nodeById = new Map(nodes.map(function (n) { return [n.id, n]; }));
  for (const l of links) {
    l.source = nodeById.get(l.source);
    l.target = nodeById.get(l.target);
  }

  /* forceRadial keeps every node on a ring around the centre. charge spaces
     them angularly. link force is gentle so attached pairs stay slightly
     closer without distorting the ring. */
  const ringRadius = Math.min(width, height) * 0.32;
  const simulation = d3.forceSimulation(nodes)
    .force("radial", d3.forceRadial(ringRadius, width / 2, height / 2).strength(0.35))
    .force("link",   d3.forceLink(simLinks).id(function (d) { return d.id; }).distance(ringRadius).strength(0.05))
    .force("charge", d3.forceManyBody().strength(-800))
    .force("collide", d3.forceCollide().radius(60))
    .alphaDecay(0.022);

  const linkLayer = svg.append("g").attr("class", "links");
  const nodeLayer = svg.append("g").attr("class", "nodes");

  /* Each link is a group with an invisible thick "hit" path for easy hover
     plus a visible path. */
  const linkSel = linkLayer.selectAll("g.link-pair")
    .data(links)
    .enter()
    .append("g")
    .attr("class", "link-pair")
    .on("mouseenter", function (event, d) { showLinkTooltip(event, d); })
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  linkSel.append("path").attr("class", "link hit");
  linkSel.append("path")
    .attr("class", function (d) { return d.dashed ? "link dashed" : "link"; })
    .attr("stroke", function (d) { return levelColor[d.level]; })
    .attr("marker-end", function (d) { return "url(#arrow-" + d.level + ")"; });

  const nodeSel = nodeLayer.selectAll("g.node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(d3.drag()
      .on("start", dragStart)
      .on("drag",  dragging)
      .on("end",   dragEnd))
    .on("mouseenter", function (event, d) {
      tooltip.html("<h3>" + d.name + "</h3><div class=\"meta\">" + (d.type || "") + "</div>").classed("visible", true);
      moveTooltip(event);
    })
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  nodeSel.append("circle")
    .attr("r", NODE_RADIUS)
    .attr("fill", function (d) { return d.color; });

  nodeSel.append("text")
    .attr("dy", 50)
    .text(function (d) { return d.name; });

  simulation.on("tick", function () {
    linkSel.selectAll("path").attr("d", linkArc);
    nodeSel.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
  });

  function linkArc(d) {
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return "";

    /* Shorten the path so the arrowhead tip lands just outside the target
       circle, and the path start sits at the source-node edge. */
    const ux = dx / dist;
    const uy = dy / dist;
    const sx = d.source.x + ux * NODE_RADIUS;
    const sy = d.source.y + uy * NODE_RADIUS;
    const tx = d.target.x - ux * (NODE_RADIUS + ARROW_GAP);
    const ty = d.target.y - uy * (NODE_RADIUS + ARROW_GAP);

    /* Curve the path so paired opposite-direction arrows bow to opposite
       sides (the sweep flag is fixed, so flipping source/target flips the
       bow). */
    const dr = dist * 1.6;
    return "M" + sx + "," + sy + "A" + dr + "," + dr + " 0 0,1 " + tx + "," + ty;
  }

  function dragStart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragging(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragEnd(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  function showLinkTooltip(event, d) {
    const src = (typeof d.source === "object") ? d.source : nodes.find(function (n) { return n.id === d.source; });
    const tgt = (typeof d.target === "object") ? d.target : nodes.find(function (n) { return n.id === d.target; });
    const items = d.points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
    const tracksLabel = d.dashed ? "Tracks not joined" : "Tracks joined";
    tooltip.html(
      "<h3>" + src.name + " &nbsp;train on&nbsp; " + tgt.name + "</h3>" +
      "<div class=\"verdict\" style=\"color:" + levelColor[d.level] + "\">" + d.summary + "</div>" +
      "<div class=\"meta\">" + tracksLabel + "</div>" +
      "<ul>" + items + "</ul>"
    ).classed("visible", true);
    moveTooltip(event);
  }

  function moveTooltip(event) {
    const pad = 14;
    const w = tooltipEl.offsetWidth  || 280;
    const h = tooltipEl.offsetHeight || 120;
    let x = event.clientX + pad;
    let y = event.clientY + pad;
    if (x + w > window.innerWidth)  x = event.clientX - w - pad;
    if (y + h > window.innerHeight) y = event.clientY - h - pad;
    tooltip.style("left", x + "px").style("top", y + "px");
  }
  function hideTooltip() {
    tooltip.classed("visible", false);
  }

  /* Debug hook. ?debug=<sourceId>-<targetId> pins a tooltip open. */
  (function () {
    const params = new URLSearchParams(window.location.search);
    const debugLink = params.get("debug");
    if (!debugLink) return;
    setTimeout(function () {
      const link = links.find(function (l) {
        const sid = typeof l.source === "object" ? l.source.id : l.source;
        const tid = typeof l.target === "object" ? l.target.id : l.target;
        return (sid + "-" + tid) === debugLink;
      });
      if (!link) return;
      const src = typeof link.source === "object" ? link.source : nodes.find(function (n) { return n.id === link.source; });
      const tgt = typeof link.target === "object" ? link.target : nodes.find(function (n) { return n.id === link.target; });
      const fakeEvent = {
        clientX: (src.x + tgt.x) / 2,
        clientY: (src.y + tgt.y) / 2 - 30
      };
      showLinkTooltip(fakeEvent, link);
    }, 4000);
  })();

  window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    svg.attr("viewBox", [0, 0, width, height]);
    simulation.force("radial", d3.forceRadial(Math.min(width, height) * 0.32, width / 2, height / 2).strength(0.35));
    simulation.alpha(0.5).restart();
  });
}
