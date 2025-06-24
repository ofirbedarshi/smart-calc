interface TargetCoordinates {
  northCoord: number;
  eastCoord: number;
  distance: number;
  elevation?: number; // in mils (optional)
  height: number;
}

interface SelfLocationResult {
  northCoord: string;
  eastCoord: string;
  height: string;
}

export class BackAzimuthCalc {
  static calculateSelfLocation(
    target1: TargetCoordinates,
    target2: TargetCoordinates,
    direction: 'right' | 'left'
  ): SelfLocationResult {
    const toRad = (mil: number) => mil * (Math.PI / 3200);

    // Define "right" and "left" targets
    const right = direction === 'right' ? target1 : target2;
    const left = direction === 'right' ? target2 : target1;

    const x1 = right.eastCoord;
    const y1 = right.northCoord;
    const h1 = right.height;
    const r1 = right.distance;
    const z1 = toRad(right.elevation ?? 0);

    const x2 = left.eastCoord;
    const y2 = left.northCoord;
    const h2 = left.height;
    const r2 = left.distance;
    const z2 = toRad(left.elevation ?? 0);

    // Compute distance between targets
    const dx = x2 - x1;
    const dy = y2 - y1;
    const d = Math.hypot(dx, dy);

    // Midpoint base between two circles
    const a = (r1 ** 2 - r2 ** 2 + d ** 2) / (2 * d);
    const x3 = x1 + (a * dx) / d;
    const y3 = y1 + (a * dy) / d;

    const h = Math.sqrt(Math.max(0, r1 ** 2 - a ** 2));
    const rx = -dy * (h / d);
    const ry = dx * (h / d);

    const p1 = { x: x3 + rx, y: y3 + ry };
    const p2 = { x: x3 - rx, y: y3 - ry };

    // Function to compute relative angle difference between left and right
    const relativeBearing = (p: { x: number; y: number }) => {
      const angleTo = (xf: number, yf: number, xt: number, yt: number) =>
        Math.atan2(yt - yf, xt - xf);
      const angleRight = angleTo(p.x, p.y, x1, y1);
      const angleLeft = angleTo(p.x, p.y, x2, y2);
      return (angleLeft - angleRight + 2 * Math.PI) % (2 * Math.PI);
    };

    // Select the correct intersection point
    const bearing1 = relativeBearing(p1);
    const bearing2 = relativeBearing(p2);
    const chosen = bearing1 > bearing2 ? p1 : p2;

    // Compute height (average of back-calculated heights)
    const hSelf1 = h1 - r1 * Math.tan(z1);
    const hSelf2 = h2 - r2 * Math.tan(z2);
    const height = ((hSelf1 + hSelf2) / 2).toFixed(2);

    return {
      eastCoord: chosen.x.toFixed(3),
      northCoord: chosen.y.toFixed(3),
      height: height,
    };
  }
}
