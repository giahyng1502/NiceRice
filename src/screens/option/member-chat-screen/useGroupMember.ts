import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {makeSelectMemberByConversation} from "../../../hooks/makeSelectMessagesByConversation";
import {featMemberByGroup} from "../../../store/action/memberAction";
import {useSelector} from "react-redux";

const useGroupMember = (conversationId : string) =>{
    const dispatch = useAppDispatch();
    const members = useSelector(makeSelectMemberByConversation(conversationId));

    useEffect(() => {
        dispatch(featMemberByGroup(conversationId));
    }, [conversationId]);

    return {members};
}

export default useGroupMember;
