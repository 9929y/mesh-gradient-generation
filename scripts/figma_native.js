// Inline into a documented Figma Plugin API execution tool, then call buildMesh.
// This additive helper builds editable radial masses, not a mesh control grid.
function buildMesh(figma, spec) {
  const finite = (v, name) => {
    if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`Invalid ${name}`);
    return v;
  };
  const rgb = (hex) => {
    if (typeof hex !== 'string' || !/^#[0-9a-f]{6}$/i.test(hex)) throw new Error('Use #RRGGBB colors');
    return { r: parseInt(hex.slice(1,3),16)/255,
      g: parseInt(hex.slice(3,5),16)/255, b: parseInt(hex.slice(5,7),16)/255 };
  };
  const width = finite(spec.width, 'width'), height = finite(spec.height, 'height');
  if (width <= 0 || height <= 0 || width > 16384 || height > 16384) throw new Error('Invalid canvas size');
  const x = finite(spec.x, 'canvas x'), y = finite(spec.y, 'canvas y');
  const baseColor = spec.base === null ? null : rgb(spec.base || '#f2d5c5');
  if (!Array.isArray(spec.regions) || !spec.regions.length || spec.regions.length > 256) {
    throw new Error('Supply 1–256 ordered regions');
  }
  // Validate the entire recipe before creating any node.
  const regions = spec.regions.map((r, i) => {
    const color = rgb(r.color);
    ['x','y','rx','ry'].forEach(k => finite(r[k], `region ${i} ${k}`));
    if (r.rx <= 0 || r.ry <= 0 || r.rx > 4 || r.ry > 4) throw new Error('Invalid region extent');
    const alpha = finite(r.alpha ?? 1, 'alpha');
    const angle = finite(r.angle ?? 0, 'angle');
    if (alpha < 0 || alpha > 1) throw new Error('Invalid alpha');
    return {...r, color, alpha, angle};
  });
  const affectedParentId = figma.currentPage.id;
  const frame = figma.createFrame();
  const createdNodeIds = [frame.id];
  const massNodes = [];
  frame.name = spec.name || 'Mesh / radial field';
  frame.resize(width, height);
  frame.x = x; frame.y = y; frame.clipsContent = true;
  frame.fills = baseColor ? [{type:'SOLID', color:baseColor}] : [];
  for (const [i,r] of regions.entries()) {
    const group = figma.createFrame();
    createdNodeIds.push(group.id); frame.appendChild(group);
    group.name = `Mass ${i+1} / move-scale-rotate`;
    const w=r.rx*2*width, h=r.ry*2*height;
    group.resize(w,h);group.fills=[];group.clipsContent=false;group.opacity=r.alpha;
    const a=r.angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
    group.relativeTransform=[[c,-s,r.x*width-c*w/2+s*h/2],
      [s,c,r.y*height-s*w/2-c*h/2]];
    const mask=figma.createRectangle();createdNodeIds.push(mask.id);
    group.appendChild(mask);mask.resize(w,h);mask.name='Soft boundary / alpha mask';
    mask.strokes=[];
    mask.fills = [{type:'GRADIENT_RADIAL',
      gradientTransform:[[1,0,0],[0,1,0]],
      gradientStops:Array.from({length:49},(_,k)=>({position:k/48,
        color:{r:0,g:0,b:0,a:k===48?0:Math.exp(-8*(k/48)**2)}}))}];
    mask.isMask=true;mask.maskType='ALPHA';
    const color=figma.createRectangle();createdNodeIds.push(color.id);
    group.appendChild(color);color.resize(w,h);color.name='Color / edit Fill';
    color.strokes=[];color.fills=[{type:'SOLID',color:r.color}];
    massNodes.push({groupId:group.id,maskId:mask.id,colorId:color.id,
      center:{x:r.x,y:r.y},halfExtent:{x:r.rx,y:r.ry},angle:r.angle,alpha:r.alpha});
  }
  return {frameId:frame.id, createdNodeIds, mutatedNodeIds:[affectedParentId],
    bounds:{x,y,width,height}, regionCount:regions.length,massNodes,
    method:'editable Gaussian radial-mask groups', background:baseColor?'opaque':'transparent'};
}
