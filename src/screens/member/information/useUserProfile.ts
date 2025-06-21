import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {User} from "../../../store/reducers/userSlice";
import {getOneProfileOfUser} from "../../../store/action/userAction";

export const useUserProfile = (userId:number) => {
    const [userProfile, setUserProfile] = useState<User>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const userData = await getOneProfileOfUser(userId);
                if (userData) {
                    setUserProfile(userData?.user);
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);
    return {
        userProfile,
        loading
    };
}
