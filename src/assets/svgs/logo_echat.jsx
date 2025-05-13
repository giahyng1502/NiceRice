import * as React from "react";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";

const SVGComponent = ({
                              width = 164,
                              height = 164,
                              color1Start = "#1565C0",
                              color1End = "#0F4888",
                              color2Start = "#40C4FF",
                              color2End = "#03A9F4",
                              ...props
                      }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 190 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
            <Path
                d="M71.8831 52.052C71.8831 48.7383 74.5694 46.052 77.8831 46.052H184C187.314 46.052 190 48.7383 190 52.052V125.052C190 128.366 187.314 131.052 184 131.052H170.61C167.297 131.052 164.61 133.738 164.61 137.052V158.237C164.61 160.018 162.456 160.911 161.196 159.651L134.355 132.809C133.23 131.684 131.703 131.052 130.112 131.052H77.8831C74.5694 131.052 71.8831 128.366 71.8831 125.052V52.052Z"
                fill="url(#paint0_linear)"
            />
            <G>
                    <Path
                        d="M20 20.0391C20 16.7254 22.6863 14.0391 26 14.0391H132.117C135.431 14.0391 138.117 16.7254 138.117 20.0391V93.0391C138.117 96.3528 135.431 99.0391 132.117 99.0391H81.5142C79.9404 99.0391 78.4296 99.6574 77.3074 100.761L49.3438 128.258C48.0791 129.502 45.9416 128.606 45.9416 126.832V105.039C45.9416 101.725 43.2553 99.0391 39.9416 99.0391H26C22.6863 99.0391 20 96.3528 20 93.0391V20.0391Z"
                        fill="url(#paint1_linear)"
                    />
            </G>
            <Defs>
                    <LinearGradient
                        id="paint0_linear"
                        x1={71.8831}
                        y1={46.052}
                        x2={185.756}
                        y2={130.616}
                        gradientUnits="userSpaceOnUse"
                    >
                            <Stop stopColor={color1Start} />
                            <Stop offset={1} stopColor={color1End} />
                    </LinearGradient>
                    <LinearGradient
                        id="paint1_linear"
                        x1={20}
                        y1={14.0391}
                        x2={134.253}
                        y2={98.4871}
                        gradientUnits="userSpaceOnUse"
                    >
                            <Stop stopColor={color2Start} />
                            <Stop offset={1} stopColor={color2End} />
                    </LinearGradient>
            </Defs>
    </Svg>
);

export default SVGComponent;
