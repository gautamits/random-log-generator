// Type 1: recursive, non tailcall style
const tr1 = function triangle(n) {
  if (n === 0) return [[1]];
  const tri = triangle(n - 1);
  const last = tri[tri.length - 1];
  const ls = [0].concat(last),
    rs = last.concat([0]);
  return tri.concat([rs.map((r, i) => ls[i] + r)]);
};

// Type 2: recursive, tailcall style (optimazed by nodejs-v6 runtime)
const tr2 = function triangle(n, last = [1], tri = [last]) {
  if (n === 0) return tri;
  const ls = [0].concat(last),
    rs = last.concat([0]);
  const next = rs.map((r, i) => ls[i] + r);
  return triangle(n - 1, next, tri.concat([next]));
};

// Type 3: loop style (same as Type 2)
const tr3 = function triangle(n) {
  let last = [1],
    tri = [last];
  for (let i = 0; i < n; i++) {
    const ls = [0].concat(last),
      rs = last.concat([0]);
    last = rs.map((r, i) => ls[i] + r);
    tri = tri.concat([last]);
  }
  return tri;
};

// pyramid formatter
function pyramid(tri) {
  const last = tri[tri.length - 1];
  const nlen = `${last[last.length >> 1]}`.length;
  const str = (n) => {
    const sp = nlen - `${n}`.length;
    return `${" ".repeat(sp - (sp >> 1))}${n}${" ".repeat(sp >> 1)}`;
  };
  const space = " ".repeat(nlen);
  const pad = (i) => space.repeat(tri.length - 1 - i);
  return tri.map((l, i) => `${pad(i)}${l.map(str).join(space)}`).join("\n");
}

module.exports={
    pyramid,
    tr1,
    tr2,
    tr3,
}
