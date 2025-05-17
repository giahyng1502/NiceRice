import Svg, { Path } from "react-native-svg";

const IconAdd = ({ color = 'white'}) => (
    <Svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M10 1.5V10.5M10 10.5V19.5M10 10.5H19M10 10.5L1 10.5"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default IconAdd;
