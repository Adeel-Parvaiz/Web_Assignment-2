import { useRef, useEffect } from 'react';

export default function CricketGround({ ballPos, batSwing, batPhase }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;   // 600
    const H = canvas.height;  // 340
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#0ea5e9');  // bright blue at top
    sky.addColorStop(1, '#7dd3fc');  // lighter blue at bottom
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    const clouds = [
      [60, 40, 30],
      [150, 30, 20],
      [280, 50, 25],
      [420, 35, 18],
      [520, 45, 22],
    ];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    clouds.forEach(([x, y, r]) => {
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + r * 0.6, y + 4, r * 0.7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x - r * 0.5, y + 5, r * 0.65, 0, Math.PI * 2); ctx.fill();
    });

    ctx.fillStyle = '#a3a3a3';
    ctx.fillRect(0, H * 0.38, W, H * 0.09);
   
    for (let i = 0; i < W; i += 14) {
      ctx.fillStyle = `hsl(${(i * 7) % 360}, 60%, 55%)`;
      ctx.beginPath();
      ctx.arc(i + 7, H * 0.39 + Math.sin(i) * 4, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    const grass = ctx.createLinearGradient(0, H * 0.47, 0, H);
    grass.addColorStop(0, '#4ade80');  // bright green
    grass.addColorStop(1, '#15803d');  // dark green at bottom
    ctx.fillStyle = grass;
    ctx.fillRect(0, H * 0.47, W, H * 0.53);
    const pL = W * 0.25; 
    const pR = W * 0.75;  
    const pT = H * 0.55; 
    const pB = H * 0.95;  
    ctx.fillStyle = '#d4a855';  
    ctx.beginPath();
    ctx.moveTo(pL,      pT);  
    ctx.lineTo(pR,      pT);   
    ctx.lineTo(pR + 20, pB);   
    ctx.lineTo(pL - 20, pB);   
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
   
    ctx.beginPath(); ctx.moveTo(pL - 10, H * 0.9); ctx.lineTo(pR + 10, H * 0.9); ctx.stroke();
    
    ctx.beginPath(); ctx.moveTo(pL - 10, H * 0.62); ctx.lineTo(pR + 10, H * 0.62); ctx.stroke();

    const sX = W * 0.32;  
    const sY = H * 0.88;  
    [-8, 0, 8].forEach(dx => {
      
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(sX + dx - 1.5, sY - 30, 3, 30);
      
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(sX + dx - 3, sY - 31, 6, 4);
    });

    const bsX = W * 0.68;
    const bsY = H * 0.63;
    ctx.fillStyle = '#f5f5f5';
    [-6, 0, 6].forEach(dx => {
      ctx.fillRect(bsX + dx - 1, bsY - 20, 2, 20);
    });

  
    const bx = sX + 30;  
    const by = sY - 10; 

   
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(bx - 8, by - 25, 8, 25);
    ctx.fillRect(bx + 2, by - 25, 8, 25);

    
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(bx - 10, by - 55, 22, 30);

  
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.arc(bx + 1, by - 58, 12, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(bx - 12, by - 60, 26, 5);

    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 1.5;
    for (let gy = by - 58; gy < by - 50; gy += 3) {
      ctx.beginPath();
      ctx.moveTo(bx - 5, gy);
      ctx.lineTo(bx + 8, gy);
      ctx.stroke();
    }


    const swingAngle = batSwing
      ? batPhase < 0.5
        ? -Math.PI * 0.6 * batPhase * 2         
        : -Math.PI * 0.6 + Math.PI * 0.6 * (batPhase - 0.5) * 2 
      : -0.2;  

    ctx.save();                           
    ctx.translate(bx + 10, by - 35);     
    ctx.rotate(swingAngle);               

    ctx.fillStyle = '#fde68a';
    ctx.fillRect(-3, 0, 6, 20);

    ctx.fillStyle = '#92400e';
    ctx.fillRect(-4, 18, 10, 30);

    ctx.fillStyle = '#d97706';
    ctx.fillRect(-5, 18, 2, 30);

    ctx.restore(); 
    if (ballPos) {
      const { x, y } = ballPos;
      const r = 7;
      const ballGrad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, r);
      ballGrad.addColorStop(0, '#fca5a5');  
      ballGrad.addColorStop(1, '#dc2626');  
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.6, -0.5, 0.5);
      ctx.stroke();
    }

  }, [ballPos, batSwing, batPhase]);
 

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={340}
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '12px 12px 0 0',
        display: 'block',
      }}
    />
  );
}
