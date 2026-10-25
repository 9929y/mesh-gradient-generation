/* Portable palette/layout studies. No connection or Figma writes on load. */
(function (root) {
  'use strict';
  const palettes = {
    mono: {name:'单色层次', colors:['#fff4e7','#fddaaa','#f6ad71','#b7542e'], advice:'单色层次：适合统一的封面与章节背景。用明暗形成结构；风险是中间色太接近时显得平。'},
    adjacent: {name:'邻近暖色', colors:['#fff4e7','#e6be6c','#f6ad71','#c97c83'], advice:'邻近暖色：柔和且有温度。让金、杏桃、玫瑰中只有一个主导，避免所有色块同等抢眼。'},
    contrast: {name:'杏桃 × 橄榄', colors:['#fff4e7','#f6ad71','#b59b46','#898418'], advice:'杏桃 × 橄榄：用冷暖和明暗拉开层次。这是视觉对照，并非严格色轮互补；重点检查重叠后是否变脏。'},
    neutral: {name:'冷中性 + 强调', colors:['#f4f5f3','#d5dede','#91a9b4','#3f708e'], advice:'冷中性 + 强调：适合内容较多的页面。保留一个蓝色锚点，避免全部灰化后失去品牌识别。'}
  };
  // CSS background order is front to back. Positions/stops match the guide.
  const pools = [[1,.18,.28,.60],[2,.78,.28,.62],[3,.65,.95,.50],[2,.25,.88,.60]];
  function colorsValid(colors) {
    if (!Array.isArray(colors)||colors.length!==4||colors.some(c=>!/^#[0-9a-f]{6}$/i.test(c))) throw new Error('Supply four #RRGGBB role colors');
    return colors;
  }
  function paletteCSS(colors) {
    const c=colorsValid(colors);
    return pools.map(([k,x,y,end])=>`radial-gradient(ellipse at ${x*100}% ${y*100}%,${c[k]} 0%,transparent ${end*100}%)`).join(',')+','+c[0];
  }
  function paletteSVG(key, width=1200, height=600) {
    const c=colorsValid(palettes[key]?.colors);
    if (![width,height].every(n=>Number.isFinite(n)&&n>0&&n<=16384)) throw new Error('Invalid size');
    const defs=pools.map(([k,x,y,end],i)=>{
      const rx=Math.SQRT2*Math.max(x,1-x)*width;
      const ry=Math.SQRT2*Math.max(y,1-y)*height;
      return `<radialGradient id="pool${i}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="translate(${x*width} ${y*height}) scale(${rx} ${ry})"><stop stop-color="${c[k]}"/><stop offset="${end}" stop-color="${c[k]}" stop-opacity="0"/></radialGradient>`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><title>${key} / fixed four-pool palette study</title><defs>${defs}</defs><rect width="100%" height="100%" fill="${c[0]}"/>`+pools.map((_,i)=>i).reverse().map(i=>`<rect width="100%" height="100%" fill="url(#pool${i})"/>`).join('')+'</svg>';
  }
  function layoutSpec(width, height, key='contrast') {
    if (![width,height].every(n=>Number.isFinite(n)&&n>0&&n<=16384)) throw new Error('Invalid canvas size');
    const c=colorsValid(palettes[key]?.colors), short=Math.min(width,height), ratio=width/height;
    let layout, quietZone, regions;
    // [color index, normalized center, short-side support half-extents, angle, alpha]
    if (ratio>=1.35) {
      layout='wide'; quietZone={x:.06,y:.17,width:.33,height:.55};
      regions=[[1,.74,.24,1.15,.92,-18,.93],[2,.94,.80,1.0,.86,15,.96],[3,.59,1.02,.9,.68,-28,.92],[2,.53,.80,.82,.48,-32,.8]];
    } else if (ratio<=.8) {
      layout='portrait'; quietZone={x:.09,y:.055,width:.82,height:.24};
      regions=[[1,.32,.58,1.2,1.0,-30,.96],[2,.91,.73,1.1,1.25,25,.96],[3,.35,.99,1.1,.8,-15,.93],[2,.91,.43,.8,.9,18,.72]];
    } else {
      layout='square'; quietZone={x:.08,y:.08,width:.60,height:.25};
      regions=[[1,.30,.70,1.2,.85,-26,.94],[2,.93,.49,1.0,1.0,20,.94],[3,.84,.99,1.05,.8,-18,.90],[2,.15,.98,.9,.7,15,.72]];
    }
    return {name:`Palette / ${key} / ${layout}`,width,height,base:c[0],layout,quietZone,
      regions:regions.map(([k,x,y,rx,ry,angle,alpha])=>({color:c[k],x,y,rx:rx*short/width,ry:ry*short/height,angle,alpha}))};
  }
  function layoutSVG(spec, showQuiet=true) {
    const {width:w,height:h,regions,quietZone:q}=spec;
    const prefix=`layout-${w}-${h}-`;
    const defs=regions.map((r,i)=>`<radialGradient id="${prefix}mass${i}">`+Array.from({length:49},(_,k)=>`<stop offset="${k/48}" stop-color="${r.color}" stop-opacity="${k===48?0:Math.exp(-8*(k/48)**2)*r.alpha}"/>`).join('')+'</radialGradient>').join('');
    const masses=regions.map((r,i)=>`<ellipse cx="0" cy="0" rx="${r.rx*w}" ry="${r.ry*h}" transform="translate(${r.x*w} ${r.y*h}) rotate(${r.angle})" fill="url(#${prefix}mass${i})"/>`).join('');
    const quiet=showQuiet?`<rect x="${q.x*w}" y="${q.y*h}" width="${q.width*w}" height="${q.height*h}" rx="${.008*Math.min(w,h)}" fill="white" fill-opacity=".38" stroke="#60472e" stroke-opacity=".6" stroke-width="${Math.min(w,h)*.002}" stroke-dasharray="${Math.min(w,h)*.01} ${Math.min(w,h)*.008}"/><text x="${(q.x+.025)*w}" y="${(q.y+.04)*h}" fill="#493d33" font-family="sans-serif" font-size="${Math.min(w,h)*.022}">TITLE ZONE</text>`:'';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${spec.layout} recomposed palette study"><defs>${defs}</defs><rect width="100%" height="100%" fill="${spec.base}"/>${masses}${quiet}</svg>`;
  }
  const api={palettes,pools,paletteCSS,paletteSVG,layoutSpec,layoutSVG};
  root.MeshGradientStudies=api;
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
})(globalThis);
