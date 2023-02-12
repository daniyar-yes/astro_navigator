//Greg Miller (gmiller@gregmiller.net) 2021
//Released as public domain
//http://www.celestialprogramming.com/

//All input and output angles are in radians, jd is Julian Date in UTC
function raDecToAltAz(ra,dec,lat,lon,jd_ut){
    //Meeus 13.5 and 13.6, modified so West longitudes are negative and 0 is North
    const gmst=greenwichMeanSiderealTime(jd_ut);
    let localSiderealTime=(gmst+lon)%(2*Math.PI);
    
        
    let H=(localSiderealTime - ra);
    if(H<0){H+=2*Math.PI;}
    if(H>Math.PI){H=H-2*Math.PI;}

    let az = (Math.atan2(Math.sin(H), Math.cos(H)*Math.sin(lat) - Math.tan(dec)*Math.cos(lat)));
    let a = (Math.asin(Math.sin(lat)*Math.sin(dec) + Math.cos(lat)*Math.cos(dec)*Math.cos(H)));
    az-=Math.PI;

    if(az<0){az+=2*Math.PI;}
    return [az,a, localSiderealTime,H];
}
    
function greenwichMeanSiderealTime(jd){
    //"Expressions for IAU 2000 precession quantities" N. Capitaine1,P.T.Wallace2, and J. Chapront
    const t = ((jd - 2451545.0)) / 36525.0;

    let gmst=this.earthRotationAngle(jd)+(0.014506 + 4612.156534*t + 1.3915817*t*t - 0.00000044 *t*t*t - 0.000029956*t*t*t*t - 0.0000000368*t*t*t*t*t)/60.0/60.0*Math.PI/180.0;  //eq 42
    gmst%=2*Math.PI;
    if(gmst<0) gmst+=2*Math.PI;

    return gmst;
}

function earthRotationAngle(jd){
    //IERS Technical Note No. 32

    const t = jd- 2451545.0;
    const f = jd%1.0;

    let theta = 2*Math.PI * (f + 0.7790572732640 + 0.00273781191135448 * t); //eq 14
    theta%=2*Math.PI;
    if(theta<0)theta+=2*Math.PI;

    return theta;

}
