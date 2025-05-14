import LottieView from 'lottie-react-native';
import {width} from "../../styles/globalStyles";

const LoadingAnimation = () => {
    return (
        <LottieView
            source={require('../../assets/lottie/loading_lottie.json')}
            autoPlay
            loop={true}
            style={{ width: width*0.15, height: width*0.15 }}
        />
    );
};
export default LoadingAnimation;
