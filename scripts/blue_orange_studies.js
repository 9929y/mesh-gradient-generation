// Inline after figma_native.js in a supported Figma Plugin API tool.
// Additive: creates six artboards at a caller-supplied clear page position.
function buildBlueOrangeStudies(figma, options) {
  const {x,y,width=1536,height=1024,keys=['sky','dreamlike','flower','diffuse','heightmap','multipoint']}=options||{};
  if(!Array.isArray(keys)||keys.some(k=>!['sky','dreamlike','flower','diffuse','heightmap','multipoint'].includes(k))||new Set(keys).size!==keys.length)throw new Error('Choose unique study keys');
  if(![x,y,width,height].every(Number.isFinite)||width<=0||height<=0||width>8192||height>8192)throw new Error('Supply a clear x/y and valid dimensions');
  if(Math.abs(width/height-1.5)>.001)throw new Error('These study compositions use 3:2; recompose for a different ratio');
  if(typeof buildMesh!=='function')throw new Error('Inline figma_native.js before this source');
  const H={detail:1,warp:1,levels:40,blurMin:24,blurMax:38,...(options?.heightmap||{})};
  if(![H.detail,H.warp,H.levels,H.blurMin,H.blurMax].every(Number.isFinite)||H.detail<0||H.detail>2||H.warp<0||H.warp>2||!Number.isInteger(H.levels)||H.levels<12||H.levels>80||H.blurMin<0||H.blurMax<H.blurMin||H.blurMax>200)throw new Error('Invalid Heightmap controls');
  const P={cream:'#F8F1E8',white:'#FFF7EB',ice:'#DFE8F4',mist:'#B9CEE9',blue:'#7398D1',cobalt:'#3E64AC',navy:'#263C78',orange:'#EB7D45',peach:'#F4B78B',pale:'#F8D8B9'};
  const ids=[],boards=[],s=Math.min(width,height)/1024;
  const rgb=hex=>({r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255});
  const solid=hex=>({type:'SOLID',color:rgb(hex)});
  function linear(colors,angle=0){const a=angle*Math.PI/180,c=Math.cos(a),v=Math.sin(a);return{type:'GRADIENT_LINEAR',gradientTransform:[[c,v,.5-.5*c-.5*v],[-v,c,.5+.5*v-.5*c]],gradientStops:colors.map((hex,i)=>({position:i/(colors.length-1),color:{...rgb(hex),a:1}}))};}
  function blur(n,r){n.effects=r?[{type:'LAYER_BLUR',radius:r*s,visible:true}]:[];}
  function board(key,name,index,fill){const f=figma.createFrame();ids.push(f.id);f.name=`Mesh study / ${key} / ${name}`;f.resize(width,height);f.x=x+(index%3)*(width+200*s);f.y=y+Math.floor(index/3)*(height+200*s);f.fills=[fill||solid(P.cream)];f.clipsContent=true;boards.push({key,id:f.id,name,width,height});return f;}
  function path(f,name,d,colors,angle=0,radius=0,alpha=1){const v=figma.createVector();ids.push(v.id);f.appendChild(v);v.name=name;v.x=0;v.y=0;let k=0;const data=d.replace(/-?\d+(?:\.\d+)?/g,n=>(Number(n)*(k++%2?height/1024:width/1536)).toFixed(3));v.vectorPaths=[{windingRule:'NONZERO',data}];v.fills=[Array.isArray(colors)?linear(colors,angle):solid(colors)];v.strokes=[];v.opacity=alpha;blur(v,radius);return v;}
  function pool(f,name,color,cx,cy,rx,ry,alpha=1,radius=0,angle=0){const v=figma.createRectangle();ids.push(v.id);f.appendChild(v);v.name=name;const w=rx*2*width,h=ry*2*height;v.resize(w,h);const a=angle*Math.PI/180,c=Math.cos(a),q=Math.sin(a);v.relativeTransform=[[c,-q,cx*width-c*w/2+q*h/2],[q,c,cy*height-q*w/2-c*h/2]];v.strokes=[];v.fills=[{type:'GRADIENT_RADIAL',gradientTransform:[[1,0,0],[0,1,0]],gradientStops:[{position:0,color:{...rgb(color),a:alpha}},{position:.28,color:{...rgb(color),a:alpha*.84}},{position:.68,color:{...rgb(color),a:alpha*.28}},{position:1,color:{...rgb(color),a:0}}]}];blur(v,radius);return v;}

  if(keys.includes('sky')){
    const sky=board('sky','Apricot current / blue hour',0,linear([P.navy,P.blue,P.ice],-55));
    path(sky,'01 / broad diagonal apricot current','M -260 740 C 90 690 300 560 540 470 C 870 350 1050 210 1270 80 C 1450 -30 1590 -90 1780 -70 L 1800 510 C 1420 470 1230 600 970 720 C 680 850 320 1050 -260 1150 Z',[P.orange,P.peach,P.pale],-22,140,.97);
    path(sky,'02 / open ivory atmosphere','M -240 -160 L 1780 -160 L 1730 180 C 1400 10 1100 140 880 240 C 460 410 240 440 -240 360 Z',[P.ice,P.white,P.pale],-16,155,.86);
    path(sky,'03 / lower cobalt depth','M -200 1260 L 1740 1260 L 1770 590 C 1400 570 1230 740 990 840 C 540 1010 330 920 -200 1130 Z',[P.navy,P.cobalt,P.blue],-26,145,.92);
    pool(sky,'04 / sunlit cream opening',P.white,.94,.14,.64,.56,.82,140,18);
    pool(sky,'05 / reflected warm edge',P.peach,.14,.96,.64,.36,.48,125,-22);
  }

  if(keys.includes('dreamlike')){
    const dream=board('dreamlike','Suspended light / blue shadow',1,linear([P.mist,P.blue,P.ice],12));
    path(dream,'01 / descending blue shadow','M 110 -220 C 420 -120 620 70 630 290 C 650 510 420 680 620 1190 L 1160 1240 C 970 950 910 760 1010 560 C 1170 240 1080 -20 900 -220 Z',[P.navy,P.cobalt,P.blue],68,130,.90);
    pool(dream,'02 / asymmetric apricot light',P.orange,.05,.56,.77,.65,1,125,-22);
    path(dream,'03 / broad suspended ivory field','M 710 -240 C 1120 -110 1030 120 1030 320 C 1030 560 900 710 970 1240 L 1740 1240 L 1740 -220 Z',[P.ice,P.white,P.pale],75,165,.94);
    pool(dream,'04 / warm light echo',P.peach,.48,.69,.44,.29,.62,125,25);
    pool(dream,'05 / lower cool return',P.cobalt,.30,1.14,.66,.43,.78,140,-20);
    pool(dream,'06 / upper mist reflection',P.mist,.12,-.10,.70,.35,.67,120,10);
  }

  if(keys.includes('flower')){
    const flower=board('flower','Magnified petal / luminous apricot',2,linear([P.pale,P.peach,P.orange],24));
    path(flower,'01 / cropped blue petal','M -280 -220 L 650 -220 C 440 130 390 390 430 620 C 460 870 620 1080 580 1270 L -280 1270 Z',[P.ice,P.blue,P.cobalt],78,125,.82);
    path(flower,'02 / deep interval behind petal','M 330 -220 C 310 140 390 310 380 500 C 350 750 430 990 660 1240 L 1010 1250 C 660 920 670 650 610 450 C 550 230 620 30 770 -220 Z',[P.blue,P.navy,P.cobalt],65,145,.56);
    path(flower,'03 / luminous apricot face','M 770 -230 C 640 100 590 370 650 590 C 720 850 1020 1020 1160 1240 L 1790 1240 L 1790 -230 Z',[P.pale,P.peach,P.orange],80,145,.85);
    pool(flower,'04 / light through upper petal',P.white,.57,.10,.47,.62,.75,125,-14);
    path(flower,'05 / cropped cool shadow at right','M 1170 -250 C 1290 -40 1260 150 1430 300 C 1570 420 1690 420 1820 400 L 1820 -250 Z',[P.navy,P.blue,P.peach],45,160,.60);
    pool(flower,'06 / reflected peach at lower left',P.peach,.02,.88,.43,.44,.50,135,-16);
  }

  if(keys.includes('diffuse')){
  const diffuse=board('diffuse','Blue mist / warm paper',3,linear([P.ice,P.cream,P.pale],-35));
  pool(diffuse,'01 / blue field',P.cobalt,.12,.20,.7,.76,.8,165,-20);
  pool(diffuse,'02 / apricot field',P.orange,.88,.74,.75,.88,.65,185,25);
  pool(diffuse,'03 / pale central space',P.white,.52,.47,.78,.72,.92,160,-20);
  path(diffuse,'04 / low contrast blue drift','M -180 1200 C 80 760 510 1000 890 660 C 1180 400 1420 470 1750 290 L 1750 740 C 1410 770 1280 700 1050 900 C 640 1280 300 1100 100 1250 Z',[P.mist,P.blue,P.ice],-28,155,.68);

  }

  function mix(a,b,t){const A=rgb(a),B=rgb(b);return '#'+['r','g','b'].map(k=>Math.round((A[k]+(B[k]-A[k])*t)*255).toString(16).padStart(2,'0')).join('');}
  function ramp(t){const stops=[P.navy,P.cobalt,P.blue,P.ice,P.cream,P.peach,P.orange];const k=t*(stops.length-1),i=Math.min(stops.length-2,Math.floor(k));return mix(stops[i],stops[i+1],k-i);}
  // Sample a warped multi-hill scalar field; marching squares preserves splits,
  // islands and saddles. These contours are not scaled copies of a single path.
  function heightContours(){
    const nx=112,ny=80,pad=.18,vals=[],lo=-pad,span=1+2*pad;
    const gauss=(u,v,cx,cy,rx,ry,a)=>{const dx=u-cx,dy=v-cy,c=Math.cos(a),s=Math.sin(a);return Math.exp(-.5*(((c*dx+s*dy)/rx)**2+((-s*dx+c*dy)/ry)**2));};
    const raw=(x,y)=>{const u=x+H.warp*(.065*Math.sin(2*Math.PI*y)+.035*Math.sin(4*Math.PI*x+2*Math.PI*y)),v=y+H.warp*.065*Math.sin(2*Math.PI*x-.7);return .5+.19*Math.sin(2*Math.PI*(.85*u+.70*v))+.14*Math.cos(2*Math.PI*(1.55*u-.55*v))+.115*Math.sin(2*Math.PI*(.60*u-1.45*v))+.15*gauss(u,v,.16,.22,.28,.14,-.48)+H.detail*(.10*Math.sin(2*Math.PI*(2.8*u+1.25*v))+.065*Math.cos(2*Math.PI*(-2.3*u+2.15*v)))+.13*gauss(u,v,.78,.76,.25,.16,-.60)-.12*gauss(u,v,.48,.55,.13,.29,-.35);};
    let min=Infinity,max=-Infinity;
    for(let j=0;j<=ny;j++){vals[j]=[];for(let i=0;i<=nx;i++){const v=raw(lo+i/nx*span,lo+j/ny*span);vals[j][i]=v;if(i>0&&i<nx&&j>0&&j<ny){min=Math.min(min,v);max=Math.max(max,v);}}}
    for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++)vals[j][i]=(i===0||j===0||i===nx||j===ny)?-1:(vals[j][i]-min)/(max-min);
    const result=[];
    for(let level=1;level<=H.levels;level++){
      const t=level/(H.levels+1),pts=new Map(),adj=new Map();
      function edge(i,j,e){let ai=i,aj=j,bi=i,bj=j,key;
        if(e===0){bi++;key=`h:${i}:${j}`;}if(e===1){ai++;bi++;bj++;key=`v:${i+1}:${j}`;}if(e===2){aj++;bj++;bi++;key=`h:${i}:${j+1}`;}if(e===3){bj++;key=`v:${i}:${j}`;}
        if(!pts.has(key)){const A=vals[aj][ai],B=vals[bj][bi],q=(t-A)/(B-A);pts.set(key,[(lo+(ai+(bi-ai)*q)/nx*span)*1536,(lo+(aj+(bj-aj)*q)/ny*span)*1024]);}return key;
      }
      function segment(i,j,a,b){const A=edge(i,j,a),B=edge(i,j,b);if(!adj.has(A))adj.set(A,[]);if(!adj.has(B))adj.set(B,[]);adj.get(A).push(B);adj.get(B).push(A);}
      const table={1:[[3,0]],2:[[0,1]],3:[[3,1]],4:[[1,2]],6:[[0,2]],7:[[3,2]],8:[[2,3]],9:[[0,2]],11:[[1,2]],12:[[3,1]],13:[[0,1]],14:[[3,0]]};
      for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
        const z=[vals[j][i],vals[j][i+1],vals[j+1][i+1],vals[j+1][i]],c=z.reduce((m,v,k)=>m+(v>=t?1<<k:0),0),inside=z.reduce((a,b)=>a+b,0)/4>=t;
        const pairs=c===5?(inside?[[0,1],[2,3]]:[[3,0],[1,2]]):c===10?(inside?[[3,0],[1,2]]:[[0,1],[2,3]]):(table[c]||[]);for(const pair of pairs)segment(i,j,...pair);
      }
      const seen=new Set(),loops=[];
      for(const start of adj.keys()){if(seen.has(start))continue;let cur=start,prev=null,loop=[];for(let safe=0;safe<20000;safe++){if(seen.has(cur))break;seen.add(cur);loop.push(pts.get(cur));const ns=adj.get(cur);const next=ns.find(k=>k!==prev);prev=cur;cur=next;if(cur===start||!cur)break;}if(cur===start&&loop.length>=12)loops.push(loop);}
      const pathData=loops.map(ps=>{const p=ps.filter((_,i)=>i%2===0);if(p.length<4)return '';let d=`M ${p[0][0]} ${p[0][1]}`;for(let k=0;k<p.length;k++){const a=p[(k+p.length-1)%p.length],b=p[k],c=p[(k+1)%p.length],e=p[(k+2)%p.length];d+=` C ${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6} ${c[1]-(e[1]-b[1])/6} ${c[0]} ${c[1]}`;}return d+' Z';}).join(' ');
      if(pathData)result.push({t,data:pathData,loopCount:loops.length});
    }
    return result;
  }
  if(keys.includes('heightmap')){
    const heightmap=board('heightmap','Crosscurrents / peaks and saddles',4,solid(P.navy));
    const contours=heightContours();
    for(let i=0;i<contours.length;i++){const c=contours[i],v=path(heightmap,`Height ${String(i+1).padStart(2,'0')} / ${c.loopCount} region(s)`,c.data,ramp(c.t),0,H.blurMin+(H.blurMax-H.blurMin)*(1-c.t),1);v.vectorPaths=[{windingRule:'EVENODD',data:v.vectorPaths[0].data}];}
    boards[boards.length-1].contourTopology=contours.map(c=>({height:c.t,regions:c.loopCount}));
  }

  if(keys.includes('multipoint')){
  const mesh=buildMesh(figma,{name:'Mesh study / multipoint / Porcelain blue and apricot',width,height,x:x+2*(width+200*s),y:y+(height+200*s),base:P.cream,regions:[
    {color:P.blue,x:.19,y:.16,rx:.92,ry:1.02,alpha:.94,angle:-20},
    {color:P.peach,x:.84,y:.69,rx:1.03,ry:1.18,alpha:.94,angle:20},
    {color:P.cobalt,x:.35,y:.77,rx:1.2,ry:.35,alpha:.98,angle:-28},
    {color:P.navy,x:-.03,y:.96,rx:.9,ry:.35,alpha:.9,angle:-30},
    {color:P.white,x:.5,y:.4,rx:.95,ry:.32,alpha:.97,angle:-30},
    {color:P.orange,x:.83,y:.23,rx:.53,ry:.68,alpha:.96,angle:28},
    {color:P.pale,x:.62,y:.47,rx:.52,ry:.38,alpha:.82,angle:-22},
    {color:P.navy,x:.99,y:.94,rx:.78,ry:.7,alpha:.7,angle:-20},
    {color:P.ice,x:.92,y:.62,rx:.65,ry:.45,alpha:.88,angle:12},
    {color:P.white,x:.39,y:.62,rx:.6,ry:.16,alpha:.65,angle:-28},
    {color:P.peach,x:.1,y:1.12,rx:.95,ry:.48,alpha:.84,angle:15}
  ]});
  ids.push(...mesh.createdNodeIds);boards.push({key:'multipoint',id:mesh.frameId,name:'Porcelain blue and apricot',width,height,massNodes:mesh.massNodes});
  }
  return{createdNodeIds:ids,mutatedNodeIds:[figma.currentPage.id],boards,palette:P,heightmapSettings:keys.includes('heightmap')?H:undefined,referenceSize:{width:1536,height:1024},note:'All native, no imported reference bitmaps. Curve and radial studies are purpose-designed examples, not exact replays of historical artwork.'};
}
if(typeof module!=='undefined'&&module.exports)module.exports={buildBlueOrangeStudies};
