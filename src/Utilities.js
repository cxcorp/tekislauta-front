const Utilities = {
  RgbToHsl: (function () {
    const hslToDegPercPerc = function ($h, $s, $l) {
      //convert h to degrees
      $h *= 60;

      if ($h < 0) {
        $h += 360;
      }

      //convert s and l to percentage
      $s *= 100;
      $l *= 100;

      let $hsl = {};
      $hsl['h'] = $h;
      $hsl['s'] = $s;
      $hsl['l'] = $l;
      return $hsl;
    }

    const max = function (r, g, b) {
      if (r > g && r > b)
        return r;
      if (g > r && g > b)
        return g;
      if (b > r && b > g)
        return b;
      return r;
    }

    const min = function (r, g, b) {
      if (r < g && r < b)
        return r;
      if (g < r && g < b)
        return g;
      if (b < r && b < g)
        return b;
      return r;
    }
    return function ($r, $g, $b) {
      //For the calculation, rgb needs to be in the range from 0 to 1. To convert, divide by 255 (ff). 
      $r /= 255;
      $g /= 255;
      $b /= 255;

      let $myMax = max($r, $g, $b);
      let $myMin = min($r, $g, $b);

      let $maxAdd = ($myMax + $myMin);
      let $maxSub = ($myMax - $myMin);

      //luminence is (max + min)/2
      let $h = 0;
      let $s = 0;
      let $l = ($maxAdd / 2.0);

      //if all the numbers are equal, there is no saturation (greyscale).
      if ($myMin !== $myMax) {
        if ($l < 0.5) {
          $s = ($maxSub / $maxAdd);
        } else {
          $s = (2.0 - $maxSub);
          $s = ($maxSub / $s);
        }

        //find hue
        switch ($myMax) {
          case $r:
            $h = ($g - $b);
            $h /= $maxSub;
            break;
          case $g:
            $h = ($b - $r);
            $h /= $maxSub;
            $h += 2.0;
            break;
          case $b:
            $h = ($r - $g);
            $h /= $maxSub;
            $h += 4.0;
            break;
          default: break;
        }
      }

      let $hsl = hslToDegPercPerc($h, $s, $l);
      return $hsl;
    };
  } ())
};

export default Utilities;