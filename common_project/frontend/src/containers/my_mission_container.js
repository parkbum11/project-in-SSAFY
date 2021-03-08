import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as MissionAction from '../modules/mission';
import * as AnswerAction from '../modules/answer';
import styles from '../components/list/component_detail_card_form/component_detail_card_form.module.css';
import MyListCategory from '../components/my_page/my_list/my_list_category/my_list_category';
import ListForm from '../components/list/list_form/list_form';
import ComponentDetailCardForm from '../components/list/component_detail_card_form/component_detail_card_form';
import ModalDetailCardForm from '../components/list/modal_detail_card_form/modal_detail_card_form';

const MyMissionContainer = ({ closeModal }) => {
    const [ category, setCategory ] = useState('myMission');
    const [ detailComponent, setDetailComponent ] = useState(false);

    // store에 있는 state와 dispatch 가져오는 작업
    const userInfo = useSelector(state => state.user.userInfo);
    const missionList = useSelector(state => state.mission.missionList);
    const answerList = useSelector(state => state.answer.answerList);
    const selectedMission = useSelector(state => state.mission.selectedMission);
    const selectedAnswer = useSelector(state => state.answer.selectedAnswer);
    const dispatch = useDispatch();

    // 카테고리 변경시 새로 요청 보내기 처리
    useEffect(() => {
        if(category === 'myMission') {
            getMyMissionList();
        } else if(category === 'makingAnswer') {
            getMakingMissionList();
        } else if(category === 'myAnswer') {
            getMyAnswerList();
        }
    }, [ category ]);

    const onChangeCategory = (e) => {
        setCategory(e.target.attributes[1].nodeValue);
    }

    const onOpenDetail = () => {
        setDetailComponent(true);
    }

    const onCloseDetail = () => {
        setDetailComponent(false);
        if(category === 'myMission') {
            getMyMissionList();
        } else if(category === 'makingAnswer') {
            getMakingMissionList();
        } else if(category === 'myAnswer') {
            getMyAnswerList();
        }
    }

    /*
    api 요청 보내는 함수
    */
    // 내가 만든 미션 리스트 조회
    const getMyMissionList = async () => {
        try{
            await dispatch(MissionAction.getMyMissionList({ email: userInfo.email }));
            setDetailComponent(false);
        } catch(e) {
            console.log(e);
        }
    }

    // 내가 만든 답안 리스트 조회
    const getMyAnswerList = async () => {
        try{
            await dispatch(AnswerAction.getMyAnswerList({ email: userInfo.email }));
            setDetailComponent(false);
        } catch(e) {
            console.log(e);
        }
    }

    // 현재 선택한 미션 조회
    const getMission = async (id) => {
        try{
            await dispatch(MissionAction.getMission({ missionId: id, email: userInfo.email }));
            setDetailComponent(true);
        } catch(e) {
            console.log(e);
        }
    }

    // 현재 선택한 답안 조회
    const getAnswer = async (id) => {
        try{
            await dispatch(AnswerAction.getAnswer({ email: userInfo.email, answerId: id }));
            setDetailComponent(true);
        }catch (e) {
            console.log(e);
        }
    }

    // 현재 유저의 진행중 미션 목록 조회
    const getMakingMissionList = async () => {
        try{
            await dispatch(MissionAction.getMyTodoMissionList(
                            { email: userInfo.email, todo:'todo'}));
        } catch(e) {
            console.log(e);
        }
    }

    // 미션 수정 요청
    const onModifyMission = async ( modifyInput) => {
        try{
            await dispatch(MissionAction.modifyMission(
                { email: userInfo.email, missionId:selectedMission.id,
                    title: modifyInput.title, content: modifyInput.content }));
            getMission(selectedMission.id);
        } catch(e){
            console.log(e);
        }
    }

    // 미션 좋아요 요청
    const likeMission = async () => {
        try{
            await dispatch(MissionAction.setLikeMission(
                { email: userInfo.email, missionId:selectedMission.id, favorite:true }));
        } catch(e) {
            console.log(e);
        }
    }

    // 미션 좋아요 취소 요청
    const dislikeMission = async () => {
        try{
            await dispatch(MissionAction.setLikeMission(
                { email: userInfo.email, missionId:selectedMission.id, favorite:false }));
        } catch(e) {
            console.log(e);
        }
    }

    // 미션 삭제 요청
    const onDeleteMission = async () => {
        try{
            await dispatch(MissionAction.deleteMission(
                { email: userInfo.email, missionId:selectedMission.id }));
            getMyMissionList();
        } catch(e) {
            console.log(e);
        }
    }

    // 답안 삭제 요청
    const onDeleteAnswer = async () => {
        try{
            await dispatch(AnswerAction.deleteAnswer(
                { email: userInfo.email, answerId:selectedAnswer.id }));
            getMyAnswerList();
        } catch(e) {
            console.log(e);
        }
    }
    
    // 답안 좋아요 요청
    const likeAnswer = async () => {
        try{
            await dispatch(AnswerAction.setLikeAnswer({
                email: userInfo.email, answerId: selectedAnswer.id, favorite:true,
            }))
        }catch(e) {
            console.log(e);
        }
    };

    // 답안 좋아요 취소 요청
    const dislikeAnswer = async () => {
        try{
            await dispatch(AnswerAction.setLikeAnswer({
                email: userInfo.email, answerId: selectedAnswer.id, favorite:false,
            }))
        }catch(e) {
            console.log(e);
        }
    };
    
    return (<>
            
        { detailComponent
            ? ( <>
                { category !== 'myAnswer' && 
                    <ModalDetailCardForm
                        detail={selectedMission}
                        setLike={likeMission}
                        setDislike={dislikeMission}
                        userInfo={userInfo.email}
                        onModify={onModifyMission}
                        onDelete={onDeleteMission}
                        closeModal={onCloseDetail}
                        /> }
                { category === 'myAnswer' &&  
                        <div className={styles.my_mission_modal}>
                            <ComponentDetailCardForm
                                detail={selectedAnswer}
                                getDetail={getAnswer}
                                imageUrl={selectedMission.imageUrl}
                                setLike={likeAnswer}
                                setDislike={dislikeAnswer}
                                userInfo={userInfo.email}
                                onDelete={onDeleteAnswer}
                                closeDetail={onCloseDetail}
                                getMissionDetail={getMission}
                    /></div>
                }
            </> )
            : (<> 
                <MyListCategory
                    category={category}
                    onChangeCategory={onChangeCategory}
                    closeModal={closeModal}/>

                { category !== 'myAnswer' &&
                    <ListForm
                        type="mission"
                        list={missionList}
                        getList={getMyMissionList}
                        getDetail={getMission}
                        onDelete={onDeleteMission}
                        setOpenDetail={onOpenDetail}/> }
                { category === 'myAnswer' &&
                    <ListForm
                        type={category}
                        list={answerList}
                        getList={getMyAnswerList}
                        getDetail={getAnswer}
                        getMissionDetail={getMission}
                        onDelete={onDeleteAnswer}
                        setOpenDetail={onOpenDetail} />
                }
            </>)
        }
    </>);
}

export default MyMissionContainer;