import Svg, { Path } from "react-native-svg";
const IconMore = ({color}) => (
    <Svg
        width={18}
        height={12}
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.9248 1C17.9248 1.41421 17.589 1.75 17.1748 1.75L1.1748 1.75C0.760592 1.75 0.424805 1.41421 0.424805 1C0.424805 0.585786 0.760592 0.25 1.1748 0.25L17.1748 0.25C17.589 0.25 17.9248 0.585786 17.9248 1Z"
            fill={color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.9248 6C17.9248 6.41421 17.589 6.75 17.1748 6.75L1.1748 6.75C0.760592 6.75 0.424805 6.41421 0.424805 6C0.424805 5.58579 0.760592 5.25 1.1748 5.25L17.1748 5.25C17.589 5.25 17.9248 5.58579 17.9248 6Z"
            fill={color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.9248 11C17.9248 11.4142 17.589 11.75 17.1748 11.75L1.1748 11.75C0.760592 11.75 0.424805 11.4142 0.424805 11C0.424805 10.5858 0.760592 10.25 1.1748 10.25L17.1748 10.25C17.589 10.25 17.9248 10.5858 17.9248 11Z"
            fill={color}
        />
    </Svg>
);
export default IconMore;
