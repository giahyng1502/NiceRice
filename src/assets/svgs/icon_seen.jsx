import Svg, { Path } from "react-native-svg";
const IconSeen = ({color}) => (
    <Svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.03741 4.04543C9.21943 4.20434 9.23816 4.48071 9.07926 4.66273L4.49592 9.91273C4.41284 10.0079 4.29268 10.0625 4.16635 10.0625C4.04002 10.0625 3.91985 10.0079 3.83677 9.91273L2.00344 7.81273C1.84453 7.63071 1.86327 7.35434 2.04529 7.19543C2.22731 7.03652 2.50368 7.05526 2.66259 7.23728L4.16635 8.95977L8.4201 4.08728C8.57901 3.90526 8.85539 3.88652 9.03741 4.04543Z"
            fill={color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9682 4.09469C12.1432 4.26133 12.1499 4.53825 11.9833 4.71322L6.98312 9.96322C6.89475 10.056 6.77015 10.1054 6.64221 10.0983C6.51427 10.0913 6.39586 10.0285 6.31824 9.92654L6.06838 9.59841C5.922 9.40618 5.95918 9.13167 6.15141 8.98529C6.31656 8.85954 6.54242 8.86925 6.69561 8.99637L11.3497 4.10976C11.5163 3.9348 11.7932 3.92805 11.9682 4.09469Z"
            fill={color}
        />
    </Svg>
);
export default IconSeen;
